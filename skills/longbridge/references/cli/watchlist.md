# CLI Watchlist Commands

Manage watchlist groups and the securities within them.

## watchlist

List all watchlist groups and their contents.

```bash
longbridge watchlist [--format json]
```

**Output:** group `id`, `name`, and list of securities.

---

## watchlist create

Create a new watchlist group.

```bash
longbridge watchlist create "GROUP_NAME" [SYMBOL1 SYMBOL2 ...] [--format json]
```

```bash
longbridge watchlist create "Tech Stocks"
longbridge watchlist create "My Portfolio" TSLA.US AAPL.US NVDA.US 700.HK
```

Returns the new group `id`.

---

## watchlist update

Add or remove securities from an existing group.

```bash
longbridge watchlist update GROUP_ID [--add SYM1 SYM2 ...] [--remove SYM1 SYM2 ...] [--name "NEW_NAME"] [--format json]
```

```bash
longbridge watchlist update 12345 --add MSFT.US GOOGL.US
longbridge watchlist update 12345 --remove AAPL.US
longbridge watchlist update 12345 --add AMZN.US --remove META.US
longbridge watchlist update 12345 --name "Big Tech"
```

---

## watchlist delete

Delete a watchlist group.

```bash
longbridge watchlist delete GROUP_ID [--purge] [--format json]
```

- `--purge` also removes all securities from the group before deleting

```bash
longbridge watchlist delete 12345
longbridge watchlist delete 12345 --purge
```
