---
slug: create-topic
title: Create Topic
sidebar_position: 4
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

Create a new community topic (long-form article or short post).

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>POST</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/topics</td></tr>
</tbody>
</table>

### Request Body

| Name        | Type     | Required | Description                                                                                                |
| ----------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| title       | string   | YES      | Topic title                                                                                                |
| body        | string   | YES      | Topic body in Markdown format                                                                              |
| topic_type  | string   | NO       | Topic type. `article` (long-form with title) or `post` (short post, default)                               |
| tickers     | string[] | NO       | Associated security symbols, format `{symbol}.{market}` (e.g. `["AAPL.US", "700.HK"]`). Maximum 10.      |
| hashtags    | string[] | NO       | Associated hashtag names (e.g. `["earnings", "fed"]`). Maximum 5.                                         |
| license     | int32    | NO       | Copyright declaration. `0` = none (default), `1` = original, `2` = non-original.                          |

### Request Example

```shell
curl -L \
  -X POST \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My View on AAPL","body":"Apple reported strong earnings...","topic_type":"article","tickers":["AAPL.US"],"hashtags":["earnings"],"license":1}' \
  "https://openapi.longbridge.com/content/topics"
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
    "id": "39304657",
    "title": "My View on AAPL",
    "topic_type": "article",
    "tickers": ["AAPL.US"],
    "hashtags": ["earnings"],
    "created_at": "1742000000"
  }
}
```

### Response Status

| Status | Description    | Schema                                              |
| ------ | -------------- | --------------------------------------------------- |
| 200    | Success        | [create_topic_response](#schemacreate_topic_response) |
| 500    | Internal error | None                                                |

## Schemas

### create_topic_response

<a id="schemacreate_topic_response"></a>

| Name        | Type     | Required | Description                                       |
| ----------- | -------- | -------- | ------------------------------------------------- |
| id          | string   | true     | ID of the newly created topic                     |
| title       | string   | false    | Topic title                                       |
| topic_type  | string   | false    | Topic type. One of `article`, `post`              |
| tickers     | string[] | false    | Associated security symbols                       |
| hashtags    | string[] | false    | Associated hashtag names                          |
| created_at  | string   | true     | Unix timestamp (seconds) when the topic was created |
