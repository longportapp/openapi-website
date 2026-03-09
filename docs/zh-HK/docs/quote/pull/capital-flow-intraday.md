---
id: quote_capital_flow_intraday
title: 獲取標的當日資金流向
slug: capital-flow-intraday
sidebar_position: 17
---

該接口用於獲取標的當日的資金流向。

<SDKLinks module="quote" klass="QuoteContext" method="capital_flow" />

:::info
[業務指令](../../socket/biz-command)：`24`
:::

## Request

### Parameters

| Name   | Type   | Required | Description                                          |
| ------ | ------ | -------- | ---------------------------------------------------- |
| symbol | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如： `700.HK` |

### Protobuf

```protobuf
message CapitalFlowIntradayRequest {
  string symbol = 1;
}
```

### Request Example

<Tabs groupId="request-example">
  <TabItem value="python" label="Python" default>

```python
# 獲取標的當日資金流向
# https://open.longbridge.com/docs/quote/pull/capital-flow-intraday
# 運行前請訪問"開發者中心"確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過"Longbridge"手機客戶端，並進入"我的 - 我的行情 - 行情商城"購買開通行情權限。
from longbridge.openapi import QuoteContext, Config, OAuthBuilder

oauth = OAuthBuilder("your-client-id").build(lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)
ctx = QuoteContext(config)

resp = ctx.capital_flow("700.HK")
print(resp)
```

  </TabItem>
  <TabItem value="nodejs" label="Node.js">

```javascript
const { Config, QuoteContext, OAuth } = require('longbridge')
async function main() {
  const oauth = await OAuth.build("your-client-id", (_, url) => { console.log("Open this URL to authorize: " + url) })
  const config = Config.fromOAuth(oauth)
  const ctx = await QuoteContext.new(config)
  const resp = await ctx.capitalFlow("700.HK")
  console.log(resp)
}
main().catch(console.error)
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import com.longport.*;
import com.longport.quote.*;
class Main {
    public static void main(String[] args) throws Exception {
        try (OAuth oauth = new OAuthBuilder("your-client-id").build(url -> System.out.println("Open to authorize: " + url)).get();
             Config config = Config.fromOAuth(oauth);
             QuoteContext ctx = QuoteContext.create(config).get()) {
            CapitalFlowLine[] resp = ctx.getCapitalFlow("700.HK").get();
            for (CapitalFlowLine line : resp) System.out.println(line);
        }
    }
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
use std::sync::Arc;
use longbridge::{oauth::OAuthBuilder, quote::QuoteContext, Config};
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let oauth = OAuthBuilder::new("your-client-id").build(|url| println!("Open this URL to authorize: {url}")).await?;
    let config = Arc::new(Config::from_oauth(oauth));
    let (ctx, _) = QuoteContext::try_new(config).await?;
    let resp = ctx.capital_flow("700.HK").await?;
    println!("{:?}", resp);
    Ok(())
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <longbridge.hpp>
#ifdef WIN32
#include <windows.h>
#endif
using namespace longbridge;
using namespace longbridge::quote;
int main(int argc, char const* argv[]) {
#ifdef WIN32
  SetConsoleOutputCP(CP_UTF8);
#endif
  const std::string client_id = "your-client-id";
  OAuthBuilder(client_id).build(
    [](const std::string& url) { std::cout << "Open this URL to authorize: " << url << std::endl; },
    [](auto res) {
      if (!res) { std::cout << "authorization failed: " << *res.status().message() << std::endl; return; }
      Config config = Config::from_oauth(*res);
      QuoteContext::create(config, [](auto res) {
        if (!res) { std::cout << "failed to create quote context: " << *res.status().message() << std::endl; return; }
        res.context().capital_flow("700.HK", [](auto res) {
          if (!res) { std::cout << "failed: " << *res.status().message() << std::endl; return; }
          std::cout << "capital_flow lines: " << res->size() << std::endl;
        });
      });
    });
  std::cin.get();
  return 0;
}
```

  </TabItem>
</Tabs>


## Response

### Response Properties

| Name               | Type     | Description    |
| ------------------ | -------- | -------------- |
| symbol             | string   | 標的代碼       |
| capital_flow_lines | object[] | 資金流向數據   |
| ∟ inflow           | string   | 淨流入         |
| ∟ timestamp        | int64    | 分鐘開始時間戳 |

### Protobuf

```protobuf
message CapitalFlowIntradayResponse {
  message CapitalFlowLine {
    string inflow = 1;
    int64 timestamp = 2;
  }
  string symbol = 1;
  repeated CapitalFlowLine capital_flow_lines = 2;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "capital_flow_lines": [
    { "inflow": "-310255860.000", "timestamp": "1655106960" },
    { "inflow": "-314011220.000", "timestamp": "1655107020" },
    { "inflow": "-314011220.000", "timestamp": "1655107080" },
    { "inflow": "-314011220.000", "timestamp": "1655107140" },
    { "inflow": "-314011220.000", "timestamp": "1655107200" }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗       |
| 3          | 301606     | 限流           | 降低請求頻次                 |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理     |
| 7          | 301600     | 請求標的不存在 | 檢查請求的 `symbol` 是否正確 |
| 7          | 301603     | 標的無行情     | 標的沒有請求的行情數據       |
| 7          | 301604     | 無權限         | 沒有獲取標的行情的權限       |
