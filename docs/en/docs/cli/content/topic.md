---
title: 'topic'
sidebar_label: 'topic'
sidebar_position: 3
---

# longbridge topic

Fetch community discussion topics related to a symbol from the Longbridge platform.

## Basic Usage

<CliCommand>
longbridge topic TSLA.US
</CliCommand>

## Scenarios

### View community discussions

<CliCommand>
longbridge topic TSLA.US
# View discussions for another symbol
longbridge topic NVDA.US
</CliCommand>

Lists community posts and discussions related to the symbol, including titles, descriptions, and engagement metrics.

### Find high-engagement posts

<CliCommand>
# Filter posts with significant likes using jq
longbridge topic TSLA.US --format json | jq '[.[] | select(.likes_count > 10)]'
</CliCommand>

Combines with `jq` to surface the most-discussed posts. Useful for gauging retail sentiment spikes around earnings or news events.
