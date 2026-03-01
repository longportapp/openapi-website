---
title: Overview
id: how-to-access-api
slug: /how-to-access-api
sidebar_position: 1
---

本部分內容主要介紹 Longbridge OpenAPI 的基礎訊息，包括如何存取 API、如何使用 API、如何取得 API 介面文件等，內容較為原始。

:::success 提示
建議可以直接採用 SDK 的方式存取 API，SDK 已經封裝了 API 的呼叫方式，使用起來更方便。

https://open.longbridge.com/sdk
:::

## OAuth 2.0（目前推薦）

OAuth 2.0 授權服務已可用。對於新接入，建議優先使用 OAuth 2.0。

- 生產環境 Discovery：`https://openapi.longportapp.com/.well-known/oauth-authorization-server`
- 中國內地 Discovery：`https://openapi.longportapp.cn/.well-known/oauth-authorization-server`

目前支持的授權類型（以 Discovery 為準）：

- `authorization_code`
- `refresh_token`

取得 Access Token 後，使用以下請求頭存取 API：

```http
Authorization: Bearer <access_token>
```

### OAuth 2.0 完整接入範例

以下範例涵蓋從 `authorization_code` 到 API 呼叫與 `refresh_token` 刷新的完整流程。

#### 第一步：組裝授權網址

```text
https://openapi.longportapp.com/oauth2/authorize
  ?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=YOUR_REDIRECT_URI
  &scope=3
  &state=YOUR_RANDOM_STATE
  &code_challenge=YOUR_CODE_CHALLENGE
  &code_challenge_method=S256
```

用戶授權後，回調網址會收到：

```text
YOUR_REDIRECT_URI?code=AUTH_CODE&state=YOUR_RANDOM_STATE
```

#### 第二步：用 authorization_code 換 token（cURL）

```bash
curl -X POST https://openapi.longportapp.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "code=AUTH_CODE" \
  -d "code_verifier=YOUR_CODE_VERIFIER"
```

#### 第三步：用 Bearer Token 呼叫 API（cURL）

```bash
curl -X GET "https://openapi.longportapp.com/v1/asset/account" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

#### 第四步：刷新 token（cURL）

```bash
curl -X POST https://openapi.longportapp.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "refresh_token=REFRESH_TOKEN"
```

### Node.js（TypeScript）範例

```ts
const tokenResp = await fetch('https://openapi.longportapp.com/oauth2/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    redirect_uri: process.env.REDIRECT_URI!,
    code: process.env.AUTH_CODE!,
    code_verifier: process.env.CODE_VERIFIER || '',
  }),
})

const tokenJson = await tokenResp.json()
const accessToken = tokenJson.access_token

const apiResp = await fetch('https://openapi.longportapp.com/v1/asset/account', {
  headers: { Authorization: `Bearer ${accessToken}` },
})

console.log(await apiResp.json())
```

### Python 範例

```python
import os
import requests

token_resp = requests.post(
    'https://openapi.longportapp.com/oauth2/token',
    data={
        'grant_type': 'authorization_code',
        'client_id': os.environ['CLIENT_ID'],
        'client_secret': os.environ['CLIENT_SECRET'],
        'redirect_uri': os.environ['REDIRECT_URI'],
        'code': os.environ['AUTH_CODE'],
        'code_verifier': os.environ.get('CODE_VERIFIER', ''),
    },
    timeout=15,
)
token_resp.raise_for_status()
access_token = token_resp.json()['access_token']

api_resp = requests.get(
    'https://openapi.longportapp.com/v1/asset/account',
    headers={'Authorization': f'Bearer {access_token}'},
    timeout=15,
)
print(api_resp.status_code, api_resp.json())
```

:::tip
本文後續的簽名方式內容保留用於相容與遷移參考。新接入建議採用 OAuth 2.0。
:::

## API 須知

| 注意事項                                     | 參考文檔                                          |
| -------------------------------------------- | ------------------------------------------------- |
| 推薦使用各自語言的 SDK，而不是調用原生的接口 | [SDK 快速開始頁面](../docs/getting-started)       |
| 閱讀 OpenAPI 介紹中開通相應服務              | [OpenAPI 如何開通](../docs/#如何開通)             |
| 閱讀 OpenAPI 介紹中使用權限及限制            | [OpenAPI 使用權限及限制](../docs/#使用權限及限制) |
| 了解通用錯誤碼，便於查找調用接口出錯的原因   | [通用錯誤碼](../docs/error-codes)                 |

## REST API 文檔約定格式

服務端 REST API 文檔格式主要如下：

```
Request:
    Request Info
    Parameters
    Request Example
