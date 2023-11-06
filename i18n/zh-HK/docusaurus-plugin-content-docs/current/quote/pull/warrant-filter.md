---
id: quote_warrant_filter
title: 獲取輪證篩選列表
slug: warrant-filter
sidebar_position: 14
---

該接口用於獲取輪證行情列表數據，支持按不同字段排序和篩選輪證。

:::info

[業務指令](../../socket/biz-command)：`23`

:::

## Request

### Parameters

| Name          | Type    | Required | Description                                                                                                                                        |
| ------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol        | string  | 是       | 標的代碼，使用 `ticker.region` 格式，例如：`700.HK`                                                                                                |
| filter_config | object  | 是       | 篩選條件                                                                                                                                           |
| ∟ sort_by     | int32   | 是       | 根據哪一項數據進行排序，例如：`0`，序號見響應數據 `OrderSequence` 字段。                                                                           |
| ∟ sort_order  | int32   | 是       | 升降順序，例如：`1` <br /><br />**可选值：**<br />`0` - 升序<br />`1` - 降序                                                                       |
| ∟ sort_offset | int32   | 是       | 分頁的第一條數據偏移量，例如 `0`                                                                                                                   |
| ∟ sort_count  | int32   | 是       | 分頁的每一頁數量，例如 `20` <br /><br />**校验规则：**<br /> 每頁數量最大為 `500`                                                                  |
| ∟ type        | int32[] | 否       | 篩選輪證類型 例如：`[0,1]` <br /><br />**可选值：**<br />`0` - 認購<br />`1` - 認沽<br />`2` - 牛證<br />`3` - 熊證<br />`4` - 界內證              |
| ∟ issuer      | int32[] | 否       | 篩選發行商，例如：`[12,14]`，[發行商 ID](./issuer) 通過接口獲取                                                                                    |
| ∟ expiry_date | int32[] | 否       | 篩選輪證過期時間，例如：`[1]` <br /><br />**可選值：**<br />`1` - 低於 3 個月<br />`2` - 3 - 6 個月<br />`3` - 6 - 12 個月<br />`4` - 大於 12 個月 |
| ∟ price_type  | int32[] | 否       | 篩選價內價外，例如：`[2]` <br /><br />**可选值：**<br />`1` - 價內<br />`2` - 價外                                                                 |
| ∟ status      | int32[] | 否       | 篩選狀態，例如：`[2]` <br /><br />**可选值：**<br />`2 `- 終止交易<br />`3` - 等待上市<br />`4` - 正常                                             |
| language      | int32   | 是       | 響應的語言，例如：`[1]` <br /><br />**可选值：**<br />`0` - 簡體<br />`1` - English<br />`2` - 繁体                                                |

### Protobuf

```protobuf
message WarrantFilterListRequest {
  string symbol = 1;
  FilterConfig filter_config = 2;
  int32 language = 3;
}

message FilterConfig {
  int32 sort_by = 1;
  int32 sort_order = 2;
  int32 sort_offset = 3;
  int32 sort_count = 4;
  repeated int32 type = 5;
  repeated int32 issuer = 6;
  repeated int32 expiry_date = 7;
  repeated int32 price_type = 8;
  repeated int32 status = 9;
}
```

### Request Example

```python
# 獲取輪證篩選列表
# https://open.longportapp.com/docs/quote/pull/warrant-filter
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 變量定義參見：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, FilterConfig, WarrantFilterListRequest, WarrantFilterListResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longportapp.com"))
ws = WsClient("wss://openapi-quote.longportapp.com", http, MyWsCallback())

# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
filterConfig = FilterConfig(sort_by=0, sort_order=1, sort_offset=0, sort_count=10)
req = WarrantFilterListRequest(symbol="700.HK", filter_config=filterConfig, language=1)
result = ws.send_request(Command.QueryWarrantFilterList, req.SerializeToString())
resp = WarrantFilterListResponse()
resp.ParseFromString(result)

print(f"Filtered warrant:\n\n {resp}")
```

## Response

### Response Properties

