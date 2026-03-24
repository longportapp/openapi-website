---
slug: my-topics
title: 獲取我發布的討論
sidebar_position: 3
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

獲取我發布的討論列表，支持分頁與類型過濾。

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
| page        | int32  | NO       | 頁碼，默認 1                                                                   |
| size        | int32  | NO       | 每頁數量，範圍 1~50，默認 25                                                   |
| topic_type  | string | NO       | 類型過濾，可選 `article`（長文）、`post`（短帖），不傳返回全部                  |

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
        "title": "我對蘋果的分析",
        "description": "文章摘要...",
        "body": "Markdown 正文內容...",
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
          "name": "張三",
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
| 500    | 內部錯誤    | None                                              |

## Schemas

### my_topics_response

<a id="schemamy_topics_response"></a>

| Name                | Type     | Required | Description                                                       |
| ------------------- | -------- | -------- | ----------------------------------------------------------------- |
| items               | object[] | true     | 討論列表                                                          |
| ∟ id                | string   | true     | 討論 ID                                                           |
| ∟ title             | string   | false    | 標題（短帖可能為空）                                              |
| ∟ description       | string   | false    | 純文本摘要                                                        |
| ∟ body              | string   | false    | Markdown 格式正文                                                 |
| ∟ topic_type        | string   | true     | 內容類型，`article`（長文）或 `post`（短帖）                       |
| ∟ tickers           | string[] | false    | 關聯標的代碼，如 `["AAPL.US", "700.HK"]`                         |
| ∟ hashtags          | string[] | false    | 討論標籤名稱列表                                                  |
| ∟ images            | object[] | false    | 附圖列表                                                          |
| ∟∟ url              | string   | false    | 原始圖片 URL                                                      |
| ∟∟ sm               | string   | false    | 小縮略圖 URL                                                      |
| ∟∟ lg               | string   | false    | 大縮略圖 URL                                                      |
| ∟ likes_count       | int32    | false    | 點讚數                                                            |
| ∟ comments_count    | int32    | false    | 評論數                                                            |
| ∟ views_count       | int32    | false    | 瀏覽數                                                            |
| ∟ shares_count      | int32    | false    | 分享數                                                            |
| ∟ license           | int32    | false    | 版權聲明，`0`=無聲明，`1`=原創，`2`=非原創                        |
| ∟ detail_url        | string   | false    | 討論詳情頁連結                                                    |
| ∟ author            | object   | false    | 作者信息                                                          |
| ∟∟ member_id        | string   | false    | 作者 member ID                                                    |
| ∟∟ name             | string   | false    | 作者昵稱                                                          |
| ∟∟ avatar           | string   | false    | 作者頭像 URL                                                      |
| ∟ created_at        | string   | true     | 創建時間，Unix 時間戳（秒）                                       |
| ∟ updated_at        | string   | false    | 最後更新時間，Unix 時間戳（秒）                                   |
