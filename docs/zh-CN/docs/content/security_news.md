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
| 200    | 返回成功    | [news_response](#schemanews_response)    |
| 500    | 内部错误    | None                                      |

## Schemas

### news_response

<a id="schemanews_response"></a>

| Name  | Type      | Required | Description  |
| ----- | --------- | -------- | ------------ |
| items | object[]  | true     | 资讯列表     |
| ∟ id | string    | true     | 资讯 ID      |
| ∟ title | string  | true     | 标题         |
| ∟ description | string | true  | 摘要/描述    |
| ∟ url | string    | true     | 资讯详情链接 |
| ∟ published_at | string | true | 发布时间，Unix 时间戳（秒） |
| ∟ comments_count | int32 | true | 评论数       |
| ∟ likes_count | int32 | true | 点赞数       |
| ∟ shares_count | int32 | true | 分享数       |
