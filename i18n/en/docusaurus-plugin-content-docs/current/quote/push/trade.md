---
id: push_trade
title: Push Real-time Trades
slug: trade
sidebar_position: 4
---

Real-time trades data push of the subscribed security.

:::info

[Business Command](../../socket/protocol/push): `104`

:::

## Data Format

### Properties

| Name            | Type     | Description                                                                                     |
| --------------- | -------- | ----------------------------------------------------------------------------------------------- |
| symbol          | string   | Security code, for example: `AAPL.US`                                                           |
| sequence        | int64    | Sequence number                                                                                 |
| trades          | object[] | Trades data                                                                                     |
| ∟ price         | string   | Price                                                                                           |
| ∟ volume        | int64    | Volume                                                                                          |
| ∟ timestamp     | int64    | Time of trading                                                                                 |
| ∟ trade_type    | string   | [Trade type](#trade-type)                                                                       |
| ∟ direction     | int32    | Trade direction <br /><br />**Optional value:**<br />`0` - nature<br />`1` - down<br />`2` - up |
| ∟ trade_session | int32    | Trade session, see [TradeSession](../objects#tradesession---trading-session)                    |

#### Trade Type

HK

- `*` - Overseas trade
- `D` - Odd-lot trade
- `M` - Non-direct off-exchange trade
- `P` - Late trade (Off-exchange previous day)
- `U` - Auction trade
- `X` - Direct off-exchange trade
- `Y` - Automatch internalized
- ` ` - Automatch normal

US

- ` ` - Regular sale
- `A` - Acquisition
- `B` - Bunched trade
- `D` - Distribution
- `F` - Intermarket sweep
- `G` - Bunched sold trades
- `H` - Price variation trade
- `I` - Odd lot trade
- `K` - Rule 155 trde(NYSE MKT)
- `M` - Market center close price
- `P` - Prior reference price
- `Q` - Market center open price
- `S` - Split trade
- `V` - Contingent trade
- `W` - Average price trade
- `X` - Cross trade
- `1` - Stopped stock(Regular trade)

### Protobuf

```protobuf
message PushTrade {
  string symbol = 1;
  int64 sequence = 2;
  repeated Trade trade = 3;
}

message Trade {
  string price = 1;
  int64 volume = 2;
  int64 timestamp = 3;
  string trade_type = 4;
  int32 direction = 5;
  TradeSession trade_session = 6;
}
```

### Example

```python
# Push Real-time Trades
# https://open.longbridgeapp.com/docs/quote/push/push-trade
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, PushTrade, SubscribeRequest, SubscriptionResponse, SubType)

class MyWsCallback(WsCallback):
    def on_push(self, command: int, body: bytes):
        if command == Command.PushTradeData:
            quote = PushTrade()
            quote.ParseFromString(body)
            print(f"quote-> {quote}")
        else:
            print(f"-> unknow: {command}")

    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))
ws = WsClient("wss://openapi-quote.longbridgeapp.com", http, MyWsCallback())

# To subscribe quotes data, please check whether "Developers" - "Quote authority" is correct.
# https://open.longbridgeapp.com/account
#
# - HK Market - BMP basic quotation is unable to subscribe with WebSocket as it has no real-time quote push.
# - US Market - LV1 Nasdaq Basic (Only Open API).
#
# Before running, please visit the "Developers" to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
req = SubscribeRequest(symbol=["700.HK", "AAPL.US"], sub_type=[SubType.TRADE], is_first_push=True)
result = ws.send_request(Command.Subscribe, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print(f"Subscribed symbol:\n\n {resp.sub_list}")

print("\n\nWaiting for push...\nPress [Ctrl + c] to quit.")
while True:
    time.sleep(10)
```

### JSON Example

```json
{
  "symbol": "700.HK",
  "sequence": 160808750000000,
  "trades": [
    {
      "price": "158.760",
      "volume": 1,
      "timestamp": 1651103979,
      "trade_type": "I",
      "trade_session": 2
    },
    {
      "price": "158.745",
      "volume": 1,
      "timestamp": 1651103985,
      "trade_type": "I",
      "trade_session": 2
    },
    {
      "price": "158.800",
      "volume": 1,
      "timestamp": 1651103995,
      "trade_type": "I",
      "trade_session": 2
    }
  ]
}
```
