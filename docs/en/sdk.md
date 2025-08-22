---
sidebar: false
title: SDK
description: Supports multiple programming languages and provides SDK
id: sdk
layout: home
---

<SDK />

<div class="border-t-hidden flex flex-col md:flex-row max-w-4xl w-full justify-between md:text-left mx-auto px-6 md:px-0 py-4">
<Tabs groupId="programming-language">
<TabItem value="python" label="Python" default>

## LongPort OpenAPI SDK for Python

[https://github.com/longportapp/openapi/tree/master/python](https://github.com/longportapp/openapi/tree/master/python)

### Install SDK

You can install the SDK via Pip, or directly visit the [PyPI](https://pypi.org/project/longport/) page to download.

```bash
$ pip install longport
```

> NOTE: In macOS system, the `pip` command default is Python 2. You may use `pip3` for use Python 3 version of PyPI.

### API Documents

- https://longportapp.github.io/openapi/python/index.html

</TabItem>
<TabItem value="javascript" label="JavaScript">

## LongPort OpenAPI SDK for Node.js

[https://github.com/longportapp/openapi/tree/master/nodejs](https://github.com/longportapp/openapi/tree/master/nodejs)

### Install SDK

You can install the SDK via Npm.

```bash
$ npm install longport --save
```

[https://www.npmjs.com/package/longport](https://www.npmjs.com/package/longport)

### API Documents

- https://longportapp.github.io/openapi/nodejs/index.html

</TabItem>
<TabItem value="rust" label="Rust">

## LongPort OpenAPI SDK for Rust

[https://github.com/longportapp/openapi/tree/master/rust](https://github.com/longportapp/openapi/tree/master/rust)

### Install SDK

Add the following line to your `Cargo.toml` file

```toml
[dependencies]
longport = "3.0.13"
```

[https://crates.io/crates/longport](https://crates.io/crates/longport)

### API Documents

- https://longportapp.github.io/openapi/rust/longport/index.html

</TabItem>
<TabItem value="java" label="Java">

## LongPort OpenAPI SDK for Java

[https://github.com/longportapp/openapi/tree/master/java](https://github.com/longportapp/openapi/tree/master/java)

### Install SDK

Add the following line to your `pom.xml` file

```xml
<dependency>
  <groupId>io.github.longportapp</groupId>
  <artifactId>openapi-sdk</artifactId>
  <version>LATEST</version>
</dependency>
```

[https://search.maven.org/artifact/io.github.longportapp/openapi](https://search.maven.org/artifact/io.github.longportapp/openapi)

### API Documents

- https://longportapp.github.io/openapi/java/index.html

</TabItem>
<TabItem value="go" label="Go">

## LongPort OpenAPI SDK for Go

[https://github.com/longportapp/openapi-go](https://github.com/longportapp/openapi-go)

### Get SDK for Go

Go version >= 1.17

```bash
$ go get github.com/longportapp/openapi-go
```

[https://pkg.go.dev/github.com/longportapp/openapi-go](https://pkg.go.dev/github.com/longportapp/openapi-go)

</TabItem>
<TabItem value="c++" label="C++">

## LongPort OpenAPI SDK for C/C++

[https://github.com/longportapp/openapi/tree/master/cpp](https://github.com/longportapp/openapi/tree/master/cpp)

### Download

- [3.0.13](https://static.lbctrl.com/openapi-sdk/openapi-cpp-sdk-3.0.13.tar.gz)

### API Documents

- https://longportapp.github.io/openapi/cpp/index.html

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
