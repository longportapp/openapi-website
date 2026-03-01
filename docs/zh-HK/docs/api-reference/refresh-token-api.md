---
title: 刷新 Token
id: refresh-token-api
slug: /refresh-token-api
sidebar_position: 2
---

# 刷新 Token（OAuth 2.0）

本頁僅說明 OAuth 2.0 的 **refresh token** 刷新步驟。

- 若尚未完成完整流程，請先看：[如何訪問 API](./how-to-access-api)
- 本頁不重複註冊 client / 取得 code，只聚焦刷新步驟

## 推薦刷新方式（OAuth 2.0）

使用 OAuth token endpoint：

- `POST https://openapi.longportapp.com/oauth2/token`
- 或中國內地：`POST https://openapi.longportapp.cn/oauth2/token`

### 請求參數（`application/x-www-form-urlencoded`）

| 名稱 | 必須 | 說明 |
| --- | --- | --- |
| grant_type | 是 | 固定為 `refresh_token` |
| client_id | 是 | OAuth client id |
| refresh_token | 是 | 上次簽發的 refresh token |
| client_secret | 否 | 僅機密型 client 需要；public client 不傳 |

### 刷新示例

```bash
curl -X POST https://openapi.longportapp.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "refresh_token=YOUR_REFRESH_TOKEN"
# 僅當你的 client 有 secret 時再加：
# -d "client_secret=YOUR_CLIENT_SECRET"
```

### 回應示例

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 2592000,
  "token_type": "Bearer"
}
```

## 如何與主流程文檔消歧

- [如何訪問 API](./how-to-access-api)：完整接入流程（註冊、授權、換 token、呼叫 API、刷新）
- 本頁：僅保留 refresh token 的參數與示例（對應主流程第 5 步）

## 相容說明

舊接口 `/v1/token/refresh` 僅作歷史相容保留；新接入請統一使用 OAuth 2.0 token endpoint。
