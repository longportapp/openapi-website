---
title: 如何调用 API
id: how-to-access-api
slug: /how-to-access-api
sidebar_position: 1
---

## API 调用流程

### 1. 开通服务

参考 [OpenAPI 介绍](../docs/#如何开通) 开通相应服务。

### 2. 获取 App Key 信息及 Access Token

在 [开发者后台](https://open.longbridge.com/account) 中获取 **Access Token**， **APP Key** 以及 **APP Key Secret**。

### 3. 生成签名

先根据相应的 API 文档构造请求后， 通过 OpenAPI SDK 直接调用 API，SDK 会帮助生成签名， 或者通过以下流程创建签名。

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

    canical_request = mtd + "|" + uri + "|" + params + "|authorization:" + access_token + "\nx-api-key:" + app_key + "\nx-timestamp:" + ts + "\n|authorization;x-api-key;x-timestamp|"

    if body != "":
        payload_hash = hashlib.sha1(body.encode("utf-8")).hexdigest()
        canical_request = canical_request + payload_hash

    sign_str = "HMAC-SHA256|" + hashlib.sha1(canical_request.encode("utf-8")).hexdigest()
    signature = hmac.new(secret.encode('utf-8'), sign_str.encode('utf-8'), digestmod=hashlib.sha256).hexdigest()
    return "HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=" + signature

```

使用签名函数进行签名， 并设置签名到请求头部 `X-Api-Signature` 中：

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

所有 API 的路径都以 [https://openapi.longbridge.sg](https://openapi.longbridge.sg) 开头。

## API Request

调用服务端接口需要是用 HTTPS 协议，JSON 格式，并是用 `UTF-8` 编码。

示例如下：

```bash
curl -v https://openapi.longbridge.sg/v1/test \
    -H "X-Api-Signature: {签名}" -H "X-Api-Key: {access key}" \
    -H "Authorization: {token}" -H "X-Timestamp: {签名时间}"
```

## API Response

所有 API 相应体结构都包括 `code`, `message`, `data` 三个部分。`code` 是业务码，`message` 是 message，`data` 是请求结果。

:::tip
HTTP Status 遵循 [RESTFull 风格](https://restfulapi.net/http-status-codes)，请求成功时 `code = 0`, 否则 `code` 会描述具体的错误码。
:::

### HTTP Status

- 1xx: Informational – Communicates transfer protocol-level information.
- 2xx: Success – Indicates that the client’s request was accepted successfully.
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
from urllib.parse import quote

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

# API secret
app_secret = "${app_secret}"

## 签名方法
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

# 设置签名
headers['X-Api-Signature'] = sign(method,  uri, headers, params, body, app_secret)

# 请求接口
response = requests.request(method, "https://openapi.lbkrs.com" + uri + '?' + params, headers=headers, data=body)

print(response.text)

```
