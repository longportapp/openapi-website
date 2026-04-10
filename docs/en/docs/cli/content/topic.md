---
title: 'topic'
sidebar_label: 'topic'
sidebar_position: 3
---

# longbridge topic

Fetch community discussion topics related to a symbol from the Longbridge platform.

## Basic Usage

<CliCommand>
longbridge topic TSLA.US
</CliCommand>

## Scenarios

### View community discussions

<CliCommand>
longbridge topic TSLA.US
# View discussions for another symbol
longbridge topic NVDA.US
</CliCommand>

Lists community posts and discussions related to the symbol, including titles, descriptions, and engagement metrics.

### JSON output

<CliCommand>
longbridge topic TSLA.US --format json
</CliCommand>

```json
[
  { "comments_count": 7, "description": "Who has the winning power-delivery solution for AI data centers?", "id": "39798312", "likes_count": 41, "published_at": 1775734323, "shares_count": 96, "title": "AI's Hard Limit: Compute Boom Meets a Power Crunch; Gas Turbines the Hidden Boss?", "url": "https://longbridge.cn/topics/39798312" },
  { "comments_count": 0, "description": "TSLA.US short comment from community user", "id": "39820569", "likes_count": 1, "published_at": 1775788293, "shares_count": 0, "title": "", "url": "https://longbridge.cn/topics/39820569" }
]
```

Each topic includes `comments_count`, `likes_count`, and `shares_count` for engagement data, and a `url` linking to the full discussion on the Longbridge platform.
