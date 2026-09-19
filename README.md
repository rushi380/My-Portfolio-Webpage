# ⚡ Rushikesh Gaiwal — Portfolio

Single-page portfolio built with **Vite + TypeScript** and a glass/aurora design system — no frameworks, no UI libraries. All project data comes from a typed snapshot of my public GitHub repos (`src/data.ts`).

**🔴 Live:** [my-portfolio-webpage-ten.vercel.app](https://my-portfolio-webpage-ten.vercel.app/)

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

## 🚢 Deploying to Vercel

The repo ships ready for Vercel — `vercel.json` pins the build settings and `package.json` requests Node ≥ 20.19 (required by Vite 8).

**Via dashboard (recommended)**

1. Push the repo to GitHub, then open [vercel.com/new](https://vercel.com/new) and import it.
2. Vercel auto-detects the Vite preset; the settings below are picked up from `vercel.json` — no manual changes needed. Click **Deploy**.
3. Every push to `main` triggers a production deploy, and every PR gets its own preview URL.

Production URL: `https://my-portfolio-webpage-ten.vercel.app/`

**Via CLI**

```bash
npm i -g vercel
vercel           # preview deployment
vercel --prod    # production deployment
```

Settings used (all pre-configured in `vercel.json`):

| Setting          | Value                                             |
| ---------------- | ------------------------------------------------- |
| Framework preset | Vite                                              |
| Build command    | `npm run build` (type-check + `vite build`)        |
| Output directory | `dist`                                            |
| Node version     | ≥ 20.19 (`engines.node` in `package.json`)         |
| Install command  | `npm install` (default)                           |


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
