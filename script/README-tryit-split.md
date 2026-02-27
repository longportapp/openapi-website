# Try-It API Split

Based on the existing `?mode=try-it` mechanism, this script splits documented HTTP APIs into per-locale JSON specs.

## Run

```bash
bun run split:tryit-apis
```

## Output

Generated files:

- `openapi/tryit/apis.en.json`
- `openapi/tryit/apis.zh-CN.json`
- `openapi/tryit/apis.zh-HK.json`
- `openapi/tryit/apis.all.json`

Each record includes:

- `title`
- `method`
- `path`
- `source` (doc file path)
- `params` (parsed from Parameters table)

## Purpose

- Make each API an explicit unit from existing Try-It docs
- Provide machine-readable inputs for:
  - API validation pipeline
  - future per-API Try-It rendering refactor
  - parity checks across locales
