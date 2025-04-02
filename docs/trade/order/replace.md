---
slug: replace
title: 修改订单
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

该接口用于修改订单的价格，数量。

<SDKLinks module="trade" klass="TradeContext" method="replace_order" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>PUT</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name             | Type   | Required | Description                                                                     |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------------- |
| order_id         | string | YES      | 订单 ID                                                                         |
| quantity         | string | YES      | 改单数量，例如：`200`                                                           |
| price            | string | NO       | 改单价格，例如：`388.5`<br/><br/> `LO` / `ELO` / `ALO` / `ODD` / `LIT` 订单必填 |
| trigger_price    | string | NO       | 触发价格，例如：`388.5`<br/><br/> `LIT` / `MIT` 订单必填                        |
| limit_offset     | string | NO       | 指定价差<br/><br/> `TSLPAMT` / `TSLPPCT` 订单必填                               |
| trailing_amount  | string | NO       | 跟踪金额<br/><br/> `TSLPAMT` 订单必填                                           |
| trailing_percent | string | NO       | 跟踪涨跌幅<br/><br/> `TSLPPCT` 订单必填                                         |
| remark           | string | NO       | 备注 (最大 64 字符)                                                             |

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

| Status | Description                | Schema |
| ------ | -------------------------- | ------ |
| 200    | 提交成功，订单已委托。     | None   |
| 400    | 下单被拒绝，请求参数错误。 | None   |

<aside className="success">
</aside>
