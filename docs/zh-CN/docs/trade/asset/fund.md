---
slug: fund
title: 获取基金持仓
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

该接口用于获取包括账户、基金代码、持有份额、成本净值、当前净值、币种在内的基金持仓信息。

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

| Name   | Type     | Required | Description                                                                                                                                           |
| ------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | NO       | 基金代码，使用 `ISIN` 格式，例如：`HK0000676327` <a href="https://en.wikipedia.org/wiki/International_Securities_Identification_Number">ISIN 解释</a> |

### Request Example

```python
# 获取基金持仓
# https://open.longbridge.com/docs/trade/asset/fund
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
            "symbol_name": "高腾亚洲收益基金",
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
| 400    | 内部错误    | None                        |

<aside className="success">
</aside>

## Schemas

### fund_rsp

<a id="schemafund_rsp"></a>
<a id="schemafund_rsp"></a>

| Name                       | Type     | Required | Description    |
| -------------------------- | -------- | -------- | -------------- |
| list                       | object[] | false    | 股票持仓信息   |
| ∟ account_channel          | string   | true     | 账户类型       |
| ∟ fund_info                | object[] | false    | 基金详情       |
| ∟∟ symbol                  | string   | true     | 基金 ISIN 代码 |
| ∟∟ current_net_asset_value | string   | true     | 当前净值       |
| ∟∟ net_asset_value_day     | string   | true     | 当前净值时间   |
| ∟∟ symbol_name             | string   | true     | 基金名称       |
| ∟∟ currency                | string   | true     | 币种           |
| ∟∟ cost_net_asset_value    | string   | true     | 成本净值       |
