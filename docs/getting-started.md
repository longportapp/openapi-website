---
sidebar_position: 1
slug: /getting-started
title: 快速开始
id: getting-started
---

## 前言

Longbridge OpenAPI SDK 基于 Rust 底层提供标准实现，通过 FFI 提供给各类语言使用，目前我们已经发布了 Python、C++ 的 SDK，其他语言的支持后面会陆续推出。

- **Python** - https://github.com/longbridgeapp/openapi-python
- **C++** - https://github.com/longbridgeapp/openapi-cpp

目前，我们支持如下系统架构：

- Linux - x86_64 & aarch64
- macOS - x86_64 & aarch64
- Windows - x86_64 & i686

:::tip
本文以 Python SDK 为例讲解如何使用 SDK 实现简单的功能。以便大家可以在短的时间内走通 OpenAPI 的几个关键流程，理解 OpenAPI 的机制。
:::

## API Host

- HTTP API - `https://openapi.longbridge.global`
- WebSocket - `wss://openapi-quote.longbridge.global`

## 环境需求

- Python 3+
- Pip

## 安装 SDK

你可以通过 Pip 安装 SDK，或者直接访问 [Pypi Longbridge](https://pypi.org/project/longbridge/) 页面来下载。

```bash
$ pip3 install longbridge
```

下面我们以获取资产为例，演示一下如何使用 SDK。

## 配置开发者账户

1. 在 [Longbridge](https://longbridge.hk) 开户
2. 完成 Python 3 环境安装，并安装 Pip
3. 从 [Longbridge OpenAPI](https://open.longbridgeapp.com) 官网获取 ` App Key`, `App Secret`, `Access Token` 等信息。

**_获取 App Key, App Secret, Access Token 等信息_**

访问 [Longbridge OpenAPI](https://open.longbridgeapp.com) 网站，登录后，进入 “个人中心”。

在页面上会给出 “应用凭证” 凭证信息，我们拿到以后设置环境变量，便于后面开发使用方便。

```bash
$ export LONGBRIDGE_APP_KEY=从页面上获取到的 App Key
$ export LONGBRIDGE_APP_SECRET=从页面上获取到的 App Secret
$ export LONGBRIDGE_ACCESS_TOKEN=从页面上获取到的 Access Token
```

:::tip
建议您设置好 `LONGBRIDGE_APP_KEY`, `LONGBRIDGE_APP_SECRET`, `LONGBRIDGE_ACCESS_TOKEN` 这几个环境变量。我们为了演示方便，后面各章节文档中的示例代码都会使用这几个环境变量。

如您在 Windows 环境不方便使用环境变量，可根据个人需要，修改代码。
:::

:::caution
请注意保护好您的 **Access Token** 信息，任何人获得到它，都可以通过 OpenAPI 来交易你的账户！
:::

## 场景示范

### 获取资产总览

创建一个 `main.py` 贴入下面的代码：

```py
import os
import json
from longbridge.http import Auth, Config, HttpClient

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridge.global"))

resp = http.get("/v1/asset/account")
print(json.dumps(resp.data, indent=2))
```

运行 `main.py` 后，会输出如下：

```bash
python3 main.py
```

```json
{
  "list": [
    {
      "cashInfos": [
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

### 订阅实时行情

订阅行情数据请检查 [开发者中心](https://open.longbridgeapp.com/account) - “行情权限” 是否正确

- 港股 - BMP 基础报价，无实时行情推送，无法用 WebSocket 订阅
- 美股 - LV1 纳斯达克最优报价 (只限 Open API）

运行前访问 [开发者中心](https://open.longbridgeapp.com/account)，检查确保账户有正确的行情权限。

:::info

如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。

https://longbridgeapp.com/download
:::

当你有正确的行情权限，看起来可能会是这样：

<img src="https://pub.lbkrs.com/files/202205/JjCceNDSqeBJpaWv/SCR-20220507-rnm.png" className="max-w-2xl" />

创建一个 `subscribe_quote.py` 并写入下面的代码：

```py
# 订阅行情数据
# https://open.longbridgeapp.com/docs/quote/subscribe/subscribe
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 变量定义参见：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
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

启动行情订阅：

```bash
$ python3 subscribe_quote.py
```

我们可以看到这样的结果：

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

### 委托下单

下面我们做一次 [委托下单](https://open.longbridgeapp.com/docs/trade/order/submit) 动作，我们假设要以 50 HKD 买入 `700.HK` 的数量为 `100`。

> NOTE: 为了防止测试买入成功，这里演示给了一个较低的价格，避免成交。OpenAPI 操作均等同与线上交易，请谨慎操作，开发调试注意参数细节。

创建一个 `submit_order.py` 并写入下面的代码：

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

执行 `python3 submit_order.py` 后，会输出如下：

```json
{
  "order_id": "707530744027713536"
}
```

加入下单失败，你可能会看到这样的错误信息：

```
Submit order error
code: 602035
message: 委托价不符合最小价格变动单位
```

### 获取当日订单

```py
import os
import json
from longbridge.http import Auth, Config, HttpClient

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridge.global"))

resp = http.get("/v1/trade/order/today")
print(json.dumps(resp.data, indent=2))
```

如果前面你有提交订单，你应该会看到这样的结果：

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

上面例子已经完整演示了如何使用 SDK 访问 OpenAPI 的接口，更多其他接口请详细阅读 [Longbridge OpenAPI 文档](https://open.longbridgeapp.com/docs)，根据不同的接口使用。

## 更多例子

我们在 Longbridge OpenAPI Python SDK 的 GitHub 仓库中提供了上面几个例子的完整代码，当然后期我们也会持续往里面补充或更新。

https://github.com/longbridgeapp/openapi-python/tree/main/examples

## SDK API 文档

Python SDK 的详细 API 文档请访问：

https://longbridge.readthedocs.io/en/latest/api.html
