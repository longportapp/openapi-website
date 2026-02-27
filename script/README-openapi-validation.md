# OpenAPI-driven API Validation

This project now supports an **OpenAPI-first validation flow** for HTTP API docs.

## Files

- OpenAPI baseline spec: `openapi/openapi.baseline.json`
- Case generator: `script/generate-cases-from-openapi.mjs`
- Runtime validator: `script/validate-http-apis.mjs`

## Workflow

1) Update OpenAPI spec with documented endpoints

```bash
# edit openapi/openapi.baseline.json
```

2) Generate validation cases from OpenAPI

```bash
npm run generate:api-cases
```

3) Run API validation against real environment (`openapi.longbridge.xyz` by default)

```bash
npm run validate:apis
```

## Rule

For every API doc you add/update:
- Add/adjust corresponding OpenAPI operation
- Keep `x-validation` expectations updated
- Run generation + validation
- Attach validation output in PR
