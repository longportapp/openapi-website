#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises'

function getArg(flag) {
  const i = process.argv.indexOf(flag)
  if (i >= 0 && i + 1 < process.argv.length) return process.argv[i + 1]
  return undefined
}

async function main() {
  const openapiPath = getArg('--openapi') || 'openapi/openapi.baseline.json'
  const outPath = getArg('--out') || 'script/api-validation-cases.generated.json'

  const raw = await readFile(openapiPath, 'utf-8')
  const spec = JSON.parse(raw)

  const baseUrl = process.env.OPENAPI_BASE_URL || spec.servers?.[0]?.url
  if (!baseUrl) throw new Error('No server url found in OpenAPI spec')

  const cases = []

  for (const [path, methods] of Object.entries(spec.paths || {})) {
    for (const [method, op] of Object.entries(methods || {})) {
      const m = method.toUpperCase()
      if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(m)) continue

      const xv = op['x-validation'] || {}
      cases.push({
        name: op.summary || `${m} ${path}`,
        method: m,
        path,
        requiresAuth: xv.requiresAuth || false,
        expectedStatus: xv.expectedStatus || 200,
        expectJsonCode: xv.expectJsonCode,
        expectBodyContains: xv.expectBodyContains
      })
    }
  }

  const output = {
    name: `${spec.info?.title || 'OpenAPI'} / generated validation cases`,
    baseUrl,
    oauthDiscoveryUrl: `${baseUrl.replace(/\/$/, '')}/.well-known/oauth-authorization-server`,
    defaultHeaders: { accept: 'application/json' },
    cases
  }

  await writeFile(outPath, JSON.stringify(output, null, 2) + '\n', 'utf-8')
  console.log(`[ok] generated ${cases.length} cases -> ${outPath}`)
}

main().catch((e) => {
  console.error(`[fatal] ${e.stack || e.message}`)
  process.exit(1)
})
