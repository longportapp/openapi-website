---
id: quote_optionchain_date_strike
title: 獲取標的的期權鏈到期日期權標的列表
slug: optionchain-date-strike
sidebar_position: 12
---

該接口用於獲取標的的期權鏈到期日期權標的列表。

:::info

[業務指令](../../socket/protocol/request)：`21`

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
# https://open.longbridgeapp.com/docs/quote/pull/optionchain-date-strike
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 變量定義參見：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, OptionChainDateStrikeInfoRequest, OptionChainDateStrikeInfoResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))
ws = WsClient("wss://openapi-quote.longbridgeapp.com", http, MyWsCallback())

# 運行前請訪問 “開發者中心“ 確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過 "長橋" 手機客戶端，並進入 “我的 - 我的行情 - 行情商城“ 購買開通行情權限。
req = OptionChainDateStrikeInfoRequest(symbol="AAPL.US", expiry_date="20230120")
result = ws.send_request(Command.QueryOptionChainDateStrikeInfo, req.SerializeToString())
resp = OptionChainDateStrikeInfoResponse()
resp.ParseFromString(result)

print(f"Option chain info:\n\n {resp}")
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
