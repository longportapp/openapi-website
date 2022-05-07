---
id: quote_candlestick
title: 獲取標的 K 線
slug: candlestick
sidebar_position: 10
---

該接口用於獲取標的的 K 線數據。

:::info

[業務指令](../../socket/protocol/request)：`19`

:::

## Request

### Parameters

| Name        | Type   | Required | Description                                                                  |
| ----------- | ------ | -------- | ---------------------------------------------------------------------------- |
| symbol      | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如：`700.HK`                          |
| period      | int32  | 是       | k 線週期，例如：`1000`，详见 [Period](../objects#period---k-線週期)          |
| count       | int32  | 是       | 數據數量，例如：`100`<br /><br />**校验规则：** <br />請求數量最大為 `1000`  |
| adjust_type | int32  | 是       | 復權類型，例如：`0`，详见 [AdjustType](../objects#adjusttype---k-線復權類型) |

### Protobuf

```protobuf
message SecurityCandlestickRequest {
  string symbol = 1;
  Period period = 2;
  int32 count = 3;
  AdjustType adjust_type = 4;
}
```

## Response

### Response Properties

| Name         | Type     | Description               |
| ------------ | -------- | ------------------------- |
| symbol       | string   | 標的代碼，例如：`AAPL.US` |
| candlesticks | object[] | K 線數據                  |
| ∟ close      | string   | 當前週期收盤價            |
| ∟ open       | string   | 當前週期開盤價            |
| ∟ low        | string   | 當前週期最低價            |
| ∟ high       | string   | 當前週期最高價            |
| ∟ volume     | int64    | 當前週期成交量            |
| ∟ turnover   | string   | 當前週期成交額            |
| ∟ timestamp  | int64    | 當前週期的時間戳          |

### Protobuf

```protobuf
message SecurityCandlestickResponse {
  string symbol = 1;
  repeated Candlestick candlesticks = 2;
}

message Candlestick {
  string close = 1;
  string open = 2;
  string low = 3;
  string high = 4;
  int64 volume = 5;
  string turnover = 6;
  int64 timestamp = 7;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "candlesticks": [
    {
      "close": "362.000",
      "open": "364.600",
      "low": "361.600",
      "high": "368.800",
      "volume": 10853604,
      "turnover": "3954556819.000",
      "timestamp": 1650384000
    },
    {
      "close": "348.000",
      "open": "352.000",
      "low": "343.000",
      "high": "356.200",
      "volume": 25738562,
      "turnover": "8981529950.000",
      "timestamp": 1650470400
    },
    {
      "close": "340.600",
      "open": "334.800",
      "low": "334.200",
      "high": "343.000",
      "volume": 28031299,
      "turnover": "9492674293.000",
      "timestamp": 1650556800
    },
    {
      "close": "327.400",
      "open": "332.200",
      "low": "325.200",
      "high": "338.600",
      "volume": 25788422,
      "turnover": "8541441823.000",
      "timestamp": 1650816000
    },
    {
      "close": "335.800",
      "open": "332.200",
      "low": "330.600",
      "high": "341.600",
      "volume": 27288328,
      "turnover": "9166022626.000",
      "timestamp": 1650902400
    }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                                                                 |
| ---------- | ---------- | -------------- | ------------------------------------------------------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗                                                   |
| 3          | 301606     | 限流           | 降低請求頻次                                                             |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理                                                 |
| 7          | 301600     | 請求數據非法   | 檢查請求的 `symbol`，`count`，`adjust_type`, `period` 數據是否在正確範圍 |
| 7          | 301603     | 標的無行情     | 標的沒有請求的行情數據                                                   |
| 7          | 301604     | 無權限         | 沒有獲取標的行情的權限                                                   |
| 7          | 301607     | 接口限制       | 請求的數據數量超限，減少數據數量                                         |
