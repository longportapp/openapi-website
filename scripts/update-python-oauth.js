import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const OAUTH_BLOCK = `oauth = OAuthBuilder("your-client-id").build(lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)`

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir)
  for (const f of files) {
    const p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) {
      walkDir(p, callback)
    } else if (f.endsWith('.md')) {
      callback(p)
    }
  }
}

walkDir(path.join(__dirname, '..', 'docs'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8')
  if (!content.includes('longport.openapi') && !content.includes('Config.from_env()')) return
  content = content.replace(/from longport\.openapi /g, 'from longbridge.openapi ')
  content = content.replace(/config = Config\.from_env\(\)/g, OAUTH_BLOCK)
  content = content.replace(
    /(from longbridge\.openapi import [^\r\n]+)(\r?\n)/g,
    (m, imp, nl) => (imp.includes('OAuthBuilder') ? m : imp + ', OAuthBuilder' + nl)
  )
  fs.writeFileSync(filePath, content, 'utf8')
  console.log('Updated:', filePath)
})
