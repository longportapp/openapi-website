## Q1: What languages does Longport OpenAPI support?

A: We provide SDKs in various languages, including Python, Rust, Go, Node.js, Java, C, and C++. If these SDKs do not meet your needs, you can still integrate by directly calling the native APIs.

## Q2: Is it necessary to open a live account to use Longport OpenAPI?

A: Not necessarily. You can also debug the Longport OpenAPI by using a paper account to access market data and trading interfaces.

## Q3: How can I debug using a paper account?

A: You can open a paper account through the mobile app or the Longport OpenAPI developer center. After obtaining the corresponding App Key/Secret and Access Token, you can directly call the market data and trading interfaces for debugging.

## Q4: Are the market data and trading permissions the same for paper account debugging as for live accounts?

A: The market data permissions are the same, but the trading permissions are different. Paper and live accounts share the same App Key & Secret but have different Access Tokens. Market data permissions are associated with the App Key & Secret, while trading permissions are associated with the Access Token. Therefore, the market data permissions are the same for both paper and live accounts, but the trading permissions may differ based on seperate accounts.

## Q5: What markets and instruments are supported for market data and trading in paper accounts?

A: Market Data:

Supports real-time market data for Hong Kong stocks, US stocks, and A-share markets. Advanced market data such as full US market data and Hong Kong Level 2 data can be purchased through the online market data store and accessed via OpenAPI after acquiring the corresponding market data rights.

Trading:

Supports trading of Hong Kong and US stocks, ETFs, and Hong Kong warrants. Short selling is supported for US stocks. However, OTC trading, pre-market, after-hours trading, and options trading are not supported in paper accounts.

## Q6: What are the frequency limits for API calls?

A: Market-related APIs:

Only one long connection can be established per account, with a maximum of 500 subscriptions at the same time.

Up to 10 calls within 1 second, with a maximum of 5 concurrent requests.

Trading-related APIs:

Up to 30 calls within 30 seconds, with an interval of at least 0.02 seconds between each call.

## Q7: How are API call limits handled for multiple accounts?

A: If a customer holds multiple securities accounts, such as day trading or other sub-accounts, the frequency and quantity limits for trading APIs are counted and controlled separately for each securities account. However, market data APIs are not affected by multiple accounts and are subject to unified limits.

## Q8: Is there an additional charge for trading operations via OpenAPI?

A: All operations through OpenAPI are free, including accessing OpenAPI SDK or directly calling the native APIs for querying, subscribing, placing orders, etc..
