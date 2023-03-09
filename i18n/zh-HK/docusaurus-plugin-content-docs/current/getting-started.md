---
sidebar_position: 1
slug: /getting-started
title: 快速開始
id: getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 前言

LongPort OpenAPI SDK 基於 Rust 底層提供標準實現，目前我們已經發布了 Python, Node.js, Rust 和 C++ SDK，其他語言的支持後面會陸續推出。

## API Host

- HTTP API - `https://openapi.longportapp.com`
- WebSocket Quote - `wss://openapi-quote.longportapp.com`
- Webssocket Trade - `wss://openapi-trade.longportapp.com`

:::tip
中國大陸地區訪問，建議採用 `openapi.longportapp.cn`, `openapi-quote.longportapp.cn`, `openapi-trade.longportapp.cn` 以提升訪問速度。
:::

## 環境需求

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>
    <li><a href="https://www.python.org/">Python 3</a></li>
    <li>Pip</li>
  </TabItem>
  <TabItem value="javascript" label="JavaScript">
    <li><a href="https://nodejs.org/">Node.js</a></li>
    <li>Yarn</li>
  </TabItem>
  <TabItem value="rust" label="Rust">
    <li><a href="https://www.rust-lang.org/">Rust</a></li>
  </TabItem>
  <TabItem value="java" label="Java">
    <li><a href="https://openjdk.org/">JDK</a></li>
    <li><a href="https://maven.apache.org/">Maven</a></li>
  </TabItem>
</Tabs>

## 安裝 SDK

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

```bash
pip3 install longbridge
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```bash
yarn install longbridge
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```toml
[dependencies]
longbridge = "*"
tokio = { version = "1", features = "rt-multi-thread" }
```

  </TabItem>
  <TabItem value="java" label="Java">

```xml
<dependencies>
    <dependency>
        <groupId>io.github.longbridgeapp</groupId>
        <artifactId>openapi-sdk</artifactId>
        <version>LATEST</version>
    </dependency>
</dependencies>
```

  </TabItem>
</Tabs>

下面我們以獲取資產為例，演示一下如何使用 SDK。

## 配置開發者賬戶

