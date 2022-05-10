---
id: quote_intraday
title: Get Security Intraday
slug: intraday
sidebar_position: 9
---

This API is used to obtain the intraday data of security.

:::info

[Business Command](../../socket/protocol/request): `18`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                                    |
| ------ | ------ | -------- | -------------------------------------------------------------- |
| symbol | string | Yes      | Security code, in `ticker.region` format, for example:`700.HK` |

### Protobuf

```protobuf
message SecurityIntradayRequest {
  string symbol = 1;
}
```

### Request Example

```python
# Get Security Intraday
# https://open.longbridgeapp.com/docs/quote/pull/intraday
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, SecurityIntradayRequest, SecurityIntradayResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
req = SecurityIntradayRequest(symbol="700.HK")
result = ws.send_request(Command.QueryIntraday, req.SerializeToString())
resp = SecurityIntradayResponse()
resp.ParseFromString(result)

print(f"Intraday:\n\n {resp}")
```

## Response

### Response Properties

| Name        | Type     | Description                           |
| ----------- | -------- | ------------------------------------- |
| symbol      | string   | Security code, for example: `AAPL.US` |
| lines       | object[] | Intraday line data                    |
| ∟ price     | string   | Close price of the minute             |
| ∟ timestamp | int64    | Start time stamp of the minute        |
| ∟ volume    | int64    | Volume                                |
| ∟ turnover  | string   | Turnover                              |
| ∟ avg_price | string   | Average price                         |

### Protobuf

```
message SecurityIntradayResponse{
  string symbol = 1;
  repeated Line lines = 2;
}

message Line {
  string price = 1;
  int64 timestamp = 2;
  int64 volume = 3;
  string turnover = 4;
  string avg_price = 5;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "lines": [
    {
      "price": "330.400",
      "timestamp": 1651023000,
      "volume": 375870,
      "turnover": "123949699.000",
      "avg_price": "329.767470"
    },
    {
      "price": "331.200",
      "timestamp": 1651023060,
      "volume": 233095,
      "turnover": "77269032.800",
      "avg_price": "330.427416"
    },
    {
      "price": "330.400",
      "timestamp": 1651023120,
      "volume": 192565,
      "turnover": "63711556.000",
      "avg_price": "330.530719"
    },
    {
      "price": "330.800",
      "timestamp": 1651023180,
      "volume": 143397,
      "turnover": "47471072.400",
      "avg_price": "330.608989"
    },
    {
      "price": "330.800",
      "timestamp": 1651023240,
      "volume": 141834,
      "turnover": "46890605.600",
      "avg_price": "330.608078"
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
