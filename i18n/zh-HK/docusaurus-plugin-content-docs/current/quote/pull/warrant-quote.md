---
id: quote_warrant_quote
title: 獲取輪證實時行情
slug: warrant-quote
sidebar_position: 4
---

該接口用於獲取港股輪證標的的實時行情，包括輪證的特有數據。

:::info

[業務指令](../../socket/protocol/request)：`13`

:::

## Request

### Parameters

| Name   | Type     | Required | Description                                                                                                                           |
| ------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | 是       | 標的代碼列表，使用 `ticker.region` 格式，例如：`[13447.HK]` <br /><br />**校驗規則：**<br />每次請求支持傳入的標的數量上限是 `500` 个 |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

### Request Example

```python
# 獲取輪證實時行情
# https://open.longbridgeapp.com/docs/quote/pull/warrant-quote
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 變量定義參見：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, MultiSecurityRequest, WarrantQuoteResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# 運行前請訪問 “開發者中心“ 確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過 "長橋" 手機客戶端，並進入 “我的 - 我的行情 - 行情商城“ 購買開通行情權限。
req = MultiSecurityRequest(symbol=["21125.HK"])
result = ws.send_request(Command.QueryWarrantQuote, req.SerializeToString())
resp = WarrantQuoteResponse()
resp.ParseFromString(result)

print(f"Warrant quote:\n\n {resp.secu_quote}")
```

## Response

### Response Properties

| Name                  | Type     | Description                                                                                                                                 |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| secu_quote            | object[] | 期權標的行情數據列表                                                                                                                        |
| ∟ symbol              | string   | 標的代碼                                                                                                                                    |
| ∟ last_done           | string   | 最新價                                                                                                                                      |
| ∟ prev_close          | string   | 昨收價                                                                                                                                      |
| ∟ open                | string   | 開盤價                                                                                                                                      |
| ∟ high                | string   | 最高價                                                                                                                                      |
| ∟ low                 | string   | 最低價                                                                                                                                      |
| ∟ timestamp           | int64    | 最新成交的時間戳                                                                                                                            |
| ∟ volume              | int64    | 成交量                                                                                                                                      |
| ∟ turnover            | string   | 成交額                                                                                                                                      |
| ∟ trade_status        | int32    | 標的交易狀態，詳見[TradeStatus](../objects#tradestatus---交易狀態)                                                                          |
| ∟ warrant_extend      | object   | 輪證擴展行情                                                                                                                                |
| ∟∟ implied_volatility | string   | 引申波幅                                                                                                                                    |
| ∟∟ expiry_date        | string   | 到期日，使用：`YYMMDD` 格式                                                                                                                 |
| ∟∟ last_trade_date    | string   | 最後交易日，使用：`YYMMDD` 格式                                                                                                             |
| ∟∟ outstanding_ratio  | string   | 街貨比                                                                                                                                      |
| ∟∟ outstanding_qty    | int64    | 街貨量                                                                                                                                      |
| ∟∟ conversion_ratio   | string   | 換股比率                                                                                                                                    |
| ∟∟ category           | string   | 輪證類型 <br /><br />**可選值：**<br />`Call` - 認購證 <br />`Put` - 認沽證 <br />`Bull` - 牛證 <br />`Bear` - 熊證 <br />`Inline` - 界內證 |
| ∟∟ strike_price       | string   | 行權價                                                                                                                                      |
| ∟∟ upper_strike_price | string   | 上限價                                                                                                                                      |
| ∟∟ lower_strike_price | string   | 下限價                                                                                                                                      |
| ∟∟ call_price         | string   | 收回價                                                                                                                                      |
| ∟∟ underlying_symbol  | string   | 對應的正股標的代碼                                                                                                                          |

### Protobuf

```protobuf
message WarrantQuoteResponse {
  repeated WarrantQuote secu_quote = 2;
}

message WarrantQuote {
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
  WarrantExtend warrant_extend = 11;
}

message WarrantExtend {
  string implied_volatility = 1;
  string expiry_date = 2;
  string last_trade_date = 3;
  string outstanding_ratio = 4;
  int64  outstanding_qty = 5;
  string conversion_ratio = 6;
  string category = 7;
  string strike_price = 8;
  string upper_strike_price = 9;
  string lower_strike_price = 10;
  string call_price = 11;
  string underlying_symbol = 12;
}
```

### Response JSON Example

```json
{
  "secu_quote": [
    {
      "symbol": "66642.HK",
      "last_done": "0.345",
      "prev_close": "0.365",
      "open": "0.345",
      "high": "0.345",
      "low": "0.345",
      "timestamp": 1651130421,
      "volume": 200000,
      "turnover": "69000.000",
      "warrant_extend": {
        "implied_volatility": "0.319",
        "expiry_date": "20220830",
        "last_trade_date": "20220829",
        "outstanding_ratio": "0.0001",
        "outstanding_qty": 20000,
        "conversion_ratio": "10000",
        "category": "Bear",
        "strike_price": "23200.000",
        "upper_strike_price": "0.000",
        "lower_strike_price": "0.000",
        "call_price": "23100.000",
        "underlying_symbol": "HSI.HK"
      }
    },
    {
      "symbol": "14993.HK",
      "last_done": "0.073",
      "prev_close": "0.066",
      "open": "0.069",
      "high": "0.076",
      "low": "0.069",
      "timestamp": 1651130930,
      "volume": 320825000,
      "turnover": "23401125.000",
      "warrant_extend": {
        "implied_volatility": "0.404",
        "expiry_date": "20220927",
        "last_trade_date": "20220921",
        "outstanding_ratio": "0.0247",
        "outstanding_qty": 2465000,
        "conversion_ratio": "10",
        "category": "Call",
        "strike_price": "70.050",
        "upper_strike_price": "0.000",
        "lower_strike_price": "0.000",
        "call_price": "0.000",
        "underlying_symbol": "2318.HK"
      }
    }
  ]
}
```

## 接口限制

:::caution

- 港股 BMP 行情，超過 20 支的港股標的將響應延遲行情。

:::

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗                     |
| 3          | 301606     | 限流           | 降低請求頻次                               |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理                   |
| 7          | 301607     | 接口限制       | 請求的標的數量超限，請減少單次請求標的數量 |
