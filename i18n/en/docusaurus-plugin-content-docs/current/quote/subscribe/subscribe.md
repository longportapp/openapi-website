---
id: quote_subscribe
title: Subscribe Quote
slug: subscribe
sidebar_position: 2
---

This API is used to subscribe quote.

:::info

[Business Command](../../socket/protocol/request): `6`

:::

## Request

### Parameters

| Name          | Type     | Required | Description                                                                                                                                                                                                            |
| ------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol        | string[] | Yes      | Security code list, for example: `[00700.HK]` <br /><br />**Check rules:**<br />The maximum number of symbols that can be passed in each request is `500` <br /> The maximum number of subscriptions per user is `500` |
| sub_type      | int32[]  | Yes      | Subscription type, for example: `[1,2]`, see [SubType](../objects#subtype---quote-type-of-subscription)                                                                                                                |
| is_first_push | bool     | Yes      | Whether to perform a data push immediately after subscribing. (trade not supported)                                                                                                                                    |

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
# https://open.longbridgeapp.com/docs/quote/subscribe/subscribe
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, PushQuote, SubscribeRequest, SubscriptionResponse, SubType)

class MyWsCallback(WsCallback):
    def on_push(self, command: int, body: bytes):
        if command == Command.PushQuoteData:
            quote = PushQuote()
            quote.ParseFromString(body)
            print(f"quote-> {quote}")
        else:
            print(f"-> unknow: {command}")

    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# To subscribe quotes data, please check whether "Developers - "Quote authority" is correct.
# https://open.longbridgeapp.com/account
#
# - HK Market - BMP basic quotation is unable to subscribe with WebSocket as it has no real-time quote push.
# - US Market - LV1 NASDAQ Basic (Only Open API).
#
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
req = SubscribeRequest(symbol=["700.HK", "AAPL.US"], sub_type=[SubType.QUOTE], is_first_push=True)
result = ws.send_request(Command.Subscribe, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print(f"Subscribed symbol:\n\n {resp.sub_list}")

print("\n\nWaiting for push...\nPress [Ctrl + c] to quit.")
while True:
    time.sleep(10)
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
