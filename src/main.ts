import './style.css'
import { repos, roles, skillGroups, type Repo } from './data'

const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  Solidity: '#aa6746',
}

// ---------- Render: tech ticker ----------
const tickerTrack = document.getElementById('ticker-track')
if (tickerTrack) {
  const items = ['TypeScript', 'Solidity', 'JavaScript', 'HTML5', 'CSS3', 'Web3', 'Vite', 'Git', 'dApps', 'GitHub']
  const half = items.map((item) => `<span>${item}</span><span class="t-sep">✦</span>`).join('')
  tickerTrack.innerHTML = half + half // duplicated so the CSS -50% loop is seamless
}

// ---------- Render: project cards ----------
const grid = document.getElementById('project-grid')
if (grid) {
  const card = (repo: Repo) => `
    <article class="project-card card reveal" data-category="${repo.category}">
      <div class="project-top">
        <h3 class="project-name">${repo.name}</h3>
        <span class="project-arrow" aria-hidden="true">↗</span>
      </div>
      <p class="project-desc">${repo.description}</p>
      <div class="project-meta">
        <span class="lang"><i style="background: ${langColors[repo.language] ?? '#8b5cf6'}"></i>${repo.language}</span>
        <span>updated ${repo.updated}</span>
      </div>
      <div class="project-links">
        <a class="chip-btn" href="${repo.url}" target="_blank" rel="noopener">Code</a>
        ${repo.live ? `<a class="chip-btn chip-btn-live" href="${repo.live}" target="_blank" rel="noopener">Live ↗</a>` : ''}
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
        <h3>${group.title}</h3>
        <ul>${group.items.map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>`,
    )
    .join('')
}

// ---------- Project filters ----------
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter')
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.toggle('active', b === button))
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

// ---------- Pointer glow (desktop only) ----------
const glow = document.getElementById('glow')
if (glow && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
  })
}

// ---------- Footer year ----------
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = String(new Date().getFullYear())
