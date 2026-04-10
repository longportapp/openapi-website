---
title: 'Release Notes'
sidebar_label: 'Release Notes'
sidebar_position: 100
sidebar_icon: newspaper
---

# Release Notes

### [v0.15.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.15.0)

- **新增：`portfolio` 命令** — 顯示總盈虧、各市場資產分佈（美股/港股/A 股/新加坡/現金）、持倉明細和現金餘額
- **新增：`investors` 命令** — 基於 SEC 13F 的活躍基金經理排行榜；透過 CIK 查看任意投資者的持倉及即時價格
- **新增：`insider-trades`** — 任意標的的 SEC Form 4 內部人交易歷史
- **新增：`watchlist pin/unpin`** — 將證券置頂到自選股分組頂部
- **增強：`assets`** — 從 `balance` 更名；現在顯示完整資產概覽：淨資產、購買力、保證金、風險等級及各幣種現金明細

### [v0.14.2](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.14.2)

- **新增：`--lang` 全域參數** — 為所有命令設定內容語言（`zh-CN`、`zh-HK`、`en`）；未設定時依次回退到系統 `LANG` 環境變數，最終預設 `en`

### [v0.14.1](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.14.1)

- **新增：中國區登入** — `longbridge login` 現在支援中國區路由
- **新增：`-v` 參數** — 無需輸入完整命令即可查看版本號

### [v0.14.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.14.0)

- **新增：裝置授權登入** — `longbridge login` 改用 OAuth 裝置流程；顯示 URL 和授權碼，可在任意裝置上完成授權，支援 SSH 和無頭環境；移除了 `--headless` 參數
- **新增：訂單增強** — 新增追蹤止損和 AO 訂單類型；訂單命令新增 `--expire-date`、`--outside-rth`、`--remark` 參數
- **修復：Linux 段錯誤** — 預編譯 Linux 二進位檔案改用 musl，修復在部分發行版上的崩潰問題

### [v0.13.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.13.0)

- **新增：基本面與分析命令** — `financial-report`、`valuation`、`forecast-eps`、`consensus`、`institution-rating`、`shareholder`、`fund-holder`、`dividend`、`finance-calendar`、`exchange-rate`
- **破壞性變更：命令重構** — 19 個獨立命令合併為子命令樹（例如 `news-detail` → `news detail`、`kline-history` → `kline history`、`warrant-list` → `warrant list`）
- **支援中國區** — 設定 `LONGBRIDGE_REGION=cn` 以透過中國區端點路由

### [v0.12.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.12.0)

- **新增：`statement` 命令** — 列出並匯出日/月帳戶結單
- **TUI** — 修復 `q` 退出；在自選股內新增資訊列表和詳情視圖

---

完整更新日誌：[github.com/longbridge/longbridge-terminal/releases](https://github.com/longbridge/longbridge-terminal/releases)
