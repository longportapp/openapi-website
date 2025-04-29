---
title: Current Market Temperature
slug: market_temperature
sidebar_position: 21
---

Get Current Market Temperature

<SDKLinks module="quote" klass="QuoteContext" method="market_temperature" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/get_market_temperature</td></tr>
</tbody>
</table>

### Parameters

| Name   | Type   | Required | Description                               |
| ------ | ------ | -------- | ----------------------------------------- |
| market | string | YES      | Market, currently supports US, HK, SG, CN |

### Request Example

```python
from longport.openapi import QuoteContext, Config, Market

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.market_temperature(Market.US)
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
    "temperature": 50,
    "description": "Temperature is moderate, maintaining stability",
    "valuation": 23,
    "sentiment": 78,
    "updated_at": 1744616612
  }
}
```

#### Response Status

| Status | Description     | Schema                                                     |
| ------ | --------------- | ---------------------------------------------------------- |
| 200    | Success         | [market_temperature_response](#get_market_temperature_rsp) |
| 400    | Parameter Error | None                                                       |

<aside className="success">
</aside>

## Schemas

### market_temperature_response

<a id="get_market_temperature_rsp"></a>

| Name        | Type    | Required | Description             |
| ----------- | ------- | -------- | ----------------------- |
| temperature | integer | true     | Temperature value       |
| description | string  | true     | Temperature description |
| valuation   | integer | true     | Market valuation        |
| sentiment   | integer | true     | Market sentiment        |
| updated_at  | integer | true     | Update time             |

## Error Codes

| Business Error Code | Description           | Troubleshooting                           |
| ------------------- | --------------------- | ----------------------------------------- |
| 2601500             | Server Internal Error | Please retry or contact technical support |
