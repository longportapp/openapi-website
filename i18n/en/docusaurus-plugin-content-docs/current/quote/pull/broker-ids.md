---
id: quote_broker_ids
title: Get Broker IDs
slug: broker-ids
sidebar_position: 7
---

This API is used to obtain participant IDs data (which can be synchronized once a day).

:::info
[Business Command](../../socket/protocol/request): `16`
:::

## Request

### Request Example

```python
# Get Broker IDs
# https://open.longbridgeapp.com/docs/quote/pull/broker-ids
import os
import time
from google.protobuf import text_format
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf variables definition: https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, ParticipantBrokerIdsResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
result = ws.send_request(Command.QueryParticipantBrokerIds, "")
resp = ParticipantBrokerIdsResponse()
resp.ParseFromString(result)

print(f"Broker ids:\n\n")
for broker_number in resp.participant_broker_numbers:
    print(f"{text_format.MessageToString(broker_number, as_utf8=True)}")
```

## Response

### Response Properties

| Name                       | Type     | Description              |
| -------------------------- | -------- | ------------------------ |
| participant_broker_numbers | object[] | participant data         |
| ∟ broker_ids               | int32[]  | broker IDs               |
| ∟ participant_name_cn      | string   | participant name (zh-CN) |
| ∟ participant_name_en      | string   | participant name (en)    |
| ∟ participant_name_hk      | string   | participant name (zh-HK) |

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

## Error Code

| Proto Error Code | Business Error Code | Descrption         | Troubleshooting Suggestions                                   |
| ---------------- | ------------------- | ------------------ | ------------------------------------------------------------- |
| 3                | 301600              | Invalid request    | Invalid request parameters or unpacking request failed        |
| 3                | 301606              | Request rate limit | Reduce the frequency of requests                              |
| 7                | 301602              | Server error       | Please try again or contact a technician to resolve the issue |
