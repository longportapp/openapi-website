---
slug: create-topic
title: 创建讨论
sidebar_position: 4
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

创建一篇新讨论（长文或短帖）。

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
| title       | string   | YES      | 标题                                                                                                  |
| body        | string   | YES      | 正文，Markdown 格式                                                                                   |
| topic_type  | string   | NO       | 内容类型，`article`（长文，有标题）或 `post`（短帖，默认）                                              |
| tickers     | string[] | NO       | 关联标的代码，格式 `{symbol}.{market}`，如 `["AAPL.US", "700.HK"]`，最多 10 个                        |
| hashtags    | string[] | NO       | 讨论标签名称列表，如 `["earnings", "fed"]`，最多 5 个                                                  |
| license     | int32    | NO       | 版权声明，`0`=无声明（默认），`1`=原创，`2`=非原创                                                     |

### Request Example

```shell
curl -L \
  -X POST \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"我对苹果的看法","body":"苹果公布了强劲的财报...","topic_type":"article","tickers":["AAPL.US"],"hashtags":["earnings"],"license":1}' \
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
    "title": "我对苹果的看法",
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
| 500    | 内部错误    | None                                                  |

## Schemas

### create_topic_response

<a id="schemacreate_topic_response"></a>

| Name        | Type     | Required | Description                    |
| ----------- | -------- | -------- | ------------------------------ |
| id          | string   | true     | 新建讨论 ID                    |
| title       | string   | false    | 标题                           |
| topic_type  | string   | false    | 内容类型，`article` 或 `post`  |
| tickers     | string[] | false    | 关联标的代码                   |
| hashtags    | string[] | false    | 讨论标签名称列表               |
| created_at  | string   | true     | 创建时间，Unix 时间戳（秒）    |
