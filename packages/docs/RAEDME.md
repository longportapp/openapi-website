# vitepress 常用语法

- `// [!code focus]` 可以使得代码块聚焦某一行
- `ts{2-3,5}` 使得第 2-3 行和第 5 行显示高亮
- 在某一行上添加 `// [!code --]` 或 `// [!code ++]` 注释将创建该行的差异，同时保留代码块的颜色
  - `// [!code warning]` 或 `// [!code error]` 错误和警告
- `::: code-group` 实现代码组
- `:::tabs key:language` 实现记忆组切换
