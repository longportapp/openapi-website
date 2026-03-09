---
slug: watchlist_groups
title: 獲取關注分組
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

獲取關注分組

<SDKLinks module="quote" klass="QuoteContext" method="watchlist" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups </td></tr>
</tbody>
</table>

### Request Example

<Tabs groupId="request-example">
  <TabItem value="python" label="Python" default>

```python
from longbridge.openapi import QuoteContext, Config, OAuthBuilder

oauth = OAuthBuilder("your-client-id").build(lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)
ctx = QuoteContext(config)
resp = ctx.watchlist()
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
  const resp = await ctx.watchlist()
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
            WatchlistGroup[] resp = ctx.getWatchlist().get();
            for (WatchlistGroup g : resp) System.out.println(g);
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
    let resp = ctx.watchlist().await?;
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
        if (!res) { std::cout << "failed to create quote context" << std::endl; return; }
        res.context().watchlist([](auto res) {
          if (!res) { std::cout << "failed" << std::endl; return; }
          for (const auto& g : *res) std::cout << g.name << std::endl;
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

### Response Headers

- Content-Type: application/json

### Response Example

```json
{
  "code": 0,
  "data": {
    "groups": [
      {
        "id": 28020,
        "name": "all",
        "securities": [
          {
            "symbol": "700.HK",
            "market": "HK",
            "name": "騰訊控股",
            "watched_price": "364.4",
            "watched_at": 1652855022
          }
        ]
      }
    ]
  }
}
```

### Response Status

| Status | Description | Schema                                    |
| ------ | ----------- | ----------------------------------------- |
| 200    | 返回成功    | [groups_response](#schemagroups_response) |
| 500    | 內部錯誤    | None                                      |

<aside className="success">
</aside>

## Schemas

### groups_response

<a id="schemagroups_response"></a>
<a id="schemagroups_response"></a>

| Name             | Type     | Required | Description  |
| ---------------- | -------- | -------- | ------------ |
| groups           | object[] | false    | 分組         |
| ∟ id             | integer  | true     | 分組 ID      |
| ∟ name           | string   | true     | 名稱         |
| ∟ securities     | object[] | true     | 股票         |
| ∟∟ symbol        | string   | true     | 代碼         |
| ∟∟ market        | string   | true     | 市場         |
| ∟∟ name          | string   | true     | 名稱         |
| ∟∟ watched_price | string   | true     | 關注時的價格 |
| ∟∟ watched_at    | integer  | true     | 關注時間     |
