---
title: 'institution-rating'
sidebar_label: 'institution-rating'
sidebar_position: 2
---

# longbridge institution-rating

See the consensus from Wall Street analysts — buy/hold/sell distribution, price target range, and industry rankings.

## Basic Usage

<CliCommand>
longbridge institution-rating TSLA.US
</CliCommand>

## Scenarios

### Check analyst consensus

<CliCommand>
longbridge institution-rating TSLA.US
</CliCommand>

Shows the breakdown of analyst ratings (Buy, Hold, Sell, and variants), the consensus price target range, and industry peer ranking.

### JSON for monitoring

<CliCommand>
longbridge institution-rating TSLA.US --format json
</CliCommand>

```json
{
  "analyst": {
    "evaluate": {
      "buy": 18, "hold": 17, "no_opinion": 4, "over": 5, "sell": 6, "under": 2, "total": 52
    },
    "target": {
      "highest_price": "600.000", "lowest_price": "125.000", "prev_close": "345.62"
    }
  }
}
```

The `evaluate` object contains the per-rating counts across all 52 covering analysts. The `target` object shows the highest and lowest price targets alongside the previous close for context.
