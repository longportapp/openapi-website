import fs from 'fs-extra'
import path from 'path'
import { globSync } from 'glob'
import { rewriteMarkdownPath } from '../docs/.vitepress/utils'

type Locale = 'en' | 'zh-CN' | 'zh-HK'

/**
 * Process Markdown file
 * @param filePath file path
 * @param outputPath output path
 * @param locale locale for the file
 */
function processMarkdownFile(filePath: string, outputPath: string, locale: Locale, docsDir: string): void {
  let content = fs.readFileSync(filePath, 'utf-8')

  // Parse SDKLinks elements and replace them
  // Need to implement regex to match <SDKLinks ... /> tags and replace with Markdown tables
  content = parseSDKLinks(content, locale)

  const relativePath = path.relative(docsDir, filePath)

  const rewritePath = rewriteMarkdownPath(relativePath)
  // console.log(`rewritePath: ${relativePath} -> ${rewritePath}`)

  // Use the final determined filename
  const finalFilePath = path.join(outputPath, rewritePath)

  fs.ensureDirSync(path.dirname(finalFilePath))

  fs.writeFileSync(finalFilePath, content, { encoding: 'utf-8' })
}

/**
 * Main function
 */
function main(): void {
  const rootDir = process.cwd()
  const docsDir = path.join(rootDir, 'docs')
  const outputDir = path.join(rootDir, 'docs/.vitepress/dist')

  // Process Markdown files in docs directory

  // Process Markdown files in i18n directory
  const locales = fs.readdirSync(docsDir)
  locales.forEach((locale: string) => {
    if (!['en', 'zh-CN', 'zh-HK'].includes(locale)) {
      return
    }
    const localeDocsDir = path.join(docsDir, locale)
    if (fs.existsSync(localeDocsDir)) {
      const localeFiles = globSync('**/*.md', { cwd: localeDocsDir })
      localeFiles.forEach((file: string) => {
        const inputPath = path.join(localeDocsDir, file)
        processMarkdownFile(inputPath, outputDir, locale as Locale, docsDir)
      })
    }
  })
  console.log('Processing completed!')
}

/**
 * Parse SDKLinks tags and replace with corresponding Markdown tables
 * @param content Markdown file content
 * @param locale locale for table headers
 * @returns Processed content
 */
