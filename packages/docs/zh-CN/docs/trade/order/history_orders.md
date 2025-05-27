---
slug: history_orders
title: 获取历史订单
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

该接口用于获取历史订单。

<SDKLinks module="trade" klass="TradeContext" method="history_orders" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order/history </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name     | Type     | Required | Description                                                                                                   |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| symbol   | string   | NO       | 股票代码，使用 `ticker.region` 格式，例如：`AAPL.US`                                                          |
| status   | string[] | NO       | [订单状态](../trade-definition#orderstatus)<br/><br/>例如：`status=FilledStatus&status=NewStatus`             |
| side     | string   | NO       | 买卖方向<br/><br/> **可选值：**<br/> `Buy` - 买入<br/> `Sell` - 卖出                                          |
| market   | string   | NO       | 市场<br/><br/> **可选值：**<br/> `US` - 美股<br/> `HK` - 港股                                                 |
| start_at | string   | NO       | 开始时间，格式为时间戳 (秒)，例如：`1650410999`。<br/><br/>开始时间为空时，默认为结束时间或当前时间前九十天。 |
| end_at   | string   | NO       | 结束时间，格式为时间戳 (秒)，例如：`1650410999`。<br/><br/>结束时间为空时，默认为开始时间后九十天或当前时间。 |

### Request Example

```python
from datetime import datetime
from longport.openapi import TradeContext, Config, OrderStatus, OrderSide, Market

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.history_orders(
    symbol = "700.HK",
    status = [OrderStatus.Filled, OrderStatus.New],
    side = OrderSide.Buy,
    market = Market.HK,
    start_at = datetime(2022, 5, 9),
    end_at = datetime(2022, 5, 12),
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
    "orders": [
      {
        "currency": "HKD",
        "executed_price": "0.000",
        "executed_quantity": "0",
        "expire_date": "",
        "last_done": "",
        "limit_offset": "",
        "msg": "",
        "order_id": "706388312699592704",
        "order_type": "ELO",
        "outside_rth": "UnknownOutsideRth",
        "price": "11.900",
        "quantity": "200",
        "side": "Buy",
        "status": "RejectedStatus",
        "stock_name": "东亚银行",
        "submitted_at": "1651644897",
        "symbol": "23.HK",
        "tag": "Normal",
        "time_in_force": "Day",
        "trailing_amount": "",
        "trailing_percent": "",
        "trigger_at": "0",
        "trigger_price": "",
        "trigger_status": "NOT_USED",
        "updated_at": "1651644898",
        "remark": ""
      }
    ]
  }
}
```

### Response Status

| Status | Description              | Schema                                          |
| ------ | ------------------------ | ----------------------------------------------- |
| 200    | 历史订单查询成功         | [history_orders_rsp](#schemahistory_orders_rsp) |
| 400    | 查询失败，请求参数错误。 | None                                            |

<aside className="success">
</aside>

## Schemas

### history_orders_rsp

<a id="schemahistory_orders_rsp"></a>
<a id="schemahistory_orders_rsp"></a>

| Name                | Type     | Required | Description                                                                                                                                                                         |
| ------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| has_more            | boolean  | true     | 是否还有更多数据。<br/><br/>每次查询最大订单数量为 1000，如果查询结果数量超过 1000，那么 has_more 就会为 true                                                                       |
| orders              | object[] | false    | 订单信息                                                                                                                                                                            |
| ∟ order_id          | string   | true     | 订单 ID                                                                                                                                                                             |
| ∟ status            | string   | true     | [订单状态](../trade-definition#orderstatus)                                                                                                                                         |
| ∟ stock_name        | string   | true     | 股票名称                                                                                                                                                                            |
| ∟ quantity          | string   | true     | 下单数量                                                                                                                                                                            |
| ∟ executed_quantity | string   | true     | 成交数量。<br/><br/>当订单未成交时为 0                                                                                                                                              |
| ∟ price             | string   | true     | 下单价格。<br/><br/>当市价条件单未触发时为空字符串                                                                                                                                  |
| ∟ executed_price    | string   | true     | 成交价。<br/><br/>当订单未成交时为 0                                                                                                                                                |
| ∟ submitted_at      | string   | true     | 下单时间                                                                                                                                                                            |
| ∟ side              | string   | true     | 买卖方向<br/><br/> **可选值：**<br/> `Buy` - 买入<br/> `Sell` - 卖出                                                                                                                |
| ∟ symbol            | string   | true     | 股票代码，使用 `ticker.region` 格式，例如：`AAPL.US`                                                                                                                                |
| ∟ order_type        | string   | true     | [订单类型](../trade-definition#ordertype)                                                                                                                                           |
| ∟ last_done         | string   | true     | 最近成交价格。<br/><br/>当订单未成交时为空字符串                                                                                                                                    |
| ∟ trigger_price     | string   | true     | `LIT` / `MIT` 订单触发价格。<br/><br/>当订单不是 `LIT` / `MIT` 订单为空字符串                                                                                                       |
| ∟ msg               | string   | true     | 拒绝信息或备注，默认为空字符串。                                                                                                                                                    |
| ∟ tag               | string   | true     | 订单标记<br/><br/> **可选值：**<br/> `Normal` - 普通订单<br/> `GTC` - 长期单<br/> `Grey` - 暗盘单                                                                                   |
| ∟ time_in_force     | string   | true     | 订单有效期类型<br/><br/> **可选值：**<br/> `Day` - 当日有效<br/> `GTC` - 撤单前有效<br/> `GTD` - 到期前有效                                                                         |
| ∟ expire_date       | string   | true     | 长期单过期时间，格式为 `YYYY-MM-DD`, 例如：`2022-12-05。<br/><br/>不是长期单时，默认为空字符串。`                                                                                   |
| ∟ updated_at        | string   | true     | 最近更新时间，格式为时间戳 (秒)，默认为 0。                                                                                                                                         |
| ∟ trigger_at        | string   | true     | 条件单触发时间，格式为时间戳 (秒)，默认为 0。                                                                                                                                       |
| ∟ trailing_amount   | string   | true     | `TSLPAMT` 订单跟踪金额。<br/><br/>当订单不是 `TSLPAMT` 订单时为空字符串。                                                                                                           |
| ∟ trailing_percent  | string   | true     | `TSLPPCT` 订单跟踪涨跌幅。<br/><br/>当订单不是 `TSLPPCT` 订单时为空字符串。                                                                                                         |
| ∟ limit_offset      | string   | true     | `TSLPAMT` / `TSLPPCT` 订单指定价差。<br/><br/>当订单不是 `TSLPAMT` / `TSLPPCT` 订单时为空字符串。                                                                                   |
| ∟ trigger_status    | string   | true     | 条件单触发状态<br/> 当订单不是条件单或条件单未触发时，触发状态为 NOT_USED<br/><br/> **可选值：**<br/> `NOT_USED` - 未激活 `DEACTIVE` - 已失效 `ACTIVE` - 已激活 `RELEASED` - 已触发 |
| ∟ currency          | string   | true     | 结算货币                                                                                                                                                                            |
| ∟ outside_rth       | string   | true     | 是否允许盘前盘后<br/> 当订单不是美股时，默认为 UnknownOutsideRth<br/><br/> **可选值：**<br/> `RTH_ONLY` - 不允许盘前盘后<br/> `ANY_TIME` - 允许盘前盘后<br/> `OVERNIGHT` - 夜盘"    |
| ∟ remark            | string   | true     | 备注                                                                                                                                                                                |
