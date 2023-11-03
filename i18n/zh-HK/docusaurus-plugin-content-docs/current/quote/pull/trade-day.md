---
id: quote_trade_day
title: 獲取市場交易日
slug: trade-day
sidebar_position: 16
---

該接口用於獲取市場的交易日信息。

:::info

[業務指令](../../socket/biz-command)：`9`

:::

## Request

### Parameters

| Name    | Type   | Required | Description                                                                                                                                              |
| ------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| market  | string | 是       | 市場 <br /><br />**可選值：**<br/>`US` - 美股市場<br/>`HK` - 港股市場<br/>`CN` - A 股市場<br/>`SG` - 新加坡市場                                          |
| beg_day | string | 是       | 開始時間，使用 `YYMMDD` 格式，例如：`20220401`                                                                                                           |
| end_day | string | 是       | 結束時間，使用 `YYMMDD` 格式，例如：`20220420` <br/><br/>**校驗規則：**<br/> `開始時間` 和 `結束時間`，間隔不能大於一個月 <br/> 僅支持查詢最近一年的數據 |

### Protobuf

```protobuf
message MarketTradeDayRequest {
  string market = 1;
  string beg_day = 2;
  string end_day = 3;
}
```

### Request Example

```python
# 獲取市場交易日
# https://open.longportapp.com/docs/quote/pull/trade-day
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from datetime import date
from longbridge.openapi import QuoteContext, Config, Market

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.trading_days(Market.HK, date(2022, 1, 1), date(2022, 2, 1))
print(resp)
```

## Response

### Response Properties

| Name           | Type     | Description                |
| -------------- | -------- | -------------------------- |
| trade_day      | string[] | 交易日，使用 `YYMMDD` 格式 |
| half_trade_day | string[] | 半日市，使用 `YYMMDD` 格式 |

### Protobuf

```protobuf
message MarketTradeDayResponse {
  repeated string trade_day = 1;
  repeated string half_trade_day = 2;
}
```

### Response JSON Example

```json
{
  "trade_day": [
    "20220120",
    "20220121",
    "20220124",
    "20220125",
    "20220126",
    "20220127",
    "20220128",
    "20220204",
    "20220207",
    "20220208",
    "20220209",
    "20220210"
  ],
  "half_trade_day": ["20220131"]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                             |
| ---------- | ---------- | -------------- | ------------------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗               |
| 3          | 301606     | 限流           | 降低請求頻次                         |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理             |
| 7          | 301600     | 請求數據非法   | 檢查請求的市場，日期是否在正確範圍內 |
