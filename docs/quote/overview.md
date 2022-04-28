---
sidebar_position: 1
id: quote_overview
title: 行情概览
slug: overview
---

### 行情接口概览

<table>
    <tr>
        <td>类型</td>
        <td>功能简介</td>
    </tr>
    <tr>
        <td rowspan="16">拉取</td>
        <td><a href="./pull/static">获取标的基础信息</a></td>
    </tr>
    <tr>
        <td><a href="./pull/quote">获取标的实时行情</a></td>
    </tr>
    <tr>
        <td><a href="./pull/option-quote">获取期权实时行情</a></td>
    </tr>
    <tr>
        <td><a href="./pull/warrant-quote">获取轮证实时行情</a></td>
    </tr>
    <tr>
        <td><a href="./pull/depth">获取标的盘口</a></td>
    </tr>
    <tr>
        <td><a href="./pull/brokers">获取标的经纪队列</a></td>
    </tr>
    <tr>
        <td><a href="./pull/broker-ids">获取券商席位 id</a></td>
    </tr>
    <tr>
        <td><a href="./pull/trade">获取标的成交明细</a></td>
    </tr>
    <tr>
        <td><a href="./pull/intraday">获取标的分时</a></td>
    </tr>
    <tr>
        <td><a href="./pull/candlestick">获取标的 k 线</a></td>
    </tr>
    <tr>
        <td><a href="./pull/optionchain-date">获取标的的期权链到期日列表</a></td>
    </tr>
    <tr>
        <td><a href="./pull/optionchain-date-strike">获取标的的期权链到期日期权标的列表</a></td>
    </tr>
    <tr>
        <td><a href="./pull/issuer">获取轮证发行商 id</a></td>
    </tr>
    <tr>
        <td><a href="./pull/warrant-filter">获取轮证筛选列表</a></td>
    </tr>
    <tr>
        <td><a href="./pull/trade-session">获取各市场当日交易时段</a></td>
    </tr>
    <tr>
        <td><a href="./pull/trade-day">获取市场交易日</a></td>
    </tr>
    <tr>
        <td rowspan="3">订阅</td>
        <td><a href="./subscribe/subscription">获取已订阅标的行情</a></td>
    </tr>
    <tr>
        <td><a href="./subscribe/subscribe">订阅行情数据</a></td>
    </tr>
    <tr>
        <td><a href="./subscribe/unsubscribe">取消订阅行情数据</a></td>
    </tr>
    <tr>
        <td rowspan="4">推送</td>
        <td><a href="./push/push-quote">实时价格推送</a></td>
    </tr>
    <tr>
        <td><a href="./push/push-depth">实时盘口推送</a></td>
    </tr>
    <tr>
        <td><a href="./push/push-broker">实时经纪队列推送</a></td>
    </tr>
    <tr>
        <td><a href="./push/push-trade">实时成交明细推送</a></td>
    </tr>
</table>

### 标的代码说明

标的代码使用 `ticker.region` 格式，`ticker` 表示标的代码，各个市场的标的代码示例：

- 美股市场 `region` 为 `US`，例如：`AAPL.US`
- 港股市场：`region` 为 `HK`，例如：`700.HK`
- A 股市场：`region` 上交所为 `SH`，深交所为 `SZ`，例如：`399001.SZ`，`600519.SH`
- 新加坡市场：`region` 为 `SG`，例如：`D05.SG`

### 接入方式

使用私有协议，长连接方式进行接入。接入方法，参考 [链接]

### Protobuf 下载地址

[链接]
