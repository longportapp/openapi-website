---
title: 'topic'
sidebar_label: 'topic'
sidebar_position: 3
---

# longbridge topic

Fetch community discussion topics related to a symbol from the Longbridge platform.

## Basic Usage

```bash
longbridge topic TSLA.US
```

```
| id       | title                                           | published_at         | likes | comments | shares |
|----------|-------------------------------------------------|----------------------|-------|----------|--------|
| 39798312 | AI's Hard Limit: Compute Boom Meets a Power Cr… | 2026-04-09T11:32:03Z | 41    | 7        | 97     |
| 39816927 | Tesla is weirdly terrible. Other stocks are up… | 2026-04-09T19:54:50Z | 6     | 4        | 0      |
| 39822930 | What does everyone think about current Tesla?   | 2026-04-10T04:43:49Z | 0     | 0        | 0      |
...
```

## Examples

### View community discussions

```bash
longbridge topic TSLA.US
# View discussions for another symbol
longbridge topic NVDA.US
```

Lists community posts and discussions related to the symbol, including titles, descriptions, and engagement metrics.

### Read the full content of a post

```bash
longbridge topic detail 39798312
```

```
ID:       39798312
Type:     article
Title:    AI's Hard Limit: Compute Boom Meets a Power Crunch; Gas Turbines the Hidden Boss?
Tickers:  ST/US/TSLA, ST/US/NVDA, ST/US/GOOG
Stats:    42 likes  7 comments  0 views
Created:  2026-04-09T11:32:03Z
URL:      https://longbridge.cn/topics/39798312

In the prior piece 'AI竞赛终局：电力说了算？', Dolphin Research argued that
the U.S. power shortfall is not a cyclical mismatch but a structural conflict
between surging AI compute and long-lagging energy and grid build-out...
```

Use the `id` from the topic list to fetch the full body text of any post.

### Find high-engagement posts

```bash
# Filter posts with significant likes using jq
longbridge topic TSLA.US --format json | jq '[.[] | select(.likes_count > 10)]'
```

Combines with `jq` to surface the most-discussed posts. Useful for gauging retail sentiment spikes around earnings or news events.
