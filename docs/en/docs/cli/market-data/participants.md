---
title: 'participants'
sidebar_label: 'participants'
sidebar_position: 13
---

# longbridge participants

Get the complete broker/participant directory for the HK market — maps broker IDs to firm names, letting you decode the `brokers` command output.

## Basic Usage

<CliCommand>
longbridge participants
</CliCommand>

## Scenarios

### Look up all broker IDs

<CliCommand>
longbridge participants
longbridge participants --format json
</CliCommand>

Returns the full directory of HK exchange participants, each with their broker ID(s) and firm name. Some firms have multiple broker IDs listed together in a single `broker_id` string.

## Notes

HK market only. Use in conjunction with `longbridge brokers` to identify which firms are placing orders at each price level. The `broker_id` values here correspond directly to the IDs returned by the `brokers` command.
