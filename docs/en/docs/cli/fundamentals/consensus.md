---
title: 'consensus'
sidebar_label: 'consensus'
sidebar_position: 5
---

# longbridge consensus

See Wall Street's consensus financial estimates — revenue, EBIT, and EPS — for upcoming earnings periods.

## Basic Usage

<CliCommand>
longbridge consensus TSLA.US
</CliCommand>

## Scenarios

### Check consensus estimates

<CliCommand>
longbridge consensus TSLA.US
</CliCommand>

Displays the analyst consensus estimates for the upcoming reporting period, covering key metrics like revenue, EBIT, and EPS.

### JSON output

<CliCommand>
longbridge consensus TSLA.US --format json
</CliCommand>

```json
{
  "currency": "USD",
  "current_period": "qf",
  "list": [
    {
      "details": [
        { "key": "revenue", "name": "Revenue", "estimate": "27144782630.0000", "is_released": false },
        { "key": "ebit", "name": "EBIT", "estimate": "1496709370.0000", "is_released": false }
      ]
    }
  ]
}
```

Each `details` entry includes the metric key, the consensus estimate value, and whether the actual result has already been released. `current_index` in the full response indicates which period in the list is the current one.
