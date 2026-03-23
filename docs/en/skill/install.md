---
sidebar: false
title: Skill Installation Guide
description: Install Longbridge Skill for OpenClaw, Claude, ChatGPT, Cursor, Claude Code, and more
---

# Skill Installation Guide

## OpenClaw

Type the following command in any OpenClaw chat:

```
/skills add longbridge/developers
```

Takes effect immediately — no restart required.

---

## Claude Desktop / Claude.ai

1. Open [Claude.ai](https://claude.ai) and go to **Projects**
2. Create a new project or open an existing one → **Project Settings**
3. Click **Add content** under **Project Knowledge**
4. Download [longbridge.zip](/skill/longbridge.zip) and extract it
5. Upload the extracted files to Project Knowledge

The Skill will be active in all conversations within that project.

---

## ChatGPT

1. Go to [ChatGPT](https://chatgpt.com) → **My GPTs** → **Create a GPT**
2. Switch to the **Configure** tab
3. Download [longbridge.zip](/skill/longbridge.zip) and extract it
4. Upload the extracted files under **Knowledge**
5. Save and publish the GPT

---

## Cursor

1. Open Cursor → **Settings** → **Rules**
2. Choose **Project Rules** (current project) or **User Rules** (global)
3. Download [longbridge.zip](/skill/longbridge.zip) and extract it
4. Paste the extracted content into the rules editor, or place the files as described in the README

---

## Claude Code

**Option 1: CLI**

Run in your project directory:

```bash
npx skills add longbridge/developers
```

**Option 2: Plugin command**

```
/plugin install longbridge/developers
```

After installation, use Longbridge capabilities directly in your Claude Code sessions.

---

## Codex / CLI Tools

Run in your project directory:

```bash
npx skills add longbridge/developers
```

This writes the Skill configuration into your project. Compatible with Codex, Zed, and other tools that support project-level context.

---

## Zed

1. Open Zed → **Settings** (`cmd+,`)
2. Find **Assistant** → **Context**
3. Download [longbridge.zip](/skill/longbridge.zip) and extract it
4. Add the file paths to the Context configuration as described in the README

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
