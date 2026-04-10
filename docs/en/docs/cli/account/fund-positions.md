---
title: 'fund-positions'
sidebar_label: 'fund-positions'
sidebar_position: 5
---

# longbridge fund-positions

List your current fund and ETF positions.

## Basic Usage

<CliCommand>
longbridge fund-positions
</CliCommand>

## Scenarios

### View fund/ETF holdings

<CliCommand>
longbridge fund-positions
</CliCommand>

Displays all fund and ETF positions in your account, including symbol, quantity, and cost information.

### JSON output

<CliCommand>
longbridge fund-positions --format json
</CliCommand>

Returns fund position data as a JSON array, suitable for scripting or integration with other tools.

## Requirements

OAuth account permission required. See the [account permission setup](/docs/trade/) guide.
