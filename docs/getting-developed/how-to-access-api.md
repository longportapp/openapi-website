---
title: 如何调用服务端 API 
id: how-to-access-api 
slug: /how-to-access-api
---

## API 调用流程

下图是 API 调用流程： 

![how to access api flow](https://pub.lbkrs.com/files/202204/KuqxBKUcPwUwXC6r/how-to-access-api-flow.png)

### 1. 获取 Access Key 

首先要申请 API Key 拿到 API Secret， 并设置相应权限。获取 API Key 与申请权限请参考 [链接]。

### 2. 创建 Token 

在开发者后台中创建 Token。详见【链接】。

### 3. 生成签名 

先根据相应的 API 文档构造请求后， 通过 OpenAPI SDK【链接】直接调用 API，SDK 会帮助生成签名， 或者通过以下流程创建签名。

#### 添加 `X-Api-Key`、`X-Timestamp`

设置请求参数头部信息， `X-Api-Key`、 `Authorization`、`X-Timestamp` 将在签名函数中被使用
```python
headers = {}
headers['X-Api-Key'] = '${这里设置 API Key}'
headers['Authorization'] = '${这里设置 Token}'
headers['X-Timestamp' =  str(time.time()) # 时间戳
headers['Content-Type'] = 'application/json; charset=utf-8',
```

#### 使用签名函数对请求签名

签名函数如下:
```python
// python3 签名函数
def sign(method, uri, headers, params, body, secret):
    ts = headers["X-Timestamp"]
    token = headers["Authorization"]
    apikey = headers["X-Api-Key"]
    mtd = method.upper()

    canicalRequest = mtd + "|" + uri + "|" + params + "|authorization:" + token + "\nx-api-key:" + apikey + "\nx-timestamp:" + ts + "\n|authorization;x-api-key;x-timestamp|"
    if body != "" :
        payloadHash = hashlib.sha1(body.encode("utf-8")).hexdigest()
        canicalRequest = canicalRequest + payloadHash

    stringToSign = "HMAC-SHA256|" + hashlib.sha1(canicalRequest.encode("utf-8")).hexdigest()
    signature = hmac.new(secret.encode('utf-8'), stringToSign.encode('utf-8'), digestmod=hashlib.sha256).hexdigest()
    return "HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=" + signature

```

使用签名函数进行签名， 并设置签名到请求头部  `X-Api-Signature` 中: 

```python
# 请求方法
method = "POST"
# 请求路径
uri = "/v1/trade/order/Submit"
# 请求参数 如 member_id=1&account_channel=2
params = ""
# 请求 body 如
body = json.dumps({
    "order_id": '683615454870679552'
})
# 签名并设置
headers['X-Api-Signature'] = sign(method, uri, headers, params, body, secret)

```


### 4. 调用 API 

使用 http 客户端发送签名过后的请求。

## API 调用方式

调用服务端接口需要是用 HTTPS 协议，JSON 格式，并是用 UTF-8 编码。

示例如下：

```bash
curl -v http://openapi.longbridge.sg/v1/test -H "X-Api-Signature: ${签名}" -H "X-Api-Key: ${API key}" -H "Authorization: ${token}" -H "X-Timestamp: ${签名时间}"
```

## API 响应结果说明

所有 API 相应体结构都包括 code, message, data 三个部分。code 是业务码，message 是错误信息，data 是请求结果。
请求成功时 code 为 0，http status 为 200，当请求失败时 code 不为 0，并且 http status 不为 200。

例如：
``` json
http code: 200
http body: {
  "code": 0,
  "msg": "success"
}

http code: 403 
http body: {
  "code": 403201,
  "msg": "signature invalid"
}
```

## 完整的调用 API 例子
```python
import requests
import json
import time
import hashlib
import hmac
from urllib.parse import quote

#  request 请求信息
# 请求方法
method = "POST"
# 请求路径
uri = "/v1/trade/order/Submit"
# 请求参数 如 member_id=1&account_channel=2
params = ""
# 请求 body
body = json.dumps({
    "order_id": '683615454870679552'
})
# 请求头部信息
headers = {}
headers['X-Api-Key'] = '${这里设置 API Key}'
headers['Authorization'] = '${这里设置 Token}'
headers['X-Timestamp'] =  str(time.time())
headers['Content-Type'] = 'application/json; charset=utf-8'

#  api secret
secret = "${这里是 API Secret}"

## 签名方法
def sign(method, uri, headers, params, body, secret):
    ts = headers["X-Timestamp"]
    token = headers["Authorization"]
    apikey = headers["X-Api-Key"]
    mtd = method.upper()
    canicalRequest = mtd + "|" + uri + "|" + params + "|authorization:" + token + "\nx-api-key:" + apikey + "\nx-timestamp:" + ts + "\n|authorization;x-api-key;x-timestamp|"
    if body != "" :
        payloadHash = hashlib.sha1(body.encode("utf-8")).hexdigest()
        canicalRequest = canicalRequest + payloadHash
    stringToSign = "HMAC-SHA256|" + hashlib.sha1(canicalRequest.encode("utf-8")).hexdigest()

    signature = hmac.new(secret.encode('utf-8'), stringToSign.encode('utf-8'), digestmod=hashlib.sha256).hexdigest()
    return "HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=" + signature

# 设置签名
headers['X-Api-Signature'] = sign(method,  uri, headers, params, body, secret)

# 请求接口
response = requests.request(method, "https://openapi.longbridge.sg" + uri + '?' + params, headers=headers, data=body)

print(response.text)

```
