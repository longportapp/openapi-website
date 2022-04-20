---
title: API 访问凭证与签名
id: access-token-and-signature
slug: /access-token-and-signature
---

### 签名流程
  - 创建请求请求描述
  - 使用请求描述和额外的元数据生成签名字符串
  - 使用 api secret key 对字符串进行签名
  - 把签名放到请求头中

### 例子
```
POST https://openapi.lbkrs.com/example/first\ and\ second?action=test&size=123 HTTP/1.1
Host openapi.lbkrs.com
Content-Type application/json
X-Timestamp 1639021402940.728
X-Api-Key {这里是 access key} 
Authorization {这里是 token}
{"foo":"bar"}

```

### 创建请求描述
伪代码
```
CanonicalRequest =
  HTTPRequestMethod + '|' +
  CanonicalURI + '|' +
  CanonicalQueryString + '|' +
  CanonicalHeaders + '|' +
  SignedHeaders + '|' +
  HexEncode(Hash(RequestPayload))
```


#### HttpRequest Method
POST
#### CanonicalURI
/example/first\ and\ second

#### CanonicalQueryString
action=test&size=123

#### CanonicalHeaders
```
CanonicalHeaders =
CanonicalHeadersEntry0 + CanonicalHeadersEntry1 + ... + CanonicalHeadersEntryN
CanonicalHeadersEntry =
Lowercase(HeaderName) + ':' + TrimSpace(HeaderValue) + '\n'
```

这里和 aws signature v4 不同，这里我们只使用固定的几个 headers。请求会经过中间层，比如 cdn 可能会在请求头上添加一些其他内容
```
- authorization
- x-api-key
- x-timestamp
```
---
**NOTE**
顺序由 SignedHeaders 决定
---
CanonicalHeaders 例子：
```
x-api-key:xxx\n
x-timestamp:1639021402940.728\n
Authorization {这里是 token}
```

#### SignedHeaders
用来加签的请求头，同样需要按字母表排序
```
SignedHeaders =
Lowercase(HeaderName0) + ';' + Lowercase(HeaderName1) + ";" + ... + Lowercase(HeaderNameN)
```
SignedHeaders 例子:
```
x-api-key;x-timestamp;authorization
```

HexEncode(Hash(payload))
Hash 使用 sha1 
```
// HexEncode(Hash(`{"foo":"bar"}`))
a5e744d0164540d33b1d7ea616c28f2fa97e754a
```

---
**NOTE**
当 Payload 不为空时需要 hash。并且 Hash 都用小写的 16 进制
---

#### 请求描述
我们将前面生成的例子结果合并起来就是
```
GET|/example/first and second|action=test&size=123|x-api-key:xxx
x-timestamp:1639021402940.728
|x-api-key;x-timestamp|a5e744d0164540d33b1d7ea616c28f2fa97e754a

```


### 创建加签字符串
StringToSign = Algorithm|HashedCanonicalRequest

支持的加签名算法
- HMAC-MD5
- HMAC-SHA1
- HMAC-SHA256

例子中我们使用 HMAC-SHA256，那么 Algorithm 就是 HMAC-SHA256

我们对请求描述进行 SHA1 hash，得到：
`0e3de7dd1fd206284395484504660272f91d24cc`

加签字符串为 
```
HMAC-SHA256|0e3de7dd1fd206284395484504660272f91d24cc
```

### 使用 api secret key 对字符串进行签名

这里使用的 secret 为 `1c1ca804eb3f2ac9f13d88da958e73a8d3ead1450f8ca2707a834709b1382e2d`

```
HMAC(HMAC-SHA256|0e3de7dd1fd206284395484504660272f91d24cc, 1c1ca804eb3f2ac9f13d88da958e73a8d3ead1450f8ca2707a834709b1382e2d)
```

结果为
`e8ae6b1d962d4e3218fa605d6fdd23107a94a985d62f8ab2903091098e9b09f6``


请求中添加签名
格式
```
X-Api-Signature: $algorithm SignedHeaders=$SignedHeaders, Signature=$Signature
```

例子的结果为：
```
X-Api-Signature: HMAC-SHA256 SignedHeaders=x-api-key;x-timestamp, Signature=091751bfa20a96f0441698c0d040bf8a6c43f15874e48e489b3e098f354422a9
```


