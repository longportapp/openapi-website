---
title: 刷新 token 接口 
id: refresh-token-api
slug: /refresh-token-api
---

#  创建 token

<font color='gray' size='2'>最后更新于 2022-04-21</font>

 - 创建 token 接口 

## 请求

| 基本信息        |                                                            |
|-------------|------------------------------------------------------------|
| HTTP URL    | /v1/openapi/token/refresh                                 |
| HTTP Method | POST                                                        |
| 权限要求        | 无                                                       |

### 请求头

| 名称            | 类型     | 必须  | 描述                                        |
|---------------|--------|-----|-------------------------------------------|
| Authorization | string | 是   |                                           |
| Content-Type  | string | 是   | **固定值**："application/json; charset=utf-8" |
| Account-Channel | string | 是  | lb - 长桥，pspl_sg - 新加坡辉立 |

### 请求参数

| 名称     | 类型     | 必须 | 描述                                        | 默认值 | 示例                                    |
| -------- | -------- | ---- | ------------------------------------------- | ------ | --------------------------------------- |
| expired_at  | string   |  是   | 格式           |  过期时间戳，格式遵循 ![ISO8601](https://en.wikipedia.org/wiki/ISO_8601)规范     | 2023-04-14T12:13:57.859Z |
| aaid      |   string |  是 |  token 账户  |  指定创建 token 的账户 |  |

## 响应

### 响应体

| 名称                                                         | 类型     | 描述                                                         |
| ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| code                                                         | int      | 错误码，非 0 表示失败                                        |
| msg                                                          | string   | 错误描述                                                     |
| data                                                         | object   |                                                              |
| <font color="grey">∟</font>token                             | string   | 新的 token                                                      |
| <font color="grey">∟</font>expired_at                      | string   | 过期的时间戳                                                     |
| <font color="grey">∟</font>issued_at                       | string   | 颁发时间                                                     |
| <font color="grey">∟</font>account_info                    | object   | 用户信息                                                         |
| <font color="grey">∟</font><font color="grey">∟</font>member_id | string   | 用户 id                                                      |
| <font color="grey">∟</font><font color="grey">∟</font>aaid | string   | aaid                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>account_channel | string   |  account_channel                                   |


### 响应体示例

```json
{
  'code': 0,
  'message': '',
  'data': {
    "token": "",
    "expired_at": "",
    "issued_at": "",
    "account_info": {
        "member_id": "",
        "aaid": "",
        "account_channel": ""
    }
  }
}
```

