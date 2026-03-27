# WS API Reference 重组设计文档

**日期：** 2026-03-27
**状态：** 已批准

---

## 背景

当前 API Reference 仅包含 HTTP API（由 `openapi.yaml` 渲染的单页）。WS 相关技术文档散落在：

- `docs/en/docs/socket/` — WS 协议底层细节（握手、数据包解析等）
- `docs/en/docs/quote/pull|push|subscribe/` — WS Quote 命令（各命令一个 md）
- `docs/en/docs/trade/trade-push.md` — WS Trade 订阅

这些内容属于深度技术参考文档，不适合放在面向业务场景的 Docs 区，应迁移至 API Reference。

---

## 目标

1. 将 `docs/socket/` 下的内容迁移至 API Reference WS 区
2. 将 `docs/quote/pull|push|subscribe/` 和 `docs/trade/trade-push.md` 迁移至 API Reference WS 区
3. 新建 `docs/api/ws/` 作为 WS API Reference 区域，与现有 HTTP API Reference 同级
4. 三语言（en、zh-CN、zh-HK）同步更新

---

## 目录结构

### 新建目录

```
docs/{lang}/docs/api/
├── index.md                    ← 原 api.md（layout: api-reference，HTTP API）
└── ws/
    ├── _category_.json         ← label: "WebSocket API"
    ├── index.md                ← WS 概述（端点列表、OTP 认证、WS vs TCP 差异）
    ├── protocol/
    │   ├── _category_.json     ← label: "Protocol"
    │   ├── protocol_overview.md
    │   ├── connect.md
    │   ├── control-command.md  ← 原 socket/control-command.md
    │   ├── how-to-parse-header.md
    │   ├── how-to-parse-push.md
    │   ├── how-to-parse-request.md
    │   ├── how-to-parse-response.md
    │   └── how_to_handshake.md
    ├── quote/
    │   ├── _category_.json     ← label: "Quote"
    │   ├── pull/               ← 原 docs/quote/pull/（20 个命令文件）
    │   ├── push/               ← 原 docs/quote/push/（4 个文件）
    │   └── subscribe/          ← 原 docs/quote/subscribe/（3 个文件）
    └── trade/
        ├── _category_.json     ← label: "Trade"
        └── trade-push.md       ← 原 docs/trade/trade-push.md
```

### 迁移来源 → 目标

| 来源 | 目标 |
|------|------|
| `docs/socket/protocol/` | `docs/api/ws/protocol/`（整目录） |
| `docs/socket/control-command.md` | `docs/api/ws/protocol/control-command.md` |
| `docs/socket/hosts.md` | 内容合并至 `docs/api/ws/index.md` |
| `docs/socket/diff-ws-tcp.md` | 内容合并至 `docs/api/ws/index.md` |
| `docs/socket/socket-otp-api.md` | 内容合并至 `docs/api/ws/index.md` |
| `docs/socket/biz-command.md` | 内容合并至 `docs/api/ws/index.md`（命令列表） |
| `docs/quote/pull/` | `docs/api/ws/quote/pull/` |
| `docs/quote/push/` | `docs/api/ws/quote/push/` |
| `docs/quote/subscribe/` | `docs/api/ws/quote/subscribe/` |
| `docs/trade/trade-push.md` | `docs/api/ws/trade/trade-push.md` |

### 保留在 Docs

| 文件 | 理由 |
|------|------|
| `docs/socket/how_to_subscribe_quote.md` | 教程指南，非 API 参考 |
| `docs/socket/how_to_subscribe_trade.md` | 教程指南，非 API 参考 |
| `docs/quote/overview.md` | 概览页，保留在 Docs |
| `docs/quote/objects.md` | 数据类型定义，保留在 Docs |
| `docs/quote/individual/` | Watchlist 功能，与 WS API 无关 |
| `docs/trade/overview.md` | 概览页，保留在 Docs |
| `docs/trade/definition.md` | 数据类型定义，保留在 Docs |
| `docs/trade/asset/`, `execution/`, `order/` | HTTP 交易 API，保留在 Docs |

`docs/socket/` 目录在迁移完成后删除（两个保留文件移至 `docs/` 合适位置）。

---

## Sidebar 配置

将 `docs/.vitepress/locales/{en,zh-CN,zh-HK}/sidebar.ts` 从单 sidebar 改为多路径 sidebar：

```ts
import { genMarkdowDocs } from '../../theme/utils/gen'

const docsSidebar = genMarkdowDocs('en', 'docs')
const wsApiSidebar = genMarkdowDocs('en', 'docs/api/ws')

export const sidebar = {
  '/docs/api/ws/': wsApiSidebar(),
  '/docs/': docsSidebar(),
}
```

HTTP API 页面（`/docs/api`）通过 frontmatter `sidebar: false` 隐藏侧边栏，无需特殊处理。

---

## `api/ws/index.md` 内容结构

WS API Reference 概述页，合并以下来源内容：

1. **连接端点**（来自 `socket/hosts.md`）— Quote gateway / Trade gateway 地址
2. **WS vs TCP**（来自 `socket/diff-ws-tcp.md`）— 差异说明
3. **OTP 认证**（来自 `socket/socket-otp-api.md`）— HTTP 获取 token 的 API
4. **命令列表**（来自 `socket/biz-command.md`）— 所有 Quote/Trade WS 命令总览表，链接到各命令详情页

---

## Frontmatter slug 更新

迁移后的文件需更新 `slug` 以反映新 URL 路径：

- `docs/api/ws/index.md`：`slug: '/docs/api/ws'`
- `docs/api/ws/protocol/*`：`slug: '/docs/api/ws/protocol/...'`
- `docs/api/ws/quote/pull/*`：`slug: '/docs/api/ws/quote/pull/...'`
- `docs/api/ws/quote/push/*`：`slug: '/docs/api/ws/quote/push/...'`
- `docs/api/ws/quote/subscribe/*`：`slug: '/docs/api/ws/quote/subscribe/...'`
- `docs/api/ws/trade/*`：`slug: '/docs/api/ws/trade/...'`

---

## 三语言范围

以 `en` 为主，同步更新 `zh-CN` 和 `zh-HK`：
- 相同的目录创建、文件迁移操作
- 相同的 sidebar 配置变更（路径前缀替换为对应 locale）
- zh-CN/zh-HK sidebar.ts 路径前缀为 `/zh-CN/docs/` 和 `/zh-HK/docs/`

---

## 内部链接修复

迁移后需检查并修复以下位置的内部链接：

1. `docs/socket/how_to_subscribe_quote.md` → 更新引用 socket 内容的链接
2. `docs/socket/how_to_subscribe_trade.md` → 同上
3. `docs/quote/overview.md` → 更新指向 pull/push/subscribe 的链接
4. `docs/trade/overview.md` → 更新指向 trade-push 的链接
5. 新 `docs/api/ws/index.md` 中的内部链接（原 biz-command 的链接需更新）
6. 各迁移文件内的相对路径链接（`../quote/...` 等）

---

## 不在本次范围内

- 基于 openapi-protobufs 生成新的 WS API 文档内容（现有文档已足够）
- HTTP API Reference 页面改动
- URL 重定向配置（旧 URL → 新 URL）
