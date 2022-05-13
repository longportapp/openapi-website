---
id: quote_static
title: 获取标的基础信息
slug: static
sidebar_position: 1
---

该接口用于获取标的的基础信息。

:::info
[业务指令](../../socket/protocol/request)：`10`
:::

## Request

### Parameters

| Name   | Type     | Required | Description                                                                                                                         |
| ------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | 是       | 标的代码列表，使用 `ticker.region` 格式，例如：`[700.HK]` <br /><br />**校验规则：**<br />每次请求支持传入的标的数量上限是 `500` 个 |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

### Request Example

```python
# 获取标的基础信息
# https://open.longbridgeapp.com/docs/quote/pull/static
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 变量定义参见：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, MultiSecurityRequest, SecurityStaticInfoResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))
ws = WsClient("wss://openapi-quote.longbridgeapp.com", http, MyWsCallback())

# 运行前请访问 “开发者中心“ 确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。
req = MultiSecurityRequest(symbol=["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"])
result = ws.send_request(Command.QuerySecurityStaticInfo, req.SerializeToString())
resp = SecurityStaticInfoResponse()
resp.ParseFromString(result)

print(f"Security static info:\n\n {resp.secu_static_info}")
```

## Response

### Response Properties

| Name                 | Type     | Description                                                                                      |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| secu_static_info     | object[] | 标的基础数据列表                                                                                 |
| ∟ symbol             | string   | 标的代码                                                                                         |
| ∟ name_cn            | string   | 中文简体标的名称                                                                                 |
| ∟ name_en            | string   | 英文标的名称                                                                                     |
| ∟ name_hk            | string   | 中文繁体标的名称                                                                                 |
| ∟ exchange           | string   | 标的所属交易所                                                                                   |
| ∟ currency           | string   | 交易币种 <br /><br />**可选值：**<br />`CNY` <br />`USD` <br />`SGD` <br />`HKD`                 |
| ∟ lot_size           | int32    | 每手股数                                                                                         |
| ∟ total_shares       | int64    | 总股本                                                                                           |
| ∟ circulating_shares | int64    | 流通股本                                                                                         |
| ∟ hk_shares          | int64    | 港股股本 (仅港股)                                                                                |
| ∟ eps                | string   | 每股盈利                                                                                         |
| ∟ eps_ttm            | string   | 每股盈利 (TTM)                                                                                   |
| ∟ bps                | string   | 每股净资产                                                                                       |
| ∟ dividend_yield     | string   | 股息                                                                                             |
| ∟ stock_derivatives  | int32[]  | 如果标的是正股，可提供的衍生品行情类型 <br /><br />**可选值：**<br />`1` - 期权 <br />`2` - 轮证 |

### Protobuf

```protobuf
message SecurityStaticInfoResponse {
  repeated StaticInfo secu_static_info = 1;
}

message StaticInfo {
  string symbol = 1;
  string name_cn = 2;
  string name_en = 3;
  string name_hk = 4;
  string listing_date = 5;
  string exchange = 6;
  string currency = 7;
  int32 lot_size = 8;
  int64 total_shares = 9;
  int64 circulating_shares = 10;
  int64 hk_shares = 11;
  string eps = 12;
  string eps_ttm = 13;
  string bps = 14;
  string dividend_yield = 15;
  repeated int32 stock_derivatives = 16;
}
```

### Response JSON Example

```json
{
  "secu_static_info": [
    {
      "symbol": "700.HK",
      "name_cn": "腾讯控股",
      "name_en": "TENCENT",
      "name_hk": "騰訊控股",
      "exchange": "SEHK",
      "currency": "HKD",
      "lot_size": 100,
      "total_shares": 9612464038,
      "circulating_shares": 9612464038,
      "hk_shares": 9612464038,
      "eps": "28.4394",
      "eps_ttm": "28.4394",
      "bps": "103.40413",
      "dividend_yield": "1.6",
      "stock_derivatives": [2]
    },
    {
      "symbol": "AAPL.US",
      "name_cn": "苹果",
      "name_en": "Apple Inc.",
      "exchange": "NASD",
      "currency": "USD",
      "lot_size": 1,
      "total_shares": 1631944100,
      "circulating_shares": 16302661350,
      "eps": "5.669",
      "eps_ttm": "6.0771",
      "bps": "4.40197",
      "dividend_yield": "0.85",
      "stock_derivatives": [1]
    }
  ]
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                     |
| 3          | 301606     | 限流           | 降低请求频次                               |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理                   |
| 7          | 301607     | 接口限制       | 请求的标的数量超限，请减少单次请求标的数量 |
