---
id: quote_subscribe
title: Subscribe Quote
slug: subscribe
sidebar_position: 1
---

This API is used to subscribe quote.

<SDKLinks module="quote" klass="QuoteContext" method="subscriptions" />

:::info

[Business Command](../../socket/biz-command): `6`

:::

## Request

### Parameters

| Name          | Type     | Required | Description                                                                                                                                                                                                          |
| ------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol        | string[] | Yes      | Security code list, for example: `[700.HK]` <br /><br />**Check rules:**<br />The maximum number of symbols that can be passed in each request is `500` <br /> The maximum number of subscriptions per user is `500` |
| sub_type      | int32[]  | Yes      | Subscription type, for example: `[1,2]`, see [SubType](../objects#subtype---quote-type-of-subscription)                                                                                                              |
| is_first_push | bool     | Yes      | Whether to perform a data push immediately after subscribing. (trade not supported)                                                                                                                                  |

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
# Subscribe Quote
#
# To subscribe quotes data, please check whether "Developers" - "Quote authority" is correct.
# https://open.longportapp.com/account
#
# - HK Market - BMP basic quotation is unable to subscribe with WebSocket as it has no real-time quote push.
# - US Market - LV1 Nasdaq Basic (Only OpenAPI).
#
# Before running, please visit the "Developers" to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
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

Returns the securities and types of the successful subscription of this request.

| Name       | Type     | Description                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------- |
| sub_list   | object[] | Subscription list                                                                 |
| ∟ symbol   | string   | Seurity code                                                                      |
| ∟ sub_type | int32[]  | Subscription type, see [SubType](../objects#subtype---quote-type-of-subscription) |

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

## API Restrictions

:::caution

- HK BMP quote level does not support quote push.

:::

## Error Code

| Protocol Error Code | Business Error Code | Description                | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | -------------------------- | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request            | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit         | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error               | Please try again or contact a technician to resolve the issue |
| 7                   | 301605              | Too many subscriptons      | Unsubscribe some subscribed securities                        |
| 7                   | 301600              | Invalue request parameters | Please check the request parameter: `sub_type`                |
