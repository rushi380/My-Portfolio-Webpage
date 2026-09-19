// Syncs src/data.ts with the GitHub API: updates each repo's `language` and
// `updated` (last push, YYYY-MM) plus profile.reposCount. Hand-written
// descriptions, categories and live links are never touched.
//
// Runs weekly via .github/workflows/refresh-data.yml; also runnable locally:
//   GITHUB_TOKEN=ghp_xxx node scripts/refresh-data.mjs
import { readFileSync, writeFileSync } from 'node:fs'

const USER = 'rushi380'
const DATA_FILE = new URL('../src/data.ts', import.meta.url)

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'portfolio-data-refresh',
  'X-GitHub-Api-Version': '2022-11-28',
}
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

const response = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers })
if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`)
const upstream = await response.json()
const byName = new Map(upstream.map((repo) => [repo.name, repo]))

let source = readFileSync(DATA_FILE, 'utf8')
const original = source

source = source.replace(/reposCount: \d+/, `reposCount: ${upstream.length}`)

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const fileRepoNames = [...source.matchAll(/^ {4}name: '([^']+)',$/gm)].map((match) => match[1])

for (const name of fileRepoNames) {
  const repo = byName.get(name)
  if (!repo) {
    console.log(`Note: ${name} not found on GitHub (renamed or deleted?) — left unchanged`)
    continue
  }
  // Repos with no detected language keep their current value
  const block = new RegExp(
    `(name: '${escapeRegExp(name)}'[\\s\\S]*?language: ')([^']*)(',[\\s\\S]*?updated: ')([^']*)(')`,
  )
  source = source.replace(block, (_match, pre, currentLang, mid, currentUpdated, post) => {
    const language = repo.language ?? currentLang
    const updated = typeof repo.pushed_at === 'string' ? repo.pushed_at.slice(0, 7) : currentUpdated
    return `${pre}${language}${mid}${updated}${post}`
  })
}

const listed = new Set(fileRepoNames)
const missing = [...byName.keys()].filter((name) => !listed.has(name))
if (missing.length) console.log(`Note: repos not yet in data.ts: ${missing.join(', ')}`)

if (source !== original) {
  writeFileSync(DATA_FILE, source)
  console.log('src/data.ts updated')
} else {
  console.log('src/data.ts already up to date')
}
