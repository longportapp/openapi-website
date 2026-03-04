---
slug: filings
title: Filings
sidebar_position: 2
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

Get the filings list for a specified security.

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/content/{symbol}/filings</td></tr>
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
        "title": "2024 Q1 Earnings Report",
        "description": "Q1 revenue and profit summary",
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
| 200    | Success     | [filings_response](#schemafilings_response) |
| 500    | Internal error | None                                      |

## Schemas

### filings_response

<a id="schemafilings_response"></a>

| Name  | Type      | Required | Description        |
| ----- | --------- | -------- | ------------------ |
| items | object[]  | true     | Filings list       |
| ∟ id | string    | true     | File ID            |
| ∟ title | string  | true     | Title               |
| ∟ description | string | true  | Summary             |
| ∟ file_name | string | true | File name           |
| ∟ file_urls | string[] | true | List of file URLs   |
| ∟ publish_at | string | true | Publish time, Unix timestamp (seconds) |
