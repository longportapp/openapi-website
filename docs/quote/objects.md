---
sidebar_position: 2
id: quote_object
title: 行情命名词典
slug: objects
---

### TradeStatus - 交易状态

交易状态

| ID  | 描述            |
| --- | --------------- |
| 0   | 正常交易        |
| 1   | 停牌            |
| 2   | 退市            |
| 3   | 熔断            |
| 4   | 新股待上市      |
| 5   | 代码变更        |
| 6   | 待开盘          |
| 7   | 拆合股暂停交易  |
| 8   | 已到期 (衍生品) |
| 9   | 轮证待上市      |
| 10  | 终止交易        |

#### Protobuf

```protobuf
enum TradeStatus {
  NORMAL = 0;
  HALTED = 1;
  DELISTED = 2;
  FUSE = 3;
  PREPARE_LIST = 4;
  CODE_MOVED = 5;
  TO_BE_OPENED = 6;
  SPLIT_STOCK_HALTS = 7;
  EXPIRED = 8;
  WARRANT_PREPARE_LIST = 9;
  SUSPEND_TRADE = 10;
}
```

### TradeSession - 交易时段

交易时段

| ID  | 描述     |
| --- | -------- |
| 0   | 盘中交易 |
| 1   | 盘前交易 |
| 2   | 盘后交易 |

#### Protobuf

```protobuf
enum TradeSession {
  NORMAL_TRADE = 0;
  PRE_TRADE = 1;
  POST_TRADE = 2;
}
```

### Period - K 线周期

| ID   | 描述          |
| ---- | ------------- |
| 1    | 一分钟 k 线   |
| 5    | 五分钟 k 线   |
| 15   | 十五分钟 k 线 |
| 30   | 三十分钟 k 线 |
| 60   | 六十分钟 k 线 |
| 1000 | 日 k 线       |
| 2000 | 周 k 线       |
| 3000 | 月 k 线       |
| 4000 | 年 k 线       |

#### Protobuf

```protobuf
enum Period {
  UNKNOWN_PERIOD = 0;
  ONE_MINUTE = 1;
  FIVE_MINUTE = 5;
  FIFTEEN_MINUTE = 15;
  THIRTY_MINUTE = 30;
  SIXTY_MINUTE = 60;
  DAY = 1000;
  WEEK = 2000;
  MONTH = 3000;
  YEAR = 4000;
}
```

### AdjustType - K 线复权类型

| ID  | 描述   |
| --- | ------ |
| 0   | 除权   |
| 1   | 前复权 |

#### Protobuf

```protobuf
enum AdjustType {
  NO_ADJUST = 0;
  FORWARD_ADJUST = 1;
}
```

### SubType - 订阅数据的类型

| ID  | 描述     |
| --- | -------- |
| 1   | 价格     |
| 2   | 买卖盘口 |
| 3   | 经纪队列 |
| 4   | 逐笔明细 |

#### Protobuf

```protobuf
enum SubType {
  UNKNOWN_TYPE = 0;
  QUOTE = 1;
  DEPTH = 2;
  BROKERS = 3;
  TRADE = 4;
}
```

### SecurityType

| ID  | 描述     |
| --- | -------- |
| 0   | 所有类型 |
| 1   | 股票     |
| 2   | ETF      |
| 3   | 指数     |
| 4   | Option   |
| 5   | 指数     |
| 6   | 指数     |
| 7   | 指数     |
| 8   | 指数     |
| 9   | 指数     |
| 10  | 指数     |

### CalcIndex - 计算指标

