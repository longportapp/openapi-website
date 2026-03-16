---
slug: topics
title: 股票討論
sidebar_position: 2
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

獲取指定股票的討論列表。

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
| symbol | string | YES      | 股票代碼，使用 `ticker.region` 格式，例如：`AAPL.US` |

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
        "title": "AppLovin 財報後討論",
        "description": "社區對 Q1 業績的解讀與觀點匯總。",
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
| 500    | 內部錯誤    | None                                          |

## Schemas

### topics_response

<a id="schematopics_response"></a>

| Name  | Type      | Required | Description  |
| ----- | --------- | -------- | ------------ |
| items | object[]  | true     | 討論列表     |
| ∟ id | string    | true     | 討論 ID      |
| ∟ title | string  | true     | 標題         |
| ∟ description | string | true  | 摘要/描述    |
| ∟ url | string    | true     | 討論詳情鏈接 |
| ∟ published_at | string | true | 發佈時間，Unix 時間戳（秒） |
| ∟ comments_count | int32 | true | 評論數       |
| ∟ likes_count | int32 | true | 點讚數       |
| ∟ shares_count | int32 | true | 分享數       |
