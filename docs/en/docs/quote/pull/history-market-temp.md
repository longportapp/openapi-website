---
title: Historical Market Temperature
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

| Name       | Type   | Required | Description                                 |
|------------|--------|----------|---------------------------------------------|
| market     | string | YES      | Market, currently supports US, HK, SG, CN   |
| start_date | string | YES      | Start date, minimum to 2016, e.g.: 20240101 |
| end_date   | string | YES      | End date, e.g.: 20250101                    |

### Request Example

```python
import datetime
from longport.openapi import QuoteContext, Config, Market

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.history_market_temperature(Market.US, datetime.date(2024, 1, 1), datetime.date(2025, 1, 1))
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
    "type": "month"
    "list": [
      {
        "timestamp": 1580486400,
        "temperature": 36,
        "valuation": 12,
        "sentiment": 46
      },
      {
        "timestamp": 1582992000,
        "temperature": 36,
        "valuation": 12,
        "sentiment": 46
      }
    ]
  }
}
```

#### Response Status

| Status | Description     | Schema                                                                   |
|--------|-----------------|--------------------------------------------------------------------------|
| 200    | Success         | [HistoryMarketTemperatureResponse](#history_market_temperature_response) |
| 400    | Parameter Error | None                                                                     |

<aside className="success">
</aside>

## Schemas

### HistoryMarketTemperatureResponse

<a id="history_market_temperature_response"></a>

| Name         | Type     | Required | Description                                                     |
|--------------|----------|----------|-----------------------------------------------------------------|
| list         | object[] | true     | List                                                            |
| ∟timestamp   | integer  | true     | Timestamp                                                       |
| ∟temperature | integer  | true     | Temperature                                                     |
| ∟valuation   | integer  | true     | Valuation                                                       |
| ∟sentiment   | integer  | true     | Sentiment                                                       |
| type         | string   | true     | Data granularity <br />day: daily; week: weekly; month: monthly |

## Error Codes

| Business Error Code | Description           | Troubleshooting Suggestions               |
|---------------------|-----------------------|-------------------------------------------|
| 2601500             | Server Internal Error | Please retry or contact technical support |
