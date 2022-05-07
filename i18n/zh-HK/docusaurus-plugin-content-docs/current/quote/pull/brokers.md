---
id: quote_brokers
title: 獲取標的經紀隊列
slug: brokers
sidebar_position: 6
---

該接口用於獲取標的的實時經紀隊列數據。

:::info
[業務指令](../../socket/protocol/request)：`15`
:::

## Request

### Parameters

| Name   | Type   | Required | Description                                          |
| ------ | ------ | -------- | ---------------------------------------------------- |
| symbol | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如： `700.HK` |

### Protobuf

```protobuf
message SecurityRequest {
  string symbol = 1;
}
```

## Response

### Response Properties

| Name         | Type     | Description                                               |
| ------------ | -------- | --------------------------------------------------------- |
| symbol       | string   | 標的代碼                                                  |
| ask_brokers  | object[] | 賣槃經紀隊列                                              |
| ∟ position   | int32    | 檔位                                                      |
| ∟ broker_ids | int32[]  | 券商席位 ID，通过[獲取券商席位 ID ](./broker-ids)接口獲取 |
| bid_brokers  | object[] | 買槃經紀隊列                                              |
| ∟ position   | int32    | 檔位                                                      |
| ∟ broker_ids | int32[]  | 券商席位 ID，通过[獲取券商席位 ID ](./broker-ids)接口獲取 |

### Protobuf

```protobuf
message SecurityBrokersResponse {
  string symbol = 1;
  repeated Brokers ask_brokers = 2;
  repeated Brokers bid_brokers = 3;
}

message Brokers {
  int32 position = 1;
  repeated int32 broker_ids = 2;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "ask_brokers": [
    {
      "position": 1,
      "broker_ids": [7358, 9057, 9028, 7364]
    },
    {
      "position": 2,
      "broker_ids": [6968, 3448, 3348, 1049, 4973, 6997, 3448, 5465, 6997]
    }
  ],
  "bid_brokers": [
    {
      "position": 1,
      "broker_ids": [6996, 5465, 8026, 8304, 4978]
    },
    {
      "position": 2
    }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗       |
| 3          | 301606     | 限流           | 降低請求頻次                 |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理     |
| 7          | 301600     | 請求標的不存在 | 检查请求的 `symbol` 是否正确 |
| 7          | 301603     | 標的無行情     | 標的沒有請求的行情數據       |
| 7          | 301604     | 無權限         | 沒有獲取標的行情的權限       |
