---
id: quote_optionchain_date
title: 獲取標的的期權鏈到期日列表
slug: optionchain-date
sidebar_position: 11
---

該接口用於獲取標的的期權鏈到期日列表。

<SDKLinks module="quote" klass="QuoteContext" method="option_chain_expiry_date_list" />

:::info

[業務指令](../../socket/biz-command)：`20`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                         |
| ------ | ------ | -------- | --------------------------------------------------- |
| symbol | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如：`700.HK` |

### Protobuf

```protobuf
message SecurityRequest {
  string symbol = 1;
}
```

### Request Example

```python
# 獲取標的的期權鏈到期日列表
# https://open.longbridge.com/docs/quote/pull/optionchain-date
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“Longbridge”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.option_chain_expiry_date_list("AAPL.US")
print(resp)
```

## Response

### Response Properties

| Name        | Type     | Description                                    |
| ----------- | -------- | ---------------------------------------------- |
| expiry_date | string[] | 標的對應的期權鏈到期日列表，使用 `YYMMDD` 格式 |

### Protobuf

```protobuf
message OptionChainDateListResponse {
  repeated string expiry_date = 1;
}
```

### Response JSON Example

```json
{
  "expiry_date": [
    "20220422",
    "20220429",
    "20220506",
    "20220513",
    "20220520",
    "20220527",
    "20220603",
    "20220617",
    "20220715",
    "20220819",
    "20220916",
    "20221021",
    "20221118",
    "20230120",
    "20230317",
    "20230616",
    "20230915",
    "20240119",
    "20240621"
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗       |
| 3          | 301606     | 限流           | 降低請求頻次                 |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理     |
| 7          | 301600     | 請求標的不存在 | 檢查請求的 `symbol` 是否正確 |
