---
sidebar_position: 5
slug: /mcp
sidebar_label: MCP 服务器
id: mcp
---

# Longbridge MCP 服务器

我们为 Longbridge OpenAPI 提供了全面的 [MCP](https://modelcontextprotocol.io/) 实现，让您可以从任何支持 MCP 的 AI 助手中轻松访问金融数据、实时市场数据，甚至让 AI 直接下单。

<video src="https://pub.lbkrs.com/files/202503/SGozJNWBfYpta73i/longport-mcp.mp4" width="100%" autoplay loop controls  />

## 什么是 MCP？

Model Context Protocol（模型上下文协议）是一个开放协议，它标准化了应用程序如何为大型语言模型（LLM）提供上下文。通过 MCP，AI 助手可以安全地连接到各种数据源和工具，使它们能够访问实时信息并代表您执行操作。

> **重要提示：** 之前的 `longport-mcp` CLI 工具已经废弃，不再建议使用。请使用我们的在线 MCP 服务器，它提供更好的性能、自动更新和 OAuth 2 安全认证。本文档介绍的是推荐的在线 MCP 服务器方式。

## Longbridge MCP 服务器

我们的 MCP 服务器为 AI 助手提供直接访问：

- **实时市场数据**：股票价格、报价和市场指数
- **历史数据**：历史股票价格和表现指标
- **投资组合信息**：您当前的持仓和头寸
- **交易功能**：下单、查看账户状态
- **市场分析**：技术指标和市场洞察

### 服务器端点

**全球：**

```
https://openapi.longportapp.com/mcp
```

**中国大陆（加速）：**

```
https://openapi.longportapp.cn/mcp
```

> 如果您位于中国大陆，我们建议使用 `.cn` 端点以获得更好的性能和更快的响应时间。

## 配置

### 在 Claude Desktop 中使用

在您的 Claude Desktop MCP 设置中添加以下配置：

```json
{
  "mcpServers": {
    "longbridge": {
      "type": "http",
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

首次连接时，Claude Desktop 将引导您完成 OAuth 2 授权流程以授予对您 Longbridge 账户的访问权限。

### 在 Cursor 中使用

打开命令面板（`Command + Shift + P`），选择 **Cursor Settings**，导航到 **MCP Servers**，然后点击 **Add new global MCP server**。

在 `mcp.json` 文件中添加：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

在提示时按照浏览器中的 OAuth 2 授权流程操作。

### 在 Claude Code（CLI）中使用

[Claude Code](https://github.com/anthropics/claude-code) 是 Anthropic 的官方命令行界面。

将服务器添加到您的 `~/.claude/settings.json`：

```json
{
  "mcpServers": {
    "longbridge": {
      "type": "http",
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

当您启动 Claude Code 并与 Longbridge 服务器交互时，它会自动处理 OAuth 2 授权流程。

### 在 Windsurf 中使用

[Windsurf](https://codeium.com/windsurf) 是 Codeium 的 AI 驱动代码编辑器。

1. 打开 Windsurf 设置
2. 导航到 **Extensions** → **MCP Servers**
3. 点击 **Add Server**
4. 配置服务器：

```json
{
  "name": "longbridge",
  "url": "https://openapi.longportapp.com/mcp",
  "type": "http"
}
```

### 在 Cline（VS Code 扩展）中使用

[Cline](https://github.com/cline/cline) 是一个流行的支持 MCP 的 VS Code 扩展。

1. 从 VS Code 市场安装 Cline 扩展
2. 打开 VS Code 设置（`Cmd/Ctrl + ,`）
3. 搜索 "Cline MCP"
4. 添加 Longbridge MCP 服务器：

```json
{
  "cline.mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp",
      "type": "http"
    }
  }
}
```

### 在 Continue.dev 中使用

[Continue](https://continue.dev/) 是一个开源 AI 代码助手。

添加到您的 `~/.continue/config.json`：

```json
{
  "mcpServers": [
    {
      "name": "longbridge",
      "url": "https://openapi.longportapp.com/mcp",
      "type": "http"
    }
  ]
}
```

### 在 Zed 中使用

[Zed](https://zed.dev/) 是一个原生支持 MCP 的高性能代码编辑器。

1. 打开 Zed 设置（`Cmd + ,`）
2. 导航到 **AI** 部分
3. 添加 MCP 服务器配置：

```json
{
  "assistant": {
    "mcp_servers": {
      "longbridge": {
        "url": "https://openapi.longportapp.com/mcp",
        "type": "http"
      }
    }
  }
}
```

### 在 ChatGPT Desktop 中使用

如果您使用支持 MCP 的 ChatGPT Desktop：

1. 打开 ChatGPT 设置
2. 导航到 **Integrations** → **MCP Servers**
3. 点击 **Add Server** 并输入：
   - 名称：`Longbridge`
   - URL：`https://openapi.longportapp.com/mcp`
   - 类型：`HTTP with OAuth 2`

### 地区配置

**中国大陆用户：**

如果您在中国大陆，请将服务器 URL 替换为加速端点以获得更好的性能：

```
https://openapi.longportapp.cn/mcp
```

只需在配置文件中将 `url` 字段更新为使用 `.cn` 域名即可。

## 示例提示

配置完成后，您可以使用自然语言与 AI 交互：

**市场数据查询：**

- "AAPL 和 TSLA 股票的当前价格是多少？"
- "显示主要市场指数的当前值"
- "特斯拉在过去一个月的表现如何？"

**历史分析：**

- "TSLA 和 AAPL 在过去一年的股票价格历史是什么？"
- "比较 TSLA、AAPL 和 NVDA 在过去 3 个月的表现"

**投资组合管理：**

- "为我持有的股票生成投资组合表现图表"
- "显示我当前的头寸及其盈亏"
- "我的投资组合配置是怎样的？"

**交易操作：**

- "检查我今天持有的股票价格，如果下跌超过 3%，以市场价卖出 1/3"
- "下一个限价单，以 150 美元买入 100 股 AAPL"

## 可用工具

Longbridge MCP 服务器提供以下功能：

### 报价工具

- 获取股票实时报价
- 获取历史价格数据
- 访问市场指数和板块表现
- 查询交易量和市场深度

### 账户工具

- 查看账户余额和购买力
- 检查当前头寸和持仓
- 查看订单历史
- 监控投资组合表现

### 交易工具

- 下市价单和限价单
- 修改或取消待处理订单
- 设置条件订单
- 执行多腿策略

### 分析工具

- 计算技术指标
- 生成表现报告
- 比较多个证券
- 创建自定义可视化

## 安全性

Longbridge MCP 服务器使用 OAuth 2 进行安全认证：

- **无凭证存储**：您的凭证永远不会存储在配置文件中
- **安全令牌交换**：OAuth 2 令牌由您的 MCP 客户端安全管理
- **HTTPS 加密**：所有通信都通过 HTTPS 加密
- **令牌刷新**：访问令牌在需要时自动刷新

您将在初始设置期间通过浏览器授权访问。授权后，MCP 客户端会安全地管理您的会话令牌。

## 速率限制

MCP 服务器受到与标准 Longbridge OpenAPI 相同的速率限制。有关详细信息，请参阅我们的[速率限制](/docs/rate-limits)文档。

## 支持

如果您遇到任何问题或有疑问：

- 查看我们的[文档](/docs/getting-started)
- 访问我们的 [GitHub 仓库](https://github.com/longportapp/openapi)
- 联系我们的支持团队

## 下一步

- 探索我们的 [API 文档](/docs/quote/pull/static)以了解可用数据
- 了解[交易 API](/docs/trade/order/submit) 功能
- 加入我们的开发者社区获取提示和最佳实践
