# CLI Command Grouping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure flat top-level CLI commands into domain-grouped subcommands (e.g. `news-detail` → `news detail`, `create-topic` → `topic create`).

**Architecture:** All changes to `src/cli/mod.rs` only — no changes to `news.rs`, `topic.rs`, or other implementation files. New `*Cmd` enums are added; old flat variants are replaced with grouped ones. Underlying function calls in `dispatch()` are unchanged.

**Tech Stack:** Rust, clap 4 derive API, `#[derive(Subcommand)]`

---

## Files Modified

| File | Change |
|---|---|
| `longbridge-terminal/src/cli/mod.rs` | Add 8 `*Cmd` enums; replace 19 flat variants; update `dispatch()`; update 13 tests |
| `longbridge-terminal/README.md` | Update `<!-- COMMANDS_START -->` / `<!-- COMMANDS_END -->` block |
| `longbridge-terminal/docs/cli-design.md` | Update command structure section |
| `developers/openapi.yaml` | Update 14 CLI example strings |
| `developers/skills/longbridge/references/cli/overview.md` | Update CLI examples |
| `developers/skills/longbridge/SKILL.md` | Update any CLI examples |
| `developers/docs/en/docs/cli.md` | Update CLI reference |
| `developers/docs/zh-CN/docs/cli.md` | Update CLI reference |
| `developers/docs/zh-HK/docs/cli.md` | Update CLI reference |
| `developers/docs/{en,zh-CN,zh-HK}/docs/quote/pull/*.md` | Update CliCommand blocks |
| `developers/docs/{en,zh-CN,zh-HK}/docs/content/*.md` | Update CliCommand blocks |

---

## PR 1: longbridge-terminal

### Task 1: Add `*Cmd` enums to `src/cli/mod.rs`

**Files:**
- Modify: `longbridge-terminal/src/cli/mod.rs`

Insert the following 8 enums **immediately before** the line `pub async fn dispatch(` (currently around line 870). Place them after the closing `}` of `WatchlistCmd`.

- [ ] **Step 1: Add `NewsCmd`, `FilingCmd`, `TopicCmd`**

Find the line `pub async fn dispatch(cmd: Commands, format: &OutputFormat) -> Result<()> {` and insert the following block immediately before it:

```rust
#[derive(Subcommand)]
pub enum NewsCmd {
    /// Full Markdown content of a news article
    ///
    /// Fetches the article text from https://longbridge.com/news/<id>.md
    /// Example: longbridge news detail 12345678
    Detail {
        /// News article ID (from `longbridge news <SYMBOL>`)
        id: String,
    },
}

#[derive(Subcommand)]
pub enum FilingCmd {
    /// List regulatory filings and announcements for a symbol
    ///
    /// Returns: id, title, file_name, publish_at.
    /// Example: longbridge filing list AAPL.US
    /// Example: longbridge filing list 700.HK --count 5
    List {
        /// Symbol in <CODE>.<MARKET> format, e.g. AAPL.US 700.HK
        symbol: String,
        /// Maximum number of filings to show (default: 20)
        #[arg(long, default_value = "20")]
        count: usize,
    },

    /// Full Markdown content of a regulatory filing (HTML and TXT only)
    ///
    /// Get the symbol and id from `longbridge filing list`.
    /// Some filings contain multiple files. Use --list-files to see all, then --file-index N.
    /// Example: longbridge filing detail AAPL.US 580265529766123777
    /// Example: longbridge filing detail AAPL.US 580265529766123777 --list-files
    /// Example: longbridge filing detail AAPL.US 580265529766123777 --file-index 1
    Detail {
        /// Symbol in <CODE>.<MARKET> format, e.g. AAPL.US 700.HK
        symbol: String,
        /// Filing ID (from `longbridge filing list`)
        id: String,
        /// List all available file URLs without fetching content
        #[arg(long)]
        list_files: bool,
        /// Index of the file to fetch (0-based, default 0)
        #[arg(long, default_value = "0")]
        file_index: usize,
    },
}

#[derive(Subcommand)]
pub enum TopicCmd {
    /// Community discussion topics for a symbol
    ///
    /// Returns: id, title, description, url, published_at, likes, comments, shares.
    /// Example: longbridge topic list TSLA.US
    /// Example: longbridge topic list 700.HK --count 5
    List {
        /// Symbol in <CODE>.<MARKET> format, e.g. TSLA.US 700.HK
        symbol: String,
        /// Maximum number of topics to show (default: 20)
        #[arg(long, default_value = "20")]
        count: usize,
    },

    /// Get full details of a community topic by its ID
    ///
    /// Returns: id, topic_type, title, description, body, author, tickers, hashtags,
    /// images, likes_count, comments_count, views_count, shares_count, detail_url,
    /// created_at, updated_at.
    /// Example: longbridge topic detail 6993508780031016960
    Detail {
        /// Topic ID (e.g. 6993508780031016960)
        id: String,
    },

    /// Topics created by the authenticated user
    ///
    /// Returns: id, title/excerpt, type, created_at, likes, comments, views.
    /// Example: longbridge topic mine
    /// Example: longbridge topic mine --type article --size 10
    Mine {
        /// Page number (default: 1)
        #[arg(long, default_value = "1")]
        page: i32,
        /// Records per page, 1–500 (default: 50)
        #[arg(long, default_value = "50")]
        size: i32,
        /// Filter by content type: article | post (omit for all)
        #[arg(long = "type")]
        post_type: Option<String>,
    },

    /// Publish a new community discussion topic
    ///
    /// Two content types:
    ///   --type post (default): plain text only.
    ///   --type article: Markdown body, title required.
    /// Rate limit: max 3 topics per user per minute, 10 per 24 hours.
    /// Example: longbridge topic create --body "Bullish on 700.HK today"
    /// Example: longbridge topic create --title "My Analysis" --body "$(cat post.md)" --type article
    Create {
        /// Topic title. Required for --type article; optional for --type post.
        #[arg(long)]
        title: Option<String>,
        /// Topic body. post: plain text. article: Markdown, title required.
        #[arg(long)]
        body: String,
        /// Content type: post (default) | article
        #[arg(long = "type")]
        post_type: Option<String>,
        /// Extra tickers to associate, comma-separated, e.g. 700.HK,TSLA.US (max 10).
        #[arg(long, value_delimiter = ',')]
        tickers: Vec<String>,
    },

    /// List replies for a community topic (paginated)
    ///
    /// Returns: id, topic_id, body, reply_to_id, author, likes_count, comments_count, created_at.
    /// Page size is 1–50, default 20.
    /// Example: longbridge topic replies 6993508780031016960
    /// Example: longbridge topic replies 6993508780031016960 --page 2 --size 20
    Replies {
        /// Topic ID (e.g. 6993508780031016960)
        topic_id: String,
        /// Page number, 1-based (default: 1)
        #[arg(long, default_value = "1")]
        page: i32,
        /// Records per page, 1–50 (default: 20)
        #[arg(long, default_value = "20")]
        size: i32,
    },

    /// Post a reply to a community topic
    ///
    /// Body format: plain text only. Rate limit: first 3 replies per topic free,
    /// then incrementally longer waits (4th=3s, 5th=5s, ..., 10th+=55s). Returns 429 when exceeded.
    /// Example: longbridge topic create-reply 6993508780031016960 --body "Great post!"
    /// Example: longbridge topic create-reply 6993508780031016960 --body "Agreed!" --reply-to 7001234567890123456
    CreateReply {
        /// Topic ID to reply to (e.g. 6993508780031016960)
        topic_id: String,
        /// Reply body — plain text only.
        #[arg(long)]
        body: String,
        /// Nest under this reply ID (get IDs from topic-replies). Omit for a top-level reply.
        #[arg(long = "reply-to")]
        reply_to_id: Option<String>,
    },
}
```

