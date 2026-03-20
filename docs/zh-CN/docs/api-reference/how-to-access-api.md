---
title: Overview
id: how-to-access-api
slug: /how-to-access-api
sidebar_position: 1
---

本页按 **OAuth 2.0 实际接入流程** 重新整理，用于新接入用户快速走通。

:::success 提示
优先使用 SDK，接入更简单：

https://open.longbridge.com/sdk
:::

## API 须知

| 注意事项                                     | 参考文档                                          |
| -------------------------------------------- | ------------------------------------------------- |
| 推荐使用各自语言的 SDK，而不是调用原生的接口 | [SDK 快速开始页面](../docs/getting-started)       |
| 阅读 OpenAPI 介绍中开通相应服务              | [OpenAPI 如何开通](../docs/#如何开通)             |
| 阅读 OpenAPI 介绍中使用权限及限制            | [OpenAPI 使用权限及限制](../docs/#使用权限及限制) |
| 了解通用错误码，便于查找调用接口出错的原因   | [通用错误码](../docs/error-codes)                 |

## OAuth 2.0（推荐方案）

新接入默认使用 OAuth 2.0。API Key 签名方式作为备选兼容方案可保留（例如在 SDK/历史实现中），但不作为默认接入方式。

### Discovery 地址

- 生产环境：`https://openapi.longbridge.com/.well-known/oauth-authorization-server`
- 中国内地：`https://openapi.longbridge.cn/.well-known/oauth-authorization-server`

支持授权类型（以 Discovery 返回为准）：

- `authorization_code`
- `refresh_token`

## OAuth 2.0 接入流程（一步一步）

### 1）注册 OAuth 客户端

如果没有可视化后台入口，可通过接口动态注册：

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

> 注册返回可能仅包含 `client_id`（public client，不返回 `client_secret`）。这种情况下请使用 PKCE，并在 token 请求里不传 `client_secret`。

### 2）构造授权链接并获取 code

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

用户授权后，回调地址会收到：

```text
YOUR_REDIRECT_URI?code=AUTH_CODE&state=YOUR_RANDOM_STATE
```

### 3）用 code 换 access_token

```bash
curl -X POST https://openapi.longbridge.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "code=AUTH_CODE" \
  -d "code_verifier=YOUR_CODE_VERIFIER"
# 仅当客户端有 secret 时再加：
# -d "client_secret=YOUR_CLIENT_SECRET"
```

### 4）用 Bearer token 调 API（TSLA.US 实例）

```bash
curl -X GET "https://openapi.longbridge.com/v1/quote/get_security_list?market=US&category=Overnight" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

实际返回（节选，保留 `TSLA.US` 项）：

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

通过 OAuth token endpoint 刷新（详见 [刷新 Token](./refresh-token-api)）：

```bash
curl -X POST https://openapi.longbridge.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "refresh_token=REFRESH_TOKEN"
# 仅当客户端有 secret 时再加：
# -d "client_secret=YOUR_CLIENT_SECRET"
```

## 与旧文档的关系

- 本页：只讲 **OAuth 2.0 主流程**（新接入默认看这里）。
- [刷新 Token](./refresh-token-api)：只讲刷新步骤细节与常见问题，避免重复。
