---
title: 'profit-analysis'
sidebar_label: 'profit-analysis'
sidebar_position: 9
---

# longbridge profit-analysis

分析盈虧——整體損益摘要、個股明細、單隻股票的交易流水詳情，以及按市場篩選的視圖。

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
| AAPL.US | 蘋果        | US     | 6498.14 |
```

## 示例

### 損益摘要及個股明細

```bash
longbridge profit-analysis
longbridge profit-analysis --format json
```

展示整體損益摘要以及所有持倉股票的盈虧明細表。

### 單隻股票損益詳情

```bash
longbridge profit-analysis detail TSLA.US
longbridge profit-analysis detail 700.HK --currency HKD
```

展示指定股票的詳細損益——正股及衍生品持倉的買入/賣出/費用明細，以及交易流水記錄。

### 篩選衍生品流水

```bash
longbridge profit-analysis detail TSLA.US --derivative
```

### 交易流水分頁

```bash
longbridge profit-analysis detail TSLA.US --page 2 --size 20
```

### 按市場查看損益

```bash
longbridge profit-analysis by-market HK
longbridge profit-analysis by-market US --size 50
```

展示按市場篩選的個股損益，支援分頁。

## 權限要求

需要 OAuth 帳戶權限。參見[帳戶權限設置](/zh-HK/docs/trade/)。
