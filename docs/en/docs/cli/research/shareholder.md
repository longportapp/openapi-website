---
title: 'shareholder'
sidebar_label: 'shareholder'
sidebar_position: 1
---

# longbridge shareholder

View the top shareholders of a company — institutional and individual — with ownership percentages and recent share count changes.

## Basic Usage

<CliCommand>
longbridge shareholder TSLA.US
</CliCommand>

## Scenarios

### Check top shareholders

<CliCommand>
longbridge shareholder TSLA.US
</CliCommand>

Lists the largest shareholders by ownership percentage, including both institutional investors and individual insiders.

### JSON for analysis

<CliCommand>
longbridge shareholder TSLA.US --format json
</CliCommand>

```json
{
  "shareholder_list": [
    { "institution_type": "", "percent_of_shares": "24.86", "report_date": "2025-12-30", "shareholder_name": "Elon R. Musk", "shares_changed": "423533205", "stocks": [] },
    { "institution_type": "", "percent_of_shares": "6.90", "report_date": "2025-12-31", "shareholder_name": "The Vanguard Group, Inc.", "shares_changed": "6538720", "stocks": [] }
  ]
}
```

`percent_of_shares` is the ownership stake as a percentage of total outstanding shares. `shares_changed` shows the net change in shares held since the prior filing.
