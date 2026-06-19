#!/usr/bin/env node

import fs from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const websiteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const contractPath = path.join(websiteRoot, "config/public-site-contract.json")

const source = fs.readFileSync(contractPath, "utf8")
const contract = JSON.parse(source)
const errors = []

if (!contract.brand?.websiteOrigin || !contract.brand?.appOrigin) {
  errors.push("contract must define websiteOrigin and appOrigin")
}

if (!Array.isArray(contract.plans) || contract.plans.length === 0) {
  errors.push("contract must define at least one public plan")
}

if (!Array.isArray(contract.integrations) || contract.integrations.length === 0) {
  errors.push("contract must define public integrations")
}

for (const integration of contract.integrations || []) {
  if (!integration.id || !integration.name || !integration.description || !integration.status) {
    errors.push(`integration is missing required fields: ${JSON.stringify(integration)}`)
  }
  if (!["available", "coming_soon"].includes(integration.status)) {
    errors.push(`integration ${integration.id} has unsupported status: ${integration.status}`)
  }
}

if (errors.length > 0) {
  console.error("check-public-site-contract failed")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(`Website public contract is valid: ${path.relative(websiteRoot, contractPath)}`)
