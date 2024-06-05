---
slug: submit
title: 委託下單
search: true
headingLevel: 3
---

該接口用於港美股，窩輪，期權的委託下單。

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

| Name               | Type   | Required | Description                                                                                                                               |
| ------------------ | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| symbol             | string | YES      | 股票代碼，使用 `ticker.region` 格式，例如：`AAPL.US`                                                                                      |
| order_type         | string | YES      | [訂單類型](../trade-definition#ordertype)                                                                                                 |
| submitted_price    | string | NO       | 下單價格，例如：`388.5`<br/><br/> `LO` / `ELO` / `ALO` / `ODD` / `LIT` 訂單必填                                                           |
| submitted_quantity | string | YES      | 下單數量，例如：`100`                                                                                                                     |
| trigger_price      | string | NO       | 觸發價格，例如：`388.5`<br/><br/> `LIT` / `MIT` 訂單必填                                                                                  |
| limit_offset       | string | NO       | 指定價差，例如 "1.2" 表示價差 1.2 USD (如果是美股)<br/><br/> `TSLPAMT` / `TSLPPCT` 訂單必填                                               |
| trailing_amount    | string | NO       | 跟蹤金額<br/><br/> `TSLPAMT` 訂單必填                                                                                                     |
| trailing_percent   | string | NO       | 跟蹤漲跌幅，單位為百分比，例如 "2.5" 表示 "2.5%"<br/><br/> `TSLPPCT` 訂單必填                                                             |
| expire_date        | string | NO       | 長期單過期時間，格式為 `YYYY-MM-DD`, 例如：`2022-12-05`<br/><br/> time_in_force 為 `GTD` 時必填                                           |
| side               | string | YES      | 買賣方向<br/><br/> **可選值：**<br/> `Buy` - 買入<br/> `Sell` - 賣出                                                                      |
| outside_rth        | string | NO       | 是否允許盤前盤後，美股必填<br/><br/> **可選值：**<br/> `RTH_ONLY` - 不允許盤前盤後<br/> `ANY_TIME` - 允許盤前盤後<br/> `OVERNIGHT` - 夜盤 |
| time_in_force      | string | YES      | 訂單有效期類型<br/><br/> **可選值：**<br/> `Day` - 當日有效<br/> `GTC` - 撤單前有效<br/> `GTD` - 到期前有效                               |
| remark             | string | NO       | 備註 (最大 64 字符)                                                                                                                       |

## Examples

為了方便理解，我們下面以 Python 作為示例，介紹如何實現一些場景的下單操作。

### 建倉買入

我們期望以 380 HKD 價格，買入 100 股 `700.HK`，並設定“訂單當日有效”。

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

其中：

- `OrderSide.Buy` - 表示買入
- `OrderType.LO` - 表示掛單為**限價單**，當為限價單時，我們需要傳遞 `submitted_price` 參數
- `TimeInForceType.Day` - 表示訂單當日有效

### 平倉賣出

提交市價單，賣出 100 股 `700.HK`，並設定“訂單當日有效”。

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

- `OrderType.MO` - 表示掛單為**市價單**
- `OrderSide.Sell` - 表示賣出

### 到價止盈止損

> 對應我們客户端下單界面上的“到價買入”和“到價賣出”訂單類型。

假定我們在持有 100 股 `NVDA.US` 前提下，監控市價在跌破 1000.00 USD 價格時，以 999.00 限價單平倉，並設定**訂單撤銷前有效**。

:::tip
**訂單撤銷前有效** - 是指訂單在達到條件後，會一直有效直到被成交或者被撤銷。
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

- `OrderType.LIT` - 表示掛單為**觸價限價單**
- `TimeInForceType.GoodTilCanceled` - 表示訂單撤銷前有效
- `trigger_price` - 參數用於設定觸發價格，當行情價格達到觸發價格時，訂單會被提交

### 跟蹤止盈止損

> 對應我們客户端下單界面上的“反彈買入”和“回落賣出”訂單類型。

我們有時候需要設定一個跟蹤止盈止損，以保護我們的盈利或者減少損失。

假定我們持有 100 股 `NVDA.US`，提交一個條件單，監控 `NVDA.US` 的行情變化，當市價在下單後的**最高點回落** 0.5% 時，按照觸發時的市價，減少 1.2 USD，掛出一個限價單，訂單在 6 月 30 日前有效。

可以用下面的代碼實現：

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

- `OrderType.TSLPPCT` - 表示掛單為**跟蹤止損限價單 (跟蹤漲跌幅)**，這裏如果你想要使用**跟蹤金額**，可以使用 `TSLPAMT`
- `TimeInForceType.GoodTilDate` - 表示訂單到期前有效，當傳遞此類型參數是，我們也需要傳遞 `expire_date` 參數
- `expire_date` - 參數用於設定訂單到期時間
- `trailing_percent` - 參數用於設定跟蹤漲跌幅，如 `0.5` 表示 0.5%
- `limit_offset` - 參數用於設定指定價差，這裏 `1.2` 表示 1.2 USD。如果你不需要指定價差，可以傳遞 `0` 或不傳。

當我們掛出這麼一個條件單以後，如果 `NVDA.US` 的市價在下單後的最高點回落 0.5% 時，比如最高點為 `1,100 USD`，回落 0.5% 就是 `1,094.5 USD`，那麼我們的訂單會以 `1,094.5 USD - 1.2 = 1,093.3 USD` 的價格掛出限價單。
