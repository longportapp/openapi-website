---
title: `GET/POST/PUT/DELETE` Watchlist Groups
id: v1-watchlist-groups
slug: /api/v1/watchlist/groups
sidebar_position: 1
---

## Overview

This page documents the HTTP endpoint path used by the SDK for this API.

- **Path:** `/v1/watchlist/groups`
- **Method(s):** `GET / POST / PUT / DELETE`
- **Base URL:** `https://openapi.longportapp.com` (or `https://openapi.longportapp.cn`)

## Authentication

Use OAuth 2.0 Bearer token (recommended):

- Header: `Authorization: Bearer ACCESS_TOKEN`

API-key signature flow can remain as fallback for legacy integrations, but OAuth 2.0 is the default.

## Request

### HTTP Information

- **HTTP URL:** `/v1/watchlist/groups`
- **HTTP Method(s):** `GET / POST / PUT / DELETE`
- **Content-Type:** `application/json` (for POST/PUT request body)

### Parameters

Parameter details (query/body fields and constraints) should be defined per endpoint business spec.

Current source mapping for this endpoint comes from SDK request definitions in `longportapp/openapi`.

## Examples

### GET Example

```bash
curl -X GET "https://openapi.longportapp.com/v1/watchlist/groups" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

### POST Example

```bash
curl -X POST "https://openapi.longportapp.com/v1/watchlist/groups" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### PUT Example

```bash
curl -X PUT "https://openapi.longportapp.com/v1/watchlist/groups" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### DELETE Example

```bash
curl -X DELETE "https://openapi.longportapp.com/v1/watchlist/groups" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

## Response

### Standard Envelope

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

### Common Error Shape

```json
{
  "code": 400000,
  "message": "error message",
  "data": null
}
```

## SDK Source Mapping

- Repository: <https://github.com/longportapp/openapi/tree/main/rust/src>
- Path mapping is extracted from SDK HTTP client calls.

> Next step: enrich each endpoint with concrete parameter tables and real response examples from runtime validation.
