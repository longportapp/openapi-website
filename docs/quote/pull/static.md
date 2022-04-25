---
id: quote_static
title: 获取标的基础信息
slug: static
sidebar_position: 1
---

获取标的的基础信息

## 协议指令

```
10
```

## 请求

### 参数

| 名称   | 类型     | 必须 | 描述                       | 默认值 | 示例       |
| ------ | -------- | ---- | -------------------------- | ------ | ---------- |
| symbol | string[] | 是   | 标的列表 - `ticker.region` |        | `00700.HK` |

### proto

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

## 响应

### 参数

| 名称                | 类型     | 描述                                                     |
| ------------------- | -------- | -------------------------------------------------------- |
| secu_quote          | object[] | 标的基础数据列表                                         |
| ∟symbol             | string   | 标的代码                                                 |
| ∟name_cn            | string   | 标的名称，例如：`中文 (简)`                              |
| ∟name_en            | string   | 标的名称，例如：`英文`                                   |
| ∟name_hk            | string   | 标的名称，例如：`中文 (繁)`                              |
| ∟exchange           | string   | 标的所属交易所                                           |
| ∟currency           | string   | 交易币种，例如：`SGD/USD/HKD/CNY`                        |
| ∟lot_size           | int32    | 每手股数                                                 |
| ∟total_shares       | int64    | 总股本                                                   |
| ∟circulating_shares | int64    | 流通股本                                                 |
| ∟hk_shares          | int64    | 港股股本 (仅港股)                                        |
| ∟eps                | string   | 每股盈利                                                 |
| ∟eps_ttm            | string   | 每股盈利 (TTM)                                           |
| ∟bps                | string   | 每股净资产                                               |
| ∟dividend_yield     | string   | 股息                                                     |
| ∟stock_derivatives  | int32[]  | 如果标的是正股。可提供的衍生品行情类型 1 - 期权 2 - 轮证 |

### proto

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

## 接口限制

- 每秒平均请求次数 10。瞬时并发次数 5。
- 每次请求，接口参数 标的列表 支持传入的标的数量上限是 300 个。

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                     |
| 3          | 301606     | 限流           | 降低请求频次                               |
| 7          | 301602     | 服务端内部错误 |                                            |
| 7          | 301607     | 接口限制       | 请求的标的数量超限，请减少单次请求标的数量 |
