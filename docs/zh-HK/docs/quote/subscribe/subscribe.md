---
id: quote_subscribe
title: 訂閱行情數據
slug: subscribe
sidebar_position: 1
---

該接口用於訂閱標的行情數據。

<SDKLinks module="quote" klass="QuoteContext" method="subscriptions" />

:::info

[業務指令](../../socket/biz-command)：`6`

:::

## Request

### Parameters

| Name          | Type     | Required | Description                                                                                                                                            |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol        | string[] | 是       | 訂閱的標的代碼，例如：`[700.HK]` <br /><br />**校驗規則：**<br />每次請求支持傳入的標的數量上限是 `500` 個 <br /> 每個用戶同時訂閱標的數量最多為 `500` |
| sub_type      | int32[]  | 是       | 訂閱的數據類型，例如：`[1,2]`，詳見 [SubType](../objects#subtype---訂閱數據的類型)                                                                     |
| is_first_push | bool     | 是       | 訂閱後是否立刻進行一次數據推送。 ( trade 不支持)                                                                                                       |

### Protobuf

```protobuf
message SubscribeRequest {
  repeated string symbol = 1;
  repeated SubType sub_type = 2;
  bool is_first_push = 3;
}
```

### Request Example

```python
# 訂閱行情數據
#
# 訂閱行情數據請檢查“開發者中心“ - “行情權限”是否正確
# https://open.longbridge.com/account
#
# - 港股 - BMP 基礎報價，無實時行情推送，無法用 WebSocket 訂閱
# - 美股 - LV1 納斯達克最優報價 (只限 OpenAPI）
#
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“Longbridge”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from time import sleep
from longport.openapi import QuoteContext, Config, SubType, PushQuote

def on_quote(symbol: str, event: PushQuote):
    print(symbol, event)

config = Config.from_env()
ctx = QuoteContext(config)
ctx.set_on_quote(on_quote)

ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Quote], is_first_push=True)
sleep(30)
```

## Response

### Response Properties

返回本次請求訂閱成功的標的和類型。

| Name       | Type     | Description                                                          |
| ---------- | -------- | -------------------------------------------------------------------- |
| sub_list   | object[] | 訂閱的數據                                                           |
| ∟ symbol   | string   | 標的代碼                                                             |
| ∟ sub_type | int32[]  | 訂閱的數據類型，詳見：[SubType](../objects#subtype---訂閱數據的類型) |

### Protobuf

```protobuf
message SubscriptionResponse {
  repeated SubTypeList sub_list = 1;
}

message SubTypeList {
  string symbol = 1;
  repeated SubType sub_type = 2;
}
```

### Response JSON Example

```json
{
  "sub_list": [
    {
      "symbol": "700.HK",
      "sub_type": [1, 2, 3]
    },
    {
      "symbol": "AAPL.US",
      "sub_type": [2]
    }
  ]
}
```

## 接口限制

:::caution

- 港股 BMP 行情不支持行情數據推送。

:::

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述             | 排查建議                 |
| ---------- | ---------- | ---------------- | ------------------------ |
| 3          | 301600     | 無效的請求       | 請求參數有誤或解包失敗   |
| 3          | 301606     | 限流             | 降低請求頻次             |
| 7          | 301602     | 服務端內部錯誤   | 請重試或聯繫技術人員處理 |
| 7          | 301605     | 訂閱數量超出限制 | 取消部分訂閱             |
| 7          | 301600     | 請求參數有誤     | 檢查請求的 `sub_type`    |
