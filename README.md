Longbridge Open API [docs](https://open.longbridgeapp.com/)

#### 本地开发环境搭建

```shell
# 安装依赖
$ yarn

# 启动 docusaurus 服务
$ yarn dev

# 启动监听 swagger 文档转成 markdown 文件服务
$ yarn dev:swagger
```

### 目录结构

```shell
.
├── README.md
├── convert-md.js // 将 swagger 文档转换为 markdown 的脚本文件
├── docs // 所有文档都在这个目录下
├── swagger-docs // 所有 swagger 文档都在这个目录
├── templates // swagger 文档转换成 markdown 模板配置文件
├── docusaurus.config.js // 一般情况下不用修改
├── i18n // 多语言配置文件
├── sidebars.js // 文档侧边栏配置文件
├── src // 一般不用修复个目录文件。
├── tsconfig.json
├── package.json
∟── yarn.lock
```

### 文档编写

#### Swagger 格式文档

> 支持在线编辑 [Swagger Editor](https://editor.swagger.io/) 将编辑后的文档拷贝到 `swagger-docs` 对应目录下

[Swagger 文档规范](https://swagger.io/specification/)

#### Markdown 格式文档

[Open API 文档规范](https://longbridge.feishu.cn/wiki/wikcnb0RtZ8OEuAodGBXaOL6Nxh)

### 项目依赖

项目目前采用第三方框架 [Docusaurus](https://docusaurus.io/) 构建

> 文档需要遵守以下规范：
>
> - 文档规范 https://longbridge.feishu.cn/wiki/wikcnb0RtZ8OEuAodGBXaOL6Nxh#
> - Markdown 文档需要提供规范的 Meta 信息

#### Markdown Meta 信息格式

> 只针对非 swagger 生成的 markdown 文档

在每个 `.md` 文件的开头添加内容（示例）：

```yaml
---
title: '开放平台文档标题'
id: $category_$file_name # category 指文檔分類 file_name 指文档的文件名以中横线分隔的字符串
slug: '/xxx' # 注意前面必须加上 /， 例如 /trade-order-create 这样的 slug 保持和 id 一致
---
```

#### Markdown 文档分类

> 只针对非 swagger 生成的 markdown 文档

为了将文档进行分类需要在 docs 中每个子目录添加 _category_.json 配置文件，文件内容如下：

```json5
{
  position: 1, // 显示的顺序，数字越小越靠前
  label: 'Open API 介绍', // 文档分类名称，显示在左边栏
  link: {
    title: 'Getting started', // 点击分类时页面的描述信息
    slug: '/getting-started', // 在浏览器中显示的地址例如： https://open.longbridgeapp.com/docs/getting-started
  },
}
```

#### 特别提示

Markdown 涉及到的静态资源例如：图片、视频等都需要上传到 CDN 再引用，不要放到项目中引用。

不推荐的写法（这样定义会导致加载资源失败的情况）

```markdown
![流程图片](../../static/xxxx.png)
```

推荐的写法（从后台上传到 CDN 拿到 CDN 地址，然后在 Markdown 中引用）

```markdown
![流程图片](https://pub.lbkrs.com/xxx/xxx.png)
```

> Before commit you should be run `autocorrect --fix .` first
> [How to use autocorrect](https://github.com/huacnlee/autocorrect)
