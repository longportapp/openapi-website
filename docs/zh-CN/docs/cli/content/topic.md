---
title: 'topic'
sidebar_label: 'topic'
sidebar_position: 3
---

# longbridge topic

获取 Longbridge 平台上与某标的相关的社区讨论帖子。

## 基本用法

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

## 示例

### 查看社区讨论

```bash
longbridge topic TSLA.US
# 查看其他标的的讨论
longbridge topic NVDA.US
```

列出与该标的相关的社区帖子，包含标题、摘要及互动数据。

### 阅读帖子完整内容

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

In the prior piece on AI infrastructure, Dolphin Research argued that
the U.S. power shortfall is not a cyclical mismatch but a structural conflict
between surging AI compute and long-lagging energy and grid build-out...
```

使用帖子列表中的 `id` 获取任意帖子的完整正文。

### 筛选高互动帖子

```bash
# 使用 jq 过滤点赞数较高的帖子
longbridge topic TSLA.US --format json | jq '[.[] | select(.likes_count > 10)]'
```

结合 `jq` 筛选讨论最热的帖子。适用于在财报或重大新闻事件前后追踪散户情绪变化。
