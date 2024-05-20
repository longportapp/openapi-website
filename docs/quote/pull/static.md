---
id: quote_static
title: 获取标的基础信息
slug: static
sidebar_position: 1
---

该接口用于获取标的的基础信息。

<SDKLinks module="quote" klass="QuoteContext" method="static_info" />

:::info
[业务指令](../../socket/biz-command)：`10`
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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="py" label="Python">

```python
# 获取标的基础信息
# https://open.longportapp.com/docs/quote/pull/static
# 运行前请访问“开发者中心”确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过“LongPort”手机客户端，并进入“我的 - 我的行情 - 行情商城”购买开通行情权限。
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.static_info(["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"])
print(resp)
```

</TabItem>
<TableItem value="js" label="JavaScript">

https://longportapp.github.io/openapi-sdk/rust/longport/quote/struct.QuoteContext.html#method.static_info

```js
const { Config, QuoteContext } = require('longport')

let config = Config.fromEnv()
QuoteContext.new(config)
  .then((ctx) => ctx.staticInfo(['700.HK', 'AAPL.US', 'TSLA.US', 'NFLX.US']))
  .then((resp) => {
    for (let obj of resp) {
      console.log(obj.toString())
    }
  })
```

</TableItem>
</Tabs>

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
| ∟ board              | string   | 标的所属板块，详见 [Board](../objects#board---标的板块)                                          |

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
  string board = 17;
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
      "stock_derivatives": [2],
      "board": "HKEquity"
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
      "stock_derivatives": [1],
      "board": "USMain"
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
