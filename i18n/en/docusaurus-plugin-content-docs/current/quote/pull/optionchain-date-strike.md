---
id: quote_optionchain_date_strike
title: Get Option Chain Info By Date
slug: optionchain-date-strike
sidebar_position: 12
---

This API is used to obtain a list of option securities by the option chain expiry date.

:::info

[Business Command](../../socket/protocol/request): `21`

:::

## Request

### Parameters

| Name        | Type   | Required | Description                                                                                                                  |
| ----------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| symbol      | string | Yes      | Security code, in `ticker.region` format, for example:`700.HK`                                                               |
| expiry_date | string | Yes      | Option expiry date，in `YYMMDD` format, for example: `20220429`, obtained by [Option Expiry Date](./optionchain_date.md) API |

### Protobuf

```protobuf
message OptionChainDateStrikeInfoRequest {
  string symbol = 1;
  string expiry_date = 2;
}
```

### Request Example

```python
# Get Option Chain Info By Date
# https://open.longbridgeapp.com/docs/quote/pull/optionchain-date-strike
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, OptionChainDateStrikeInfoRequest, OptionChainDateStrikeInfoResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
req = OptionChainDateStrikeInfoRequest(symbol="AAPL.US", expiry_date="20230120")
result = ws.send_request(Command.QueryOptionChainDateStrikeInfo, req.SerializeToString())
resp = OptionChainDateStrikeInfoResponse()
resp.ParseFromString(result)

print(f"Option chain info:\n\n {resp}")
```

## Response

### Response Properties

| Name              | Type     | Description                  |
| ----------------- | -------- | ---------------------------- |
| strike_price_info | object[] | Option security info         |
| ∟ price           | string   | Strike price                 |
| ∟ call_symbol     | string   | Security code of call option |
| ∟ put_symbol      | string   | Security code of put option  |
| ∟ standard        | bool     | Is standard                  |

### Protobuf

```protobuf
message OptionChainDateStrikeInfoResponse {
  repeated StrikePriceInfo strike_price_info = 1;
}

message StrikePriceInfo {
  string price = 1;
  string call_symbol = 2;
  string put_symbol = 3;
  bool  standard = 4;
}
```

### Response JSON Example

```json
{
  "strike_price_info": [
    {
      "price": "100",
      "call_symbol": "AAPL220429C100000.US",
      "put_symbol": "AAPL220429P100000.US",
      "standard": true
    },
    {
      "price": "105",
      "call_symbol": "AAPL220429C105000.US",
      "put_symbol": "AAPL220429P105000.US",
      "standard": true
    },
    {
      "price": "110",
      "call_symbol": "AAPL220429C110000.US",
      "put_symbol": "AAPL220429P110000.US",
      "standard": true
    },
    {
      "price": "115",
      "call_symbol": "AAPL220429C115000.US",
      "put_symbol": "AAPL220429P115000.US",
      "standard": true
    }
  ]
}
```

## Error Code

| Protocol Error Code | Business Error Code | Description                | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | -------------------------- | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request            | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit         | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error               | Please try again or contact a technician to resolve the issue |
| 7                   | 301600              | Invalue request parameters | Please check the request parameter: `symbol`，`expiry_date`   |
