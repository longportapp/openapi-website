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
longbridge insider-trades TSLA.US --format json
</CliCommand>

Lists recent insider transactions including the insider's name, title, transaction date, type, share count, and price.

### Expand the filing history

<CliCommand>
# Fetch more filings to cover a wider date range
longbridge insider-trades TSLA.US --count 100
longbridge insider-trades AAPL.US --count 100 --format json
</CliCommand>

Use `--count` to retrieve more Form 4 filings and cover a broader time window. Useful for tracking insider activity around earnings announcements or major corporate events.

## Notes

US market only. Data sourced from SEC Form 4 filings.
