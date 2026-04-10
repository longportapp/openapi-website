---
title: 'positions'
sidebar_label: 'positions'
sidebar_position: 4
---

# longbridge positions

List your current stock positions — symbol, quantity, available quantity, cost price, and market.

## Basic Usage

<CliCommand>
longbridge positions
</CliCommand>

## Scenarios

### View all positions

<CliCommand>
longbridge positions
</CliCommand>

Displays every open stock position with its name, symbol, quantity, available quantity for trading, cost price, and market.

### JSON for scripts or AI agents

<CliCommand>
longbridge positions --format json
</CliCommand>

```json
[
  { "available": "101", "cost_price": "50.229", "currency": "USD", "market": "US", "name": "NVIDIA", "quantity": "101", "symbol": "NVDA.US" },
  { "available": "15", "cost_price": "373.310", "currency": "USD", "market": "US", "name": "Microsoft", "quantity": "15", "symbol": "MSFT.US" },
  { "available": "133", "cost_price": "211.589", "currency": "USD", "market": "US", "name": "Apple", "quantity": "133", "symbol": "AAPL.US" }
]
```

Each entry includes `quantity` (total held) and `available` (quantity not locked by pending sell orders), along with `cost_price` for P/L calculations.

## Requirements

OAuth account permission required. See the [account permission setup](/docs/trade/) guide.
