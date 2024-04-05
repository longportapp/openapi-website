---
id: quote_subscription
title: 获取已订阅标的行情
slug: subscription
sidebar_position: 1
---

该接口用于获取当前连接已订阅的标的行情。

:::info

[业务指令](../../socket/biz-command)：`5`

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
| sub_list   | object[] | 订阅的数据                                                         |
| ∟ symbol   | string   | 标的代码                                                           |
| ∟ sub_type | []int32  | 订阅的数据类型，详见 [SubType](../objects#subtype---订阅数据的类型) |

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

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                 |
|------------|------------|--------------|----------------------|
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败   |
| 3          | 301606     | 限流           | 降低请求频次             |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理 |
