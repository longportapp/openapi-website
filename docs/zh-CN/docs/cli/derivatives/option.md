---
title: 'option'
sidebar_label: 'option'
sidebar_position: 1
---

# longbridge option

查询美股期权合约的实时行情，或浏览任意标的的完整期权链。

## 基本用法

```bash
longbridge option chain AAPL.US
```

```
| Strike | Call Symbol          | Put Symbol           | Standard |
|--------|----------------------|----------------------|----------|
| 180    | AAPL260406C180000.US | AAPL260406P180000.US | true     |
| 185    | AAPL260406C185000.US | AAPL260406P185000.US | true     |
| 190    | AAPL260406C190000.US | AAPL260406P190000.US | true     |
| 195    | AAPL260406C195000.US | AAPL260406P195000.US | true     |
| 200    | AAPL260406C200000.US | AAPL260406P200000.US | true     |
...
```

## 示例

### 浏览股票期权链

不加 `--date` 时，返回 AAPL 期权所有可用的到期日。选择一个到期日后，使用 `--date` 参数查看对应的行权价列表。

### 查看指定到期日的行权价

```bash
longbridge option chain AAPL.US --date 2026-04-17 --format json
```

```json
[
  { "call_symbol": "AAPL260417C110000.US", "put_symbol": "AAPL260417P110000.US", "standard": "true", "strike": "110" },
  { "call_symbol": "AAPL260417C115000.US", "put_symbol": "AAPL260417P115000.US", "standard": "true", "strike": "115" },
  { "call_symbol": "AAPL260417C120000.US", "put_symbol": "AAPL260417P120000.US", "standard": "true", "strike": "120" }
]
```

每行展示该行权价对应的认购和认沽合约代码。从 `call_symbol` 或 `put_symbol` 复制合约代码即可获取实时行情。

### 获取期权合约实时行情

```bash
longbridge option quote AAPL260417C190000.US --format json
```

```json
[
  {
    "symbol": "AAPL260417C190000.US",
    "last": "12.35",
    "bid": "12.30",
    "ask": "12.40",
    "open_interest": "4821",
    "implied_volatility": "0.2341",
    "delta": "0.4812",
    "gamma": "0.0231",
    "theta": "-0.0512",
    "vega": "0.1843"
  }
]
```

返回该合约的最新买卖价、最新成交价、隐含波动率及希腊值（delta、gamma、theta、vega）。

## 权限要求

`option quote` 需要期权账户及期权行情权限；`option chain` 需要一级行情权限。参见[行情订阅](/docs/quote/)了解权限详情。

## 说明

期权代码格式：`AAPL260417C190000.US`——标的 AAPL，到期日 2026-04-17，认购（Call），行权价 $190.00。价格部分以 $0.001 为单位，因此 190000 = $190.00。
