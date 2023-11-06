---
id: quote_issuer
title: 獲取輪證發行商 ID
slug: issuer
sidebar_position: 13
---

該接口用於獲取輪證發行商 ID 數據 (可每天同步一次)。

:::info

[業務指令](../../socket/biz-command)：`22`

:::

## Request

### Request Example

```python
# 獲取輪證發行商 ID
# https://open.longportapp.com/docs/quote/pull/issuer
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.warrant_issuers()
print(resp)
```

## Response

### Parameters

| Name        | Type     | Description   |
| ----------- | -------- | ------------- |
| issuer_info | object[] | 發行機構信息  |
| ∟ id        | int32    | 機構 ID       |
| ∟ name_cn   | string   | 機構名稱 (简) |
| ∟ name_en   | string   | 機構名稱 (英) |
| ∟ name_hk   | string   | 機構名稱 (繁) |

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

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗   |
| 3          | 301606     | 限流           | 降低請求頻次             |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理 |
