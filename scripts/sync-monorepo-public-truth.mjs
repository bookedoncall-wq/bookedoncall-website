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
const checkOnly = process.argv.slice(2).includes("--check")

if (!fs.existsSync(monorepoContract)) {
  console.error(`Missing monorepo contract: ${monorepoContract}`)
  process.exit(1)
}

const contract = JSON.parse(fs.readFileSync(monorepoContract, "utf8"))
const nextContractSource = `${JSON.stringify(contract, null, 2)}\n`

if (checkOnly) {
  const currentContractSource = fs.existsSync(websiteContract) ? fs.readFileSync(websiteContract, "utf8") : ""
  if (currentContractSource !== nextContractSource) {
    console.error(`Website public contract is out of sync with ${monorepoContract}`)
    console.error("Run npm run sync:monorepo-truth to update config/public-site-contract.json.")
    process.exit(1)
  }

  console.log(`Public contract is in sync with ${monorepoContract}`)
  process.exit(0)
}

fs.writeFileSync(websiteContract, nextContractSource, "utf8")
console.log(`Synced public contract from ${monorepoContract}`)