- [ ] **Step 2: Add `OptionCmd`, `WarrantCmd`, `KlineCmd`, `CapitalCmd`, `TradingCmd`**

Immediately after the `TopicCmd` block from step 1, add:

```rust
#[derive(Subcommand)]
pub enum OptionCmd {
    /// Real-time quotes for option contracts
    ///
    /// Returns standard quote fields plus implied_volatility, delta, strike_price,
    /// expiry_date, contract_type.
    /// Example: longbridge option quote AAPL240119C190000
    Quote {
        /// Option contract symbols (OCC format for US, e.g. AAPL240119C190000)
        symbols: Vec<String>,
    },

    /// Option chain: expiry dates, or strike prices for a given expiry
    ///
    /// Without --date: returns all available expiry dates.
    /// With --date: returns strike prices and call/put symbols for that expiry.
    /// Example: longbridge option chain AAPL.US
    /// Example: longbridge option chain AAPL.US --date 2024-01-19
    Chain {
        /// Underlying symbol in <CODE>.<MARKET> format, e.g. AAPL.US
        symbol: String,
        /// Expiry date (YYYY-MM-DD). Omit to list all expiry dates.
        #[arg(long)]
        date: Option<String>,
    },
}

#[derive(Subcommand)]
pub enum WarrantCmd {
    /// Real-time quotes for warrant contracts
    ///
    /// Returns: last_done, prev_close, implied_volatility, leverage_ratio, expiry_date, category.
    /// Example: longbridge warrant quote 12345.HK
    Quote {
        /// Warrant symbols (e.g. 12345.HK)
        symbols: Vec<String>,
    },

    /// Warrants linked to an underlying security
    ///
    /// Returns: symbol, name, last_done, leverage_ratio, expiry_date, warrant_type.
    /// Example: longbridge warrant list 700.HK
    List {
        /// Underlying symbol (e.g. 700.HK)
        symbol: String,
    },

    /// Warrant issuer list (HK market)
    ///
    /// Returns: issuer_id, name_en, name_cn.
    Issuers,
}

#[derive(Subcommand)]
pub enum KlineCmd {
    /// Historical OHLCV candlestick data within a date range
    ///
    /// Both --start and --end must be provided together; if either is omitted the
    /// most recent 100 candles are returned (offset-based, ignores the other flag).
    /// Use --session all to include pre/post-market candles (adds a Session column).
    /// Example: longbridge kline history TSLA.US --start 2024-01-01 --end 2024-12-31
    /// Example: longbridge kline history TSLA.US --period 1m --session all --start 2024-01-01 --end 2024-01-02
    History {
        /// Symbol in <CODE>.<MARKET> format
        symbol: String,
        /// Candlestick period: 1m 5m 15m 30m 1h day week month year (default: day)
        #[arg(long, default_value = "day")]
        period: String,
        /// Start date (YYYY-MM-DD). Must be used together with --end.
        #[arg(long)]
        start: Option<String>,
        /// End date (YYYY-MM-DD). Must be used together with --start.
        #[arg(long)]
        end: Option<String>,
        /// Price adjustment: no_adjust (default) | forward_adjust
        #[arg(long, default_value = "no_adjust")]
        adjust: String,
        /// Trade session filter: intraday (default) | all (includes pre/post market)
        #[arg(long, default_value = "intraday")]
        session: String,
    },
}

#[derive(Subcommand)]
pub enum CapitalCmd {
    /// Intraday capital flow time series (large/medium/small money in vs out)
    ///
    /// Returns a time series of inflow values for today's session.
    /// Example: longbridge capital flow TSLA.US
    Flow {
        /// Symbol in <CODE>.<MARKET> format
        symbol: String,
    },

    /// Capital distribution snapshot (large/medium/small inflow and outflow)
    ///
    /// Returns total inflow/outflow broken down by order size for the current session.
    /// Example: longbridge capital dist TSLA.US
    Dist {
        /// Symbol in <CODE>.<MARKET> format
        symbol: String,
    },
}

#[derive(Subcommand)]
pub enum TradingCmd {
    /// Trading session schedule (open/close times) for all markets
    ///
    /// Returns: market, session type (intraday/pre/post/overnight), begin_time, end_time.
    Session,

    /// Trading days and half-trading days for a market
    ///
    /// Defaults to today + 30 days if no dates are provided.
    /// Example: longbridge trading days HK --start 2024-01-01 --end 2024-03-31
    Days {
        /// Market: HK | US | CN (aliases: SH SZ) | SG  (case-insensitive, default: HK)
        #[arg(default_value = "HK")]
        market: String,
        /// Start date (YYYY-MM-DD), defaults to today
        #[arg(long)]
        start: Option<String>,
        /// End date (YYYY-MM-DD), defaults to 30 days after start
        #[arg(long)]
        end: Option<String>,
    },
}
```

---

### Task 2: Replace flat variants in `Commands` enum

**Files:**
- Modify: `longbridge-terminal/src/cli/mod.rs`

- [ ] **Step 1: Replace the News section**

Find and replace this block (lines ~391–412):
```rust
    // ── News ────────────────────────────────────────────────────────────────────
    /// Latest news articles for a symbol
    ///
    /// Returns: id, title, `published_at`, likes, comments.
    /// Example: longbridge news TSLA.US
    /// Example: longbridge news 700.HK --count 5
    News {
        /// Symbol in <CODE>.<MARKET> format, e.g. TSLA.US 700.HK
        symbol: String,
        /// Maximum number of articles to show (default: 20)
        #[arg(long, default_value = "20")]
        count: usize,
    },

    /// Full Markdown content of a news article
    ///
    /// Fetches the article text from <https://longbridge.com/news>/<id>.md
    /// Example: longbridge news-detail 12345678
    NewsDetail {
        /// News article ID (from `longbridge news`)
        id: String,
    },
```