Response:
    Response Headers
    Response Example
    Response Status
```

### Request Info

介紹調用 API 所需要的請求方式、路徑。

- HTTP URL：服務端 API 的 URL。
- HTTP Method：服務端 API 僅支持 HTTP 協議的方法，如 GET、POST 等。

### Parameters

介紹調用 API 所需傳遞的請求頭部，查詢參數或者請求體。
:::tip

GET 請求時默認所有參數為查詢參數，非 GET 請求時默認所有參數都是請求體，請求體格式為 JSON。

:::

### Request Example

使用 SDK 調用接口的詳細例子。

### Response

- Response Headers: 返回內容頭部信息。
- Response Example: 返回內容的文本示例。
- Response Status: 接口返回內容中的 `status` 的具體解釋。

## API 調用流程

### 1. 開通服務

參考 [OpenAPI 介紹](../docs/#如何開通) 開通相應服務。

### 2. 獲取 App Key 信息及 Access Token

在 [開發者後台](https://open.longbridge.com/account) 中獲取 **Access Token**， **App Key** 以及 **App Secret**。

**Access Token** 的有效期是三個月，失效後可以在開發者後臺重置。在失效之前，可以通過調用 [刷新 Access Token](./refresh-token-api) API 進行刷新。

### 3. 生成簽名

:::tip

本頁介紹的內容大部分，我們的 [OpenAPI SDK](/sdk) 已經完整實現了，你如果是 SDK 用戶，可以直接忽略簽名認證部分。

此部分內容是為了給非 SDK 用戶提供參考。

:::

先根據相應的 API 文檔構造請求後，通過 OpenAPI SDK 直接調用 API，SDK 會幫助生成簽名，或者通過以下流程創建簽名。

#### 添加 `X-Api-Key`、`X-Timestamp`、`Authorization`

設置請求參數頭部信息， `X-Api-Key`、 `Authorization`、`X-Timestamp` 將在簽名函數中被使用。

```python
import time
headers = {}
headers['X-Api-Key'] = '${app_key}'
headers['Authorization'] = '${access_token}'
headers['X-Timestamp' =  str(time.time()) # Unix Timestamp, eg: 1539095200.123
headers['Content-Type'] = 'application/json; charset=utf-8',
```

#### 使用簽名函數對請求籤名

簽名函數如下：

```py
# python3 簽名函數
def sign(method, uri, headers, params, body, secret):
    ts = headers["X-Timestamp"]
    access_token = headers["Authorization"]
    app_key = headers["X-Api-Key"]
    mtd = method.upper()

    canonical_request = mtd + "|" + uri + "|" + params + "|authorization:" + access_token + "\nx-api-key:" + app_key + "\nx-timestamp:" + ts + "\n|authorization;x-api-key;x-timestamp|"

    if body != "":
        payload_hash = hashlib.sha1(body.encode("utf-8")).hexdigest()
        canonical_request = canonical_request + payload_hash

    sign_str = "HMAC-SHA256|" + hashlib.sha1(canonical_request.encode("utf-8")).hexdigest()
    signature = hmac.new(secret.encode('utf-8'), sign_str.encode('utf-8'), digestmod=hashlib.sha256).hexdigest()
    return "HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=" + signature

```

使用簽名函數進行簽名，並設置簽名到請求頭部 `X-Api-Signature` 中：

```py
# 請求方法
method = "POST"
# 請求路徑
uri = "/v1/trade/order/submit"
# 請求參數 如 member_id=1&account_channel=2
params = ""
# 請求 body 如
body = json.dumps({ "order_id": '683615454870679552' })
# 簽名並設置
headers['X-Api-Signature'] = sign(method, uri, headers, params, body, secret)

```

### 4. 調用 API

使用 HTTP 客戶端發送簽名過後的請求。

## 基本路徑

所有 API 的路徑都以 [https://openapi.longportapp.com](https://openapi.longportapp.com) 開頭。

> TIP: 也可以用 https://openapi.longportapp.com

## API Request

調用服務端接口需要是用 HTTPS 協議，JSON 格式，並是用 `UTF-8` 編碼。

測試接口示例如下：

```bash
curl -v https://openapi.longportapp.com/v1/test \
    -H "X-Api-Signature: {簽名}" -H "X-Api-Key: {Appkey}" \
    -H "Authorization: {AccessToken}" -H "X-Timestamp: 1539095200.123"
```

獲取股票持倉接口是`GET`請求並需要傳遞參數，示例如下：

```bash
curl -v https://openapi.longportapp.com/v1/asset/stock?symbol=700.HK&symbol=BABA.US \
    -H "X-Api-Signature: {簽名}" -H "X-Api-Key: {AppKey}" \
    -H "Authorization: {AccessToken}" -H "X-Timestamp: 1539095200.123"
```

委託下單接口是`POST`請求並需要傳遞`Body`參數，示例如下：

```bash
curl -v -XPOST https://openapi.longportapp.com/v1/trade/order \
    -d '{ "side": "Buy", symbol": "700.HK", "order_type": "LO", "submitted_price": "50", "submitted_quantity": "200", "time_in_force": "Day", remark": "Hello from Shell"}' \
    -H "X-Api-Signature: {簽名}" -H "X-Api-Key: {AppKey}" \
    -H "Authorization: {AccessToken}" -H "X-Timestamp: 1539095200.123"
    -H "Content-Type: application/json; charset=utf-8"
```

## API Response

所有 API 相應體結構都包括 `code`, `message`, `data` 三個部分。 `code` 是業務碼，`message` 是 message，`data` 是請求結果。

:::tip
HTTP Status 遵循 [RESTFull 風格](https://restfulapi.net/http-status-codes)，請求成功時 `code = 0`, 否則 `code` 會描述具體的錯誤碼。
:::

### HTTP Status

- 1xx: Informational – Communicates transfer protocol-level information.
- 2xx: Success – Indicates that the client's request was accepted successfully.
- 3xx: Redirection – Indicates that the client must take some additional action in order to complete their request.
- 4xx: Client Error – This category of error status codes points the finger at clients.
- 5xx: Server Error – The server takes responsibility for these error status codes.

例如，請求成功，Response Body

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    // ...
  }
}
```

例如，失敗的 Response Body

```json
{
  "code": 403201,
  "msg": "signature invalid"
}
```

## 完整的調用 API 例子

```py
import requests
import json
import time
import hashlib
import hmac

# request 請求信息
# 請求方法
method = "POST"
# 請求路徑
uri = "/v1/trade/order/submit"
# 請求參數 如 member_id=1&account_channel=2
params = ""
# 請求 body
body = json.dumps({ "order_id": '683615454870679552' })
# 請求頭部信息
headers = {}
headers['X-Api-Key'] = '${app_key}'
headers['Authorization'] = '${access_token}'
headers['X-Timestamp'] =  str(time.time()) # Unix TimeStamp, eg. 1539095200.123
headers['Content-Type'] = 'application/json; charset=utf-8'

# App Secret
app_secret = "${app_secret}"

## 簽名方法
def sign(method, uri, headers, params, body, secret):
    ts = headers["X-Timestamp"]
    access_token = headers["Authorization"]
    app_key = headers["X-Api-Key"]
    mtd = method.upper()
    canonical_request = mtd + "|" + uri + "|" + params + "|authorization:" + access_token + "\nx-api-key:" + app_key + "\nx-timestamp:" + ts + "\n|authorization;x-api-key;x-timestamp|"
    if body != "":
        payload_hash = hashlib.sha1(body.encode("utf-8")).hexdigest()
        canonical_request = canonical_request + payload_hash
    sign_str = "HMAC-SHA256|" + hashlib.sha1(canonical_request.encode("utf-8")).hexdigest()

    signature = hmac.new(secret.encode('utf-8'), sign_str.encode('utf-8'), digestmod=hashlib.sha256).hexdigest()
    return "HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=" + signature

# 設置簽名
headers['X-Api-Signature'] = sign(method,  uri, headers, params, body, app_secret)

# 請求接口
response = requests.request(method, "https://openapi.longportapp.com" + uri + '?' + params, headers=headers, data=body)

print(response.text)

```
