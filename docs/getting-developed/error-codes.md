---
title: 通用错误码
id: error-codes
slug: /error-codes
---

### 错误码

| HTTP Status | code | message          | 说明                                                         |
| ----------- | --------- | ----------------- | ------------------------------------------------------------ |
| 403         | 403201    | signature invalid | 签名错误                                                     |
| 403         | 403202    | duplicae request  | 重复请求，同一个请求没有更换 `x-timestamp`                   |
| 403         | 403203    | apikey illegal    | `API Key` 无效                                               |
| 401         | 401003    | Token 过期        | Access Token 过期，或未登录，可以通过 Refresh Token 流程刷新 |
| 401         | 401004    | 缺少 token 信息   |                                                              |
| 429         | 429001    | IP 限流           | 请求太频繁                                                   |
| 429         | 429303    | 网关自身熔断      |                                                              |
