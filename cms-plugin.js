import fs from 'fs'
import path from 'path'

function formatProject(p) {
  const fields = ['num', 'title', 'url', 'domain', 'desc', 'tags', 'badge']
  const lines = fields
    .filter(k => {
      const v = p[k]
      if (v === undefined || v === null || v === '') return false
      if (Array.isArray(v) && v.length === 0) return false
      return true
    })
    .map(k => {
      const v = p[k]
      let formatted
      if (Array.isArray(v)) {
        formatted = `[${v.map(t => `'${String(t).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`).join(', ')}]`
      } else {
        formatted = `'${String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
      }
      return `    ${k}: ${formatted}`
    })
  return `  {\n${lines.join(',\n')}\n  }`
}

function buildProjectsFile(data) {
  const cats = ['webflow', 'wordpress', 'react', 'government']
  return cats
    .map(cat => {
      const items = (data[cat] || []).map(formatProject).join(',\n')
      return `export const ${cat}Projects = [\n${items}\n]`
    })
    .join('\n\n') + '\n'
}

export function cmsApiPlugin() {
  return {
    name: 'cms-api',
    configureServer(server) {
      server.middlewares.use('/api/save-projects', (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405)
          res.end('Method Not Allowed')
          return
        }

        let body = ''
        req.on('data', chunk => { body += chunk.toString() })
        req.on('end', () => {
          try {
            const data = JSON.parse(body)
            const filePath = path.resolve('src/data/projects.js')
            // Only write the 4 project arrays — caseStudies lives in caseStudies.js now
            const content = buildProjectsFile(data)
            fs.writeFileSync(filePath, content, 'utf-8')
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: true }))
          } catch (err) {
            console.error('[CMS Plugin] Error:', err)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false, error: String(err) }))
          }
        })
      })
    }
  }
}
