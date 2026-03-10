---
sidebar_position: 2
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# Longbridge MCP

[Longbridge MCP](https://github.com/longbridge/openapi/tree/main/mcp) 是 [Longbridge OpenAPI](https://open.longbridge.com/) 的 [MCP](https://modelcontextprotocol.io/introduction) 服务实现，通过 Model Context Protocol 向 AI 助手（如 Cursor、Cherry Studio）提供实时行情、账户与持仓查询以及交易等能力。

需使用 **App Key**、**App Secret** 和 **Access Token** 进行配置，均在 [https://open.longbridge.com/](https://open.longbridge.com/)（用户中心 → 应用凭证）获取。

完整安装与选项请参阅 [Longbridge MCP README](https://github.com/longbridge/openapi/blob/main/mcp/README.md)。

## 前置条件

- 已开通 Longbridge 账户并具备 [Open API](https://open.longbridge.com/) 权限
- 在 [https://open.longbridge.com/](https://open.longbridge.com/) 获取 **App Key** 与 **App Secret**
- **Access Token**（在 [https://open.longbridge.com/](https://open.longbridge.com/) 用户中心 → 应用凭证处获取）

## 安装

### macOS / Linux

```bash
curl -sSL https://raw.githubusercontent.com/longbridge/openapi/refs/heads/main/mcp/install | bash
```

### Windows

从 [Releases](https://github.com/longbridge/openapi/releases) 下载最新二进制（如 `longbridge-mcp-0.1.0`）。

## 配置

运行 MCP 服务时需设置以下环境变量：

| 变量 | 说明 |
| --- | --- |
| `LONGBRIDGE_APP_KEY` | Open API App Key |
| `LONGBRIDGE_APP_SECRET` | Open API App Secret |
| `LONGBRIDGE_ACCESS_TOKEN` | 在 [https://open.longbridge.com/](https://open.longbridge.com/)（用户中心 → 应用凭证）获取的 Access Token |

获取方式见[快速开始 — 方式二：传统 API Key](/docs/getting-started#方式二传统-api-key兼容)。

## 客户端配置

### Cursor

1. 打开 **Settings → Features → MCP Servers**
2. 添加 MCP Server，类型为 **command**
3. 命令（macOS/Linux）：

   ```bash
   env LONGBRIDGE_APP_KEY=your-app-key LONGBRIDGE_APP_SECRET=your-app-secret LONGBRIDGE_ACCESS_TOKEN=your-access-token longbridge-mcp
   ```

4. Windows 下使用：

   ```bash
   cmd /c "set LONGBRIDGE_APP_KEY=your-app-key && set LONGBRIDGE_APP_SECRET=your-app-secret && set LONGBRIDGE_ACCESS_TOKEN=your-access-token && longbridge-mcp"
   ```

或在 MCP 配置 JSON 中：

```json
{
  "mcpServers": {
    "longbridge-mcp": {
      "command": "/usr/local/bin/longbridge-mcp",
      "env": {
        "LONGBRIDGE_APP_KEY": "your-app-key",
        "LONGBRIDGE_APP_SECRET": "your-app-secret",
        "LONGBRIDGE_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}
```

### Cherry Studio

1. **设置 → MCP 服务器 → 添加服务器**
2. 类型：**STDIO**
3. 命令：同上 `env LONGBRIDGE_APP_KEY=... LONGBRIDGE_APP_SECRET=... LONGBRIDGE_ACCESS_TOKEN=... longbridge-mcp`（Windows 用对应变体）

## 可选：SSE 服务模式

以 SSE 服务方式运行（默认绑定 `127.0.0.1:8000`）：

```bash
env LONGBRIDGE_APP_KEY=your-app-key LONGBRIDGE_APP_SECRET=your-app-secret LONGBRIDGE_ACCESS_TOKEN=your-access-token longbridge-mcp --sse
```

通过 `--bind` 修改地址：

```bash
longbridge-mcp --sse --bind 127.0.0.1:3000
```

## 可选：只读与日志

- **只读模式**（不提交订单）：

  ```bash
  longbridge-mcp --readonly
  ```

- **日志目录**：

  ```bash
  longbridge-mcp --log-dir /path/to/log/dir
  ```

## 能力说明

| 类别 | 说明 |
| --- | --- |
| 行情数据 | 实时报价、K 线、历史行情 |
| 账户 | 账户概览、资产、持仓 |
| 交易 | 下单、改单、撤单（受账户与地区限制） |

## 安全建议

- 勿将 **App Secret** 与 **Access Token** 提交到代码仓库。
- 仅需行情或账户数据时可使用 **--readonly**。
- 若凭证泄露，请在 [Longbridge 账户安全](https://longbridge.com) 中撤销或更换。

## 参考

- [Longbridge MCP README](https://github.com/longbridge/openapi/blob/main/mcp/README.md) — 安装、配置与使用说明
- [快速开始](/docs/getting-started) — 方式二（传统 API Key）获取开发者中心的 App Key、Secret 与 Access Token
