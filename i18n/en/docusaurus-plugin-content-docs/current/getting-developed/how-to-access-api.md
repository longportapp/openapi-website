---
title: How to access an API
id: how-to-access-api
slug: /how-to-access-api
sidebar_position: 1
---

## Pre-Development Notes

| Precautions                                                                                          | Reference Documents                                                             |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| It is recommended to use the SDK of the respective language, instead of calling the native interface | [SDK Quick Start Page](../docs/getting-started)                                 |
| Read the OpenAPI introduction to enable the corresponding service                                    | [How to enable OpenAPI](../docs/#how-to-enable-openapi)                         |
| Read about OpenAPI access and restrictions in OpenAPI Introduction                                   | [OpenAPI's permissions and restrictions](../docs/#permissions-and-restrictions) |
| Common Error Codes for finding errors in interface calls                                             | [Common Error Codes](../docs/error-codes)                                       |

## REST API documentation convention format

The main format of the server REST API documentation is as follows.

```
Request:
    Request Info
    Parameters
    Request Example
Response:
    Response Headers
    Response Example
    Response Status
Response Status
```

### Request Info

This section introduces the request method and path required to call the API.

- HTTP URL: The URL of the server API.
- HTTP Method: The server API only supports HTTP protocol methods, such as GET, POST, etc.

### Parameters

Introduces the request headers, query parameters or request body to be passed to call the API.
:::tip

Parameters are query parameters by default for GET API, parameters are request bodies by default for not GET API, and the request body format is JSON.

:::

### Request Example

Detailed example of calling an interface using the SDK.

### Response

- Response Headers: Returns content header information.
- Response Example: Returns a text example of the content.
- Response Status: Interface returns a specific explanation of the `status` of the content.

## API access process

### 1. Enable OpenAPI service

Refer to [Introduction to OpenAPI](../docs#how-to-enable) to enable the corresponding services.

### 2. Get App Key and Access Token information

Get **Access Token**, **App Key** and **App Secret** on the [Developer Website](https://open.longportapp.com/account).

**Access Token** will expires in three months. Token can be reset in Developer Website after expiration. Also token can be refresh through invoking [Refresh Token](./refresh-token-api) API before token expired.

### 3. Calculate signature

:::tip

Most of the content introduced on this page has been fully implemented in our OpenAPI SDK. If you are an SDK user, you can directly ignore the signature authentication part.

This section is intended as a reference for non-SDK users.

:::

After constructing a request based on an corresponding API documentation, call the API directly through the OpenAPI SDK, which will help generate a signature, or create a signature through the following process.

#### Add `X-Api-Key`、`X-Timestamp`、`Authorization` on headers

Set the request parameter header information, and `X-Api-Key`, `Authorization`, `X-Timestamp` will be used in the signature function.

```python
import time
headers = {}
headers['X-Api-Key'] = '${app_key}'
headers['Authorization'] = '${access_token}'
headers['X-Timestamp' =  str(time.time()) # Unix Timestamp, eg: 1539095200.123
headers['Content-Type'] = 'application/json; charset=utf-8',
```

#### Sign requests

The example of signature function:

```py
# signature function on python3
def sign(method, uri, headers, params, body, secret):
    ts = headers["X-Timestamp"]
    access_token = headers["Authorization"]
    app_key = headers["X-Api-Key"]
    mtd = method.upper()

    canonical_request = mtd + "|" + uri + "|" + params + "|authorization:" + access_token + "\nx-api-key:" + app_key + "\nx-timestamp:" + ts + "\n|authorization;x-api-key;x-timestamp|"

    if body != "":
        payload_hash = hashlib.sha1(body.encode("utf-8")).hexdigest()
        canonical_request = canonical_request + payload_hash

    sign_str = "HMAC-SHA256|" + hashlib.sha1(canonical_request.encode("utf-8")).hexdigest()
    signature = hmac.new(secret.encode('utf-8'), sign_str.encode('utf-8'), digestmod=hashlib.sha256).hexdigest()
    return "HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=" + signature

```

Sign the request and set the signature in the request header `X-Api-Signature`.

```py
# request method
method = "POST"
# request path
uri = "/v1/trade/order/submit"
# request params, for example member_id=1&account_channel=2
params = ""
# request body
body = json.dumps({ "order_id": '683615454870679552' })
# signing requests and set signature it on the X-Api-Signature
headers['X-Api-Signature'] = sign(method, uri, headers, params, body, secret)

```

### 4. Call API

Use the HTTP client to send signed requests.

## API Path

All API paths start with [https://openapi.longportapp.com](https://openapi.longportapp.com).

> TIP: You can also use https://openapi.longportapp.com

## API Request

The call to the server-side interface needs to be in HTTPS protocol, JSON format, and encoded in `UTF-8`.

For a test example:

```bash
curl -v https://openapi.longportapp.com/v1/test \
    -H "X-Api-Signature: {signature}" -H "X-Api-Key: {AppKey}" \
    -H "Authorization: {AccessToken}" -H "X-Timestamp: 1539095200.123"
```

The method of Get Stock Positions interface is `GET` and needs to set query parameters. The example is as follows:

```bash
curl -v https://openapi.longportapp.com/v1/asset/stock?symbol=700.HK&symbol=BABA.US \
    -H "X-Api-Signature: {Signature}" -H "X-Api-Key: {AppKey}" \
    -H "Authorization: {AccessToken}" -H "X-Timestamp: 1539095200.123"
```

The method of Submit Order interface is `POST` and needs to set the request body. The example is as follows:

```bash
curl -v -XPOST https://openapi.longportapp.com/v1/trade/order \
    -d '{ "side": "Buy", symbol": "700.HK", "order_type": "LO", "submitted_price": "50", "submitted_quantity": "200", "time_in_force": " Day", remark": "Hello from Shell"}' \
    -H "X-Api-Signature: {Signature}" -H "X-Api-Key: {AppKey}" \
    -H "Authorization: {AccessToken}" -H "X-Timestamp: 1539095200.123"
    -H "Content-Type: application/json; charset=utf-8"
```

## API Response

All API corresponding body structures consist of `code`, `message`, `data`. `code` is the business code, `message` is the error message, and `data` is the request result.

:::tip
HTTP Status follows [RESTFull style](https://restfulapi.net/http-status-codes) and `code = 0` if the request succeeds, otherwise `code` will describe the specific error code.
:::

### HTTP Status

- 1xx: Informational – Communicates transfer protocol-level information.
- 2xx: Success – Indicates that the client's request was accepted successfully.
- 3xx: Redirection – Indicates that the client must take some additional action in order to complete their request.
- 4xx: Client Error – This category of error status codes points the finger at clients.
- 5xx: Server Error – The server takes responsibility for these error status codes.

For example, the response body of a successful request:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    // ...
  }
}
```

the response body of a failed request:

```json
{
  "code": 403201,
  "msg": "signature invalid"
}
```

## A code demo to call the API

```py
import requests
import json
import time
import hashlib
import hmac

# request information
# request method
method = "POST"
# request path
uri = "/v1/trade/order/submit"
# request params, for example member_id=1&account_channel=2
params = ""
# request body
body = json.dumps({ "order_id": '683615454870679552' })
# request headers
headers = {}
headers['X-Api-Key'] = '${app_key}'
headers['Authorization'] = '${access_token}'
headers['X-Timestamp'] =  str(time.time()) # Unix TimeStamp, eg. 1539095200.123
headers['Content-Type'] = 'application/json; charset=utf-8'

# App Secret
app_secret = "${app_secret}"

## signature function
def sign(method, uri, headers, params, body, secret):
    ts = headers["X-Timestamp"]
    access_token = headers["Authorization"]
    app_key = headers["X-Api-Key"]
    mtd = method.upper()
    canonical_request = mtd + "|" + uri + "|" + params + "|authorization:" + access_token + "\nx-api-key:" + app_key + "\nx-timestamp:" + ts + "\n|authorization;x-api-key;x-timestamp|"
    if body != "":
        payload_hash = hashlib.sha1(body.encode("utf-8")).hexdigest()
        canonical_request = canonical_request + payload_hash
    sign_str = "HMAC-SHA256|" + hashlib.sha1(canonical_request.encode("utf-8")).hexdigest()

    signature = hmac.new(secret.encode('utf-8'), sign_str.encode('utf-8'), digestmod=hashlib.sha256).hexdigest()
    return "HMAC-SHA256 SignedHeaders=authorization;x-api-key;x-timestamp, Signature=" + signature

# set signature header
headers['X-Api-Signature'] = sign(method,  uri, headers, params, body, app_secret)

# call an API
response = requests.request(method, "https://openapi.longportapp.com" + uri + '?' + params, headers=headers, data=body)

print(response.text)

```
