---
id: quote_intraday
title: 獲取標的當日分時
slug: intraday
sidebar_position: 9
---

該接口用於獲取標的的當日分時數據。

:::info

[業務指令](../../socket/protocol/request)：`18`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                         |
| ------ | ------ | -------- | --------------------------------------------------- |
| symbol | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如：`700.HK` |

### Protobuf

```protobuf
message SecurityIntradayRequest {
  string symbol = 1;
}
```

### Request Example

```python
# 獲取標的當日分時
# https://open.longbridgeapp.com/docs/quote/pull/intraday
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 變量定義參見：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, SecurityIntradayRequest, SecurityIntradayResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# 運行前請訪問 “開發者中心“ 確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過 "長橋" 手機客戶端，並進入 “我的 - 我的行情 - 行情商城“ 購買開通行情權限。
req = SecurityIntradayRequest(symbol="700.HK")
result = ws.send_request(Command.QueryIntraday, req.SerializeToString())
resp = SecurityIntradayResponse()
resp.ParseFromString(result)

print(f"Intraday:\n\n {resp}")
```

## Response

### Response Properties

| Name        | Type     | Description               |
| ----------- | -------- | ------------------------- |
| symbol      | string   | 標的代碼，例如：`AAPL.US` |
| lines       | object[] | 分時數據                  |
| ∟ price     | string   | 當前分鐘的收盤價格        |
| ∟ timestamp | int64    | 當前分鐘的開始時間        |
| ∟ volume    | int64    | 成交量                    |
| ∟ turnover  | string   | 成交额                    |
| ∟ avg_price | string   | 均價                      |

### Protobuf

```
message SecurityIntradayResponse{
  string symbol = 1;
  repeated Line lines = 2;
}

message Line {
  string price = 1;
  int64 timestamp = 2;
  int64 volume = 3;
  string turnover = 4;
  string avg_price = 5;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "lines": [
    {
      "price": "330.400",
      "timestamp": 1651023000,
      "volume": 375870,
      "turnover": "123949699.000",
      "avg_price": "329.767470"
    },
    {
      "price": "331.200",
      "timestamp": 1651023060,
      "volume": 233095,
      "turnover": "77269032.800",
      "avg_price": "330.427416"
    },
    {
      "price": "330.400",
      "timestamp": 1651023120,
      "volume": 192565,
      "turnover": "63711556.000",
      "avg_price": "330.530719"
    },
    {
      "price": "330.800",
      "timestamp": 1651023180,
      "volume": 143397,
      "turnover": "47471072.400",
      "avg_price": "330.608989"
    },
    {
      "price": "330.800",
      "timestamp": 1651023240,
      "volume": 141834,
      "turnover": "46890605.600",
      "avg_price": "330.608078"
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
| 7          | 301600     | 請求標的不存在 | 檢查請求的 `symbol` 是否正確 |
| 7          | 301603     | 標的無行情     | 標的沒有請求的行情數據       |
| 7          | 301604     | 無權限         | 沒有獲取標的行情的權限       |
