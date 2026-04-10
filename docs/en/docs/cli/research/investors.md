---
title: 'investors'
sidebar_label: 'investors'
sidebar_position: 3
---

# longbridge investors

Browse active institutional fund managers ranked by AUM (from SEC 13F filings), and drill into any manager's current holdings.

## Basic Usage

<CliCommand>
longbridge investors
</CliCommand>

## Scenarios

### Browse top fund managers

<CliCommand>
longbridge investors
</CliCommand>

Lists the largest institutional investors ranked by AUM, with their CIK identifier, name, reported AUM, and the period of the latest 13F filing.

### View a fund manager's holdings

<CliCommand>
# Use the CIK from the investors list to drill into holdings
longbridge investors 0001067983
</CliCommand>

Pass a CIK to see the full list of equity positions reported by that fund manager. CIK `0001067983` is Berkshire Hathaway.

### JSON output

<CliCommand>
longbridge investors --format json
</CliCommand>

```json
[
  { "aum_usd": 637974701306, "cik": "0001562230", "name": "Capital International Investors", "period": "31-DEC-2025", "rank": 1 },
  { "aum_usd": 541732783094, "cik": "0001422848", "name": "Capital Research Global Investors", "period": "31-DEC-2025", "rank": 2 },
  { "aum_usd": 404442795298, "cik": "0001445893", "name": "CTC LLC", "period": "31-DEC-2025", "rank": 3 },
  { "aum_usd": 274160086701, "cik": "0001067983", "name": "BERKSHIRE HATHAWAY INC", "period": "31-DEC-2025", "rank": 4 }
]
```

Each entry includes a `cik` that can be passed directly to `longbridge investors <cik>` to view that manager's individual holdings.
