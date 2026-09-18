import { defineConfig } from 'vite'

// Single-page app. Relative base so the build also works when hosted
// from a sub-path (e.g. GitHub Pages project sites).
export default defineConfig({
  base: './',
})
