---
id: push_broker
title: Push Real-time Brokers
slug: broker
sidebar_position: 3
---

Real-time brokers data push of the subscribed security.

:::info

[Business Command](../../socket/protocol/push): `103`

:::

## Data Format

### Properties

| Name         | Type     | Description                           |
| ------------ | -------- | ------------------------------------- |
| symbol       | string   | Security code, for example: `AAPL.US` |
| sequence     | int64    | Sequence number                       |
| ask_brokers  | object[] | Ask brokers                           |
| ∟ position   | int32    | Position                              |
| ∟ broker_ids | int32[]  | [Broker ID](../pull/broker-ids)       |
| bid_brokers  | object[] | Bid brokers                           |
| ∟ position   | int32    | Position                              |
| ∟ broker_ids | int32[]  | [Broker ID](../pull/broker-ids)       |

### Protobuf

```protobuf
message PushBrokers {
  string symbol = 1;
  int64 sequence = 2;
  repeated Brokers ask_brokers = 3;
  repeated Brokers bid_brokers = 4;
}

message Brokers {
  int32 position = 1;
  repeated int32 broker_ids = 2;
}
```

### Example

```python
# Push Real-time Brokers
# https://open.longbridgeapp.com/docs/quote/push/push-brokers
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, PushBrokers, SubscribeRequest, SubscriptionResponse, SubType)

class MyWsCallback(WsCallback):
    def on_push(self, command: int, body: bytes):
        if command == Command.PushBrokersData:
            quote = PushBrokers()
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
# - US Market - LV1 Nasdaq Basic (Only Open API).
#
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
req = SubscribeRequest(symbol=["700.HK"], sub_type=[SubType.BROKERS], is_first_push=True)
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
  "ask_brokers": [
    {
      "position": 1,
      "broker_ids": [7358, 9057, 9028, 7364]
    },
    {
      "position": 2,
      "broker_ids": [6968, 3448, 3348, 1049, 4973, 6997, 3448, 5465, 6997]
    }
  ],
  "bid_brokers": [
    {
      "position": 1,
      "broker_ids": [6996, 5465, 8026, 8304, 4978]
    },
    {
      "position": 2,
      "broker_ids": [7358, 9057, 9028, 7364]
    }
  ]
}
```
