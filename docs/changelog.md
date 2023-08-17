---
id: changelog
title: 更新日志
slug: changelog
sidebar_position: 7
---

## 2023-08-17

- 更新获取账户资金接口
  - `GET /v1/asset/account` 增加入参 (currency) 字段

## 2023-04-12

- 更新获取股票持仓接口
  - `GET /v1/asset/stock` 增加开盘前初始持仓 (init_quantity) 字段


## 2023-04-11

- 新增订单详情查询接口
  - `GET /v1/trade/order` 获取订单详情
- 新增预估最大购买数量接口
  - `GET /v1/trade/estimate/buy_limit` 获取预估最大购买数量接口
- 美股期权添加市价单和条件单支持

## 2022-07-18

- 更新标的基础信息接口
  - 长连接 `Business Command: 10` 响应增加 `board` 字段

## 2022-07-14

- 新增获取保证金比例接口
  - `GET /v1/risk/margin-ratio` 获取保证金比例

## 2022-06-30

- 新增获取关注分组接口
  - `GET /v1/watchlist/groups` 获取关注分组

## 2022-06-20

- 更新账号资金接口
  - `GET /v1/asset/account` 响应增加净资产 (net_assets)、初始保证金 (init_margin)、维持保证金 (maintenance_margin) 字段
- 更新持仓接口
  - `GET /v1/asset/stock` 支持用户获取期权持仓

## 2022-06-15

- 新增行情资金流接口
  - 长连接 `Business Command：24` 获取标的当日资金流向
  - 长连接 `Business Command：25` 获取标的当日资金分布
