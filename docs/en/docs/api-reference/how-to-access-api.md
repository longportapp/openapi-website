---
title: Overview
id: how-to-access-api
slug: /how-to-access-api
sidebar_position: 1
---

This page is reorganized as a practical **OAuth 2.0 access flow** for new integrations.

:::success Tip
Prefer using SDKs for faster integration:

https://open.longbridge.com/sdk
:::

## Notes

| Precautions                                  | Reference                                                             |
| -------------------------------------------- | --------------------------------------------------------------------- |
| Prefer SDKs over raw HTTP when possible      | [SDK Quick Start](../docs/getting-started)                            |
| Enable required OpenAPI services first       | [How to enable OpenAPI](../docs/#how-to-enable-openapi)               |
| Understand permissions and restrictions      | [Permissions and restrictions](../docs/#permissions-and-restrictions) |
| Check common error codes for troubleshooting | [Error Codes](../docs/error-codes)                                    |

## OAuth 2.0 (Default)

For new integrations, OAuth 2.0 is the default path.

API-key signature mode can remain as a fallback for legacy compatibility, but it is not the default.

### Discovery endpoints

- Production: `https://openapi.longbridge.com/.well-known/oauth-authorization-server`
- China: `https://openapi.longbridge.com/.well-known/oauth-authorization-server`

Supported grant types (from discovery):

- `authorization_code`
- `refresh_token`

## OAuth 2.0 flow (step-by-step)

### 1) Register OAuth client

If there is no UI for client creation in your environment, register dynamically:

<Tabs groupId="shell">
<TabItem value="bash" label="Bash" default>

```bash
curl -X POST https://openapi.longbridge.com/oauth2/register \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "my-openapi-app",
    "redirect_uris": ["https://your-app.com/callback"],
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"]
  }'
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
$body = @{
    client_name    = "my-openapi-app"
    redirect_uris  = @("https://your-app.com/callback")
    grant_types    = @("authorization_code", "refresh_token")
    response_types = @("code")
} | ConvertTo-Json

Invoke-RestMethod -Method POST `
    -Uri "https://openapi.longbridge.com/oauth2/register" `
    -ContentType "application/json" `
    -Body $body
```

</TabItem>
</Tabs>

> Registration may return only `client_id` (public client, no `client_secret`). In this case, use PKCE and do not send `client_secret` in token requests.

### 2) Build authorization URL and get `code`

```text
https://openapi.longbridge.com/oauth2/authorize
  ?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=YOUR_REDIRECT_URI
  &scope=3
  &state=YOUR_RANDOM_STATE
  &code_challenge=YOUR_CODE_CHALLENGE
  &code_challenge_method=S256
```

After user consent, callback receives:

```text
YOUR_REDIRECT_URI?code=AUTH_CODE&state=YOUR_RANDOM_STATE
```

### 3) Exchange `code` for `access_token`

```bash
curl -X POST https://openapi.longbridge.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "code=AUTH_CODE" \
  -d "code_verifier=YOUR_CODE_VERIFIER"
# only when your client has secret:
# -d "client_secret=YOUR_CLIENT_SECRET"
```

### 4) Call API with Bearer token (TSLA.US example)

```bash
curl -X GET "https://openapi.longbridge.com/v1/quote/get_security_list?market=US&category=Overnight" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

Real response (excerpt, keeping `TSLA.US` row):

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "symbol": "TSLA.US",
        "name_cn": "特斯拉",
        "name_hk": "",
        "name_en": ""
      }
    ]
  }
}
```

### 5) Refresh token

Use OAuth token endpoint for refresh (details in [Refresh Token](./refresh-token-api)):

```bash
curl -X POST https://openapi.longbridge.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "refresh_token=REFRESH_TOKEN"
# only when your client has secret:
# -d "client_secret=YOUR_CLIENT_SECRET"
```

## Relationship with legacy docs

- This page: OAuth 2.0 main flow for new integrations.
- [Refresh Token](./refresh-token-api): refresh step details only, to avoid duplication.
