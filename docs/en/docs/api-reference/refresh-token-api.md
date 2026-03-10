---
title: Refresh Token
id: refresh-token-api
slug: /refresh-token-api
sidebar_position: 2
---

# Refresh Token (OAuth 2.0)

This page focuses only on the OAuth 2.0 **refresh token** step.

- If you have not completed the full flow yet, read [How to Access API](./how-to-access-api) first.
- This page does not repeat client registration / authorization code steps.

## Recommended refresh method (OAuth 2.0)

Use OAuth token endpoint:

- `POST https://openapi.longbridge.com/oauth2/token`
- or China: `POST https://openapi.longportapp.cn/oauth2/token`

### Request parameters (`application/x-www-form-urlencoded`)

| Name | Required | Description |
| --- | --- | --- |
| grant_type | Yes | Must be `refresh_token` |
| client_id | Yes | OAuth client id |
| refresh_token | Yes | Previously issued refresh token |
| client_secret | Optional | Required only for confidential clients; omit for public clients |

### Refresh example

```bash
curl -X POST https://openapi.longbridge.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "refresh_token=YOUR_REFRESH_TOKEN"
# only when your client has secret:
# -d "client_secret=YOUR_CLIENT_SECRET"
```

### Response example

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 2592000,
  "token_type": "Bearer"
}
```

## How this page differs from the main flow page

- [How to Access API](./how-to-access-api): complete onboarding flow (register, authorize, exchange token, call API, refresh).
- This page: refresh token request details only.

## Compatibility note

Legacy `/v1/token/refresh` remains for backward compatibility.
For new integrations, use OAuth 2.0 token endpoint as default.
