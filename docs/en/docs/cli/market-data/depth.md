---
title: 'depth'
sidebar_label: 'depth'
sidebar_position: 2
---

# longbridge depth

View the Level 2 order book for a symbol — the top 10 bid and ask prices with order counts and volumes.

## Basic Usage

<CliCommand>
longbridge depth 700.HK
</CliCommand>

## Scenarios

### View the order book

<CliCommand>
longbridge depth 700.HK
</CliCommand>

Shows the current bid and ask ladder for 700.HK, including price levels, volume at each level, and order count.

### JSON output for programmatic use

<CliCommand>
longbridge depth 700.HK --format json
</CliCommand>

```json
{
  "asks": [{ "order_num": 63, "position": 1, "price": "505.500", "volume": 42400 }],
  "bids": [{ "order_num": 72, "position": 1, "price": "505.000", "volume": 67700 }],
  "symbol": "700.HK"
}
```

Each entry includes `position` (price level rank), `price`, `volume` (total shares at that level), and `order_num` (number of orders). Up to 10 levels are returned per side when the market is open.

## Requirements

Level 2 quote subscription required. See [Quote Subscriptions](/docs/quote/) for subscription options.
