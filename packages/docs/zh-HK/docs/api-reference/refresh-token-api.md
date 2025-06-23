---
title: 刷新 Token
id: refresh-token-api
slug: /refresh-token-api
sidebar_position: 2
---

# 刷新 Access Token

在老的 `access_token` 過期之前，通過調用此接口獲取新的 `access_token`。調用成功後老的 `access_token` 就會作廢。

> 最後更新於 2022-04-21

## 請求

| 基本信息    |                   |
| ----------- | ----------------- |
| HTTP URL    | /v1/token/refresh |
| HTTP Method | GET               |

### 請求頭

| 名稱          | 類型   | 必須 | 描述 |
| ------------- | ------ | ---- | ---- |
| Authorization | string | 是   |      |

### 請求參數

| 名稱       | 類型   | 必須 | 描述 | 默認值                                                                      | 示例                     |
| ---------- | ------ | ---- | ---- | --------------------------------------------------------------------------- | ------------------------ |
| expired_at | string | 是   | 格式 | 過期時間戳，格式遵循 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 規範 | 2023-04-14T12:13:57.859Z |

## 響應

### 響應體

| 名稱              | 類型   | 描述                  |
| ----------------- | ------ | --------------------- |
| code              | int    | 錯誤碼，非 0 表示失敗 |
| msg               | string | 錯誤描述              |
| data              | object |                       |
| ∟token            | string | 新的 access_token     |
| ∟expired_at       | string | 過期的時間戳          |
| ∟issued_at        | string | 頒發時間              |
| ∟account_info     | object | 用戶信息              |
| ∟∟member_id       | string | 用戶 id               |
| ∟∟aaid            | string | aaid                  |
| ∟∟account_channel | string | account_channel       |

### 響應體示例

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
