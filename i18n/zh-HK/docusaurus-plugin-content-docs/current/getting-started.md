---
sidebar_position: 1
slug: /getting-started
title: 快速開始
id: getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 前言

LongPort OpenAPI SDK 基於 Rust 底層提供標準實現，目前我們已經發布了 Python, Node.js, Rust, C++/C, Java 等多種編程語言 SDK，其他語言的支持後面會陸續推出。

## API Host

- HTTP API - `https://openapi.longportapp.com`
- WebSocket Quote - `wss://openapi-quote.longportapp.com`
- Webssocket Trade - `wss://openapi-trade.longportapp.com`

:::tip
中國大陸地區訪問，建議採用 `openapi.longportapp.cn`, `openapi-quote.longportapp.cn`, `openapi-trade.longportapp.cn` 以提升訪問速度。

如果您使用我們的 SDK，可以通過設置環境變量 LONGPORT_REGION=cn 來使用位於中國大陸的接入點，目前我們只有 `hk` 和 `cn` 兩個地區可選。
:::

## 時間格式

所有 API 傳回有關時間的字段，我們都採用 [Unix Timestamp](https://en.wikipedia.org/wiki/Unix_time) 時區為 UTC。

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
  <TabItem value="go" label="Go">
    <li><a href="https://go.dev">Go</a></li>
    <li><a href="https://pkg.go.dev/github.com/longportapp/openapi-go">Go Docs</a></li>
  </TabItem>
</Tabs>

## 安裝 SDK

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

```bash
pip3 install longport
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```bash
yarn install longport
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```toml
[dependencies]
longport = "1.0.0"
tokio = { version = "1", features = "rt-multi-thread" }
```

  </TabItem>
  <TabItem value="java" label="Java">

```xml
<dependencies>
    <dependency>
        <groupId>io.github.longportapp</groupId>
        <artifactId>openapi-sdk</artifactId>
        <version>LATEST</version>
    </dependency>
</dependencies>
```

  </TabItem>

  <TabItem value="go" label="Go">

```shell
go get github.com/longportapp/openapi-go
```

  </TabItem>
</Tabs>

下面我們以獲取資產為例，演示一下如何使用 SDK。

## 配置

1. 下載 [LongPort](https://longportapp.com/download) 並完成開戶。
2. 從 [LongPort OpenAPI](https://open.longportapp.com) 官網獲取 `App Key`, `App Secret`, `Access Token` 等信息。

   **_獲取 App Key, App Secret, Access Token 等信息_**

   訪問 [LongPort OpenAPI](https://open.longportapp.com) 網站，登錄後，進入“個人中心”。

   在頁面上會給出“應用憑證”憑證信息，我們拿到以後設置環境變量，便於後面開發使用方便。

### 開通開發中帳戶

1. 下載 [LongPort](https://longportapp.com/download)，並完成開戶
2. 從 [LongPort OpenAPI](https://open.longportapp.com) 官網取得 `App Key`, `App Secret`, `Access Token` 等資訊。

   **_取得 App Key, App Secret, Access Token 等資訊_**

   造訪 [LongPort OpenAPI](https://open.longportapp.com) 網站，登入後，進入「個人中心」。

   在頁面上會給出「應用憑證」憑證訊息，我們拿到以後設定環境變量，方便後面開發使用方便。

### 環境變量

:::caution
請注意保護好您的 **Access Token** 訊息，任何人獲得到它，都可以透過 OpenAPI 來交易你的帳戶！
:::

| 環境變量                    | 說明                                                         | 值範圍          |
| --------------------------- | ------------------------------------------------------------ | --------------- |
| `LONGPORT_APP_KEY`          | 從頁面上取得到的 App Key                                     |                 |
| `LONGPORT_APP_SECRET`       | 從頁面取得到的 App Secret                                    |                 |
| `LONGPORT_ACCESS_TOKEN`     | 從頁面上取得到的 Access Token                                |                 |
| `LONGPORT_REGION`           | API 伺服器存取點，請根據您所在地區設置，以獲得更好的連線速度 | `hk`, `cn`      |
| `LONGPORT_ENABLE_OVERNIGHT` | 是否開啟夜盤行情，設定 `true` 開啟，`false` 關閉             | `true`, `false` |

建議您設定好這幾個環境變量，我們後面各章節文件中的範例程式碼都會使用這幾個環境變量。

:::tip 關於環境變量

環境變量**非必要**條件，如設定不方便或遇到問題難以解決，可不用環境變量，而是直接在程式碼裡用參數來初始化。

LongPort OpenAPI SDK 的 `Config` 都可以直接傳入 `app_key`, `app_secret`, `access_token` 等參數來初始化，注意看後面的例子註釋內 `Init config without ENV` 的部分。

:::

#### macOS / Linux 環境下設定環境變量

打開終端，輸入下面的命令即可：

```bash
export LONGPORT_APP_KEY="從頁面上取得到的 App Key"
export LONGPORT_APP_SECRET="從頁面取得到的 App Secret"
export LONGPORT_ACCESS_TOKEN="從頁面取得到的 Access Token"

```

#### Windows 下設定環境變量

Windows 要稍微複雜一些，有以下兩種方式可以設定環境變量：

1. **透過圖形介面設定**：在桌面上找到“我的電腦”，右鍵點擊，選擇“屬性”，在彈出的視窗中點擊“高級系統設定”。

   - 在彈出的視窗中點選「環境變量」。

     <img src="https://assets.lbkrs.com/uploads/82e31e5e-6062-4726-966b-2a72954f4192/windows-env-set.png" width="500" />

   - 在彈出的視窗中點擊“新建”，然後輸入環境變量名稱，例如 `LONGPORT_APP_KEY`，`Value` 分別填寫從頁面上取得到的 App Key，App Secret，Access Token，Region。

2. **CMD 命令列設定**：按下`Win + R` 快捷鍵，輸入`cmd` 命令啟動命令列（建議使用[Windows Terminal](https://apps.microsoft.com/store/detail /windows-terminal/9N0DX20HK701) 獲得更好的開發體驗）。

   在命令列裡面輸入下面的命令設定環境變量：

   ```bash
   C:\Users\jason> setx LONGPORT_APP_KEY "從頁面上取得到的 App Key"
   成功：指定的值已儲存。

   C:\Users\jason> setx LONGPORT_APP_SECRET "從頁面取得到的 App Secret"
   成功：指定的值已儲存。

   C:\Users\jason> setx LONGPORT_ACCESS_TOKEN "從頁面取得到的 Access Token"
   成功：指定的值已儲存。
   ```

   :::caution Windows 環境變量

   Windows 環境變量限制，當上面指令執行成功以後，你需要重新啟動 Windows 或登出後重新登入一次，才可以讀取。

   :::

   登出或重新啟動後，再次開啟命令列，輸入下面的命令以驗證環境變量是否設定正確：

   ```bash
   C:\Users\jason> set LONGPORT
   LONGPORT_APP_KEY=xxxxxxx
   LONGPORT_APP_SECRET=xxxxxx
   LONGPORT_ACCESS_TOKEN=xxxxxxx
   ```

   如果你能正確列印你剛才設定的值，那麼環境變量就是對了。

## 場景示範

### 獲取資產總覽

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

創建 `account_asset.py` 貼入下面的代碼：

```python
from longport.openapi import TradeContext, Config

config = Config.from_env()

# Init config without ENV
# config = Config(app_key = "YOUR_APP_KEY", app_secret = "YOUR_APP_SECRET", access_token = "YOUR_ACCESS_TOKEN")

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
const { Config, TradeContext } = require('longport')

let config = Config.fromEnv()

// Init config without ENV
// let config = new Config({ appKey: "YOUR_APP_KEY", appSecret: "YOUR_APP_SECRET", accessToken: "YOUR_ACCESS_TOKEN" })

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

use longport::{trade::TradeContext, Config};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = Arc::new(Config::from_env()?);

    // Init config without ENV
    // let config = Arc::new(Config::new("YOUR_APP_KEY", "YOUR_APP_SECRET", "YOUR_ACCESS_TOKEN")?);

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
import com.longport.*;
import com.longport.trade.*;

class Main {
    public static void main(String[] args) throws Exception {
        Config config = Config.fromEnv();

        // Init config without ENV
        // https://longportapp.github.io/openapi-sdk/java/com/longport/ConfigBuilder.html
        // Config config = ConfigBuilder("YOUR_APP_KEY", "YOUR_APP_SECRET", "YOUR_ACCESS_TOKEN").build();

        try (TradeContext ctx = TradeContext.create(config).get()) {
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

  <TabItem value="go" label="Go">

創建 `main.go` 貼入如下代碼：

```go
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/longportapp/openapi-go/config"
    "github.com/longportapp/openapi-go/trade"
)

func main() {
    conf, err := config.New()

    // Init config without ENV
    // https://github.com/longportapp/openapi-go/blob/v0.9.2/config/config_test.go#L11
    // conf, err := config.New(config.WithConfigKey("YOUR_APP_KEY", "YOUR_APP_SECRET", "YOUR_ACCESS_TOKEN"))

    if err != nil {
        log.Fatal(err)
    }
    tradeContext, err := trade.NewFromCfg(conf)
    if err != nil {
        log.Fatal(err)
    }
    defer tradeContext.Close()
    ctx := context.Background()
    // Get AccountBalance infomation
    ab, err := tradeContext.AccountBalance(ctx)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%+v", ab)
}
```

運行：

```shell
go mod tidy
go run ./
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

<https://longportapp.com/download>
:::

當你有正確的行情權限，看起來可能會是這樣：

<img src="https://pub.lbkrs.com/files/202205/CicZRBp7LAV577YN/SCR-20220510-gme.png" className="max-w-2xl" />

<Tabs groupId="programming-language">
  <TabItem value="python" label="Python" default>

創建 `subscribe_quote.py` 貼入下面的代碼：

```python
from time import sleep
from longport.openapi import QuoteContext, Config, SubType, PushQuote


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
const { Config, QuoteContext, SubType } = require('longport')

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

use longport::{
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
import com.longport.*;
import com.longport.quote.*;

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
from longport.openapi import TradeContext, Config, OrderSide, OrderType, TimeInForceType

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
const { Config, TradeContext, OrderType, OrderSide, Decimal, TimeInForceType } = require('longport')

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

use longport::{
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
import com.longport.*;
import com.longport.trade.*;
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

  <TabItem value="go" label="Go">

創建 `main.go` 貼入下面的代碼：

```go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/longportapp/openapi-go/config"
    "github.com/longportapp/openapi-go/quote"
)

func main() {
 // create quote context from environment variables
    conf, err := config.New()
    if err != nil {
        log.Fatal(err)
    }
    quoteContext, err := quote.NewFromCfg(conf)
    if err != nil {
        log.Fatal(err)
        return
    }
    defer quoteContext.Close()
    ctx := context.Background()
    quoteContext.OnQuote(func(pe *quote.PushQuote) {
        bytes, _ := json.Marshal(pe)
        fmt.Println(string(bytes))
    })
    quoteContext.OnDepth(func(d *quote.PushDepth) {
        bytes, _ := json.Marshal(d)
        if d.Sequence != 0 {
            fmt.Print(time.UnixMicro(d.Sequence/1000).Format(time.RFC3339) + " ")
        }
        fmt.Println(string(bytes))
    })

    // Subscribe some symbols
    err = quoteContext.Subscribe(ctx, []string{"700.HK", "AAPL.US", "NFLX.US"}, []quote.SubType{quote.SubTypeDepth}, true)
    if err != nil {
        log.Fatal(err)
        return
    }

    quitChannel := make(chan os.Signal, 1)
    signal.Notify(quitChannel, syscall.SIGINT, syscall.SIGTERM)
    <-quitChannel
}
```

運行：

```shell
go run ./
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
from longport.openapi import TradeContext, Config

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
const { Config, TradeContext } = require('longport')

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

use longport::{trade::TradeContext, Config};

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
import com.longport.*;
import com.longport.trade.*;

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

  <TabItem value="go" label="Go">

创建 `main.go`，贴入以下内容：

```go
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/longportapp/openapi-go/config"
    "github.com/longportapp/openapi-go/trade"
)

func main() {
    // create trade context from environment variables
    conf, err := config.New()
    if err != nil {
        log.Fatal(err)
    }
    tradeContext, err := trade.NewFromCfg(conf)
    if err != nil {
        log.Fatal(err)
    }
    defer tradeContext.Close()
    ctx := context.Background()
    // today orders
    orders, err := tradeContext.TodayOrders(ctx, &trade.GetTodayOrders{})
    if err != nil {
        log.Fatal(err)
    }

    for _, order := range orders {
        fmt.Printf("%+v\n", order)
    }
}
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

<https://github.com/longportapp/openapi-sdk/tree/master/examples>

## SDK API 文檔

SDK 的詳細 API 文檔請訪問：

<https://longportapp.github.io/openapi-sdk/>

## 回饋及溝通

如果您在使用 SDK 的過程中遇到任何問題，歡迎透過以下方式返回或與我們討論，我們會盡力協助您解決問題。

### GitHub Issues

在 GitHub 上，也有很多歷史的討論和問題可以參考，你也可以試著搜尋一下，或許也能找到問題的解決方案。

訪問網址：<https://github.com/longportapp/openapi-sdk/issues>

### 飛書回饋

如果你有使用[飛書](https://www.feishu.cn/)，可以掃打開在飛書話題群中提出你的問題：

<img src="https://assets.lbkrs.com/uploads/412f8cd8-2268-45ff-a367-98f280d0ee09/openapi-feishu-qrcode.png" style={{ width: "200px" }} />
