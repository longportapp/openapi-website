---
title: 'depth'
sidebar_label: 'depth'
sidebar_position: 2
---

# longbridge depth

View the Level 2 order book for a symbol — the top 10 bid and ask prices with order counts and volumes.

## Basic Usage

<CliCommand>
longbridge depth 700.HK
</CliCommand>

## Scenarios

### View the order book

<CliCommand>
longbridge depth 700.HK
longbridge depth 700.HK --format json
</CliCommand>

Shows the current bid and ask ladder for 700.HK, including price levels, volume at each level, and order count. Up to 10 levels are returned per side when the market is open.

## Requirements

Level 2 quote subscription required. See [Quote Subscriptions](/docs/quote/) for subscription options.
