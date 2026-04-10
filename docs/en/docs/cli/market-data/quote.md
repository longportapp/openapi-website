---
title: 'quote'
sidebar_label: 'quote'
sidebar_position: 1
---

# longbridge quote

Get real-time quotes for one or more symbols — price, volume, change from previous close, and extended-hours data for US stocks.

## Basic Usage

<CliCommand>
longbridge quote TSLA.US
</CliCommand>

## Scenarios

### Check a single stock

<CliCommand>
longbridge quote TSLA.US
</CliCommand>

Displays the latest price, open, high, low, volume, turnover, and previous close for TSLA.

### Compare multiple symbols across markets

<CliCommand>
longbridge quote TSLA.US NVDA.US 700.HK
longbridge quote TSLA.US NVDA.US 700.HK --format json
</CliCommand>

Pass multiple symbols in one call to compare quotes side by side. Symbols from different markets (US, HK, CN) are all supported. US stocks include `pre_market_quote` and `post_market_quote` fields when extended-hours data is available.
