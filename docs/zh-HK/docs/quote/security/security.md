---
slug: security_list
title: 獲取標的列表
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

獲取標的列表

<SDKLinks module="quote" klass="QuoteContext" method="security_list" />

### Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/get_security_list</td></tr>
</tbody>
</table>

#### Parameters

> Content-Type: application/json; charset=utf-8

| Name     | Type   | Required | Description                      |
| -------- | ------ | -------- | -------------------------------- |
| market   | string | YES      | 市場，目前只支持 US              |
| category | string | YES      | 市場下分類，目前只支持 Overnight |

#### Request Example

```python
from longport.openapi import QuoteContext, Config, Market, SecurityListCategory

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.security_list(Market.US, SecurityListCategory.Overnight)
print(resp)
```

### Response

#### Response Headers

- Content-Type: application/json

#### Response Example

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "symbol": "BAC.US",
        "name_cn": "美国银行",
        "name_hk": "美國銀行",
        "name_en": "Bank of America"
      },
      {
        "symbol": "RDDT.US",
        "name_cn": "REDDIT INC",
        "name_hk": "REDDIT INC",
        "name_en": "REDDIT INC"
      },
      {
        "symbol": "GOOGL.US",
        "name_cn": "谷歌-A",
        "name_hk": "谷歌-A",
        "name_en": "Alphabet"
      }
    ]
  }
}
```

#### Response Status

| Status | Description | Schema                                      |
| ------ | ----------- | ------------------------------------------- |
| 200    | 返回成功    | [security_response](#get_security_list_rsp) |
| 400    | 參數錯誤    | None                                        |

<aside className="success">
</aside>

## Schemas

### security_response

<a id="get_security_list_rsp"></a>

| Name      | Type     | Required | Description |
| --------- | -------- | -------- | ----------- |
| list      | object[] | false    | 列表        |
| ∟ symbol  | integer  | true     | 標的代碼    |
| ∟ name_cn | string   | true     | 中文名稱    |
| ∟ name_hk | string   | true     | 繁體名稱    |
| ∟ name_en | string   | true     | 英文名稱    |

## 錯誤碼

| 業務錯誤碼 | 描述           | 排查建議                 |
| ---------- | -------------- | ------------------------ |
| 310010     | 無效的請求     | 請求參數有誤             |
| 310011     | 服務端內部錯誤 | 請重試或聯絡技術人員處理 |
