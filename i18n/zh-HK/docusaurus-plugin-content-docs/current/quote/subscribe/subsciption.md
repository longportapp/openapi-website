---
id: quote_subscription
title: 獲取已訂閱標的行情
slug: subscription
sidebar_position: 1
---

該接口用於獲取當前連接已訂閱的標的行情。

:::info

[業務指令](../../socket/biz-command)：`5`

:::

## Request

### Protobuf

```protobuf
message SubscriptionRequest {
}
```

### Request Example

```python
from time import sleep
from longport.openapi import QuoteContext, Config, SubType, PushQuote, Period, AdjustType

def on_quote(symbol: str, event: PushQuote):
    print(symbol, event)

config = Config.from_env()
ctx = QuoteContext(config)
ctx.set_on_quote(on_quote)
ctx.subscribe(["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"], [SubType.Quote], is_first_push=True)
```

## Response

### Response Properties

| Name       | Type     | Description                                                        |
|------------|----------|--------------------------------------------------------------------|
| sub_list   | object[] | 訂閱的數據                                                         |
| ∟ symbol   | string   | 標的代碼                                                           |
| ∟ sub_type | []int32  | 訂閱的數據類型，詳見 [SubType](../objects#subtype---訂閱數據的類型) |

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

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                 |
|------------|------------|--------------|----------------------|
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗   |
| 3          | 301606     | 限流           | 降低請求頻次             |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理 |
