---
sidebar: false
title: Skill Installation Guide
description: Install Longbridge Skill for OpenClaw, Claude, ChatGPT, Cursor, Claude Code, and more
---

# Longbridge Skill Installation Guide

## Installation Methods

### Method 1: ZIP File (Recommended)

Download the Skill package and install it in your AI client.

**[Download longbridge.zip](/skill/longbridge.zip)**

After downloading, extract the zip and follow the client-specific guide below to place the files in the right location.

Also available on [skills.sh](https://skills.sh/longbridge/developers) and [GitHub](https://github.com/longbridge/developers/tree/main/skills).

---

### Method 2: CLI (npx / bunx)

For CLI-based tools, run the following command in your terminal:

```bash
# Recommended: install globally and skip the confirmation prompt
npx skills add longbridge/developers -g -y

# If you have Bun installed, use bunx instead of npx:
bunx skills add longbridge/developers -g -y
```

- `-g` — installs the Skill globally, making it available across **all** your projects (not just the current directory)
- `-y` — automatically confirms the installation prompt without requiring manual input

---

## Client Setup

### OpenClaw

In the OpenClaw chat, send the following message and OpenClaw will handle the installation automatically:

```
Install the Longbridge Developers Skill from this zip file: https://open.longbridge.com/skill/longbridge.zip
```

Takes effect immediately — no restart required.

---

### Claude Desktop / Claude.ai

> Claude.ai's code execution environment only allows access to a fixed whitelist of domains, so automated installation is not possible. Use the manual method below instead.

1. Open [Claude.ai](https://claude.ai) and go to **Projects**
2. Create a new project or open an existing one → **Project Settings**
3. Click **Add content** under **Project Knowledge**
4. Download [longbridge.zip](/skill/longbridge.zip) and extract it
5. Upload the extracted files to Project Knowledge

The Skill will be active in all conversations within that project.

---

### ChatGPT

> ChatGPT cannot auto-install Skills during a conversation. Use the GPT configuration page to upload manually.

1. Go to [ChatGPT](https://chatgpt.com) → **My GPTs** → **Create a GPT**
2. Switch to the **Configure** tab
3. Download [longbridge.zip](/skill/longbridge.zip) and extract it
4. Upload the extracted files under **Knowledge**
5. Save and publish the GPT

---

### Cursor

1. Open Cursor → **Settings** → **Rules**
2. Choose **Project Rules** (current project) or **User Rules** (global)
3. Download [longbridge.zip](/skill/longbridge.zip) and extract it
4. Paste the extracted content into the rules editor, or place the files as described in the README

---

### Claude Code

1. Download [longbridge.zip](/skill/longbridge.zip) and extract it
2. Copy the extracted files into `.claude/skills/` in your project directory (create the folder if it doesn't exist)
3. Restart Claude Code or start a new session

The Skill will be available in all Claude Code sessions within that project.

---

### Codex / Zed / Other CLI Tools

Run [Method 2](#method-2-cli-npx--bunx) above in your terminal. The Skill configuration will be written to your system and picked up automatically by tools that support project-level context.

---

## Verify Installation

After installing, send the following in a conversation:

```
Use Longbridge to get the current quote for AAPL
```

If the AI returns live quote data, the installation was successful.

---

## Troubleshooting

**AI says it can't find the Longbridge tool**

Some clients require a restart or a new conversation to load the Skill. Confirm the installation is complete, then try again in a new session.

**Prompted for authorization when querying data**

The Skill needs to connect to your Longbridge account. Follow the OAuth prompt, or get an API Token from the [Longbridge Developer Platform](https://open.longbridge.com).

**Trading operations not working**

Confirm your account has OpenAPI trading permissions enabled and is eligible to trade in the target market (HK / US).
