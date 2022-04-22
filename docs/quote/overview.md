---
sidebar_position: 1
id: quote_overview
title: 行情接口概览
slug: quote-overview
---

### 行情接口总览
| 模块 | 类型   | 接口名                     | 功能简介      |
|-------|-------|---------------------------|-----------------|
| 实时行情 | 拉取   | [get_security_static_info](./pull/quote-static)  | 获取标的基础信息  |
| 实时行情 | 拉取   | [get_security_quote](./pull/quote-quote)      |  获取标的行情    |
| 实时行情 | 拉取   | [get_option_quote](./pull/quote-option-quote)          |  获取期权行情    |
| 实时行情 | 拉取   | [get_warrant_quote](./pull/quote-warrant-quote)         |  获取轮证行情    |
| 实时行情 | 拉取   | [get_security_depth](./pull/quote-depth)        |  获取标的盘口    |
| 实时行情 | 拉取   | [get_security_brokers](./pull/quote-brokers)      |  获取标的经纪队列    |
| 实时行情 | 拉取   | [get_participant_broker_ids](./pull/quote-broker-ids) |  获取券商席位 id    |
| 实时行情 | 拉取   | [get_security_trade](./pull/quote-trade)        |  获取标的成交明细    |
| 实时行情 | 拉取   | [get_security_intraday](./pull/quote-intraday)          |  获取标的分时    |
| 实时行情 | 拉取   | [get_security_candlestick](./pull/quote-candlestick)          |  获取标的 k 线    |
| 实时行情 | 拉取   | [get_optionchain_date_list](./pull/quote-optionchain-date)          |  获取美股标的期权链日期列表    |
| 实时行情 | 拉取   | [get_optionchain_date_strike_info](./pull/quote-optionchain-date-strike)   |  获取美股标的期权到期日的行权价 |
| 实时行情 | 拉取   | [get_warrant_issuer_info](./pull/quote-issuer)          |  获取港股轮证发型商 id    |
| 实时行情 | 拉取   | [get_warrant_filter_list](./pull/quote-warrant-filter)          |  获取港股标的轮证列表    |
| 实时行情 | 拉取   | [get_market_trade_session](./pull/quote-trade-session)         |  获取各个市场当日的交易时段   |
| 实时行情 | 拉取   | [get_market_trade_day](./pull/quote-trade-day)         |  获取市场交易日   |
| 实时行情 | 订阅   | [get_subscription](./subscribe/quote-subscription)         |  已订阅标的查询   |
| 实时行情 | 订阅   | [subscribe](./subscribe/quote-subscribe)         |  订阅行情数据   |
| 实时行情 | 订阅   | [unsubscribe](./subscribe/quote-unsubscribe)         |  取消订阅行情数据   |
| 实时行情 | 推送   | [on_receive_quote](./push/push-quote)         |  行情价格推送回调   |
| 实时行情 | 推送   | [on_receive_depth](./push/push-depth)         |  盘口数据推送回调   |
| 实时行情 | 推送   | [on_receive_brokers](./push/push-broker)       |  经纪队列数据推送回调   |
| 实时行情 | 推送   | [on_receive_trade](./push/push-trade)         |  成交明细推送回调   |