---
title: 'trades'
sidebar_label: 'trades'
sidebar_position: 4
---

# trades

Fetch recent tick-by-tick trade records for a symbol, including price, volume, time, and trade direction.

## Basic Usage

<CliCommand>
longbridge trades TSLA.US
</CliCommand>

## Scenarios

### View last 20 trades

<CliCommand>
longbridge trades TSLA.US
</CliCommand>

Returns the 20 most recent trades for TSLA, showing price, volume, timestamp, and direction for each tick.

### Get more trades with --count

<CliCommand>
longbridge trades TSLA.US --count 50
</CliCommand>

Use `--count` to fetch up to 50 (or more) recent trades in a single call.

### JSON output for analysis

<CliCommand>
longbridge trades TSLA.US --count 3 --format json
</CliCommand>

```json
[
  { "direction": "Neutral", "price": "344.940", "time": "2026-04-09 23:59:55", "type": "I", "volume": "3" },
  { "direction": "Neutral", "price": "344.968", "time": "2026-04-09 23:59:56", "type": "I", "volume": "5" },
  { "direction": "Down", "price": "344.930", "time": "2026-04-09 23:59:59", "type": "I", "volume": "5" }
]
```

The `direction` field is `Up`, `Down`, or `Neutral` relative to the preceding trade price.
