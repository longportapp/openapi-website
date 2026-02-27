#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

type Locale = 'en' | 'zh-CN' | 'zh-HK'

const ROOT = process.cwd()
const DOCS_ROOT = join(ROOT, 'docs')
const LOCALES: Locale[] = ['en', 'zh-CN', 'zh-HK']

const META: Record<Locale, { title: string; desc: string }> = {
  en: {
    title: 'API Endpoints',
    desc: 'All HTTP APIs, listed one-by-one like an API reference catalog.',
  },
  'zh-CN': {
    title: 'API 接口目录',
    desc: '按接口逐条列出所有 HTTP API，便于快速检索与跳转。',
  },
  'zh-HK': {
    title: 'API 介面目錄',
    desc: '按介面逐條列出所有 HTTP API，方便快速檢索與跳轉。',
  },
}

function walk(dir: string): string[] {
  const out: string[] = []
  for (const n of readdirSync(dir)) {
    const full = join(dir, n)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else if (st.isFile() && n.endsWith('.md')) out.push(full)
  }
  return out
}

function extractApi(md: string): { method: string; path: string } | null {
  const method = md.match(/HTTP Method<\/td><td>\s*([^<\n]+)/i)?.[1]?.trim().toUpperCase()
  const path = md.match(/HTTP URL<\/td><td>\s*([^<\n]+)/i)?.[1]?.trim()
  if (!method || !path) return null
  return { method, path }
}

for (const locale of LOCALES) {
  const docsDir = join(DOCS_ROOT, locale, 'docs')
  const files = walk(docsDir)
  const rows: { method: string; path: string; title: string; rel: string }[] = []

  for (const file of files) {
    const md = readFileSync(file, 'utf-8')
    const api = extractApi(md)
    if (!api) continue

    const title = md.match(/^title:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '') || 'Untitled'
    const rel = relative(docsDir, file).replaceAll('\\', '/').replace(/\.md$/, '')
    rows.push({ ...api, title, rel })
  }

  rows.sort((a, b) => `${a.path}:${a.method}`.localeCompare(`${b.path}:${b.method}`))

  const grouped = new Map<string, typeof rows>()
  for (const row of rows) {
    const parts = row.path.split('/')
    const group = parts.length > 2 ? parts[2] : 'other'
    if (!grouped.has(group)) grouped.set(group, [])
    grouped.get(group)!.push(row)
  }

  const out: string[] = [
    '---',
    `title: ${META[locale].title}`,
    'id: api-endpoints-catalog',
    'slug: /api-endpoints',
    'sidebar_position: 1',
    '---',
    '',
    META[locale].desc,
    '',
  ]

  for (const [group, items] of grouped) {
    out.push(`## ${group.toUpperCase()}`)
    out.push('')
    out.push('| Method | Path | API | Try-It |')
    out.push('| --- | --- | --- | --- |')
    for (const row of items) {
      const apiLink = `../${row.rel}`
      out.push(`| \`${row.method}\` | \`${row.path}\` | [${row.title}](${apiLink}) | [Try](${apiLink}?mode=try-it) |`)
    }
    out.push('')
  }

  const outFile = join(docsDir, 'api-reference', 'endpoints.md')
  writeFileSync(outFile, out.join('\n') + '\n', 'utf-8')
  console.log(`[catalog] ${locale}: ${rows.length} APIs -> ${relative(ROOT, outFile)}`)
}
