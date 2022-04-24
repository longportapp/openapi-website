---
title: 如何对请求签名 
id: access-token-and-signature
slug: /access-token-and-signature
---

## 介绍
  为了保证安全，我们会对所有请求做签名验证，这里会介绍应该如何对请求进行正确的签名。当然如果使用 sdk 访问 api，将无需关心签名过程。
  
## 请求的签名流程
  - 创建请求请求描述
  - 使用请求描述和额外的元数据生成签名字符串
  - 使用 api secret key 对字符串进行签名
  - 把签名放到请求头中

## 示例请求 
```
POST https://openapi.longbridge.sg/example/first\ and\ second?action=test&size=123 HTTP/1.1
Host openapi.longbridge.sg
Content-Type application/json
X-Timestamp 1639021402940.728
X-Api-Key {这里是 access key} 
Authorization {这里是 token}
{"foo":"bar"}

```

## 创建请求描述
为了便于在文档中描述签名的具体规则，我们使用伪代码描述如何创建请求描述。
```
CanonicalRequest =
  HTTPRequestMethod + '|' +
  CanonicalURI + '|' +
  CanonicalQueryString + '|' +
  CanonicalHeaders + '|' +
  SignedHeaders + '|' +
  HexEncode(Hash(RequestPayload))
```

### HttpRequestMethod 方法名
`POST`

#### CanonicalURI  请求路径
`/example/first\ and\ second`

#### CanonicalQueryString 加签请求参数
`action=test&size=123`

#### CanonicalHeaders 加签请求头部详情
```
CanonicalHeaders =
CanonicalHeadersEntry0 + CanonicalHeadersEntry1 + ... + CanonicalHeadersEntryN
CanonicalHeadersEntry =
Lowercase(HeaderName) + ':' + TrimSpace(HeaderValue) + '\n'
```
这里 header 是以下固定的三个：
- authorization
- x-api-key
- x-timestamp
---
**NOTE**
顺序由 SignedHeaders 决定
---
CanonicalHeaders 例子：
```
Authorization:{这里是 token}\n
x-api-key:xxx\n
x-timestamp:1639021402940.728\n
```

#### SignedHeaders 头部签名字段
用来加签的请求头，同样需要按字母表排序
```
SignedHeaders =
Lowercase(HeaderName0) + ';' + Lowercase(HeaderName1) + ";" + ... + Lowercase(HeaderNameN)
```
SignedHeaders 示例：
```
authorization;x-api-key;x-timestamp
```

#### HexEncode(Hash(RequestPayload)) 请求内容的 hash 值
Hash 使用 sha1 
```
// HexEncode(Hash(`{"foo":"bar"}`))
a5e744d0164540d33b1d7ea616c28f2fa97e754a
```

---
**NOTE**
当 Payload 不为空时需要 hash。并且 Hash 都用小写的 16 进制
---

#### CanonicalRequest 请求描述
我们将前面生成的例子结果合并起来就是
```
GET|/example/first and second|action=test&size=123|authorization:xxx|
x-api-key:xxx|x-timestamp:1639021402940.728|authorization;x-api-key;x-timestamp
|a5e744d0164540d33b1d7ea616c28f2fa97e754a

```

### 创建加签字符串

生成加签字符串伪代码为
```
StringToSign = Algorithm|HashedCanonicalRequest
```
支持的加签名算法
- HMAC-MD5
- HMAC-SHA1
- HMAC-SHA256

如果我们想使用 HMAC-SHA256 算法对示例请求加签，那么 Algorithm 设置为 HMAC-SHA256

我们对请求描述 `CanonicalRequest` 进行 SHA1 hash，得到：
`0e3de7dd1fd206284395484504660272f91d24cc`

加签字符串 `HashedCanonicalRequest` 为 
```
HMAC-SHA256|0e3de7dd1fd206284395484504660272f91d24cc
```

### 使用 api secret key 对字符串进行签名

假设 api secret key 为 `1c1ca804eb3f2ac9f13d88da958e73a8d3ead1450f8ca2707a834709b1382e2d`， 签名算法为

```
HMAC(HMAC-SHA256|0e3de7dd1fd206284395484504660272f91d24cc, 1c1ca804eb3f2ac9f13d88da958e73a8d3ead1450f8ca2707a834709b1382e2d)
```

计算结果为 `e8ae6b1d962d4e3218fa605d6fdd23107a94a985d62f8ab2903091098e9b09f6`。

请求中添加签名，格式为：
```
X-Api-Signature: $algorithm SignedHeaders=$SignedHeaders, Signature=$Signature
```

示例结果为：
```
X-Api-Signature: HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=091751bfa20a96f0441698c0d040bf8a6c43f15874e48e489b3e098f354422a9
```

### 加签过后的请求

```
POST https://openapi.longbridge.sg/example/first\ and\ second?action=test&size=123 HTTP/1.1
Host openapi.longbridge.sg
Content-Type application/json
Authorization {这里是 token}
X-Timestamp 1639021402940.728
X-Api-Key {这里是 access key} 
X-Api-Signature: HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=091751bfa20a96f0441698c0d040bf8a6c43f15874e48e489b3e098f354422a9
{"foo":"bar"}

```
使用最终加签过后的请求，将成功访问 api。 
