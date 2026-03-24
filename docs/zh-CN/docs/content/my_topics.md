---
slug: my-topics
title: 获取我发布的讨论
sidebar_position: 3
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

获取我发布的讨论列表，支持分页与类型过滤。

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/topics/mine</td></tr>
</tbody>
</table>

### Query Parameters

| Name        | Type   | Required | Description                                                                    |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------ |
| page        | int32  | NO       | 页码，默认 1                                                                   |
| size        | int32  | NO       | 每页数量，范围 1~50，默认 25                                                   |
| topic_type  | string | NO       | 类型过滤，可选 `article`（长文）、`post`（短帖），不传返回全部                  |

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
        "title": "我对苹果的分析",
        "description": "文章摘要...",
        "body": "Markdown 正文内容...",
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
          "name": "张三",
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

| Status | Description | Schema                                            |
| ------ | ----------- | ------------------------------------------------- |
| 200    | 返回成功    | [my_topics_response](#schemamy_topics_response)   |
| 500    | 内部错误    | None                                              |

## Schemas

### my_topics_response

<a id="schemamy_topics_response"></a>

| Name                | Type     | Required | Description                                                       |
| ------------------- | -------- | -------- | ----------------------------------------------------------------- |
| items               | object[] | true     | 讨论列表                                                          |
| ∟ id                | string   | true     | 讨论 ID                                                           |
| ∟ title             | string   | false    | 标题（短帖可能为空）                                              |
| ∟ description       | string   | false    | 纯文本摘要                                                        |
| ∟ body              | string   | false    | Markdown 格式正文                                                 |
| ∟ topic_type        | string   | true     | 内容类型，`article`（长文）或 `post`（短帖）                       |
| ∟ tickers           | string[] | false    | 关联标的代码，如 `["AAPL.US", "700.HK"]`                         |
| ∟ hashtags          | string[] | false    | 讨论标签名称列表                                                  |
| ∟ images            | object[] | false    | 附图列表                                                          |
| ∟∟ url              | string   | false    | 原始图片 URL                                                      |
| ∟∟ sm               | string   | false    | 小缩略图 URL                                                      |
| ∟∟ lg               | string   | false    | 大缩略图 URL                                                      |
| ∟ likes_count       | int32    | false    | 点赞数                                                            |
| ∟ comments_count    | int32    | false    | 评论数                                                            |
| ∟ views_count       | int32    | false    | 浏览数                                                            |
| ∟ shares_count      | int32    | false    | 分享数                                                            |
| ∟ license           | int32    | false    | 版权声明，`0`=无声明，`1`=原创，`2`=非原创                        |
| ∟ detail_url        | string   | false    | 讨论详情页链接                                                    |
| ∟ author            | object   | false    | 作者信息                                                          |
| ∟∟ member_id        | string   | false    | 作者 member ID                                                    |
| ∟∟ name             | string   | false    | 作者昵称                                                          |
| ∟∟ avatar           | string   | false    | 作者头像 URL                                                      |
| ∟ created_at        | string   | true     | 创建时间，Unix 时间戳（秒）                                       |
| ∟ updated_at        | string   | false    | 最后更新时间，Unix 时间戳（秒）                                   |
