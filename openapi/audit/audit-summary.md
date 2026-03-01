# OAuth2 & API Docs Audit Summary

- Documented unique HTTP APIs: **22**
- Locale parity gaps: **0**

## Deployment checks

| Check | Status | API Code | Message |
| --- | --- | --- | --- |
| oauth discovery(prod) | `200` | `None` |  |
| oauth discovery(test) | `200` | `None` |  |
| health test(prod) | `200` | `0` | success |
| health test(test) | `200` | `0` | success |
| auth required sample(no token) | `401` | `401001` | token empty |

## Locale parity

No locale gaps found for documented HTTP APIs.
