---
title: 'exchange-rate'
sidebar_label: 'exchange-rate'
sidebar_position: 4
---

# longbridge exchange-rate

Get current foreign exchange rates for all currency pairs used in your Longbridge account.

## Basic Usage

<CliCommand>
longbridge exchange-rate
</CliCommand>

## Scenarios

### View all exchange rates

<CliCommand>
longbridge exchange-rate
longbridge exchange-rate --format json
</CliCommand>

Displays bid, offer, and average rates for all currency pairs available in your account (e.g., HKD/USD, HKD/CNH). All rates are expressed with HKD as the base currency.

## Requirements

No login is required. This command is available without authentication.
