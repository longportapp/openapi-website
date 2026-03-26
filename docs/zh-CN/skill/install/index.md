---
sidebar: false
title: Skill 安装指引
description: 在 OpenClaw、Claude、ChatGPT、Cursor、Claude Code 等 AI 工具中安装 Longbridge Skill
---

# Longbridge Skill 安装指引

## 安装方式

### 方式一：下载 ZIP 文件（推荐）

下载 Skill 安装包，在你使用的 AI 客户端中安装。

**[下载 longbridge.zip](/skill/longbridge.zip)**

下载后解压，参考下方各客户端说明将文件放到对应位置。

也可通过 [skills.sh](https://skills.sh/longbridge/developers) 或 [GitHub](https://github.com/longbridge/developers/tree/main/skills) 安装。

---

### 方式二：CLI（npx / bunx）

适用于命令行工具，在终端中执行：

```bash
# 推荐：全局安装并跳过确认提示
npx skills add longbridge/developers -g -y

# 如果已安装 Bun，可以用 bunx 替代 npx：
bunx skills add longbridge/developers -g -y
```

- `-g` — 全局安装，Skill 对**所有**项目生效（不限于当前目录）
- `-y` — 自动确认安装提示，无需手动输入

---

## 授权 Longbridge 账户

安装 Skill 后，首次查询数据时需要完成 OAuth 2.0 授权，将 AI 客户端与你的 Longbridge 账户连接。**无需安装任何额外工具**，授权流程完全由客户端自动触发。

### 授权流程

1. 按下方各客户端说明完成 Skill 安装
2. 在 AI 对话中发起任意 Longbridge 数据查询（如报价、持仓）
3. 客户端自动弹出或提示打开浏览器
4. 在浏览器中登录 Longbridge 账户并确认授权范围
5. 授权完成后，凭证保存在本地，后续请求自动使用，无需重复登录；Token 过期时自动刷新

### 撤销授权

如需撤销，进入 Longbridge 账户 → **安全设置** → 管理已授权应用。

---

## 各客户端安装说明

### OpenClaw

在 OpenClaw 对话中发送以下消息，OpenClaw 会自动完成安装：

```
从以下 zip 文件安装 Longbridge Developers Skill：https://open.longbridge.com/skill/longbridge.zip
```

安装完成后即时生效，无需重启。

---

### Claude Desktop / Claude.ai

> Claude.ai 的代码执行环境仅开放固定白名单域名，无法通过命令行自动安装。只能通过以下手动方式完成。

1. 打开 [Claude.ai](https://claude.ai) 并进入 **Projects**
2. 创建新项目或选择已有项目 → **Project Settings**
3. 在 **Project Knowledge** 区域点击 **Add content**
4. 下载 [longbridge.zip](/skill/longbridge.zip) 并解压
5. 将解压后的文件上传到 Project Knowledge

安装后在该项目的对话中即可直接使用 Longbridge 数据能力。

---

### ChatGPT

> ChatGPT 同样无法在对话中自动安装，需通过 GPT 配置页手动上传。

1. 进入 [ChatGPT](https://chatgpt.com) → 左侧 **My GPTs** → **Create a GPT**
2. 切换到 **Configure** 标签
3. 下载 [longbridge.zip](/skill/longbridge.zip) 并解压
4. 在 **Knowledge** 区域上传解压后的文件
5. 保存并发布 GPT

---

### Cursor

1. 打开 Cursor → **Settings** → **Rules**
2. 选择 **Project Rules**（作用于当前项目）或 **User Rules**（全局生效）
3. 下载 [longbridge.zip](/skill/longbridge.zip) 并解压
4. 将解压后的内容粘贴到规则编辑框，或按 README 说明放置文件

---

### Claude Code

1. 下载 [longbridge.zip](/skill/longbridge.zip) 并解压
2. 将解压后的文件复制到项目目录下的 `.claude/skills/`（文件夹不存在时手动创建）
3. 重启 Claude Code 或新建会话

安装后在该项目的 Claude Code 会话中即可直接使用 Longbridge 数据能力。

---

### Codex / Zed / 其他 CLI 工具

在终端中执行上方的[方式二](#方式二cli-npx--bunx)命令。Skill 配置文件会写入系统，支持项目级上下文配置的工具会自动识别。

---

## 更新 Skill

`longbridge.zip` 中的 Skill 内容会不定期更新，建议定期检查并更新到最新版本以获得最佳体验。

重新下载 [longbridge.zip](/skill/longbridge.zip) 后，按照原安装步骤覆盖旧文件即可。

---

## 验证安装

安装完成后，在对话中发送：

```
使用 Longbridge 查一下 AAPL 当前报价
```

如果 AI 能返回实时报价数据，说明安装成功。

---

## 常见问题

**AI 说找不到 Longbridge 工具**

部分客户端需要重启或新建对话才能加载 Skill。确认安装步骤已完成，并在新会话中再次尝试。

**查询数据时需要授权**

Skill 需要连接你的 Longbridge 账户。按照上方 [授权流程](#授权流程) 完成 OAuth 2.0 授权即可，无需配置 API Key。

**交易操作无法执行**

确认账户已开通 OpenAPI 交易权限，以及该市场（港股 / 美股）的交易资格。
