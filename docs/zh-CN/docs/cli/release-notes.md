---
title: 'Release Notes'
sidebar_label: 'Release Notes'
sidebar_position: 100
sidebar_icon: newspaper
---

# Release Notes

### [v0.15.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.15.0)

- **新增：`portfolio` 命令** — 显示总盈亏、各市场资产分布（美股/港股/A 股/新加坡/现金）、持仓明细和现金余额
- **新增：`investors` 命令** — 基于 SEC 13F 的活跃基金经理排行榜；通过 CIK 查看任意投资者的持仓及实时价格
- **新增：`insider-trades`** — 任意标的的 SEC Form 4 内部人交易历史
- **新增：`watchlist pin/unpin`** — 将证券置顶到自选股分组顶部
- **增强：`assets`** — 从 `balance` 更名；现在显示完整资产概览：净资产、购买力、保证金、风险等级及各币种现金明细

### [v0.14.2](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.14.2)

- **新增：`--lang` 全局参数** — 为所有命令设置内容语言（`zh-CN`、`zh-HK`、`en`）；未设置时依次回退到系统 `LANG` 环境变量，最终默认 `en`

### [v0.14.1](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.14.1)

- **新增：中国区登录** — `longbridge login` 现在支持中国区路由
- **新增：`-v` 参数** — 无需输入完整命令即可查看版本号

### [v0.14.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.14.0)

- **新增：设备授权登录** — `longbridge login` 改用 OAuth 设备流程；显示 URL 和授权码，可在任意设备上完成授权，支持 SSH 和无头环境；移除了 `--headless` 参数
- **新增：订单增强** — 新增追踪止损和 AO 订单类型；订单命令新增 `--expire-date`、`--outside-rth`、`--remark` 参数
- **修复：Linux 段错误** — 预编译 Linux 二进制文件改用 musl，修复在部分发行版上的崩溃问题

### [v0.13.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.13.0)

- **新增：基本面与分析命令** — `financial-report`、`valuation`、`forecast-eps`、`consensus`、`institution-rating`、`shareholder`、`fund-holder`、`dividend`、`finance-calendar`、`exchange-rate`
- **破坏性变更：命令重构** — 19 个独立命令合并为子命令树（例如 `news-detail` → `news detail`、`kline-history` → `kline history`、`warrant-list` → `warrant list`）
- **支持中国区** — 设置 `LONGBRIDGE_REGION=cn` 以通过中国区端点路由

### [v0.12.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.12.0)

- **新增：`statement` 命令** — 列出并导出日/月账户结单
- **TUI** — 修复 `q` 退出；在自选股内新增资讯列表和详情视图

---

完整更新日志：[github.com/longbridge/longbridge-terminal/releases](https://github.com/longbridge/longbridge-terminal/releases)
