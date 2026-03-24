---
slug: my-topics
title: Get My Published Topics
sidebar_position: 3
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

Get the list of topics I have published.

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/topics/mine</td></tr>
</tbody>
</table>

### Query Parameters

| Name        | Type   | Required | Description                                                                                  |
| ----------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| page        | int32  | NO       | Page number (1-based). Defaults to `1`.                                                      |
| size        | int32  | NO       | Number of items per page, range 1–50. Defaults to `25`.                                      |
| topic_type  | string | NO       | Filter by type. One of `article` (long-form), `post` (short post). Omit to return all types. |

### Request Example

```shell
curl -L \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  "https://openapi.longbridge.com/content/topics/mine?page=1&size=25"
```

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
        "id": "39304657",
        "title": "My Analysis on AAPL",
        "description": "A brief summary of my article...",
        "body": "Full markdown content here...",
        "topic_type": "article",
        "tickers": ["AAPL.US"],
        "hashtags": ["earnings"],
        "images": [],
        "likes_count": 12,
        "comments_count": 3,
        "views_count": 200,
        "shares_count": 1,
        "license": 1,
        "detail_url": "https://longbridge.com/topics/39304657",
        "author": {
          "member_id": "10086",
          "name": "John",
          "avatar": "https://example.com/avatar.jpg"
        },
        "created_at": "1742000000",
        "updated_at": "1742000000"
      }
    ]
  }
}
```

### Response Status

| Status | Description    | Schema                                            |
| ------ | -------------- | ------------------------------------------------- |
| 200    | Success        | [my_topics_response](#schemamy_topics_response)   |
| 500    | Internal error | None                                              |

## Schemas

### my_topics_response

<a id="schemamy_topics_response"></a>

| Name                | Type     | Required | Description                                                              |
| ------------------- | -------- | -------- | ------------------------------------------------------------------------ |
| items               | object[] | true     | Topic list                                                               |
| ∟ id                | string   | true     | Topic ID                                                                 |
| ∟ title             | string   | false    | Topic title (may be empty for short posts)                               |
| ∟ description       | string   | false    | Plain-text summary of the topic body                                     |
| ∟ body              | string   | false    | Full topic body in Markdown format                                       |
| ∟ topic_type        | string   | true     | Topic type. One of `article`, `post`                                     |
| ∟ tickers           | string[] | false    | Associated security symbols (e.g. `["AAPL.US", "700.HK"]`)              |
| ∟ hashtags          | string[] | false    | Associated hashtag names                                                 |
| ∟ images            | object[] | false    | Images attached to the topic                                             |
| ∟∟ url              | string   | false    | Original image URL                                                       |
| ∟∟ sm               | string   | false    | Small thumbnail URL                                                      |
| ∟∟ lg               | string   | false    | Large thumbnail URL                                                      |
| ∟ likes_count       | int32    | false    | Number of likes                                                          |
| ∟ comments_count    | int32    | false    | Number of comments                                                       |
| ∟ views_count       | int32    | false    | Number of views                                                          |
| ∟ shares_count      | int32    | false    | Number of shares                                                         |
| ∟ license           | int32    | false    | Copyright declaration. `0` = none, `1` = original, `2` = non-original   |
| ∟ detail_url        | string   | false    | Link to the topic detail page                                            |
| ∟ author            | object   | false    | Author information                                                       |
| ∟∟ member_id        | string   | false    | Author member ID                                                         |
| ∟∟ name             | string   | false    | Author display name                                                      |
| ∟∟ avatar           | string   | false    | Author avatar URL                                                        |
| ∟ created_at        | string   | true     | Unix timestamp (seconds) when the topic was created                      |
| ∟ updated_at        | string   | false    | Unix timestamp (seconds) when the topic was last updated                 |
