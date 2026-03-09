---
slug: watchlist_update_group
title: Update Watchlist Group
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

Update watched group

<SDKLinks module="quote" klass="QuoteContext" method="update_watchlist_group" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>PUT</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name       | Type     | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id         | integer  | YES      | Group ID, for example `10086`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| name       | string   | NO       | Group name, for example `Information Technology Group`. <br /> If this parameter is not passed, the group name will not be updated.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| securities | string[] | NO       | Security list, for example `["BABA.US", "AAPL.US"]`.<br /> Combined with the `mode` parameter below, it can be used to add securities, remove securities, and sort the watchlist.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| mode       | string   | NO       | Operation method<br /> **optional values:**<br /> `add` - Add securities<br /> `remove` - Remove securities<br /> `replace` - Update securities<br /><br /> When selecting `add`, the securities in the above list will be added to this group in order.<br /><br /> When selecting `remove`, the securities in the above list will be removed from this group.<br /><br /> When selecting `update`, the securities in the above list will completely replace the securities in this group.<br /> For example, if the original group contains `APPL.US, BABA.US, TSLA.US`, and it is updated with `["BABA.US", "AAPL.US", "MSFT.US"]`, it will become `BABA.US, AAPL.US, MSFT.US`, removing `TSLA.US` and adding `MSFT.US`, while adjusting the order of `BABA.US and AAPL.US`. |

### Request Example

<Tabs groupId="request-example">
  <TabItem value="python" label="Python" default>

```python
from longbridge.openapi import QuoteContext, Config, SecuritiesUpdateMode, OAuthBuilder

oauth = OAuthBuilder("your-client-id").build(lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)
ctx = QuoteContext(config)
ctx.update_watchlist_group(10086, name = "Watchlist2", securities = ["700.HK", "AAPL.US"], SecuritiesUpdateMode.Replace)
```

  </TabItem>
  <TabItem value="nodejs" label="Node.js">

```javascript
const { Config, QuoteContext, OAuth } = require('longbridge')
async function main() {
  const oauth = await OAuth.build("your-client-id", (_, url) => { console.log("Open this URL to authorize: " + url) })
  const config = Config.fromOAuth(oauth)
  const ctx = await QuoteContext.new(config)
  await ctx.updateWatchlistGroup(1, "New Name", ["700.HK"])
  console.log("updated")
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
            ctx.updateWatchlistGroup(1, "New Name", new String[] { "700.HK" }).get();
            System.out.println("updated");
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
    ctx.update_watchlist_group(1, "New Name", vec!["700.HK".to_string()]).await?;
    println!("updated");
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
  std::vector<std::string> symbols = {"700.HK"};
  OAuthBuilder(client_id).build(
    [](const std::string& url) { std::cout << "Open this URL to authorize: " << url << std::endl; },
    [](auto res) {
      if (!res) { std::cout << "authorization failed" << std::endl; return; }
      Config config = Config::from_oauth(*res);
      QuoteContext::create(config, [](auto res) {
        if (!res) { std::cout << "failed" << std::endl; return; }
        res.context().update_watchlist_group(1, "New Name", symbols, [](auto res) {
          if (!res) { std::cout << "failed" << std::endl; return; }
          std::cout << "updated" << std::endl;
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
  "code": 0
}
```

### Response Status

| Status | Description    | Schema |
| ------ | -------------- | ------ |
| 200    | Success        | None   |
| 500    | Internal error | None   |

<aside className="success">
</aside>