With:
```rust
    // ── News ────────────────────────────────────────────────────────────────────
    /// Latest news articles for a symbol, or fetch full article content
    ///
    /// Without subcommand: lists news articles for a symbol.
    /// Subcommands: detail
    /// Returns: id, title, `published_at`, likes, comments.
    /// Example: longbridge news TSLA.US
    /// Example: longbridge news TSLA.US --count 5
    /// Example: longbridge news detail 12345678
    News {
        /// Symbol in <CODE>.<MARKET> format (e.g. TSLA.US 700.HK). Omit when using a subcommand.
        symbol: Option<String>,
        /// Maximum number of articles to show (default: 20)
        #[arg(long, default_value = "20")]
        count: usize,
        #[command(subcommand)]
        cmd: Option<NewsCmd>,
    },
```

- [ ] **Step 2: Replace the Filings section**

Find and replace (lines ~413–448):
```rust
    /// Regulatory filings and announcements for a symbol
    ///
    /// Returns: id, title, `file_name`, `publish_at`.
    /// Use `filing-detail` to read the full content.
    /// Example: longbridge filings AAPL.US
    /// Example: longbridge filings 700.HK --count 5
    Filings {
        /// Symbol in <CODE>.<MARKET> format, e.g. AAPL.US 700.HK
        symbol: String,
        /// Maximum number of filings to show (default: 20)
        #[arg(long, default_value = "20")]
        count: usize,
    },

    /// Full Markdown content of a regulatory filing (HTML and TXT only)
    ///
    /// Fetches and converts the filing document to Markdown.
    /// Get the symbol and id from `longbridge filings`.
    /// Some filings contain multiple files (e.g. 8-K cover + Exhibit 99.1).
    /// Use --list-files to see all available files, then --file-index N to fetch a specific one.
    /// Example: longbridge filing-detail AAPL.US 580265529766123777
    /// Example: longbridge filing-detail AAPL.US 580265529766123777 --list-files
    /// Example: longbridge filing-detail AAPL.US 580265529766123777 --file-index 1
    FilingDetail {
        /// Symbol in <CODE>.<MARKET> format, e.g. AAPL.US 700.HK
        symbol: String,
        /// Filing ID (from `longbridge filings`)
        id: String,
        /// List all available file URLs without fetching content
        #[arg(long)]
        list_files: bool,
        /// Index of the file to fetch (0-based, default 0)
        #[arg(long, default_value = "0")]
        file_index: usize,
    },
```

With:
```rust
    /// Regulatory filings for a symbol
    ///
    /// Subcommands: list  detail
    /// Example: longbridge filing list AAPL.US
    /// Example: longbridge filing detail AAPL.US 580265529766123777
    Filing {
        #[command(subcommand)]
        cmd: FilingCmd,
    },
```

- [ ] **Step 3: Replace the Topics section**

Find and replace (lines ~450–594):
```rust
    /// Community discussion topics for a symbol
    ///
    /// Returns: id, title, description, url, `published_at`, likes, comments, shares.
    /// Example: longbridge topics TSLA.US
    /// Example: longbridge topics 700.HK --count 5
    Topics {
        /// Symbol in <CODE>.<MARKET> format, e.g. TSLA.US 700.HK
        symbol: String,
        /// Maximum number of topics to show (default: 20)
        #[arg(long, default_value = "20")]
        count: usize,
    },

    /// Get full details of a community topic by its ID
    ...
    TopicDetail {
        ...
    },

    /// Topics created by the authenticated user
    ...
    MyTopics {
        ...
    },

    /// Publish a new community discussion topic
    ...
    CreateTopic {
        ...
    },

    /// List replies for a community topic (paginated)
    ...
    TopicReplies {
        ...
    },

    /// Post a reply to a community topic
    ...
    CreateTopicReply {
        ...
    },
```

With (the entire block from `Topics` through `CreateTopicReply`, inclusive):
```rust
    /// Community discussion topics
    ///
    /// Subcommands: list  detail  mine  create  replies  create-reply
    /// Example: longbridge topic list TSLA.US
    /// Example: longbridge topic detail 6993508780031016960
    /// Example: longbridge topic create --body "Bullish on TSLA today"
    Topic {
        #[command(subcommand)]
        cmd: TopicCmd,
    },
```

- [ ] **Step 4: Replace the Options/Warrants section**

Find and replace (lines ~344–389):
```rust
    // ── Options & Warrants ──────────────────────────────────────────────────────
    /// Real-time quotes for option contracts
    ...
    OptionQuote {
        ...
    },

    /// Option chain: expiry dates, or strike prices for a given expiry
    ...
    OptionChain {
        ...
    },

    /// Real-time quotes for warrant contracts
    ...
    WarrantQuote {
        ...
    },

    /// Warrants linked to an underlying security
    ...
    WarrantList {
        ...
    },

    /// Warrant issuer list (HK market)
    ...
    WarrantIssuers,
```

With:
```rust
    // ── Options & Warrants ──────────────────────────────────────────────────────
    /// Option quotes and option chain
    ///
    /// Subcommands: quote  chain
    /// Example: longbridge option quote AAPL240119C190000
    /// Example: longbridge option chain AAPL.US --date 2024-01-19
    Option {
        #[command(subcommand)]
        cmd: OptionCmd,
    },

    /// Warrant quotes, warrant list, and issuer list
    ///
    /// Subcommands: quote  list  issuers
    /// Example: longbridge warrant quote 12345.HK
    /// Example: longbridge warrant list 700.HK
    Warrant {
        #[command(subcommand)]
        cmd: WarrantCmd,
    },
```

- [ ] **Step 5: Update `Kline` and replace `KlineHistory`**

Find the `Kline` variant and replace it, then remove `KlineHistory`. The current `Kline` block (lines ~166–221):
```rust
    /// OHLCV candlestick (K-line) data
    ///
    /// ...
    Kline {
        /// Symbol in <CODE>.<MARKET> format
        symbol: String,
        #[arg(long, default_value = "day")]
        period: String,
        #[arg(long, default_value = "100")]
        count: usize,
        #[arg(long, default_value = "no_adjust")]
        adjust: String,
        #[arg(long, default_value = "intraday")]
        session: String,
    },

    /// Historical OHLCV candlestick data within a date range
    ///
    /// ...
    KlineHistory {
        symbol: String,
        #[arg(long, default_value = "day")]
        period: String,
        #[arg(long)]
        start: Option<String>,
        #[arg(long)]
        end: Option<String>,
        #[arg(long, default_value = "no_adjust")]
        adjust: String,
        #[arg(long, default_value = "intraday")]
        session: String,
    },
```

