---
sidebar_position: 1
slug: /getting-started
title: Getting Started
id: getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Foreword

LongPort OpenAPI SDK is implemented based on Rust we have released SDK for Python, Node.js, Rust and C++, and support for other languages will be launched in the future.

## API Host

- HTTP API - `https://openapi.longportapp.com`
- WebSocket Quote - `wss://openapi-quote.longportapp.com`
- WebSocket Trade - `wss://openapi-trade.longportapp.com`

:::tip
For access in mainland China, it is recommended to use `openapi.longportapp.cn`, `openapi-quote.longportapp.cn`, `openapi-trade.longportapp.cn` to improve access speed.
:::

## Environment Requirements

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

## Install SDK

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

Let's take obtaining assets as an example to demonstrate how to use the SDK.

## Configure Developer Account

1. Open an account at [LongPort](https://longbridge.hk)
2. Complete the Python 3 environment installation and install Pip
3. Get App Key, App Secret, Access Token and other information from [LongPort OpenAPI](https://open.longportapp.com) official website

**_Get App Key, App Secret, Access Token and other information_**

Login the [LongPort OpenAPI](https://open.longportapp.com) website, and enter the "User Center".

The "application credential" credential information will be given on the page. After we get it, we will set the environment variable, which is convenient for later development and use.

### Setting Environment Variables In macOS / Linux Environment

Open the terminal and enter the following command:

```bash
$ export LONGBRIDGE_APP_KEY="App Key get from user center"
$ export LONGBRIDGE_APP_SECRET="App Secret get from user center"
$ export LONGBRIDGE_ACCESS_TOKEN="Access Token get from user center"
```

### Setting Environment Variables In Windows Environment

Windows is a little more complicated, press the `Win + R` shortcut keys and enter the `cmd` command to start the command line (it is recommended to use [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) for a better development experience).

Enter the following command in the command line to set the environment variable:

```bash
C:\Users\jason> setx LONGBRIDGE_APP_KEY "App Key get from user center"
Success: the specified value has been saved.

C:\Users\jason> setx LONGBRIDGE_APP_SECRET "App Secret get from user center"
Success: the specified value has been saved.

C:\Users\jason> setx LONGBRIDGE_ACCESS_TOKEN "Access Token get from user center"
Success: the specified value has been saved.
```

:::caution

Windows environment variable restrictions, when the above 3 commands are executed successfully, you need to restart Windows or log out and log in again before you can read it.

:::

After logging out or restarting, open the command line again and enter the following command to verify that the environment variables are set correctly:

```bash
C:\Users\jason> set LONGBRIDGE
LONGBRIDGE_APP_KEY=xxxxxxx
LONGBRIDGE_APP_SECRET=xxxxxx
LONGBRIDGE_ACCESS_TOKEN=xxxxxxx
```

If it prints the value you just set correctly, then the environment variable is right.

:::tip

It is recommended that you set several environment variables such as `LONGBRIDGE_APP_KEY`, `LONGBRIDGE_APP_SECRET`, `LONGBRIDGE_ACCESS_TOKEN`. For the convenience of demonstration, these environment variables will be used in the sample code in the documents in the following chapters.

If you are inconvenient to use environment variables in the Windows environment, you can modify the code according to your personal needs.

:::

:::caution
Please pay attention to protect your **Access Token** information, anyone who gets it can trade your account through OpenAPI!
:::

## Scene Demonstration

### Get Account Balance

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

Cteate `account_asset.py` and paste the code below:

```python
from longbridge.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.account_balance()
print(resp)
```

Run it

```bash
python account_asset.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

Cteate `account_asset.js` and paste the code below:

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

Run it

```bash
nodejs account_asset.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

Cteate `main.rs` and paste the code below:

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

Run it

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

Cteate `Main.java` and paste the code below:

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

Run it

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

After running, the output is as follows:

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

### Subscribe Quote

To subscribe to market data, please check the [Developer Center](https://open.longportapp.com/account) - "Quote authority" is correct

- HK Market - BMP basic quotation is unable to subscribe with WebSocket as it has no real-time quote push.
- US Market - LV1 Nasdaq Basic (Only Open API).

Before running, visit the [Developer Center](https://open.longportapp.com/account) and ensure that the account has the correct quote level.

:::info

If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.

https://longportapp.com/download
:::

When you have the correct Quote authority, it might look like this:

<img src="https://pub.lbkrs.com/files/202205/VeSgQksvfu3Q2iPN/SCR-20220510-gkx.png" className="max-w-2xl" />

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

Create `subscribe_quote.py` and paste the code below:

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

Run it

```bash
python subscribe_quote.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

Create `subscribe_quote.js` and paste the code below:

```javascript
const { Config, QuoteContext, SubType } = require('longbridge')

let config = Config.fromEnv()
QuoteContext.new(config).then((ctx) => {
  ctx.setOnQuote((_, event) => console.log(event.toString()))
  ctx.subscribe(['700.HK', 'AAPL.US', 'TSLA.US', 'NFLX.US'], [SubType.Quote], true)
})
```

Run it

```bash
nodejs subscribe_quote.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

Create `main.rs` and paste the code below:

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

Run it

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

Create `Main.java` and paste the code below:

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

Run it

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

After running, the output is as follows:

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

### Submit Order

Next, we will do a [submit order](https://open.longportapp.com/docs/trade/order/submit) action, we assume that to buy `700.HK` at 50 HKD and quantity is `100`.

> NOTE: In order to prevent a successful test buy, the demo here gives a lower price and avoids the transaction. OpenAPI operations are equivalent to online transactions, please operate with caution, and pay attention to parameter details during development and debugging.

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

Create `submit_order.py` and paste the code below:

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

Run it

```bash
python submit_order.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

Create `submit_order.js` and paste the code below:

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

Run it

```bash
nodejs submit_order.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

Create `main.rs` and paste the code below:

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

Run it

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

Create `Main.java` and paste the code below:

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

Run it

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

After running, the output is as follows:

```
SubmitOrderResponse { order_id: "718437534753550336" }
```

### Get Today Order

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

Create `today_orders.py` and paste the code below:

```python
from longbridge.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.today_orders()
print(resp)
```

Run it

```bash
python today_orders.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

Create `today_orders.js` and paste the code below:

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

Run it

```bash
nodejs today_orders.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

Create `main.rs` and paste the code below:

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

Run it

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

Create `Main.java` and paste the code below:

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

Run it

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

After running, the output is as follows:

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

The above example has fully demonstrated how to use the SDK to access the OpenAPI interface. For more interfaces, please read the [LongPort OpenAPI Documentation](https://open.longportapp.com/docs) in detail and use them according to different interfaces.

## More Examples

We provide the complete code of the above examples in the GitHub repository of LongPort OpenAPI Python SDK, and we will continue to add or update it later.

https://github.com/longbridgeapp/openapi-sdk/tree/master/examples

## SDK API Document

For detailed SDK API document, please visit:

https://longbridgeapp.github.io/openapi-sdk/

## Contact & Feedback

- You can send feedback to service@longbridge.global
- Join **Discord** LongPort OpenAPI Server: https://discord.gg/2gUTSCS6
