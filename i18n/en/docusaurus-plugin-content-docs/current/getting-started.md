---
sidebar_position: 1
slug: /getting-started
title: Getting Started
id: getting-started
---

## Foreword

Longbridge OpenAPI SDK is implemented based on Rust, and support other languages through FFI. At present, we have released SDK for Python and C++, and support for other languages will be launched in the future.

- **Python** - https://github.com/longbridgeapp/openapi-python
- **C++** - https://github.com/longbridgeapp/openapi-cpp

Currently, we support the following systems:

- Linux - x86_64 & aarch64
- macOS - x86_64 & aarch64
- Windows - x86_64 & i686

:::tip
This article takes the Python SDK as an example to explain how to use the SDK to implement simple functions. So that everyone can walk through several key processes of OpenAPI in a short time and understand the mechanism of OpenAPI.
:::

## API Host

- HTTP API - `https://openapi.longbridge.global`
- WebSocket - `wss://openapi-quote.longbridge.global`

## Environment Requirements

- [Python 3](https://www.python.org/)
- Pip

## Install SDK

You can install the SDK via Pip, or directly visit the [Pypi Longbridge](https://pypi.org/project/longbridge/) page to download.

```bash
$ pip3 install longbridge
```

Let's take obtaining assets as an example to demonstrate how to use the SDK.

## Configure Developer Account

1. Open an account at [Longbridge](https://longbridge.hk)
2. Complete the Python 3 environment installation and install Pip
3. 3. Get App Key, App Secret, Access Token and other information from Longbridge [Longbridge OpenAPI](https://open.longbridgeapp.com) official website

**_Get App Key, App Secret, Access Token and other information_**

Login the Longbridge [Longbridge OpenAPI](https://open.longbridgeapp.com) website,  and enter the "User Center".

The "application credential" credential information will be given on the page. After we get it, we will set the environment variable, which is convenient for later development and use.

### Setting Environment Variables In MacOS / Linux Environment

Open the terminal and enter the following command:

```bash
$ export LONGBRIDGE_APP_KEY="App Key get from user center"
$ export LONGBRIDGE_APP_SECRET="App Secret get from user center"
$ export LONGBRIDGE_ACCESS_TOKEN="Access Token get from user center"
```

### Setting Environment Variables In Windows Environment

Windows is a little more complicated, press the `Win + R` shortcut keys and enter the `cmd` command to start the command line (it is recommended to use [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) for a better development experience).

Enter the following command in the command line to set the environment variable:

```bash
C:\Users\jason> setx LONGBRIDGE_APP_KEY "App Key get from user center"
Success: the specified value has been saved.

C:\Users\jason> setx LONGBRIDGE_APP_SECRET "App Secret get from user center"
Success: the specified value has been saved.

C:\Users\jason> setx LONGBRIDGE_ACCESS_TOKEN "Access Token get from user center"
Success: the specified value has been saved.
```

:::caution

Windows environment variable restrictions, when the above 3 commands are executed successfully, you need to restart Windows or log out and log in again before you can read it.

:::

After logging out or restarting, open the command line again and enter the following command to verify that the environment variables are set correctly:

```bash
C:\Users\jason> set LONGBRIDGE
LONGBRIDGE_APP_KEY=xxxxxxx
LONGBRIDGE_APP_SECRET=xxxxxx
LONGBRIDGE_ACCESS_TOKEN=xxxxxxx
```

If it prints the value you just set correctly, then the environment variable is right.

:::tip

It is recommended that you set several environment variables such as `LONGBRIDGE_APP_KEY`, `LONGBRIDGE_APP_SECRET`, `LONGBRIDGE_ACCESS_TOKEN`. For the convenience of demonstration, these environment variables will be used in the sample code in the documents in the following chapters.

If you are inconvenient to use environment variables in the Windows environment, you can modify the code according to your personal needs.

:::

:::caution
Please pay attention to protect your **Access Token** information, anyone who gets it can trade your account through OpenAPI!
:::

## Scene Demonstration

### Get Account Balance

Create an `account_asset.py` and paste the code below:

```py
import os
import json
from longbridge.http import Auth, Config, HttpClient

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridge.global"))

resp = http.get("/v1/asset/account")
print(json.dumps(resp.data, indent=2))
```

After running `account_asset.py`, the output is as follows:

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

### Subscribe Quote

To subscribe to market data, please check the [Developer Center](https://open.longbridgeapp.com/account) - "Quote authority" is correct

- HK Market - BMP basic quotation is unable to subscribe with WebSocket as it has no real-time quote push.
- US Market - LV1 Nasdaq Basic (Only Open API).

Before running, visit the [Developer Center](https://open.longbridgeapp.com/account) and ensure that the account has the correct quote level.

:::info

If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.

https://longbridgeapp.com/download
:::

When you have the correct Quote authority, it might look like this:

<img src="https://pub.lbkrs.com/files/202205/JjCceNDSqeBJpaWv/SCR-20220507-rnm.png" className="max-w-2xl" />

Create an `subscribe_quote.py` and paste the code below:

```py
# Subscribe Quote
# https://open.longbridgeapp.com/docs/quote/subscribe/subscribe
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
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
http = HttpClient(auth, Config(base_url="https://openapi.longbridge.global"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

req = SubscribeRequest(symbol=["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"], sub_type=[SubType.QUOTE], is_first_push=True)
result = ws.send_request(Command.Subscribe, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print(f"Subscribed symbol: {resp.sub_list}")

print("Waiting for push...\nPress [Ctrl + c] to quit.")
while True:
    time.sleep(10)
```

Start to subscribe quote:

```bash
$ python subscribe_quote.py
```

We can see the result like this:

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

### Submit Order

Next, we will do a [submit order](https://open.longbridgeapp.com/docs/trade/order/submit) action, we assume that to buy `700.HK` at 50 HKD and quantity is `100`.

> NOTE: In order to prevent a successful test buy, the demo here gives a lower price and avoids the transaction. OpenAPI operations are equivalent to online transactions, please operate with caution, and pay attention to parameter details during development and debugging.

Create an `submit_order.py` and paste the code below:

```py
import os
import json
from longbridge.http import Auth, Config, HttpClient

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridge.global"))

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

After running `python submit_order.py`, the output will be as follows:

```json
{
  "order_id": "707530744027713536"
}
```

If submit the order fails, you may see an error message like this:

```
Submit order error
code: 602035
message: 委托价不符合最小价格变动单位
```

### Get Today Order

```py
import os
import json
from longbridge.http import Auth, Config, HttpClient

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridge.global"))

resp = http.get("/v1/trade/order/today")
print(json.dumps(resp.data, indent=2))
```

If you submitted an order earlier, you should see something like this:

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

The above example has fully demonstrated how to use the SDK to access the OpenAPI interface. For more interfaces, please read the [Longbridge OpenAPI Documentation](https://open.longbridgeapp.com/docs) in detail and use them according to different interfaces.

## More Examples

We provide the complete code of the above examples in the GitHub repository of Longbridge OpenAPI Python SDK, and we will continue to add or update it later.

https://github.com/longbridgeapp/openapi-python/tree/main/examples

## SDK API Document

For detailed Python SDK API document, please visit:

https://longbridge.readthedocs.io/en/latest/api.html
