---
id: quote_warrant_filter
title: 获取轮证筛选列表
slug: warrant-filter
sidebar_position: 14
---

该接口用于获取轮证行情列表数据，支持按不同字段排序和筛选轮证。

:::info

[业务指令](../../socket/biz-command)：`23`

:::

## Request

### Parameters

| Name          | Type    | Required | Description                                                                                                                                     |
|---------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| symbol        | string  | 是       | 标的代码，使用 `ticker.region` 格式，例如：`700.HK`                                                                                                |
| filter_config | object  | 是       | 筛选条件                                                                                                                                        |
| ∟ sort_by     | int32   | 是       | 根据哪一项数据进行排序，例如：`0`，序号见响应数据 `OrderSequence` 字段。                                                                            |
| ∟ sort_order  | int32   | 是       | 升降顺序，例如：`1` <br /><br />**可选值：**<br />`0` - 升序<br />`1` - 降序                                                                       |
| ∟ sort_offset | int32   | 是       | 分页的第一条数据偏移量，例如 `0`                                                                                                                 |
| ∟ sort_count  | int32   | 是       | 分页的每一页数量，例如 `20` <br /><br />**校验规则：**<br /> 每页数量最大为 `500`                                                                 |
| ∟ type        | int32[] | 否       | 筛选轮证类型 例如：`[0,1]` <br /><br />**可选值：**<br />`0` - 认购<br />`1` - 认沽<br />`2` - 牛证<br />`3` - 熊证<br />`4` - 界内证             |
| ∟ issuer      | int32[] | 否       | 筛选发行商，例如：`[12,14]`，[发行商 ID](./issuer) 通过接口获取                                                                                    |
| ∟ expiry_date | int32[] | 否       | 筛选轮证过期时间，例如：`[1]` <br /><br />**可选值：**<br />`1` - 低于 3 个月<br />`2` - 3 - 6 个月<br />`3` - 6 - 12 个月<br />`4` - 大于 12 个月 |
| ∟ price_type  | int32[] | 否       | 筛选价内价外，例如：`[2]` <br /><br />**可选值：**<br />`1` - 价内<br />`2` - 价外                                                                 |
| ∟ status      | int32[] | 否       | 筛选状态，例如：`[2]` <br /><br />**可选值：**<br />`2`- 终止交易<br />`3` - 等待上市<br />`4` - 正常                                              |
| language      | int32   | 是       | 响应的语言，例如：`[1]` <br /><br />**可选值：**<br />`0` - 简体<br />`1` - English<br />`2` - 繁体                                                |

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
from longport.openapi import QuoteContext, Config, WarrantSortBy, SortOrderType

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.warrant_list("700.HK", WarrantSortBy.LastDone, SortOrderType.Ascending)
print(resp)
```

## Response

### Response Properties

| Name                 | Type     | Description                                                                             | OrderSequence | Support_Call/Put | Support_Bull/Bear | Support_Inline |
|----------------------|----------|-----------------------------------------------------------------------------------------|---------------|------------------|-------------------|----------------|
| warrant_list         | object[] | 涡轮筛选数据列表                                                                        |               |                  |                   |                |
| ∟ symbol             | string   | 标的代码                                                                                |               | true             | true              | true           |
| ∟ name               | string   | 标的名称                                                                                |               | true             | true              | true           |
| ∟ last_done          | string   | 最新价                                                                                  | 0             | true             | true              | true           |
| ∟ change_rate        | string   | 涨跌幅                                                                                  | 1             | true             | true              | true           |
| ∟ change_val         | string   | 涨跌额                                                                                  | 2             | true             | true              | true           |
| ∟ volume             | int64    | 成交量                                                                                  | 3             | true             | true              | true           |
| ∟ turnover           | string   | 成交额                                                                                  | 4             | true             | true              | true           |
| ∟ expiry_date        | string   | 到期日，使用 `YYMMDD` 格式                                                               | 5             | true             | true              | true           |
| ∟ strike_price       | string   | 行权价                                                                                  | 6             | true             | true              | false          |
| ∟ upper_strike_price | string   | 上限价                                                                                  | 7             | false            | false             | true           |
| ∟ lower_strike_price | string   | 下限价                                                                                  | 8             | false            | false             | true           |
| ∟ outstanding_qty    | string   | 街货量                                                                                  | 9             | true             | true              | true           |
| ∟ outstanding_ratio  | string   | 街货比                                                                                  | 10            | true             | true              | true           |
| ∟ premium            | string   | 溢价率                                                                                  | 11            | true             | true              | true           |
| ∟ itm_otm            | string   | 价内/价外                                                                               | 12            | true             | true              | false          |
| ∟ implied_volatility | string   | 引伸波幅                                                                                | 13            | true             | false             | false          |
| ∟ delta              | string   | 对冲值                                                                                  | 14            | true             | false             | false          |
| ∟ call_price         | string   | 收回价                                                                                  | 15            | false            | true              | false          |
| ∟ to_call_price      | string   | 距收回价                                                                                | 16            | false            | true              | false          |
| ∟ effective_leverage | string   | 有效杠杆                                                                                | 17            | true             | false             | false          |
| ∟ leverage_ratio     | string   | 杠杆比率                                                                                | 18            | true             | true              | true           |
| ∟ conversion_ratio   | string   | 换股比率                                                                                | 19            | true             | true              | false          |
| ∟ balance_point      | string   | 打和点                                                                                  | 20            | true             | true              | false          |
| ∟ status             | int32    | 状态，<br /><br />**可选值：**<br />`2`- 终止交易<br />`3` - 等待上市<br />`4` - 正常交易 | 21            | true             | true              | true           |
| total_count          | int32    | 符合条件的轮证总数量                                                                    |               |                  |                   |                |

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
  string status = 24;
}
```

### Response JSON Example

```json
{
  "warrant_list": [
    {
      "symbol": "13157.HK",
      "name": "腾讯麦银二七沽 A",
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
      "status": 4
    },
    {
      "symbol": "13649.HK",
      "name": "腾讯摩通二五沽 A",
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
      "status": 4
    }
  ],
  "total_count": 1197
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                     |
|------------|------------|--------------|--------------------------|
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败       |
| 3          | 301606     | 限流           | 降低请求频次                 |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理     |
| 7          | 301600     | 请求标的不存在 | 检查请求的 `symbol` 是否正确 |
| 7          | 301603     | 标的无行情     | 标的没有请求的行情数据       |
| 7          | 301604     | 无权限         | 没有获取标的行情的权限       |
| 7          | 301607     | 接口限制       | 减少每页数据数量             |
