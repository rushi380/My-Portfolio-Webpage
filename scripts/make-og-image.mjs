// Regenerates public/og-image.png (the 1200x630 social preview card used in
// og:image / twitter:image meta tags). One-off tool — only needed again if the
// name, title or design tokens change:
//   npm i --no-save sharp && node scripts/make-og-image.mjs
import sharp from 'sharp'

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="blob-violet" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blob-cyan" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#05060b"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <ellipse cx="1010" cy="60" rx="430" ry="330" fill="url(#blob-violet)"/>
  <ellipse cx="110" cy="620" rx="430" ry="310" fill="url(#blob-cyan)"/>

  <text x="90" y="168" font-family="'Consolas','Cascadia Code',monospace" font-size="26" fill="#8b5cf6">$ whoami</text>
  <text x="90" y="298" font-family="'Segoe UI','Arial',sans-serif" font-weight="700" font-size="104" fill="#e8eaf2">Rushikesh</text>
  <text x="90" y="416" font-family="'Segoe UI','Arial',sans-serif" font-weight="700" font-size="104" fill="#e8eaf2">Gaiwal</text>
  <rect x="90" y="458" width="190" height="7" rx="3.5" fill="url(#accent)"/>
  <text x="90" y="524" font-family="'Segoe UI','Arial',sans-serif" font-weight="600" font-size="30" fill="#c3c8d6">Blockchain &amp; Web Developer</text>
  <text x="90" y="568" font-family="'Consolas','Cascadia Code',monospace" font-size="24" fill="#9aa1b2">dApps · smart contracts · modern web</text>

  <g>
    <rect x="820" y="150" width="300" height="330" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
    <circle cx="850" cy="182" r="6" fill="#ff5f57"/>
    <circle cx="872" cy="182" r="6" fill="#febc2e"/>
    <circle cx="894" cy="182" r="6" fill="#28c840"/>
    <text x="930" y="188" font-family="'Consolas','Cascadia Code',monospace" font-size="15" fill="#9aa1b2">rushikesh@dev</text>
    <line x1="820" y1="204" x2="1120" y2="204" stroke="rgba(255,255,255,0.12)"/>
    <text x="844" y="248" font-family="'Consolas','Cascadia Code',monospace" font-size="17" fill="#9aa1b2">$ whoami</text>
    <text x="844" y="280" font-family="'Consolas','Cascadia Code',monospace" font-size="17" fill="#e8eaf2">rushikesh-gaiwal</text>
    <text x="844" y="326" font-family="'Consolas','Cascadia Code',monospace" font-size="17" fill="#9aa1b2">$ cat focus.txt</text>
    <text x="844" y="358" font-family="'Consolas','Cascadia Code',monospace" font-size="17" fill="#e8eaf2">blockchain · web</text>
    <text x="844" y="404" font-family="'Consolas','Cascadia Code',monospace" font-size="17" fill="#9aa1b2">$ status</text>
    <text x="844" y="436" font-family="'Consolas','Cascadia Code',monospace" font-size="17" fill="#e8eaf2">building in public</text>
    <rect x="844" y="448" width="11" height="22" fill="#22d3ee"/>
  </g>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og-image.png')
console.log('public/og-image.png written')