Replace with:
```rust
    /// OHLCV candlestick (K-line) data, or historical date-range candlesticks
    ///
    /// Returns: timestamp, open, high, low, close, volume, turnover.
    /// Periods: 1m  5m  15m  30m  1h  day  week  month  year
    ///   (aliases: minute=1m, hour=1h, d/1d=day, w=week, m/1mo=month, y=year)
    /// Use --session all to include pre/post-market candles (adds a Session column).
    /// Use the `history` subcommand to fetch a specific date range.
    /// Example: longbridge kline TSLA.US --period day --count 100
    /// Example: longbridge kline TSLA.US --period 1h --adjust forward_adjust
    /// Example: longbridge kline TSLA.US --period 1m --session all
    /// Example: longbridge kline history TSLA.US --start 2024-01-01 --end 2024-12-31
    Kline {
        /// Symbol in <CODE>.<MARKET> format. Omit when using a subcommand.
        symbol: Option<String>,
        /// Candlestick period: 1m 5m 15m 30m 1h day week month year (default: day)
        /// Aliases: minute=1m, hour=1h, d/1d=day, w=week, m/1mo=month, y=year
        #[arg(long, default_value = "day")]
        period: String,
        /// Number of candles to return (default: 100)
        #[arg(long, default_value = "100")]
        count: usize,
        /// Price adjustment: `no_adjust` (default) | `forward_adjust`
        /// Aliases: none=`no_adjust`, forward=`forward_adjust`
        #[arg(long, default_value = "no_adjust")]
        adjust: String,
        /// Trade session filter: `intraday` (default) | `all` (includes pre/post market)
        #[arg(long, default_value = "intraday")]
        session: String,
        #[command(subcommand)]
        cmd: Option<KlineCmd>,
    },
```

- [ ] **Step 6: Replace `CapitalFlow`/`CapitalDist` with `Capital`**

Find and replace (lines ~258–274):
```rust
    /// Intraday capital flow time series (large/medium/small money in vs out)
    ///
    /// Returns a time series of inflow values for today's session.
    /// Example: longbridge capital-flow TSLA.US
    CapitalFlow {
        /// Symbol in <CODE>.<MARKET> format
        symbol: String,
    },

    /// Capital distribution snapshot (large/medium/small inflow and outflow)
    ///
    /// Returns total inflow/outflow broken down by order size for the current session.
    /// Example: longbridge capital-dist TSLA.US
    CapitalDist {
        /// Symbol in <CODE>.<MARKET> format
        symbol: String,
    },
```

With:
```rust
    /// Intraday capital flow and distribution
    ///
    /// Subcommands: flow  dist
    /// Example: longbridge capital flow TSLA.US
    /// Example: longbridge capital dist TSLA.US
    Capital {
        #[command(subcommand)]
        cmd: CapitalCmd,
    },
```

- [ ] **Step 7: Replace `TradingSession`/`TradingDays` with `Trading`**

Find and replace (lines ~299–318):
```rust
    /// Trading session schedule (open/close times) for all markets
    ///
    /// Returns: market, session type (intraday/pre/post/overnight), `begin_time`, `end_time`.
    TradingSession,

    /// Trading days and half-trading days for a market
    ///
    /// Defaults to today + 30 days if no dates are provided.
    /// Example: longbridge trading-days HK --start 2024-01-01 --end 2024-03-31
    TradingDays {
        /// Market: HK | US | CN (aliases: SH SZ) | SG  (case-insensitive, default: HK)
        #[arg(default_value = "HK")]
        market: String,
        /// Start date (YYYY-MM-DD), defaults to today
        #[arg(long)]
        start: Option<String>,
        /// End date (YYYY-MM-DD), defaults to 30 days after start
        #[arg(long)]
        end: Option<String>,
    },
```

With:
```rust
    /// Trading session schedule and trading calendar
    ///
    /// Subcommands: session  days
    /// Example: longbridge trading session
    /// Example: longbridge trading days HK --start 2024-01-01 --end 2024-03-31
    Trading {
        #[command(subcommand)]
        cmd: TradingCmd,
    },
```

---

### Task 3: Update `dispatch()` match arms

**Files:**
- Modify: `longbridge-terminal/src/cli/mod.rs`

- [ ] **Step 1: Replace old News/Filing/Topics match arms**

Find and remove these arms in `dispatch()`:
```rust
        Commands::News { symbol, count } => news::cmd_news(symbol, count, format).await,
        Commands::NewsDetail { id } => news::cmd_news_detail(id).await,
        Commands::Filings { symbol, count } => news::cmd_filings(symbol, count, format).await,
        Commands::FilingDetail {
            symbol,
            id,
            list_files,
            file_index,
        } => news::cmd_filing_detail(symbol, id, list_files, file_index).await,
        Commands::Topics { symbol, count } => news::cmd_topics(symbol, count, format).await,
        Commands::TopicDetail { id } => topic::cmd_topic_detail_api(id, format).await,
        Commands::MyTopics {
            page,
            size,
            post_type,
        } => topic::cmd_topics_mine(page, size, post_type, format).await,
        Commands::CreateTopic {
            title,
            body,
            post_type,
            tickers,
        } => topic::cmd_create_topic(title, body, post_type, tickers, format).await,
        Commands::TopicReplies {
            topic_id,
            page,
            size,
        } => topic::cmd_topic_replies(topic_id, page, size, format).await,
        Commands::CreateTopicReply {
            topic_id,
            body,
            reply_to_id,
        } => topic::cmd_create_reply(topic_id, body, reply_to_id, format).await,
```

Replace with:
```rust
        Commands::News { symbol, count, cmd } => match cmd {
            Some(NewsCmd::Detail { id }) => news::cmd_news_detail(id).await,
            None => {
                let sym = symbol
                    .ok_or_else(|| anyhow::anyhow!("Symbol required. Usage: longbridge news <SYMBOL>"))?;
                news::cmd_news(sym, count, format).await
            }
        },
        Commands::Filing { cmd } => match cmd {
            FilingCmd::List { symbol, count } => news::cmd_filings(symbol, count, format).await,
            FilingCmd::Detail {
                symbol,
                id,
                list_files,
                file_index,
            } => news::cmd_filing_detail(symbol, id, list_files, file_index).await,
        },
        Commands::Topic { cmd } => match cmd {
            TopicCmd::List { symbol, count } => news::cmd_topics(symbol, count, format).await,
            TopicCmd::Detail { id } => topic::cmd_topic_detail_api(id, format).await,
            TopicCmd::Mine { page, size, post_type } => {
                topic::cmd_topics_mine(page, size, post_type, format).await
            }
            TopicCmd::Create {
                title,
                body,
                post_type,
                tickers,
            } => topic::cmd_create_topic(title, body, post_type, tickers, format).await,
            TopicCmd::Replies { topic_id, page, size } => {
                topic::cmd_topic_replies(topic_id, page, size, format).await
            }
            TopicCmd::CreateReply {
                topic_id,
                body,
                reply_to_id,
            } => topic::cmd_create_reply(topic_id, body, reply_to_id, format).await,
        },
```

