/* eslint-disable @typescript-eslint/no-require-imports */
const { readdirSync, readFileSync } = require("node:fs");
const { extname, join, relative } = require("node:path");

const ignoredDirectoryNames = new Set([".git", "node_modules", ".next", ".turbo", "dist", "coverage"]);
const ignoredExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".pdf",
  ".zip",
  ".gz",
  ".mp3",
  ".mp4",
  ".wav",
  ".woff",
  ".woff2"
]);

const secretPatterns = [
  { id: "aws_access_key", regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { id: "github_pat", regex: /\bgithub_pat_[A-Za-z0-9_]{60,}\b/g },
  { id: "github_token", regex: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/g },
  { id: "slack_token", regex: /\bxox[baprs]-[A-Za-z0-9-]{12,}\b/g },
  { id: "google_api_key", regex: /\bAIza[0-9A-Za-z\-_]{35}\b/g },
  { id: "openai_project_key", regex: /\bsk-proj-[A-Za-z0-9\-_]{20,}\b/g },
  { id: "clerk_secret_key", regex: /\bsk_(?:live|test)_[A-Za-z0-9]{16,}\b/g },
  { id: "resend_api_key", regex: /\bre_[A-Za-z0-9]{24,}\b/g },
  { id: "stripe_live_secret_key", regex: /\bsk_live_[A-Za-z0-9]{16,}\b/g },
  { id: "stripe_live_publishable_key", regex: /\bpk_live_[A-Za-z0-9]{16,}\b/g },
  { id: "stripe_live_restricted_key", regex: /\brk_live_[A-Za-z0-9]{16,}\b/g },
  { id: "private_key_block", regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g }
];

function normalizeRelativePath(value) {
  return value.replaceAll("\\", "/");
}

function isIgnoredPath(relativePath) {
  const normalized = normalizeRelativePath(relativePath);
  const segments = normalized.split("/");
  const basename = segments[segments.length - 1] || "";
  return segments.some((segment) => ignoredDirectoryNames.has(segment)) || ignoredExtensions.has(extname(basename));
}

function getLineNumberForIndex(text, index) {
  return text.slice(0, index).split("\n").length;
}

function scanTextForSecrets(relativePath, contents) {
  if (!contents || contents.includes("\u0000")) {
    return [];
  }

  const violations = [];
  for (const pattern of secretPatterns) {
    pattern.regex.lastIndex = 0;
    for (const match of contents.matchAll(pattern.regex)) {
      const value = typeof match[0] === "string" ? match[0] : "";
      if (!value) {
        continue;
      }

      violations.push({
        file: normalizeRelativePath(relativePath),
        line: getLineNumberForIndex(contents, typeof match.index === "number" ? match.index : 0),
        ruleId: pattern.id,
        match: value
      });
    }
  }
  return violations;
}

function collectFiles(rootDir, currentDir = rootDir, results = []) {
  for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirectoryNames.has(entry.name)) {
        collectFiles(rootDir, join(currentDir, entry.name), results);
      }
      continue;
    }

    const filePath = join(currentDir, entry.name);
    const relativePath = normalizeRelativePath(relative(rootDir, filePath));
    if (!isIgnoredPath(relativePath)) {
      results.push(relativePath);
    }
  }
  return results;
}

function collectSecretScanViolations(repoRoot) {
  return collectFiles(repoRoot).flatMap((relativePath) => {
    try {
      return scanTextForSecrets(relativePath, readFileSync(join(repoRoot, relativePath), "utf8"));
    } catch {
      return [];
    }
  });
}

function formatSecretScanViolations(violations) {
  if (violations.length === 0) {
    return "Secret scan report\n- OK: yes\n- Violations: 0\n";
  }

  const lines = ["Secret scan report", "- OK: no", `- Violations: ${violations.length}`, "", "Findings:"];
  for (const violation of violations) {
    lines.push(`- ${violation.file}:${violation.line} [${violation.ruleId}] ${violation.match}`);
  }
  return `${lines.join("\n")}\n`;
}

function main() {
  const violations = collectSecretScanViolations(process.cwd());
  process.stdout.write(formatSecretScanViolations(violations));
  if (violations.length > 0) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  scanTextForSecrets,
  collectSecretScanViolations,
  formatSecretScanViolations
};
