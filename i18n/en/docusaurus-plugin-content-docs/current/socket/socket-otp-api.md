---
title: Get Socket OTP(One time password)
id: socket-otp-api
slug: /socket-token-api
sidebar_position: 2
---

# Get OTP(One Time Password) API

Our socket `Token` is one time password, you can use the `Token` to connect to quote or trade gateway. It will be expired after authing.

> Last Update at 2022-04-28

## API

| 基本信息    |                  |
| ----------- | ---------------- |
| HTTP URL    | /v1/socket/token |
| HTTP Method | GET              |

### Request Headers

| 名称          | 类型   | 必须 | 描述                                          |
| ------------- | ------ | ---- | --------------------------------------------- |
| Authorization | string | 是   |                                               |
| Content-Type  | string | 是   | **固定值**："application/json; charset=utf-8" |

### Request Parameters

## Response

### Response Body

| field | type   | description                       |
| ----- | ------ | --------------------------------- |
| code  | int    | error code, failed if not equal 0 |
| msg   | string | error description                 |
| data  | object |                                   |
| ∟otp  | string | token                             |

### Response Example

```json
{
  "code": 0,
  "message": "",
  "data": {
    "otp": "xxxxxxxx"
    }
  }
}
```
