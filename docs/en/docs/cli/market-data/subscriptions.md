---
title: 'subscriptions'
sidebar_label: 'subscriptions'
sidebar_position: 14
---

# longbridge subscriptions

List your current active real-time quote subscriptions.

## Basic Usage

<CliCommand>
longbridge subscriptions
</CliCommand>

## Scenarios

### Check active subscriptions

<CliCommand>
longbridge subscriptions
</CliCommand>

Returns all symbols you are currently subscribed to for real-time quote streaming, along with the subscription types (e.g. quote, depth, trades).

## Notes

Returns an empty list if you have no active subscriptions. Subscriptions are created through the TUI or via `longbridge subscribe`. They are session-scoped and reset when you log out or the session expires.
