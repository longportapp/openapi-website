---
id: quote_option_quote
title: Real-time Quotes of Option
slug: option-quote
sidebar_position: 3
---

This API is used to obtain the real-time quotes of US stock options, including the option-specific data.

<SDKLinks module="quote" klass="QuoteContext" method="option_quote" />

:::info
[Business Command](../../socket/biz-command): `12`
:::

## Request

### Parameters

| Name   | Type     | Required | Description                                                                                                                                                                                                                                      |
| ------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol | string[] | Yes      | Security code list. obtain the symbol of the options through the [optionchain](./optionchain-date-strike.md) API, for example: `[BABA230120C160000.US]` <br /><br />**Check rules:**<br />The maximum number of symbols in each request is `500` |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

### Request Example

```python
# Get Real-time Quotes Of Option Securities
# https://open.longbridge.com/docs/quote/pull/option-quote
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile app.
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.option_quote(["AAPL230317P160000.US"])
print(resp)
```

## Response

### Response Properties

| Name                     | Type     | Description                                                                          |
| ------------------------ | -------- | ------------------------------------------------------------------------------------ |
| secu_quote               | object[] | Options quote                                                                        |
| ∟ symbol                 | string   | Security code                                                                        |
| ∟ last_done              | string   | Latest price                                                                         |
| ∟ prev_close             | string   | Yesterday's close                                                                    |
| ∟ open                   | string   | Open                                                                                 |
| ∟ high                   | string   | High                                                                                 |
| ∟ low                    | string   | Low                                                                                  |
| ∟ timestamp              | int64    | Time of latest price                                                                 |
| ∟ volume                 | int64    | Volume                                                                               |
| ∟ turnover               | string   | Turnover                                                                             |
| ∟ trade_status           | int32    | Security trading status, see [TradeStatus](../objects#tradestatus---security-status) |
| ∟ option_extend          | object   | Option extend quote                                                                  |
| ∟∟ implied_volatility    | string   | Implied volatility                                                                   |
| ∟∟ open_interest         | int64    | Number of open positions                                                             |
| ∟∟ expiry_date           | string   | Exprity date, in `YYMMDD` format                                                     |
| ∟∟ strike_price          | string   | Strike price                                                                         |
| ∟∟ contract_multiplier   | string   | Contract multiplier                                                                  |
| ∟∟ contract_type         | string   | Option type <br /><br />**Optional value:**<br />`A` - American <br />`U` - Europe   |
| ∟∟ contract_size         | string   | Contract size                                                                        |
| ∟∟ direction             | string   | Direction <br /><br />**Optional value:**<br />`P` - put <br />`C` - call            |
| ∟∟ historical_volatility | string   | Underlying security historical volatility of the optionn                             |
| ∟∟ underlying_symbol     | string   | Underlying security symbol of the option                                             |

### Protobuf

```protobuf
message OptionQuoteResponse {
  repeated OptionQuote secu_quote = 1;
}

message OptionQuote {
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
  OptionExtend option_extend = 11;
}

message OptionExtend {
  string implied_volatility = 1;
  int64 open_interest = 2;
  string expiry_date = 3;
  string strike_price = 4;
  string contract_multiplier = 5;
  string contract_type = 6;
  string contract_size = 7;
  string direction = 8;
  string historical_volatility = 9;
  string underlying_symbol = 10;
}
```

### Response JSON Example

```json
{
  "secu_quote": [
    {
      "symbol": "AAPL220429P162500.US",
      "last_done": "7.78",
      "prev_close": "4.13",
      "open": "4.43",
      "high": "7.80",
      "low": "4.43",
      "timestamp": 1651003200,
      "volume": 3082,
      "turnover": "1813434.00",
      "option_extend": {
        "implied_volatility": "0.592",
        "open_interest": 11463,
        "expiry_date": "20220429",
        "strike_price": "162.50",
        "contract_multiplier": "100",
        "contract_type": "A",
        "contract_size": "100",
        "direction": "P",
        "historical_volatility": "0.2750",
        "underlying_symbol": "AAPL.US"
      }
    },
    {
      "symbol": "AAPL220429C150000.US",
      "last_done": "9.25",
      "prev_close": "13.87",
      "open": "13.80",
      "high": "13.80",
      "low": "9.15",
      "timestamp": 1651003200,
      "volume": 413,
      "turnover": "436835.00",
      "option_extend": {
        "implied_volatility": "0.702",
        "open_interest": 800,
        "expiry_date": "20220429",
        "strike_price": "150.00",
        "contract_multiplier": "100",
        "contract_type": "A",
        "contract_size": "100",
        "direction": "C",
        "historical_volatility": "0.2750",
        "underlying_symbol": "AAPL.US"
      }
    }
  ]
}
```

## Error Code

| Protocol Error Code | Business Error Code | Description              | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | ------------------------ | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request          | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit       | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error             | Please try again or contact a technician to resolve the issue |
| 7                   | 301607              | Too many request symbols | Reduce the number of symbols in a request                     |
