---
id: quote_broker_ids
title: 獲取券商席位 ID
slug: broker-ids
sidebar_position: 7
---

該接口用於獲取券商席位 ID 數據 (可每天同步一次)。

:::info
[業務指令](../../socket/protocol/request)：`16`
:::

## Request

### Request Example

```python
# 獲取券商席位 id
# https://open.longbridgeapp.com/docs/quote/pull/broker-ids
import os
import time
from google.protobuf import text_format
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 變量定義參見：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, ParticipantBrokerIdsResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# 運行前請訪問 “開發者中心“ 確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過 "長橋" 手機客戶端，並進入 “我的 - 我的行情 - 行情商城“ 購買開通行情權限。
result = ws.send_request(Command.QueryParticipantBrokerIds, "")
resp = ParticipantBrokerIdsResponse()
resp.ParseFromString(result)

print(f"Broker ids:\n\n")
for broker_number in resp.participant_broker_numbers:
    print(f"{text_format.MessageToString(broker_number, as_utf8=True)}")
```

## Response

### Response Properties

| Name                       | Type     | Description           |
| -------------------------- | -------- | --------------------- |
| participant_broker_numbers | object[] | 券商席位              |
| ∟ broker_ids               | int32[]  | 券商對應的多個席位 ID |
| ∟ participant_name_cn      | string   | 券商名稱 (简)         |
| ∟ participant_name_en      | string   | 券商名稱 (英)         |
| ∟ participant_name_hk      | string   | 券商名稱 (繁)         |

### Protobuf

```protobuf
message ParticipantBrokerIdsResponse {
  repeated ParticipantInfo participant_broker_numbers = 1;
}

message ParticipantInfo {
  repeated int32 broker_ids = 1;
  string participant_name_cn = 2;
  string participant_name_en = 3;
  string participant_name_hk = 4;
}
```

### Response JSON Example

```json
{
  "participant_broker_numbers": [
    {
      "broker_ids": [7738, 7739],
      "participant_name_cn": "华兴金融 (香港)",
      "participant_name_en": "China Renaissance(HK)",
      "participant_name_hk": "華興金融 (香港)"
    },
    {
      "broker_ids": [6390, 6396, 6398, 6399],
      "participant_name_cn": "国信 (香港)",
      "participant_name_en": "Guosen(HK)",
      "participant_name_hk": "國信 (香港)"
    },
    {
      "broker_ids": [3168, 3169],
      "participant_name_cn": "泰嘉",
      "participant_name_en": "Tiger",
      "participant_name_hk": "泰嘉"
    }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗   |
| 3          | 301606     | 限流           | 降低請求頻次             |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理 |
