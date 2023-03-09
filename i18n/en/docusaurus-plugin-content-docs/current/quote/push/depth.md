---
id: push_depth
title: Push Real-time Depth
slug: depth
sidebar_position: 2
---

Real-time depth data push of the subscribed security.

:::info

[Business Command](../../socket/protocol/push): `102`

:::

## Data Format

### Properties

| Name        | Type     | Description                           |
| ----------- | -------- | ------------------------------------- |
| symbol      | string   | Security code, for example: `AAPL.US` |
| sequence    | int64    | Sequence number                       |
| ask         | object[] | Ask depth                             |
| ∟ position  | int32    | Position                              |
| ∟ price     | string   | Price                                 |
| ∟ volume    | int64    | Volume                                |
| ∟ order_num | int64    | Number of orders                      |
| bid         | object[] | Bid depth                             |
| ∟ position  | int32    | Position                              |
| ∟ price     | string   | Price                                 |
| ∟ volume    | int64    | Volume                                |
| ∟ order_num | int64    | Number of orders                      |

### Protobuf

```protobuf
message PushDepth {
  string symbol = 1;
  int64 sequence = 2;
  repeated Depth ask = 3;
  repeated Depth bid = 4;
}

message Depth {
  int32 position = 1;
  string price = 2;
  int64 volume = 3;
  int64 order_num = 4;
}
```

### Example

```python
# Push Real-time Depth
# https://open.longportapp.com/docs/quote/push/push-depth
# To subscribe quotes data, please check whether "Developers" - "Quote authority" is correct.
# https://open.longportapp.com/account
#
# - HK Market - BMP basic quotation is unable to subscribe with WebSocket as it has no real-time quote push.
# - US Market - LV1 Nasdaq Basic (Only Open API).
#
# Before running, please visit the "Developers" to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
from time import sleep
from longbridge.openapi import QuoteContext, Config, SubType, PushQuote

def on_depth(symbol: str, event: PushDepth):
    print(symbol, event)

config = Config.from_env()
ctx = QuoteContext(config)
ctx.set_on_depth(on_depth)

ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Depth], is_first_push=True)
sleep(30)
```

### JSON Example

```json
{
  "symbol": "700.HK",
  "sequence": 160808750000000,
  "ask": [
    {
      "position": 1,
      "price": "335.000",
      "volume": 500,
      "order_num": 1
    },
    {
      "position": 2,
      "price": "335.200",
      "volume": 400,
      "order_num": 1
    },
    {
      "position": 3,
      "price": "335.400",
      "volume": 500,
      "order_num": 2
    },
    {
      "position": 4,
      "price": "335.600",
      "volume": 1200,
      "order_num": 3
    },
    {
      "position": 5,
      "price": "335.800",
      "volume": 14000,
      "order_num": 8
    }
  ],
  "bid": [
    {
      "position": 1,
      "price": "334.800",
      "volume": 69400,
      "order_num": 13
    },
    {
      "position": 2,
      "price": "334.600",
      "volume": 266600,
      "order_num": 27
    },
    {
      "position": 3,
      "price": "334.400",
      "volume": 61300,
      "order_num": 29
    },
    {
      "position": 4,
      "price": "334.200",
      "volume": 125900,
      "order_num": 31
    },
    {
      "position": 5,
      "price": "334.000",
      "volume": 194600,
      "order_num": 94
    }
  ]
}
```
