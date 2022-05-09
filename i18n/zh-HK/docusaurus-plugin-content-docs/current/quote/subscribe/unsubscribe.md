---
id: quote_unsubscribe
title: 取消訂閱行情數據
slug: unsubscribe
sidebar_position: 3
---

該接口用於取消訂閱標的行情數據。

:::info

[業務指令](../../socket/protocol/request)：`7`

:::

## Request

### Parameters

| Name      | Type     | Required | Description                                                                                                          |
| --------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| symbol    | string[] | 是       | 訂閱的標的代碼，例如：`[00700.HK]` <br /><br />**校驗規則：**<br />每次請求支持傳入的標的數量上限是 `500` 個         |
| sub_type  | int32[]  | 是       | 訂閱的數據類型，例如：`[1,2]`，詳見 [SubType](../objects#subtype---訂閱數據的類型)                                   |
| unsub_all | bool     | 是       | 是否全部取消。 <br />- `symbol` 為空時，取消所有標的的訂閱。 <br />- `symbol` 不為空時，取消這些標的的所有類型訂閱。 |

### Protobuf

```protobuf
message SubscribeRequest {
  repeated string symbol = 1;
  repeated SubType sub_type = 2;
  bool unsub_all = 3;
}
```

## Response

### Protobuf

```protobuf
message UnsubscribeResponse{
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗   |
| 3          | 301606     | 限流           | 降低請求頻次             |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理 |
| 7          | 301600     | 請求參數有誤   | 檢查請求的 `sub_type`    |
