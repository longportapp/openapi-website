---
sidebar_position: 2
slug: /mcp
sidebar_label: MCP 服务
sidebarCollapsed: true
id: mcp
---

# Longbridge MCP 服务

通过 Longbridge MCP 服务，你可以用自然语言向 Claude、Cursor 等 AI 工具发出指令，直接查询行情、分析持仓、执行交易，而无需编写代码或手动调用 API。

Longbridge MCP 基于 [Model Context Protocol](https://modelcontextprotocol.io/) 开放标准构建，采用 OAuth 2.1 授权，无需管理 API 密钥，配置完成后即可使用。

**MCP 服务地址**

| 节点 | 地址 |
| --- | --- |
| 全球 | `https://openapi.longportapp.com/mcp` |
| 中国大陆 | `https://openapi.longportapp.cn/mcp` |

**OAuth 发现地址**：`https://openapi.longportapp.com/.well-known/oauth-authorization-server`

## 能做什么

接入 Longbridge MCP 后，你可以直接在 AI 对话中完成以下操作：

**查询行情**
- "帮我查一下苹果和英伟达现在的股价"
- "给我看腾讯最近三个月的 K 线走势"
- "查一下特斯拉的期权链，重点看本月到期的"

**分析账户**
- "我现在持仓里哪些股票亏损超过 5%"
- "帮我汇总一下本月的现金流水"
- "我的账户里有多少可用资金"

**执行交易**
- "以市价买入 100 股苹果"
- "把我的特斯拉持仓止损单全部撤掉"
- "帮我查一下今天的未成交订单"

:::caution 交易安全提示
交易操作具有实际资金影响，建议在提示词中明确要求 AI 在执行前向你确认订单详情。详见[安全与使用建议](#安全与使用建议)。
:::

## 可用工具

授权后，AI 工具可以调用以下能力。实际可用工具因账户地区、权限等级和授权范围而有所不同。

| 类别 | 工具 | 说明 |
| --- | --- | --- |
| 行情 | 实时报价 | 查询股票、ETF、期权、权证的实时价格和涨跌幅 |
| 行情 | 盘口深度 | 查看买卖盘口的挂单价格和数量 |
| 行情 | 逐笔成交 | 获取最新成交记录 |
| 历史数据 | K 线数据 | 获取日线、分钟线等不同周期的历史行情 |
| 历史数据 | 历史成交 | 查询历史成交记录和市场状态 |
| 标的信息 | 股票资料 | 查询股票基本信息、所属板块、财务数据等 |
| 标的信息 | 期权链 | 浏览指定正股的期权合约列表 |
| 标的信息 | 权证筛选 | 按条件筛选认股权证 |
| 账户 | 账户总览 | 查看总资产、市值、现金等账户摘要 |
| 账户 | 持仓查询 | 列出当前持有的所有标的及盈亏情况 |
| 资金 | 现金流水 | 查询出入金、股息、费用等资金变动记录 |
| 资金 | 融资情况 | 查看融资余额和利息信息 |
| 交易 | 下单 | 提交股票、期权等买卖订单 |
| 交易 | 撤单 / 改单 | 撤销或修改待成交订单 |
| 交易 | 订单查询 | 查询当日订单和历史订单 |

:::info 交易权限
交易类工具需要账户具备相应的交易权限。部分市场或产品类型（如期权、权证）还需要额外的交易资格。
:::

## 快速开始

以下以 Cursor 为例演示最简接入流程，其他客户端步骤类似。

### 第一步：添加 MCP 服务配置

打开 **Cursor Settings → MCP Servers**，点击 **Add new global MCP server**，在配置文件中添加：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

### 第二步：完成 OAuth 授权

保存配置后，Cursor 会自动打开浏览器跳转至 Longbridge 授权页面。使用 Longbridge 账户登录，查看请求的权限范围并确认授权。

### 第三步：开始使用

授权成功后回到 Cursor，在 MCP Servers 列表中确认 `longbridge` 处于已连接状态，工具列表出现后即可在对话中使用。

**验证示例**：在 Cursor 对话框中输入"帮我查一下苹果股票的当前价格"，如果收到报价数据，说明接入成功。

## 各客户端配置说明

:::tip
各客户端的 MCP 配置界面可能随版本更新有所变化，以下提供各客户端的接入要点，具体操作以客户端官方文档为准。
:::

### Cursor

打开 **Cursor Settings → MCP Servers**，添加远程 MCP 服务：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

完成 OAuth 授权后，确认工具列表中出现 `longbridge` 相关工具。

### Claude Code

在 Claude Code 中运行以下命令添加远程 MCP 服务：

```bash
claude mcp add --transport http longbridge https://openapi.longportapp.com/mcp
```

或者编辑 MCP 配置文件手动添加：

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

在浏览器完成 OAuth 授权后，回到 Claude Code 即可调用工具。

### Claude Desktop

编辑 Claude Desktop 配置文件（`claude_desktop_config.json`），添加：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

重启 Claude Desktop 后完成 OAuth 授权。

### ChatGPT

在 ChatGPT 的 **Settings → Connectors**（或工作区 MCP 配置入口）中新增远程 MCP 服务，填入以下服务地址：

```
https://openapi.longportapp.com/mcp
```

按页面指引完成 OAuth 授权。

### Zed

打开 `settings.json`，添加：

```json
{
  "context_servers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

保存后完成 OAuth 授权即可使用。

### Cherry Studio

在 Cherry Studio 的 **MCP 服务器** 配置中新增服务，类型选择 **SSE**，服务地址填入：

```
https://openapi.longportapp.com/mcp
```

:::caution 版本要求
部分较早版本的 Cherry Studio 未完整实现 MCP OAuth 2.1 流程，可能无法完成授权。建议升级到 v1.5.6 或更高版本。
:::

## OAuth 授权流程说明

Longbridge MCP 服务采用标准 OAuth 2.1 授权流程，无需向客户端暴露 API 密钥。整个流程只需完成一次，后续 AI 工具会自动使用已保存的凭证。

1. **发起连接**：在 MCP 客户端中配置 Longbridge MCP 服务地址并保存
2. **跳转授权页**：客户端自动打开浏览器，跳转至 Longbridge 登录与授权页面
3. **登录并确认**：使用 Longbridge 账户登录，查看请求的权限范围 (scope)，确认授权
4. **建立会话**：授权成功后客户端获得 OAuth 凭证，MCP 会话可用
5. **凭证管理**：凭证按 OAuth 策略自动刷新；随时可在 Longbridge 账户安全设置中撤销授权

## 安全与使用建议

**权限控制**

- 遵循最小权限原则，仅授予当前场景所需的 scope
- 初次使用建议仅开启只读权限（行情、账户查询），确认行为符合预期后再开启交易权限

**交易安全**

- 涉及下单、撤单等交易操作时，建议在提示词中明确要求 AI 在执行前向用户确认，例如："在提交任何订单前，先列出订单详情让我确认"
- 可在提示词中设置约束：单笔金额上限、可操作标的白名单、禁止市价单等
- 务必在实际交易前通过模拟场景验证 AI 的行为逻辑

**凭证安全**

- OAuth 凭证由客户端负责安全存储，不要将其记录在日志或共享给第三方
- 定期检查已授权的 MCP 应用，撤销不再使用的授权

## 常见问题

### OAuth 授权失败或无法完成跳转

- 确认 Longbridge 账户状态正常，未处于冻结或风险限制状态
- 确认客户端版本支持 MCP OAuth 2.1（参见上方各客户端版本要求）
- 在客户端重新发起授权流程
- 检查当前账户是否支持所请求的权限范围

### 已连接但部分工具不可用

- 账户权限或所在地区可能不支持该工具对应的功能
- 若授权范围（scope）已变更，需重新完成 OAuth 授权流程

### 交易操作返回权限不足

- 检查账户是否已开通对应市场的交易权限
- 确认当前 MCP 会话的 OAuth scope 包含交易相关权限
- 部分市场或产品类型（如期权、权证）需要额外的交易资格

### 中国大陆访问速度慢

将配置中的服务地址替换为大陆节点：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.cn/mcp"
    }
  }
}
```
