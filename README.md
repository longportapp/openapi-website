LongPort OpenAPI Documentation

https://open.longportapp.com

## CONTRIBUTING

请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 文档。

Please following the [CONTRIBUTING.md](./CONTRIBUTING.md) document.

## Style Guide

### 文档需要遵守以下规范：

- 遵循中英文书写规范，中英文加空格间隔，正确使用标点符号，正确用词，精确专业术语用词、大小写。
- Longbridge 员工请阅读内部：[文案书写指导](https://longbridge.feishu.cn/wiki/wikcnqOEWHe43bdSLMP0S42vvvg) 与 [Open API 接口规范](https://longbridge.feishu.cn/wiki/wikcnb0RtZ8OEuAodGBXaOL6Nxh)。
- Markdown 文档需要提供规范的 Meta 信息。

### Markdown Meta 信息格式

> 只针对非 Swagger 生成的 Markdown 文档

在每个 `.md` 文件的开头添加内容（示例）：

```yml
---
title: '开放平台文档标题'
id: $category_$file_name # category 指文檔分類 file_name 指文档的文件名以中横线分隔的字符串
slug: '/xxx' # 注意前面必须加上 /，例如 /trade-order-create 这样的 slug 保持和 id 一致
sidebar_position: 1 // 显示的顺序，数字越小越靠前
---
```

#### Markdown 文档分类

> 只针对非 Swagger 生成的 Markdown 文档

为了将文档进行分类需要在 docs 中每个子目录添加 _category_.json 配置文件，文件内容如下：

```json5
{
  position: 1, // 显示的顺序，数字越小越靠前
  label: 'OpenAPI 介绍', // 文档分类名称，显示在左边栏
  link: null,
}
```

#### 特别提示

Markdown 涉及到的静态资源例如：图片、视频等都需要上传到 CDN 再引用，不要放到项目中引用。

不推荐的写法（这样定义会导致加载资源失败的情况）

```md
![流程图片](../../static/xxxx.png)
```

推荐的写法（从后台上传到 CDN 拿到 CDN 地址，然后在 Markdown 中引用）

```md
![流程图片](https://pub.lbkrs.com/xxx/xxx.png)
```

> Before commit you should be run `autocorrect --fix .` first
> [How to use autocorrect](https://github.com/huacnlee/autocorrect)
