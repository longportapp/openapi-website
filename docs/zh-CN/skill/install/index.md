---
sidebar: false
title: Skill 安装指引
description: 在 OpenClaw、Claude、ChatGPT、Cursor、Claude Code 等 AI 工具中安装 Longbridge Skill
---

# Longbridge Skill 安装指引

## OpenClaw

在任意对话框中输入以下命令：

```
/skills add longbridge/developers
```

安装完成后即时生效，无需重启。

也可通过 [skills.sh](https://skills.sh/longbridge/developers) 或 [GitHub](https://github.com/longbridge/developers/tree/main/skills) 安装。

---

## Claude Desktop / Claude.ai

> Claude.ai 的代码执行环境仅开放固定白名单域名，无法通过命令行自动安装。只能通过以下手动方式完成。

1. 打开 [Claude.ai](https://claude.ai) 并进入 **Projects**
2. 创建新项目或选择已有项目 → **Project Settings**
3. 在 **Project Knowledge** 区域点击 **Add content**
4. 下载 [longbridge.zip](/skill/longbridge.zip) 并解压
5. 将解压后的文件上传到 Project Knowledge

安装后在该项目的对话中即可直接使用 Longbridge 数据能力。

---

## ChatGPT

> ChatGPT 同样无法在对话中自动安装，需通过 GPT 配置页手动上传。

1. 进入 [ChatGPT](https://chatgpt.com) → 左侧 **My GPTs** → **Create a GPT**
2. 切换到 **Configure** 标签
3. 下载 [longbridge.zip](/skill/longbridge.zip) 并解压
4. 在 **Knowledge** 区域上传解压后的文件
5. 保存并发布 GPT

---

## Cursor

1. 打开 Cursor → **Settings** → **Rules**
2. 选择 **Project Rules**（作用于当前项目）或 **User Rules**（全局生效）
3. 下载 [longbridge.zip](/skill/longbridge.zip) 并解压
4. 将解压后的内容粘贴到规则编辑框，或按 README 说明放置文件

---

## Claude Code

**方式一：命令行安装**

在你的项目目录下执行：

```bash
npx skills add longbridge/developers
```

安装后，在该项目的 Claude Code 会话中直接说出需求即可。

---

## Codex / CLI 工具

在项目目录下执行：

```bash
npx skills add longbridge/developers
```

命令会将 Skill 配置写入项目，兼容 Codex、Zed 等支持项目级上下文配置的工具。

---

## Zed

1. 打开 Zed → **Settings**（`cmd+,`）
2. 找到 **Assistant** → **Context**
3. 下载 [longbridge.zip](/skill/longbridge.zip) 并解压
4. 按 README 说明将文件路径添加到 Context 配置中

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

Skill 需要连接你的 Longbridge 账户。按提示完成 OAuth 授权，或在 [Longbridge 开发者平台](https://open.longbridge.com) 获取 API Token。

**交易操作无法执行**

确认账户已开通 OpenAPI 交易权限，以及该市场（港股 / 美股）的交易资格。
