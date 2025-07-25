---
sidebar: false
title: SDK
description: 支持多种主流编程语言，并提供 SDK
id: sdk
layout: home
---

<SDK />

<div class="border-t-hidden flex flex-col md:flex-row max-w-4xl w-full justify-between md:text-left mx-auto px-6 md:px-0 py-4">
<Tabs groupId="programming-language">
<TabItem value="python" label="Python">

## LongPort OpenAPI SDK for Python

[https://github.com/longportapp/openapi/tree/master/python](https://github.com/longportapp/openapi/tree/master/python)

### 安装 SDK

你可以通过 Pip 安装 SDK，或者直接访问 [PyPI](https://pypi.org/project/longport/) 页面来下载。

```bash
$ pip install longport
```

如遇到网络安装问题，可以尝试：[Aliyun PyPI 镜像](https://mirrors.aliyun.com/pypi/simple)

```bash
$ pip install longport -i https://mirrors.aliyun.com/pypi/simple
```

### API 文档

- https://longportapp.github.io/openapi/python/index.html

</TabItem>
<TabItem value="javascript" label="JavaScript">

## LongPort OpenAPI SDK for Node.js

[https://github.com/longportapp/openapi/tree/master/nodejs](https://github.com/longportapp/openapi/tree/master/nodejs)

### 安装 SDK

你可以通过 Npm 安装 SDK。

```bash
$ npm install longport --save
```

[https://www.npmjs.com/package/longport](https://www.npmjs.com/package/longport)

### API 文档

- https://longportapp.github.io/openapi/nodejs/index.html

</TabItem>
<TabItem value="rust" label="Rust">

## LongPort OpenAPI SDK for Rust

[https://github.com/longportapp/openapi/tree/master/rust](https://github.com/longportapp/openapi/tree/master/rust)

### 安装 SDK

将以下行添加到您的 `Cargo.toml` 文件

```toml
[dependencies]
longport = "2.0.0"
```

[https://crates.io/crates/longport](https://crates.io/crates/longport)

### API 文档

- https://longportapp.github.io/openapi/rust/longport/index.html

</TabItem>
<TabItem value="java" label="Java">

## LongPort OpenAPI SDK for Java

[https://github.com/longportapp/openapi/tree/master/java](https://github.com/longportapp/openapi/tree/master/java)

### 安装 SDK

将以下行添加到您的 `pom.xml` 文件

```xml
<dependency>
  <groupId>io.github.longportapp</groupId>
  <artifactId>openapi-sdk</artifactId>
  <version>LATEST</version>
</dependency>
```

[https://search.maven.org/artifact/io.github.longportapp/openapi](https://search.maven.org/artifact/io.github.longportapp/openapi)

### API 文档

- https://longportapp.github.io/openapi/java/index.html

</TabItem>
<TabItem value="go" label="Go">

## LongPort OpenAPI SDK for Go

[https://github.com/longportapp/openapi-go](https://github.com/longportapp/openapi-go)

### 安装 SDK for Go

Go 版本 >= 1.17

```bash
$ go get github.com/longportapp/openapi-go
```

[https://pkg.go.dev/github.com/longportapp/openapi-go](https://pkg.go.dev/github.com/longportapp/openapi-go)

</TabItem>
<TabItem value="c++" label="C++">

## LongPort OpenAPI SDK for C/C++

[https://github.com/longportapp/openapi/tree/master/cpp](https://github.com/longportapp/openapi/tree/master/cpp)

### 下载地址

- [3.0.5](https://static.lbctrl.com/openapi-sdk/openapi-cpp-sdk-3.0.5.tar.gz)

### API 文档

<a href="https://longportapp.github.io/openapi/cpp/index.html">https://longportapp.github.io/openapi/cpp/index.html</a>
</TabItem>
</Tabs>

</div>

<style scoped>
h2 {
  border: 0;
  margin-top: 0;
  padding-top:0;
}
</style>
