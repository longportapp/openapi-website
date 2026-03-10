<template>
  <div>
    <h2 v-if="title && level === 2">{{ title }}</h2>
    <h3 v-else-if="title && level === 3">{{ title }}</h3>
    <h4 v-else-if="title && level === 4">{{ title }}</h4>
    <h5 v-else-if="title && level === 5">{{ title }}</h5>

    <table class="table block">
      <tbody>
        <tr v-for="link in links" :key="link.title">
          <td class="w-25 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)]">
            <div class="flex items-center gap-2 text-sm text-[var(--vp-c-text-1)]">
              <div class="inline-block w-2 h-2 rounded-sm" :style="{ backgroundColor: link.color }"></div>
              <div>{{ link.title }}</div>
            </div>
          </td>
          <td
            class="whitespace-nowrap overflow-hidden text-ellipsis bg-[var(--vp-c-bg)] border border-[var(--vp-c-divider)]">
            <a :href="link.url" target="_blank" class="text-[var(--vp-c-brand-1)] no-underline">
              {{ link.label }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  module?: 'quote' | 'trade'
  klass?: 'QuoteContext' | 'TradeContext'
  method: string
  go?: string
  java?: string
  level?: number
  title?: string | boolean
}

const props = withDefaults(defineProps<Props>(), {
  module: 'quote',
  level: 2,
  title: 'SDK Links',
})

const snakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

// C++ Doxygen class page: longbridge_1_1{module}_1_1_{class_snake}.html
const cppClassSlug = computed(() => snakeCase(props.klass ?? 'QuoteContext').replace(/^_/, ''))
const cppClassUrl = computed(
  () =>
    `https://longbridge.github.io/openapi/cpp/classlongbridge_1_1${props.module}_1_1_${cppClassSlug.value}.html`
)

const camelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

const snakeMethod = computed(() => snakeCase(props.method))
const camelMethod = computed(() => camelCase(props.method))
const capitalizedMethod = computed(() => camelMethod.value.charAt(0).toUpperCase() + camelMethod.value.slice(1))
const getPrefixedMethod = computed(() => `get${capitalizedMethod.value}`)

const methodGo = computed(() => props.go || capitalizedMethod.value)

// Map doc method (snake_case) to Java method name; default is get + Capitalized(camelCase)
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

const methodJava = computed(() => props.java ?? JAVA_METHOD_MAP[props.method] ?? getPrefixedMethod.value)

// Javadoc HTML id format: methodName(paramType1,paramType2,...) — from longbridge Java doc pages
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

const javaAnchor = computed(() => {
  const anchor = JAVA_ANCHOR_MAP[methodJava.value] ?? methodJava.value
  return encodeURIComponent(anchor)
})

const links = computed(() => {
  const baseLinks = [
    {
      title: 'Python',
      color: '#3572a5',
      label: `longbridge.openapi.${props.klass}.${snakeMethod.value}`,
      url: `https://longbridge.github.io/openapi/python/reference_all/#longbridge.openapi.${props.klass}.${snakeMethod.value}`,
    },
    {
      title: 'Rust',
      color: '#dea584',
      label: `longbridge::${props.module}::${props.klass}#${snakeMethod.value}`,
      url: `https://longbridge.github.io/openapi/rust/longbridge/${props.module}/struct.${props.klass}.html#method.${snakeMethod.value}`,
    },
    {
      title: 'Go',
      color: '#00ADD8',
      label: `${props.klass}.${methodGo.value}`,
      url: `https://pkg.go.dev/github.com/longbridge/openapi-go/${props.module}#${props.klass}.${methodGo.value}`,
    },
    {
      title: 'Node.js',
      color: '#f1e05a',
      label: `${props.klass}#${camelMethod.value}`,
      url: `https://longbridge.github.io/openapi/nodejs/classes/${props.klass}.html#${camelMethod.value.toLowerCase()}`,
    },
    {
      title: 'Java',
      color: '#b07219',
      label: `${props.klass}.${methodJava.value}`,
      url: `https://longbridge.github.io/openapi/java/com/longbridge/${props.module}/${props.klass}.html#${javaAnchor.value}`,
    },
    {
      title: 'C++',
      color: '#f34b7d',
      label: `longbridge::${props.module}::${props.klass}`,
      url: cppClassUrl.value,
    },
  ]
  return baseLinks
})
</script>
