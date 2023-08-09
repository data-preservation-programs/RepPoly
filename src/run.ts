import {Polybase, PolybaseError} from '@polybase/client'
import {ethPersonalSign} from '@polybase/eth'
import 'dotenv/config'
import {MongoClient, ObjectId} from "mongodb";
import PQueue from 'p-queue';
import pRetry from 'p-retry';
import {argFields} from "./schemas/argFields.js";
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
const schemasNeedingDateStamp = ['filfox', 'filscan', 'gravity_assist_retrieval_bot', 'ground_control_sp_location', 
'lassie_bedrock', 'protocol_labs_retrieval_bot', 'filecoin_foundation_retrieval_bot', 'slingshot_retrievalbot', 'starboard'];

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
                var fields = argFields[repdao];
                if (schemasNeedingDateStamp.includes(polybase)) {
                    fields.push({name:'ds', type:'string'})
                }
                fields.sort(function(a, b) {
                    if (a.name == '_id') {
                        return 1;
                    }
                    if (b.name == '_id') {
                        return 1;
                    }
                    return a.name.localeCompare(b.name);
                  });

                const values = fields.map((field) => {
                    console.log(field.name + "   " + doc[field.name])
                    if (field.name == 'ds') {
                        if (polybase == 'filfox' || polybase == 'filscan') {
                            return epochToDate(doc['epoch'])
                        }
                        else if (polybase == 'protocol_labs_retrieval_bot' || polybase == 'gravity_assist_retrieval_bot'
                        || polybase == 'slingshot_retrievalbot' || polybase == 'filecoin_foundation_retrieval_bot') {
                            return doc['date']
                        }
                        else if (polybase == 'ground_control_sp_location') {
                            return doc['date'].toISOString().substring(0, 10)
                        }
                        else if (polybase == 'lassie_bedrock') {
                            return doc['start_time'].toISOString().substring(0, 10)
                        }
                        else if (polybase == 'starboard') {
                            return doc['stat_date'].substring(0, 10)
                        }
                    }
                    else {
                        const value = doc[field.name]
                        if (value instanceof ObjectId) {
                            return value.toString()
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
                        await polyCol.create(values)
                    } catch (e : any) {
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

function epochToDate(epoch: number) {
    if (epoch  == undefined) {
        return null
    }
    var diff_ms =  epoch * 1000 * 30 // block time in seconds
    var date = diff_ms + new Date('2020-08-24T22:00Z').getTime() // filecoin network start time
    var converted_date = new Date(date)
    return converted_date.toISOString().substring(0, 10)
  }