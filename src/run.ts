import {Polybase, PolybaseError} from '@polybase/client'
import {ethPersonalSign} from '@polybase/eth'
import 'dotenv/config'
import {MongoClient, ObjectId} from "mongodb";
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
    for (const {repdao, polybase, provider} of collections) {

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

                fields.sort(function(a: Field, b: Field) {
                    if (a.name == '_id') {
                        return 1;
                    }
                    if (b.name == '_id') {
                        return 1;
                    }
                    return a.name.localeCompare(b.name);
                  });
 
                const values = fields.map((field: Field) => {
                    if (field.name == 'date_stamp') {
                        if (polybase == 'filfox' || polybase == 'filscan') {
                            return epochToDate(doc['epoch'])
                        }
                        else if (polybase == 'protocol_labs_retrieval_bot' || polybase == 'gravity_assist_retrieval_bot'
                        || polybase == 'slingshot_retrieval_bot' || polybase == 'filecoin_foundation_retrieval_bot') {
                            return doc['date']
                        }
                        else if (polybase == 'ground_control_sp_location' || polybase == 'filrep') {
                            return doc['date']?.toISOString().substring(0, 10)
                        }
                        else if (polybase == 'lassie_bedrock') {
                            return doc['start_time'].toISOString().substring(0, 10)
                        }
                        else if (polybase == 'starboard') {
                            return doc['onboarding_at'].substring(0, 10)
                        }
                    }
                    else {
                        const value = doc[field.name === 'provider' ? provider : field.name]

                        if (value === undefined) {
                            return undefined;
                        }
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

function epochToDate(epoch: number) {
    if (epoch  == undefined) {
        return undefined
    }
    var diff_ms =  epoch * 1000 * 30 // block time in seconds
    var date = diff_ms + new Date('2020-08-24T22:00Z').getTime() // filecoin network start time
    var converted_date = new Date(date)
    return converted_date.toISOString().substring(0, 10)
  }