function parseSDKLinks(content: string, locale: Locale): string {
  // Match tags in format <SDKLinks module="xxx" klass="xxx" method="xxx" go="xxx" java="xxx" />
  const sdkLinksRegex =
    /<SDKLinks\s+(?:module="([^"]+)"\s+)?(?:klass="([^"]+)"\s+)?method="([^"]+)"(?:\s+go="([^"]+)")?(?:\s+java="([^"]+)")?(?:\s+level="([^"]+)")?(?:\s+title="([^"]+)")?\s*\/>/g

  // snakeCase: e.g. "GetHistory" -> "get_history"
  const snakeCase = (str: string): string => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  }
  // camelCase: e.g. "get_history" -> "getHistory"
  const camelCase = (str: string): string => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
  }
  // C++ Doxygen class page slug (snake_case class name, no leading underscore)
  const cppClassSlug = (k: string) => snakeCase(k).replace(/^_/, '')

  const JAVA_METHOD_MAP: Record<string, string> = {
    subscribe: 'subscribe',
    unsubscribe: 'unsubscribe',
    replace_order: 'replaceOrder',
    submit_order: 'submitOrder',
    cancel_order: 'cancelOrder',
    warrant_list: 'queryWarrantList',
    create_watchlist_group: 'createWatchlistGroup',
    delete_watchlist_group: 'deleteWatchlistGroup',
    update_watchlist_group: 'updateWatchlistGroup',
    set_on_quote: 'setOnQuote',
    set_on_depth: 'setOnDepth',
    set_on_brokers: 'setOnBrokers',
    set_on_trades: 'setOnTrades',
    subscriptions: 'getSubscrptions',
  }

  const JAVA_ANCHOR_MAP: Record<string, string> = {
    getStaticInfo: 'getStaticInfo(java.lang.String[])',
    getQuote: 'getQuote(java.lang.String[])',
    getParticipants: 'getParticipants()',
    getTrades: 'getTrades(java.lang.String,int)',
    subscribe: 'subscribe(java.lang.String[],int)',
    unsubscribe: 'unsubscribe(java.lang.String[],int)',
    getWatchlist: 'getWatchlist()',
    createWatchlistGroup: 'createWatchlistGroup(com.longbridge.quote.CreateWatchlistGroup)',
    deleteWatchlistGroup: 'deleteWatchlistGroup(com.longbridge.quote.DeleteWatchlistGroup)',
    updateWatchlistGroup: 'updateWatchlistGroup(com.longbridge.quote.UpdateWatchlistGroup)',
    getBrokers: 'getBrokers(java.lang.String)',
    getDepth: 'getDepth(java.lang.String)',
    getCalcIndexes: 'getCalcIndexes(java.lang.String[],com.longbridge.quote.CalcIndex[])',
    getCandlesticks: 'getCandlesticks(java.lang.String,com.longbridge.quote.Period,int,com.longbridge.quote.AdjustType,com.longbridge.quote.TradeSessions)',
    getCapitalFlow: 'getCapitalFlow(java.lang.String)',
    getCapitalDistribution: 'getCapitalDistribution(java.lang.String)',
    getHistoryCandlesticksByOffset: 'getHistoryCandlesticksByOffset(java.lang.String,com.longbridge.quote.Period,com.longbridge.quote.AdjustType,boolean,java.time.LocalDateTime,int,com.longbridge.quote.TradeSessions)',
    getHistoryCandlesticksByDate: 'getHistoryCandlesticksByDate(java.lang.String,com.longbridge.quote.Period,com.longbridge.quote.AdjustType,java.time.LocalDate,java.time.LocalDate,com.longbridge.quote.TradeSessions)',
    getHistoryMarketTemperature: 'getHistoryMarketTemperature(com.longbridge.Market,java.time.LocalDate,java.time.LocalDate)',
    getSecurityList: 'getSecurityList(com.longbridge.Market,com.longbridge.quote.SecurityListCategory)',
    getMarketTemperature: 'getMarketTemperature(com.longbridge.Market)',
    getSubscrptions: 'getSubscrptions()',
    getOptionQuote: 'getOptionQuote(java.lang.String[])',
    getWarrantQuote: 'getWarrantQuote(java.lang.String[])',
    getOptionChainExpiryDateList: 'getOptionChainExpiryDateList(java.lang.String)',
    getOptionChainInfoByDate: 'getOptionChainInfoByDate(java.lang.String,java.time.LocalDate)',
    getWarrantIssuers: 'getWarrantIssuers()',
    queryWarrantList: 'queryWarrantList(com.longbridge.quote.QueryWarrantOptions)',
    getTradingSession: 'getTradingSession()',
    getTradingDays: 'getTradingDays(com.longbridge.Market,java.time.LocalDate,java.time.LocalDate)',
    getIntraday: 'getIntraday(java.lang.String,com.longbridge.quote.TradeSessions)',
    setOnQuote: 'setOnQuote(com.longbridge.quote.QuoteHandler)',
    setOnDepth: 'setOnDepth(com.longbridge.quote.DepthHandler)',
    setOnBrokers: 'setOnBrokers(com.longbridge.quote.BrokersHandler)',
    setOnTrades: 'setOnTrades(com.longbridge.quote.TradesHandler)',
    getHistoryExecutions: 'getHistoryExecutions(com.longbridge.trade.GetHistoryExecutionsOptions)',
    getTodayExecutions: 'getTodayExecutions(com.longbridge.trade.GetTodayExecutionsOptions)',
    getHistoryOrders: 'getHistoryOrders(com.longbridge.trade.GetHistoryOrdersOptions)',
    getTodayOrders: 'getTodayOrders(com.longbridge.trade.GetTodayOrdersOptions)',
    replaceOrder: 'replaceOrder(com.longbridge.trade.ReplaceOrderOptions)',
    submitOrder: 'submitOrder(com.longbridge.trade.SubmitOrderOptions)',
    cancelOrder: 'cancelOrder(java.lang.String)',
    getAccountBalance: 'getAccountBalance()',
    getCashFlow: 'getCashFlow(com.longbridge.trade.GetCashFlowOptions)',
    getFundPositions: 'getFundPositions(com.longbridge.trade.GetFundPositionsOptions)',
    getStockPositions: 'getStockPositions(com.longbridge.trade.GetStockPositionsOptions)',
    getMarginRatio: 'getMarginRatio(java.lang.String)',
    getOrderDetail: 'getOrderDetail(java.lang.String)',
    getEstimateMaxPurchaseQuantity: 'getEstimateMaxPurchaseQuantity(com.longbridge.trade.EstimateMaxPurchaseQuantityOptions)',
  }

  return content.replace(
    sdkLinksRegex,
    (module = 'quote', klass = 'QuoteContext', method: string, go?: string, java?: string, title = 'SDK'): string => {
      const snakeMethod = snakeCase(method)
      const camelMethod = camelCase(method)
      const capitalizedMethod = camelMethod.charAt(0).toUpperCase() + camelMethod.slice(1)
      const getPrefixedMethod = `get${capitalizedMethod}`
      const methodGo = go || capitalizedMethod
      const methodJava = java ?? JAVA_METHOD_MAP[method] ?? getPrefixedMethod
      const javaAnchorRaw = JAVA_ANCHOR_MAP[methodJava] ?? methodJava
      const javaAnchor = encodeURIComponent(javaAnchorRaw)

      const links: { title: string; label: string; url: string }[] = [
        {
          title: 'Python',
          label: `longbridge.openapi.${klass}.${snakeMethod}`,
          url: `https://longbridge.github.io/openapi/python/reference_all/#longbridge.openapi.${klass}.${snakeMethod}`,
        },
        {
          title: 'Rust',
          label: `longbridge::${module}::${klass}#${snakeMethod}`,
          url: `https://longbridge.github.io/openapi/rust/longbridge/${module}/struct.${klass}.html#method.${snakeMethod}`,
        },
        {
          title: 'Go',
          label: `${klass}.${methodGo}`,
          url: `https://pkg.go.dev/github.com/longbridge/openapi-go/${module}#${klass}.${methodGo}`,
        },
        {
          title: 'Node.js',
          label: `${klass}#${camelMethod}`,
          url: `https://longbridge.github.io/openapi/nodejs/classes/${klass}.html#${camelMethod.toLowerCase()}`,
        },
        {
          title: 'Java',
          label: `${klass}.${methodJava}`,
          url: `https://longbridge.github.io/openapi/java/com/longbridge/${module}/${klass}.html#${javaAnchor}`,
        },
        {
          title: 'C++',
          label: `longbridge::${module}::${klass}`,
          url: `https://longbridge.github.io/openapi/cpp/classlongbridge_1_1${module}_1_1_${cppClassSlug(klass)}.html`,
        },
      ]

      // Generate Markdown table
      let tableHeader = ''
      if (locale === 'en') {
        tableHeader = `\n## ${title}\n\n| Language | Link |\n|---|---|`
      } else if (locale === 'zh-HK') {
        tableHeader = `\n## ${title}\n\n| 語言 | 鏈接 |\n|---|---|`
      } else {
        // Default to simplified Chinese
        tableHeader = `\n## ${title}\n\n| 语言 | 链接 |\n|---|---|`
      }

      let tableContent = tableHeader
      links.forEach((item) => {
        tableContent += `\n| ${item.title} | [${item.label}](${item.url}) |`
      })

      return tableContent
    }
  )
}
// call main function
main()
