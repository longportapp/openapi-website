---
title: 'shareholder'
sidebar_label: 'shareholder'
sidebar_position: 1
---

# longbridge shareholder

View the top shareholders of a company — institutional and individual — with ownership percentages and recent share count changes.

## Basic Usage

<CliCommand>
longbridge shareholder TSLA.US
</CliCommand>

## Scenarios

### Check top shareholders

<CliCommand>
longbridge shareholder TSLA.US
longbridge shareholder TSLA.US --format json
</CliCommand>

Lists the largest shareholders by ownership percentage, including both institutional investors and individual insiders.
