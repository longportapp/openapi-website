---
slug: filings
title: 股票公告
sidebar_position: 3
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

获取指定股票的公告列表。

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/{symbol}/filings</td></tr>
</tbody>
</table>

### Path Parameters

| Name   | Type   | Required | Description                                    |
| ------ | ------ | -------- | ---------------------------------------------- |
| symbol | string | YES      | 股票代码，使用 `ticker.region` 格式，例如：`APP.US` |

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
        "title": "2024 年第一季度财报",
        "description": "第一季度营收与利润摘要",
        "file_name": "10-Q_2024_Q1.pdf",
        "file_urls": ["https://example.com/file1.pdf", "https://example.com/file2.pdf"],
        "publish_at": "1750746101"
      }
    ]
  }
}
```

### Response Status

| Status | Description | Schema                                      |
| ------ | ----------- | ------------------------------------------- |
| 200    | 返回成功    | [filings_response](#schemafilings_response) |
| 500    | 内部错误    | None                                        |

## Schemas

### filings_response

<a id="schemafilings_response"></a>

| Name  | Type      | Required | Description  |
| ----- | --------- | -------- | ------------ |
| items | object[]  | true     | 公告列表     |
| ∟ id | string    | true     | 公告 ID      |
| ∟ title | string  | true     | 标题         |
| ∟ description | string | true  | 摘要         |
| ∟ file_name | string | true | 文件名       |
| ∟ file_urls | string[] | true | 文件链接列表 |
| ∟ publish_at | string | true | 发布时间，Unix 时间戳（秒） |
