---
id: push_trade
title: 實時成交明細推送
slug: trade
sidebar_position: 4
---

已訂閱的標的的實時逐筆成交明細推送。

:::info

[業務指令](../../socket/protocol/push)：`104`

:::

## 數據格式

### Properties

| Name            | Type     | Description                                                                        |
| --------------- | -------- | ---------------------------------------------------------------------------------- |
| symbol          | string   | 標的代碼，例如：`AAPL.US`                                                          |
| sequence        | int64    | 序列號                                                                             |
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
message PushTrade {
  string symbol = 1;
  int64 sequence = 2;
  repeated Trade trade = 3;
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

### Example

```python
# 實時成交明細推送
# https://open.longportapp.com/docs/quote/push/push-trade
# 訂閱行情數據請檢查“開發者中心“ - “行情權限”是否正確
# https://open.longportapp.com/account
#
# - 港股 - BMP 基礎報價，無實時行情推送，無法用 WebSocket 訂閱
# - 美股 - LV1 納斯達克最優報價 (只限 Open API）
#
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from time import sleep
from longbridge.openapi import QuoteContext, Config, SubType, PushQuote

def on_trades(symbol: str, event: PushTrades):
    print(symbol, event)

config = Config.from_env()
ctx = QuoteContext(config)
ctx.set_on_trades(on_trade)

ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Trade])
sleep(30)
```

### JSON Example

```json
{
  "symbol": "700.HK",
  "sequence": 160808750000000,
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
