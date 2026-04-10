---
title: 'option'
sidebar_label: 'option'
sidebar_position: 1
---

# longbridge option

查詢美股期權合約的即時行情，或瀏覽任意標的的完整期權鏈。

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

### 瀏覽股票期權鏈

不加 `--date` 時，返回 AAPL 期權所有可用的到期日。選擇一個到期日後，使用 `--date` 參數查看對應的行權價列表。

### 查看指定到期日的行權價

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

每行展示該行權價對應的認購和認沽合約代碼。從 `call_symbol` 或 `put_symbol` 複製合約代碼即可取得即時行情。

### 取得期權合約即時行情

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

返回該合約的最新買賣價、最新成交價、隱含波動率及希臘值（delta、gamma、theta、vega）。

## 權限要求

`option quote` 需要期權帳戶及期權行情權限；`option chain` 需要一級行情權限。參見[行情訂閱](/zh-HK/docs/quote/)了解權限詳情。

## 說明

期權代碼格式：`AAPL260417C190000.US`——標的 AAPL，到期日 2026-04-17，認購（Call），行權價 $190.00。價格部分以 $0.001 為單位，因此 190000 = $190.00。
