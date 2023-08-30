import {Polybase, PolybaseError} from '@polybase/client'
import {ethPersonalSign} from '@polybase/eth'
import 'dotenv/config'
import {Long, MongoClient, ObjectId} from "mongodb";
import PQueue from 'p-queue';
import pRetry from 'p-retry';
import {Field, argFields} from "./schemas/argFields.js";
import {collections} from "./types.js";

const polydb = new Polybase({
    signer: (data) => {
        return {
            h: 'eth-personal-sign',
            sig: ethPersonalSign(process.env.PRIVATE_KEY!, data)
        }
    },
    defaultNamespace: 'pk/' + process.env.PUBLIC_KEY,
    // baseURL: "https://mainnet.polybase.xyz/v0",
})

const mongo = new MongoClient(process.env.MONGO_URI!)
const queue = new PQueue({concurrency: 64})

try {
    for (const {repdao, polybase, provider, dateFunc} of collections) {
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
                var fields = argFields[repdao];
                fields.forEach(function(f: Field) {
                    if (f.name === provider) {
                        f.name = 'provider'
                    }
                })
                const values = fields.map((field: Field) => {
                    if (field.name == 'date_stamp') {
                        return dateFunc(doc)
                    }
                    else {
                        const value = doc[field.name === 'provider' ? provider : field.name]

                        if (value === undefined) {
                            return undefined
                        }
                        if (value instanceof ObjectId) {
                            return value.toString()
                        }
                        if (value instanceof Long) {
                            return value.toNumber()
                        }
                        if (value == null) {
                            switch (field.type) {
                                case 'string':
                                    return ''
                                case 'number':
                                    return 0
                                case 'boolean':
                                    return false
                                default:
                                    throw new Error(`Unknown type ${field.type}`)
                            }
                        }
                        return value
                    }
                })
                return pRetry(async () => {
                    try {
                        if (!values.includes(undefined)) {
                            console.log(`Creating row in ${polybase} polybase...`)
                            await polyCol.create(values)
                        }
                        else {
                            console.log(`Did not create record for ${doc._id.toString()}. Values ${values.join()}`)
                        }
                    } catch (e : any) {
                        console.log(e.toString() + ' in ' + polybase)
                        fields.forEach(function(f: Field) {console.log(f.name + " " + f.type)})
                        console.log(values.join(', '));
                        if (e instanceof PolybaseError && e.code === 'already-exists') {
                            return
                        }
                        throw e
                    }
                }, {
                    maxTimeout: 30000,
                })
            })
        }
    }
    await queue.onIdle()
} finally {
    await mongo.close()
}