---
title: 'forecast-eps'
sidebar_label: 'forecast-eps'
sidebar_position: 4
---

# longbridge forecast-eps

Get analyst consensus EPS forecasts for upcoming reporting periods — mean, median, highest, and lowest estimates.

## Basic Usage

<CliCommand>
longbridge forecast-eps TSLA.US
</CliCommand>

## Scenarios

### Check EPS forecast

<CliCommand>
longbridge forecast-eps TSLA.US
</CliCommand>

Displays the analyst consensus EPS forecast for each upcoming period, along with the range of estimates (highest and lowest).

### JSON for tracking estimates

<CliCommand>
longbridge forecast-eps TSLA.US --format json
</CliCommand>

```json
{
  "items": [
    {
      "forecast_end_date": "1726790400",
      "forecast_eps_highest": "3.79", "forecast_eps_lowest": "2.37",
      "forecast_eps_mean": "3.043", "forecast_eps_median": "3.02",
      "institution_down": 0, "institution_total": 0, "institution_up": 0
    }
  ]
}
```

Each item covers one reporting period. `forecast_eps_mean` and `forecast_eps_median` represent the consensus, while `highest` and `lowest` show the range of analyst estimates.
