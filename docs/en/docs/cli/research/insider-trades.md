---
title: 'insider-trades'
sidebar_label: 'insider-trades'
sidebar_position: 2
---

# longbridge insider-trades

View SEC Form 4 insider transaction history for any US-listed stock — purchases, sales, and option exercises by company insiders.

## Basic Usage

<CliCommand>
longbridge insider-trades TSLA.US
</CliCommand>

## Scenarios

### Check insider activity

<CliCommand>
longbridge insider-trades TSLA.US
</CliCommand>

Lists recent insider transactions including the insider's name, title, transaction date, type, share count, and price.

### JSON for monitoring

<CliCommand>
longbridge insider-trades TSLA.US --format json
</CliCommand>

```json
[
  { "code": "M", "date": "2026-03-31", "filing_date": "2026-04-02", "owner": "Zhu Xiaotong", "price": 20.57, "shares": 20000.0, "shares_after": 20000.0, "title": "SVP", "type": "EXERCISE", "value": 411400.0 },
  { "code": "S", "date": "2025-09-11", "filing_date": "2025-09-12", "owner": "Zhu Xiaotong", "price": 363.755, "shares": 20000.0, "shares_after": 47599.75, "title": "SVP, APAC and", "type": "SELL", "value": 7275100.0 }
]
```

The `type` field indicates the transaction kind: `BUY` for open-market purchases, `SELL` for sales, and `EXERCISE` for option exercises. `value` is the total dollar value of the transaction.

## Notes

US market only. Data sourced from SEC Form 4 filings.
