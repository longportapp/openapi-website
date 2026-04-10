---
title: 'news'
sidebar_label: 'news'
sidebar_position: 1
---

# longbridge news

Get latest news articles for a symbol, or fetch the full content of an article by ID.

## Basic Usage

<CliCommand>
longbridge news TSLA.US
</CliCommand>

## Scenarios

### Latest news for a stock

<CliCommand>
longbridge news TSLA.US
# Get more articles
longbridge news NVDA.US --count 5
# Output as JSON for scripting
longbridge news TSLA.US --format json
</CliCommand>

Lists the most recent news articles for the symbol with titles, publication times, and URLs.

### Get full article content

<CliCommand>
longbridge news detail 282276051
</CliCommand>

Fetches the full Markdown content of a single article by its ID. Article IDs are available in the `id` field of the list output.
