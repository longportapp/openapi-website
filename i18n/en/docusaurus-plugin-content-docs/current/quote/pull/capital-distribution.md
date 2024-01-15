---
id: quote_capital_distribution.md
title: Get Security Capital Distribution
slug: capital-distribution
sidebar_position: 18
---

This API is used to obtain the daily capital distribution of security.

:::info
[Business Command](../../socket/biz-command)：`25`
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
# Get Security Capital Distribution
# https://open.longportapp.com/docs/quote/pull/capital-distribution
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
```

## Response

### Response Properties

| Name        | Type     | Description          |
| ----------- | -------- | -------------------- |
| symbol      | string   | Security code        |
| timestamp   | int64    | Data update time     |
| capital_in  | object[] | Inflow capital data  |
| ∟ large     | string   | large order          |
| ∟ medium    | string   | medium order         |
| ∟ small     | string   | small order          |
| capital_out | object[] | Outflow capital data |
| ∟ large     | string   | large order          |
| ∟ medium    | string   | medium order         |
| ∟ small     | string   | small order          |

### Protobuf

```protobuf
message CapitalDistributionResponse {
  message CapitalDistribution {
    string large = 1;
    string medium = 2;
    string small = 3;
  }
  string symbol = 1;
  int64 timestamp = 2;
  CapitalDistribution capital_in = 3;
  CapitalDistribution capital_out = 4;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "timestamp": "1655107800",
  "capital_in": {
    "large": "935389700.000",
    "medium": "2056032380.000",
    "small": "828715920.000"
  },
  "capital_out": {
    "large": "1175331560.000",
    "medium": "2271829740.000",
    "small": "751648940.000"
  }
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
