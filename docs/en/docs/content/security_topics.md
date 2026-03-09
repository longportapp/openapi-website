---
slug: topics
title: Topic
sidebar_position: 2
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

Get the topic/discussion list for a specified security.

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/{symbol}/topics</td></tr>
</tbody>
</table>

### Path Parameters

| Name   | Type   | Required | Description                                         |
| ------ | ------ | -------- | --------------------------------------------------- |
| symbol | string | YES      | Stock symbol, use `ticker.region` format, e.g. `APP.US` |

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
        "title": "AppLovin Post-Earnings Discussion",
        "description": "Community takeaways and views on Q1 results.",
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
| 200    | Success     | [topics_response](#schematopics_response)     |
| 500    | Internal error | None                                        |

## Schemas

### topics_response

<a id="schematopics_response"></a>

| Name  | Type      | Required | Description        |
| ----- | --------- | -------- | ------------------ |
| items | object[]  | true     | Topic list         |
| ∟ id | string    | true     | Topic ID           |
| ∟ title | string  | true     | Title               |
| ∟ description | string | true  | Summary/description |
| ∟ url | string    | true     | Detail page URL     |
| ∟ published_at | string | true | Published time, Unix timestamp (seconds) |
| ∟ comments_count | int32 | true | Comment count      |
| ∟ likes_count | int32 | true | Like count         |
| ∟ shares_count | int32 | true | Share count        |
