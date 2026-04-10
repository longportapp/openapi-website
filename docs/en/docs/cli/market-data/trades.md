---
title: 'trades'
sidebar_label: 'trades'
sidebar_position: 4
---

# longbridge trades

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

### Read buy/sell pressure from trade direction

<CliCommand>
# The direction field shows Up, Down, or Neutral relative to the prior trade
longbridge trades TSLA.US --count 50 --format json
</CliCommand>

Each entry includes a `direction` field indicating whether the trade printed above, below, or at the previous price — useful for gauging short-term momentum.