- [ ] **Step 2: Replace OptionQuote/OptionChain/Warrant arms**

Find and remove:
```rust
        Commands::OptionQuote { symbols } => quote::cmd_option_quote(symbols, format).await,
        Commands::OptionChain { symbol, date } => {
            quote::cmd_option_chain(symbol, date, format).await
        }
        Commands::WarrantQuote { symbols } => quote::cmd_warrant_quote(symbols, format).await,
        Commands::WarrantList { symbol } => quote::cmd_warrant_list(symbol, format).await,
        Commands::WarrantIssuers => quote::cmd_warrant_issuers(format).await,
```

Replace with:
```rust
        Commands::Option { cmd } => match cmd {
            OptionCmd::Quote { symbols } => quote::cmd_option_quote(symbols, format).await,
            OptionCmd::Chain { symbol, date } => {
                quote::cmd_option_chain(symbol, date, format).await
            }
        },
        Commands::Warrant { cmd } => match cmd {
            WarrantCmd::Quote { symbols } => quote::cmd_warrant_quote(symbols, format).await,
            WarrantCmd::List { symbol } => quote::cmd_warrant_list(symbol, format).await,
            WarrantCmd::Issuers => quote::cmd_warrant_issuers(format).await,
        },
```

- [ ] **Step 3: Update Kline arm and remove KlineHistory arm**

Find and replace the `Commands::Kline` arm:
```rust
        Commands::Kline {
            symbol,
            period,
            count,
            adjust,
            session,
        } => quote::cmd_kline(symbol, &period, count, &adjust, &session, format).await,
        Commands::KlineHistory {
            symbol,
            period,
            start,
            end,
            adjust,
            session,
        } => quote::cmd_kline_history(symbol, &period, start, end, &adjust, &session, format).await,
```

Replace with:
```rust
        Commands::Kline {
            symbol,
            period,
            count,
            adjust,
            session,
            cmd,
        } => match cmd {
            Some(KlineCmd::History {
                symbol: h_symbol,
                period: h_period,
                start,
                end,
                adjust: h_adjust,
                session: h_session,
            }) => {
                quote::cmd_kline_history(h_symbol, &h_period, start, end, &h_adjust, &h_session, format)
                    .await
            }
            None => {
                let sym = symbol
                    .ok_or_else(|| anyhow::anyhow!("Symbol required. Usage: longbridge kline <SYMBOL>"))?;
                quote::cmd_kline(sym, &period, count, &adjust, &session, format).await
            }
        },
```

- [ ] **Step 4: Replace CapitalFlow/CapitalDist and TradingSession/TradingDays arms**

Find and remove:
```rust
        Commands::CapitalFlow { symbol } => quote::cmd_capital_flow(symbol, format).await,
        Commands::CapitalDist { symbol } => quote::cmd_capital_dist(symbol, format).await,
```

Replace with:
```rust
        Commands::Capital { cmd } => match cmd {
            CapitalCmd::Flow { symbol } => quote::cmd_capital_flow(symbol, format).await,
            CapitalCmd::Dist { symbol } => quote::cmd_capital_dist(symbol, format).await,
        },
```

Find and remove:
```rust
        Commands::TradingSession => quote::cmd_trading_session(format).await,
        Commands::TradingDays { market, start, end } => {
            quote::cmd_trading_days(&market, start, end, format).await
        }
```

Replace with:
```rust
        Commands::Trading { cmd } => match cmd {
            TradingCmd::Session => quote::cmd_trading_session(format).await,
            TradingCmd::Days { market, start, end } => {
                quote::cmd_trading_days(&market, start, end, format).await
            }
        },
```

---

### Task 4: Update tests in `src/cli/mod.rs`

**Files:**
- Modify: `longbridge-terminal/src/cli/mod.rs`

The tests section starts around line 1166. Update all tests that reference removed variants.

- [ ] **Step 1: Update `test_kline_defaults` and `test_kline_custom_period`**

`symbol` is now `Option<String>`. Find and update `test_kline_defaults`:
```rust
    #[test]
    fn test_kline_defaults() {
        let cli = parse(&["longbridge", "kline", "TSLA.US"]).unwrap();
        if let Some(Commands::Kline {
            symbol,
            period,
            count,
            adjust,
            ..
        }) = cli.command
        {
            assert_eq!(symbol, Some("TSLA.US".to_string()));
            assert_eq!(period, "day");
            assert_eq!(count, 100);
            assert_eq!(adjust, "no_adjust");
        } else {
            panic!("expected Kline command");
        }
    }
```

Find and update `test_kline_custom_period` — change `symbol` assertion if present, otherwise just update the expected `period` and `count` (no symbol assertion needed, only `..` used).

- [ ] **Step 2: Update `test_kline_history_with_dates`**

Replace:
```rust
    #[test]
    fn test_kline_history_with_dates() {
        let cli = parse(&[
            "longbridge",
            "kline-history",
            "TSLA.US",
            "--start",
            "2024-01-01",
            "--end",
            "2024-12-31",
        ])
        .unwrap();
        if let Some(Commands::KlineHistory {
            symbol, start, end, ..
        }) = cli.command
        {
            assert_eq!(symbol, "TSLA.US");
            assert_eq!(start, Some("2024-01-01".to_string()));
            assert_eq!(end, Some("2024-12-31".to_string()));
        } else {
            panic!("expected KlineHistory command");
        }
    }
```

With:
```rust
    #[test]
    fn test_kline_history_with_dates() {
        let cli = parse(&[
            "longbridge",
            "kline",
            "history",
            "TSLA.US",
            "--start",
            "2024-01-01",
            "--end",
            "2024-12-31",
        ])
        .unwrap();
        if let Some(Commands::Kline {
            cmd: Some(KlineCmd::History { symbol, start, end, .. }),
            ..
        }) = cli.command
        {
            assert_eq!(symbol, "TSLA.US");
            assert_eq!(start, Some("2024-01-01".to_string()));
            assert_eq!(end, Some("2024-12-31".to_string()));
        } else {
            panic!("expected Kline History command");
        }
    }
```

- [ ] **Step 3: Update `test_capital_flow_subcommand` and `test_capital_dist_subcommand`**

