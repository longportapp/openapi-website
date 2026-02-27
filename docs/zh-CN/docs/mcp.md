---
sidebar_position: 7
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# MCP

Longport MCP 是基于 Longbridge OpenAPI SDK 实现的 MCP 服务。

它可以让 Cursor、Cherry Studio、Claude Desktop 等支持 MCP 的 AI 客户端，通过标准协议访问 Longbridge 的行情与交易能力。

- 开源地址：[longportapp/openapi/tree/main/mcp](https://github.com/longportapp/openapi/tree/main/mcp)
- 协议标准：[Model Context Protocol](https://modelcontextprotocol.io/)

## 前置条件

开始前请确保：

- 你已完成 Longbridge 开户并开通 OpenAPI 授权。
- 你已拿到以下凭证：
  - `LONGPORT_APP_KEY`
  - `LONGPORT_APP_SECRET`
  - `LONGPORT_ACCESS_TOKEN`
- （可选）如在中国大陆使用，建议设置：
  - `LONGPORT_REGION=cn`

> 安全提示：`LONGPORT_ACCESS_TOKEN` 等同于 API 访问权限，请勿泄露。

## 安装

### macOS / Linux

运行：

```bash
curl -sSL https://raw.githubusercontent.com/longportapp/openapi/refs/heads/main/mcp/install | bash
```

安装后验证：

```bash
longport-mcp -h
```

### Windows

从以下地址下载 `longport-mcp-x86_64-pc-windows-msvc.zip`：

- [https://github.com/longportapp/openapi/releases](https://github.com/longportapp/openapi/releases)

解压得到 `longport-mcp.exe`，建议放到固定路径（例如 `C:\\longport-mcp.exe`）。

## 3 分钟快速开始

1. 安装 `longport-mcp`。
2. 在你的 AI 客户端里配置 MCP。
3. 启动后先用行情/账户类问题验证连通性。

`mcp.json` 示例：

```json
{
  "mcpServers": {
    "longport-mcp": {
      "command": "/usr/local/bin/longport-mcp",
      "env": {
        "LONGPORT_APP_KEY": "your-app-key",
        "LONGPORT_APP_SECRET": "your-app-secret",
        "LONGPORT_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}
```

Windows 示例：

```json
{
  "mcpServers": {
    "longport-mcp": {
      "command": "C:\\longport-mcp.exe",
      "env": {
        "LONGPORT_APP_KEY": "your-app-key",
        "LONGPORT_APP_SECRET": "your-app-secret",
        "LONGPORT_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}
```

如在中国大陆，可增加：

```json
{
  "LONGPORT_REGION": "cn"
}
```

## 能力分类

根据账号权限，MCP 可提供以下类别能力：

- **Quote（行情）**：快照、实时行情、K 线、历史数据
- **Market（市场）**：主要指数与市场概览
- **Account（账户）**：资金与账户摘要
- **Position（持仓）**：持仓与组合视图
- **Trade（交易）**：下单、查询、撤单（需权限）

> 实际可用工具会因地区与账号权限而不同。

## 示例提问

连接 MCP 后可以这样问：

- “AAPL 和 TSLA 当前价格是多少？”
- “TSLA 最近一个月表现如何？”
- “给我当前账户摘要和持仓情况。”
- “比较 TSLA、AAPL、NVDA 过去 3 个月表现。”
- “生成我的组合表现表格和饼图（只返回结果，不要代码）。”

## Cursor 配置

1. 打开命令面板（`Command + Shift + P`）
2. 进入 **Cursor Settings**
3. 选择 **MCP Servers**
4. 点击 **Add new global MCP server**
5. 在 `mcp.json` 中填入你的凭证

## Cherry Studio 配置

建议使用 **STDIO 模式**，并确保系统可找到 `longport-mcp` 命令（或使用绝对路径）。

中国大陆用户建议增加：

```bash
LONGPORT_REGION=cn
```

## 安全与风控建议

- 对 AI 生成的交易指令必须人工复核。
- 先从只读能力开始（行情/账户/持仓）。
- 如启用交易指令，建议添加硬约束，例如：
  - 单笔金额上限
  - 仅允许指定标的
  - 下单前强制确认
- 初次使用建议先小额验证。

## 常见问题排查

### Authentication failed / invalid token

- 检查 3 个凭证是否正确。
- 确认 token 未过期、未被撤销。

### MCP 已启动但看不到工具

- 确认客户端读取的是正确的 `mcp.json`。
- 修改配置后重启 AI 客户端。

### Windows 找不到可执行文件

- 使用绝对路径，如 `C:\\longport-mcp.exe`。

### 中国大陆网络不稳定

- 增加 `LONGPORT_REGION=cn`。
