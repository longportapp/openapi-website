---
slug: estimate_available_buy_limit
title: 預估最大購買數量 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

該接口用於港美股，窩輪，期權的預估最大購買數量。

<SDKLinks module="trade" klass="TradeContext" method="estimate_max_purchase_quantity" />

## 

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/estimate/buy_limit 
</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name | Type | Required | Description |
|---|---|---|---|
| symbol | string | YES | 股票代碼，使用 `ticker.region` 格式，例如：`AAPL.US` |
| order_type | string | YES | [訂單類型](../trade-definition#ordertype) |
| price | string | NO | 預估下單價格，例如：`388.5` |
| side | string | YES | 買賣方向<br/><br/> **可選值:**<br/> `Buy` - 買入<br/> `Sell` - 賣出 賣出只支持美股賣空查詢 |
| currency | string | NO | 結算貨幣 |
| order_id | string | NO | 訂單 ID，獲取改單預估最大購買數量時必填 |

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

| Status | Description | Schema |
|---|---|---|
| 200 | 獲取預估最大購買數量 | [estimate_available_buy_limit_rsp](#schemaestimate_available_buy_limit_rsp) |
| 400 | 查詢失敗，請求參數錯誤。 | None |

<aside className="success">
</aside>

## Schemas

### estimate_available_buy_limit_rsp

<a id="schemaestimate_available_buy_limit_rsp"></a>
<a id="schemaestimate_available_buy_limit_rsp"></a>

預估最大購買數量

|Name|Type|Required|Description|
|---|---|---|---|
|cash_max_qty|string|true|現金可買數量，默認為空字符串|
|margin_max_qty|string|true|融資可買數量，默認為空字符串|

