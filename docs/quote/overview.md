---
id: quote_overview
title: 行情接口概览
slug: quote-overview
---

### 行情接口总览
| 模块 | 类型   | 接口名                     | 功能简介      |
|-------|-------|---------------------------|-----------------|
| 实时行情 | 拉取   | get_security_static_info  | 获取标的基础信息  |
| 实时行情 | 拉取   | get_security_quote      |  获取标的行情    |
| 实时行情 | 拉取   | get_option_quote          |  获取期权行情    |
| 实时行情 | 拉取   | get_warrant_quote         |  获取轮证行情    |
| 实时行情 | 拉取   | get_security_depth        |  获取标的盘口    |
| 实时行情 | 拉取   | get_security_brokers      |  获取标的经纪队列    |
| 实时行情 | 拉取   | get_participant_broker_ids |  获取券商席位 id    |
| 实时行情 | 拉取   | get_security_trade        |  获取标的成交明细    |
| 实时行情 | 拉取   | get_security_intraday          |  获取标的分时    |
| 实时行情 | 拉取   | get_security_candlestick          |  获取标的 k 线    |
| 实时行情 | 拉取   | get_optionchain_date_list          |  获取美股标的期权链日期列表    |
| 实时行情 | 拉取   | get_optionchain_date_strike_info   |  获取美股标的期权到期日的行权价 |
| 实时行情 | 拉取   | get_warrant_issuer_info          |  获取港股轮证发型商 id    |
| 实时行情 | 拉取   | get_warrant_filter_list          |  获取港股标的轮证列表    |
| 实时行情 | 拉取   | get_market_trade_session         |  获取各个市场当日的交易时段   |
| 实时行情 | 拉取   | get_market_trade_day         |  获取市场交易日   |
| 实时行情 | 订阅   | get_subscription         |  已订阅标的查询   |
| 实时行情 | 订阅   | subscribe         |  订阅行情数据   |
| 实时行情 | 订阅   | unsubscribe         |  取消订阅行情数据   |
| 实时行情 | 推送   | on_receive_quote         |  行情价格推送回调   |
| 实时行情 | 推送   | on_receive_depth         |  盘口数据推送回调   |
| 实时行情 | 推送   | on_receive_brokers       |  经纪队列数据推送回调   |
| 实时行情 | 推送   | on_receive_trade         |  成交明细推送回调   |