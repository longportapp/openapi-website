---
id: quote_warrant_quote
title: Get Real-time Quotes Of Warrant Securities
slug: warrant-quote
sidebar_position: 4
---

This API is used to obtain the real-time quotes of HK warrants, including the warrant-specific data.

:::info

[Business Command](../../socket/protocol/request): `13`

:::

## Request

### Parameters

| Name   | Type     | Required | Description                                                                                                                                                       |
| ------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | Yes      | Security code list, in `ticker.region` format, for example: `[13447.HK]` <br /><br />**Check rules:**<br />The maximum number of symbols in each request is `500` |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

### Request Example

```python
# Get Real-time Quotes Of Warrant Securities
# https://open.longbridgeapp.com/docs/quote/pull/warrant-quote
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, MultiSecurityRequest, WarrantQuoteResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))
ws = WsClient("wss://openapi-quote.longbridgeapp.com", http, MyWsCallback())

# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
req = MultiSecurityRequest(symbol=["21125.HK"])
result = ws.send_request(Command.QueryWarrantQuote, req.SerializeToString())
resp = WarrantQuoteResponse()
resp.ParseFromString(result)

print(f"Warrant quote:\n\n {resp.secu_quote}")
```

## Response

### Response Properties

| Name                  | Type     | Description                                                                                                    |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| secu_quote            | object[] | Warrants quote                                                                                                 |
| ∟ symbol              | string   | Security code                                                                                                  |
| ∟ last_done           | string   | Latest price                                                                                                   |
| ∟ prev_close          | string   | Yesterday's close                                                                                              |
| ∟ open                | string   | Open                                                                                                           |
| ∟ high                | string   | High                                                                                                           |
| ∟ low                 | string   | Low                                                                                                            |
| ∟ timestamp           | int64    | Time of latest price                                                                                           |
| ∟ volume              | int64    | Volume                                                                                                         |
| ∟ turnover            | string   | Turnover                                                                                                       |
| ∟ trade_status        | int32    | Security trading status, see [TradeStatus](../objects#tradestatus---security-status)                           |
| ∟ warrant_extend      | object   | Warrant extend quote                                                                                           |
| ∟∟ implied_volatility | string   | Implied volatility                                                                                             |
| ∟∟ expiry_date        | string   | Exprity date, in `YYMMDD` format                                                                               |
| ∟∟ last_trade_date    | string   | Last tradalbe date, in `YYMMDD` format                                                                         |
| ∟∟ outstanding_ratio  | string   | Outstanding ratio                                                                                              |
| ∟∟ outstanding_qty    | int64    | Outstanding quantity                                                                                           |
| ∟∟ conversion_ratio   | string   | Conversion ratio                                                                                               |
| ∟∟ category           | string   | Warrant type <br /><br />**Optional value: **<br />`Call` <br />`Put` <br />`Bull` <br />`Bear` <br />`Inline` |
| ∟∟ strike_price       | string   | Strike price                                                                                                   |
| ∟∟ upper_strike_price | string   | Upper bound price                                                                                              |
| ∟∟ lower_strike_price | string   | Lower bound price                                                                                              |
| ∟∟ call_price         | string   | Call price                                                                                                     |
| ∟∟ underlying_symbol  | string   | Underlying security symbol of the option                                                                       |

### Protobuf

```protobuf
message WarrantQuoteResponse {
  repeated WarrantQuote secu_quote = 2;
}

message WarrantQuote {
  string symbol = 1;
  string last_done = 2;
  string prev_close = 3;
  string open = 4;
  string high = 5;
  string low = 6;
  int64 timestamp = 7;
  int64 volume = 8;
  string turnover = 9;
  TradeStatus trade_status = 10;
  WarrantExtend warrant_extend = 11;
}

message WarrantExtend {
  string implied_volatility = 1;
  string expiry_date = 2;
  string last_trade_date = 3;
  string outstanding_ratio = 4;
  int64  outstanding_qty = 5;
  string conversion_ratio = 6;
  string category = 7;
  string strike_price = 8;
  string upper_strike_price = 9;
  string lower_strike_price = 10;
  string call_price = 11;
  string underlying_symbol = 12;
}
```

### Response JSON Example

```json
{
  "secu_quote": [
    {
      "symbol": "66642.HK",
      "last_done": "0.345",
      "prev_close": "0.365",
      "open": "0.345",
      "high": "0.345",
      "low": "0.345",
      "timestamp": 1651130421,
      "volume": 200000,
      "turnover": "69000.000",
      "warrant_extend": {
        "implied_volatility": "0.319",
        "expiry_date": "20220830",
        "last_trade_date": "20220829",
        "outstanding_ratio": "0.0001",
        "outstanding_qty": 20000,
        "conversion_ratio": "10000",
        "category": "Bear",
        "strike_price": "23200.000",
        "upper_strike_price": "0.000",
        "lower_strike_price": "0.000",
        "call_price": "23100.000",
        "underlying_symbol": "HSI.HK"
      }
    },
    {
      "symbol": "14993.HK",
      "last_done": "0.073",
      "prev_close": "0.066",
      "open": "0.069",
      "high": "0.076",
      "low": "0.069",
      "timestamp": 1651130930,
      "volume": 320825000,
      "turnover": "23401125.000",
      "warrant_extend": {
        "implied_volatility": "0.404",
        "expiry_date": "20220927",
        "last_trade_date": "20220921",
        "outstanding_ratio": "0.0247",
        "outstanding_qty": 2465000,
        "conversion_ratio": "10",
        "category": "Call",
        "strike_price": "70.050",
        "upper_strike_price": "0.000",
        "lower_strike_price": "0.000",
        "call_price": "0.000",
        "underlying_symbol": "2318.HK"
      }
    }
  ]
}
```

## API Restrictions

:::caution

- The HK stocks quotation beyond the 20th will be delayed if the quote level is BMP.

:::

## Error Code

| Protocol Error Code | Business Error Code | Description              | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | ------------------------ | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request          | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit       | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error             | Please try again or contact a technician to resolve the issue |
| 7                   | 301607              | Too many request symbols | Reduce the number of symbols in a request                     |
