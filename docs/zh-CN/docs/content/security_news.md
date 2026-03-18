---
slug: news
title: 股票资讯
sidebar_position: 1
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

获取指定股票的资讯列表。

<SDKLinks module="content" klass="ContentContext" method="news" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/{symbol}/news</td></tr>
</tbody>
</table>

### Path Parameters

| Name   | Type   | Required | Description                                    |
| ------ | ------ | -------- | ---------------------------------------------- |
| symbol | string | YES      | 股票代码，使用 `ticker.region` 格式，例如：`AAPL.US` |

### Request Example

<Tabs groupId="request-example">
  <TabItem value="nodejs" label="Node.js" default>

```javascript
const { Config, ContentContext, OAuth } = require('longbridge')

async function main() {
  const oauth = await OAuth.build("your-client-id", (_, url) => { console.log("Open this URL to authorize: " + url) })
  const config = Config.fromOAuth(oauth)
  const ctx = await ContentContext.new(config)
  const resp = await ctx.news("AAPL.US")
  console.log(resp)
}
main().catch(console.error)
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import com.longbridge.*;
import com.longbridge.content.*;

class Main {
    public static void main(String[] args) throws Exception {
        try (OAuth oauth = new OAuthBuilder("your-client-id").build(url -> System.out.println("Open to authorize: " + url)).get();
             Config config = Config.fromOAuth(oauth);
             ContentContext ctx = ContentContext.create(config).get()) {
            NewsItem[] resp = ctx.getNews("AAPL.US").get();
            for (NewsItem item : resp) System.out.println(item);
        }
    }
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
use std::sync::Arc;
use longbridge::{oauth::OAuthBuilder, content::ContentContext, Config};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let oauth = OAuthBuilder::new("your-client-id").build(|url| println!("Open this URL to authorize: {url}")).await?;
    let config = Arc::new(Config::from_oauth(oauth));
    let ctx = ContentContext::try_new(config)?;
    let resp = ctx.news("AAPL.US").await?;
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
using namespace longbridge::content;

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
      ContentContext::create(config, [](auto res) {
        if (!res) { std::cout << "failed to create content context: " << *res.status().message() << std::endl; return; }
        res.context().news("AAPL.US", [](auto res) {
          if (!res) { std::cout << "failed: " << *res.status().message() << std::endl; return; }
          std::cout << "news: " << res->size() << std::endl;
        });
      });
    });
  std::cin.get();
  return 0;
}
```

  </TabItem>
  <TabItem value="go" label="Go">

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/longbridge/openapi-go/config"
	"github.com/longbridge/openapi-go/oauth"
	"github.com/longbridge/openapi-go/content"
)

func main() {
	o := oauth.New("your-client-id").
		OnOpenURL(func(url string) { fmt.Println("Open this URL to authorize:", url) })
	if err := o.Build(context.Background()); err != nil {
		log.Fatal(err)
	}
	conf, err := config.New(config.WithOAuthClient(o))
	if err != nil {
		log.Fatal(err)
	}
	ctx, err := content.NewFromCfg(conf)
	if err != nil {
		log.Fatal(err)
	}
	items, err := ctx.News(context.Background(), "AAPL.US")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("news:", len(items))
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
  "message": "success",
  "data": {
    "items": [
      {
        "id": "277062200",
        "title": "关于 AppLovin 的市盈率分析",
        "description": "AppLovin Inc.（纳斯达克代码：APP）当前股价为 418.56 美元，反映出 1.42% 的上涨，尽管过去一个月下跌了 24.88%，但过去一年上涨了 31.28%。该公司的市盈率低于软件行业的平均水平 80.91，暗示可能被低估。",
        "url": "https://longbridge.com/news/277062200",
        "published_at": "1750746101",
        "comments_count": 10,
        "likes_count": 25,
        "shares_count": 3
      }
    ]
  }
}
```

### Response Status

| Status | Description | Schema                                    |
| ------ | ----------- | ----------------------------------------- |
| 200    | 返回成功    | [news_response](#schemanews_response)     |
| 500    | 内部错误    | None                                      |

## Schemas

### news_response

<a id="schemanews_response"></a>

| Name               | Type      | Required | Description                   |
| ------------------ | --------- | -------- | ----------------------------- |
| items              | object[]  | true     | 资讯列表                      |
| ∟ id               | string    | true     | 资讯 ID                       |
| ∟ title            | string    | true     | 标题                          |
| ∟ description      | string    | true     | 摘要/描述                     |
| ∟ url              | string    | true     | 资讯详情链接                  |
| ∟ published_at     | string    | true     | 发布时间，Unix 时间戳（秒）   |
| ∟ comments_count   | int32     | true     | 评论数                        |
| ∟ likes_count      | int32     | true     | 点赞数                        |
| ∟ shares_count     | int32     | true     | 分享数                        |