Replace:
```rust
    #[test]
    fn test_capital_flow_subcommand() {
        let cli = parse(&["longbridge", "capital-flow", "TSLA.US"]).unwrap();
        assert!(
            matches!(cli.command, Some(Commands::CapitalFlow { symbol }) if symbol == "TSLA.US")
        );
    }

    #[test]
    fn test_capital_dist_subcommand() {
        let cli = parse(&["longbridge", "capital-dist", "TSLA.US"]).unwrap();
        assert!(
            matches!(cli.command, Some(Commands::CapitalDist { symbol }) if symbol == "TSLA.US")
        );
    }
```

With:
```rust
    #[test]
    fn test_capital_flow_subcommand() {
        let cli = parse(&["longbridge", "capital", "flow", "TSLA.US"]).unwrap();
        assert!(
            matches!(cli.command, Some(Commands::Capital { cmd: CapitalCmd::Flow { symbol } }) if symbol == "TSLA.US")
        );
    }

    #[test]
    fn test_capital_dist_subcommand() {
        let cli = parse(&["longbridge", "capital", "dist", "TSLA.US"]).unwrap();
        assert!(
            matches!(cli.command, Some(Commands::Capital { cmd: CapitalCmd::Dist { symbol } }) if symbol == "TSLA.US")
        );
    }
```

- [ ] **Step 4: Update `test_trading_session_subcommand` and `test_trading_days_default_market`**

Replace:
```rust
    #[test]
    fn test_trading_session_subcommand() {
        let cli = parse(&["longbridge", "trading-session"]).unwrap();
        assert!(matches!(cli.command, Some(Commands::TradingSession)));
    }

    #[test]
    fn test_trading_days_default_market() {
        let cli = parse(&["longbridge", "trading-days"]).unwrap();
        if let Some(Commands::TradingDays { market, .. }) = cli.command {
            assert_eq!(market, "HK");
        } else {
            panic!("expected TradingDays command");
        }
    }
```

With:
```rust
    #[test]
    fn test_trading_session_subcommand() {
        let cli = parse(&["longbridge", "trading", "session"]).unwrap();
        assert!(matches!(
            cli.command,
            Some(Commands::Trading {
                cmd: TradingCmd::Session
            })
        ));
    }

    #[test]
    fn test_trading_days_default_market() {
        let cli = parse(&["longbridge", "trading", "days"]).unwrap();
        if let Some(Commands::Trading {
            cmd: TradingCmd::Days { market, .. },
        }) = cli.command
        {
            assert_eq!(market, "HK");
        } else {
            panic!("expected Trading Days command");
        }
    }
```

- [ ] **Step 5: Update option/warrant tests**

Replace:
```rust
    #[test]
    fn test_option_quote_subcommand() {
        let cli = parse(&["longbridge", "option-quote", "AAPL240119C190000"]).unwrap();
        if let Some(Commands::OptionQuote { symbols }) = cli.command {
            assert_eq!(symbols, vec!["AAPL240119C190000"]);
        } else {
            panic!("expected OptionQuote command");
        }
    }

    #[test]
    fn test_option_chain_no_date() {
        let cli = parse(&["longbridge", "option-chain", "AAPL.US"]).unwrap();
        if let Some(Commands::OptionChain { symbol, date }) = cli.command {
            assert_eq!(symbol, "AAPL.US");
            assert!(date.is_none());
        } else {
            panic!("expected OptionChain command");
        }
    }

    #[test]
    fn test_option_chain_with_date() {
        let cli = parse(&[
            "longbridge",
            "option-chain",
            "AAPL.US",
            "--date",
            "2024-01-19",
        ])
        .unwrap();
        if let Some(Commands::OptionChain { date, .. }) = cli.command {
            assert_eq!(date, Some("2024-01-19".to_string()));
        } else {
            panic!("expected OptionChain command");
        }
    }

    #[test]
    fn test_warrant_quote_subcommand() {
        let cli = parse(&["longbridge", "warrant-quote", "12345.HK"]).unwrap();
        if let Some(Commands::WarrantQuote { symbols }) = cli.command {
            assert_eq!(symbols, vec!["12345.HK"]);
        } else {
            panic!("expected WarrantQuote command");
        }
    }

    #[test]
    fn test_warrant_list_subcommand() {
        let cli = parse(&["longbridge", "warrant-list", "700.HK"]).unwrap();
        assert!(
            matches!(cli.command, Some(Commands::WarrantList { symbol }) if symbol == "700.HK")
        );
    }

    #[test]
    fn test_warrant_issuers_subcommand() {
        let cli = parse(&["longbridge", "warrant-issuers"]).unwrap();
        assert!(matches!(cli.command, Some(Commands::WarrantIssuers)));
    }
```

With:
```rust
    #[test]
    fn test_option_quote_subcommand() {
        let cli = parse(&["longbridge", "option", "quote", "AAPL240119C190000"]).unwrap();
        if let Some(Commands::Option {
            cmd: OptionCmd::Quote { symbols },
        }) = cli.command
        {
            assert_eq!(symbols, vec!["AAPL240119C190000"]);
        } else {
            panic!("expected Option Quote command");
        }
    }

    #[test]
    fn test_option_chain_no_date() {
        let cli = parse(&["longbridge", "option", "chain", "AAPL.US"]).unwrap();
        if let Some(Commands::Option {
            cmd: OptionCmd::Chain { symbol, date },
        }) = cli.command
        {
            assert_eq!(symbol, "AAPL.US");
            assert!(date.is_none());
        } else {
            panic!("expected Option Chain command");
        }
    }

    #[test]
    fn test_option_chain_with_date() {
        let cli = parse(&[
            "longbridge",
            "option",
            "chain",
            "AAPL.US",
            "--date",
            "2024-01-19",
        ])
        .unwrap();
        if let Some(Commands::Option {
            cmd: OptionCmd::Chain { date, .. },
        }) = cli.command
        {
            assert_eq!(date, Some("2024-01-19".to_string()));
        } else {
            panic!("expected Option Chain command");
        }
    }

    #[test]
    fn test_warrant_quote_subcommand() {
        let cli = parse(&["longbridge", "warrant", "quote", "12345.HK"]).unwrap();
        if let Some(Commands::Warrant {
            cmd: WarrantCmd::Quote { symbols },
        }) = cli.command
        {
            assert_eq!(symbols, vec!["12345.HK"]);
        } else {
            panic!("expected Warrant Quote command");
        }
    }

    #[test]
    fn test_warrant_list_subcommand() {
        let cli = parse(&["longbridge", "warrant", "list", "700.HK"]).unwrap();
        assert!(
            matches!(cli.command, Some(Commands::Warrant { cmd: WarrantCmd::List { symbol } }) if symbol == "700.HK")
        );
    }

    #[test]
    fn test_warrant_issuers_subcommand() {
        let cli = parse(&["longbridge", "warrant", "issuers"]).unwrap();
        assert!(matches!(
            cli.command,
            Some(Commands::Warrant {
                cmd: WarrantCmd::Issuers
            })
        ));
    }
```

