# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 插件

```bash
/plugin install superpowers@claude-plugins-official
```

## Commands

```bash
# 开发（连接 canary 环境 API）
bun run dev

# 开发（连接生产环境 API）
bun run dev:prod

# 构建
bun run build:canary   # canary 环境
bun run build:release  # 生产环境

# 构建 llms.txt（在 build 之后单独执行）
bun run build:llms

# 预览构建产物
bun run preview
```

无测试命令，不需要跑测试。

## 架构概览

这是一个基于 **VitePress 2.0 alpha** 的多语言文档网站，面向 Longbridge 开发者平台（open.longbridge.com）。

### 目录结构

```
docs/
├── .vitepress/
│   ├── config.mts          # VitePress 主配置（含路由重写、HTML 注入）
│   ├── config/
│   │   ├── locales.ts      # 三语言 locale 聚合（en / zh-CN / zh-HK）
│   │   └── markdown.ts     # Markdown 插件注册
│   ├── locales/            # 每个语言的 nav / sidebar / search 配置
│   │   ├── en/
│   │   ├── zh-CN/
│   │   └── zh-HK/
│   ├── theme/
│   │   ├── index.ts        # 主题入口，注册全局组件和 vue-i18n
│   │   ├── components/     # Vue 组件（全局注册，可直接在 md 中使用）
│   │   ├── composables/    # Vue composables
│   │   ├── locales/        # i18n 翻译文件（en.json / zh-CN.json / zh-HK.json）
│   │   └── utils/
│   │       └── gen.ts      # 自动从文件系统生成 sidebar 的核心逻辑
│   ├── md-plugins/         # 自定义 Markdown-it 插件
│   └── utils.ts            # 路由重写逻辑（处理 slug 和语言前缀）
├── en/                     # 英文文档内容
├── zh-CN/                  # 简体中文文档内容
└── zh-HK/                  # 繁体中文文档内容
scripts/                    # 构建脚本（generate-llms.ts、normalize_md.ts 等）
```

### 多语言路由

- **英文**为 root locale（`/docs/...`），文件在 `docs/en/`
- **简中**路径为 `/zh-CN/docs/...`，文件在 `docs/zh-CN/`
- **繁中**路径为 `/zh-HK/docs/...`，文件在 `docs/zh-HK/`
- 路由重写由 `docs/.vitepress/utils.ts` 的 `rewriteMarkdownPath` 处理：支持 frontmatter `slug` 字段做绝对/相对路径覆盖

### Sidebar 自动生成

Sidebar 通过 `docs/.vitepress/theme/utils/gen.ts` 的 `genMarkdowDocs(lang, basePath)` 自动从文件系统读取生成，无需手动维护。控制方式：

- **排序**：frontmatter `sidebar_position` 字段（数字越小越靠前）
- **分类标题**：子目录下的 `_category_.json`（`label`、`position`、`collapsed` 等）
- **自定义链接**：frontmatter `slug` 字段
- **侧边栏图标**：frontmatter `sidebar_icon` 字段（支持 `book`、`zap`、`cpu`、`terminal`、`sparkles`）

### 新增页面流程

每个 `.md` 文件需要在三个语言目录下各有一份（`en/`、`zh-CN/`、`zh-HK/`）。如果只在某个 locale 的 nav 中显示，需要同步修改对应的 `docs/.vitepress/locales/{lang}/nav.ts`。

### 全局 Vue 组件

在 `docs/.vitepress/theme/components/index.ts` 中导出的组件会全局注册，可直接在 Markdown 中以标签形式使用：

- `<Tabs>` / `<TabItem>` — 代码分组标签页
- `<TipContainer>` — 提示框
- `<TryIt>` — API 在线调试
- `<SDKLinks>` / `<SDK>` — SDK 展示
- `<Skill>` — Skills 展示页
- `<HomePage>` — 首页

新增组件需要在 `index.ts` 中 export。

### 私有配套仓库

`../openapi-website-private`（相对本项目）是配套私有仓库，存放不公开的功能实现（如开发者中心）。涉及相关改动时需检查两个仓库是否需要同步。

### 图片/静态资源

静态资源必须上传 CDN 后引用 URL，不要放进项目中。
