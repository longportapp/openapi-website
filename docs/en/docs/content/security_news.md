---
slug: news
title: News
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

Get the news list for a specified security.

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/{symbol}/news</td></tr>
</tbody>
</table>

### Path Parameters

| Name   | Type   | Required | Description                                         |
| ------ | ------ | -------- | --------------------------------------------------- |
| symbol | string | YES      | Stock symbol, use `ticker.region` format, e.g. `AAPL.US` |

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
        "title": "P/E Ratio Insights for AppLovin",
        "description": "AppLovin Inc. (NASDAQ:APP) shares are currently priced at $418.56, reflecting a 1.42% increase, despite a 24.88% decline over the past month and a 31.28% rise over the past year.",
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
| 200    | Success     | [news_response](#schemanews_response)     |
| 500    | Internal error | None                                    |

## Schemas

### news_response

<a id="schemanews_response"></a>

| Name  | Type      | Required | Description        |
| ----- | --------- | -------- | ------------------ |
| items | object[]  | true     | News list          |
| ∟ id | string    | true     | News ID            |
| ∟ title | string  | true     | Title               |
| ∟ description | string | true  | Summary/description |
| ∟ url | string    | true     | Detail page URL     |
| ∟ published_at | string | true | Published time, Unix timestamp (seconds) |
| ∟ comments_count | int32 | true | Comment count      |
| ∟ likes_count | int32 | true | Like count         |
| ∟ shares_count | int32 | true | Share count        |