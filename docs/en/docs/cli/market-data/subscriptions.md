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

### Debug missing push notifications

<CliCommand>
# Check what symbols are subscribed in the current session
longbridge subscriptions
</CliCommand>

If a real-time quote feed goes silent, run `subscriptions` to confirm the symbol is still active. Subscriptions are session-scoped — they reset each time you start a new session.

## Notes

Returns an empty list if you have no active subscriptions. Subscriptions are created through the TUI (or programmatically via the OpenAPI SDK). They are session-scoped and reset when you log out or the session expires.
