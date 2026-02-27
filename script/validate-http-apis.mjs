#!/usr/bin/env node

import { readFile } from 'node:fs/promises'

function getArg(flag) {
  const i = process.argv.indexOf(flag)
  if (i >= 0 && i + 1 < process.argv.length) return process.argv[i + 1]
  return undefined
}

const toArray = (v) => (Array.isArray(v) ? v : [v])

function buildUrl(baseUrl, path, query) {
  const u = new URL(path, baseUrl)
  if (query) {
    for (const [k, v] of Object.entries(query)) u.searchParams.set(k, String(v))
  }
  return u.toString()
}

async function readSpec(path) {
  const txt = await readFile(path, 'utf-8')
  const spec = JSON.parse(txt)
  if (!spec?.cases?.length) throw new Error(`No cases found in ${path}`)
  return spec
}

async function fetchOAuthDiscovery(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`Failed to load OAuth discovery: ${r.status} ${await r.text()}`)
  return await r.json()
}

async function exchangeTokenByAuthCode(tokenEndpoint) {
  const clientId = process.env.OPENAPI_CLIENT_ID
  const clientSecret = process.env.OPENAPI_CLIENT_SECRET
  const redirectUri = process.env.OPENAPI_REDIRECT_URI
  const code = process.env.OPENAPI_AUTH_CODE
  if (!clientId || !clientSecret || !redirectUri || !code) {
    throw new Error('Missing OAuth auth-code envs: OPENAPI_CLIENT_ID/OPENAPI_CLIENT_SECRET/OPENAPI_REDIRECT_URI/OPENAPI_AUTH_CODE')
  }

  const form = new URLSearchParams()
  form.set('grant_type', 'authorization_code')
  form.set('client_id', clientId)
  form.set('client_secret', clientSecret)
  form.set('redirect_uri', redirectUri)
  form.set('code', code)

  const r = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  })

  const raw = await r.text()
  if (!r.ok) throw new Error(`OAuth token exchange failed: ${r.status} ${raw}`)
  const json = JSON.parse(raw)
  if (!json.access_token) throw new Error(`OAuth token exchange response missing access_token: ${raw}`)
  return json
}

async function exchangeTokenByRefreshToken(tokenEndpoint) {
  const clientId = process.env.OPENAPI_CLIENT_ID
  const clientSecret = process.env.OPENAPI_CLIENT_SECRET
  const refreshToken = process.env.OPENAPI_REFRESH_TOKEN
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing OAuth refresh envs: OPENAPI_CLIENT_ID/OPENAPI_CLIENT_SECRET/OPENAPI_REFRESH_TOKEN')
  }

  const form = new URLSearchParams()
  form.set('grant_type', 'refresh_token')
  form.set('client_id', clientId)
  form.set('client_secret', clientSecret)
  form.set('refresh_token', refreshToken)

  const r = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  })

  const raw = await r.text()
  if (!r.ok) throw new Error(`OAuth refresh failed: ${r.status} ${raw}`)
  const json = JSON.parse(raw)
  if (!json.access_token) throw new Error(`OAuth refresh response missing access_token: ${raw}`)
  return json
}

async function resolveAccessToken(discoveryUrl) {
  if (process.env.OPENAPI_ACCESS_TOKEN) return process.env.OPENAPI_ACCESS_TOKEN

  const oauth = await fetchOAuthDiscovery(discoveryUrl)
  const tokenEndpoint = oauth.token_endpoint

  if (process.env.OPENAPI_AUTH_CODE) {
    const t = await exchangeTokenByAuthCode(tokenEndpoint)
    console.log('[oauth] access token acquired by authorization_code')
    return t.access_token
  }

  if (process.env.OPENAPI_REFRESH_TOKEN) {
    const t = await exchangeTokenByRefreshToken(tokenEndpoint)
    console.log('[oauth] access token acquired by refresh_token')
    return t.access_token
  }

  return undefined
}

async function run() {
  const specPath = getArg('--spec') || 'script/api-validation-cases.example.json'
  const spec = await readSpec(specPath)

  const baseUrl = process.env.OPENAPI_BASE_URL || spec.baseUrl || 'https://openapi.longbridge.xyz'
  const discoveryUrl =
    process.env.OPENAPI_OAUTH_DISCOVERY ||
    spec.oauthDiscoveryUrl ||
    `${baseUrl.replace(/\/$/, '')}/.well-known/oauth-authorization-server`

  let accessToken
  try {
    accessToken = await resolveAccessToken(discoveryUrl)
  } catch (e) {
    console.warn(`[warn] OAuth token init failed: ${e.message}`)
  }

  console.log(`\n[validate] spec: ${spec.name || specPath}`)
  console.log(`[validate] baseUrl: ${baseUrl}`)
  console.log(`[validate] cases: ${spec.cases.length}`)

  let passed = 0
  const failed = []

  for (const c of spec.cases) {
    const url = buildUrl(baseUrl, c.path, c.query)
    const headers = { ...(spec.defaultHeaders || {}), ...(c.headers || {}) }

    if (c.requiresAuth) {
      if (!accessToken) {
        failed.push(`${c.name}: requiresAuth=true but no access token available`)
        console.log(`✗ ${c.name} (missing token)`)
        continue
      }
      headers.Authorization = accessToken
    }

    const hasBody = c.body !== undefined && c.body !== null
    if (hasBody && !headers['content-type']) headers['content-type'] = 'application/json; charset=utf-8'

    const resp = await fetch(url, {
      method: c.method,
      headers,
      body: hasBody ? JSON.stringify(c.body) : undefined,
    })

    const raw = await resp.text()
    const expectedStatuses = toArray(c.expectedStatus)
    let ok = expectedStatuses.includes(resp.status)

    if (ok && c.expectJsonCode !== undefined) {
      try {
        const json = JSON.parse(raw)
        if (json?.code !== c.expectJsonCode) ok = false
      } catch {
        ok = false
      }
    }

    if (ok && c.expectBodyContains?.length) {
      for (const needle of c.expectBodyContains) {
        if (!raw.includes(needle)) {
          ok = false
          break
        }
      }
    }

    if (ok) {
      passed += 1
      console.log(`✓ ${c.name} [${resp.status}] ${c.method} ${c.path}`)
    } else {
      const hint = raw.slice(0, 280).replace(/\s+/g, ' ')
      failed.push(`${c.name}: expected status ${expectedStatuses.join('/')} got ${resp.status}; body=${hint}`)
      console.log(`✗ ${c.name} [${resp.status}] ${c.method} ${c.path}`)
    }
  }

  console.log(`\n[summary] passed=${passed} failed=${failed.length} total=${spec.cases.length}`)
  if (failed.length) {
    for (const f of failed) console.log(`  - ${f}`)
    process.exit(1)
  }
}

run().catch((err) => {
  console.error(`[fatal] ${err.stack || err.message}`)
  process.exit(1)
})
