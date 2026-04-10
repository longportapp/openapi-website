---
title: 'static'
sidebar_label: 'static'
sidebar_position: 7
---

# static

Get static reference data for any symbol — name, exchange, currency, lot size, shares outstanding, EPS, BPS, and dividend yield.

## Basic Usage

<CliCommand>
longbridge static NVDA.US
</CliCommand>

## Scenarios

### Look up multiple symbols at once

<CliCommand>
longbridge static NVDA.US TSLA.US
</CliCommand>

Returns reference data for all requested symbols in one call. Useful for quick comparison of fundamental attributes.

### Verify a symbol before trading

<CliCommand>
longbridge static 700.HK
</CliCommand>

Confirms the symbol is valid and shows its exchange, currency, lot size, and current share count — handy before placing a trade.

### JSON output

<CliCommand>
longbridge static NVDA.US TSLA.US --format json
</CliCommand>

```json
[
  { "bps": "6.472962962962963", "circ._shares": "23501828621", "currency": "USD", "dividend": "0.04", "eps": "4.9410288065843621", "eps_ttm": "4.9410288065843621", "exchange": "NASD", "lot_size": "1", "name": "NVIDIA Corporation", "symbol": "NVDA.US", "total_shares": "24300000000" },
  { "bps": "21.8890043444422363", "circ._shares": "2812676349", "currency": "USD", "dividend": "0", "eps": "1.0110776201080371", "eps_ttm": "1.0110776201080371", "exchange": "NASD", "lot_size": "1", "name": "Tesla, Inc.", "symbol": "TSLA.US", "total_shares": "3752431984" }
]
```
