---
sidebar_position: 2
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# MCP

Longbridge 提供在线 MCP 服务，支持 AI 工具通过 Model Context Protocol 安全访问行情与账户能力。

- MCP 服务地址：`https://openapi.longportapp.com/mcp`
- OAuth 发现地址：`https://openapi.longportapp.com/.well-known/oauth-authorization-server`

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

## 客户端兼容性说明

部分未完整实现 MCP OAuth 2.1 流程的客户端，可能无法接入 Longbridge MCP。

例如，部分较早版本的客户端（如早期 Cherry Studio）可能无法完整完成 OAuth 流程。建议升级到客户端最新版本。

## 安全建议

- OAuth 凭证属于敏感信息，客户端应安全存储。
- 遵循最小权限原则，仅授予必要 scope。
- 涉及交易操作时，建议始终加入人工确认。

## 客户端接入方式
> 说明：各客户端 MCP 配置格式可能随版本变化，请以客户端官方文档/界面为准，本文仅提供接入要点与服务地址。


### ChatGPT

在 ChatGPT 的 **Settings → Connectors / MCP**（或工作区 MCP 配置入口）中新增远程 MCP 服务：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.cn/mcp"
    }
  }
}
```

然后按页面指引完成 OAuth 授权。

### Claude Code

在 Claude Code 的 MCP 配置中新增远程 MCP 服务：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.cn/mcp"
    }
  }
}
```

浏览器完成 OAuth 后，回到 Claude Code 即可调用工具。

### Cursor

打开 **Cursor Settings → MCP Servers**，新增远程 MCP 服务：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.cn/mcp"
    }
  }
}
```

完成 OAuth 后，确认工具列表已出现。

### Zed

打开 `settings.json`，增加：

```json
{
  "context_servers": {
    "longbridge": {
      "url": "https://openapi.longportapp.cn/mcp"
    }
  }
}
```

然后完成 OAuth 授权即可使用。

### OpenClaw

在 OpenClaw 的 MCP/工具集成配置中添加 Longbridge 远程 MCP：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.cn/mcp"
    }
  }
}
```

完成 OAuth 后，在会话中确认工具可用。

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
