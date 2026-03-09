---
slug: topics
title: 股票讨论
sidebar_position: 2
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

获取指定股票的讨论列表。

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/{symbol}/topics</td></tr>
</tbody>
</table>

### Path Parameters

| Name   | Type   | Required | Description                                    |
| ------ | ------ | -------- | ---------------------------------------------- |
| symbol | string | YES      | 股票代码，使用 `ticker.region` 格式，例如：`APP.US` |

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
        "title": "AppLovin 财报后讨论",
        "description": "社区对 Q1 业绩的解读与观点汇总。",
        "url": "https://longbridge.com/topics/277062200",
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

| Status | Description | Schema                                        |
| ------ | ----------- | --------------------------------------------- |
| 200    | 返回成功    | [topics_response](#schematopics_response)    |
| 500    | 内部错误    | None                                          |

## Schemas

### topics_response

<a id="schematopics_response"></a>

| Name  | Type      | Required | Description  |
| ----- | --------- | -------- | ------------ |
| items | object[]  | true     | 讨论列表     |
| ∟ id | string    | true     | 讨论 ID      |
| ∟ title | string  | true     | 标题         |
| ∟ description | string | true  | 摘要/描述    |
| ∟ url | string    | true     | 讨论详情链接 |
| ∟ published_at | string | true | 发布时间，Unix 时间戳（秒） |
| ∟ comments_count | int32 | true | 评论数       |
| ∟ likes_count | int32 | true | 点赞数       |
| ∟ shares_count | int32 | true | 分享数       |
