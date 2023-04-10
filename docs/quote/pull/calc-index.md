---
id: quote_calc_index.md
title: 获取标的计算指标
slug: calc-index
sidebar_position: 19
---

该接口用于获取标的计算指标数据，根据请求指定的计算指标返回数据。

:::info
[业务指令](../../socket/protocol/request)：`26`
:::

## Request

### Parameters

| Name       | Type     | Required | Description                                                                                                                         |
| ---------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| symbols    | string[] | 是       | 标的代码列表，使用 `ticker.region` 格式，例如：`[700.HK]` <br /><br />**校验规则：**<br />每次请求支持传入的标的数量上限是 `500` 个 |
| calc_index | init32[] | 是       | 计算指标，例如：`[1,2,3]`，详见 [CalcIndex](../objects#calcindex---计算指标)                                                        |

### Protobuf

```protobuf
message SecurityCalcQuoteRequest {
  repeated string symbols = 1;
  repeated CalcIndex calc_index = 2;
}
```

### Request Example

```python
# Get Security Calc Index
# https://open.longportapp.com/docs/quote/pull/calc-index
# 运行前请访问“开发者中心”确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过“LongPort”手机客户端，并进入“我的 - 我的行情 - 行情商城”购买开通行情权限。
```

## Response

### Response Properties

| Name                       | Type     | Description                                  |
| -------------------------- | -------- | -------------------------------------------- |
| security_calc_index        | object[] | 标的指标数据                                 |
| ∟ symbol                   | string   | 标的代码                                     |
| ∟ last_done                | string   | 最新价                                       |
| ∟ change_val               | string   | 涨跌额                                       |
| ∟ change_rate              | string   | 涨跌幅 (返回百分比数据，不包含`%`符号)       |
| ∟ volume                   | int64    | 成交量                                       |
| ∟ turnover                 | string   | 成交额                                       |
| ∟ ytd_change_rate          | string   | 年初至今涨幅 (返回百分比数据，不包含`%`符号) |
| ∟ turnover_rate            | string   | 换手率 (返回百分比数据，不包含`%`符号)       |
| ∟ total_market_value       | string   | 总市值                                       |
| ∟ capital_flow             | string   | 流入资金                                     |
| ∟ amplitude                | string   | 振幅 (返回百分比数据，不包含`%`符号)         |
| ∟ volume_ratio             | string   | 量比                                         |
| ∟ pe_ttm_ratio             | string   | 市盈率（TTM）                         |
| ∟ pb_ratio                 | string   | 市净率                                       |
| ∟ dividend_ratio_ttm       | string   | 股息率 (TTM)                                 |
| ∟ five_day_change_rate     | string   | 五日涨幅 (返回百分比数据，不包含`%`符号)     |
| ∟ ten_day_change_rate      | string   | 十日涨幅 (返回百分比数据，不包含`%`符号)     |
| ∟ half_year_change_rate    | string   | 半年涨幅 (返回百分比数据，不包含`%`符号)     |
| ∟ five_minutes_change_rate | string   | 五分钟涨幅 (返回百分比数据，不包含`%`符号)   |
| ∟ expiry_date              | string   | 到期日                                       |
| ∟ strike_price             | string   | 行权价                                       |
| ∟ upper_strike_price       | string   | 上限价                                       |
| ∟ lower_strike_price       | string   | 下限价                                       |
| ∟ outstanding_qty          | int64    | 街货量                                       |
| ∟ outstanding_ratio        | string   | 街货比 (返回百分比数据，不包含`%`符号)       |
| ∟ premium                  | string   | 溢价率 (返回百分比数据，不包含`%`符号)       |
| ∟ itm_otm                  | string   | 价内/价外 (返回百分比数据，不包含`%`符号)    |
| ∟ implied_volatility       | string   | 隐含波动率 (返回百分比数据，不包含`%`符号)   |
| ∟ warrant_delta            | string   | 对冲值                                       |
| ∟ call_price               | string   | 收回价                                       |
| ∟ to_call_price            | string   | 距收回价 (返回百分比数据，不包含`%`符号)     |
| ∟ effective_leverage       | string   | 有效杠杆                                     |
| ∟ leverage_ratio           | string   | 杠杆比率                                     |
| ∟ conversion_ratio         | string   | 换股比率                                     |
| ∟ balance_point            | string   | 打和点                                       |
| ∟ open_interest            | int64    | 未平仓数                                     |
| ∟ delta                    | string   | Delta                                        |
| ∟ gamma                    | string   | Gamma                                        |
| ∟ theta                    | string   | Theta                                        |
| ∟ vega                     | string   | Vega                                         |
| ∟ rho                      | string   | Rho                                          |

### Protobuf

```protobuf
message SecurityCalcIndex {
  string symbol = 1;
  string last_done = 2;
  string change_val = 3;
  string change_rate = 4;
  int64 volume = 5;
  string turnover = 6;
  string ytd_change_rate = 7;
  string turnover_rate = 8;
  string total_market_value = 9;
  string capital_flow = 10;
  string amplitude = 11;
  string volume_ratio = 12;
  string pe_ttm_ratio = 13;
  string pb_ratio = 14;
  string dividend_ratio_ttm = 15;
  string five_day_change_rate = 16;
  string ten_day_change_rate = 17;
  string half_year_change_rate = 18;
  string five_minutes_change_rate = 19;
  string expiry_date = 20;
  string strike_price = 21;
  string upper_strike_price = 22;
  string lower_strike_price = 23;
  int64  outstanding_qty = 24;
  string outstanding_ratio = 25;
  string premium = 26;
  string itm_otm = 27;
  string implied_volatility = 28;
  string warrant_delta = 29;
  string call_price = 30;
  string to_call_price = 31;
  string effective_leverage = 32;
  string leverage_ratio = 33;
  string conversion_ratio = 34;
  string balance_point = 35;
  int64 open_interest = 36;
  string delta = 37;
  string gamma = 38;
  string theta = 39;
  string vega = 40;
  string rho = 41;
}

message SecurityCalcQuoteResponse {
  repeated SecurityCalcIndex security_calc_index = 1;
}
```

### Response JSON Example

```json
{
  "securityCalcIndex": [
    {
      "symbol": "AAPL.US",
      "lastDone": "131.880",
      "changeVal": "-5.2500",
      "changeRate": "-3.83",
      "volume": "122207099",
      "turnover": "16269088361.000",
      "ytdChangeRate": "-25.63",
      "turnoverRate": "0.76",
      "totalMarketValue": "2134501670280.00",
      "capitalFlow": "14664053535.556",
      "amplitude": "2.74",
      "volumeRatio": "3.22",
      "peTtmRatio": "21.26",
      "pbRatio": "31.71",
      "dividendRatioTtm": "0.64",
      "fiveDayChangeRate": "-9.76",
      "tenDayChangeRate": "-11.87",
      "halfYearChangeRate": "-7.01",
      "fiveMinutesChangeRate": "0.00"
    },
    {
      "symbol": "69672.HK",
      "lastDone": "0.010",
      "changeRate": "0.00",
      "expiryDate": "20221024",
      "strikePrice": "379.880",
      "outstandingQty": "6090000",
      "outstandingRatio": "7.61",
      "premium": "0.67",
      "itmOtm": "0.65",
      "callPrice": "375.880",
      "toCallPrice": "-100.00",
      "leverageRatio": "75.48",
      "balancePoint": "374.880"
    },
    {
      "symbol": "AAPL220617C137000.US",
      "lastDone": "1.17",
      "changeVal": "-2.04",
      "changeRate": "-63.55",
      "volume": "23499",
      "turnover": "3903660.00",
      "expiryDate": "20220617",
      "strikePrice": "137.00",
      "premium": "11709.40",
      "impliedVolatility": "43.54",
      "openInterest": "5210",
      "delta": "0.263",
      "gamma": "0.043",
      "theta": "-1.266",
      "vega": "5.660",
      "rho": "0.580"
    },
    {
      "symbol": "HSI.HK",
      "lastDone": "21119.650",
      "changeVal": "52.070",
      "changeRate": "0.25",
      "volume": "96449546281",
      "turnover": "96449546281.000",
      "ytdChangeRate": "-9.74",
      "amplitude": "1.86",
      "volumeRatio": "0.59",
      "fiveDayChangeRate": "-1.91",
      "tenDayChangeRate": "-0.02",
      "halfYearChangeRate": "-11.83",
      "fiveMinutesChangeRate": "0.00"
    }
  ]
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败       |
| 3          | 301606     | 限流           | 降低请求频次                 |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理     |
| 7          | 301600     | 请求标的不存在 | 检查请求的 `symbol` 是否正确 |
| 7          | 301603     | 标的无行情     | 标的没有请求的行情数据       |
| 7          | 301604     | 无权限         | 没有获取标的行情的权限       |