| ID  | 描述         | 支持的标的类型   |
| --- | ------------ | ---------------- |
| 1   | 最新价       | 所有类型         |
| 2   | 涨跌额       | 所有类型         |
| 3   | 涨跌幅       | 所有类型         |
| 4   | 成交量       | 所有类型         |
| 5   | 成交额       | 所有类型         |
| 6   | 年初至今涨幅 | 期权、轮证不支持 |
| 7   | 换手率       | 期权、轮证不支持 |
| 8   | 总市值       | 期权、轮证不支持 |
| 9   | 资金流向     | 期权、轮证不支持 |
| 10  | 振幅         | 期权、轮证不支持 |
| 11  | 量比         | 期权、轮证不支持 |
| 12  | 市盈率 (TTM) | 期权、轮证不支持 |
| 13  | 市净率       | 期权、轮证不支持 |
| 14  | 股息率 (TTM) | 期权、轮证不支持 |
| 15  | 五日涨幅     | 期权、轮证不支持 |
| 16  | 十日涨幅     | 期权、轮证不支持 |
| 17  | 半年涨幅     | 期权、轮证不支持 |
| 18  | 五分钟涨幅   | 期权、轮证不支持 |
| 19  | 到期日       | 仅期权、轮证支持 |
| 20  | 行权价       | 仅期权、轮证支持 |
| 21  | 上限价       | 仅轮证支持       |
| 22  | 下限价       | 仅轮证支持       |
| 23  | 街货量       | 仅轮证支持       |
| 24  | 街货比       | 仅轮证支持       |
| 24  | 街货比       | 仅轮证支持       |
| 24  | 街货比       | 仅轮证支持       |
| 25  | 溢价率       | 仅轮证支持       |
| 26  | 价内/价外    | 仅轮证支持       |
| 27  | 隐含波动率   | 仅期权、轮证支持 |
| 28  | 对冲值       | 仅轮证支持       |
| 29  | 收回价       | 仅轮证支持       |
| 30  | 距收回价     | 仅轮证支持       |
| 31  | 有效杠杆     | 仅轮证支持       |
| 32  | 杠杆比率     | 仅轮证支持       |
| 33  | 换股比率     | 仅轮证支持       |
| 34  | 打和点       | 仅轮证支持       |
| 35  | 未平仓数     | 仅期权支持       |
| 36  | Delta        | 仅期权支持       |
| 37  | Gamma        | 仅期权支持       |
| 38  | Theta        | 仅期权支持       |
| 39  | Vega         | 仅期权支持       |
| 39  | Rho          | 仅期权支持       |

#### Protobuf

```protobuf
enum CalcIndex {
  CALCINDEX_UNKNOWN = 0;
  CALCINDEX_LAST_DONE = 1;
  CALCINDEX_CHANGE_VAL = 2;
  CALCINDEX_CHANGE_RATE = 3;
  CALCINDEX_VOLUME = 4;
  CALCINDEX_TURNOVER = 5;
  CALCINDEX_YTD_CHANGE_RATE = 6;
  CALCINDEX_TURNOVER_RATE = 7;
  CALCINDEX_TOTAL_MARKET_VALUE = 8;
  CALCINDEX_CAPITAL_FLOW = 9;
  CALCINDEX_AMPLITUDE = 10;
  CALCINDEX_VOLUME_RATIO = 11;
  CALCINDEX_PE_TTM_RATIO = 12;
  CALCINDEX_PB_RATIO = 13;
  CALCINDEX_DIVIDEND_RATIO_TTM = 14;
  CALCINDEX_FIVE_DAY_CHANGE_RATE = 15;
  CALCINDEX_TEN_DAY_CHANGE_RATE = 16;
  CALCINDEX_HALF_YEAR_CHANGE_RATE = 17;
  CALCINDEX_FIVE_MINUTES_CHANGE_RATE = 18;
  CALCINDEX_EXPIRY_DATE = 19;
  CALCINDEX_STRIKE_PRICE = 20;
  CALCINDEX_UPPER_STRIKE_PRICE = 21;
  CALCINDEX_LOWER_STRIKE_PRICE = 22;
  CALCINDEX_OUTSTANDING_QTY = 23;
  CALCINDEX_OUTSTANDING_RATIO = 24;
  CALCINDEX_PREMIUM = 25;
  CALCINDEX_ITM_OTM = 26;
  CALCINDEX_IMPLIED_VOLATILITY = 27;
  CALCINDEX_WARRANT_DELTA = 28;
  CALCINDEX_CALL_PRICE = 29;
  CALCINDEX_TO_CALL_PRICE = 30;
  CALCINDEX_EFFECTIVE_LEVERAGE = 31;
  CALCINDEX_LEVERAGE_RATIO = 32;
  CALCINDEX_CONVERSION_RATIO = 33;
  CALCINDEX_BALANCE_POINT = 34;
  CALCINDEX_OPEN_INTEREST = 35;
  CALCINDEX_DELTA = 36;
  CALCINDEX_GAMMA = 37;
  CALCINDEX_THETA = 38;
  CALCINDEX_VEGA = 39;
  CALCINDEX_RHO = 40;
}
```
