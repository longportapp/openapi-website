---
slug: replace
title: 修改訂單 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

該接口用於修改訂單的價格，數量。

<SDKLinks module="trade" klass="TradeContext" method="replace_order" />

## 

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>PUT</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order 
</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name | Type | Required | Description |
|---|---|---|---|
| order_id | string | YES | 訂單 ID |
| quantity | string | YES | 改單數量，例如：`200` |
| price | string | NO | 改單價格，例如：`388.5`<br/><br/> `LO` / `ELO` / `ALO` / `ODD` / `LIT` 訂單必填 |
| trigger_price | string | NO | 觸發價格，例如：`388.5`<br/><br/> `LIT` / `MIT` 訂單必填 |
| limit_offset | string | NO | 指定價差<br/><br/> `TSLPAMT` / `TSLPPCT` 訂單必填 |
| trailing_amount | string | NO | 跟蹤金額<br/><br/> `TSLPAMT` 訂單必填 |
| trailing_percent | string | NO | 跟蹤漲跌幅<br/><br/> `TSLPPCT` 訂單必填 |
| remark | string | NO | 備註 (最大 64 字符) |

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

| Status | Description | Schema |
|---|---|---|
| 200 | 提交成功，訂單已委托。 | None |
| 400 | 下單被拒絕，請求參數錯誤。 | None |

<aside className="success">
</aside>

