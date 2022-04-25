---
title: 如何调用 API
id: how-to-access-api
slug: /how-to-access-api
---

## API 调用流程

<img src="https://pub.lbkrs.com/files/202204/KuqxBKUcPwUwXC6r/how-to-access-api-flow.png" />

### 1. 获取 Access Key

首先要申请 `Access Key` 拿到 `Access Secret`， 并设置相应权限。获取 `Access Key` 与申请权限请参考 [链接]。

### 2. 创建 Token

在开发者后台中创建 `Token`。详见【链接】。

### 3. 生成签名

先根据相应的 API 文档构造请求后， 通过 OpenAPI SDK [链接] 直接调用 API，SDK 会帮助生成签名，或者根据授权与签名文档中的算法自己生成签名，并设置相应的请求参数。

### 4. 调用 API

使用 HTTP 客户端发送签名过后的请求。

## API Request

调用服务端接口需要是用 HTTPS 协议，JSON 格式，并是用 UTF-8 编码。

示例如下：

```bash
curl -v http://127.0.0.1:8080/v1/test \
    -H "X-Api-Signature: {签名}" -H "X-Api-Key: {access key}" \
    -H "authorization: {token}" -H "X-Timestamp: {签名时间}"
```

## API Response

所有 API 相应体结构都包括 `code`, `message`, `data` 三个部分。`code` 是业务码，`message` 是 message，`data` 是请求结果。

HTTP Status 遵循 [RESTFull 风格](https://restfulapi.net/http-status-codes/)，请求成功时 `code = 0`, 否则 `code` 会描述具体的错误码。

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
  "msg": "success"
  "data": {
    ...
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
