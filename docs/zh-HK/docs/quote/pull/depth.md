---
id: quote_depth
title: 獲取標的盤口
slug: depth
sidebar_position: 5
---

該接口用於獲取標的的盤口數據。

<SDKLinks module="quote" klass="QuoteContext" method="depth" />

:::info

[業務指令](../../socket/biz-command)：`14`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                         |
| ------ | ------ | -------- | --------------------------------------------------- |
| symbol | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如：`700.HK` |

### Protobuf

```protobuf
message SecurityRequest {
  string symbol = 1;
}
```

### Request Example

```python
# 獲取標的盤口
# https://open.longportapp.com/docs/quote/pull/depth
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.depth("700.HK")
print(resp)
```

## Response

### Response Properties

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| symbol      | string   | 標的代碼    |
| ask         | object[] | 賣盤        |
| ∟ position  | int32    | 檔位        |
| ∟ price     | string   | 價格        |
| ∟ volume    | int64    | 掛單量      |
| ∟ order_num | int64    | 訂單數量    |
| bid         | object[] | 買盤        |
| ∟ position  | int32    | 檔位        |
| ∟ price     | string   | 價格        |
| ∟ volume    | int64    | 掛單量      |
| ∟ order_num | int64    | 訂單數量    |

### Protobuf

```protobuf
message SecurityDepthResponse {
  string symbol = 1;
  repeated Depth ask = 2;
  repeated Depth bid = 3;
}

message Depth {
  int32 position = 1;
  string price = 2;
  int64 volume = 3;
  int64 order_num = 4;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "ask": [
    {
      "position": 1,
      "price": "335.000",
      "volume": 500,
      "order_num": 1
    },
    {
      "position": 2,
      "price": "335.200",
      "volume": 400,
      "order_num": 1
    },
    {
      "position": 3,
      "price": "335.400",
      "volume": 500,
      "order_num": 2
    },
    {
      "position": 4,
      "price": "335.600",
      "volume": 1200,
      "order_num": 3
    },
    {
      "position": 5,
      "price": "335.800",
      "volume": 14000,
      "order_num": 8
    }
  ],
  "bid": [
    {
      "position": 1,
      "price": "334.800",
      "volume": 69400,
      "order_num": 13
    },
    {
      "position": 2,
      "price": "334.600",
      "volume": 266600,
      "order_num": 27
    },
    {
      "position": 3,
      "price": "334.400",
      "volume": 61300,
      "order_num": 29
    },
    {
      "position": 4,
      "price": "334.200",
      "volume": 125900,
      "order_num": 31
    },
    {
      "position": 5,
      "price": "334.000",
      "volume": 194600,
      "order_num": 94
    }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗       |
| 3          | 301606     | 限流           | 降低請求頻次                 |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理     |
| 7          | 301600     | 請求標的不存在 | 檢查請求的 `symbol` 是否正確 |
| 7          | 301603     | 標的無行情     | 標的沒有請求的行情數據       |
| 7          | 301604     | 無權限         | 沒有獲取標的行情的權限       |
