// Generates the social share image and app icons in /public.
// Run with: node scripts/make-images.cjs   (needs Playwright)
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const font = (pkg, file) =>
  'data:font/woff2;base64,' + fs.readFileSync(path.join(root, 'node_modules/@fontsource', pkg, 'files', file)).toString('base64')

const LEAF =
  'M0 -2 C-4 -10 -20 -14 -20 -26 C-20 -33 -13 -37 -7 -34 C-3 -32 0 -28 0 -25 C0 -28 3 -32 7 -34 C13 -37 20 -33 20 -26 C20 -14 4 -10 0 -2 Z'
const clover = (fill) =>
  `<g fill="${fill}">${[0, 90, 180, 270].map((r) => `<path d="${LEAF}" transform="rotate(${r})"/>`).join('')}</g>`

const fonts = `
@font-face { font-family: Fraunces; font-weight: 500; src: url(${font('fraunces', 'fraunces-latin-500-normal.woff2')}); }
@font-face { font-family: Fraunces; font-weight: 500; font-style: italic; src: url(${font('fraunces', 'fraunces-latin-500-italic.woff2')}); }
@font-face { font-family: Figtree; font-weight: 500; src: url(${font('figtree', 'figtree-latin-500-normal.woff2')}); }
@font-face { font-family: Figtree; font-weight: 600; src: url(${font('figtree', 'figtree-latin-600-normal.woff2')}); }
* { margin: 0; box-sizing: border-box; }`

const ogHtml = `<style>${fonts}
body { width: 1200px; height: 630px; background: linear-gradient(160deg, #5B3171 0%, #3E1F50 100%); color: #fff; font-family: Figtree, sans-serif; position: relative; overflow: hidden; }
.mark { position: absolute; right: 70px; top: 115px; }
.content { position: absolute; left: 80px; top: 70px; width: 720px; }
.brand { display: flex; align-items: center; gap: 16px; }
.brand b { font-family: Fraunces, serif; font-weight: 500; font-size: 34px; display: block; line-height: 1.1; }
.brand small { font-size: 15px; letter-spacing: .18em; text-transform: uppercase; color: #E3D4EC; }
h1 { font-family: Fraunces, serif; font-weight: 500; font-size: 64px; line-height: 1.08; margin-top: 70px; }
h1 em { color: #9BE0B4; }
.strap { position: absolute; left: 80px; bottom: 64px; font-size: 18px; letter-spacing: .16em; text-transform: uppercase; color: #E3D4EC; }
.url { position: absolute; right: 80px; top: 86px; font-size: 22px; font-weight: 600; color: #9BE0B4; }
</style>
<div class="content">
  <div class="brand"><svg width="56" height="56" viewBox="-40 -40 80 80">${clover('#C9A6DD')}</svg><span><b>Lilac Four Clover</b><small>Africa Ventures</small></span></div>
  <h1>Business registration and compliance in Kenya, made <em>straightforward</em>.</h1>
</div>
<svg class="mark" width="340" height="340" viewBox="0 0 320 320">
  <circle cx="160" cy="160" r="150" fill="none" stroke="#C9A6DD" stroke-opacity=".3" stroke-dasharray="2 10" stroke-linecap="round"/>
  <circle cx="160" cy="160" r="118" fill="none" stroke="#C9A6DD" stroke-opacity=".2"/>
  <g transform="translate(160 160) scale(2.75) rotate(20)" opacity=".9">${clover('#C9A6DD')}</g>
  <circle cx="160" cy="160" r="7" fill="#9BE0B4"/>
</svg>
<div class="strap">Business registration &nbsp;|&nbsp; Corporate compliance &nbsp;|&nbsp; Business support</div>
<div class="url">lilacfourclover.com</div>`

const iconHtml = (size, radius) => `<style>* { margin: 0; } body { width: ${size}px; height: ${size}px; background: transparent; }
div { width: 100%; height: 100%; border-radius: ${radius}; background: linear-gradient(160deg, #6A3A84, #3E1F50); display: grid; place-items: center; }</style>
<div><svg width="${size * 0.7}" height="${size * 0.7}" viewBox="-40 -40 80 80">${clover('#D9BDE8')}<circle r="3.2" fill="#9BE0B4"/></svg></div>`

;(async () => {
  const b = await chromium.launch()
  const shot = async (html, w, h, file, transparent = false) => {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
    await p.setContent(html)
    await p.evaluate(() => document.fonts.ready)
    await p.screenshot({ path: path.join(root, 'public', file), omitBackground: transparent })
    await p.close()
    console.log('wrote public/' + file)
  }
  await shot(ogHtml, 1200, 630, 'og-image.png')
  await shot(iconHtml(180, '0'), 180, 180, 'apple-touch-icon.png')
  await shot(iconHtml(192, '0'), 192, 192, 'icon-192.png')
  await shot(iconHtml(512, '0'), 512, 512, 'icon-512.png')
  await b.close()
})()
