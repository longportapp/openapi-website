---
sidebar_position: 0
id: quote_overview
title: Overview
slug: overview
---

# 行情接口概覽

<table>
    <tr>
        <td>類型</td>
        <td>功能簡介</td>
    </tr>
    <tr>
        <td rowspan="20">拉取</td>
        <td><a href="./pull/static">獲取標的基礎信息</a></td>
    </tr>
    <tr>
        <td><a href="./pull/quote">獲取標的實時行情</a></td>
    </tr>
    <tr>
        <td><a href="./pull/option-quote">獲取期權實時行情</a></td>
    </tr>
    <tr>
        <td><a href="./pull/warrant-quote">獲取輪證實時行情</a></td>
    </tr>
    <tr>
        <td><a href="./pull/depth">獲取標的盤口</a></td>
    </tr>
    <tr>
        <td><a href="./pull/brokers">獲取標的經紀隊列</a></td>
    </tr>
    <tr>
        <td><a href="./pull/broker-ids">獲取券商席位 id</a></td>
    </tr>
    <tr>
        <td><a href="./pull/trade">獲取標的成交明細</a></td>
    </tr>
    <tr>
        <td><a href="./pull/intraday">獲取標的分時</a></td>
    </tr>
    <tr>
        <td><a href="./pull/candlestick">獲取標的 k 線</a></td>
    </tr>
    <tr>
        <td><a href="./pull/optionchain-date">獲取標的的期權鏈到期日列表</a></td>
    </tr>
    <tr>
        <td><a href="./pull/optionchain-date-strike">獲取標的的期權鏈到期日期權標的列表</a></td>
    </tr>
    <tr>
        <td><a href="./pull/issuer">獲取輪證發行商 id</a></td>
    </tr>
    <tr>
        <td><a href="./pull/warrant-filter">獲取輪證篩選列表</a></td>
    </tr>
    <tr>
        <td><a href="./pull/trade-session">獲取各市場當日交易時段</a></td>
    </tr>
    <tr>
        <td><a href="./pull/trade-day">獲取市場交易日</a></td>
    </tr>
    <tr>
        <td><a href="./pull/capital-flow-intraday">獲取標的當日資金流向</a></td>
    </tr>
    <tr>
        <td><a href="./pull/capital-distribution">獲取標的當日資金分佈</a></td>
    </tr>
    <tr>
        <td><a href="./pull/calc-index">獲取標的計算指標</a></td>
    </tr>
    <tr>
        <td><a href="./pull/history-candlestick">獲取標的曆史 K 線</a></td>
    </tr>
    <tr>
        <td rowspan="3">订阅</td>
        <td><a href="./subscribe/subscription">獲取已訂閱標的行情</a></td>
    </tr>
    <tr>
        <td><a href="./subscribe/subscribe">訂閱行情數據</a></td>
    </tr>
    <tr>
        <td><a href="./subscribe/unsubscribe">取消訂閱行情數據</a></td>
    </tr>
    <tr>
        <td rowspan="4">推送</td>
        <td><a href="./push/quote">實時價格推送</a></td>
    </tr>
    <tr>
        <td><a href="./push/depth">實時盤口推送</a></td>
    </tr>
    <tr>
        <td><a href="./push/broker">實時經紀隊列推送</a></td>
    </tr>
    <tr>
        <td><a href="./push/trade">實時成交明細推送</a></td>
    </tr>
    <tr>
        <td rowspan="4">個性化</td>
        <td><a href="./individual/watchlist_create_group">創建自選股分組</a></td>
    </tr>
    <tr>
        <td><a href="./individual/watchlist_delete_group">刪除自選股分組</a></td>
    </tr>
    <tr>
        <td><a href="./individual/watchlist_groups">獲取自選股分組</a></td>
    </tr>
    <tr>
        <td><a href="./individual/watchlist_update_group">更新自選股分組</a></td>
    </tr>
      <tr>
        <td rowspan="1">標的</td>
        <td><a href="./security/security_list">獲取標的列表</a></td>
    </tr>
</table>

## 標的代碼說明

標的代碼使用 `ticker.region` 格式，`ticker` 表示標的代碼，各個市場的標的代碼示例：

- 美股市場：`region` 為 `US`，例如：`AAPL.US`
- 港股市場：`region` 為 `HK`，例如：`700.HK`
- A 股市場：`region` 上交所為 `SH`，深交所為 `SZ`，例如：`399001.SZ`，`600519.SH`
- 新加坡市場：`region` 為 `SG`，例如：`D05.SG`

## 接入方式

1. 使用私有協議，長連接方式進行接入，接入方法請參考 <a href="../socket/protocol/overview" target="_blank">二進制通信協議</a>。
2. 使用 SDK 進行接入，[SDK 介紹及下載地址](https://open.longportapp.com/sdk)。

## 業務數據序列化方式

行情的請求、響應、推送數據作為業務數據，存放在私有協議的數據包 body 部分。
我們使用 [Protobuf](https://developers.google.cn/protocol-buffers) 協議對業務數據進行序列化，相較於常見的文本協議（如 JSON, XML 等），Protobuf 協議具有如下優點：

- 序列化時間快
- 數據包體積小
- 較強的版本前向後向兼容性

行情 Protobuf 協議文檔[下載地址](https://github.com/longportapp/openapi-protobufs/blob/main/quote/api.proto)。
