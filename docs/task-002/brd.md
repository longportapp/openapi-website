---
annotations:
  - id: ann_22c778cc
    selector:
      type: TextQuoteSelector
      exact: 章节覆盖完整授权流程，开发者无需查阅其他
    body: '124124124'
    author: human
    status: active
    created_at: 2026-03-05T08:57:43.505484+00:00
  - id: ann_b68a9ba1
    selector:
      type: TextQuoteSelector
      exact: 文档平台（VitePress）的部署流程需纳入发布计划
    body: 用 Bun + VitePress
    author: human
    status: active
    created_at: 2026-03-05T08:58:24.778493+00:00
---

# BRD: 优化 Getting Started 文档的内容

## 1. 背景与目标

**业务背景**：Longbridge Developers 已上线 OAuth 2 认证机制，现有 Getting Started 文档 https://open.longbridge.com/zh-CN/docs/getting-started 中的认证描述基于旧机制，内容零散且与 MCP 文档中已记载的 OAuth 2 内容存在出入，导致开发者在接入时获得不一致的信息。

**核心问题**：

- Getting Started 文档中的认证流程描述未覆盖 OAuth 2 授权码流程，新接入的开发者无法依据文档完成正确的认证配置
- Getting Started 与 MCP 文档在认证描述上存在冲突，增加开发者理解成本
- 文档间缺乏明确的交叉引用，开发者需要在多处文档间自行拼凑完整信息

**预期目标**：

- OAuth 2 相关章节覆盖完整授权流程，开发者无需查阅其他资料即可完成接入
- Getting Started 与 MCP 文档内容一致，不存在相互矛盾的描述
- 文档满意度（如开发者反馈问题数）在发布后 4 周内较改版前下降 30%

---

## 2. 目标用户群体

- **主要用户**：首次接入 Longbridge Developers 的开发者，需要通过 Getting Started 完成环境配置和认证流程
- **次要用户**：已接入的开发者，因 OAuth 2 机制上线需要迁移/更新现有认证实现
- **用户规模估算**：当前 OpenAPI 注册开发者规模，以及 MCP 功能上线后引入的新开发者增量（具体数字依赖平台数据，BRD 阶段暂以"现有注册开发者全量"为基准）

---

## 3. 核心功能描述

### MVP 范围

以下为本次迭代交付内容，聚焦中文版文档的认证流程重构与文档对齐：

- **功能 1：重写认证流程章节**
  - 完整描述 OAuth 2 授权码（Authorization Code）流程，包括：授权端点、回调处理、Token 获取、Token 刷新
  - 明确各流程步骤的请求参数、响应字段及错误处理说明
  - 提供可运行的最小示例（至少一种语言）

- **功能 2：与 MCP 文档内容对齐**
  - 梳理 MCP 文档中已有的认证相关描述，以 MCP 文档为参照对 Getting Started 进行校正
  - 消除两份文档在认证机制、参数名称、流程步骤上的冲突描述

- **功能 3：建立双向引用链接**
  - 在 Getting Started 相关章节添加指向 MCP 文档对应部分的链接
  - 在 MCP 文档对应位置添加指向 Getting Started 的引用（需与 MCP 文档维护方协同）

- **功能 4：清理旧认证描述**
  - 移除或标注已过时的认证内容（非 OAuth 2 的旧认证方式）
  - 如旧方式仍在过渡期支持，需明确标注"废弃时间线"

### 完整版（后续迭代）

- 英文版 Getting Started 文档同步更新
- 其他语言版本适配
- SDK 示例代码（多语言）同步更新，覆盖 OAuth 2 流程
- 交互式 API 调试工具与认证流程的集成说明

---

## 4. 成功指标（AARRR 框架）

- **Acquisition**：文档页面 UV 维持或提升（改版不导致流量下降）
- **Activation**：开发者从阅读 Getting Started 到完成首次 API 调用的转化率，目标较改版前提升 20%
- **Retention**：开发者接入后 30 天内持续调用 API 的比例，目标较改版前持平或提升
- **Revenue**：暂无直接关联；间接指标为接入开发者数量增长（支撑平台交易量）
- **Referral**：开发者在技术社区（如 GitHub、论坛）主动引用/推荐 Getting Started 文档的频次

---

## 5. 风险与依赖

**技术风险**：

- OAuth 2 授权流程的具体实现细节（授权端点、Token 端点的确切参数）需由后端团队提供准确规格，若规格未稳定则文档内容存在返工风险

**合规风险**：

- Token 存储、传输的安全建议需符合平台安全规范，文档中的示例代码不应引导开发者采用不安全的存储方式

**第三方依赖**：

- MCP 文档的维护方需配合完成双向引用的建立，依赖跨团队协同
- 文档平台（VitePress）的部署流程需纳入发布计划

---

## 6. 时间线建议

- **MVP**：3 周
  - 第 1 周：认证流程章节重写、内容对齐
  - 第 2 周：双向引用建立、旧内容清理、内部评审
  - 第 3 周：修订、发布

- **完整版（后续迭代）**：MVP 发布后 2 个月内
  - 英文版及多语言同步
  - SDK 示例代码更新

---

## 7. 参考资料

- 现有 Getting Started 文档：https://open.longbridge.com/zh-CN/docs/getting-started
- MCP 文档（平台内部链接，需补充具体 URL）
- OAuth 2.0 RFC 6749：https://datatracker.ietf.org/doc/html/rfc6749
- 竞品参考：Interactive Brokers API 认证文档、Alpaca Markets OAuth 2 接入说明
