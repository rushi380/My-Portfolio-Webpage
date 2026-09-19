export interface Repo {
  name: string
  description: string
  language: string
  category: 'blockchain' | 'ai' | 'web'
  url: string
  live?: string
  updated: string // YYYY-MM, from the repo's last push
}

export const profile = {
  name: 'Rushikesh Gaiwal',
  handle: 'rushi380',
  tagline: 'Programmer & blockchain student — exploring web3, smart contracts and modern web development.',
  github: 'https://github.com/rushi380',
  email: 'rushikeshgaiwal66@mail.com',
  phoneDisplay: '969-951-5784',
  phone: 'tel:9699515784',
  linkedin: 'https://www.linkedin.com/in/rushikesh-gaiwal-2198ab321/',
  x: 'https://x.com/RushikesGaiwal',
  reposCount: 9,
  memberSince: '2025',
}

// Hero stat pills — rendered by main.ts, so edit values here, not in index.html
export const heroStats: Array<{ value: string; label: string }> = [
  { value: String(profile.reposCount), label: 'public repos' },
  { value: 'Solidity + TS', label: 'core focus' },
  { value: profile.memberSince, label: 'building since' },
]

// What the hero types out, one after another
export const roles = ['blockchain dApps', 'smart contracts', 'clean web interfaces', 'things that ship']

// Snapshot of github.com/rushi380 (September 2026).
// Descriptions are one-liners written from each repo's README — keep them
// current as projects evolve. `language`, `updated` and profile.reposCount
// are refreshed weekly from the GitHub API by scripts/refresh-data.mjs.
export const repos: Repo[] = [
  {
    name: 'creator_authenticity_ledger',
    description: 'Creators prove their engagement metrics meet brand thresholds on Midnight with zero-knowledge proofs — no raw numbers revealed.',
    language: 'TypeScript',
    category: 'blockchain',
    url: 'https://github.com/rushi380/creator_authenticity_ledger',
    live: 'https://creator-authenticity-ledger.vercel.app',
    updated: '2026-09',
  },
  {
    name: 'midnight-private-allowlist',
    description: 'Prove you\'re on the allowlist without revealing who you are — Merkle commitments and nullifier anti-replay on Midnight.',
    language: 'TypeScript',
    category: 'blockchain',
    url: 'https://github.com/rushi380/midnight-private-allowlist',
    live: 'https://midnight-private-allowlist.vercel.app',
    updated: '2026-08',
  },
  {
    name: 'Scholarship-_Eligibility-_dapp',
    description: 'Students prove scholarship eligibility with zero-knowledge proofs — marks clear the bar, income stays under the cap, neither is exposed.',
    language: 'TypeScript',
    category: 'blockchain',
    url: 'https://github.com/rushi380/Scholarship-_Eligibility-_dapp',
    updated: '2026-08',
  },
  {
    name: 'DukanAI',
    description: 'Voice-first inventory manager for Indian kirana shops — Hindi voice commands and bill scanning via Gemini, WhatsApp restock alerts.',
    language: 'JavaScript',
    category: 'ai',
    url: 'https://github.com/rushi380/DukanAI',
    live: 'https://dukan-rfzw1pnc8-rushi380s-projects.vercel.app',
    updated: '2026-05',
  },
  {
    name: 'fundchain-v3',
    description: 'Milestone-based crowdfunding on Stellar Soroban — Rust contracts release funds in stages, with reward tokens and live on-chain metrics.',
    language: 'JavaScript',
    category: 'blockchain',
    url: 'https://github.com/rushi380/fundchain-v3',
    live: 'https://fundchain-v3.vercel.app',
    updated: '2026-04',
  },
]

export const skillGroups: Array<{ title: string; items: string[] }> = [
  { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Solidity', 'HTML5', 'CSS3'] },
  { title: 'Blockchain', items: ['Smart contracts', 'dApps', 'Web3', 'Wallets', 'Privacy chains'] },
  { title: 'Tools & workflow', items: ['Git & GitHub', 'Vite', 'Vercel', 'Responsive design', 'REST APIs'] },
]
