---
title: 刷新 Token
id: refresh-token-api
slug: /refresh-token-api
sidebar_position: 2
---

# 刷新 Access Token

在老的 `access_token` 过期之前，通过调用此接口获取新的 `access_token`。调用成功后老的 `access_token` 就会作废。

> 最后更新于 2022-04-21

## 请求

| 基本信息    |                   |
| ----------- | ----------------- |
| HTTP URL    | /v1/token/refresh |
| HTTP Method | GET               |

### 请求头

| 名称          | 类型   | 必须 | 描述 |
| ------------- | ------ | ---- | ---- |
| Authorization | string | 是   |      |

### 请求参数

| 名称       | 类型   | 必须 | 描述 | 默认值                                                                      | 示例                     |
| ---------- | ------ | ---- | ---- | --------------------------------------------------------------------------- | ------------------------ |
| expired_at | string | 是   | 格式 | 过期时间戳，格式遵循 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 规范 | 2023-04-14T12:13:57.859Z |

## 响应

### 响应体

| 名称              | 类型   | 描述                  |
| ----------------- | ------ | --------------------- |
| code              | int    | 错误码，非 0 表示失败 |
| msg               | string | 错误描述              |
| data              | object |                       |
| ∟token            | string | 新的 access_token     |
| ∟expired_at       | string | 过期的时间戳          |
| ∟issued_at        | string | 颁发时间              |
| ∟account_info     | object | 用户信息              |
| ∟∟member_id       | string | 用户 id               |
| ∟∟aaid            | string | aaid                  |
| ∟∟account_channel | string | account_channel       |

### 响应体示例

```json
{
  "code": 0,
  "message": "",
  "data": {
    "token": "xxxxxx",
    "expired_at": "2022-05-14T12:13:57.859Z",
    "issued_at": "2022-04-14T12:13:57.859Z",
    "account_info": {
      "member_id": 123,
      "aaid": 13,
      "account_channel": "lb"
    }
  }
}
```
