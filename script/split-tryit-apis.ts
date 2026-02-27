#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

type Locale = 'en' | 'zh-CN' | 'zh-HK'

interface TryItParam {
  name: string
  type: string
  required: boolean
  description: string
}

interface TryItApiSpec {
  id: string
  locale: Locale
  title: string
  method: string
  path: string
  source: string
  params: TryItParam[]
}

const ROOT = process.cwd()
const DOCS_ROOT = join(ROOT, 'docs')
const OUT_DIR = join(ROOT, 'openapi', 'tryit')
const LOCALES: Locale[] = ['en', 'zh-CN', 'zh-HK']

function walk(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else if (st.isFile() && name.endsWith('.md')) out.push(full)
  }
  return out
}

function parseTitle(md: string): string {
  const fm = md.match(/^---[\s\S]*?^---/m)?.[0] || ''
  const t = fm.match(/^title:\s*(.+)$/m)?.[1]?.trim()
  if (t) return t.replace(/^['"]|['"]$/g, '')
  const h1 = md.match(/^#\s+(.+)$/m)?.[1]?.trim()
  return h1 || 'Untitled API'
}

function parseMethodAndPath(md: string): { method: string; path: string } | null {
  const method = md.match(/HTTP Method<\/td><td>\s*([^<\n]+)/i)?.[1]?.trim()
  const path = md.match(/HTTP URL<\/td><td>\s*([^<\n]+)/i)?.[1]?.trim()
  if (!method || !path) return null
  return { method, path }
}

function parseParameters(md: string): TryItParam[] {
  const lines = md.split('\n')
  const out: TryItParam[] = []

  let i = lines.findIndex((l) => /^\|\s*Name\s*\|\s*Type\s*\|\s*Required\s*\|\s*Description\s*\|/i.test(l))
  if (i < 0) return out

  // skip header + separator
  i += 2
  for (; i < lines.length; i++) {
    const l = lines[i]
    if (!l.trim().startsWith('|')) break
    const cols = l
      .split('|')
      .slice(1, -1)
      .map((x) => x.trim())
    if (cols.length < 4) continue
    const [name, type, requiredRaw, description] = cols
    if (!name || /^-+$/.test(name)) continue
    out.push({
      name,
      type,
      required: ['YES', 'Y', 'TRUE', '是'].includes(requiredRaw.toUpperCase()),
      description,
    })
  }

  return out
}

function normalizeId(path: string, method: string, locale: Locale): string {
  const p = path.replace(/^\//, '').replace(/\//g, '_').replace(/[^a-zA-Z0-9_]/g, '')
  return `${locale}__${method.toLowerCase()}__${p}`
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  const all: TryItApiSpec[] = []

  for (const locale of LOCALES) {
    const dir = join(DOCS_ROOT, locale, 'docs')
    const files = walk(dir)

    const specs: TryItApiSpec[] = []
    for (const f of files) {
      const md = readFileSync(f, 'utf-8')
      const basic = parseMethodAndPath(md)
      if (!basic) continue

      const title = parseTitle(md)
      const params = parseParameters(md)
      const source = relative(ROOT, f)
      const id = normalizeId(basic.path, basic.method, locale)

      specs.push({
        id,
        locale,
        title,
        method: basic.method,
        path: basic.path,
        source,
        params,
      })
    }

    specs.sort((a, b) => `${a.method} ${a.path}`.localeCompare(`${b.method} ${b.path}`))
    all.push(...specs)

    const localeOut = join(OUT_DIR, `apis.${locale}.json`)
    writeFileSync(localeOut, JSON.stringify(specs, null, 2) + '\n')
    console.log(`[split-tryit] ${locale}: ${specs.length} apis -> ${relative(ROOT, localeOut)}`)
  }

  const allOut = join(OUT_DIR, 'apis.all.json')
  writeFileSync(allOut, JSON.stringify(all, null, 2) + '\n')
  console.log(`[split-tryit] all: ${all.length} apis -> ${relative(ROOT, allOut)}`)
}

main()
