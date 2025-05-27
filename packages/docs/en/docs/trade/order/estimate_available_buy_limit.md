---
slug: estimate_available_buy_limit
title: Estimate Maximum Purchase Quantity
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

This API is used for estimating the maximum purchase quantity for Hong Kong and US stocks, warrants, and options.

<SDKLinks module="trade" klass="TradeContext" method="estimate_max_purchase_quantity" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/estimate/buy_limit </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name       | Type   | Required | Description                                                                                                             |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| symbol     | string | YES      | Stock code, using ticker.region format, for example: `AAPL.US`                                                          |
| order_type | string | YES      | [Order Type](../trade-definition#ordertype)                                                                             |
| price      | string | NO       | Estimated order price, for example: `388.5`                                                                             |
| side       | string | YES      | Order side<br/><br/> **Enum Value**<br/> `Buy` - Buy<br/> `Sell` - Sell (Short selling is only supported for US stocks) |
| currency   | string | NO       | Settlement currency                                                                                                     |
| order_id   | string | NO       | Order ID, required when estimating the maximum purchase quantity for a modified order                                   |

### Request Example

```python
from longport.openapi import TradeContext, Config, OrderStatus, OrderType, OrderSide

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.estimate_max_purchase_quantity(
    symbol = "700.HK",
    order_type = OrderType.LO,
    side = OrderSide.Buy,
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
  "message": "success",
  "data": {
    "cash_max_qty": "100",
    "margin_max_qty": "100"
  }
}
```

### Response Status

| Status | Description                                              | Schema                                                                      |
| ------ | -------------------------------------------------------- | --------------------------------------------------------------------------- |
| 200    | Estimate Maximum Purchase Quantity Success               | [estimate_available_buy_limit_rsp](#schemaestimate_available_buy_limit_rsp) |
| 400    | The query failed with an error in the request parameter. | None                                                                        |

<aside className="success">
</aside>

## Schemas

### estimate_available_buy_limit_rsp

<a id="schemaestimate_available_buy_limit_rsp"></a>
<a id="schemaestimate_available_buy_limit_rsp"></a>

Estimated Maximum Purchase Quantity

| Name           | Type   | Required | Description                                               |
| -------------- | ------ | -------- | --------------------------------------------------------- |
| cash_max_qty   | string | true     | Cash available quantity, default value is empty string.   |
| margin_max_qty | string | true     | Margin available quantity, default value is empty string. |
