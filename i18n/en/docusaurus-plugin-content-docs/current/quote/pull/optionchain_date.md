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
# https://open.longportapp.com/docs/quote/pull/optionchain-date
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.option_chain_expiry_date_list("AAPL.US")
print(resp)
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
