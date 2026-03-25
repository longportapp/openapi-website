---
sidebar: false
title: Skill 安裝指引
description: 在 OpenClaw、Claude、ChatGPT、Cursor、Claude Code 等 AI 工具中安裝 Longbridge Skill
---

# Longbridge Skill 安裝指引

## 安裝方式

### 方式一：下載 ZIP 檔案（推薦）

下載 Skill 安裝包，在你使用的 AI 客戶端中安裝。

**[下載 longbridge.zip](/skill/longbridge.zip)**

下載後解壓，參考下方各客戶端說明將文件放到對應位置。

也可透過 [skills.sh](https://skills.sh/longbridge/developers) 或 [GitHub](https://github.com/longbridge/developers/tree/main/skills) 安裝。

---

### 方式二：CLI（npx / bunx）

適用於命令列工具，在終端中執行：

```bash
# 推薦：全局安裝並跳過確認提示
npx skills add longbridge/developers -g -y

# 如果已安裝 Bun，可以用 bunx 替代 npx：
bunx skills add longbridge/developers -g -y
```

- `-g` — 全局安裝，Skill 對**所有**項目生效（不限於當前目錄）
- `-y` — 自動確認安裝提示，無需手動輸入

---

## 各客戶端安裝說明

### OpenClaw

在 OpenClaw 對話中發送以下訊息，OpenClaw 會自動完成安裝：

```
從以下 zip 檔案安裝 Longbridge Developers Skill：https://open.longbridge.com/skill/longbridge.zip
```

安裝完成後即時生效，無需重啟。

---

### Claude Desktop / Claude.ai

> Claude.ai 的程式碼執行環境僅開放固定白名單域名，無法透過命令列自動安裝。只能透過以下手動方式完成。

1. 打開 [Claude.ai](https://claude.ai) 並進入 **Projects**
2. 創建新項目或選擇已有項目 → **Project Settings**
3. 在 **Project Knowledge** 區域點擊 **Add content**
4. 下載 [longbridge.zip](/skill/longbridge.zip) 並解壓
5. 將解壓後的文件上傳到 Project Knowledge

安裝後在該項目的對話中即可直接使用 Longbridge 數據能力。

---

### ChatGPT

> ChatGPT 同樣無法在對話中自動安裝，需透過 GPT 設定頁手動上傳。

1. 進入 [ChatGPT](https://chatgpt.com) → 左側 **My GPTs** → **Create a GPT**
2. 切換到 **Configure** 標籤
3. 下載 [longbridge.zip](/skill/longbridge.zip) 並解壓
4. 在 **Knowledge** 區域上傳解壓後的文件
5. 保存並發布 GPT

---

### Cursor

1. 打開 Cursor → **Settings** → **Rules**
2. 選擇 **Project Rules**（作用於當前項目）或 **User Rules**（全局生效）
3. 下載 [longbridge.zip](/skill/longbridge.zip) 並解壓
4. 將解壓後的內容粘貼到規則編輯框，或按 README 說明放置文件

---

### Claude Code

1. 下載 [longbridge.zip](/skill/longbridge.zip) 並解壓
2. 將解壓後的文件複製到項目目錄下的 `.claude/skills/`（文件夾不存在時手動建立）
3. 重啟 Claude Code 或新建會話

安裝後在該項目的 Claude Code 會話中即可直接使用 Longbridge 數據能力。

---

### Codex / Zed / 其他 CLI 工具

在終端中執行上方的[方式二](#方式二cli-npx--bunx)命令。Skill 配置文件會寫入系統，支援項目級上下文配置的工具會自動識別。

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
