import {Polybase} from '@polybase/client'
import {ethPersonalSign} from '@polybase/eth'
import 'dotenv/config'
import fs from 'fs'
import path from "path";

const db = new Polybase({
  signer: (data) => {
    return {
      h: 'eth-personal-sign',
      sig: ethPersonalSign(process.env.PRIVATE_KEY!, data)
    }
  },
  defaultNamespace: 'pk/' + process.env.PUBLIC_KEY,
})

const entries = fs.readdirSync('./src/schemas').filter((file) => path.extname(file) === '.polylang')
for (const entry of entries) {
  const content = fs.readFileSync('./src/schemas/' + entry, 'utf8')
  const response = await db.applySchema(content)
  console.log(response)
}
