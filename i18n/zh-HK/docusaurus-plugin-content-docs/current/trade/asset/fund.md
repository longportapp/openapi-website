---
slug: fund
title: 獲取基金持倉
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

該接口用於獲取包括賬戶、基金代碼、持有份額、成本淨值、當前淨值、幣種在內的基金持倉信息。

<SDKLinks module="trade" klass="TradeContext" method="fund_positions" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/asset/fund </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name   | Type     | Required | Description                                                                                                                                           |
| ------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | NO       | 基金代碼，使用 `ISIN` 格式，例如：`HK0000676327` <a href="https://en.wikipedia.org/wiki/International_Securities_Identification_Number">ISIN 解釋</a> |

### Request Example

```python
# 獲取基金持倉
# https://open.longportapp.com/docs/trade/asset/fund
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)
resp = ctx.fund_positions()
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
            "symbol_name": "高騰亞洲收益基金",
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

| Status | Description | Schema                      |
| ------ | ----------- | --------------------------- |
| 200    | 返回成功    | [fund_rsp](#schemafund_rsp) |
| 400    | 內部錯誤    | None                        |

<aside className="success">
</aside>

## Schemas

### fund_rsp

<a id="schemafund_rsp"></a>
<a id="schemafund_rsp"></a>

| Name                       | Type     | Required | Description    |
| -------------------------- | -------- | -------- | -------------- |
| list                       | object[] | false    | 股票持倉信息   |
| ∟ account_channel          | string   | true     | 賬戶類型       |
| ∟ fund_info                | object[] | false    | 基金詳情       |
| ∟∟ symbol                  | string   | true     | 基金 ISIN 代碼 |
| ∟∟ current_net_asset_value | string   | true     | 當前淨值       |
| ∟∟ net_asset_value_day     | string   | true     | 當前淨值時間   |
| ∟∟ symbol_name             | string   | true     | 基金名稱       |
| ∟∟ currency                | string   | true     | 幣種           |
| ∟∟ cost_net_asset_value    | string   | true     | 成本淨值       |
