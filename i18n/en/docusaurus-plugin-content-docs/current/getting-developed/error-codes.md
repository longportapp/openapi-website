---
title: Error Codes
id: error-codes
slug: /error-codes
sidebar_position: 10
---

### 错误码

| HTTP Status | Code   | Message                | Description                                                        |
| ----------- | ------ | ---------------------- | ------------------------------------------------------------------ |
| 403         | 403201 | signature invalid      | signature is invalid                                               |
| 403         | 403202 | duplicate request      | Repeat request, same request without replacement `x-timestamp`     |
| 403         | 403203 | apikey illegal         | `App Key` is illegal                                               |
| 403         | 403205 | ip is not allowed      | IP address is not authorized to access                             |
| 401         | 401003 | token expired          | `Access Token` expired, please refresh the Token                   |
| 429         | 429001 | ip request ratelimit   | Too frequent requests as a same IP address, please try again later |
| 429         | 429002 | api request is limited | Too frequent requests on an API, please try again later            |
| 500         | 500000 | internal error         | server internal error, please contact customer support             |
