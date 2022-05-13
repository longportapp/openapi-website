---
id: quote_trade_day
title: Get Market Trading Days
slug: trade-day
sidebar_position: 16
---

This API is used to obtain the trading days of the market.

:::info

[Business Command](../../socket/protocol/request): `9`

:::

## Request

### Parameters

| Name    | Type   | Required | Description                                                                                                                                                                                 |
| ------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| market  | string | Yes      | Market <br /><br />**Optional value:**<br/>`US` - US market<br/>`HK` - HK market<br/>`CN` - CN market<br/>`SG` - SG market                                                                  |
| beg_day | string | Yes      | begin day, in `YYMMDD` format, for example: `20220401`                                                                                                                                      |
| end_day | string | Yes      | begin day, in `YYMMDD` format, for example: `20220420` <br/><br/>**Check rules:**<br/> The interval cannot be greater than one month <br/> Only supports query data of the most recent year |

### Protobuf

```protobuf
message MarketTradeDayRequest {
  string market = 1;
  string beg_day = 2;
  string end_day = 3;
}
```

### Request Example

```python
# Get Market Trading Days
# https://open.longbridgeapp.com/docs/quote/pull/trade-day
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, MarketTradeDayRequest, MarketTradeDayResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))
ws = WsClient("wss://openapi-quote.longbridgeapp.com", http, MyWsCallback())

# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
req = MarketTradeDayRequest(market="HK", beg_day="20220120", end_day="20220220")
result = ws.send_request(Command.QueryMarketTradeDay, req.SerializeToString())
resp = MarketTradeDayResponse()
resp.ParseFromString(result)

print(f"Trade days:\n\n {resp}")
```

## Response

### Response Properties

| Name           | Type     | Description                           |
| -------------- | -------- | ------------------------------------- |
| trade_day      | string[] | Trading days, in `YYMMDD` format      |
| half_trade_day | string[] | Half trading days, in `YYMMDD` format |

### Protobuf

```protobuf
message MarketTradeDayResponse {
  repeated string trade_day = 1;
  repeated string half_trade_day = 2;
}
```

### Response JSON Example

```json
{
  "trade_day": [
    "20220120",
    "20220121",
    "20220124",
    "20220125",
    "20220126",
    "20220127",
    "20220128",
    "20220204",
    "20220207",
    "20220208",
    "20220209",
    "20220210"
  ],
  "half_trade_day": ["20220131"]
}
```

## Error Code

| Protocol Error Code | Business Error Code | Description                | Troubleshooting Suggestions                                        |
| ------------------- | ------------------- | -------------------------- | ------------------------------------------------------------------ |
| 3                   | 301600              | Invalid request            | Invalid request parameters or unpacking request failed             |
| 3                   | 301606              | Request rate limit         | Reduce the frequency of requests                                   |
| 7                   | 301602              | Server error               | Please try again or contact a technician to resolve the issue      |
| 7                   | 301600              | Invalue request parameters | Please check the request parameter: `market`, `beg_day`, `end_day` |