---

### Task 5: Build, lint, commit longbridge-terminal code

**Files:**
- `longbridge-terminal/src/cli/mod.rs` (all changes from Tasks 1–4)

- [ ] **Step 1: Run `cargo fmt`**

```bash
cd longbridge-terminal && cargo fmt
```

Expected: exits 0, reformats the file.

- [ ] **Step 2: Run `cargo clippy`**

```bash
cargo clippy
```

Fix any warnings (unused imports, unreachable patterns, etc.). Common issues:
- If clippy warns about `Commands::Option` shadowing `std::option::Option`, add `#[allow(clippy::upper_case_acronyms)]` or rename to `OptionGroup` and update the test accordingly. In that case, CLI command becomes `option-group` — use `#[command(name = "option")]` to override: `#[command(name = "option")] OptionGroup { ... }`.
- If there are unused enum variants, ensure they are all covered in `dispatch()`.

- [ ] **Step 3: Run `cargo build`**

```bash
cargo build
```

Expected: compiles without errors. If tests fail to compile, the changes in Tasks 1–4 are missing something — re-check the dispatch() arms and test patterns.

- [ ] **Step 4: Commit**

```bash
cd longbridge-terminal
git add src/cli/mod.rs
git commit -m "cli: restructure commands into domain groups

Replace 19 flat top-level commands with 8 domain groups:
- news detail (was news-detail)
- filing list / filing detail (was filings / filing-detail)
- topic list/detail/mine/create/replies/create-reply (was topics/topic-detail/my-topics/create-topic/topic-replies/create-topic-reply)
- option quote / option chain (was option-quote / option-chain)
- warrant quote/list/issuers (was warrant-quote/warrant-list/warrant-issuers)
- kline history (was kline-history subcommand of kline)
- capital flow / capital dist (was capital-flow / capital-dist)
- trading session / trading days (was trading-session / trading-days)"
```

---

### Task 6: Update `README.md` and `docs/cli-design.md`

**Files:**
- Modify: `longbridge-terminal/README.md`
- Modify: `longbridge-terminal/docs/cli-design.md`

- [ ] **Step 1: Update README.md command block**

Find the `<!-- COMMANDS_START -->` / `<!-- COMMANDS_END -->` block. Replace all occurrences of old commands with new ones:

| Find | Replace |
|---|---|
| `longbridge news-detail <id>` | `longbridge news detail <id>` |
| `longbridge filings <symbol>` | `longbridge filing list <symbol>` |
| `longbridge filing-detail <symbol> <id>` | `longbridge filing detail <symbol> <id>` |
| `longbridge topics <symbol>` | `longbridge topic list <symbol>` |
| `longbridge topic-detail <id>` | `longbridge topic detail <id>` |
| `longbridge my-topics` | `longbridge topic mine` |
| `longbridge create-topic` | `longbridge topic create` |
| `longbridge topic-replies <id>` | `longbridge topic replies <id>` |
| `longbridge create-topic-reply <id>` | `longbridge topic create-reply <id>` |
| `longbridge option-quote <symbols>` | `longbridge option quote <symbols>` |
| `longbridge option-chain <symbol>` | `longbridge option chain <symbol>` |
| `longbridge warrant-quote <symbols>` | `longbridge warrant quote <symbols>` |
| `longbridge warrant-list <symbol>` | `longbridge warrant list <symbol>` |
| `longbridge warrant-issuers` | `longbridge warrant issuers` |
| `longbridge kline-history <symbol>` | `longbridge kline history <symbol>` |
| `longbridge capital-flow <symbol>` | `longbridge capital flow <symbol>` |
| `longbridge capital-dist <symbol>` | `longbridge capital dist <symbol>` |
| `longbridge trading-session` | `longbridge trading session` |
| `longbridge trading-days <market>` | `longbridge trading days <market>` |

- [ ] **Step 2: Update `docs/cli-design.md`**

Apply the same substitutions to the command structure section in `docs/cli-design.md`.

- [ ] **Step 3: Commit**

```bash
git add README.md docs/cli-design.md
git commit -m "docs: update command names in README and cli-design"
```

---

## PR 2: developers repo

### Task 7: Update `openapi.yaml`

**Files:**
- Modify: `developers/openapi.yaml`

- [ ] **Step 1: Find all 14 old CLI examples and update them**

Run this to confirm locations:
```bash
grep -n "longbridge create-topic\|longbridge my-topics\|longbridge topic-detail\|longbridge topic-replies\|longbridge filings " openapi.yaml
```

Expected output shows 14 lines across `create-topic` (4), `my-topics` (4), `topic-detail` (1), `topic-replies` (2), and `filings` (1 or more, check `filings <SYMBOL>` pattern).

Apply substitutions:
- `longbridge filings <SYMBOL>` → `longbridge filing list <SYMBOL>`
- `longbridge my-topics` → `longbridge topic mine`
- `longbridge my-topics --type article` → `longbridge topic mine --type article`
- `longbridge my-topics --type post --size 10 --page 2` → `longbridge topic mine --type post --size 10 --page 2`
- `longbridge my-topics --format json` → `longbridge topic mine --format json`
- `longbridge create-topic --body "Bullish on 700.HK today"` → `longbridge topic create --body "Bullish on 700.HK today"`
- `longbridge create-topic --body "NVDA GTC highlights" --tickers NVDA.US,700.HK` → `longbridge topic create --body "NVDA GTC highlights" --tickers NVDA.US,700.HK`
- `longbridge create-topic --title "My Analysis" --body ...` → `longbridge topic create --title "My Analysis" --body ...`
- `longbridge create-topic --title "Q4 Preview" --body ...` → `longbridge topic create --title "Q4 Preview" --body ...`
- `longbridge topic-detail 6993508780031016960` → `longbridge topic detail 6993508780031016960`
- `longbridge create-topic-reply 6993508780031016960 --body "Great post!"` → `longbridge topic create-reply 6993508780031016960 --body "Great post!"`
- `longbridge create-topic-reply 6993508780031016960 --body "Agreed!" --reply-to ...` → `longbridge topic create-reply 6993508780031016960 --body "Agreed!" --reply-to ...`

Also check and update if present (run grep to confirm):
```bash
grep -n "longbridge news-detail\|longbridge kline-history\|longbridge capital-flow\|longbridge capital-dist\|longbridge trading-session\|longbridge trading-days\|longbridge option-quote\|longbridge option-chain\|longbridge warrant-quote\|longbridge warrant-list\|longbridge warrant-issuers\|longbridge filing-detail\|longbridge topic-replies" openapi.yaml
```

