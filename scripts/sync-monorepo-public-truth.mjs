#!/usr/bin/env node

import fs from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const websiteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const monorepoContract = path.resolve(
  websiteRoot,
  "../TVA_All_In_One/config/bookedoncall-public-site-contract.json"
)
const websiteContract = path.join(websiteRoot, "config/public-site-contract.json")

if (!fs.existsSync(monorepoContract)) {
  console.error(`Missing monorepo contract: ${monorepoContract}`)
  process.exit(1)
}

const contract = JSON.parse(fs.readFileSync(monorepoContract, "utf8"))
fs.writeFileSync(websiteContract, `${JSON.stringify(contract, null, 2)}\n`, "utf8")
console.log(`Synced public contract from ${monorepoContract}`)
