import {Polybase, PolybaseError} from "@polybase/client";
import {filfox} from "./schemas/filfox.js";
import {collections} from "./types.js";

const polydb = new Polybase({
    defaultNamespace: 'pk/0x38d810a48aed860010ddd510ca9070b383490b3521972cdbd296d373dcd7183c8a885e1a2fd6fb2805216398a0ac5cf11a40ed452c3e4f893ca3ca794da3fbbf',
})

const provider = 'f01889512'

// Use typescript types
const doc = (await polydb.collection('filfox').where('provider', '==', provider).limit(1).get()).data[0].data as filfox
console.log(`Filfox record for ${provider}: total rewards: ${doc.totalRewards}`)

for (const {polybase} of collections) {
    let response
    try {
        response = await polydb.collection(polybase).where('provider', '==', provider).limit(1).get()
    } catch (e: any) {
        if (e instanceof PolybaseError) {
            console.error(`Polybase error: ${e.code} ${e.message} when retrieving ${polybase} record for ${provider}`)
            continue
        }

        throw e
    }
    if (response.data.length === 0) {
        console.log(`No ${polybase} record for ${provider}`)
        continue
    }
    const doc = response.data[0].data
    console.log (`${polybase} record for ${provider}:`)
    console.log(doc)
}
