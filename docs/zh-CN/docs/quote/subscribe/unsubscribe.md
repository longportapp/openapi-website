---
id: quote_unsubscribe
title: 取消订阅行情数据
slug: unsubscribe
sidebar_position: 2
---

该接口用于取消订阅标的行情数据。

<SDKLinks module="quote" klass="QuoteContext" method="unsubscribe" />

:::info

[业务指令](../../socket/biz-command)：`7`

:::

## Request

### Parameters

| Name      | Type     | Required | Description                                                                                                        |
| --------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | string[] | 是       | 订阅的标的代码，例如：`[700.HK]` <br /><br />**校验规则：**<br />每次请求支持传入的标的数量上限是 `500` 个         |
| sub_type  | int32[]  | 是       | 订阅的数据类型，例如：`[1,2]`，详见 [SubType](../objects#subtype---订阅数据的类型)                                 |
| unsub_all | bool     | 是       | 是否全部取消。<br />- `symbol` 为空时，取消所有标的的订阅。<br />- `symbol` 不为空时，取消这些标的的所有类型订阅。 |

### Protobuf

```protobuf
message UnsubscribeRequest {
  repeated string symbol = 1;
  repeated SubType sub_type = 2;
  bool unsub_all = 3;
}
```

### Request Example

<Tabs groupId="request-example">
  <TabItem value="python" label="Python" default>

```python
from longbridge.openapi import QuoteContext, Config, SubType, OAuthBuilder
oauth = OAuthBuilder("your-client-id").build(lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)
ctx = QuoteContext(config)

ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Quote])
ctx.unsubscribe(["AAPL.US"], [SubType.Quote])
```

  </TabItem>
  <TabItem value="nodejs" label="Node.js">

```javascript
const { Config, QuoteContext, OAuth, SubType } = require('longbridge')
async function main() {
  const oauth = await OAuth.build("your-client-id", (_, url) => { console.log("Open this URL to authorize: " + url) })
  const config = Config.fromOAuth(oauth)
  const ctx = await QuoteContext.new(config)
  await ctx.unsubscribe(["700.HK", "AAPL.US"], [SubType.Quote])
  console.log("unsubscribed")
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
            ctx.unsubscribe(new String[] { "700.HK", "AAPL.US" }, new SubType[] { SubType.Quote }).get();
            System.out.println("unsubscribed");
        }
    }
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
use std::sync::Arc;
use longbridge::{oauth::OAuthBuilder, quote::QuoteContext, Config, quote::SubFlags};
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let oauth = OAuthBuilder::new("your-client-id").build(|url| println!("Open this URL to authorize: {url}")).await?;
    let config = Arc::new(Config::from_oauth(oauth));
    let (ctx, _) = QuoteContext::try_new(config).await?;
    ctx.unsubscribe(vec!["700.HK".to_string(), "AAPL.US".to_string()], SubFlags::quote()).await?;
    println!("unsubscribed");
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
  std::vector<std::string> symbols = {"700.HK", "AAPL.US"};
  OAuthBuilder(client_id).build(
    [](const std::string& url) { std::cout << "Open this URL to authorize: " << url << std::endl; },
    [](auto res) {
      if (!res) { std::cout << "authorization failed: " << *res.status().message() << std::endl; return; }
      Config config = Config::from_oauth(*res);
      QuoteContext::create(config, [](auto res) {
        if (!res) { std::cout << "failed to create quote context: " << *res.status().message() << std::endl; return; }
        res.context().unsubscribe(symbols, SubFlags::QUOTE(), [](auto res) {
          if (!res) { std::cout << "failed: " << *res.status().message() << std::endl; return; }
          std::cout << "unsubscribed" << std::endl;
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

### Protobuf

```protobuf
message UnsubscribeResponse{
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败   |
| 3          | 301606     | 限流           | 降低请求频次             |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理 |
| 7          | 301600     | 请求参数有误   | 检查请求的 `sub_type`    |
