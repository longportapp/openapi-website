---
slug: fund
title: Get Fund Positions
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

The API is used to obtain fund position information including account, fund code, holding share, cost net worth,
current net worth, and currency.

<SDKLinks module="trade" klass="TradeContext" method="fund_positions" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/asset/fund </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name   | Type     | Required | Description                                                                                                                                             |
| ------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | NO       | Fund code, in `ISIN` format, E.g:`HK0000676327` <a href="https://en.wikipedia.org/wiki/International_Securities_Identification_Number">ISIN explain</a> |

### Request Example

```python
# Get Fund Position
# https://open.longportapp.com/docs/trade/asset/fund
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)
resp = ctx.fund_positions()
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
        "account_channel": "lb",
        "fund_info": [
          {
            "symbol": "HK0000447943",
            "symbol_name": "GAOTENG EMERGING MARKETS PLUS  LONG/SHORT FIXED INCOME ALPHA FUND",
            "currency": "USD",
            "holding_units": "5.000",
            "current_net_asset_value": "0",
            "cost_net_asset_value": "0.00",
            "net_asset_value_day": "1649865600"
          }
        ]
      }
    ]
  }
}
```

### Response Status

| Status | Description    | Schema                      |
| ------ | -------------- | --------------------------- |
| 200    | Success        | [fund_rsp](#schemafund_rsp) |
| 400    | Internal Error | None                        |

<aside className="success">
</aside>

## Schemas

### fund_rsp

<a id="schemafund_rsp"></a>
<a id="schemafund_rsp"></a>

| Name                       | Type     | Required | Description               |
| -------------------------- | -------- | -------- | ------------------------- |
| list                       | object[] | false    | stock holding information |
| ∟ account_channel          | string   | true     | account type              |
| ∟ fund_info                | object[] | false    | Fund Details              |
| ∟∟ symbol                  | string   | true     | Fund ISIN code            |
| ∟∟ current_net_asset_value | string   | true     | current Equity            |
| ∟∟ net_asset_value_day     | string   | true     | current Equity time       |
| ∟∟ symbol_name             | string   | true     | Fund name                 |
| ∟∟ currency                | string   | true     | Currency                  |
| ∟∟ cost_net_asset_value    | string   | true     | Net Cost                  |
