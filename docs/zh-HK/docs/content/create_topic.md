---
slug: create-topic
title: 創建討論
sidebar_position: 4
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

創建一篇新討論（長文或短帖）。

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>POST</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/topics</td></tr>
</tbody>
</table>

### Request Body

| Name        | Type     | Required | Description                                                                                           |
| ----------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| title       | string   | YES      | 標題                                                                                                  |
| body        | string   | YES      | 正文，Markdown 格式                                                                                   |
| topic_type  | string   | NO       | 內容類型，`article`（長文，有標題）或 `post`（短帖，默認）                                              |
| tickers     | string[] | NO       | 關聯標的代碼，格式 `{symbol}.{market}`，如 `["AAPL.US", "700.HK"]`，最多 10 個                        |
| hashtags    | string[] | NO       | 討論標籤名稱列表，如 `["earnings", "fed"]`，最多 5 個                                                  |
| license     | int32    | NO       | 版權聲明，`0`=無聲明（默認），`1`=原創，`2`=非原創                                                     |

### Request Example

```shell
curl -L \
  -X POST \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"我對蘋果的看法","body":"蘋果公布了強勁的財報...","topic_type":"article","tickers":["AAPL.US"],"hashtags":["earnings"],"license":1}' \
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
    "title": "我對蘋果的看法",
    "topic_type": "article",
    "tickers": ["AAPL.US"],
    "hashtags": ["earnings"],
    "created_at": "1742000000"
  }
}
```

### Response Status

| Status | Description | Schema                                                |
| ------ | ----------- | ----------------------------------------------------- |
| 200    | 返回成功    | [create_topic_response](#schemacreate_topic_response) |
| 500    | 內部錯誤    | None                                                  |

## Schemas

### create_topic_response

<a id="schemacreate_topic_response"></a>

| Name        | Type     | Required | Description                    |
| ----------- | -------- | -------- | ------------------------------ |
| id          | string   | true     | 新建討論 ID                    |
| title       | string   | false    | 標題                           |
| topic_type  | string   | false    | 內容類型，`article` 或 `post`  |
| tickers     | string[] | false    | 關聯標的代碼                   |
| hashtags    | string[] | false    | 討論標籤名稱列表               |
| created_at  | string   | true     | 創建時間，Unix 時間戳（秒）    |
