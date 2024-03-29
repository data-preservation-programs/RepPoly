## SP Reputation WG
This repo serves the [SP Reputation WG](https://data-programs.gitbook.io/reputation/overview/what-is-sp-reputation-wg) where a number of reputation data collectors contribute SP reputation information to a shared database that downstream reputation service providers can consume. Check the link for how to use the SP Reputation WG database. 

## repdao-polybase
[
This is a type definition package for Filecoin Reputation WG data stored in [Polybase](https://polybase.xyz/).

## Usage
Start with installing the package. Switching to mainnet was done in version 1.0.8.
```bash
npm i @dataprograms/repdao-polybase
```
](https://data-programs.gitbook.io/reputation/overview/what-is-sp-reputation-wg)
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

Or using javascript without type check
```javascript
import {DB} from "@dataprograms/repdao-polybase";

const provider = 'f01889512'

const doc = (await DB.collection('filfox')
    .where('provider', '==', provider)
    .limit(1).get())
    .data[0].data

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

You will need to set the following env variables in an .env file in the root folder

```
PRIVATE_KEY=<PRIVATE_KEY>
PUBLIC_KEY=<PUBLIC_KEY>
MONGO_URI=<MONGO_URI>
```

:warning: This is helpful to create schemas files but there are cases where the latest row may have null 
values and that will cause this script to fail. Going forward manual schema updates should be preferred 
and this script should be considered deprecated.

```
ts-node --esm src/gen.ts
```

To create schemas files and run the code gen run

```
ts-node --esm src/create_schema.ts

```

To pull data from mongo and push to polybase run 

```
ts-node --esm src/run.ts
```
