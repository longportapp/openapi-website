---
slug: replace
title: Replace Order
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

This API is used to replace order, modify quantity or price.

<SDKLinks module="trade" klass="TradeContext" method="replace_order" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>PUT</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name             | Type   | Required | Description                                                                                    |
| ---------------- | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| order_id         | string | YES      | Order ID                                                                                       |
| quantity         | string | YES      | Replaced quantity, example: `100`                                                              |
| price            | string | NO       | Replaced price, example: `388.5`<br/><br/> `LO` / `ELO` / `ALO` / `ODD` / `LIT` Order Required |
| trigger_price    | string | NO       | Trigger price, example: `388.5`<br/><br/> `LIT` / `MIT` Order Required                         |
| limit_offset     | string | NO       | Limit offset amount<br/><br/> `TSLPAMT` / `TSLPPCT` Order Required                             |
| trailing_amount  | string | NO       | Trailing amount<br/><br/> `TSLPAMT` Order Required                                             |
| trailing_percent | string | NO       | Trailing percent<br/><br/> `TSLPPCT` Order Required                                            |
| remark           | string | NO       | Remark (Maximum 64 characters)                                                                 |

### Request Example

```python
from decimal import Decimal
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

ctx.replace_order(
    order_id = "709043056541253632",
    quantity = Decimal(100),
    price = Decimal(50),
)
```

## Response

### Response Headers

- Content-Type: application/json

### Response Example

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

### Response Status

| Status | Description                                                   | Schema |
| ------ | ------------------------------------------------------------- | ------ |
| 200    | The submission was successful and the order was commissioned. | None   |
| 400    | The replace was rejected with an incorrect request parameter. | None   |

<aside className="success">
</aside>
