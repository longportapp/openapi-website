---
id: quote_trade
title: 获取标的成交明细
slug: trade
sidebar_position: 8
---

该接口用于获取标的的成交明细数据。

:::info

[业务指令](../../socket/protocol/request)：`17`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                                              |
| ------ | ------ | -------- | ------------------------------------------------------------------------ |
| symbol | string | 是       | 标的代码，使用 `ticker.region` 格式，例如：`700.HK`                      |
| count  | int32  | 是       | 请求的逐笔明细数量 <br /><br />**校验规则：**<br />请求数量最大为 `1000` |

### Protobuf

```protobuf
message SecurityTradeRequest {
  string symbol = 1;
  int32 count = 2;
}
```

### Request Example

```python
# 获取标的成交明细
# https://open.longbridgeapp.com/docs/quote/pull/trade
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 变量定义参见：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, SecurityTradeRequest, SecurityTradeResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))
ws = WsClient("wss://openapi-quote.longbridgeapp.com", http, MyWsCallback())

# 运行前请访问 “开发者中心“ 确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。
req = SecurityTradeRequest(symbol="700.HK", count=10)
result = ws.send_request(Command.QueryTrade, req.SerializeToString())
resp = SecurityTradeResponse()
resp.ParseFromString(result)

print(f"Trade:\n\n {resp}")
```

## Response

### Response Properties

| Name            | Type     | Description                                                                       |
| --------------- | -------- | --------------------------------------------------------------------------------- |
| symbol          | string   | 标的代码                                                                          |
| trades          | object[] | 逐笔明细数据                                                                      |
| ∟ price         | string   | 价格                                                                              |
| ∟ volume        | int64    | 成交量                                                                            |
| ∟ timestamp     | int64    | 成交时间                                                                          |
| ∟ trade_type    | string   | [交易类型说明](#交易类型)                                                         |
| ∟ direction     | int32    | 交易方向 <br /><br />**可选值：**<br />`0` - nature<br />`1` - down<br />`2` - up |
| ∟ trade_session | int32    | 交易时段，详见 [TradeSession](../objects#tradesession---交易时段)                 |

#### 交易类型

港股

- `*` - 场外交易
- `D` - 碎股交易
- `M` - 非自动对盘
- `P` - 开市前成交盘
- `U` - 竞价交易
- `X` - 同一券商非自动对盘
- `Y` - 同一券商自动对盘
- ` ` - 自动对盘

美股

- ` ` - 自动对盘
- `A` - 收购
- `B` - 批量交易
- `D` - 分配
- `F` - 跨市扫盘单
- `G` - 批量卖出
- `H` - 离价交易
- `I` - 碎股交易
- `K` - 第 155 条交易（纽交所规则）
- `M` - 交易所收盘价
- `P` - 前参考价
- `Q` - 交易所开盘价
- `S` - 拆单交易
- `V` - 附属交易
- `W` - 平均价成交
- `X` - 跨市场交易
- `1` - 停售股票（常规交易）

### Protobuf

```protobuf
message SecurityTradeResponse {
  string symbol = 1;
  repeated Trade trades = 2;
}

message Trade {
  string price = 1;
  int64 volume = 2;
  int64 timestamp = 3;
  string trade_type = 4;
  int32 direction = 5;
  TradeSession trade_session = 6;
}
```

### Response JSON Example

```json
{
  "symbol": "AAPL.US",
  "trades": [
    {
      "price": "158.760",
      "volume": 1,
      "timestamp": 1651103979,
      "trade_type": "I",
      "trade_session": 2
    },
    {
      "price": "158.745",
      "volume": 1,
      "timestamp": 1651103985,
      "trade_type": "I",
      "trade_session": 2
    },
    {
      "price": "158.800",
      "volume": 1,
      "timestamp": 1651103995,
      "trade_type": "I",
      "trade_session": 2
    }
  ]
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                         |
| ---------- | ---------- | -------------- | -------------------------------- |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败           |
| 3          | 301606     | 限流           | 降低请求频次                     |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理         |
| 7          | 301600     | 请求标的不存在 | 检查请求的 `symbol` 是否正确     |
| 7          | 301603     | 标的无行情     | 标的没有请求的行情数据           |
| 7          | 301604     | 无权限         | 没有获取标的行情的权限           |
| 7          | 301607     | 接口限制       | 请求的数据数量超限，减少数据数量 |
