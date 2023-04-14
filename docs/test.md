### 性能和体验

**Native** - In order to provide a better experience for client-side users, we use a Native UI development framework and high-performance cross-platform Rust or C++ technology for high-frequency data processing logic. This allows us to develop experiences that are more aligned with the native characteristics of various devices and corresponding operating systems, as well as providing better performance. Our app page performance baseline is set at 50 FPS or above.

**H5** - 部分非核心交易、带行情的场景（例如开户、出金入金、银行卡管理、股票转入转出）UI 采用 H5 开发，以提升开发效率，以及业务逻辑更新及时性。

通过 H5 开发，能让 iOS, Android 共享功能，减少重复开发（此外我们目前正常尝试将此类 H5 功能应用到桌面端）

H5 Runtime Container - 让 H5 与 Native 无缝互通（Session、Token、Theme、Language 等），并且为 H5 提供 Native API（例如拍照、录视频等）

我们设计资源离线机制，在需要动态更新、高频使用场景，预置离线包，预加载 WebView，使 H5 应用拥有媲美 Native 的加载速度。

**数据离线策略** - 根据数据特性设定缓存、离线策略（离线优先 / 网络优先 / 定期更新），覆盖一级、二级，以及部分三级页面，确保 App 开启有机制的加载速度。社区、资讯阅读页面离线优化 (1s 内打开，行业领先），列表预先加载，等用户点的时候数据已经准备好了。

### 质量和稳定性

自建性能埋点跟踪体系，全方面覆盖用户使用体验指标（API 性能、UI 渲染、WebSocket 性能、用户行为），收集到服务端，并通过 Grafana 以报表的方式展示出来用于日常性能分析与客户问题定位。

通过部署 Crash 跟踪服务，全方位监测用户使用 App 过程中碰到的质量问题，包含 Crash、卡顿，OOM 等问题，并且专人跟进，目前已经达到了 Crash 率 0.5‰（万分之五）的业界领先水平。

### 架构

整个 App 均模块化和组件化方式构建，以路由（URL Schema）方式联接起来，从而在开发上更加独立和快捷，在部署上更加灵活和方便，在 App 中的大量场景均可实现动态化配置，使运营可以更方便地根据当前运营热点变更页面中区域顺序、频道顺序、页面内容等。

App 整体也经过了完整的 SaaS 化改造，各个模块和功能均可以根据租户的需求灵活配置，实现在不改动代码的情况下，按需定制，按需打包。