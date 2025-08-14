---
id: quote_unsubscribe
title: 取消訂閱行情數據
slug: unsubscribe
sidebar_position: 2
---

該接口用於取消訂閱標的行情數據。

<SDKLinks module="quote" klass="QuoteContext" method="unsubscribe" />

:::info

[業務指令](../../socket/biz-command)：`7`

:::

## Request

### Parameters

| Name      | Type     | Required | Description                                                                                                          |
| --------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| symbol    | string[] | 是       | 訂閱的標的代碼，例如：`[700.HK]` <br /><br />**校驗規則：**<br />每次請求支持傳入的標的數量上限是 `500` 個           |
| sub_type  | int32[]  | 是       | 訂閱的數據類型，例如：`[1,2]`，詳見 [SubType](../objects#subtype---訂閱數據的類型)                                   |
| unsub_all | bool     | 是       | 是否全部取消。 <br />- `symbol` 為空時，取消所有標的的訂閱。 <br />- `symbol` 不為空時，取消這些標的的所有類型訂閱。 |

### Protobuf

```protobuf
message UnsubscribeRequest {
  repeated string symbol = 1;
  repeated SubType sub_type = 2;
  bool unsub_all = 3;
}
```

### Request Example

```python
# 取消訂閱行情數據
#
# 訂閱行情數據請檢查“開發者中心“ - “行情權限”是否正確
# https://open.longportapp.com/account
#
# - 港股 - BMP 基礎報價，無實時行情推送，無法用 WebSocket 訂閱
# - 美股 - LV1 納斯達克最優報價 (只限 OpenAPI）
#
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from longport.openapi import QuoteContext, Config, SubType
config = Config.from_env()
ctx = QuoteContext(config)

ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Quote])
ctx.unsubscribe(["AAPL.US"], [SubType.Quote])
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
