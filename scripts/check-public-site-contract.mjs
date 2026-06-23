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

if (!Array.isArray(contract.supportedTrades) || contract.supportedTrades.length === 0) {
  errors.push("contract must define supportedTrades")
}

if (!Array.isArray(contract.showcaseExamples) || contract.showcaseExamples.length === 0) {
  errors.push("contract must define showcaseExamples")
}

for (const integration of contract.integrations || []) {
  if (!integration.id || !integration.name || !integration.description || !integration.status) {
    errors.push(`integration is missing required fields: ${JSON.stringify(integration)}`)
  }
  if (!["available", "coming_soon"].includes(integration.status)) {
    errors.push(`integration ${integration.id} has unsupported status: ${integration.status}`)
  }
}

const supportedTradeSet = new Set(contract.supportedTrades || [])
const showcaseTrades = new Set()
for (const example of contract.showcaseExamples || []) {
  if (!example.id || !example.trade || !example.title || !example.path || !example.outcome || !example.summaryArtifact) {
    errors.push(`showcase example is missing required fields: ${JSON.stringify(example)}`)
    continue
  }
  if (!supportedTradeSet.has(example.trade)) {
    errors.push(`showcase example ${example.id} uses unsupported trade: ${example.trade}`)
  }
  if (showcaseTrades.has(example.trade)) {
    errors.push(`showcase examples must have exactly one entry per trade; duplicate trade: ${example.trade}`)
  }
  showcaseTrades.add(example.trade)
  if (!example.path.startsWith(`/examples#${example.id}`)) {
    errors.push(`showcase example ${example.id} must link to its /examples anchor`)
  }
}

for (const trade of supportedTradeSet) {
  if (!showcaseTrades.has(trade)) {
    errors.push(`missing showcase example for supported trade: ${trade}`)
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
