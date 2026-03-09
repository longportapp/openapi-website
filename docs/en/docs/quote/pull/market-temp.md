---
title: Current Market Temperature
slug: market_temperature
sidebar_position: 21
---

Get Current Market Temperature

<SDKLinks module="quote" klass="QuoteContext" method="market_temperature" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/market_temperature</td></tr>
</tbody>
</table>

### Parameters

| Name   | Type   | Required | Description                               |
| ------ | ------ | -------- | ----------------------------------------- |
| market | string | YES      | Market, currently supports US, HK, SG, CN |

### Request Example

<Tabs groupId="request-example">
  <TabItem value="python" label="Python" default>

```python
from longbridge.openapi import QuoteContext, Config, Market, OAuthBuilder

oauth = OAuthBuilder("your-client-id").build(lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)
ctx = QuoteContext(config)
resp = ctx.market_temperature(Market.US)
print(resp)
```

  </TabItem>
  <TabItem value="nodejs" label="Node.js">

```javascript
const { Config, QuoteContext, OAuth, Market } = require('longbridge')

async function main() {
  const oauth = await OAuth.build("your-client-id", (_, url) => {
    console.log("Open this URL to authorize: " + url)
  })
  const config = Config.fromOAuth(oauth)
  const ctx = await QuoteContext.new(config)
  const resp = await ctx.marketTemperature(Market.US)
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
        try (OAuth oauth = new OAuthBuilder("your-client-id")
                .build(url -> System.out.println("Open to authorize: " + url))
                .get();
             Config config = Config.fromOAuth(oauth);
             QuoteContext ctx = QuoteContext.create(config).get()) {
            MarketTemperature resp = ctx.getMarketTemperature(Market.US).get();
            System.out.println(resp);
        }
    }
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
use std::sync::Arc;
use longbridge::{oauth::OAuthBuilder, quote::QuoteContext, Config, Market};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let oauth = OAuthBuilder::new("your-client-id")
        .build(|url| println!("Open this URL to authorize: {url}"))
        .await?;
    let config = Arc::new(Config::from_oauth(oauth));
    let (ctx, _) = QuoteContext::try_new(config).await?;
    let resp = ctx.market_temperature(Market::US).await?;
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
    [](const std::string& url) {
      std::cout << "Open this URL to authorize: " << url << std::endl;
    },
    [](auto res) {
      if (!res) {
        std::cout << "authorization failed: " << *res.status().message() << std::endl;
        return;
      }
      Config config = Config::from_oauth(*res);
      QuoteContext::create(config, [](auto res) {
        if (!res) {
          std::cout << "failed to create quote context: " << *res.status().message() << std::endl;
          return;
        }
        res.context().market_temperature(Market::US, [](auto res) {
          if (!res) {
            std::cout << "failed: " << *res.status().message() << std::endl;
            return;
          }
          std::cout << "temperature: " << res->temperature << std::endl;
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
    "temperature": 50,
    "description": "Temperature is moderate, maintaining stability",
    "valuation": 23,
    "sentiment": 78,
    "updated_at": 1744616612
  }
}
```

#### Response Status

| Status | Description     | Schema                                                    |
| ------ | --------------- | --------------------------------------------------------- |
| 200    | Success         | [MarketTemperatureResponse](#market_temperature_response) |
| 400    | Parameter Error | None                                                      |

<aside className="success">
</aside>

## Schemas

### MarketTemperatureResponse

<a id="market_temperature_response"></a>

| Name        | Type    | Required | Description             |
| ----------- | ------- | -------- | ----------------------- |
| temperature | integer | true     | Temperature value       |
| description | string  | true     | Temperature description |
| valuation   | integer | true     | Market valuation        |
| sentiment   | integer | true     | Market sentiment        |
| updated_at  | integer | true     | Update time             |

## Error Codes

| Business Error Code | Description           | Troubleshooting                           |
| ------------------- | --------------------- | ----------------------------------------- |
| 2601500             | Server Internal Error | Please retry or contact technical support |
