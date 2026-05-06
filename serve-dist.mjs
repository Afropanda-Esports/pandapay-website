import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import http from 'node:http'

const port = Number(process.env.PORT || 5174)
const distDir = join(process.cwd(), 'dist')

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
}

function sendFile(res, filePath) {
  const ext = extname(filePath).toLowerCase()
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  res.writeHead(200, { 'Content-Type': contentType })
  createReadStream(filePath).pipe(res)
}

http
  .createServer((req, res) => {
    const urlPath = req.url?.split('?')[0] || '/'
    const normalizedPath = normalize(urlPath).replace(/^(\.\.[/\\])+/, '')
    const candidate = join(distDir, normalizedPath)

    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return sendFile(res, candidate)
    }

    if (existsSync(candidate) && statSync(candidate).isDirectory()) {
      const indexFile = join(candidate, 'index.html')
      if (existsSync(indexFile)) {
        return sendFile(res, indexFile)
      }
    }

    const fallback = join(distDir, 'index.html')
    if (existsSync(fallback)) {
      return sendFile(res, fallback)
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found')
  })
  .listen(port, '0.0.0.0', () => {
    console.log(`Static server ready on http://0.0.0.0:${port}`)
  })
