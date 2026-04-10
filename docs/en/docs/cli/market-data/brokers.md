---
title: 'brokers'
sidebar_label: 'brokers'
sidebar_position: 3
---

# longbridge brokers

See which broker IDs are present at each price level in the HK order book. Useful for identifying institutional order flow.

## Basic Usage

<CliCommand>
longbridge brokers 700.HK
</CliCommand>

## Scenarios

### View broker distribution

<CliCommand>
longbridge brokers 700.HK
longbridge brokers 700.HK --format json
</CliCommand>

Displays each price level in the HK order book along with the broker IDs placing orders at that level. Use `--format json` to get a structured list of bid and ask levels, each containing an array of broker IDs present at that price.

## Requirements

Level 2 quote subscription required. HK market only. See [Quote Subscriptions](/docs/quote/) for subscription options.

## Notes

Use `longbridge participants` to look up broker names by ID. Broker IDs in the `brokers` output map directly to the `broker_id` field in the participants list.
