---
slug: account
title: Get Account Balance 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

The API is used to obtain the available, desirable, frozen, to-be-settled, and in-transit
funds (fund purchase and redemption) information for each currency of the user.

<SDKLinks module="trade" klass="TradeContext" method="account_balance" />

## 

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/asset/account 
</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name | Type | Required | Description |
|---|---|---|---|
| currency | string | NO | Currency (HKD, USD, CNH) |

### Request Example

```python
# Get Account Balance
# https://open.longportapp.com/docs/trade/asset/account
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)
resp = ctx.account_balance()
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
        "total_cash": "1759070010.72",
        "max_finance_amount": "977582000",
        "remaining_finance_amount": "0",
        "risk_level": "1",
        "margin_call": "2598051051.50",
        "currency": "HKD",
        "net_assets": "24145.90",
        "init_margin": "1540.09",
        "maintenance_margin": "1540.09",
        "buy_power": "1759070.12",
        "cash_infos": [
          {
            "withdraw_cash": "97592.30",
            "available_cash": "195902464.37",
            "frozen_cash": "11579339.13",
            "settling_cash": "207288537.81",
            "currency": "HKD"
          },
          {
            "withdraw_cash": "199893416.74",
            "available_cash": "199893416.74",
            "frozen_cash": "28723.76",
            "settling_cash": "-276806.51",
            "currency": "USD"
          }
        ]
      }
    ]
  }
}
```

### Response Status

| Status | Description | Schema |
|---|---|---|
| 200 | Success | [accountcash_rsp](#schemaaccountcash_rsp) |
| 400 | Internal Error | None |

<aside className="success">
</aside>

## Schemas

### accountcash_rsp

<a id="schemaaccountcash_rsp"></a>
<a id="schemaaccountcash_rsp"></a>

|Name|Type|Required|Description|
|---|---|---|---|
|list|object[]|false|Account Balance|
|∟ total_cash|string|true|Total Cash|
|∟ max_finance_amount|string|true|Maximum Financing Amount|
|∟ remaining_finance_amount|string|true|Remaining Financing Amount|
|∟ risk_level|string|true|Risk control level  <br/> <br/> <b>Option:</b><br/> `0` - safe <br/> `1` - medium risk<br/> `2` - early warning<br/> `3` - danger|
|∟ margin_call|string|true|Margin Call|
|∟ net_assets|string|true|net asset|
|∟ init_margin|string|true|initial margin|
|∟ maintenance_margin|string|true|maintenance margin|
|∟ currency|string|true|Currency|
|∟ buy_power|string|true|Buy Power|
|∟ cash_infos|object[]|false|Cash Details|
|∟∟ withdraw_cash|string|true|Withdraw Cash|
|∟∟ available_cash|string|true|Available Cash|
|∟∟ frozen_cash|string|true|Frozen Cash|
|∟∟ settling_cash|string|true|Cash to be Settled|
|∟∟ currency|string|true|Currency|

