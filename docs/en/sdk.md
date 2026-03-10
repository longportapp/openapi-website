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

## Longbridge OpenAPI SDK for Python

[https://github.com/longbridge/openapi/tree/master/python](https://github.com/longbridge/openapi/tree/master/python)

### Install SDK

You can install the SDK via Pip, or directly visit the [PyPI](https://pypi.org/project/longbridge/) page to download.

```bash
$ pip install longbridge
```

> NOTE: In macOS system, the `pip` command default is Python 2. You may use `pip3` for use Python 3 version of PyPI.

### API Documents

- https://longbridge.github.io/openapi/python/index.html

</TabItem>
<TabItem value="javascript" label="JavaScript">

## Longbridge OpenAPI SDK for Node.js

[https://github.com/longbridge/openapi/tree/master/nodejs](https://github.com/longbridge/openapi/tree/master/nodejs)

### Install SDK

You can install the SDK via Npm.

```bash
$ npm install longbridge --save
```

[https://www.npmjs.com/package/longbridge](https://www.npmjs.com/package/longbridge)

### API Documents

- https://longbridge.github.io/openapi/nodejs/index.html

</TabItem>
<TabItem value="rust" label="Rust">

## Longbridge OpenAPI SDK for Rust

[https://github.com/longbridge/openapi/tree/master/rust](https://github.com/longbridge/openapi/tree/master/rust)

### Install SDK

Add the following line to your `Cargo.toml` file

```toml
[dependencies]
longbridge = "4.0.0"
```

[https://crates.io/crates/longbridge](https://crates.io/crates/longbridge)

### API Documents

- https://longbridge.github.io/openapi/rust/longbridge/index.html

</TabItem>
<TabItem value="java" label="Java">

## Longbridge OpenAPI SDK for Java

[https://github.com/longbridge/openapi/tree/master/java](https://github.com/longbridge/openapi/tree/master/java)

### Install SDK

Add the following line to your `pom.xml` file

```xml
<dependency>
  <groupId>io.github.longbridge</groupId>
  <artifactId>openapi-sdk</artifactId>
  <version>4.0.0</version>
</dependency>
```

[https://search.maven.org/artifact/io.github.longbridge/openapi](https://search.maven.org/artifact/io.github.longbridge/openapi)

### API Documents

- https://longbridge.github.io/openapi/java/index.html

</TabItem>
<TabItem value="go" label="Go">

## Longbridge OpenAPI SDK for Go

[https://github.com/longbridge/openapi-go](https://github.com/longbridge/openapi-go)

### Get SDK for Go

Go version >= 1.17

```bash
$ go get github.com/longbridge/openapi-go
```

[https://pkg.go.dev/github.com/longbridge/openapi-go](https://pkg.go.dev/github.com/longbridge/openapi-go)

### Example

Create config with OAuth, then get quote or account balance:

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/longbridge/openapi-go/config"
	"github.com/longbridge/openapi-go/oauth"
	"github.com/longbridge/openapi-go/quote"
)

func main() {
	o := oauth.New("your-client-id").
		OnOpenURL(func(url string) { fmt.Println("Open this URL to authorize:", url) })
	if err := o.Build(context.Background()); err != nil {
		log.Fatal(err)
	}
	conf, err := config.New(config.WithOAuthClient(o))
	if err != nil {
		log.Fatal(err)
	}
	quoteContext, err := quote.NewFromCfg(conf)
	if err != nil {
		log.Fatal(err)
	}
	defer quoteContext.Close()
	ctx := context.Background()
	quotes, err := quoteContext.Quote(ctx, []string{"700.HK", "AAPL.US"})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("quotes: %+v\n", quotes[0])
}
```

</TabItem>
<TabItem value="c++" label="C++">

## Longbridge OpenAPI SDK for C/C++

[https://github.com/longbridge/openapi/tree/master/cpp](https://github.com/longbridge/openapi/tree/master/cpp)

### Download

- [4.0.0](https://static.lbctrl.com/openapi-sdk/openapi-cpp-sdk-4.0.0.tar.gz)

### API Documents

- https://longbridge.github.io/openapi/cpp/index.html

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
