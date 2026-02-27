---
slug: security_news
title: 股票資訊
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

獲取指定股票的資訊列表。

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
| symbol | string | YES      | 股票代碼，使用 `ticker.region` 格式，例如：`APP.US` |

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
        "title": "關於 AppLovin 的市盈率分析",
        "description": "AppLovin Inc.（納斯達克代碼：APP）當前股價為 418.56 美元，反映出 1.42% 的上漲，儘管過去一個月下跌了 24.88%，但過去一年上漲了 31.28%。該公司的市盈率低於軟件行業的平均水平 80.91，暗示可能被低估。",
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
| 500    | 內部錯誤    | None                                      |

## Schemas

### news_response

<a id="schemanews_response"></a>

| Name  | Type      | Required | Description  |
| ----- | --------- | -------- | ------------ |
| items | object[]  | true     | 資訊列表     |
| ∟ id | string    | true     | 資訊 ID      |
| ∟ title | string  | true     | 標題         |
| ∟ description | string | true  | 摘要/描述    |
| ∟ url | string    | true     | 資訊詳情鏈接 |
| ∟ published_at | string | true | 發佈時間，Unix 時間戳（秒） |
| ∟ comments_count | int32 | true | 評論數       |
| ∟ likes_count | int32 | true | 點讚數       |
| ∟ shares_count | int32 | true | 分享數       |
