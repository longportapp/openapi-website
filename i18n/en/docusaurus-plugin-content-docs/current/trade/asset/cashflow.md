---
slug: cashflow
title: Get Cash Flow 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

The API is used to obtain capital inflow/outflow direction, capital type, capital amount, occurrence time,
associated stock code and capital flow description information.

<SDKLinks module="trade" klass="TradeContext" method="cash_flow" />

## 

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/asset/cashflow 
</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name | Type | Required | Description |
|---|---|---|---|
| start_time | string | YES | start time timestamp, in `seconds`, E.g:`1650037563` |
| end_time | string | YES | end time timestamp, in `seconds`, E.g:`1650747581` |
| business_type | string | NO | Balance type<br/><br/> <b>Option:</b> <br/>`1` - cash <br/>`2` - stock<br/> `3` - fund |
| symbol | string | NO | Target code, E.g:`AAPL.US` |
| page | string | NO | start page <br/><br/><b>Default value:</b> `1`  <br/><b>Data validation rules:</b><br/> <b>Ranges:</b> `>=1` |
| size | string | NO | page size <br/><br/><b>Default value:</b> `50` <br/><b>Data validation rules:</b> `1~10000` |

### Request Example

```python
# Get Cash Flow
# https://open.longportapp.com/docs/trade/asset/cashflow
from datetime import datetime
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)
resp = ctx.cash_flow(
    start_at = datetime(2022, 5, 9),
    end_at = datetime(2022, 5, 12),
)
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
    "list": [
      {
        "transaction_flow_name": "BuyContract-Stocks",
        "direction": 1,
        "balance": "-248.60",
        "currency": "USD",
        "business_time": "1621507957",
        "symbol": "AAPL.US",
        "description": "AAPL"
      },
      {
        "transaction_flow_name": "BuyContract-Stocks",
        "direction": 1,
        "balance": "-125.16",
        "currency": "USD",
        "business_time": "1621504824",
        "symbol": "AAPL.US",
        "description": "AAPL"
      }
    ]
  }
}
```

### Response Status

| Status | Description | Schema |
|---|---|---|
| 200 | Success | [cashflow_rsp](#schemacashflow_rsp) |
| 400 | Internal Error | None |

<aside className="success">
</aside>

## Schemas

### cashflow_rsp

<a id="schemacashflow_rsp"></a>
<a id="schemacashflow_rsp"></a>

|Name|Type|Required|Description|
|---|---|---|---|
|list|object[]|false|Cash flow info|
|∟ transaction_flow_name|string|true|Cash flow name|
|∟ direction|string|true|outflow direction <br/><br/><b>Option:</b> <br/>`1` - outflow <br/>  `2` - inflow|
|∟ business_type|string|true|Funding Category <br/><br/><b>Option:</b> <br/>`1` - cash <br/> `2` - stock <br/> `3` - fund|
|∟ balance|string|true|Cash amount|
|∟ currency|string|true|Cash Currency|
|∟ business_time|string|true|business time|
|∟ symbol|string|false|associated Stock code information|
|∟ description|string|false|Cash flow description|

