---
id: quote_broker_ids
title: 获取券商席位 ID
slug: broker-ids
sidebar_position: 7
---

获取券商席位 ID (可每天同步一次)

:::info
协议指令：`16`
:::

## Response

### Response Properties

| Name                       | Type     | Description           |
| -------------------------- | -------- | --------------------- |
| participant_broker_numbers | object[] | 券商席位              |
| ∟ broker_ids               | int32[]  | 券商对应的多个席位 ID |
| ∟ participant_name_cn      | string   | 券商名称 (简)         |
| ∟ participant_name_en      | string   | 券商名称 (英)         |
| ∟ participant_name_hk      | string   | 券商名称 (繁)         |

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

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败   |
| 3          | 301606     | 限流           | 降低请求频次             |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理 |
