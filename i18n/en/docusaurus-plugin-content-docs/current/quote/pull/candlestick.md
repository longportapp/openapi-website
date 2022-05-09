---
id: quote_candlestick
title: Get Security Candlesticks
slug: candlestick
sidebar_position: 10
---

This API is used to obtain the candlestick data of security.

:::info

[Business Command](../../socket/protocol/request): `19`

:::

## Request

### Parameters

| Name        | Type   | Required | Description                                                                                              |
| ----------- | ------ | -------- | -------------------------------------------------------------------------------------------------------- |
| symbol      | string | Yes      | Security code, in `ticker.region` format, for example:`700.HK`                                           |
| period      | int32  | Yes      | Candlestick period, for example: `1000`, see [Period](../objects#period---candlestick-period)            |
| count       | int32  | Yes      | Count of cancdlestick, for example: `100`<br /><br />**Check rules:** <br />maximum count is `1000`      |
| adjust_type | int32  | Yes      | Adjustment type, for example: `0`, see [AdjustType](../objects#adjusttype---candlestick-adjustment-type) |

### Protobuf

```protobuf
message SecurityCandlestickRequest {
  string symbol = 1;
  Period period = 2;
  int32 count = 3;
  AdjustType adjust_type = 4;
}
```

## Response

### Response Properties

| Name         | Type     | Description                           |
| ------------ | -------- | ------------------------------------- |
| symbol       | string   | Security code, for example: `AAPL.US` |
| candlesticks | object[] | Candlestick data                      |
| ∟ close      | string   | Close price                           |
| ∟ open       | string   | Open price                            |
| ∟ low        | string   | Low price                             |
| ∟ high       | string   | High price                            |
| ∟ volume     | int64    | Volume                                |
| ∟ turnover   | string   | Turnover                              |
| ∟ timestamp  | int64    | Timestamp                             |

### Protobuf

```protobuf
message SecurityCandlestickResponse {
  string symbol = 1;
  repeated Candlestick candlesticks = 2;
}

message Candlestick {
  string close = 1;
  string open = 2;
  string low = 3;
  string high = 4;
  int64 volume = 5;
  string turnover = 6;
  int64 timestamp = 7;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "candlesticks": [
    {
      "close": "362.000",
      "open": "364.600",
      "low": "361.600",
      "high": "368.800",
      "volume": 10853604,
      "turnover": "3954556819.000",
      "timestamp": 1650384000
    },
    {
      "close": "348.000",
      "open": "352.000",
      "low": "343.000",
      "high": "356.200",
      "volume": 25738562,
      "turnover": "8981529950.000",
      "timestamp": 1650470400
    },
    {
      "close": "340.600",
      "open": "334.800",
      "low": "334.200",
      "high": "343.000",
      "volume": 28031299,
      "turnover": "9492674293.000",
      "timestamp": 1650556800
    },
    {
      "close": "327.400",
      "open": "332.200",
      "low": "325.200",
      "high": "338.600",
      "volume": 25788422,
      "turnover": "8541441823.000",
      "timestamp": 1650816000
    },
    {
      "close": "335.800",
      "open": "332.200",
      "low": "330.600",
      "high": "341.600",
      "volume": 27288328,
      "turnover": "9166022626.000",
      "timestamp": 1650902400
    }
  ]
}
```

## Error Code

| Protocol Error Code | Business Error Code | Description                    | Troubleshooting Suggestions                                                    |
| ------------------- | ------------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| 3                   | 301600              | Invalid request                | Invalid request parameters or unpacking request failed                         |
| 3                   | 301606              | Request rate limit             | Reduce the frequency of requests                                               |
| 7                   | 301602              | Server error                   | Please try again or contact a technician to resolve the issue                  |
| 7                   | 301600              | Invalue request parameters     | Please check the request parameter: `symbol`, `count`, `adjust_type`, `period` |
| 7                   | 301603              | No quotes                      | Security no quote                                                              |
| 7                   | 301604              | No access                      | No access to security quote                                                    |
| 7                   | 301607              | Too many candlesticks requeted | Reduce the amount of candlestick in each request                               |
