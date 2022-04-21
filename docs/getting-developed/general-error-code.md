---
title: 通用错误码 
id: general-error-code 
slug: /general-error-code
---

### 错误码

| http 状态码 | 错误 code | 错误信息 | 说明 |
|---|---|---|---|
| 403 | 403201 | signature invalid | 签名错误 |
| 403 | 403202 | duplicae request | 重复请求，同一个请求没有更换 x-timestamp |
| 403 | 403203 | apikey illegal | Apikey 非法 |
| 401 | 401003 | Token 过期 | Token 过期。可以通过 refresh token 刷新 |
| 401 | 401004 | 缺少 token 信息 |||
| 429 | 429001 | IP 限流 |||
| 429 | 429303 | 网关自身熔断 |||
