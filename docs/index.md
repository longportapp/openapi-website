---
sidebar_position: -999
slug: /
title: OpenAPI 介绍
id: getting_started_introduce
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 简介

LongPort OpenAPI 为有研发能力的投资者提供程序化行情交易接口，助力投资者根据自身投资策略搭建交易或行情策略分析工具。覆盖以下类别功能：

- 交易类 - 创建、修改、撤销订单，当日/历史订单及成交记录的查询等
- 行情类 - 实时行情报价、历史行情数的获取等
- 资产类 - 实时账户资产、持仓、现金查询等
- 实时订阅 - 提供行情实时报价以及订单状态实时变更信息推送

## 接口类型

LongPort 提供接入底层服务的 HTTP / WebSockets 接口以及封装在上层的 SDK（Python / C++ ...）等多种接入方式，灵活选择。

## 如何开通

1. 登录 [LongPort App](https://longportapp.com/download) 完成开户；
2. 登录 [longportapp.com](https://longportapp.com) 进入开发者平台，完成开发者认证即 OpenAPI 权限申请，获取令牌。

## 使用权限及限制

:::caution

所有的接口都是有最小间隔限制的，所以理论上同一个接口都是不支持并发调用。

:::

### 交易类

| 市场     | 股票 ETF | 权证 | 期权 |
| -------- | -------- | ---- | ---- |
| 香港市场 | ✓        | ✓    |      |
| 美国市场 | ✓        | ✓    | ✓    |

#### 频次限制

:::caution

- 30 秒内不超过 30 次调用，且每两次调用之间间隔不小于 0.02 秒

:::

### 行情类

<table>
    <tr>
        <td>市场</td>
        <td>标的</td>
        <td>权限获取方式</td>
    </tr>
    <tr>
        <td rowspan="2">港股市场</td>
        <td>证券类产品（含股票、ETFs、窝轮、牛熊、界内证）</td>
        <td rowspan="2">
            <ul>
            <li>中国大陆客户：请购买 <a href="https://activity.lbkrs.com/spa/mall?market=HK">港股 Lv2 实时行情 - OpenAPI</a></li>
            <li>非中国大陆客户：请购买 <a href="https://activity.lbkrs.com/spa/mall?market=HK">港股 Lv2 实时行情（国际版）- OpenAPI</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>恒生指数</td>
    </tr>
    <tr>
        <td rowspan="3">美股市场</td>
        <td>证券类产品（含纽交所、美交所、纳斯达克上市的股票、ETFs）</td>
        <td rowspan="2">
            <ul>
            <li>Level 1：请购买 <a href="https://activity.lbkrs.com/spa/mall?market=US">L1 Nasdaq Basic - OpenAPI</a></li>
            <li>Level 2：暂未上线，敬请期待。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>纳斯达克指数</td>
    </tr>
    <tr>
        <td>OPRA 期权</td>
        <td>
            <ul>
            <li>Level 1：请购买 <a href="https://activity.lbkrs.com/spa/mall?market=US">OPRA 期权-Open API</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td rowspan="2">A 股市场</td>
        <td>证券类产品（含股票、ETFs）</td>
        <td rowspan="2">
        <ul>
            <li>中国大陆个人客户：免费获取 Lv1 行情</li>
            <li>非中国大陆客户 / 机构客户：暂不支持</li>
        </ul>
        </td>
    </tr>
    <tr>
        <td>指数</td>
    </tr>
</table>

#### 频次限制

:::caution

- 一个账号同时只能建立一个长连接，最多同时订阅 500 个标的
- 1 秒内不超过 10 次调用，并发请求数不超过 5

:::

## 使用费用

LongPort 不针对接口服务额外收取开通或使用费用，只需开通 LongPort 账户及 OpenAPI 服务权限后即可免费使用。实际交易产生佣金费用或高级行情产品费用参考 [官网收费](https://longbridge.hk/rate) 说明或咨询线上客服。

## 其他

OpenAPI 服务由 LongPort 及其适用的关联公司提供（具体以协议为准）。
