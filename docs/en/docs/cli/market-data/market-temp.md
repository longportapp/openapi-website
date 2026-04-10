---
title: 'market-temp'
sidebar_label: 'market-temp'
sidebar_position: 10
---

# market-temp

Get the Longbridge market temperature index — a composite 0–100 sentiment gauge combining valuation and market sentiment. Higher = more bullish.

## Basic Usage

<CliCommand>
longbridge market-temp HK
</CliCommand>

## Scenarios

### Current market temperature

<CliCommand>
# Hong Kong market
longbridge market-temp HK
# US market
longbridge market-temp US
# China A-shares
longbridge market-temp CN
</CliCommand>

Supported markets: `HK` (default), `US`, `CN` (aliases: `SH`, `SZ`), `SG`. Running without an argument defaults to `HK`.

### Historical temperature trend

<CliCommand>
longbridge market-temp US --history --start 2026-04-01 --end 2026-04-09 --format json
</CliCommand>

```json
[
  { "description": "", "sentiment": "70", "temperature": "67", "time": "2026-04-01 04:00:00", "valuation": "64" },
  { "description": "", "sentiment": "34", "temperature": "50", "time": "2026-04-02 04:00:00", "valuation": "67" },
  { "description": "", "sentiment": "56", "temperature": "61", "time": "2026-04-06 04:00:00", "valuation": "67" }
]
```

Returns one record per trading day over the specified range. Useful for charting sentiment shifts around market events.

### JSON snapshot for monitoring

<CliCommand>
longbridge market-temp HK --format json
</CliCommand>

```json
[
  { "field": "Market", "value": "HK" },
  { "field": "Temperature", "value": "82" },
  { "field": "Description", "value": "Temp Warm & Gradually Rising" },
  { "field": "Valuation", "value": "88" },
  { "field": "Sentiment", "value": "75" }
]
```

The snapshot includes the overall temperature score, a plain-language description, and the underlying valuation and sentiment sub-scores.
