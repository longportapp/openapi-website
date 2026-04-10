---
title: 'cash-flow'
sidebar_label: 'cash-flow'
sidebar_position: 2
---

# longbridge cash-flow

View your cash flow history — deposits, withdrawals, dividend payments, trade settlements, and other account movements.

## Basic Usage

<CliCommand>
longbridge cash-flow
</CliCommand>

## Scenarios

### View last 30 days of cash flow

<CliCommand>
longbridge cash-flow
</CliCommand>

Lists all cash movements in the past 30 days, including the flow type, associated symbol, balance, currency, and timestamp.

### Filter by date range

<CliCommand>
longbridge cash-flow --start 2026-01-01 --end 2026-03-31
</CliCommand>

Fetches cash flow records within a specific date range. Useful for quarterly reconciliation or tax reporting.

## Requirements

OAuth account permission required. See the [account permission setup](/docs/trade/) guide.
