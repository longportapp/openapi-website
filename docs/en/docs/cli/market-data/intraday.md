---
title: 'intraday'
sidebar_label: 'intraday'
sidebar_position: 5
---

# longbridge intraday

Get today's minute-by-minute price and volume data (intraday line) for any symbol.

## Basic Usage

<CliCommand>
longbridge intraday TSLA.US
</CliCommand>

## Scenarios

### View today's intraday price line

<CliCommand>
longbridge intraday TSLA.US
longbridge intraday TSLA.US --format json
</CliCommand>

Outputs one bar per minute from market open to the latest available tick, showing price, average price, volume, and turnover.

### Include pre-market and post-market for US stocks

<CliCommand>
longbridge intraday AAPL.US --session all
</CliCommand>

```json
[
  { "avg_price": "258.368439", "price": "258.330", "time": "2026-04-09 08:00:00", "turnover": "97663.270", "volume": "378" },
  { "avg_price": "258.382920", "price": "258.240", "time": "2026-04-09 08:01:00", "turnover": "1622133.447", "volume": "6278" }
]
```

`--session all` includes pre-market bars starting from approximately 8:00 AM ET, as well as post-market bars after 4:00 PM ET.
