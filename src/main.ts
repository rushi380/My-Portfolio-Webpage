import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import './style.css'
import { repos, roles, heroStats, skillGroups, type Repo } from './data'

// All rendered strings pass through escapeHtml so data.ts can never inject
// markup — matters the day this file is generated from an API instead of hand-edited.
const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] ?? ch))

const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  Solidity: '#aa6746',
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// data.ts stores 'YYYY-MM' — display it as 'Sep 2026'
const formatUpdated = (value: string): string => {
  const [year, month] = value.split('-')
  const monthName = months[Number(month) - 1]
  if (!year || !monthName) return value
  return `${monthName} ${year}`
}

// ---------- Render: tech ticker ----------
const tickerTrack = document.getElementById('ticker-track')
if (tickerTrack) {
  const items = ['TypeScript', 'Solidity', 'JavaScript', 'HTML5', 'CSS3', 'Web3', 'Vite', 'Git', 'dApps', 'GitHub']
  const half = items.map((item) => `<span>${escapeHtml(item)}</span><span class="t-sep">✦</span>`).join('')
  tickerTrack.innerHTML = half + half // duplicated so the CSS -50% loop is seamless
}

// ---------- Render: hero stats (source of truth: data.ts) ----------
const heroStatsEl = document.getElementById('hero-stats')
if (heroStatsEl) {
  heroStatsEl.innerHTML = heroStats
    .map((stat) => `<li><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></li>`)
    .join('')
}

// ---------- Render: project filters (only categories that actually have repos) ----------
const categoryLabels: Record<Repo['category'] | 'all', string> = {
  all: 'All',
  blockchain: 'Blockchain',
  ai: 'AI',
  web: 'Web',
}
const activeCategories = (['blockchain', 'ai', 'web'] as const).filter((category) =>
  repos.some((repo) => repo.category === category),
)
const filtersEl = document.getElementById('filters')
if (filtersEl) {
  const filters: Array<Repo['category'] | 'all'> = ['all', ...activeCategories]
  filtersEl.innerHTML = filters
    .map(
      (filter) =>
        `<button class="filter${filter === 'all' ? ' active' : ''}" data-filter="${filter}" aria-pressed="${filter === 'all'}">${categoryLabels[filter]}</button>`,
    )
    .join('')
}

// ---------- Render: project cards ----------
const grid = document.getElementById('project-grid')
if (grid) {
  const card = (repo: Repo) => `
    <article class="project-card card reveal" data-category="${repo.category}">
      <div class="project-top">
        <h3 class="project-name">${escapeHtml(repo.name)}</h3>
        <span class="project-arrow" aria-hidden="true">↗</span>
      </div>
      <p class="project-desc">${escapeHtml(repo.description)}</p>
      <div class="project-meta">
        <span class="lang"><i style="background: ${langColors[repo.language] ?? '#8b5cf6'}"></i>${escapeHtml(repo.language)}</span>
        <span>updated ${escapeHtml(formatUpdated(repo.updated))}</span>
      </div>
      <div class="project-links">
        <a class="chip-btn" href="${escapeHtml(repo.url)}" target="_blank" rel="noopener">Code</a>
        ${repo.live ? `<a class="chip-btn chip-btn-live" href="${escapeHtml(repo.live)}" target="_blank" rel="noopener">Live ↗</a>` : ''}
      </div>
    </article>`
  grid.innerHTML = repos.map(card).join('')
}

// ---------- Render: stack groups ----------
const stackGrid = document.getElementById('stack-grid')
if (stackGrid) {
  stackGrid.innerHTML = skillGroups
    .map(
      (group) => `
      <div class="stack-card card reveal">
        <h3>${escapeHtml(group.title)}</h3>
        <ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>`,
    )
    .join('')
}

// ---------- Project filters ----------
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter')
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((b) => {
      const active = b === button
      b.classList.toggle('active', active)
      b.setAttribute('aria-pressed', String(active))
    })
    const filter = button.dataset.filter
    document.querySelectorAll<HTMLElement>('.project-card').forEach((cardEl) => {
      cardEl.classList.toggle('hidden', filter !== 'all' && cardEl.dataset.category !== filter)
    })
  })
})

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    }
  },
  { threshold: 0.12 },
)
document.querySelectorAll('.reveal').forEach((el, index) => {
  ;(el as HTMLElement).style.transitionDelay = `${(index % 3) * 70}ms`
  revealObserver.observe(el)
})

// ---------- Scroll-spy + nav background ----------
const nav = document.getElementById('site-nav')
const navLinks = document.querySelectorAll<HTMLAnchorElement>('#nav-links a')
const sections = [...navLinks]
  .map((link) => document.querySelector<HTMLElement>(link.hash))
  .filter((section): section is HTMLElement => section !== null)

window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 8), { passive: true })

const spy = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`))
    }
  },
  { rootMargin: '-35% 0px -60% 0px' },
)
sections.forEach((section) => spy.observe(section))

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menu-toggle')
menuToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open')
  menuToggle.setAttribute('aria-expanded', String(open))
})
navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open')
    menuToggle?.setAttribute('aria-expanded', 'false')
  }),
)

// ---------- Hero typing effect ----------
const typedEl = document.getElementById('typed')
const typedSrEl = document.getElementById('typed-sr')
if (typedSrEl) typedSrEl.textContent = roles.join(', ') // stable text for screen readers
if (typedEl) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedEl.textContent = roles[0]
  } else {
    let roleIndex = 0
    let charIndex = 0
    let deleting = false
    const tick = () => {
      const word = roles[roleIndex]
      charIndex += deleting ? -1 : 1
      typedEl.textContent = word.slice(0, charIndex)
      let delay = deleting ? 38 : 78
      if (!deleting && charIndex === word.length) {
        delay = 1600
        deleting = true
      } else if (deleting && charIndex === 0) {
        deleting = false
        roleIndex = (roleIndex + 1) % roles.length
        delay = 350
      }
      window.setTimeout(tick, delay)
    }
    tick()
  }
}

// ---------- Pointer glow (desktop only, rAF-throttled) ----------
const glow = document.getElementById('glow')
if (glow && window.matchMedia('(pointer: fine)').matches) {
  let glowX = 0
  let glowY = 0
  let glowRaf = 0
  window.addEventListener('pointermove', (event) => {
    glowX = event.clientX
    glowY = event.clientY
    if (!glowRaf) {
      glowRaf = requestAnimationFrame(() => {
        glowRaf = 0
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`
      })
    }
  })
}

// ---------- Footer year ----------
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = String(new Date().getFullYear())