1. 下載 [LongPort](https://longportapp.com/download) 並完成開戶。
2. 完成 Python 3 環境安裝，並安裝 Pip
3. 從 [LongPort OpenAPI](https://open.longportapp.com) 官網獲取 ` App Key`, `App Secret`, `Access Token` 等信息。

**_獲取 App Key, App Secret, Access Token 等信息_**

訪問 [LongPort OpenAPI](https://open.longportapp.com) 網站，登錄後，進入“個人中心”。

在頁面上會給出“應用憑證”憑證信息，我們拿到以後設置環境變量，便於後面開發使用方便。

### macOS / Linux 環境下設置環境變量

打開終端，輸入下面的命令即可：

```bash
$ export LONGBRIDGE_APP_KEY="從頁面上獲取到的 App Key"
$ export LONGBRIDGE_APP_SECRET="從頁面上獲取到的 App Secret"
$ export LONGBRIDGE_ACCESS_TOKEN="從頁面上獲取到的 Access Token"
```

### Windows 下設置環境變量

Windows 要稍微複雜一些，按下 `Win + R` 快捷鍵，輸入 `cmd` 命令啟動命令行（建議使用 [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) 獲得更好的開發體驗）。

在命令行里面輸入下面的命令設置環境變量：

```bash
C:\Users\jason> setx LONGBRIDGE_APP_KEY "從頁面上獲取到的 App Key"
成功：指定的值已得到保存。

C:\Users\jason> setx LONGBRIDGE_APP_SECRET "從頁面上獲取到的 App Secret"
成功：指定的值已得到保存。

C:\Users\jason> setx LONGBRIDGE_ACCESS_TOKEN "從頁面上獲取到的 Access Token"
成功：指定的值已得到保存。
```

:::caution

Windows 環境變量限制，當上面 3 條命令執行成功以後，你需要重新啟動 Windows 或者註銷後重新登錄一次，才可以讀取到。

:::

註銷或重新啟動後，再次打開命令行，輸入下面的命令驗證一下環境變量是否設置正確：

```bash
C:\Users\jason> set LONGBRIDGE
LONGBRIDGE_APP_KEY=xxxxxxx
LONGBRIDGE_APP_SECRET=xxxxxx
LONGBRIDGE_ACCESS_TOKEN=xxxxxxx
```

如果能正確打印你剛才設置的值，那麼環境變量就是對了。

:::tip
建議您設置好 `LONGBRIDGE_APP_KEY`, `LONGBRIDGE_APP_SECRET`, `LONGBRIDGE_ACCESS_TOKEN` 這幾個環境變量。我們為了演示方便，後面各章節文檔中的示例代碼都會使用這幾個環境變量。

如您在 Windows 環境不方便使用環境變量，可根據個人需要，修改代碼。
:::

:::caution
請注意保護好您的 **Access Token** 信息，任何人獲得到它，都可以通過 OpenAPI 來交易你的賬戶！
:::

## 場景示範

### 獲取資產總覽

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

創建 `account_asset.py` 貼入下面的代碼：

```python
from longbridge.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.account_balance()
print(resp)
```

運行

```bash
python account_asset.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

創建 `account_asset.js` 貼入下面的代碼：

```javascript
const { Config, TradeContext } = require('longbridge')

let config = Config.fromEnv()
TradeContext.new(config)
  .then((ctx) => ctx.accountBalance())
  .then((resp) => {
    for (let obj of resp) {
      console.log(obj.toString())
    }
  })
```

運行

```bash
nodejs account_asset.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

創建 `main.rs` 貼入下面的代碼：

```rust
use std::sync::Arc;

use longbridge::{trade::TradeContext, Config};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = Arc::new(Config::from_env()?);
    let (ctx, _) = TradeContext::try_new(config).await?;

    let resp = ctx.account_balance().await?;
    println!("{:?}", resp);
    Ok(())
}
```

運行

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

創建 `Main.java` 貼入下面的代碼：

```java
import com.longbridge.*;
import com.longbridge.trade.*;

class Main {
    public static void main(String[] args) throws Exception {
        try (Config config = Config.fromEnv(); TradeContext ctx = TradeContext.create(config).get()) {
            for (AccountBalance obj : ctx.getAccountBalance().get()) {
                System.out.println(obj);
            }
        }
    }
}
```

運行

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

運行後會輸出如下：

```
[
  AccountBalance {
    total_cash: 503898884.81,
    max_finance_amount: 0.00,
    remaining_finance_amount: 501403229.49,
    risk_level: Some(1),
    margin_call: 0,
    currency: "HKD",
    cash_infos: [
      CashInfo {
        withdraw_cash: 501214985.15,
        available_cash: 501214985.15,
        frozen_cash: 584438.25,
        settling_cash: -3897793.90,
        currency: "HKD",
      },
      CashInfo {
        withdraw_cash: -25546.89,
        available_cash: -25546.89,
        frozen_cash: 295768.57,
        settling_cash: 2326.60,
        currency: "USD",
      }
    ]
  }
]
```

### 訂閱實時行情

訂閱行情數據請檢查 [開發者中心](https://open.longportapp.com/account) - “行情權限”是否正確

- 港股 - BMP 基礎報價，無實時行情推送，無法用 WebSocket 訂閱
- 美股 - LV1 納斯達克最優報價 (只限 Open API）

運行前訪問 [開發者中心](https://open.longportapp.com/account)，檢查確保賬戶有正確的行情權限。

:::info

如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。

https://longportapp.com/download
:::

當你有正確的行情權限，看起來可能會是這樣：

<img src="https://pub.lbkrs.com/files/202205/CicZRBp7LAV577YN/SCR-20220510-gme.png" className="max-w-2xl" />

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

創建 `subscribe_quote.py` 貼入下面的代碼：

```python
from time import sleep
from longbridge.openapi import QuoteContext, Config, SubType, PushQuote


def on_quote(symbol: str, quote: PushQuote):
    print(symbol, quote)


config = Config.from_env()
ctx = QuoteContext(config)
ctx.set_on_quote(on_quote)

symbols = ["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"]
ctx.subscribe(symbols, [SubType.Quote], True)
sleep(30)
```

運行

```bash
python subscribe_quote.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

創建 `subscribe_quote.js` 貼入下面的代碼：

```javascript
const { Config, QuoteContext, SubType } = require('longbridge')

let config = Config.fromEnv()
QuoteContext.new(config).then((ctx) => {
  ctx.setOnQuote((_, event) => console.log(event.toString()))
  ctx.subscribe(['700.HK', 'AAPL.US', 'TSLA.US', 'NFLX.US'], [SubType.Quote], true)
})
```

運行

```bash
nodejs subscribe_quote.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

創建 `main.rs` 貼入下面的代碼：

```rust
use std::sync::Arc;

use longbridge::{
    quote::{QuoteContext, SubFlags},
    Config,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = Arc::new(Config::from_env()?);
    let (ctx, mut receiver) = QuoteContext::try_new(config).await?;

    ctx.subscribe(
        ["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"],
        SubFlags::QUOTE,
        true,
    )
    .await?;

    while let Some(event) = receiver.recv().await {
        println!("{:?}", event);
    }
    Ok(())
}
```

運行

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

創建 `Main.java` 貼入下面的代碼：

```java
import com.longbridge.*;
import com.longbridge.quote.*;

class Main {
    public static void main(String[] args) throws Exception {
        try (Config config = Config.fromEnv(); QuoteContext ctx = QuoteContext.create(config).get()) {
            ctx.setOnQuote((symbol, quote) -> {
                System.out.printf("%s\t%s\n", symbol, quote);
            });
            ctx.subscribe(new String[] { "700.HK", "AAPL.US", "TSLA.US", "NFLX.US" }, SubFlags.Quote, true).get();
            Thread.sleep(30000);
        }
    }
}
```

運行

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

運行後會輸出如下：

```
700.HK PushQuote {
    last_done: 367.000,
    open: 362.000,
    high: 369.400,
    low: 356.000,
    timestamp: "2022-06-06T08:10:00Z",
    volume: 22377421,
    turnover: 8081883405.000,
    trade_status: Normal,
    trade_session: Normal
  }
AAPL.US PushQuote {
  last_done: 147.350,
  open: 150.700,
  high: 151.000,
  low: 146.190,
  timestamp: "2022-06-06T11:57:36Z",
  volume: 3724407,
  turnover: 550606662.815,
  trade_status: Normal,
  trade_session: Pre
}
NFLX.US PushQuote {
  last_done: 201.250,
  open: 205.990,
  high: 205.990,
  low: 200.110,
  timestamp: "2022-06-06T11:57:26Z",
  volume: 137821,
  turnover: 27888085.590,
  trade_status: Normal,
  trade_session: Pre
}
```

### 委託下單

下面我們做一次 [委託下單](https://open.longportapp.com/docs/trade/order/submit) 動作，我們假設要以 50 HKD 買入 `700.HK` 的數量為 `100`。

> NOTE: 為了防止測試買入成功，這裡演示給了一個較低的價格，避免成交。OpenAPI 操作均等同與線上交易，請謹慎操作，開發調試注意參數細節。

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

創建 `submit_order.py` 貼入下面的代碼：

```python
from decimal import Decimal
from longbridge.openapi import TradeContext, Config, OrderSide, OrderType, TimeInForceType

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.submit_order(
    side=OrderSide.Buy,
    symbol="700.HK",
    order_type=OrderType.LO,
    submitted_price=Decimal("50"),
    submitted_quantity=200,
    time_in_force=TimeInForceType.Day,
    remark="Hello from Python SDK",
)
print(resp)
```

運行

```bash
python submit_order.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

創建 `submit_order.js` 貼入下面的代碼：

```javascript
const { Config, TradeContext, OrderType, OrderSide, Decimal, TimeInForceType } = require('longbridge')

let config = Config.fromEnv()
TradeContext.new(config)
  .then((ctx) =>
    ctx.submitOrder({
      symbol: '700.HK',
      orderType: OrderType.LO,
      side: OrderSide.Buy,
      timeInForce: TimeInForceType.Day,
      submittedQuantity: 200,
      submittedPrice: new Decimal('300'),
    })
  )
  .then((resp) => console.log(resp.toString()))
```

運行

```bash
nodejs submit_order.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

創建 `main.rs` 貼入下面的代碼：

```rust
use std::sync::Arc;

use longbridge::{
    decimal,
    trade::{OrderSide, OrderType, SubmitOrderOptions, TimeInForceType, TradeContext},
    Config,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = Arc::new(Config::from_env()?);
    let (ctx, _) = TradeContext::try_new(config).await?;

    let opts = SubmitOrderOptions::new(
        "700.HK",
        OrderType::LO,
        OrderSide::Buy,
        200,
        TimeInForceType::Day,
    )
    .submitted_price(decimal!(50i32));
    let resp = ctx.submit_order(opts).await?;
    println!("{:?}", resp);
    Ok(())
}
```

運行

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

創建 `Main.java` 貼入下面的代碼：

```java
import com.longbridge.*;
import com.longbridge.trade.*;
import java.math.BigDecimal;

public class Main {
    public static void main(String[] args) throws Exception {
        try (Config config = Config.fromEnv(); TradeContext ctx = TradeContext.create(config).get()) {
            SubmitOrderOptions opts = new SubmitOrderOptions("700.HK",
                    OrderType.LO,
                    OrderSide.Buy,
                    200,
                    TimeInForceType.Day).setSubmittedPrice(new BigDecimal(50));
            SubmitOrderResponse resp = ctx.submitOrder(opts).get();
            System.out.println(resp);
        }
    }
}
```

運行

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

運行後會輸出如下：

```
SubmitOrderResponse { order_id: "718437534753550336" }
```

### 獲取當日訂單

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

創建 `today_orders.py` 貼入下面的代碼：

```python
from longbridge.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.today_orders()
print(resp)
```

運行

```bash
python today_orders.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

創建 `today_orders.js` 貼入下面的代碼：

```javascript
const { Config, TradeContext } = require('longbridge')

let config = Config.fromEnv()
TradeContext.new(config)
  .then((ctx) => ctx.todayOrders())
  .then((resp) => {
    for (let obj of resp) {
      console.log(obj.toString())
    }
  })
```

運行

```bash
nodejs today_orders.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

創建 `main.rs` 貼入下面的代碼：

```rust
use std::sync::Arc;

use longbridge::{trade::TradeContext, Config};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = Arc::new(Config::from_env()?);
    let (ctx, _) = TradeContext::try_new(config).await?;

    let resp = ctx.today_orders(None).await?;
    for obj in resp {
        println!("{:?}", obj);
    }
    Ok(())
}
```

運行

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

創建 `Main.java` 貼入下面的代碼：

```java
import com.longbridge.*;
import com.longbridge.trade.*;

class Main {
    public static void main(String[] args) throws Exception {
        try (Config config = Config.fromEnv(); TradeContext ctx = TradeContext.create(config).get()) {
            Order[] orders = ctx.getTodayOrders(null).get();
            for (Order order : orders) {
                System.out.println(order);
            }
        }
    }
}
```

運行

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

運行後會輸出如下：

```
Order {
  order_id: "718437534753550336",
  status: NotReported,
  stock_name: "腾讯控股 1",
  quantity: 200,
  executed_quantity: None,
  price: Some(50.000),
  executed_price: None,
  submitted_at: 2022-06-06T12:14:16Z,
  side: Buy,
  symbol: "700.HK",
  order_type: LO,
  last_done: None,
  trigger_price: Some(0.000),
  msg: "",
  tag: Normal,
  time_in_force: Day,
  expire_date: Some(NaiveDate(Date { year: 2022, ordinal: 158 })),
  updated_at: Some(2022-06-06T12:14:16Z),
  trigger_at: None,
  trailing_amount: None,
  trailing_percent: None,
  limit_offset: None,
  trigger_status: None,
  currency: "HKD",
  outside_rth: nonce
}
```

上面例子已經完整演示瞭如何使用 SDK 訪問 OpenAPI 的接口，更多其他接口請詳細閱讀 [LongPort OpenAPI 文檔](https://open.longportapp.com/docs)，根據不同的接口使用。

## 更多例子

我們在 LongPort OpenAPI Python SDK 的 GitHub 倉庫中提供了上面幾個例子的完整代碼，當然後期我們也會持續往裡面補充或更新。

https://github.com/longbridgeapp/openapi-sdk/tree/master/examples

## SDK API 文檔

SDK 的詳細 API 文檔請訪問：

https://longbridgeapp.github.io/openapi-sdk/
