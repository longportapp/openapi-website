---
slug: submit
title: Submit Order
search: true
headingLevel: 3
---

This API is used for placing orders for Hong Kong and US stocks, warrants, and options.

<SDKLinks module="trade" klass="TradeContext" method="submit_order" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>POST</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order 
</td></tr>
</tbody>
</table>

## Parameters

> Content-Type: application/json; charset=utf-8

| Name               | Type   | Required | Description                                                                                                                                                                    |
| ------------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol             | string | YES      | Stock symbol, use `ticker.region` format, example: `AAPL.US`                                                                                                                   |
| order_type         | string | YES      | [Order Type](../trade-definition#ordertype)                                                                                                                                    |
| submitted_price    | string | NO       | Submitted price, example: `388.5`<br/><br/> `LO` / `ELO` / `ALO` / `ODD` / `LIT` Order Required                                                                                |
| submitted_quantity | string | YES      | Submitted quantity, example: `100`                                                                                                                                             |
| trigger_price      | string | NO       | Trigger price, example: `388.5`<br/><br/> `LIT` / `MIT` Order Required                                                                                                         |
| limit_offset       | string | NO       | Limit offset amount<br/><br/> `TSLPAMT` / `TSLPPCT` Order Required                                                                                                             |
| trailing_amount    | string | NO       | Trailing amount<br/><br/> `TSLPAMT` Order Required                                                                                                                             |
| trailing_percent   | string | NO       | Trailing percent<br/><br/> `TSLPPCT` Order Required                                                                                                                            |
| expire_date        | string | NO       | Long term order expire date, format `YYYY-MM-DD`, example: `2022-12-05`<br/><br/> Required when `time_in_force` is `GTD`                                                       |
| side               | string | YES      | Order Side<br/><br/> **Enum Value:**<br/> `Buy`<br/> `Sell`                                                                                                                    |
| outside_rth        | string | NO       | Enable or disable outside regular trading hours<br/><br/> **Enum Value:**<br/> `RTH_ONLY` - regular trading hour only<br/> `ANY_TIME` - any time<br/> `OVERNIGHT` - Overnight" |
| time_in_force      | string | YES      | Time in force Type<br/><br/> **Enum Value:**<br/> `Day` - Day Order<br/> `GTC` - Good Til Canceled Order<br/> `GTD` - Good Til Date Order                                      |
| remark             | string | NO       | remark (Maximum 64 characters)                                                                                                                                                 |

## Examples

For the sake of understanding, we will use Python as an example to demonstrate how to place orders for some scenarios.

### Open Position Buy

We expect to buy 100 shares of `700.HK` at a price of 380 HKD, and set it to be "order valid for the day".

```py
from decimal import Decimal
from longport.openapi import TradeContext, Config, OrderType, OrderSide, TimeInForceType

# Load configuration from environment variables
config = Config.from_env()

# Create a context for trade APIs
ctx = TradeContext(config)

resp = ctx.submit_order(
    "700.HK",
    OrderType.LO,
    OrderSide.Buy,
    100,
    TimeInForceType.Day,
    submitted_price=Decimal("380"),
    remark="Hello from Python SDK",
)
```

In this case:

- `OrderSide.Buy` - Is equivalent to "Buy" side of the order
- `OrderType.LO` - Is equivalent to "Limit Order", when it is a limit order, we need to pass the `submitted_price` parameter
- `TimeInForceType.Day` - Represents that the order is valid for the day

### Close Position Sell

We submit a market order to sell 100 shares of `700.HK`, and set it to be "order valid for the day".

```py
ctx.submit_order(
    "700.HK",
    OrderType.MO,
    OrderSide.Sell,
    100,
    TimeInForceType.Day,
    remark="Hello from Python SDK",
)
```

- `OrderType.MO` - Represents a "Market Order"
- `OrderSide.Sell` - Represents "Sell" side of the order

### Stop Loss and Take Profit

> This corresponds to the "Buy if Touched" and "Sell if Touched" order types on our client's order placement interface.

Assuming we want to buy 100 shares of `700.HK` when the price reaches 380 HKD, and set it to be "Order valid before cancellation".

:::tip
**Order valid before cancellation** - This means that the order will remain valid until it is executed or cancelled.
:::

```py
ctx.submit_order(
    "NVDA.US",
    OrderType.LIT,
    OrderSide.Sell,
    100,
    TimeInForceType.GoodTilCanceled,
    Decimal("999.00"),
    trigger_price=Decimal("1000.00"),
    remark="Hello from Python SDK",
)
```

- `OrderType.LIT` - Represents a "Limit If Touched"
- `TimeInForceType.GoodTilCanceled` - Represents that the order is valid before cancellation or until it is executed
- `trigger_price` - The parameter is used to set the trigger price. When the market price reaches the trigger price, the order will be submitted

### Trailing Stop Loss and Take Profit

> This corresponds to the "Trail to Buy" and "Trail to Sell" order types on our client's order placement interface.

Sometimes we need to set a trailing stop loss and take profit to protect our profits.

Assuming we hold 100 shares of `NVDA.US`, we submit a conditional order to monitor the market price changes of `NVDA.US`. When the market price falls back 0.5% from the highest point after the order is placed, we will reduce the price by 1.2 USD and place a limit order. The order is valid until June 30.

We can do like this:

```py
ctx.submit_order(
    "NVDA.US",
    OrderType.TSLPPCT,
    OrderSide.Sell,
    100,
    TimeInForceType.GoodTilDate,
    expire_date=datetime.date(2024, 6, 30),
    trailing_percent=Decimal("0.5"),
    limit_offset=Decimal("1.2"),
    remark="Hello from Python SDK",
)
```

- `OrderType.TSLPPCT` - Represents a "Trailing Limit If Touched (Trailing Percent)", if you want to use "Trailing Amount", you can use `TSLPAMT`
- `TimeInForceType.GoodTilDate` - Represents that the order is valid until the specified date, when passing this parameter, we also need to pass the `expire_date` parameter
- `expire_date` - Is used to set the expiration date of the order
- `trailing_percent` - Used to set the tracking percentage, here `0.5` means 0.5%
- `limit_offset` - The parameter is used to set the specified spread, here `1.2` means 1.2 USD. If you do not need to specify the spread, you can pass `0` or not pass it.

When we subnmit such a conditional order, if the market price of `NVDA.US` falls back 0.5% from the highest point after the order is placed, for example, the highest point is `1,100 USD`, falling back 0.5% is `1,094.5 USD`, then our order will be placed a `LIMIT ORDER` at a price of `1,094.5 USD - 1.2 = 1,093.3 USD`.
