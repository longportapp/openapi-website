---
slug: submit
title: Submit Order
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

This API is used to submit order for HK and US stocks, warrant and option.

<SDKLinks module="trade" klass="TradeContext" method="submit_order" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>POST</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name               | Type   | Required | Description                                                                                                                                                                    |
| ------------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol             | string | YES      | Stock symbol, use `ticker.region` format, example: `AAPL.US`                                                                                                                   |
| order_type         | string | YES      | [Order Type](../trade-definition#ordertype)                                                                                                                                    |
| submitted_price    | string | NO       | Submitted price, example: `388.5`<br/><br/> `LO` / `ELO` / `ALO` / `ODD` / `LIT` Order Required                                                                                |
| submitted_quantity | string | YES      | Submitted quantity, example: `100`                                                                                                                                             |
| trigger_price      | string | NO       | Trigger price, example: `388.5`<br/><br/> `LIT` / `MIT` Order Required                                                                                                         |
| limit_offset       | string | NO       | Limit offset amount<br/><br/> `TSLPAMT` / `TSLPPCT` Order Required when`limit_depth_level` is set to 0                                                                                              |
| trailing_amount    | string | NO       | Trailing amount<br/><br/> `TSLPAMT` Order Required                                                                                                                             |
| trailing_percent   | string | NO       | Trailing percent<br/><br/> `TSLPPCT` Order Required                                                                                                                            |
| expire_date        | string | NO       | Long term order expire date, format `YYYY-MM-DD`, example: `2022-12-05`<br/><br/> Required when `time_in_force` is `GTD`                                                       |
| side               | string | YES      | Order Side<br/><br/> **Enum Value:**<br/> `Buy`<br/> `Sell`                                                                                                                    |
| outside_rth        | string | NO       | Enable or disable outside regular trading hours<br/><br/> **Enum Value:**<br/> `RTH_ONLY` - regular trading hour only<br/> `ANY_TIME` - any time<br/> `OVERNIGHT` - Overnight  |
| time_in_force      | string | YES      | Time in force Type<br/><br/> **Enum Value:**<br/> `Day` - Day Order<br/> `GTC` - Good Til Canceled Order<br/> `GTD` - Good Til Date Order                                      |
| remark             | string | NO       | remark (Maximum 255 characters)                                                                                                                                                 |
| limit_depth_level  | int32  | NO       | Specifies the bid/ask depth level. Value range is -5 ~ 0 ~ 5. <br/>Negative numbers indicate bid levels (e.g., -1 means best bid level 1),<br/>positive numbers indicate ask levels (e.g., 1 means best ask level 1).<br/>When set to 0, the `limit_offset` parameter takes effect.<br/>Valid for `TSLPAMT` / `TSLPPCT` orders. |
| monitor_price      | string |  NO      | Monitoring price. <br/>Monitoring starts only after reaching this price, updating the reference price.<br/>Valid for `TSLPAMT` / `TSLPPCT` orders. |
| trigger_count      | int32  |  NO      | Number of triggers. Value range is 0 ~ 3.<br/>Specifies that within 1 minute, the order will only be placed after being triggered multiple times.<br/>Valid for `LIT` / `MIT` / `TSLPAMT` / `TSLPPCT` orders. |

### Request Example

```python
from decimal import Decimal
from longport.openapi import TradeContext, Config, OrderType, OrderSide, TimeInForceType

# Load configuration from environment variables
config = Config.from_env()

# Create a context for trade APIs
ctx = TradeContext(config)

# Submit order
resp = ctx.submit_order("700.HK", OrderType.LO, OrderSide.Buy, Decimal(500), TimeInForceType.Day, submitted_price=Decimal(50), remark="Hello from Python SDK")
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
    "order_id": 683615454870679600
  }
}
```

### Response Status

| Status | Description                                                   | Schema |
| ------ | ------------------------------------------------------------- | ------ |
| 200    | The submission was successful and the order was commissioned. | None   |
| 400    | The submit was rejected with an incorrect request parameter.  | None   |

<aside className="success">
</aside>
