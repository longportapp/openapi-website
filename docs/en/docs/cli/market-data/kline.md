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
longbridge kline TSLA.US --period day --start 2025-01-01 --end 2025-03-31 --format json
</CliCommand>

Fetch candles for a specific date window using `--start` and `--end` (format: `YYYY-MM-DD`). The `time` field in JSON output represents the candle open time — for US daily candles, this is US Eastern midnight expressed in UTC.
