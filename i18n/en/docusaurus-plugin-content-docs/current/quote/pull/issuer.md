---
id: quote_issuer
title: Get Warrant Issuer IDs
slug: issuer
sidebar_position: 13
---

This API is used to obtain the warrant issuer IDs data (which can be synchronized once a day).

<SDKLinks module="quote" klass="QuoteContext" method="warrant_issuers" />

:::info

[Business Command](../../socket/biz-command): `22`

:::

## Request

### Request Example

```python
# Get Warrant Issuer IDs
# https://open.longportapp.com/docs/quote/pull/issuer
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.warrant_issuers()
print(resp)
```

## Response

### Parameters

| Name        | Type     | Description         |
| ----------- | -------- | ------------------- |
| issuer_info | object[] | Issuer information  |
| ∟ id        | int32    | Issuer ID           |
| ∟ name_cn   | string   | Issuer Name (zh-CN) |
| ∟ name_en   | string   | Issuer Name (en)    |
| ∟ name_hk   | string   | Issuer Name (zh-HK) |

### Protobuf

```protobuf
message IssuerInfoResponse {
  repeated IssuerInfo issuer_info = 1;
}

message IssuerInfo {
  int32 id = 1;
  string name_cn = 2;
  string name_en = 3;
  string name_hk = 4;
}
```

### Response JSON Example

```json
{
  "issuer_info": [
    {
      "id": 15,
      "name_cn": "瑞银",
      "name_en": "UB",
      "name_hk": "瑞銀"
    },
    {
      "id": 14,
      "name_cn": "汇丰",
      "name_en": "HS",
      "name_hk": "滙豐"
    },
    {
      "id": 12,
      "name_cn": "花旗",
      "name_en": "CT",
      "name_hk": "花旗"
    }
  ]
}
```

## Error Code

| Protocol Error Code | Business Error Code | Description        | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | ------------------ | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request    | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error       | Please try again or contact a technician to resolve the issue |
