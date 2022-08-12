---
title: 通用錯誤碼
id: error-codes
slug: /error-codes
sidebar_position: 10
---

### 錯誤碼

| HTTP Status | code   | message                | 說明                                     |
| ----------- | ------ | ---------------------- | ---------------------------------------- |
| 403         | 403201 | signature invalid      | 簽名無效                                 |
| 403         | 403202 | duplicate request      | 重複請求，同一個請求沒有更換 X-Timestamp |
| 403         | 403203 | apikey illegal         | App Key 無效                             |
| 403         | 403205 | ip is not allowed      | IP 地址無權訪問                          |
| 401         | 401003 | token expired          | Access Token 已過期，請刷新 Access Token |
| 429         | 429001 | ip request ratelimit   | IP 訪問過於頻繁，請稍後再試              |
| 429         | 429002 | api request is limited | 接口訪問過於頻繁，請稍後再試             |
| 500         | 500000 | internal error         | 服務內部錯誤，請聯繫客戶經理進行處理         |
