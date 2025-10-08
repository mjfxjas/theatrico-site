// Replicate index.html into route directories for static hosting
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const routes = ['film', 'people', 'tivoli-proposal']
const distDir = process.argv[2] ?? 'dist'
const outputPaths = process.argv.slice(3)

async function main() {
  const indexPath = path.join(distDir, 'index.html')
  const html = await readFile(indexPath)

  const targets = outputPaths.length > 0 ? outputPaths : routes

  for (const route of targets) {
    const routeDir = path.join(distDir, route)
    const routeFile = path.join(routeDir, 'index.html')

    await mkdir(routeDir, { recursive: true })
    await writeFile(routeFile, html)
  }

  if (targets.length > 0) {
    console.log(`[create-spa-route-indexes] copied index.html into: ${targets.join(', ')}`)
  } else {
    console.log('[create-spa-route-indexes] no routes supplied; nothing to do')
  }
}

main().catch((error) => {
  console.error(`[create-spa-route-indexes] ${error.message}`)
  process.exit(1)
})
