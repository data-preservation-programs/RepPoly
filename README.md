## repdao-polybase

This is a type definition package for Filecoin Reputation WG data stored in [Polybase](https://polybase.xyz/).

## Usage
Start with installing the package
```bash
npm i @dataprograms/repdao-polybase
```

Then import the types you need
```typescript
import {DB, filfox} from "@dataprograms/repdao-polybase";

const provider = 'f01889512'

const doc = (await DB.collection('filfox')
    .where('provider', '==', provider)
    .limit(1).get())
    .data[0].data as filfox

console.log(`Filfox record for ${provider}: total rewards: ${doc.totalRewards}`)
```

Or explore all available collections
```typescript
import {CollectionNames} from "@dataprograms/repdao-polybase";

for (const collectionName of CollectionNames) {
    let response
    try {
        response = await DB.collection(collectionName).where('provider', '==', provider).limit(1).get()
    } catch (e: any) {
        if (e instanceof PolybaseError) {
            console.error(`Polybase error: ${e.code} ${e.message} when retrieving ${collectionName} record for ${provider}`)
            continue
        }

        throw e
    }
    if (response.data.length === 0) {
        console.log(`No ${collectionName} record for ${provider}`)
        continue
    }
    const doc = response.data[0].data
    console.log(`${collectionName} record for ${provider}:`)
    console.log(doc)
}
```
