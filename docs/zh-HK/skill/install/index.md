---
sidebar: false
title: Skill 安裝指引
description: 在 OpenClaw、Claude、ChatGPT、Cursor、Claude Code 等 AI 工具中安裝 Longbridge Skill
---

# Longbridge Skill 安裝指引

## OpenClaw

在任意對話框中輸入以下命令：

```
/skills add longbridge/developers
```

安裝完成後即時生效，無需重啟。

也可透過 [skills.sh](https://skills.sh/longbridge/developers) 或 [GitHub](https://github.com/longbridge/developers/tree/main/skills) 安裝。

---

## Claude Desktop / Claude.ai

1. 打開 [Claude.ai](https://claude.ai) 並進入 **Projects**
2. 創建新項目或選擇已有項目 → **Project Settings**
3. 在 **Project Knowledge** 區域點擊 **Add content**
4. 下載 [longbridge.zip](/skill/longbridge.zip) 並解壓
5. 將解壓後的文件上傳到 Project Knowledge

安裝後在該項目的對話中即可直接使用 Longbridge 數據能力。

---

## ChatGPT

1. 進入 [ChatGPT](https://chatgpt.com) → 左側 **My GPTs** → **Create a GPT**
2. 切換到 **Configure** 標籤
3. 下載 [longbridge.zip](/skill/longbridge.zip) 並解壓
4. 在 **Knowledge** 區域上傳解壓後的文件
5. 保存並發布 GPT

---

## Cursor

1. 打開 Cursor → **Settings** → **Rules**
2. 選擇 **Project Rules**（作用於當前項目）或 **User Rules**（全局生效）
3. 下載 [longbridge.zip](/skill/longbridge.zip) 並解壓
4. 將解壓後的內容粘貼到規則編輯框，或按 README 說明放置文件

---

## Claude Code

**方式一：命令行安裝**

在你的項目目錄下執行：

```bash
npx skills add longbridge/developers
```

安裝後，在該項目的 Claude Code 會話中直接說出需求即可。

---

## Codex / CLI 工具

在項目目錄下執行：

```bash
npx skills add longbridge/developers
```

命令會將 Skill 配置寫入項目，兼容 Codex、Zed 等支持項目級上下文配置的工具。

---

## Zed

1. 打開 Zed → **Settings**（`cmd+,`）
2. 找到 **Assistant** → **Context**
3. 下載 [longbridge.zip](/skill/longbridge.zip) 並解壓
4. 按 README 說明將文件路徑添加到 Context 配置中

---

## 驗證安裝

安裝完成後，在對話中發送：

```
使用 Longbridge 查一下 AAPL 當前報價
```

如果 AI 能返回實時報價數據，說明安裝成功。

---

## 常見問題

**AI 說找不到 Longbridge 工具**

部分客戶端需要重啟或新建對話才能加載 Skill。確認安裝步驟已完成，並在新會話中再次嘗試。

**查詢數據時需要授權**

Skill 需要連接你的 Longbridge 賬戶。按提示完成 OAuth 授權，或在 [Longbridge 開發者平台](https://open.longbridge.com) 獲取 API Token。

**交易操作無法執行**

確認賬戶已開通 OpenAPI 交易權限，以及該市場（港股 / 美股）的交易資格。
