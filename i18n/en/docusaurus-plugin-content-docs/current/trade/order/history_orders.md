---
slug: history_orders
title: Get History Order
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

This API is used to get history order.

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

| Name     | Type     | Required | Description                                                                                                                                                                                         |
| -------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol   | string   | NO       | Stock symbol, use `ticker.region` format, example: `AAPL.US`                                                                                                                                        |
| status   | string[] | NO       | [Order status](../trade-definition#orderstatus)<br/><br/>example: `status=FilledStatus&status=NewStatus`                                                                                            |
| side     | string   | NO       | Order side<br/><br/> **Enum Value:**<br/> `Buy`<br/> `Sell`                                                                                                                                         |
| market   | string   | NO       | Market<br/><br/> **Enum Value:**<br/> `US` - United States of America Market<br/> `HK` - Hong Kong Market                                                                                           |
| start_at | string   | NO       | Start time, formatted as a timestamp (second), example: `1650410999`.<br/><br/> If the start time is null, the default is the 90 days before of the end time or 90 days before of the current time. |
| end_at   | string   | NO       | End time, formatted as a timestamp (second), example: `1650410999`. <br/><br/> If the end time is null, the default is the current time or 90 days after of the start time.                         |

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
        "stock_name": "Bank of East Asia Ltd/The",
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

| Status | Description                                              | Schema                                          |
| ------ | -------------------------------------------------------- | ----------------------------------------------- |
| 200    | Get History Orders Success                               | [history_orders_rsp](#schemahistory_orders_rsp) |
| 400    | The query failed with an error in the request parameter. | None                                            |

<aside className="success">
</aside>

## Schemas

### history_orders_rsp

<a id="schemahistory_orders_rsp"></a>
<a id="schemahistory_orders_rsp"></a>

| Name                | Type     | Required | Description                                                                                                                                                                                                                                         |
| ------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| has_more            | boolean  | true     | has more orders record.<br/><br/>The maximum number of orders per query is 1000, if the number of results exceeds 1000, then has_more will be true                                                                                                  |
| orders              | object[] | false    | Order Detail                                                                                                                                                                                                                                        |
| ∟ order_id          | string   | true     | Order ID                                                                                                                                                                                                                                            |
| ∟ status            | string   | true     | [Order Status](../trade-definition#orderstatus)                                                                                                                                                                                                     |
| ∟ stock_name        | string   | true     | Stock Name                                                                                                                                                                                                                                          |
| ∟ quantity          | string   | true     | Submitted Quantity                                                                                                                                                                                                                                  |
| ∟ executed_quantity | string   | true     | Executed Quantity.<br/><br/>when the order is not filled, value is 0                                                                                                                                                                                |
| ∟ price             | string   | true     | Submitted Price.<br/><br/>when market condition order is not triggered, value is empty string                                                                                                                                                       |
| ∟ executed_price    | string   | true     | Executed Price.<br/><br/>when the order is not filled, value is 0                                                                                                                                                                                   |
| ∟ submitted_at      | string   | true     | Submitted Time                                                                                                                                                                                                                                      |
| ∟ side              | string   | true     | Order Side<br/><br/> **Enum Value:**<br/> `Buy`<br/> `Sell`                                                                                                                                                                                         |
| ∟ symbol            | string   | true     | Stock symbol, use `ticker.region` format, example: `AAPL.US`                                                                                                                                                                                        |
| ∟ order_type        | string   | true     | [Order Type](../trade-definition#ordertype)                                                                                                                                                                                                         |
| ∟ last_done         | string   | true     | Last done.<br/><br/>when the order is not filled, value is empty string                                                                                                                                                                             |
| ∟ trigger_price     | string   | true     | `LIT` / `MIT` Order Trigger Price.<br/><br/>When the order is not `LIT` / `MIT` order, value is empty string                                                                                                                                        |
| ∟ msg               | string   | true     | Rejected message or remark, default value is empty string.                                                                                                                                                                                          |
| ∟ tag               | string   | true     | Order tag<br/><br/> **Enum Value**<br/> `Normal` - Normal Order<br/> `GTC` - Long term Order<br/> `Grey` - Grey Order                                                                                                                               |
| ∟ time_in_force     | string   | true     | Time in force Type<br/><br/> **Enum Value:**<br/> `Day` - Day Order<br/> `GTC` - Good Til Canceled Order<br/> `GTD` - Good Til Date Order                                                                                                           |
| ∟ expire_date       | string   | true     | Long term order expire date, format: `YYYY-MM-DD`, example: `2022-12-05`.<br/><br/>When not a long term order, default value is empty string                                                                                                        |
| ∟ updated_at        | string   | true     | Last updated time, formatted as a timestamp (second)                                                                                                                                                                                                |
| ∟ trigger_at        | string   | true     | Conditional order trigger time. formatted as a timestamp (second)                                                                                                                                                                                   |
| ∟ trailing_amount   | string   | true     | `TSLPAMT` order trailing amount.<br/><br/>When the order is not `TSLPAMT` order, value is empty string                                                                                                                                              |
| ∟ trailing_percent  | string   | true     | `TSLPPCT` order trailing percent.<br/><br/>When the order is not `TSLPPCT` order, value is empty string                                                                                                                                             |
| ∟ limit_offset      | string   | true     | `TSLPPCT` order limit offset amount.<br/><br/>When the order is not `TSLPPCT` order, value is empty string                                                                                                                                          |
| ∟ trigger_status    | string   | true     | Conditional Order Trigger Status<br/> When an order is not a conditional order or a conditional order is not triggered, the trigger status is NOT_USED<br/><br/> **Enum Value**<br/> `NOT_USED`<br/> `DEACTIVE`<br /> `ACTIVE`<br /> `RELEASED`     |
| ∟ currency          | string   | true     | Currency                                                                                                                                                                                                                                            |
| ∟ outside_rth       | string   | true     | Enable or disable outside regular trading hours<br/> Default is `UnknownOutsideRth` when the order is not a US stock<br/><br/> **Enum Value:**<br/> `RTH_ONLY` - Regular trading hour only<br/> `ANY_TIME` - Any time<br/> `OVERNIGHT` - Overnight" |
| ∟ remark            | string   | true     | Remark                                                                                                                                                                                                                                              |
