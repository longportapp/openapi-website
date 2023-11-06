---
id: quote_trade
title: 獲取標的成交明細
slug: trade
sidebar_position: 8
---

該接口用於獲取標的的成交明細數據。

:::info

[業務指令](../../socket/biz-command)：`17`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                                              |
| ------ | ------ | -------- | ------------------------------------------------------------------------ |
| symbol | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如：`700.HK`                      |
| count  | int32  | 是       | 請求的逐筆明細數量 <br /><br />**校驗規則：**<br />請求數量最大為 `1000` |

### Protobuf

```protobuf
message SecurityTradeRequest {
  string symbol = 1;
  int32 count = 2;
}
```

### Request Example

```python
# 獲取標的成交明細
# https://open.longportapp.com/docs/quote/pull/trade
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.trades("700.HK", 10)
print(resp)
```

## Response

### Response Properties

| Name            | Type     | Description                                                                        |
| --------------- | -------- | ---------------------------------------------------------------------------------- |
| symbol          | string   | 標的代碼                                                                           |
| trades          | object[] | 逐筆明細數據                                                                       |
| ∟ price         | string   | 價格                                                                               |
| ∟ volume        | int64    | 成交量                                                                             |
| ∟ timestamp     | int64    | 成交時間                                                                           |
| ∟ trade_type    | string   | [交易類型說明](#交易類型)                                                          |
| ∟ direction     | int32    | 交易方向 <br /><br />**可选值：**<br />`0` - neutral<br />`1` - down<br />`2` - up |
| ∟ trade_session | int32    | 交易時段，詳見 [TradeSession](../objects#tradesession---交易時段)                  |

#### 交易類型

港股

- `*` - 場外交易
- `D` - 碎股交易
- `M` - 非自動對盤
- `P` - 開市前成交盤
- `U` - 競價交易
- `X` - 同一券商非自動對盤
- `Y` - 同一券商自動對盤
- ` ` - 自動對盤

美股

- ` ` - 自動對盤
- `A` - 收購
- `B` - 批量交易
- `D` - 分配
- `F` - 跨市掃盤單
- `G` - 批量賣出
- `H` - 離價交易
- `I` - 碎股交易
- `K` - 第 155 條交易（紐交所規則）
- `M` - 交易所收盤價
- `P` - 前參考價
- `Q` - 交易所開盤價
- `S` - 拆單交易
- `V` - 附屬交易
- `W` - 平均價成交
- `X` - 跨市場交易
- `1` - 停售股票（常規交易）

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
      "direction": 0,
      "trade_session": 2
    },
    {
      "price": "158.745",
      "volume": 1,
      "timestamp": 1651103985,
      "trade_type": "I",
      "direction": 0,
      "trade_session": 2
    },
    {
      "price": "158.800",
      "volume": 1,
      "timestamp": 1651103995,
      "trade_type": "I",
      "direction": 0,
      "trade_session": 2
    }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                         |
| ---------- | ---------- | -------------- | -------------------------------- |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗           |
| 3          | 301606     | 限流           | 降低請求頻次                     |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理         |
| 7          | 301600     | 請求標的不存在 | 檢查請求的 `symbol` 是否正確     |
| 7          | 301603     | 標的無行情     | 標的沒有請求的行情數據           |
| 7          | 301604     | 無權限         | 沒有獲取標的行情的權限           |
| 7          | 301607     | 接口限制       | 請求的數據數量超限，減少數據數量 |
