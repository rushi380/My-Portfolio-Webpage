# ⚡ Rushikesh Gaiwal — Portfolio

Single-page portfolio built with **Vite + TypeScript** and a glass/aurora design system — no frameworks, no UI libraries. All project data comes from a typed snapshot of my public GitHub repos (`src/data.ts`).

---

## ✨ Highlights

- 🌌 Aurora + grid background, glassmorphism cards, pointer glow
- ⌨️ Typing effect + terminal card in the hero
- 📂 Real GitHub projects with filters (All / Blockchain / AI / Web) and live demo links
- 🧭 Scroll-spy navigation, mobile hamburger menu, reveal-on-scroll animations
- ♿ Keyboard-friendly, honors `prefers-reduced-motion`, responsive down to small phones

## 🧱 Stack

- [Vite](https://vite.dev) — dev server & build
- [TypeScript](https://www.typescriptlang.org) (strict mode)
- Vanilla CSS design system (custom properties, `clamp()` fluid type)

## 🚀 Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build → dist/
npm run preview   # serve the production build
```

## 📁 Structure

```
index.html        # single page (hero, about, projects, stack, contact)
src/main.ts       # rendering + interactions (filters, scroll-spy, typing, menu)
src/data.ts       # profile + repo snapshot from GitHub — edit descriptions here
src/style.css     # design system
public/           # favicon, avatar
```

## ✏️ Customizing

Project descriptions on GitHub were empty, so the one-liners in `src/data.ts` were written from the repo names — update them to match reality as projects evolve. Stats (repo count, etc.) live in the same file.
