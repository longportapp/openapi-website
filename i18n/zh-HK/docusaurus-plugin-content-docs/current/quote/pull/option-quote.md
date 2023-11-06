---
id: quote_option_quote
title: 獲取期權實時行情
slug: option-quote
sidebar_position: 3
---

該接口用於獲取美股期權標的的實時行情，包括期權的特有數據。

:::info
[業務指令](../../socket/biz-command)：`12`
:::

## Request

### Parameters

| Name   | Type     | Required | Description                                                                                                                                                                                  |
| ------ | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | 是       | 標的代碼列表，通過[期權鏈接口](./optionchain-date-strike.md) 獲取期權標的的 symbol，例如：`[BABA230120C160000.US]` <br /><br />**校驗規則：**<br />每次請求支持傳入的標的數量上限是 `500` 個 |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

### Request Example

```python
# 獲取期權實時行情
# https://open.longportapp.com/docs/quote/pull/option-quote
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.option_quote(["AAPL230317P160000.US"])
print(resp)
```

## Response

### Response Properties

| Name                     | Type     | Description                                                         |
| ------------------------ | -------- | ------------------------------------------------------------------- |
| secu_quote               | object[] | 期權標的行情數據列表                                                |
| ∟ symbol                 | string   | 標的代碼                                                            |
| ∟ last_done              | string   | 最新價                                                              |
| ∟ prev_close             | string   | 昨收價                                                              |
| ∟ open                   | string   | 開盤價                                                              |
| ∟ high                   | string   | 最高價                                                              |
| ∟ low                    | string   | 最低價                                                              |
| ∟ timestamp              | int64    | 最新成交的時間戳                                                    |
| ∟ volume                 | int64    | 成交量                                                              |
| ∟ turnover               | string   | 成交額                                                              |
| ∟ trade_status           | int32    | 標的交易狀態，詳見 [TradeStatus](../objects#tradestatus---交易狀態) |
| ∟ option_extend          | object   | 期權擴展行情                                                        |
| ∟∟ implied_volatility    | string   | 隱含波動率                                                          |
| ∟∟ open_interest         | int64    | 未平倉數                                                            |
| ∟∟ expiry_date           | string   | 到期日，使用：`YYMMDD` 格式                                         |
| ∟∟ strike_price          | string   | 行權價                                                              |
| ∟∟ contract_multiplier   | string   | 合約乘數                                                            |
| ∟∟ contract_type         | string   | 期權類型 <br /><br />**可選值：**<br />`A` - 美式 <br />`U` - 歐式  |
| ∟∟ contract_size         | string   | 合約規模                                                            |
| ∟∟ direction             | string   | 方向 <br /><br />**可選值：**<br />`P` - put <br />`C` - call       |
| ∟∟ historical_volatility | string   | 對應正股的歷史波動率                                                |
| ∟∟ underlying_symbol     | string   | 對應的正股標的代碼                                                  |

### Protobuf

```protobuf
message OptionQuoteResponse {
  repeated OptionQuote secu_quote = 1;
}

message OptionQuote {
  string symbol = 1;
  string last_done = 2;
  string prev_close = 3;
  string open = 4;
  string high = 5;
  string low = 6;
  int64 timestamp = 7;
  int64 volume = 8;
  string turnover = 9;
  TradeStatus trade_status = 10;
  OptionExtend option_extend = 11;
}

message OptionExtend {
  string implied_volatility = 1;
  int64 open_interest = 2;
  string expiry_date = 3;
  string strike_price = 4;
  string contract_multiplier = 5;
  string contract_type = 6;
  string contract_size = 7;
  string direction = 8;
  string historical_volatility = 9;
  string underlying_symbol = 10;
}
```

### Response JSON Example

```json
{
  "secu_quote": [
    {
      "symbol": "AAPL220429P162500.US",
      "last_done": "7.78",
      "prev_close": "4.13",
      "open": "4.43",
      "high": "7.80",
      "low": "4.43",
      "timestamp": 1651003200,
      "volume": 3082,
      "turnover": "1813434.00",
      "option_extend": {
        "implied_volatility": "0.592",
        "open_interest": 11463,
        "expiry_date": "20220429",
        "strike_price": "162.50",
        "contract_multiplier": "100",
        "contract_type": "A",
        "contract_size": "100",
        "direction": "P",
        "historical_volatility": "0.2750",
        "underlying_symbol": "AAPL.US"
      }
    },
    {
      "symbol": "AAPL220429C150000.US",
      "last_done": "9.25",
      "prev_close": "13.87",
      "open": "13.80",
      "high": "13.80",
      "low": "9.15",
      "timestamp": 1651003200,
      "volume": 413,
      "turnover": "436835.00",
      "option_extend": {
        "implied_volatility": "0.702",
        "open_interest": 800,
        "expiry_date": "20220429",
        "strike_price": "150.00",
        "contract_multiplier": "100",
        "contract_type": "A",
        "contract_size": "100",
        "direction": "C",
        "historical_volatility": "0.2750",
        "underlying_symbol": "AAPL.US"
      }
    }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗                     |
| 3          | 301606     | 限流           | 降低請求頻次                               |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理                   |
| 7          | 301607     | 接口限制       | 請求的標的數量超限，請減少單次請求標的數量 |
