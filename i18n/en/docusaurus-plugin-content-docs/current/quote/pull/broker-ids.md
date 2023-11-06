---
id: quote_broker_ids
title: Get Broker IDs
slug: broker-ids
sidebar_position: 7
---

This API is used to obtain participant IDs data (which can be synchronized once a day).

:::info
[Business Command](../../socket/biz-command): `16`
:::

## Request

### Request Example

```python
# Get Broker IDs
# https://open.longportapp.com/docs/quote/pull/broker-ids
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.participants()
print(resp)
```

## Response

### Response Properties

| Name                       | Type     | Description              |
| -------------------------- | -------- | ------------------------ |
| participant_broker_numbers | object[] | participant data         |
| ∟ broker_ids               | int32[]  | broker IDs               |
| ∟ participant_name_cn      | string   | participant name (zh-CN) |
| ∟ participant_name_en      | string   | participant name (en)    |
| ∟ participant_name_hk      | string   | participant name (zh-HK) |

### Protobuf

```protobuf
message ParticipantBrokerIdsResponse {
  repeated ParticipantInfo participant_broker_numbers = 1;
}

message ParticipantInfo {
  repeated int32 broker_ids = 1;
  string participant_name_cn = 2;
  string participant_name_en = 3;
  string participant_name_hk = 4;
}
```

### Response JSON Example

```json
{
  "participant_broker_numbers": [
    {
      "broker_ids": [7738, 7739],
      "participant_name_cn": "华兴金融 (香港)",
      "participant_name_en": "China Renaissance(HK)",
      "participant_name_hk": "華興金融 (香港)"
    },
    {
      "broker_ids": [6390, 6396, 6398, 6399],
      "participant_name_cn": "国信 (香港)",
      "participant_name_en": "Guosen(HK)",
      "participant_name_hk": "國信 (香港)"
    },
    {
      "broker_ids": [3168, 3169],
      "participant_name_cn": "泰嘉",
      "participant_name_en": "Tiger",
      "participant_name_hk": "泰嘉"
    }
  ]
}
```

## Error Code

| Proto Error Code | Business Error Code | Descrption         | Troubleshooting Suggestions                                   |
| ---------------- | ------------------- | ------------------ | ------------------------------------------------------------- |
| 3                | 301600              | Invalid request    | Invalid request parameters or unpacking request failed        |
| 3                | 301606              | Request rate limit | Reduce the frequency of requests                              |
| 7                | 301602              | Server error       | Please try again or contact a technician to resolve the issue |
