# CLI Command Grouping Design

**Date:** 2026-03-30
**Status:** Approved
**Scope:** `longbridge-terminal` + `developers` repo docs sync

---

## Overview

Restructure flat top-level CLI commands into domain-grouped subcommands. Many commands currently live at the root level with hyphenated names (`news-detail`, `create-topic`, `kline-history`). The goal is a consistent `<noun> <verb>` or `<noun> <subcommand>` pattern, matching the existing `watchlist` pattern.

**Approach:** Full migration, no backward-compatible aliases. Breaking change is acceptable — no external user base with scripting dependencies at this stage.

---

## Command Mapping

### Changed commands

| Old command | New command |
|---|---|
| `news-detail <id>` | `news detail <id>` |
| `filings <symbol>` | `filing list <symbol>` |
| `filing-detail <symbol> <id>` | `filing detail <symbol> <id>` |
| `topics <symbol>` | `topic list <symbol>` |
| `topic-detail <id>` | `topic detail <id>` |
| `my-topics` | `topic mine` |
| `create-topic` | `topic create` |
| `topic-replies <id>` | `topic replies <id>` |
| `create-topic-reply <id>` | `topic create-reply <id>` |
| `option-quote <symbols>` | `option quote <symbols>` |
| `option-chain <symbol>` | `option chain <symbol>` |
| `warrant-quote <symbols>` | `warrant quote <symbols>` |
| `warrant-list <symbol>` | `warrant list <symbol>` |
| `warrant-issuers` | `warrant issuers` |
| `kline-history <symbol>` | `kline history <symbol>` |
| `capital-flow <symbol>` | `capital flow <symbol>` |
| `capital-dist <symbol>` | `capital dist <symbol>` |
| `trading-session` | `trading session` |
| `trading-days <market>` | `trading days <market>` |

### Unchanged commands

`login`, `logout`, `check`, `update`, `tui`, `quote`, `depth`, `brokers`, `trades`, `intraday`, `kline` (base), `static`, `calc-index`, `market-temp`, `security-list`, `participants`, `subscriptions`, `watchlist`, `orders`, `order`, `executions`, `buy`, `sell`, `cancel`, `replace`, `balance`, `cash-flow`, `positions`, `fund-positions`, `margin-ratio`, `max-qty`

---

## New `Commands` Enum Groups

```
News { cmd: Option<NewsCmd> }
  └─ Detail { id }          // "news detail <id>"
  // no subcommand → "news <symbol>" (list)

Filing { cmd: FilingCmd }
  ├─ List { symbol, count }
  └─ Detail { symbol, id, list_files, file_index }

Topic { cmd: TopicCmd }
  ├─ List { symbol, count }
  ├─ Detail { id }
  ├─ Mine { page, size, post_type }
  ├─ Create { title, body, post_type, tickers }
  ├─ Replies { topic_id, page, size }
  └─ CreateReply { topic_id, body, reply_to_id }

Option { cmd: OptionCmd }
  ├─ Quote { symbols }
  └─ Chain { symbol, date }

Warrant { cmd: WarrantCmd }
  ├─ Quote { symbols }
  ├─ List { symbol }
  └─ Issuers

Kline { symbol, period, count, adjust, session, cmd: Option<KlineCmd> }
  └─ History { symbol, period, start, end, adjust, session }

Capital { cmd: CapitalCmd }
  ├─ Flow { symbol }
  └─ Dist { symbol }

Trading { cmd: TradingCmd }
  ├─ Session
  └─ Days { market, start, end }
```

**`news` special handling:** `News` takes an optional subcommand. Without a subcommand it accepts `symbol` and `count` arguments (list behavior). With `detail` subcommand it accepts `id`. This matches the `kline` pattern where base args and subcommand coexist via `Option<KlineCmd>`.

---

## Code Changes

### `longbridge-terminal`

**`src/cli/mod.rs` only** — no changes to `news.rs`, `topic.rs`, `trade.rs`, etc.

1. Remove old flat variants from `Commands` enum: `NewsDetail`, `Filings`, `FilingDetail`, `Topics`, `TopicDetail`, `MyTopics`, `CreateTopic`, `TopicReplies`, `CreateTopicReply`, `OptionQuote`, `OptionChain`, `WarrantQuote`, `WarrantList`, `WarrantIssuers`, `KlineHistory`, `CapitalFlow`, `CapitalDist`, `TradingSession`, `TradingDays`
2. Add new grouped variants: `News`, `Filing`, `Topic`, `Option`, `Warrant`, `Capital`, `Trading`; extend `Kline` with optional subcommand
3. Add new `*Cmd` enums: `NewsCmd`, `FilingCmd`, `TopicCmd`, `OptionCmd`, `WarrantCmd`, `CapitalCmd`, `TradingCmd`, `KlineCmd`
4. Update `dispatch()` match arms accordingly — all handler calls remain identical (same functions in `news.rs`, `topic.rs`, etc.)

### `developers` repo

All docs changes are text substitution of old command names → new command names. No structural changes.

**Files to update:**

| File | Change |
|---|---|
| `openapi.yaml` | 14 CLI example strings |
| `skills/longbridge/references/cli/overview.md` | CLI reference examples |
| `skills/longbridge/SKILL.md` | Quick-reference examples |
| `docs/{en,zh-CN,zh-HK}/docs/cli.md` | Full CLI reference page (×3) |
| `docs/{en,zh-CN,zh-HK}/docs/quote/pull/*.md` | CliCommand blocks (×many) |
| `docs/{en,zh-CN,zh-HK}/docs/content/*.md` | CliCommand blocks (×many) |

---

## Delivery

Both repos change in separate PRs:
1. `longbridge-terminal` PR — `src/cli/mod.rs` + `README.md` + `docs/cli-design.md`
2. `developers` PR — `openapi.yaml` + `skills/` + `docs/`

PR title convention per CLAUDE.md: `cli: restructure commands into domain groups`