- [ ] **Step 2: Verify no old names remain**

```bash
grep -c "longbridge news-detail\|longbridge create-topic\|longbridge topic-detail\|longbridge topic-replies\|longbridge my-topics\|longbridge filing-detail\|longbridge filings \|longbridge option-quote\|longbridge option-chain\|longbridge warrant-quote\|longbridge warrant-list\|longbridge warrant-issuers\|longbridge kline-history\|longbridge capital-flow\|longbridge capital-dist\|longbridge trading-session\|longbridge trading-days\|longbridge create-topic-reply" openapi.yaml
```

Expected: `0`

---

### Task 8: Update skill files

**Files:**
- Modify: `developers/skills/longbridge/references/cli/overview.md`
- Modify: `developers/skills/longbridge/SKILL.md`

- [ ] **Step 1: Update `references/cli/overview.md`**

Read the file and apply the command substitution table from Task 6 Step 1. Key patterns to check:
- `filings TSLA.US` → `filing list TSLA.US`
- `filing-detail TSLA.US <id>` → `filing detail TSLA.US <id>`
- `kline-history` → `kline history`

The `overview.md` intentionally defers to `--help` for details — keep it high-level. Update only actual command name references, not conceptual descriptions.

- [ ] **Step 2: Update `SKILL.md`**

Read the file and apply the same substitutions where CLI commands are mentioned.

- [ ] **Step 3: Commit skill changes (hold for Task 9)**

---

### Task 9: Update developers docs

**Files:**
- Modify: `developers/docs/en/docs/cli.md`
- Modify: `developers/docs/zh-CN/docs/cli.md`
- Modify: `developers/docs/zh-HK/docs/cli.md`
- Modify: Multiple `developers/docs/{en,zh-CN,zh-HK}/docs/quote/pull/*.md`
- Modify: Multiple `developers/docs/{en,zh-CN,zh-HK}/docs/content/*.md`

- [ ] **Step 1: Find all affected docs files**

```bash
cd developers
grep -rl "news-detail\|create-topic\|topic-detail\|topic-replies\|my-topics\|filing-detail\|filings \|option-quote\|option-chain\|warrant-quote\|warrant-list\|warrant-issuers\|kline-history\|capital-flow\|capital-dist\|trading-session\|trading-days\|create-topic-reply" docs/en docs/zh-CN docs/zh-HK --include="*.md" | grep -v ".vitepress/dist"
```

- [ ] **Step 2: Update each file**

For each file returned, apply the substitutions from the table in Task 6 Step 1. These are `CliCommand` blocks; only the command strings inside them need updating. The surrounding prose/descriptions remain unchanged.

Key files known to contain old commands:
- `docs/{en,zh-CN,zh-HK}/docs/cli.md` — main CLI reference page
- `docs/{en,zh-CN,zh-HK}/docs/quote/pull/filings.md` — `longbridge filings`
- `docs/{en,zh-CN,zh-HK}/docs/quote/pull/candlestick.md` — `longbridge kline-history`
- `docs/{en,zh-CN,zh-HK}/docs/quote/pull/option-quote.md` — `longbridge option-quote`
- `docs/{en,zh-CN,zh-HK}/docs/quote/pull/capital-flow-intraday.md` — `longbridge capital-flow`
- `docs/{en,zh-CN,zh-HK}/docs/quote/pull/capital-distribution.md` — `longbridge capital-dist`
- `docs/{en,zh-CN,zh-HK}/docs/quote/pull/trade-session.md` — `longbridge trading-session`
- `docs/{en,zh-CN,zh-HK}/docs/quote/pull/warrant-quote.md` — `longbridge warrant-quote`
- `docs/{en,zh-CN,zh-HK}/docs/quote/pull/history-candlestick.md` — `longbridge kline-history`
- `docs/{en,zh-CN,zh-HK}/docs/content/topic_detail.md` — `longbridge topic-detail`
- `docs/{en,zh-CN,zh-HK}/docs/content/create_topic.md` — `longbridge create-topic`
- `docs/{en,zh-CN,zh-HK}/docs/content/create_topic_reply.md` — `longbridge create-topic-reply`
- `docs/{en,zh-CN,zh-HK}/docs/content/topic_replies.md` — `longbridge topic-replies`
- `docs/{en,zh-CN,zh-HK}/docs/content/my_topics.md` — `longbridge my-topics`

- [ ] **Step 3: Verify no old names remain**

```bash
grep -rl "longbridge news-detail\|longbridge create-topic\|longbridge topic-detail \|longbridge topic-replies \|longbridge my-topics\|longbridge filing-detail\|longbridge filings \|longbridge option-quote\|longbridge option-chain\|longbridge warrant-quote\|longbridge warrant-list\|longbridge warrant-issuers\|longbridge kline-history\|longbridge capital-flow\|longbridge capital-dist\|longbridge trading-session\|longbridge trading-days\|longbridge create-topic-reply" docs/en docs/zh-CN docs/zh-HK --include="*.md" | grep -v ".vitepress/dist"
```

Expected: no output (all files updated).

- [ ] **Step 4: Commit**

```bash
cd developers
git add openapi.yaml skills/longbridge/ docs/en docs/zh-CN docs/zh-HK
git commit -m "cli: update docs to reflect domain-grouped command names"
```

---

## Self-Review

**Spec coverage:**
- ✅ All 19 flat commands replaced with grouped equivalents
- ✅ `news TSLA.US` (no subcommand) preserved via `Option<String>` symbol + `Option<NewsCmd>`
- ✅ `kline TSLA.US` (no subcommand) preserved via `Option<String>` symbol + `Option<KlineCmd>`
- ✅ No changes to `news.rs`, `topic.rs`, or other implementation files
- ✅ Two-PR delivery structure: longbridge-terminal + developers
- ✅ All sync files covered: openapi.yaml, skills/, docs/ (×3 locales)
- ✅ Existing tests updated (13 tests affected)

**Placeholder scan:** No TBD/TODO/placeholder items. All code is complete.

**Type consistency:**
- `FilingCmd::Detail` fields match `news::cmd_filing_detail` signature: `(symbol: String, id: String, list_files: bool, file_index: usize)`
- `TopicCmd::CreateReply` field `reply_to_id: Option<String>` matches `topic::cmd_create_reply` signature
- `KlineCmd::History` fields match `quote::cmd_kline_history` signature
- `Commands::Kline { symbol: Option<String>, ... }` — dispatch uses `.ok_or_else(...)` to convert to required String
- `Commands::News { symbol: Option<String>, ... }` — dispatch uses `.ok_or_else(...)` to convert to required String
