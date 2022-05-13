---
id: quote_optionchain_date
title: Get Option Chain Expiry Date List
slug: optionchain-date
sidebar_position: 11
---

This API is used to obtain the the list of expiration dates of option chain

:::info

[Business Command](../../socket/protocol/request): `20`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                                    |
| ------ | ------ | -------- | -------------------------------------------------------------- |
| symbol | string | Yes      | Security code, in `ticker.region` format, for example:`700.HK` |

### Protobuf

```protobuf
message SecurityRequest {
  string symbol = 1;
}
```

### Request Example

```python
# Get Option Chain Expiry Date List
# https://open.longbridgeapp.com/docs/quote/pull/optionchain-date
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, SecurityRequest, OptionChainDateListResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))
ws = WsClient("wss://openapi-quote.longbridgeapp.com", http, MyWsCallback())

# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
req = SecurityRequest(symbol="AAPL.US")
result = ws.send_request(Command.QueryOptionChainDate, req.SerializeToString())
resp = OptionChainDateListResponse()
resp.ParseFromString(result)

print(f"Option chain date:\n\n {resp}")
```

## Response

### Response Properties

| Name        | Type     | Description                                        |
| ----------- | -------- | -------------------------------------------------- |
| expiry_date | string[] | option chain expiry dates list，in `YYMMDD` format |

### Protobuf

```protobuf
message OptionChainDateListResponse {
  repeated string expiry_date = 1;
}
```

### Response JSON Example

```json
{
  "expiry_date": [
    "20220422",
    "20220429",
    "20220506",
    "20220513",
    "20220520",
    "20220527",
    "20220603",
    "20220617",
    "20220715",
    "20220819",
    "20220916",
    "20221021",
    "20221118",
    "20230120",
    "20230317",
    "20230616",
    "20230915",
    "20240119",
    "20240621"
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
