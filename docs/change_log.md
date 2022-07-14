---
id: log_change
title: 更新日志
slug: log_change
sidebar_position: 7
---

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

## 2022-07-14

- 新增获取保证金比例接口
  - `GET /v1/risk/margin-ratio` 获取保证金比例
