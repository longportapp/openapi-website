---
title: Overview
id: how-to-access-api
slug: /how-to-access-api
sidebar_position: 1
---

本頁按 **OAuth 2.0 實際接入流程** 重新整理，供新接入者快速走通。

:::success 提示
建議優先使用 SDK，接入更簡單：

https://open.longbridge.com/sdk
:::

## API 須知

| 注意事項 | 參考文件 |
| --- | --- |
| 建議使用各語言 SDK，而非直接呼叫原生介面 | [SDK 快速開始](../docs/getting-started) |
| 先開通對應 OpenAPI 服務 | [OpenAPI 如何開通](../docs/#如何開通) |
| 先了解權限與限制 | [OpenAPI 使用權限及限制](../docs/#使用權限及限制) |
| 出錯時先查通用錯誤碼 | [通用錯誤碼](../docs/error-codes) |

## OAuth 2.0（預設方案）

新接入預設使用 OAuth 2.0。

API-key 簽名方式可作為舊系統相容備選，但不作為預設接入方式。

### Discovery 位址

- 生產環境：`https://openapi.longbridge.com/.well-known/oauth-authorization-server`
- 中國內地：`https://openapi.longportapp.cn/.well-known/oauth-authorization-server`

支援授權類型（以 Discovery 回傳為準）：

- `authorization_code`
- `refresh_token`

## OAuth 2.0 接入流程（逐步）

### 1）註冊 OAuth client

若目前環境沒有可視化建立頁面，可透過接口動態註冊：

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

> 註冊回傳可能只有 `client_id`（public client，不含 `client_secret`）。此情況請使用 PKCE，且 token 請求中不要傳 `client_secret`。

### 2）組裝授權連結並取得 code

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

使用者授權後，回調會帶回：

```text
YOUR_REDIRECT_URI?code=AUTH_CODE&state=YOUR_RANDOM_STATE
```

### 3）用 code 換 access_token

```bash
curl -X POST https://openapi.longbridge.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "code=AUTH_CODE" \
  -d "code_verifier=YOUR_CODE_VERIFIER"
# 只有 client 有 secret 時才加：
# -d "client_secret=YOUR_CLIENT_SECRET"
```

### 4）用 Bearer token 呼叫 API（TSLA.US 示例）

```bash
curl -X GET "https://openapi.longbridge.com/v1/quote/get_security_list?market=US&category=Overnight" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

實際回應（節選，保留 `TSLA.US`）：

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

### 5）刷新 token

使用 OAuth token endpoint 刷新（詳見 [刷新 Token](./refresh-token-api)）：

```bash
curl -X POST https://openapi.longbridge.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "refresh_token=REFRESH_TOKEN"
# 只有 client 有 secret 時才加：
# -d "client_secret=YOUR_CLIENT_SECRET"
```

## 與舊文檔的分工

- 本頁：只講 OAuth 2.0 主流程（新接入預設看這裡）。
- [刷新 Token](./refresh-token-api)：只講刷新步驟細節，避免重複。
