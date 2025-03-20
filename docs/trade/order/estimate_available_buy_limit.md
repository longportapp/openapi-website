---
slug: estimate_available_buy_limit
title: 预估最大购买数量 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

该接口用于港美股，窝轮，期权的预估最大购买数量。

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
| symbol | string | YES | 股票代码，使用 `ticker.region` 格式，例如：`AAPL.US` |
| order_type | string | YES | [订单类型](../trade-definition#ordertype) |
| price | string | NO | 预估下单价格，例如：`388.5` |
| side | string | YES | 买卖方向<br/><br/> **可选值：**<br/> `Buy` - 买入<br/> `Sell` - 卖出 卖出只支持美股卖空查询 |
| currency | string | NO | 结算货币 |
| order_id | string | NO | 订单 ID，获取改单预估最大购买数量时必填 |

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
| 200 | 获取预估最大购买数量 | [estimate_available_buy_limit_rsp](#schemaestimate_available_buy_limit_rsp) |
| 400 | 查询失败，请求参数错误。 | None |

<aside className="success">
</aside>

## Schemas

### estimate_available_buy_limit_rsp

<a id="schemaestimate_available_buy_limit_rsp"></a>
<a id="schemaestimate_available_buy_limit_rsp"></a>

预估最大购买数量

|Name|Type|Required|Description|
|---|---|---|---|
|cash_max_qty|string|true|现金可买数量，默认为空字符串|
|margin_max_qty|string|true|融资可买数量，默认为空字符串|