| Name                 | Type     | Description                                                                    | OrderSequence |
| -------------------- | -------- | ------------------------------------------------------------------------------ | ------------- |
| warrant_list         | object[] | 渦輪篩選數據列表                                                               |               |
| ∟ symbol             | string   | 標的代碼                                                                       |               |
| ∟ name               | string   | 標的名稱                                                                       |               |
| ∟ last_done          | string   | 最新價                                                                         | 0             |
| ∟ change_rate        | string   | 漲跌幅                                                                         | 1             |
| ∟ change_val         | string   | 漲跌額                                                                         | 2             |
| ∟ volume             | int64    | 成交量                                                                         | 3             |
| ∟ turnover           | string   | 成交額                                                                         | 4             |
| ∟ expiry_date        | string   | 到期日，使用 `YYMMDD` 格式                                                     | 5             |
| ∟ strike_price       | string   | 行權價                                                                         | 6             |
| ∟ upper_strike_price | string   | 上限價                                                                         | 7             |
| ∟ lower_strike_price | string   | 下限價                                                                         | 8             |
| ∟ outstanding_qty    | string   | 街貨量                                                                         | 9             |
| ∟ outstanding_ratio  | string   | 街貨比                                                                         | 10            |
| ∟ premium            | string   | 溢價率                                                                         | 11            |
| ∟ itm_otm            | string   | 價內/價外                                                                      | 12            |
| ∟ implied_volatility | string   | 引伸波幅                                                                       | 13            |
| ∟ delta              | string   | 對沖值                                                                         | 14            |
| ∟ call_price         | string   | 收回價                                                                         | 15            |
| ∟ to_call_price      | string   | 距收回價                                                                       | 16            |
| ∟ effective_leverage | string   | 有效槓桿                                                                       | 17            |
| ∟ leverage_ratio     | string   | 槓桿比率                                                                       | 18            |
| ∟ conversion_ratio   | string   | 換股比率                                                                       | 19            |
| ∟ balance_point      | string   | 打和點                                                                         | 20            |
| ∟ state              | string   | 狀態，<br /><br />**可選值：**<br />`正常交易`<br />`等待上市`<br />`終止交易` | 21            |
| total_count          | int32    | 符合條件的輪證總數量                                                           |               |

### Protobuf

```protobuf
message WarrantFilterListResponse {
  repeated FilterWarrant warrant_list = 1;
  int32 total_count = 2;
}

message FilterWarrant {
  string symbol = 1;
  string name = 2;
  string last_done = 3;
  string change_rate = 4;
  string change_val = 5;
  int64 volume = 6;
  string turnover = 7;
  string expiry_date = 8;
  string strike_price = 9;
  string upper_strike_price = 10;
  string lower_strike_price = 11;
  string outstanding_qty = 12;
  string outstanding_ratio = 13;
  string premium = 14;
  string itm_otm = 15;
  string implied_volatility = 16;
  string delta = 17;
  string call_price = 18;
  string to_call_price = 19;
  string effective_leverage = 20;
  string leverage_ratio = 21;
  string conversion_ratio = 22;
  string balance_point = 23;
  string state = 24;
}
```

### Response JSON Example

```json
{
  "warrant_list": [
    {
      "symbol": "13157.HK",
      "name": "騰訊麥銀二七沽 A",
      "last_done": "2.26",
      "change_rate": "-0.0216450216450218",
      "change_val": "-0.050000000000000266",
      "turnover": "0",
      "expiry_date": "20220705",
      "strike_price": "442.233",
      "upper_strike_price": "0",
      "lower_strike_price": "0",
      "outstanding_qty": "5000",
      "outstanding_ratio": "0.0003",
      "premium": "0.016784269662921222",
      "itm_otm": "0.23524476916014864",
      "implied_volatility": "0.5275",
      "delta": "-0.8524",
      "call_price": "0",
      "effective_leverage": "-2.627683451852457",
      "leverage_ratio": "3.0826882353970637",
      "conversion_ratio": "48.544",
      "balance_point": "332.52356000000003",
      "state": "正常交易"
    },
    {
      "symbol": "13649.HK",
      "name": "騰訊摩通二五沽 A",
      "last_done": "1.14",
      "change_rate": "0",
      "change_val": "0",
      "turnover": "0",
      "expiry_date": "20220518",
      "strike_price": "445.223",
      "upper_strike_price": "0",
      "lower_strike_price": "0",
      "outstanding_qty": "80000",
      "outstanding_ratio": "0.0004",
      "premium": "0.010810703725606",
      "itm_otm": "0.24038066317328624",
      "implied_volatility": "0.5997",
      "delta": "-0.7964",
      "call_price": "0",
      "effective_leverage": "-2.4335424241487873",
      "leverage_ratio": "3.055678583813144",
      "conversion_ratio": "97.087",
      "balance_point": "334.54382000000004",
      "state": "終止交易"
    }
  ],
  "total_count": 1197
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗       |
| 3          | 301606     | 限流           | 降低請求頻次                 |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理     |
| 7          | 301600     | 請求標的不存在 | 檢查請求的 `symbol` 是否正確 |
| 7          | 301603     | 標的無行情     | 標的沒有請求的行情數據       |
| 7          | 301604     | 無權限         | 沒有獲取標的行情的權限       |
| 7          | 301607     | 接口限制       | 減少每頁數據數量             |
