---
sidebar_position: 7
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# MCP

Longbridge 提供在线 MCP 服务，支持 AI 工具通过 Model Context Protocol 安全访问行情与账户能力。

> 本文只介绍 **Longbridge MCP 在线服务** 及其 **OAuth 认证流程**。

## Longbridge MCP 在线服务能力

在完成授权后，MCP 客户端可以使用 Longbridge 的能力，例如：

- 行情快照与实时查询
- K 线与历史数据查询
- 账户概览与持仓查询
- 交易相关操作（取决于账户权限与产品规则）

实际可用能力会因地区、账户等级和授权范围而有所不同。

## OAuth 认证流程

Longbridge MCP 使用 OAuth，用户无需向客户端暴露原始 API 密钥。

### 1）在客户端发起 MCP 连接

在支持 MCP 的客户端（如 Cursor、Claude Desktop、Cherry Studio）中，发起连接 Longbridge MCP 服务。

### 2）跳转 Longbridge 授权页面

客户端会打开浏览器，进入 Longbridge 登录与授权页面。

### 3）登录并确认授权

查看请求权限（scope），确认后授权。

### 4）回调完成并建立会话

授权成功后，客户端获得 OAuth 凭证，MCP 会话可用。

### 5）刷新与撤销

- 凭证会按 OAuth 策略过期并刷新。
- 你可以随时在 Longbridge 安全/授权设置中撤销访问。

## 安全建议

- OAuth 凭证属于敏感信息，客户端应安全存储。
- 遵循最小权限原则，仅授予必要 scope。
- 涉及交易操作时，建议始终加入人工确认。

## 推荐使用方式

1. 先从只读能力开始（行情/账户/持仓）。
2. 确认权限范围和风控后，再开启交易相关能力。
3. 在提示词中增加约束（金额上限、标的白名单、下单前确认）。

## 常见问题

### OAuth 登录失败

- 确认 Longbridge 账户状态正常。
- 在客户端重新发起授权。
- 检查当前账户是否支持所请求的 scope。

### 已连接但部分工具不可用

- 可能是账户/地区权限限制。
- 如 scope 有变更，请重新授权。

### 交易操作提示权限不足

- 检查账户交易权限与市场可交易资格。
- 确认当前 MCP 会话已获得对应 OAuth scope。
