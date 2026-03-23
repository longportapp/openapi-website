# CLI Content Commands

News, regulatory filings, earnings reports, and community topics.

## news

Latest news articles for a security.

```bash
longbridge news SYMBOL [--count N] [--format json]
```

**Output fields:** `id`, `headline`, `source`, `published_at`, `url`

```bash
longbridge news TSLA.US
longbridge news AAPL.US --count 20 --format json
```

---

## news-detail

Full article content for a specific news item.

```bash
longbridge news-detail NEWS_ID [--format json]
```

Use the `id` from `longbridge news` output.

```bash
longbridge news-detail 1234567890
```

---

## filings

Regulatory filings and company announcements for a security.

Includes: SEC filings (10-K, 10-Q, 8-K), HK exchange announcements, earnings releases, proxy statements, prospectuses, and more.

```bash
longbridge filings SYMBOL [--count N] [--format json]
```

**Output fields:** `id`, `type` (e.g. `10-K`, `8-K`, `ANNOUNCEMENT`), `title`, `date`, `file_count`

```bash
longbridge filings AAPL.US
longbridge filings TSLA.US --count 20 --format json
```

---

## filing-detail

Full Markdown content of a specific filing.

Multi-file filings (e.g. 8-K with exhibits) use `--file-index` to select a specific file.

```bash
longbridge filing-detail SYMBOL FILING_ID [--file-index N] [--list-files] [--format json]
```

- Default: `--file-index 0` (main filing document)
- `--list-files` lists all files in the filing without downloading content

```bash
# Get main document of a filing
longbridge filing-detail TSLA.US 610186794100660481

# Get Exhibit 99.1 of an 8-K (typical earnings release attachment)
longbridge filing-detail NVDA.US 620129220687041793 --file-index 1

# List all files in a multi-file filing
longbridge filing-detail AAPL.US 598741234567890123 --list-files
```

### Earnings analysis workflow

```bash
# Step 1: Find recent filings (look for 10-K or 8-K types)
longbridge filings TSLA.US --format json | jq '.[] | select(.type == "10-K" or .type == "8-K")'

# Step 2: Compare Q4 earnings across companies (run in parallel)
TSLA_ID=610186794100660481
NVDA_ID=620129220687041793
longbridge filing-detail TSLA.US $TSLA_ID & \
longbridge filing-detail NVDA.US $NVDA_ID --file-index 1 & \
wait
# AI receives full Markdown text of both filings for analysis
```

---

## topics

Community discussion topics for a security.

```bash
longbridge topics SYMBOL [--count N] [--format json]
```

**Output fields:** `id`, `title`, `content_preview`, `created_at`, `likes`, `comments`

```bash
longbridge topics TSLA.US
longbridge topics 700.HK --count 10
```

---

## topic-detail

Full content of a community topic.

```bash
longbridge topic-detail TOPIC_ID [--format json]
```

```bash
longbridge topic-detail 9876543210
```
