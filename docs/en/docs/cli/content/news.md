---
title: 'news'
sidebar_label: 'news'
sidebar_position: 1
---

# longbridge news

Get latest news articles for a symbol, or fetch the full content of an article by ID.

## Basic Usage

<CliCommand>
longbridge news TSLA.US
</CliCommand>

## Scenarios

### Latest news for a stock

<CliCommand>
longbridge news TSLA.US
# Get more articles
longbridge news NVDA.US --count 5
</CliCommand>

Lists the most recent news articles for the symbol with titles, publication times, and URLs.

### JSON output for processing

<CliCommand>
longbridge news TSLA.US --format json
</CliCommand>

```json
[
  { "comments_count": 7, "id": "39798312", "likes_count": 41, "published_at": 1775734323, "title": "AI's Hard Limit: Compute Boom Meets a Power Crunch; Gas Turbines the Hidden Boss?", "url": "https://longbridge.cn/topics/39798312" },
  { "comments_count": 0, "id": "282276051", "likes_count": 0, "published_at": 1775787387, "title": "In response to market rumors that 'Tesla is developing a brand new...'", "url": "https://longbridge.cn/news/282276051" }
]
```

### Get full article content

<CliCommand>
longbridge news detail 282276051
</CliCommand>

Fetches the full Markdown content of a single article by its ID. Article IDs are available in the `id` field of the list output.
