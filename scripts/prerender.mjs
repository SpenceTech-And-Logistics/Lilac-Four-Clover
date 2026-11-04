// Renders the app to static HTML and writes it into dist/index.html,
// so crawlers and link previews see the full page without running JavaScript.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const html = await readFile(path.join(dist, 'index.html'), 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('Could not find the #root placeholder in dist/index.html')

await writeFile(path.join(dist, 'index.html'), html.replace(marker, `<div id="root">${render()}</div>`))
await rm(ssrDir, { recursive: true, force: true })
console.log('Pre-rendered dist/index.html')
