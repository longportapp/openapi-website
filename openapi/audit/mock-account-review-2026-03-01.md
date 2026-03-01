# API Review Progress (Mock Account)

This record tracks endpoint-by-endpoint verification against runtime behavior for doc accuracy updates.

## Verified with OAuth2 Bearer token

### Success responses verified
- `GET /v1/quote/market_temperature?market=US` -> `200`, `code=0`, data includes `temperature`, `description`, `valuation`, `sentiment`, `updated_at`
- `GET /v1/quote/history_market_temperature?market=US` -> `200`, `code=0`, data includes `list`, `type`
- `GET /v1/quote/get_security_list?market=US&category=Overnight` -> `200`, `code=0`, data includes `list[]`
- `GET /v1/watchlist/groups` -> `200`, `code=0`, data includes `groups[]`

### Account-dependent failures observed (need account permissions/data)
- `GET /v1/asset/account` -> `400`, `code=202201`, `message=获取用户信息失败`
- `GET /v1/asset/fund` -> `400`, `code=202201`, `message=获取用户信息失败`
- `GET /v1/asset/stock` -> `500`, `code=500`, `message=internal server error`
- `GET /v1/asset/cashflow` -> `400`, `code=202201`, `message=获取用户信息失败`

## Scope of next patch
- Compare verified runtime fields vs docs for quote/watchlist pages (en/zh-CN/zh-HK)
- Correct mismatched response fields/examples
- Keep original doc layout unchanged
