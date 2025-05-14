---
slug: account
title: 獲取賬戶資金
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

該接口用於獲取用戶每個幣種可用、可取、凍結、待結算金額、在途資金 (基金申購贖回) 信息。

<SDKLinks module="trade" klass="TradeContext" method="account_balance" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/asset/account </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name     | Type   | Required | Description           |
| -------- | ------ | -------- | --------------------- |
| currency | string | NO       | 幣種（HKD、USD、CNH） |

### Request Example

```python
# 獲取賬戶資金
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

| Status | Description | Schema                                    |
| ------ | ----------- | ----------------------------------------- |
| 200    | 返回成功    | [accountcash_rsp](#schemaaccountcash_rsp) |
| 400    | 內部錯誤    | None                                      |

<aside className="success">
</aside>

## Schemas

### accountcash_rsp

<a id="schemaaccountcash_rsp"></a>
<a id="schemaaccountcash_rsp"></a>

| Name                       | Type     | Required | Description                                                                                            |
| -------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------ |
| list                       | object[] | false    | 賬戶資金信息                                                                                           |
| ∟ total_cash               | string   | true     | 現金總額                                                                                               |
| ∟ max_finance_amount       | string   | true     | 最大融資金額                                                                                           |
| ∟ remaining_finance_amount | string   | true     | 剩餘融資金額                                                                                           |
| ∟ risk_level               | string   | true     | 風控等級 <br/> <br/> <b>可選值:</b><br/> `0` - 安全 <br/> `1` - 中風險<br/> `2` - 預警<br/> `3` - 危險 |
| ∟ margin_call              | string   | true     | 追繳保證金                                                                                             |
| ∟ net_assets               | string   | true     | 淨資產                                                                                                 |
| ∟ init_margin              | string   | true     | 初始保證金                                                                                             |
| ∟ maintenance_margin       | string   | true     | 維持保證金                                                                                             |
| ∟ currency                 | string   | true     | 幣種                                                                                                   |
| ∟ buy_power                | string   | true     | 購買力                                                                                                 |
| ∟ cash_infos               | object[] | false    | 現金詳情                                                                                               |
| ∟∟ withdraw_cash           | string   | true     | 可提現金                                                                                               |
| ∟∟ available_cash          | string   | true     | 可用現金                                                                                               |
| ∟∟ frozen_cash             | string   | true     | 凍結現金                                                                                               |
| ∟∟ settling_cash           | string   | true     | 待結算現金                                                                                             |
| ∟∟ currency                | string   | true     | 幣種                                                                                                   |
