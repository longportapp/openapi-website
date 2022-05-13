---
title: 如何調用 API
id: how-to-access-api
slug: /how-to-access-api
sidebar_position: 1
---

## API 調用流程

### 1. 開通服務

參考 [OpenAPI 介紹](../docs/#如何開通) 開通相應服務。

### 2. 獲取 App Key 信息及 Access Token

在 [開發者後台](https://open.longbridgeapp.com/account) 中獲取 **Access Token**， **App Key** 以及 **App Secret**。

**Access Token** 的有效期是三個月，失效後可以在開發者後臺重置。在失效之前，可以通過調用[刷新 Access Token](./refresh-token-api) API 進行刷新。

### 3. 生成簽名

:::tip

本頁介紹的內容大部分，我們的 [OpenAPI SDK](/sdk) 已經完整實現了，你如果是 SDK 用戶，可以直接忽略簽名認證部分。

此部分內容是為了給非 SDK 用戶提供參考。

:::

先根據相應的 API 文檔構造請求後， 通過 OpenAPI SDK 直接調用 API，SDK 會幫助生成簽名， 或者通過以下流程創建簽名。

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

    canical_request = mtd + "|" + uri + "|" + params + "|authorization:" + access_token + "\nx-api-key:" + app_key + "\nx-timestamp:" + ts + "\n|authorization;x-api-key;x-timestamp|"

    if body != "":
        payload_hash = hashlib.sha1(body.encode("utf-8")).hexdigest()
        canical_request = canical_request + payload_hash

    sign_str = "HMAC-SHA256|" + hashlib.sha1(canical_request.encode("utf-8")).hexdigest()
    signature = hmac.new(secret.encode('utf-8'), sign_str.encode('utf-8'), digestmod=hashlib.sha256).hexdigest()
    return "HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=" + signature

```

使用簽名函數進行簽名， 並設置簽名到請求頭部 `X-Api-Signature` 中：

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

所有 API 的路徑都以 [https://openapi.longbridgeapp.com](https://openapi.longbridgeapp.com) 開頭。

> TIP: 也可以用 https://openapi.longbridgeapp.com

## API Request

調用服務端接口需要是用 HTTPS 協議，JSON 格式，並是用 `UTF-8` 編碼。

示例如下：

```bash
curl -v https://openapi.longbridgeapp.com/v1/test \
    -H "X-Api-Signature: {簽名}" -H "X-Api-Key: {app_key}" \
    -H "Authorization: {access_token}" -H "X-Timestamp: 1539095200.123"
```

## API Response

所有 API 相應體結構都包括 `code`, `message`, `data` 三個部分。 `code` 是業務碼，`message` 是 message，`data` 是請求結果。

:::tip
HTTP Status 遵循 [RESTFull 風格](https://restfulapi.net/http-status-codes)，請求成功時 `code = 0`, 否則 `code` 會描述具體的錯誤碼。
:::

### HTTP Status

- 1xx: Informational – Communicates transfer protocol-level information.
- 2xx: Success – Indicates that the client’s request was accepted successfully.
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
    canical_request = mtd + "|" + uri + "|" + params + "|authorization:" + access_token + "\nx-api-key:" + app_key + "\nx-timestamp:" + ts + "\n|authorization;x-api-key;x-timestamp|"
    if body != "":
        payload_hash = hashlib.sha1(body.encode("utf-8")).hexdigest()
        canical_request = canical_request + payload_hash
    sign_str = "HMAC-SHA256|" + hashlib.sha1(canical_request.encode("utf-8")).hexdigest()

    signature = hmac.new(secret.encode('utf-8'), sign_str.encode('utf-8'), digestmod=hashlib.sha256).hexdigest()
    return "HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=" + signature

# 設置簽名
headers['X-Api-Signature'] = sign(method,  uri, headers, params, body, app_secret)

# 請求接口
response = requests.request(method, "https://openapi.longbridgeapp.com" + uri + '?' + params, headers=headers, data=body)

print(response.text)

```
