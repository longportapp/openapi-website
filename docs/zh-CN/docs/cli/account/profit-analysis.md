---
title: 'profit-analysis'
sidebar_label: 'profit-analysis'
sidebar_position: 9
---

# longbridge profit-analysis

分析盈亏——整体盈亏概览、按个股分拆明细、单只股票的详细交易流水，以及按市场筛选的视图。

## 基本用法

```bash
longbridge profit-analysis
```

```
P&L Summary (USD)  2023-12-04 ~ 2026-04-13

Total Asset          125413.01
Invest Amount        76997.11
Total P&L            48415.89
Total P&L Rate       0.6288

Stock P&L Breakdown

| Symbol  | Name        | Market | P&L     |
|---------|-------------|--------|---------|
| 9988.HK | 阿里巴巴-W | HK     | 18406.9 |
| AAPL.US | 苹果        | US     | 6498.14 |
```

## 示例

### 盈亏概览和个股分拆

```bash
longbridge profit-analysis
longbridge profit-analysis --format json
```

展示整体盈亏概览以及所有股票的盈亏分拆表。

### 单只股票盈亏详情

```bash
longbridge profit-analysis detail TSLA.US
longbridge profit-analysis detail 700.HK --currency HKD
```

展示指定股票的详细盈亏——正股和衍生品持仓的买入/卖出/费用明细，以及交易流水历史。

### 筛选衍生品流水

```bash
longbridge profit-analysis detail TSLA.US --derivative
```

### 翻页查看交易流水

```bash
longbridge profit-analysis detail TSLA.US --page 2 --size 20
```

### 按市场查看盈亏

```bash
longbridge profit-analysis by-market HK
longbridge profit-analysis by-market US --size 50
```

展示按市场筛选的个股盈亏，支持分页。

## 权限要求

需要 OAuth 账户权限。参见[账户权限设置](/zh-CN/docs/trade/)。
