---
title: 'margin-ratio'
sidebar_label: 'margin-ratio'
sidebar_position: 2
---

# longbridge margin-ratio

Look up the margin requirements for a symbol — initial, maintenance, and forced liquidation ratios.

## Basic Usage

<CliCommand>
longbridge margin-ratio TSLA.US
</CliCommand>

## Scenarios

### Check margin requirements before buying on margin

<CliCommand>
longbridge margin-ratio TSLA.US
# Output as JSON for scripting
longbridge margin-ratio TSLA.US --format json
</CliCommand>

Displays the initial margin ratio, maintenance margin ratio, and forced liquidation ratio for the symbol. Use this before placing a margin buy to understand the capital requirements.

### Compare multiple symbols

<CliCommand>
longbridge margin-ratio TSLA.US NVDA.US
</CliCommand>

Pass multiple symbols to compare their margin requirements side by side.

## Requirements

OAuth trade or account permission is required to query margin ratios. See [Trade Permissions](/docs/trade/) for setup details.
