---
title: 'kline'
sidebar_label: 'kline'
sidebar_position: 6
---

# longbridge kline

Fetch candlestick (K-line) data for any symbol. Supports multiple periods and historical date ranges.

## Basic Usage

<CliCommand>
longbridge kline TSLA.US
</CliCommand>

## Scenarios

### Daily candles (last 100 days, default)

<CliCommand>
longbridge kline TSLA.US
</CliCommand>

Returns the last 100 daily candles by default, with open, high, low, close, volume, and turnover for each day.

### Intraday candles with different period

<CliCommand>
longbridge kline TSLA.US --period 1h --count 48
</CliCommand>

Use `--period` to switch granularity (e.g. `1m`, `5m`, `15m`, `30m`, `1h`, `4h`, `day`, `week`, `month`) and `--count` to control how many bars are returned.

### Historical range

<CliCommand>
longbridge kline TSLA.US --period day --start 2025-01-01 --end 2025-03-31
</CliCommand>

Fetch candles for a specific date window using `--start` and `--end` (format: `YYYY-MM-DD`).

### JSON output for backtesting

<CliCommand>
longbridge kline TSLA.US --count 3 --format json
</CliCommand>

```json
[
  { "close": "346.650", "high": "348.020", "low": "337.240", "open": "346.440", "time": "2026-04-07 04:00:00", "turnover": "25563965746.000", "volume": "74515355" },
  { "close": "343.250", "high": "364.500", "low": "339.670", "open": "363.790", "time": "2026-04-08 04:00:00", "turnover": "27457043487.000", "volume": "78838616" },
  { "close": "345.620", "high": "348.880", "low": "337.250", "open": "343.150", "time": "2026-04-09 04:00:00", "turnover": "21375312140.000", "volume": "62164016" }
]
```

The `time` field represents the candle open time. For US daily candles, this is the US Eastern midnight expressed in UTC.
