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

// What the hero types out, one after another
export const roles = ['blockchain dApps', 'smart contracts', 'clean web interfaces', 'things that ship']

// Snapshot of github.com/rushi380 (September 2026).
// The repos have no descriptions on GitHub, so these one-liners were
// written from the repo names — edit them to match the real projects.
export const repos: Repo[] = [
  {
    name: 'creator_authenticity_ledger',
    description: 'Ledger-based approach to verifying the authenticity of creator content — proofs, ownership and history.',
    language: 'TypeScript',
    category: 'blockchain',
    url: 'https://github.com/rushi380/creator_authenticity_ledger',
    live: 'https://creator-authenticity-ledger.vercel.app',
    updated: '2026-09',
  },
  {
    name: 'midnight-private-allowlist',
    description: 'A privacy-preserving allowlist built with Midnight — confidential membership without exposing identities.',
    language: 'TypeScript',
    category: 'blockchain',
    url: 'https://github.com/rushi380/midnight-private-allowlist',
    live: 'https://midnight-private-allowlist.vercel.app',
    updated: '2026-08',
  },
  {
    name: 'Scholarship-_Eligibility-_dapp',
    description: 'A decentralized app that checks and manages scholarship eligibility transparently on-chain.',
    language: 'TypeScript',
    category: 'blockchain',
    url: 'https://github.com/rushi380/Scholarship-_Eligibility-_dapp',
    updated: '2026-08',
  },
  {
    name: 'DukanAI',
    description: 'An AI-powered assistant for running a dukan (shop) — inventory and insights in one place.',
    language: 'JavaScript',
    category: 'ai',
    url: 'https://github.com/rushi380/DukanAI',
    live: 'https://dukan-rfzw1pnc8-rushi380s-projects.vercel.app',
    updated: '2026-05',
  },
  {
    name: 'fundchain-v3',
    description: 'Third iteration of FundChain — a decentralized funding platform connecting creators and backers.',
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
