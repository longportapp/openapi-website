---
id: quote_optionchain_date_strike
title: 獲取標的的期權鏈到期日期權標的列表
slug: optionchain-date-strike
sidebar_position: 12
---

該接口用於獲取標的的期權鏈到期日期權標的列表。

<SDKLinks module="quote" klass="QuoteContext" method="option_chain_info_by_date" />

:::info

[業務指令](../../socket/biz-command)：`21`

:::

## Request

### Parameters

| Name        | Type   | Required | Description                                                                                         |
| ----------- | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| symbol      | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如：`700.HK`                                                 |
| expiry_date | string | 是       | 期權到期日，使用 `YYMMDD` 格式，例如：`20220429`，通過 [期權到期日](./optionchain_date.md) 接口獲取 |

### Protobuf

```protobuf
message OptionChainDateStrikeInfoRequest {
  string symbol = 1;
  string expiry_date = 2;
}
```

## Response

### Response Properties

| Name              | Type     | Description        |
| ----------------- | -------- | ------------------ |
| strike_price_info | object[] | 到期日期權標的列表 |
| ∟ price           | string   | 行權價             |
| ∟ call_symbol     | string   | CALL 期權標的代碼  |
| ∟ put_symbol      | string   | PUT 期權標的代碼   |
| ∟ standard        | bool     | 是否標準期權       |

### Protobuf

```protobuf
message OptionChainDateStrikeInfoResponse {
  repeated StrikePriceInfo strike_price_info = 1;
}

message StrikePriceInfo {
  string price = 1;
  string call_symbol = 2;
  string put_symbol = 3;
  bool  standard = 4;
}
```

### Request Example

```python
# 獲取標的的期權鏈到期日期權標的列表
# https://open.longbridge.com/docs/quote/pull/optionchain-date-strike
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“Longbridge”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from datetime import date
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.option_chain_info_by_date("AAPL.US", date(2023, 1, 20))
print(resp)
```

### Response JSON Example

```json
{
  "strike_price_info": [
    {
      "price": "100",
      "call_symbol": "AAPL220429C100000.US",
      "put_symbol": "AAPL220429P100000.US",
      "standard": true
    },
    {
      "price": "105",
      "call_symbol": "AAPL220429C105000.US",
      "put_symbol": "AAPL220429P105000.US",
      "standard": true
    },
    {
      "price": "110",
      "call_symbol": "AAPL220429C110000.US",
      "put_symbol": "AAPL220429P110000.US",
      "standard": true
    },
    {
      "price": "115",
      "call_symbol": "AAPL220429C115000.US",
      "put_symbol": "AAPL220429P115000.US",
      "standard": true
    }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                                    |
| ---------- | ---------- | -------------- | ------------------------------------------- |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗                      |
| 3          | 301606     | 限流           | 降低請求頻次                                |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理                    |
| 7          | 301600     | 請求數據非法   | 檢查請求的 `symbol`，`expiry_date` 數據格式 |
