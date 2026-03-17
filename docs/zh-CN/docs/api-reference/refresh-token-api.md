---
title: 刷新 Token
id: refresh-token-api
slug: /refresh-token-api
sidebar_position: 2
---

# 刷新 Token（OAuth 2.0）

本页仅说明 OAuth 2.0 的 **refresh token** 刷新步骤。

- 如果你还没走完完整授权流程，请先看：[如何访问 API](./how-to-access-api)
- 本页不重复注册 client / 获取 code 的流程，只关注“刷新”这一步

## 推荐刷新方式（OAuth 2.0）

使用 OAuth token endpoint：

- `POST https://openapi.longbridge.com/oauth2/token`
- 或中国内地：`POST https://openapi.longbridge.com/oauth2/token`

### 请求参数（`application/x-www-form-urlencoded`）

| 名称          | 必须 | 说明 |
| ------------- | ---- | ---- |
| grant_type    | 是   | 固定为 `refresh_token` |
| client_id     | 是   | OAuth client id |
| refresh_token | 是   | 上一次签发的 refresh token |
| client_secret | 否   | 仅机密客户端需要；public client 不传 |

### 刷新示例

```bash
curl -X POST https://openapi.longbridge.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "refresh_token=YOUR_REFRESH_TOKEN"
# 仅当你的客户端有 secret 时再加：
# -d "client_secret=YOUR_CLIENT_SECRET"
```

### 响应示例

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 2592000,
  "token_type": "Bearer"
}
```

## 如何消除和主流程文档的重复

- [如何访问 API](./how-to-access-api)：负责完整接入流程（注册、授权、换 token、调用 API、刷新）
- 本页：只保留 refresh token 的参数与示例，作为“步骤 5”的深入说明

## 兼容说明

历史接口 `/v1/token/refresh` 属于旧方案兼容路径，不建议新接入继续采用。新接入请统一使用 OAuth 2.0 token endpoint。
