---
id: changelog
title: 更新日志
slug: changelog
sidebar_position: 7
---

## 2026-04-09

### CLI v0.14.3

- **`portfolio` 命令** — 组合总损益、各市场资产分布、持仓及现金明细
- **`investors` 命令** — 基于 SEC 13F 数据的主动基金经理排行榜，按 CIK 查询指定投资者持仓（含实时价格）
  ```
  $ longbridge investors
  | #  | name                                        | AUM      | period      | cik        |
  |----|---------------------------------------------|----------|-------------|------------|
  | 1  | Capital International Investors             | $637.97B | 31-DEC-2025 | 0001562230 |
  | 2  | Capital Research Global Investors           | $541.73B | 31-DEC-2025 | 0001422848 |
  | 3  | CTC LLC                                     | $404.44B | 31-DEC-2025 | 0001445893 |
  | 4  | BERKSHIRE HATHAWAY INC                      | $274.16B | 31-DEC-2025 | 0001067983 |
  | 5  | DODGE & COX                                 | $185.26B | 31-DEC-2025 | 0000200217 |

  $ longbridge investors 0001067983
  Period: 2025-12-31  (filed: 2026-02-17)

  BERKSHIRE HATHAWAY INC (period: 2025-12-31)

  Portfolio: 42 positions, total value ~$274.16B

  | company                      | value    | shares  | weight |
  |------------------------------|----------|---------|--------|
  | APPLE INC                    | $61.96B  | 227.92M | 22.6%  |
  | AMERICAN EXPRESS CO          | $56.09B  | 151.61M | 20.5%  |
  | BANK AMERICA CORP            | $28.45B  | 517.30M | 10.4%  |
  | COCA COLA CO                 | $27.96B  | 400.00M | 10.2%  |
  | CHEVRON CORP NEW             | $19.84B  | 130.16M | 7.2%   |
  | MOODYS CORP                  | $12.60B  | 24.67M  | 4.6%   |
  | OCCIDENTAL PETE CORP         | $10.89B  | 264.94M | 4.0%   |
  | CHUBB LIMITED                | $10.69B  | 34.25M  | 3.9%   |
  | KRAFT HEINZ CO               | $7.90B   | 325.63M | 2.9%   |
  | ALPHABET INC                 | $5.59B   | 17.85M  | 2.0%   |
  ```
- **`watchlist pin/unpin`** — 将标的置顶至自选股分组顶部
- **`assets` 命令** — 原 `balance` 更名，展示完整资产概览：净资产、购买力、保证金、风险等级及分币种现金明细

## 2026-04-08

### CLI v0.14.2

- **`--lang` 标志** — 为所有命令指定内容语言（`zh-CN`、`zh-HK`、`en`），自动回退到系统 `LANG` 环境变量

## 2026-04-02

### CLI v0.14.1

- **CN 区域登录** — `longbridge login` 支持中国大陆区域路由
- **`-v` 标志** — 快速查看版本号

### CLI v0.14.0

- **Device Auth** — Longbridge Developers 平台现已支持 OAuth Device Auth 授权流程；`longbridge login` 显示验证 URL 和 Code，可在任意设备完成授权，支持 SSH 和无头环境
- **订单增强** — 支持追踪止损和 AO 订单类型；订单命令新增 `--expire-date`、`--outside-rth`、`--remark` 参数
- **修复** — Linux 预构建二进制改为 musl，修复在部分发行版的 Segfault

## 2026-04-01

### CLI v0.13.0

- 新增**基本面 & 分析**命令：
  - `financial-report` — 财务报表，支持期间和类型筛选
  - `valuation` — P/E、P/B、P/S、股息率快照，支持同行对比和历史模式
  - `forecast-eps` — 分析师 EPS 预测一致预期
  - `consensus` — 营收/利润/EPS 一致预期，带超预期/未达预期标注
  - `institution-rating` / `institution-rating detail` — 评级分布及月度趋势
  - `shareholder` — 机构持股，支持变动追踪和排序
  - `fund-holder` — 持有该标的的基金和 ETF
  - `dividend` / `dividend detail` — 分红历史和分配方案
  - `finance-calendar` — 财务日历，支持按事件类型筛选（财务、报告、分红、IPO、宏观数据、停市）
  - `exchange-rate` — 所有支持货币的汇率
- CLI 命令按业务域重新分组命名

## 2026-03-30

- 新增结单 API：
  - `GET /v1/statement/list` — 查询日结单或月结单列表
  - `GET /v1/statement/download` — 获取指定结单文件的预签名下载地址

## 2026-03-25

- 新增社区 API：
  - `GET /content/topics/mine` — 获取我发布的讨论列表
  - `POST /content/topics` — 创建社区讨论
  - `GET /content/topics/{id}` — 获取讨论详情
  - `GET /content/topics/{topic_id}/comments` — 获取讨论回复列表
  - `POST /content/topics/{topic_id}/comments` — 创建讨论回复

## 2025-06-17

- 更新获取账户资金接口
  - `GET /v1/asset/account` 增加 (frozen_transaction_fees) 返回字段

## 2024-10-09

### SDK 2.0.0

- 连接到服务器时打印已开通的行情包
- 交易 API 中的数量类型从 `int` 更改为 `Decimal`。

## 2024-09-11

- 更新获取标的列表接口
  - `GET /v1/quote/get_security_list` 返回的多语言名称根据请求头 `accept-language` 返回对应字段，不再一次性返回三种语言名称

## 2024-08-28

- SDK 中 `Depth.price` 字段从 `Decimal` 类型改为 `Optional[Decimal]` 类型

## 2024-05-17

- 下单及订单查询接口扩展 `outside_rth` 字段支持夜盘交易

## 2024-05-06

- 更新获取账户资金接口
  - `GET /v1/asset/account` 增加 (buy_power) 返回字段

## 2024-04-29

- 删除 `TSMPCT`, `TSMAMT` 订单类型

## 2024-04-15

- [交易推送](https://open.longbridge.com/docs/trade/trade-definition#websocket-%E6%8E%A8%E9%80%81%E9%80%9A%E7%9F%A5)添加 `last_share`, `last_price`。

## 2024-04-13

- [交易推送](https://open.longbridge.com/docs/trade/trade-definition#websocket-%E6%8E%A8%E9%80%81%E9%80%9A%E7%9F%A5)添加 `remark` 备注字段。

## 2023-11-03

- 新增行情历史 K 线接口
  - 长连接 `Business Command：27` 获取标的历史 K 线

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
