### 概述

用于维护 Open API 文档库，目前采用第三方框架 [Docusaurus](https://docusaurus.io/) 构建。

> 文档需要严格遵守以下规范提供内容：
> * 提供多语言版本的文档，目前要支持 en、zh-CN(默认）、zh-HK 三种语言
> * 中文文档放到 docs 目录下，其他语言文档放到 i18n/{lang}/docusaurus-plugin-content-docs/current 目录，结构保持和 docs 一致
> * Markdown 文档需要提供规范的 Meta 信息


#### 文档 Meta 信息

在每个 `.md` 文件的开头添加内容：
```yaml
---
title: "开放平台文档"
id: $category_$file_name # category 指文檔分類 file_name 指文档的文件名以中横线分隔的字符串
slug: "/xxx" # 注意前面必须加上 /， 例如 /trade-order-create 这样的 slug 保持和 id 一致
---
```


#### 文档分类

为了将文档进行分类需要在 docs 中每个子目录添加 _category_.json 配置文件，文件内容如下：

```json5
{
  "position": 1, // 显示的顺序，数字越小越靠前
  "label": "OpenAPI 介绍", // 文档分类名称，显示在左边栏
  "link": {
    "type": "generated-index", // 固定为 generated-index
    "title": "Getting started", // 点击分类时页面的描述信息
    "slug": "/getting-started" // 在浏览器中显示的地址例如： https://open.longbridgeapp.com/docs/getting-started
  }
}
```
示例图
![_category_json 配置效果示例！](https://pub.lbkrs.com/files/202203/HpoXEamnwFUEQg52/20220331-163748.png)
