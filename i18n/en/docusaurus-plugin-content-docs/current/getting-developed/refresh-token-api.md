---
title: Refresh Token
id: refresh-token-api
slug: /refresh-token-api
sidebar_position: 2
---

# Refresh Access Token

Call this to get a new `access_token` before the old `access_token` expires. The old `access_token` will be invalidated after a successful call.

> Lasted 2022-04-21

## Request

| Basic Information |                   |
| ----------------- | ----------------- |
| HTTP URL          | /v1/token/refresh |
| HTTP Method       | GET               |
| Permission        | Not required      |

### Request Headers

| Name          | Type   | Required | Description |
| ------------- | ------ | -------- | ----------- |
| Authorization | string | Yes      |             |

### Request Parameters

| Name       | Type   | Required | Description                                                                                                  | Example                  |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------ | ------------------------ |
| expired_at | string | Yes      | Expiration timestamp, formatted according to [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) specification | 2023-04-14T12:13:57.859Z |

## Response

### Response Body

| Name              | Type   | Description                        |
| ----------------- | ------ | ---------------------------------- |
| code              | int    | Error code, non-zero means failure |
| msg               | string | Error message                      |
| data              | object |                                    |
| ∟token            | string | new access_token                   |
| ∟expired_at       | string | access_token expired time          |
| ∟issued_at        | string | issued time                        |
| ∟account_info     | object | user info                          |
| ∟∟member_id       | string | user id                            |
| ∟∟aaid            | string | aaid                               |
| ∟∟account_channel | string | account_channel                    |

### Response Example

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
