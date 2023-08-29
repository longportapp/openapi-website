---
sidebar_position: 1
slug: /getting-started
title: 快速开始
id: getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 前言

[LongPort OpenAPI SDK](https://github.com/longbridgeapp/openapi-sdk) 基于 Rust 底层提供标准实现，目前我们已经发布了 Python、Node.js、Rust、C++ 的 SDK，其他语言的支持后面会陆续推出。

## API Host

- HTTP API - `https://openapi.longportapp.com`
- WebSocket Quote - `wss://openapi-quote.longportapp.com`
- WebSocket Trade - `wss://openapi-trade.longportapp.com`

:::info
中国大陆地区访问，建议采用 `openapi.longportapp.cn`, `openapi-quote.longportapp.cn`, `openapi-trade.longportapp.cn` 以提升访问速度。
:::

## 环境需求

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

## 安装 SDK

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

下面我们以获取资产为例，演示一下如何使用 SDK。

## 配置开发者账户

1. 下载 [LongPort](https://longportapp.com/download)，并完成开户
2. 完成 Python 3 环境安装，并安装 Pip
3. 从 [LongPort OpenAPI](https://open.longportapp.com) 官网获取 ` App Key`, `App Secret`, `Access Token` 等信息。

**_获取 App Key, App Secret, Access Token 等信息_**

访问 [LongPort OpenAPI](https://open.longportapp.com) 网站，登录后，进入“个人中心”。

在页面上会给出“应用凭证”凭证信息，我们拿到以后设置环境变量，便于后面开发使用方便。

### macOS / Linux 环境下设置环境变量

打开终端，输入下面的命令即可：

```bash
$ export LONGBRIDGE_APP_KEY="从页面上获取到的 App Key"
$ export LONGBRIDGE_APP_SECRET="从页面上获取到的 App Secret"
$ export LONGBRIDGE_ACCESS_TOKEN="从页面上获取到的 Access Token"
```

### Windows 下设置环境变量

Windows 要稍微复杂一些，按下 `Win + R` 快捷键，输入 `cmd` 命令启动命令行（建议使用 [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) 获得更好的开发体验）。

在命令行里面输入下面的命令设置环境变量：

```bash
C:\Users\jason> setx LONGBRIDGE_APP_KEY "从页面上获取到的 App Key"
成功：指定的值已得到保存。

C:\Users\jason> setx LONGBRIDGE_APP_SECRET "从页面上获取到的 App Secret"
成功：指定的值已得到保存。

C:\Users\jason> setx LONGBRIDGE_ACCESS_TOKEN "从页面上获取到的 Access Token"
成功：指定的值已得到保存。
```

:::caution

Windows 环境变量限制，当上面 3 条命令执行成功以后，你需要重新启动 Windows 或者注销后重新登录一次，才可以读取到。

:::

注销或重新启动后，再次打开命令行，输入下面的命令验证一下环境变量是否设置正确：

```bash
C:\Users\jason> set LONGBRIDGE
LONGBRIDGE_APP_KEY=xxxxxxx
LONGBRIDGE_APP_SECRET=xxxxxx
LONGBRIDGE_ACCESS_TOKEN=xxxxxxx
```

如果能正确打印你刚才设置的值，那么环境变量就是对了。

:::tip
建议您设置好 `LONGBRIDGE_APP_KEY`, `LONGBRIDGE_APP_SECRET`, `LONGBRIDGE_ACCESS_TOKEN` 这几个环境变量。我们为了演示方便，后面各章节文档中的示例代码都会使用这几个环境变量。

如您在 Windows 环境不方便使用环境变量，可根据个人需要，修改代码。
:::

:::caution
请注意保护好您的 **Access Token** 信息，任何人获得到它，都可以通过 OpenAPI 来交易你的账户！
:::

## 场景示范

### 获取资产总览

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

创建 `account_asset.py` 贴入下面的代码：

```python
from longbridge.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.account_balance()
print(resp)
```

运行

```bash
python account_asset.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

创建 `account_asset.js` 贴入下面的代码：

```js
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

运行

```bash
node account_asset.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

创建 `main.rs` 贴入下面的代码：

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

运行

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

创建 `Main.java` 贴入下面的代码：

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

运行

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

运行后，会输出如下：

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

### 订阅实时行情

订阅行情数据请检查 [开发者中心](https://open.longportapp.com/account) - “行情权限”是否正确

- 港股 - BMP 基础报价，无实时行情推送，无法用 WebSocket 订阅
- 美股 - LV1 纳斯达克最优报价 (只限 Open API）

运行前访问 [开发者中心](https://open.longportapp.com/account)，检查确保账户有正确的行情权限。

:::info

如没有开通行情权限，可以通过“LongPort”手机客户端，并进入“我的 - 我的行情 - 行情商城”购买开通行情权限。

https://longportapp.com/download
:::

当你有正确的行情权限，看起来可能会是这样：

<img src="https://pub.lbkrs.com/files/202205/JjCceNDSqeBJpaWv/SCR-20220507-rnm.png" className="max-w-2xl" />

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

创建 `subscribe_quote.py` 贴入下面的代码：

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

运行

```bash
python subscribe_quote.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

创建 `subscribe_quote.js` 贴入下面的代码：

```javascript
const { Config, QuoteContext, SubType } = require('longbridge')

let config = Config.fromEnv()
QuoteContext.new(config).then((ctx) => {
  ctx.setOnQuote((_, event) => console.log(event.toString()))
  ctx.subscribe(['700.HK', 'AAPL.US', 'TSLA.US', 'NFLX.US'], [SubType.Quote], true)
})
```

运行

```bash
node subscribe_quote.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

创建 `main.rs` 贴入下面的代码：

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

运行

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

创建 `Main.java` 贴入下面的代码：

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

运行

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

运行后，会输出如下：

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

### 委托下单

下面我们做一次 [委托下单](https://open.longportapp.com/docs/trade/order/submit) 动作，我们假设要以 50 HKD 买入 `700.HK` 的数量为 `100`。

> NOTE: 为了防止测试买入成功，这里演示给了一个较低的价格，避免成交。OpenAPI 操作均等同与线上交易，请谨慎操作，开发调试注意参数细节。

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

创建 `submit_order.py` 贴入下面的代码：

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

运行

```bash
python submit_order.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

创建 `submit_order.js` 贴入下面的代码：

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

运行

```bash
node submit_order.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

创建 `main.rs` 贴入下面的代码：

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

运行

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

创建 `Main.java` 贴入下面的代码：

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

运行

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

运行后，会输出如下：

```
SubmitOrderResponse { order_id: "718437534753550336" }
```

### 获取当日订单

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

创建 `today_orders.py` 贴入下面的代码：

```python
from longbridge.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.today_orders()
print(resp)
```

运行

```bash
python today_orders.py
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

创建 `today_orders.js` 贴入下面的代码：

```js
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

运行

```bash
node today_orders.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

创建 `main.rs` 贴入下面的代码：

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

运行

```bash
cargo run
```

  </TabItem>
  <TabItem value="java" label="Java">

创建 `Main.java` 贴入下面的代码：

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

运行

```bash
mvn compile exec:exec
```

  </TabItem>
</Tabs>

运行后，会输出如下：

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

上面例子已经完整演示了如何使用 SDK 访问 OpenAPI 的接口，更多其他接口请详细阅读 [LongPort OpenAPI 文档](https://longbridgeapp.github.io/openapi-sdk/)，根据不同的接口使用。

## 更多例子

我们在 LongPort OpenAPI Python SDK 的 GitHub 仓库中提供了上面几个例子的完整代码，当然后期我们也会持续往里面补充或更新。

https://github.com/longbridgeapp/openapi-sdk/tree/master/examples

## SDK API 文档

SDK 的详细 API 文档请访问：

https://longbridgeapp.github.io/openapi-sdk/

## 反馈及沟通

- 可以给 LongPort 服务邮箱发送反馈，邮箱地址是：service@longbridge.global
- 加入 LongPort OpenAPI 微信沟通群，二维码如下：
  <img src="https://pub.lbkrs.com/files/202205/akTNrRTBrT5aMX4f/qrcode.jpg" className="max-w-2xl" />
