import 'dotenv/config'
import {MongoClient} from "mongodb";
import fs from 'fs'
import {collections} from "./types.js";


const schemasNeedingDateStamp = ['filfox', 'filscan', 'ground_control_sp_location', 
'lassie_bedrock', 'starboard'];
const client = new MongoClient(process.env.MONGO_URI!);
const argExports: string[] = []
argExports.push('// Auto-generated, do not modify')
argExports.push(`
export interface Field {
  name: string
  type: string
}
`)
argExports.push('export const argFields: {[key:string]: Field[]} = {')
for (const {repdao, polybase, provider} of collections) {
    const doc = await client.db('reputation').collection(repdao).findOne({}, {sort:{$natural:-1}})
    if (doc === null) {
        console.error(`No doc found for ${repdao}`)
        continue
    }
    console.log(repdao)
    console.log(doc)
    const schema: string[] = []
    const poly: string[] = []
    const argList: [string, string][] = []
    const fields: [string, string][] = []
    const collectionParams: string[] = []
    schema.push('// Auto-generated, do not modify')
    // schema.push('import {ObjectId} from "mongodb";')
    // schema.push(`export interface ${repdao} {`)

    poly.push('@read')
    poly.push(`collection ${polybase} {`)

    for (const key of Object.keys(doc)) {
        const type = typeof doc[key]
        console.log(key + " " + type + " " + doc[key])
        
        if (type === 'object') {
            switch (doc[key].constructor.name) {
                case 'ObjectId':
                    if (key === '_id') {
                        // schema.push(`  ${key}: ObjectId;`)
                        poly.push(`  id: string;`)
                        argList.push(['id', 'string'])
                        fields.push([key, 'string'])
                    } else {
                        console.error(`Unknown ObjectId ${key} from ${repdao}`)
                    }
                    continue
                case 'Date':
                    // schema.push(`  ${key}: Date;`)
                    collectionParams.push(`  ${key}: string;`)
                    argList.push([key, 'string'])
                    fields.push([key, 'string'])
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
        let newKey = key === provider ? 'provider' : key
        // schema.push(`  ${key}: ${type};`)
        collectionParams.push(`  ${newKey}: ${type};`)
        argList.push([newKey, type])
        fields.push([key, type])
    }

    if (schemasNeedingDateStamp.includes(polybase)) {
        collectionParams.push(`  date_stamp: string;`)
        argList.push(['date_stamp', 'string'])
        fields.push(['date_stamp', 'string'])
    }
    collectionParams.sort();
    collectionParams.forEach(function (p) {poly.push(p)})

    argList.sort(function(a, b) {
        if (a[0] == 'id') {
            return 1;
        }
        if (b[0] == 'id') {
            return 1;
        }
        return a[0].localeCompare(b[0]);
      });

    // schema.push('}')

    schema.push(`export interface ${polybase} {`)
    for (let [key, type] of argList) {
        schema.push(`  ${key}: ${type};`)
    }

    schema.push('}')

    const args = argList.map(([key, type]) => `${key}: ${type}`).join(', ')
    poly.push(`  constructor (${args}) {`)
    for (const [key, _type] of argList) {
        poly.push(`    this.${key} = ${key};`)
    }
    poly.push('  }')
    poly.push('\n  del () {')

    poly.push('    if (owner != ctx.auth) {')
    poly.push('      throw error();')
    poly.push( '    }')
                
    poly.push('\n    selfdestruct();')
    poly.push('  }')
    poly.push('}')

    console.log(`Writing ./src/schemas/${polybase}.ts`)
    fs.writeFileSync(`./src/schemas/${polybase}.ts`, schema.join('\n'))
    console.log(`Writing ./src/schemas/${polybase}.polylang`)
    fs.writeFileSync(`./src/schemas/${polybase}.polylang`, poly.join('\n'))
    argExports.push(`  '${repdao}' :[` + fields.map(([key, type]) => `{name:'${key}', type:'${type}'}`).join(', ') + '],')
}
argExports.push('}')
console.log(`Writing ./src/schemas/argFields.ts`)
fs.writeFileSync(`./src/schemas/argFields.ts`, argExports.join('\n'))

await client.close()
