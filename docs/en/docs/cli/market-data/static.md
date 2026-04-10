---
title: 'static'
sidebar_label: 'static'
sidebar_position: 7
---

# longbridge static

Get static reference data for any symbol — name, exchange, currency, lot size, shares outstanding, EPS, BPS, and dividend yield.

## Basic Usage

<CliCommand>
longbridge static NVDA.US
</CliCommand>

## Scenarios

### Look up multiple symbols at once

<CliCommand>
longbridge static NVDA.US TSLA.US
longbridge static NVDA.US TSLA.US --format json
</CliCommand>

Returns reference data for all requested symbols in one call. Useful for quick comparison of fundamental attributes.

### Verify a symbol before trading

<CliCommand>
longbridge static 700.HK
</CliCommand>

Confirms the symbol is valid and shows its exchange, currency, lot size, and current share count — handy before placing a trade.
