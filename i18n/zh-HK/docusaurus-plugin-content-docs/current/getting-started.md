---
sidebar_position: 1
slug: /getting-started
title: 快速開始
id: getting-started
---

## 前言

Longbridge OpenAPI SDK 基於 Rust 底層提供標準實現，通過 FFI 提供給各類語言使用，目前我們已經發布了 Python、C++ 的 SDK，其他語言的支持後面會陸續推出。

- **Python** - https://github.com/longbridgeapp/openapi-python
- **C++** - https://github.com/longbridgeapp/openapi-cpp

目前，我們支持如下系統架構：

- Linux - x86_64 & aarch64
- macOS - x86_64 & aarch64
- Windows - x86_64 & i686

:::tip
本文以 Python SDK 為例講解如何使用 SDK 實現簡單的功能。以便大家可以在短的時間內走通 OpenAPI 的幾個關鍵流程，理解 OpenAPI 的機制。
:::

## API Host

- HTTP API - `https://openapi.longbridgeapp.com`
- WebSocket Quote - `wss://openapi-quote.longbridgeapp.com`
- Webssocket Trade - `wss://openapi-trade.longbridgeapp.com`

## 環境需求

- [Python 3](https://www.python.org/)
- Pip

## 安裝 SDK

你可以通過 Pip 安裝 SDK，或者直接訪問 [Pypi Longbridge](https://pypi.org/project/longbridge/) 頁面來下載。

```bash
$ pip3 install longbridge
```

下面我們以獲取資產為例，演示一下如何使用 SDK。

## 配置開發者賬戶

1. 在 [Longbridge](https://longbridge.hk) 開戶
2. 完成 Python 3 環境安裝，並安裝 Pip
3. 從 [Longbridge OpenAPI](https://open.longbridgeapp.com) 官網獲取 ` App Key`, `App Secret`, `Access Token` 等信息。

**_獲取 App Key, App Secret, Access Token 等信息_**

訪問 [Longbridge OpenAPI](https://open.longbridgeapp.com) 網站，登錄後，進入“個人中心”。

在頁面上會給出“應用憑證”憑證信息，我們拿到以後設置環境變量，便於後面開發使用方便。

### macOS / Linux 環境下設置環境變量

打開終端，輸入下面的命令即可：

```bash
$ export LONGBRIDGE_APP_KEY="從頁面上獲取到的 App Key"
$ export LONGBRIDGE_APP_SECRET="從頁面上獲取到的 App Secret"
$ export LONGBRIDGE_ACCESS_TOKEN="從頁面上獲取到的 Access Token"
```

### Windows 下設置環境變量

Windows 要稍微複雜一些，按下 `Win + R` 快捷鍵，輸入 `cmd` 命令啟動命令行（建議使用 [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) 獲得更好的開發體驗）。

在命令行里面輸入下面的命令設置環境變量：

```bash
C:\Users\jason> setx LONGBRIDGE_APP_KEY "從頁面上獲取到的 App Key"
成功：指定的值已得到保存。

C:\Users\jason> setx LONGBRIDGE_APP_SECRET "從頁面上獲取到的 App Secret"
成功：指定的值已得到保存。

C:\Users\jason> setx LONGBRIDGE_ACCESS_TOKEN "從頁面上獲取到的 Access Token"
成功：指定的值已得到保存。
```

:::caution

Windows 環境變量限制，當上面 3 條命令執行成功以後，你需要重新啟動 Windows 或者註銷後重新登錄一次，才可以讀取到。

:::

註銷或重新啟動後，再次打開命令行，輸入下面的命令驗證一下環境變量是否設置正確：

```bash
C:\Users\jason> set LONGBRIDGE
LONGBRIDGE_APP_KEY=xxxxxxx
LONGBRIDGE_APP_SECRET=xxxxxx
LONGBRIDGE_ACCESS_TOKEN=xxxxxxx
```

如果能正確打印你剛才設置的值，那麼環境變量就是對了。

:::tip
建議您設置好 `LONGBRIDGE_APP_KEY`, `LONGBRIDGE_APP_SECRET`, `LONGBRIDGE_ACCESS_TOKEN` 這幾個環境變量。我們為了演示方便，後面各章節文檔中的示例代碼都會使用這幾個環境變量。

如您在 Windows 環境不方便使用環境變量，可根據個人需要，修改代碼。
:::

:::caution
請注意保護好您的 **Access Token** 信息，任何人獲得到它，都可以通過 OpenAPI 來交易你的賬戶！
:::

## 場景示範

### 獲取資產總覽

創建一個 `account_asset.py` 貼入下面的代碼：

```py
import os
import json
from longbridge.http import Auth, Config, HttpClient

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))

resp = http.get("/v1/asset/account")
print(json.dumps(resp.data, indent=2))
```

運行 `account_asset.py` 後，會輸出如下：

```bash
python account_asset.py
```

```json
{
  "list": [
    {
      "cash_infos": [
        {
          "available_cash": "32966.49",
          "currency": "HKD",
          "frozen_cash": "0.00",
          "redemption_cash": "0",
          "settling_cash": "0.00",
          "withdraw_cash": "32966.49"
        },
        {
          "available_cash": "-6582.61",
          "currency": "USD",
          "frozen_cash": "5.76",
          "redemption_cash": "0",
          "settling_cash": "0.00",
          "withdraw_cash": "-6582.61"
        }
      ],
      "currency": "HKD",
      "margin_call": "3105871.08",
      "max_finance_amount": "1093000",
      "remaining_finance_amount": "702.348304552590266876",
      "risk_level": "3",
      "total_cash": "-2829.14"
    }
  ]
}
```

### 訂閱實時行情

訂閱行情數據請檢查 [開發者中心](https://open.longbridgeapp.com/account) - “行情權限”是否正確

- 港股 - BMP 基礎報價，無實時行情推送，無法用 WebSocket 訂閱
- 美股 - LV1 納斯達克最優報價 (只限 Open API）

運行前訪問 [開發者中心](https://open.longbridgeapp.com/account)，檢查確保賬戶有正確的行情權限。

:::info

如沒有開通行情權限，可以通過“長橋”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。

https://longbridgeapp.com/download
:::

當你有正確的行情權限，看起來可能會是這樣：

<img src="https://pub.lbkrs.com/files/202205/CicZRBp7LAV577YN/SCR-20220510-gme.png" className="max-w-2xl" />

創建一個 `subscribe_quote.py` 並寫入下面的代碼：

```py
# 訂閱行情數據
# https://open.longbridgeapp.com/docs/quote/subscribe/subscribe
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 變量定義參見：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, PushQuote, SubscribeRequest, SubscriptionResponse, SubType)

class MyWsCallback(WsCallback):
    def on_push(self, command: int, body: bytes):
        if command == Command.PushQuoteData:
            quote = PushQuote()
            quote.ParseFromString(body)
            print(f"Received -> {quote}")
        else:
            print(f"Received unknown -> {command}")

    def on_state(self, state: ReadyState):
        print(f"Received state -> {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))
ws = WsClient("wss://openapi-quote.longbridgeapp.com", http, MyWsCallback())

req = SubscribeRequest(symbol=["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"], sub_type=[SubType.QUOTE], is_first_push=True)
result = ws.send_request(Command.Subscribe, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print(f"Subscribed symbol: {resp.sub_list}")

print("Waiting for push...\nPress [Ctrl + c] to quit.")
while True:
    time.sleep(10)
```

啟動行情訂閱：

```bash
$ python subscribe_quote.py
```

我們可以看到這樣的結果：

```
Received state -> ReadyState.OPEN
Subscribed symbol:

[symbol: "700.HK"
sub_type: QUOTE
, symbol: "AAPL.US"
sub_type: QUOTE
, symbol: "TSLA.US"
sub_type: QUOTE
, symbol: "NFLX.US"
sub_type: QUOTE
]

Waiting for push...
Press [Ctrl + c] to quit.
```

### 委託下單

下面我們做一次 [委託下單](https://open.longbridgeapp.com/docs/trade/order/submit) 動作，我們假設要以 50 HKD 買入 `700.HK` 的數量為 `100`。

> NOTE: 為了防止測試買入成功，這裡演示給了一個較低的價格，避免成交。OpenAPI 操作均等同與線上交易，請謹慎操作，開發調試注意參數細節。

創建一個 `submit_order.py` 並寫入下面的代碼：

```py
import os
import json
from longbridge.http import Auth, Config, HttpClient

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))

payload = {
    "side": "Buy",
    "symbol": "700.HK",
    "order_type": "LO",
    "submitted_price": "50",
    "submitted_quantity": "200",
    "time_in_force": "Day",
    "remark": "Hello from Python SDK"
}

try:
  resp = http.post("/v1/trade/order", payload=payload)
  print(json.dumps(resp.data, indent=2))
except Exception as e:
  print(f"Submit order error\ncode: {e.code}\nmessage: {e.message}")
```

執行 `python submit_order.py` 後，會輸出如下：

```json
{
  "order_id": "707530744027713536"
}
```

加入下單失敗，你可能會看到這樣的錯誤信息：

```
Submit order error
code: 602035
message: 委託價不符合最小價格變動單位
```

### 獲取當日訂單

```py
import os
import json
from longbridge.http import Auth, Config, HttpClient

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))

resp = http.get("/v1/trade/order/today")
print(json.dumps(resp.data, indent=2))
```

如果前面你有提交訂單，你應該會看到這樣的結果：

```json
{
  "orders": [
    {
      "currency": "HKD",
      "executed_price": "0",
      "executed_quantity": "0",
      "expire_date": "2022-05-10",
      "last_done": "",
      "limit_offset": "",
      "msg": "",
      "order_id": "707530744027713536",
      "order_type": "LO",
      "outside_rth": "UnknownOutsideRth",
      "price": "50",
      "quantity": "200",
      "side": "Buy",
      "status": "CanceledStatus",
      "stock_name": "\u817e\u8baf\u63a7\u80a1",
      "submitted_at": "1651917274",
      "symbol": "700.HK",
      "tag": "Normal",
      "time_in_force": "Day",
      "trailing_amount": "",
      "trailing_percent": "",
      "trigger_at": "0",
      "trigger_price": "",
      "trigger_status": "NOT_USED",
      "updated_at": "1651917561"
    },
    {
      // ...
    }
  ]
}
```

上面例子已經完整演示瞭如何使用 SDK 訪問 OpenAPI 的接口，更多其他接口請詳細閱讀 [Longbridge OpenAPI 文檔](https://open.longbridgeapp.com/docs)，根據不同的接口使用。

## 更多例子

我們在 Longbridge OpenAPI Python SDK 的 GitHub 倉庫中提供了上面幾個例子的完整代碼，當然後期我們也會持續往裡面補充或更新。

https://github.com/longbridgeapp/openapi-python/tree/main/examples

## SDK API 文檔

Python SDK 的詳細 API 文檔請訪問：

https://longbridge.readthedocs.io/en/latest/api.html
