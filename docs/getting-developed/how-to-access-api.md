---
title: 如何调用 API
id: how-to-access-api
slug: /how-to-access-api
sidebar_position: 1
---

## 开发前须知

| 注意事项                                     | 参考文档                                          |
| -------------------------------------------- | ------------------------------------------------- |
| 推荐使用各自语言的 SDK，而不是调用原生的接口 | [SDK 快速开始页面](../docs/getting-started)       |
| 阅读 OpenAPI 介绍中开通相应服务              | [OpenAPI 如何开通](../docs/#如何开通)             |
| 阅读 OpenAPI 介绍中使用权限及限制            | [OpenAPI 使用权限及限制](../docs/#使用权限及限制) |
| 了解通用错误码，便于查找调用接口出错的原因   | [通用错误码](../docs/error-codes)                 |

## REST API 文档约定格式

服务端 REST API 文档格式主要如下：

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

介绍调用 API 所需要的请求方式、路径。

- HTTP URL：服务端 API 的 URL。
- HTTP Method：服务端 API 仅支持 HTTP 协议的方法，如 GET、POST 等。

### Parameters

介绍调用 API 所需传递的请求头部，查询参数或者请求体。
:::tip

GET 请求时默认所有参数为查询参数，非 GET 请求时默认所有参数都是请求体，请求体格式为 JSON。

:::

### Request Example

使用 SDK 调用接口的详细例子。

### Response

- Response Headers: 返回内容头部信息。
- Response Example: 返回内容的文本示例。
- Response Status: 接口返回内容中的 `status` 的具体解释。

## API 调用流程

### 1. 开通服务

参考 [OpenAPI 介绍](../docs/#如何开通) 开通相应服务。

### 2. 获取 App Key 信息及 Access Token

在 [开发者后台](https://open.longportapp.com/account) 中获取 **Access Token**， **App Key** 以及 **App Secret**。

**Access Token** 的有效期是三个月，失效后可以在开发者后台重置。在失效之前，可以通过调用 [刷新 Access Token](./refresh-token-api) API 进行刷新。

### 3. 生成签名

:::tip

本页介绍的内容大部分，我们的 [OpenAPI SDK](/sdk) 已经完整实现了，你如果是 [SDK](/sdk) 用户，可以直接忽略签名认证部分。

此部分内容是为了给非 SDK 用户提供参考。

:::

先根据相应的 API 文档构造请求后，通过 OpenAPI SDK 直接调用 API，SDK 会帮助生成签名，或者通过以下流程创建签名。

#### 添加 `X-Api-Key`、`X-Timestamp`、`Authorization`

设置请求参数头部信息， `X-Api-Key`、 `Authorization`、`X-Timestamp` 将在签名函数中被使用。

```python
import time
headers = {}
headers['X-Api-Key'] = '${app_key}'
headers['Authorization'] = '${access_token}'
headers['X-Timestamp' =  str(time.time()) # Unix Timestamp, eg: 1539095200.123
headers['Content-Type'] = 'application/json; charset=utf-8',
```

#### 使用签名函数对请求签名

签名函数如下：

```py
# python3 签名函数
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

使用签名函数进行签名，并设置签名到请求头部 `X-Api-Signature` 中：

```py
# 请求方法
method = "POST"
# 请求路径
uri = "/v1/trade/order/submit"
# 请求参数 如 member_id=1&account_channel=2
params = ""
# 请求 body 如
body = json.dumps({ "order_id": '683615454870679552' })
# 签名并设置
headers['X-Api-Signature'] = sign(method, uri, headers, params, body, secret)

```

### 4. 调用 API

使用 HTTP 客户端发送签名过后的请求。

## 基本路径

- HTTP API - `https://openapi.longportapp.com`
- WebSocket - `wss://openapi-quote.longportapp.com`

## API Request

调用服务端接口需要是用 HTTPS 协议，JSON 格式，并是用 `UTF-8` 编码。

测试接口示例如下：

```bash
curl -v https://openapi.longportapp.com/v1/test \
    -H "X-Api-Signature: {签名}" -H "X-Api-Key: {Appkey}" \
    -H "Authorization: {AccessToken}" -H "X-Timestamp: 1539095200.123"
```

获取股票持仓接口是`GET`请求并需要传递参数，示例如下：

```bash
curl -v https://openapi.longportapp.com/v1/asset/stock?symbol=700.HK&symbol=BABA.US \
    -H "X-Api-Signature: {签名}" -H "X-Api-Key: {AppKey}" \
    -H "Authorization: {AccessToken}" -H "X-Timestamp: 1539095200.123"
```

委托下单接口是`POST`请求并需要传递`Body`参数，示例如下：

```bash
curl -v -XPOST https://openapi.longportapp.com/v1/trade/order \
    -d '{ "side": "Buy", symbol": "700.HK", "order_type": "LO", "submitted_price": "50", "submitted_quantity": "200", "time_in_force": "Day", remark": "Hello from Shell"}' \
    -H "X-Api-Signature: {签名}" -H "X-Api-Key: {AppKey}" \
    -H "Authorization: {AccessToken}" -H "X-Timestamp: 1539095200.123"
    -H "Content-Type: application/json; charset=utf-8"
```

## API Response

所有 API 相应体结构都包括 `code`, `message`, `data` 三个部分。`code` 是业务码，`message` 是 message，`data` 是请求结果。

:::tip
HTTP Status 遵循 [RESTFull 风格](https://restfulapi.net/http-status-codes)，请求成功时 `code = 0`, 否则 `code` 会描述具体的错误码。
:::

### HTTP Status

- 1xx: Informational – Communicates transfer protocol-level information.
- 2xx: Success – Indicates that the client's request was accepted successfully.
- 3xx: Redirection – Indicates that the client must take some additional action in order to complete their request.
- 4xx: Client Error – This category of error status codes points the finger at clients.
- 5xx: Server Error – The server takes responsibility for these error status codes.

例如，请求成功，Response Body

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    // ...
  }
}
```

例如，失败的 Response Body

```json
{
  "code": 403201,
  "msg": "signature invalid"
}
```

## 完整的调用 API 例子

```py
import requests
import json
import time
import hashlib
import hmac

# request 请求信息
# 请求方法
method = "POST"
# 请求路径
uri = "/v1/trade/order/submit"
# 请求参数 如 member_id=1&account_channel=2
params = ""
# 请求 body
body = json.dumps({ "order_id": '683615454870679552' })
# 请求头部信息
headers = {}
headers['X-Api-Key'] = '${app_key}'
headers['Authorization'] = '${access_token}'
headers['X-Timestamp'] =  str(time.time()) # Unix TimeStamp, eg. 1539095200.123
headers['Content-Type'] = 'application/json; charset=utf-8'

# App Secret
app_secret = "${app_secret}"

## 签名方法
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

# 设置签名
headers['X-Api-Signature'] = sign(method,  uri, headers, params, body, app_secret)

# 请求接口
response = requests.request(method, "https://openapi.longportapp.com" + uri + '?' + params, headers=headers, data=body)

print(response.text)

```
