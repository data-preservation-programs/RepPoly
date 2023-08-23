import {Polybase, PolybaseError} from "@polybase/client";
import {filfox} from "./schemas/filfox.js";
import {collections} from "./types.js";

const polydb = new Polybase({
    defaultNamespace: 'pk/0x2d29bcb418989c5677641586d48fe51a5220875a0d82357bb9750c757c27cc73b2482666f4941bff3bc53c1d9b696dcab19351a5ac5c095f61e3d1f8ba91b90a',
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
