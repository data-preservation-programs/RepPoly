import 'dotenv/config'
import {MongoClient} from "mongodb";
import fs from 'fs'

const collections = [
  ['Filfox', 'filfox'],
  ['filrep', 'filrep'],
  ['gravity_assist', 'gravity'],
  ['kentiks', 'kentik'],
  ['lassie', 'lassie'],
  ['retrievalbot_1', 'retrievalbot'],
  ['starboard', 'starboard'],
]

const client = new MongoClient(process.env.MONGO_URI!);
for (const [collection, typename] of collections) {
  const doc = await client.db('reputation').collection(collection).findOne()
  if (doc === null) {
    console.error(`No doc found for ${collection}`)
    continue
  }

  const schema: string[] = []
  const polybase: string[] = []
  const argList: [string, string][] = []
  schema.push('// Auto-generated, do not modify')
  schema.push('import {ObjectId} from "mongodb";')
  schema.push(`export interface ${typename} {`)

  polybase.push('@public')
  polybase.push(`collection ${typename} {`)

  for (const key of Object.keys(doc)) {
    const type =  typeof doc[key]
    if (type === 'object') {
      switch (doc[key].constructor.name) {
        case 'ObjectId':
          schema.push(`  ${key}: ObjectId;`)
          if (key === '_id') {
            polybase.push(`  id: string;`)
            argList.push(['id', 'string'])
          } else {
            polybase.push(`  ${key}: string;`)
            argList.push([key, 'string'])
          }
          continue
        case 'Date':
          schema.push(`  ${key}: Date;`)
          polybase.push(`  ${key}: string;`)
          argList.push([key, 'string'])
          continue
        default:
          console.error(`Unknown type ${type} (${doc[key].constructor.name}) for ${key}. Skipped`)
          continue
      }
    }
    if (!['string', 'number', 'boolean'].includes(type)) {
      console.error(`Unknown type ${type} for ${key}. Skipped`)
      continue
    }
    schema.push(`  ${key}: ${type};`)
    polybase.push(`  ${key}: ${type};`)
    argList.push([key, type])
  }

  schema.push('}')
  schema.push(`export type ${typename}_poly = [${argList.map(([_key, type]) => type).join(', ')}];`)

  const args = argList.map(([key, type]) => `${key}: ${type}`).join(', ')
  polybase.push(`  constructor (${args}) {`)
  for (const [key, _type] of argList) {
    polybase.push(`    this.${key} = ${key};`)
  }
  polybase.push('  }')
  polybase.push('}')
  console.log(`Writing ./schemas/${typename}.ts`)
  fs.writeFileSync(`./schemas/${typename}.ts`, schema.join('\n'))
  console.log(`Writing ./schemas/${typename}.polylang`)
  fs.writeFileSync(`./schemas/${typename}.polylang`, polybase.join('\n'))
}

await client.close()
