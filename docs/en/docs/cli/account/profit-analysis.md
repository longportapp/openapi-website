---
title: 'profit-analysis'
sidebar_label: 'profit-analysis'
sidebar_position: 9
---

# longbridge profit-analysis

Analyze profit and loss — overall P&L summary, per-stock breakdown, individual stock detail with transaction flows, and market-filtered views.

## Basic Usage

```bash
longbridge profit-analysis
```

```
P&L Summary (USD)  2023-12-04 ~ 2026-04-13

Total Asset          125413.01
Initial Asset        0.00
Invest Amount        76997.11
Total P&L            48415.89
Total P&L Rate       0.6288

Stock P&L Breakdown

| Symbol  | Name       | Market | P&L     |
|---------|------------|--------|---------|
| 9988.HK | Alibaba    | HK     | 18406.9 |
| AAPL.US | Apple      | US     | 6498.14 |
```

## Examples

### P&L summary with stock breakdown

```bash
longbridge profit-analysis
longbridge profit-analysis --format json
```

Shows overall P&L summary and a breakdown table of all stocks with their profit/loss.

### Individual stock P&L detail

```bash
longbridge profit-analysis detail TSLA.US
longbridge profit-analysis detail 700.HK --currency HKD
```

Shows detailed P&L for a specific stock — underlying and derivative positions with buy/sell/fee breakdowns, plus transaction flow history.

### Filter derivative flows

```bash
longbridge profit-analysis detail TSLA.US --derivative
```

### Paginate transaction flows

```bash
longbridge profit-analysis detail TSLA.US --page 2 --size 20
```

### P&L by market

```bash
longbridge profit-analysis by-market HK
longbridge profit-analysis by-market US --size 50
```

Shows stock P&L filtered by market with pagination support.

## Requirements

OAuth account permission required. See the [account permission setup](/docs/trade/) guide.
