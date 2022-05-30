---
id: quote_unsubscribe
title: Unsubscribe Quote
slug: unsubscribe
sidebar_position: 3
---

This API is used to unsubscribe quote.

:::info

[Business Command](../../socket/protocol/request): `7`

:::

## Request

### Parameters

| Name      | Type     | Required | Description                                                                                                                                                               |
| --------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | string[] | Yes      | Security code list, for example: `[00700.HK]` <br /><br />**Check rules:**<br />The maximum number of symbols that can be passed in each request is `500`                 |
| sub_type  | int32[]  | Yes      | Subscription type list, for example: `[1,2]`, see [SubType](../objects#subtype---quote-type-of-subscription)                                                              |
| unsub_all | bool     | Yes      | Is unsubscribe all. <br />- When `symbol` is empty, unsubscribe all subscriptions<br />- When `symbol` is not empty, unsubscribe these all subscriptions of these symbols |

### Protobuf

```protobuf
message UnsubscribeRequest {
  repeated string symbol = 1;
  repeated SubType sub_type = 2;
  bool unsub_all = 3;
}
```

### Request Example

```python
# Unsubscribe Quote
# https://open.longbridgeapp.com/docs/quote/subscribe/unsubscribe
# To subscribe quotes data, please check whether "Developers" - "Quote authority" is correct.
# https://open.longbridgeapp.com/account
#
# - HK Market - BMP basic quotation is unable to subscribe with WebSocket as it has no real-time quote push.
# - US Market - LV1 Nasdaq Basic (Only Open API).
#
# Before running, please visit the "Developers" to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
from longbridge.openapi import QuoteContext, Config, SubType
config = Config.from_env()
ctx = QuoteContext(config)

ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Quote])
ctx.unsubscribe(["AAPL.US"], [SubType.Quote])
```

## Response

### Protobuf

```protobuf
message UnsubscribeResponse{
}
```

## Error Code

| Protocol Error Code | Business Error Code | Description                | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | -------------------------- | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request            | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit         | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error               | Please try again or contact a technician to resolve the issue |
| 7                   | 301600              | Invalue request parameters | Please check the request parameter: `sub_type`                |
