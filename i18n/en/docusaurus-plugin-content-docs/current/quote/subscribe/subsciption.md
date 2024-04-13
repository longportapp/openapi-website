---
id: quote_subscription
title: Get Subscription Information
slug: subscription
sidebar_position: 1
---

This API is used to obtain the subscription information.

:::info

[Business Command](../../socket/biz-command): `5`

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

| Name       | Type     | Description                                                                       |
|------------|----------|-----------------------------------------------------------------------------------|
| sub_list   | object[] | Subscribed data                                                                   |
| ∟ symbol   | string   | Security code                                                                     |
| ∟ sub_type | []int32  | Subscription type, see [SubType](../objects#subtype---quote-type-of-subscription) |

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

## Error Code

| Protocol Error Code | Business Error Code | Description        | Troubleshooting Suggestions                                   |
|---------------------|---------------------|--------------------|---------------------------------------------------------------|
| 3                   | 301600              | Invalid request    | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error       | Please try again or contact a technician to resolve the issue |
