# API Validation Script

## Purpose

Validate documented HTTP APIs against real service behavior (`openapi.longbridge.xyz`) before merging documentation changes.

## Run

```bash
npm run validate:apis
```

Equivalent:

```bash
node script/validate-http-apis.mjs --spec script/api-validation-cases.example.json
```

## Auth Modes

### 1) Existing access token (recommended for CI)

```bash
export OPENAPI_ACCESS_TOKEN="..."
npm run validate:apis
```

### 2) OAuth2 authorization code exchange

```bash
export OPENAPI_CLIENT_ID="..."
export OPENAPI_CLIENT_SECRET="..."
export OPENAPI_REDIRECT_URI="..."
export OPENAPI_AUTH_CODE="..."
npm run validate:apis
```

### 3) OAuth2 refresh token exchange

```bash
export OPENAPI_CLIENT_ID="..."
export OPENAPI_CLIENT_SECRET="..."
export OPENAPI_REFRESH_TOKEN="..."
npm run validate:apis
```

## Custom cases

Create your own spec JSON and pass via `--spec`:

```bash
node script/validate-http-apis.mjs --spec script/my-api-cases.json
```

Each case supports:

- `method`, `path`, `query`, `headers`, `body`
- `expectedStatus` (number or array)
- `requiresAuth`
- `expectJsonCode`
- `expectBodyContains`

## Suggested rule in PR

For every API doc changed, add/adjust at least one validation case and include run output in PR description.
