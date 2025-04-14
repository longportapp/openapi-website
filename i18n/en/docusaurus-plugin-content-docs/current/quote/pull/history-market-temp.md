---
title: Get Historical Market Temperature
slug: history_market_temperature 
sidebar_position: 22
---

This interface is used to get historical market temperature.

<SDKLinks module="quote" klass="QuoteContext" method="history_market_temperature" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/history_market_temperature</td></tr>
</tbody>
</table>

### Parameters

| Name     | Type   | Required | Description                      |
| -------- | ------ | -------- | -------------------------------- |
| market   | string | YES      | Market, currently supports US, HK, SG, CN |
| start_date |string|YES|Start date, minimum to 2016, e.g.: 20240101|
| end_date |string|YES|End date, e.g.: 20250101|

### Request Example

```python
from longport.openapi import QuoteContext, Config, Market

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.history_market_temperature(Market.US, "20240101", "20250101")
print(resp)
```

## Response

### Response Headers

- Content-Type: application/json

### Response Example

```json
{
  "code": 0,
  "data": {
  "temperatures": [
      {
          "timestamp": 1580486400,
          "value": 36,
          "type": "month"
      }, {
          "timestamp": 1582992000,
          "value": 46,
          "type": "month"
      }
    ],
    "valuations": [
      {
          "timestamp": 1580486400,
          "value": 36,
          "type": "month"
      }, {
          "timestamp": 1582992000,
          "value": 46,
          "type": "month"
      }
    ],
    "sentiments": [
      {
          "timestamp": 1580486400,
          "value": 36,
          "type": "month"
      }, {
          "timestamp": 1582992000,
          "value": 46,
          "type": "month"
      }
    ],     
  }
}
```

#### Response Status

| Status | Description | Schema                                      |
| ------ | ----------- | ------------------------------------------- |
| 200    | Success     | [hist_market_temp_response](#hist_market_temp_rsp) |
| 400    | Parameter Error | None                                        |

<aside className="success">
</aside>

## Schemas

### hist_market_temp_response

<a id="hist_market_temp_rsp"></a>

| Name         | Type     | Required| Description                                                |
| ------------ | -------- | --------| ---------------------------------------------------------- |
| temperatures    | object[]   | true  | Historical temperature list                                |
| ∟timestamp  | integer    | true   | Timestamp                                                 |
| ∟value      | integer    | true   | Value                                                     |
| ∟type       | string   | true | Data granularity <br />day: daily; week: weekly; month: monthly |
| valuations      | object[]   | true  | Historical valuation list                                 |
| ∟timestamp  | integer    | true   | Timestamp                                                 |
| ∟value      | integer    | true   | Value                                                     |
| ∟type       | string   | true | Data granularity <br />day: daily; week: weekly; month: monthly |
| sentiments      | object[]  | true   | Market sentiment list                                     |
| ∟timestamp  | integer   | true    | Timestamp                                                 |
| ∟value      | integer    | true   | Value                                                     |
| ∟type       | string   | true | Data granularity <br />day: daily; week: weekly; month: monthly |

## Error Codes

| Business Error Code | Description           | Troubleshooting Suggestions                 |
| ---------- | -------------- | ------------------------ |
| 2601500     | Server Internal Error | Please retry or contact technical support |
