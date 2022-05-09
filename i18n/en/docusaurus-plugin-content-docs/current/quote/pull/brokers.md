---
id: quote_brokers
title: Get Security Brokers
slug: brokers
sidebar_position: 6
---

This API is used to obtain the real-time broker queue data of security.

:::info
[Business Command](../../socket/protocol/request): `15`
:::

## Request

### Parameters

| Name   | Type   | Required | Description                                                     |
| ------ | ------ | -------- | --------------------------------------------------------------- |
| symbol | string | Yes      | Security code, in `ticker.region` format, for example: `700.HK` |

### Protobuf

```protobuf
message SecurityRequest {
  string symbol = 1;
}
```

### Request Example

```python
# 获取标的经纪队列
# https://open.longbridgeapp.com/docs/quote/pull/brokers
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, SecurityRequest, SecurityBrokersResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
req = SecurityRequest(symbol="700.HK")
result = ws.send_request(Command.QueryBrokers, req.SerializeToString())
resp = SecurityBrokersResponse()
resp.ParseFromString(result)

print(f"Brokers:\n\n {resp}")
```

## Response

### Response Properties

| Name         | Type     | Description                                                        |
| ------------ | -------- | ------------------------------------------------------------------ |
| symbol       | string   | Security code                                                      |
| ask_brokers  | object[] | Ask brokers                                                        |
| ∟ position   | int32    | Position                                                           |
| ∟ broker_ids | int32[]  | Broker IDs, obtained through the[Get Broker IDs ](./broker-ids)API |
| bid_brokers  | object[] | Bid brokers                                                        |
| ∟ position   | int32    | Postition                                                          |
| ∟ broker_ids | int32[]  | Broker IDs, obtained through the[Get Broker IDs ](./broker-ids)API |

### Protobuf

```protobuf
message SecurityBrokersResponse {
  string symbol = 1;
  repeated Brokers ask_brokers = 2;
  repeated Brokers bid_brokers = 3;
}

message Brokers {
  int32 position = 1;
  repeated int32 broker_ids = 2;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
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
      "position": 2
    }
  ]
}
```

## Error Code

| Protocol Error Code | Business Error Code | Description        | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | ------------------ | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request    | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error       | Please try again or contact a technician to resolve the issue |
| 7                   | 301600              | Symbol not found   | Check that the requested `symbol` is correct                  |
| 7                   | 301603              | No quotes          | Security no quote                                             |
| 7                   | 301604              | No access          | No access to security quote                                   |
