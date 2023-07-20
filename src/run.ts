import {Polybase, PolybaseError} from '@polybase/client'
import {ethPersonalSign} from '@polybase/eth'
import 'dotenv/config'
import {MongoClient, ObjectId} from "mongodb";
import PQueue from 'p-queue';
import pRetry from 'p-retry';
import {argFields} from "./schemas/argFields.js";

const polydb = new Polybase({
    signer: (data) => {
        return {
            h: 'eth-personal-sign',
            sig: ethPersonalSign(process.env.PRIVATE_KEY!, data)
        }
    },
    defaultNamespace: 'pk/' + process.env.PUBLIC_KEY,
})

const mongo = new MongoClient(process.env.MONGO_URI!)
const queue = new PQueue({concurrency: 64})

const collections = [
    {
        repdao: 'Filfox',
        polybase: 'filfox',
    }
]

try {
    for (const {repdao, polybase} of collections) {
        const polyCol = polydb.collection(polybase)
        const mongoCol = mongo.db('reputation').collection(repdao)
        const last = await polyCol.sort('id', 'desc').limit(1).get()
        const lastId = last.data.length > 0 ? last.data[0].data.id : ''
        console.log(`${polybase} last ID`, lastId)
        const match: any = {}
        if (lastId != '') {
            match._id = {
                $gt: new ObjectId(lastId)
            }
        }
        for await (const doc of mongoCol.find(match).sort('_id', 'asc')) {
            queue.add(() => {
                console.log(`Creating ${polybase} record for`, doc._id.toString())
                const fields = argFields[repdao]
                const values = fields.map((field) => {
                    const value = doc[field]
                    if (value instanceof ObjectId) {
                        return value.toString()
                    }
                    return value
                })
                return pRetry(async () => {
                    try {
                        await polyCol.create(values)
                    } catch (e : any) {
                        if (e instanceof PolybaseError && e.code === 'already-exists') {
                            return
                        }
                        throw e
                    }
                }, {
                    maxTimeout: 120000,
                })
            })
        }
    }
    await queue.onIdle()
} finally {
    await mongo.close()
}
