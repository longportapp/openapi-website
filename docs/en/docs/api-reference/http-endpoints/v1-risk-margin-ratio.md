---
title: `GET` Risk Margin Ratio
id: v1-risk-margin-ratio
slug: /api/v1/risk/margin-ratio
sidebar_position: 15
---

## Overview

This page documents the HTTP endpoint path used by the SDK for this API.

- **Path:** `/v1/risk/margin-ratio`
- **Method(s):** `GET`
- **Base URL:** `https://openapi.longportapp.com` (or `https://openapi.longportapp.cn`)

## Authentication

Use OAuth 2.0 Bearer token (recommended):

- Header: `Authorization: Bearer ACCESS_TOKEN`

API-key signature flow can remain as fallback for legacy integrations, but OAuth 2.0 is the default.

## Request

### HTTP Information

- **HTTP URL:** `/v1/risk/margin-ratio`
- **HTTP Method(s):** `GET`
- **Content-Type:** `application/json` (for POST/PUT request body)

### Parameters

Parameter details (query/body fields and constraints) should be defined per endpoint business spec.

Current source mapping for this endpoint comes from SDK request definitions in `longportapp/openapi`.

## Examples

### GET Example

```bash
curl -X GET "https://openapi.longportapp.com/v1/risk/margin-ratio" \
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
