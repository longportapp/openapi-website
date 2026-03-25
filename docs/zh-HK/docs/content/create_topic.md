---
slug: create-topic
title: 創建討論
sidebar_position: 4
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

創建一篇新討論。支持兩種內容類型：

| 類型 | `title` | `body` 格式 | 說明 |
|------|---------|-------------|------|
| `post`（默認） | 可選 | 純文本 | Markdown 語法（如 `**加粗**`、`# 標題`）**不會渲染**，將作為字面字符顯示，類似發推文。 |
| `article` | **必填** | Markdown | 服務端將 Markdown 轉為 HTML 展示，支持標題、表格、加粗、代碼塊等。 |

<SDKLinks module="content" klass="ContentContext" method="create_topic" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>POST</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/topics</td></tr>
</tbody>
</table>

### Request Body

| Name        | Type     | Required              | Description                                                                                           |
| ----------- | -------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| title       | string   | 是（article 類型必填） | 標題。`topic_type` 為 `article` 時必填，`post` 時可省略。                                              |
| body        | string   | YES                   | 正文。`post` 類型為純文本，Markdown 不渲染；`article` 類型支持 Markdown。                              |
| topic_type  | string   | NO                    | 內容類型：`post`（純文本，默認）或 `article`（Markdown）                                               |
| tickers     | string[] | NO                    | 關聯標的代碼，格式 `{symbol}.{market}`，如 `["AAPL.US", "700.HK"]`，最多 10 個                        |
| hashtags    | string[] | NO                    | 討論標籤名稱列表，如 `["earnings", "fed"]`，最多 5 個                                                  |
| license     | int32    | NO                    | 版權聲明，`0`=無聲明（默認），`1`=原創，`2`=非原創                                                     |

### Request Example

<Tabs groupId="request-example">
  <TabItem value="cli" label="CLI" default>

```bash
# 短帖 — 純文本（默認），Markdown 不渲染
longbridge create-topic --body "今天看好 700.HK"

# 短帖 + 關聯標的
longbridge create-topic --body "NVDA GTC 看點" --tickers NVDA.US,700.HK

# 長文 — 支持 Markdown，必須填寫標題
longbridge create-topic --title "我的分析" --body "**看好** 700.HK，因為..." --type article

# 長文 — 從 Markdown 文件讀取正文
longbridge create-topic --title "Q4 財報前瞻" --body "$(cat analysis.md)" --type article

# JSON 輸出
longbridge create-topic --body "測試帖" --format json
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from longbridge.openapi import ContentContext, Config, OAuthBuilder

oauth = OAuthBuilder("your-client-id").build(lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)
ctx = ContentContext(config)

# 短帖（純文本）
resp = ctx.create_topic(
    title="",
    body="今天看好 700.HK",
    topic_type="post",
    tickers=["700.HK"],
)
print(resp)

# 長文（Markdown，標題必填）
resp = ctx.create_topic(
    title="我的分析",
    body="**看好** 700.HK，因為...",
    topic_type="article",
    tickers=["700.HK"],
    license=1,
)
print(resp)
```

  </TabItem>
  <TabItem value="python-async" label="Python (async)">

```python
import asyncio
from longbridge.openapi import AsyncContentContext, Config, OAuthBuilder

async def main() -> None:
    oauth = await OAuthBuilder("your-client-id").build_async(lambda url: print("Visit:", url))
    config = Config.from_oauth(oauth)
    ctx = AsyncContentContext.create(config)

    resp = await ctx.create_topic(
        title="我的分析",
        body="**看好** 700.HK，因為...",
        topic_type="article",
        tickers=["700.HK"],
    )
    print(resp)

if __name__ == "__main__":
    asyncio.run(main())
```

  </TabItem>
  <TabItem value="nodejs" label="Node.js">

```javascript
const { Config, ContentContext, OAuth } = require('longbridge')

async function main() {
  const oauth = await OAuth.build("your-client-id", (_, url) => { console.log("Open this URL to authorize: " + url) })
  const config = Config.fromOAuth(oauth)
  const ctx = ContentContext.new(config)

  // 長文（Markdown，標題必填）
  const resp = await ctx.createTopic({
    title: "我的分析",
    body: "**看好** 700.HK，因為...",
    topicType: "article",
    tickers: ["700.HK"],
  })
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
             ContentContext ctx = ContentContext.create(config)) {
            // 長文（Markdown，標題必填）
            CreateTopicOptions opts = new CreateTopicOptions("我的分析", "**看好** 700.HK，因為...")
                .setTopicType("article")
                .setTickers(new String[]{"700.HK"})
                .setLicense(1);
            OwnedTopic resp = ctx.createTopic(opts).get();
            System.out.println(resp);
        }
    }
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
use std::sync::Arc;
use longbridge::{oauth::OAuthBuilder, content::{ContentContext, CreateTopicOptions}, Config};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let oauth = OAuthBuilder::new("your-client-id").build(|url| println!("Open this URL to authorize: {url}")).await?;
    let config = Arc::new(Config::from_oauth(oauth));
    let ctx = ContentContext::new(config);

    // 長文（Markdown，標題必填）
    let opts = CreateTopicOptions {
        title: "我的分析".to_string(),
        body: "**看好** 700.HK，因為...".to_string(),
        topic_type: Some("article".to_string()),
        tickers: Some(vec!["700.HK".to_string()]),
        hashtags: None,
        license: Some(1),
    };
    let resp = ctx.create_topic(opts).await?;
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

static void
run(const OAuth& oauth)
{
    Config config = Config::from_oauth(oauth);
    ContentContext ctx = ContentContext::create(config);

    // 長文（Markdown，標題必填）
    CreateTopicOptions opts;
    opts.title = "我的分析";
    opts.body = "**看好** 700.HK，因為...";
    opts.topic_type = "article";
    opts.tickers = {"700.HK"};

    ctx.create_topic(opts, [](auto res) {
        if (!res) { std::cout << "failed: " << *res.status().message() << std::endl; return; }
        std::cout << "created topic: " << res->id << std::endl;
    });
}

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
        run(*res);
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
	// 長文（Markdown，標題必填）
	opts := content.CreateTopicOptions{
		Title:     "我的分析",
		Body:      "**看好** 700.HK，因為...",
		TopicType: "article",
		Tickers:   []string{"700.HK"},
	}
	resp, err := ctx.CreateTopic(context.Background(), opts)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("created topic: %s\n", resp.ID)
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
    "item": {
      "id": "39304657",
      "title": "我對蘋果的看法",
      "topic_type": "article",
      "tickers": ["AAPL.US"],
      "hashtags": ["earnings"],
      "created_at": "1742000000"
    }
  }
}
```

### Response Status

| Status | Description | Schema                                                |
| ------ | ----------- | ----------------------------------------------------- |
| 200    | 返回成功    | [create_topic_response](#schemacreate_topic_response) |
| 500    | 內部錯誤    | None                                                  |

## Schemas

### create_topic_response

<a id="schemacreate_topic_response"></a>

| Name        | Type     | Required | Description                    |
| ----------- | -------- | -------- | ------------------------------ |
| id          | string   | true     | 新建討論 ID                    |
| title       | string   | false    | 標題                           |
| topic_type  | string   | false    | 內容類型，`article` 或 `post`  |
| tickers     | string[] | false    | 關聯標的代碼                   |
| hashtags    | string[] | false    | 討論標籤名稱列表               |
| created_at  | string   | true     | 創建時間，Unix 時間戳（秒）    |
