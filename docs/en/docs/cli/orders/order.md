---
title: 'order'
sidebar_label: 'order'
sidebar_position: 1
---

# longbridge order

View your orders and trade executions, or submit buy/sell orders directly from the terminal.

## Basic Usage

<CliCommand>
longbridge order
</CliCommand>

## Scenarios

### View today's orders

<CliCommand>
longbridge order
</CliCommand>

Lists all orders placed today with their status, symbol, quantity, price, and order ID.

### Historical orders for a symbol

<CliCommand>
longbridge order --history --start 2026-01-01 --symbol TSLA.US
</CliCommand>

Fetches historical orders filtered by symbol and date range. Use `--start` and `--end` to set the date window.

### Submit a limit buy order

<CliCommand>
longbridge order buy TSLA.US 10 --price 340.00
</CliCommand>

Places a limit buy order for 10 shares of TSLA at $340.00. The command prompts for confirmation before submitting.

### Submit a limit sell order

<CliCommand>
longbridge order sell TSLA.US 5 --price 360.00
</CliCommand>

Places a limit sell order for 5 shares of TSLA at $360.00. The command prompts for confirmation before submitting.

### View trade executions

<CliCommand>
longbridge order executions
</CliCommand>

Lists all filled trade executions for the current day, including execution price, quantity, and time.

## Requirements

OAuth trade permission is required to place, cancel, or replace orders. See the [trade permission setup](/docs/trade/) guide to enable trading access.

## Notes

`buy` and `sell` always prompt for confirmation before submitting — there is no `--yes` flag to skip it. Use `longbridge order detail <id>` to inspect a specific order by ID. Use `longbridge order cancel <id>` to cancel a pending order. Use `longbridge order replace <id>` to modify a pending order's price or quantity.
