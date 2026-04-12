<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import BorderBeam from '../inspira/BorderBeam.vue'
import NumberTicker from '../inspira/NumberTicker.vue'

const { t } = useI18n()

// Language tabs
const langs = ['Python', 'Node.js', 'Rust', 'Go'] as const
type Lang = typeof langs[number]
const activeLang = ref<Lang>('Python')

// Capability tabs
const caps = ['streaming', 'trading'] as const
type Cap = typeof caps[number]
const activeCap = ref<Cap>('streaming')

// Code examples from docs (verified from docs/en/docs/quote/subscribe/subscribe.md and docs/en/docs/trade/order/submit.md)
const codeExamples: Record<Cap, Record<Lang, string>> = {
  streaming: {
    Python: `from time import sleep
from longbridge.openapi import QuoteContext, Config, SubType, PushQuote, OAuthBuilder

def on_quote(symbol: str, event: PushQuote):
    print(symbol, event)

oauth = OAuthBuilder("your-client-id").build(
    lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)
ctx = QuoteContext(config)
ctx.set_on_quote(on_quote)
ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Quote])
sleep(30)`,
    'Node.js': `const { Config, QuoteContext, OAuth, SubType } = require('longbridge')

async function main() {
  const oauth = await OAuth.build("your-client-id",
    (_, url) => console.log("Open:", url))
  const config = Config.fromOAuth(oauth)
  const ctx = QuoteContext.new(config)
  ctx.setOnQuote((event) => console.log(event))
  await ctx.subscribe(
    ["700.HK", "AAPL.US"], [SubType.Quote], true)
  await new Promise(r => setTimeout(r, 30000))
}
main().catch(console.error)`,
    Rust: `use std::sync::Arc;
use longbridge::{
    oauth::OAuthBuilder,
    quote::{QuoteContext, SubFlags},
    Config,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let oauth = OAuthBuilder::new("your-client-id")
        .build(|url| println!("Open: {url}")).await?;
    let config = Arc::new(Config::from_oauth(oauth));
    let (ctx, _) = QuoteContext::new(config);
    ctx.subscribe(
        vec!["700.HK".into(), "AAPL.US".into()],
        SubFlags::quote(), true,
    ).await?;
    tokio::time::sleep(std::time::Duration::from_secs(30)).await;
    Ok(())
}`,
    Go: `package main

import (
  "context"; "fmt"; "log"
  "github.com/longbridge/openapi-go/config"
  "github.com/longbridge/openapi-go/oauth"
  "github.com/longbridge/openapi-go/quote"
)

func main() {
  o := oauth.New("your-client-id").
    OnOpenURL(func(url string) { fmt.Println("Open:", url) })
  o.Build(context.Background())
  conf, _ := config.New(config.WithOAuthClient(o))
  qctx, _ := quote.NewFromCfg(conf)
  defer qctx.Close()
  qctx.OnQuote(func(e *quote.PushQuote) {
    fmt.Println(e.Symbol)
  })
  qctx.Subscribe(context.Background(),
    []string{"700.HK", "AAPL.US"},
    []quote.SubType{quote.SubTypeQuote}, true)
  select {}
}`,
  },
  trading: {
    Python: `from decimal import Decimal
from longbridge.openapi import (
    TradeContext, Config, OrderType,
    OrderSide, TimeInForceType, OAuthBuilder,
)

oauth = OAuthBuilder("your-client-id").build(
    lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)
ctx = TradeContext(config)

resp = ctx.submit_order(
    "700.HK", OrderType.LO, OrderSide.Buy,
    Decimal(500), TimeInForceType.Day,
    submitted_price=Decimal(50),
    remark="Hello from Python SDK",
)
print(resp)`,
    'Node.js': `const { Config, TradeContext, OAuth, OrderType,
  OrderSide, TimeInForceType, Decimal } = require('longbridge')

async function main() {
  const oauth = await OAuth.build('your-client-id',
    (_, url) => console.log('Open:', url))
  const config = Config.fromOAuth(oauth)
  const ctx = TradeContext.new(config)
  const resp = await ctx.submitOrder({
    symbol: '700.HK',
    orderType: OrderType.LO,
    side: OrderSide.Buy,
    submittedQuantity: new Decimal(500),
    submittedPrice: new Decimal(50),
    timeInForce: TimeInForceType.Day,
    remark: 'Hello',
  })
  console.log(resp)
}
main().catch(console.error)`,
    Rust: `use std::sync::Arc;
use longbridge::{
    oauth::OAuthBuilder,
    trade::{TradeContext, SubmitOrderOptions,
            OrderType, OrderSide, TimeInForceType},
    Config,
};
use rust_decimal::Decimal;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let oauth = OAuthBuilder::new("your-client-id")
        .build(|url| println!("Open: {url}")).await?;
    let config = Arc::new(Config::from_oauth(oauth));
    let (ctx, _) = TradeContext::new(config);
    let resp = ctx.submit_order(
        SubmitOrderOptions::new("700.HK", OrderType::LO,
            OrderSide::Buy, Decimal::from(500),
            TimeInForceType::Day)
            .submitted_price(Decimal::from(50))
            .remark("Hello"),
    ).await?;
    println!("{:?}", resp);
    Ok(())
}`,
    Go: `package main

import (
  "context"; "fmt"; "log"
  "github.com/longbridge/openapi-go/config"
  "github.com/longbridge/openapi-go/oauth"
  "github.com/longbridge/openapi-go/trade"
  "github.com/shopspring/decimal"
)

func main() {
  o := oauth.New("your-client-id").
    OnOpenURL(func(url string) { fmt.Println("Open:", url) })
  o.Build(context.Background())
  conf, _ := config.New(config.WithOAuthClient(o))
  tctx, _ := trade.NewFromCfg(conf)
  defer tctx.Close()
  orderID, _ := tctx.SubmitOrder(context.Background(),
    &trade.SubmitOrder{
      Symbol: "700.HK", OrderType: trade.OrderTypeLO,
      Side: trade.OrderSideBuy, SubmittedQuantity: 500,
      SubmittedPrice: decimal.NewFromFloat(50),
      TimeInForce: trade.TimeTypeDay,
      Remark: "Hello from Go SDK",
    })
  fmt.Println("order_id:", orderID)
}`,
  },
}

// Shiki highlighting
const langMap: Record<Lang, string> = {
  Python: 'python',
  'Node.js': 'javascript',
  Rust: 'rust',
  Go: 'go',
}

const highlightedCode = shallowRef('')

async function highlight() {
  const { createHighlighter } = await import('shiki')
  const highlighter = await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['python', 'javascript', 'rust', 'go'],
  })

  const code = codeExamples[activeCap.value][activeLang.value]
  highlightedCode.value = highlighter.codeToHtml(code, {
    lang: langMap[activeLang.value],
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
}

onMounted(() => highlight())

function switchLang(l: Lang) {
  activeLang.value = l
  highlight()
}
function switchCap(c: Cap) {
  activeCap.value = c
  highlight()
}

// Copy
const copied = ref(false)
function copyCode() {
  navigator.clipboard.writeText(codeExamples[activeCap.value][activeLang.value])
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <section class="sdk-section">
    <div class="sdk-header">
      <div class="sdk-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>
        <span>OpenAPI SDK</span>
      </div>
      <h2 class="sdk-title">{{ $t('product.sdk.title') }}</h2>
      <p class="sdk-subtitle">{{ $t('product.sdk.subtitle') }}</p>
      <p class="sdk-desc">{{ $t('product.sdk.desc') }}</p>
    </div>

    <div class="sdk-bento">
      <!-- Hero Code Cell -->
      <div class="sdk-cell sdk-cell-hero">
        <div class="sdk-hero-tabs">
          <div class="sdk-lang-tabs">
            <button
              v-for="l in langs"
              :key="l"
              class="sdk-lang-tab"
              :class="{ active: activeLang === l }"
              @click="switchLang(l)"
            >{{ l }}</button>
          </div>
          <div class="sdk-cap-tabs">
            <button
              v-for="c in caps"
              :key="c"
              class="sdk-cap-tab"
              :class="{ active: activeCap === c }"
              @click="switchCap(c)"
            >{{ $t(`product.sdk.tab.${c}`) }}</button>
          </div>
        </div>
        <div class="sdk-code-wrap">
          <div v-if="highlightedCode" class="sdk-code" v-html="highlightedCode" />
          <div v-else class="sdk-code-fallback">
            <pre><code>{{ codeExamples[activeCap][activeLang] }}</code></pre>
          </div>
          <button class="sdk-copy-btn" @click="copyCode">
            <svg v-if="copied" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </button>
        </div>
        <ClientOnly>
          <BorderBeam :duration="6" :size="120" color-from="#00b8b8" color-to="#66d5c2" />
        </ClientOnly>
      </div>

      <!-- Multi-Market Cell -->
      <div class="sdk-cell sdk-cell-market">
        <div class="sdk-cell-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
        </div>
        <h3 class="sdk-cell-title">{{ $t('product.sdk.market.title') }}</h3>
        <div class="sdk-flags">
          <span class="sdk-flag" title="Hong Kong">
            <svg class="sdk-flag-icon" viewBox="0 0 640 480"><path fill="#de2910" d="M0 0h640v480H0z"/><g fill="#fff" transform="translate(320 240) scale(6)"><polygon points="0,-12 3.5,-3.5 12,-3.5 5,2.5 7.5,12 0,6.5 -7.5,12 -5,2.5 -12,-3.5 -3.5,-3.5"/></g></svg>
            HK
          </span>
          <span class="sdk-flag" title="United States">
            <svg class="sdk-flag-icon" viewBox="0 0 640 480"><path fill="#bd3d44" d="M0 0h640v37h-640zm0 74h640v37h-640zm0 148h640v37h-640zm0 74h640v37h-640z"/><path fill="#fff" d="M0 37h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640z"/><path fill="#192f5d" d="M0 0h260v260H0z"/><g fill="#fff" transform="translate(26 20)"><circle r="5" cx="0" cy="0"/><circle r="5" cx="52" cy="0"/><circle r="5" cx="104" cy="0"/><circle r="5" cx="156" cy="0"/><circle r="5" cx="208" cy="0"/><circle r="5" cx="26" cy="24"/><circle r="5" cx="78" cy="24"/><circle r="5" cx="130" cy="24"/><circle r="5" cx="182" cy="24"/></g></svg>
            US
          </span>
          <span class="sdk-flag" title="China">
            <svg class="sdk-flag-icon" viewBox="0 0 640 480"><path fill="#de2910" d="M0 0h640v480H0z"/><g fill="#ff0" transform="translate(96 72) scale(4.8)"><polygon points="0,-12 3.5,-3.5 12,-3.5 5,2.5 7.5,12 0,6.5 -7.5,12 -5,2.5 -12,-3.5 -3.5,-3.5"/></g><g fill="#ff0" transform="translate(192 24) scale(1.6)"><polygon points="0,-12 3.5,-3.5 12,-3.5 5,2.5 7.5,12 0,6.5 -7.5,12 -5,2.5 -12,-3.5 -3.5,-3.5" transform="rotate(23)"/></g><g fill="#ff0" transform="translate(216 72) scale(1.6)"><polygon points="0,-12 3.5,-3.5 12,-3.5 5,2.5 7.5,12 0,6.5 -7.5,12 -5,2.5 -12,-3.5 -3.5,-3.5" transform="rotate(-10)"/></g><g fill="#ff0" transform="translate(192 120) scale(1.6)"><polygon points="0,-12 3.5,-3.5 12,-3.5 5,2.5 7.5,12 0,6.5 -7.5,12 -5,2.5 -12,-3.5 -3.5,-3.5" transform="rotate(23)"/></g></svg>
            CN
          </span>
          <span class="sdk-flag" title="Singapore">
            <svg class="sdk-flag-icon" viewBox="0 0 640 480"><path fill="#ed2939" d="M0 0h640v240H0z"/><path fill="#fff" d="M0 240h640v240H0z"/><g fill="#fff" transform="translate(160 120)"><circle r="48"/></g><g fill="#ed2939" transform="translate(172 120)"><circle r="44"/></g><g fill="#fff" transform="translate(160 92)"><polygon points="0,-16 4.7,-4.7 16,-4.7 6.7,3.3 10,16 0,8.7 -10,16 -6.7,3.3 -16,-4.7 -4.7,-4.7" transform="scale(0.5)"/><polygon points="0,-16 4.7,-4.7 16,-4.7 6.7,3.3 10,16 0,8.7 -10,16 -6.7,3.3 -16,-4.7 -4.7,-4.7" transform="translate(20 12) scale(0.5)"/><polygon points="0,-16 4.7,-4.7 16,-4.7 6.7,3.3 10,16 0,8.7 -10,16 -6.7,3.3 -16,-4.7 -4.7,-4.7" transform="translate(-20 12) scale(0.5)"/><polygon points="0,-16 4.7,-4.7 16,-4.7 6.7,3.3 10,16 0,8.7 -10,16 -6.7,3.3 -16,-4.7 -4.7,-4.7" transform="translate(12 26) scale(0.5)"/><polygon points="0,-16 4.7,-4.7 16,-4.7 6.7,3.3 10,16 0,8.7 -10,16 -6.7,3.3 -16,-4.7 -4.7,-4.7" transform="translate(-12 26) scale(0.5)"/></g></svg>
            SG
          </span>
        </div>
        <p class="sdk-cell-desc">Stocks, ETFs, Options, Warrants</p>
      </div>

      <!-- Free Cell -->
      <div class="sdk-cell sdk-cell-free">
        <div class="sdk-cell-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 000 4h4v-4z"/></svg>
        </div>
        <h3 class="sdk-cell-title">{{ $t('product.sdk.free.title') }}</h3>
        <div class="sdk-free-price">
          <span class="sdk-free-dollar">$</span>
          <ClientOnly><NumberTicker :value="0" class="sdk-free-num" /></ClientOnly>
          <span class="sdk-free-label">API charges</span>
        </div>
        <p class="sdk-cell-desc">{{ $t('product.sdk.free.desc') }}</p>
      </div>

      <!-- Streaming Cell -->
      <div class="sdk-cell sdk-cell-streaming">
        <div class="sdk-cell-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span class="sdk-live-dot" />
        </div>
        <h3 class="sdk-cell-title">{{ $t('product.sdk.streaming.title') }}</h3>
        <p class="sdk-cell-desc">{{ $t('product.sdk.streaming.desc') }}</p>
        <div class="sdk-tags">
          <span class="sdk-tag-sm">Quote</span>
          <span class="sdk-tag-sm">Depth</span>
          <span class="sdk-tag-sm">Trades</span>
          <span class="sdk-tag-sm">Orders</span>
        </div>
      </div>

      <!-- Trading Cell -->
      <div class="sdk-cell sdk-cell-trading">
        <div class="sdk-cell-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
        </div>
        <h3 class="sdk-cell-title">{{ $t('product.sdk.trading.title') }}</h3>
        <p class="sdk-cell-desc">{{ $t('product.sdk.trading.desc') }}</p>
        <div class="sdk-tags">
          <span class="sdk-tag-sm">LO</span>
          <span class="sdk-tag-sm">MIT</span>
          <span class="sdk-tag-sm">Trailing</span>
          <span class="sdk-tag-sm">Auction</span>
        </div>
      </div>

      <!-- Auth Cell -->
      <div class="sdk-cell sdk-cell-auth">
        <div class="sdk-cell-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        </div>
        <h3 class="sdk-cell-title">{{ $t('product.sdk.auth.title') }}</h3>
        <p class="sdk-cell-desc">{{ $t('product.sdk.auth.desc') }}</p>
        <div class="sdk-tags">
          <span class="sdk-tag-sm">async/await</span>
          <span class="sdk-tag-sm">rate-limit</span>
          <span class="sdk-tag-sm">Rust core</span>
        </div>
      </div>
    </div>

    <div class="sdk-cta-wrap">
      <a href="/sdk" class="sdk-cta">
        {{ $t('product.sdk.cta') }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.sdk-section { padding: 4rem 0; background: var(--vp-c-bg); }

.sdk-header { text-align: center; margin-bottom: 2rem; padding: 0 1.5rem; max-width: 40rem; margin-left: auto; margin-right: auto; }
.sdk-badge { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.75rem; border-radius: 9999px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3); margin-bottom: 1rem; }
.sdk-title { font-size: 1.75rem; font-weight: 700; color: var(--vp-c-text-1); letter-spacing: -0.02em; }
.sdk-subtitle { margin-top: 0.25rem; font-size: 0.95rem; color: var(--brand-color); font-weight: 600; line-height: 1.4; }
.sdk-desc { margin-top: 0.5rem; font-size: 0.875rem; line-height: 1.6; color: var(--vp-c-text-2); }

/* Bento Grid */
.sdk-bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.75rem;
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Cells */
.sdk-cell {
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  transition: all 0.25s;
}
.sdk-cell:hover {
  border-color: color-mix(in srgb, var(--brand-color) 30%, var(--vp-c-divider));
  box-shadow: 0 4px 16px color-mix(in srgb, var(--brand-color) 5%, transparent);
}

/* Hero code cell */
.sdk-cell-hero {
  grid-column: span 4;
  grid-row: span 2;
  position: relative;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.sdk-hero-tabs {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.625rem 0.875rem;
  border-bottom: 1px solid var(--vp-c-divider);
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sdk-lang-tabs, .sdk-cap-tabs { display: flex; gap: 0.25rem; }

.sdk-lang-tab, .sdk-cap-tab {
  padding: 0.25rem 0.5rem; border-radius: 0.25rem;
  font-size: 0.7rem; font-weight: 600;
  background: transparent; border: 1px solid transparent;
  color: var(--vp-c-text-3); cursor: pointer; transition: all 0.2s;
}
.sdk-lang-tab:hover, .sdk-cap-tab:hover { color: var(--vp-c-text-2); }
.sdk-lang-tab.active { color: var(--brand-color); background: color-mix(in srgb, var(--brand-color) 8%, transparent); border-color: color-mix(in srgb, var(--brand-color) 20%, transparent); }
.sdk-cap-tab.active { color: var(--vp-c-text-1); background: var(--vp-c-bg); border-color: var(--vp-c-divider); }

.sdk-code-wrap {
  position: relative;
  flex: 1;
  overflow: auto;
  padding: 0.75rem 0.875rem;
}

.sdk-code :deep(pre) {
  margin: 0; padding: 0;
  font-size: 0.72rem; line-height: 1.6;
  font-family: var(--vp-font-family-mono);
  background: transparent !important;
}
.sdk-code :deep(code) { font-family: inherit; }
.sdk-code :deep(.shiki) { background: transparent !important; }

/* Dark mode Shiki */
.sdk-code :deep(span) { color: var(--shiki-light); }
:root.dark .sdk-code :deep(span) { color: var(--shiki-dark); }

.sdk-code-fallback pre {
  margin: 0; padding: 0;
  font-size: 0.72rem; line-height: 1.6;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

.sdk-copy-btn {
  position: absolute; top: 0.5rem; right: 0.5rem;
  display: flex; align-items: center; justify-content: center;
  width: 1.5rem; height: 1.5rem; border-radius: 0.25rem;
  color: var(--vp-c-text-3); background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider); cursor: pointer; transition: all 0.2s;
  z-index: 2;
}
.sdk-copy-btn:hover { border-color: var(--brand-color); color: var(--brand-color); }

/* Small cells shared styles */
.sdk-cell-market, .sdk-cell-free { grid-column: span 2; }
.sdk-cell-streaming, .sdk-cell-trading, .sdk-cell-auth { grid-column: span 2; }

.sdk-cell-icon {
  display: flex; align-items: center; gap: 0.375rem;
  margin-bottom: 0.5rem;
}
.sdk-cell-icon svg { width: 1.125rem; height: 1.125rem; color: var(--brand-color); }

.sdk-cell-title { font-size: 0.82rem; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 0.25rem; }
.sdk-cell-desc { font-size: 0.7rem; color: var(--vp-c-text-3); line-height: 1.5; }

/* Flags */
.sdk-flags { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-top: 0.375rem; }
.sdk-flag {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.2rem 0.5rem; border-radius: 0.25rem;
  font-size: 0.7rem; font-weight: 600;
  background: color-mix(in srgb, var(--vp-c-text-3) 6%, transparent);
  color: var(--vp-c-text-2);
}
.sdk-flag-icon { width: 1.125rem; height: 0.8rem; border-radius: 2px; flex-shrink: 0; }

/* Tags */
.sdk-tags { display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.375rem; }
.sdk-tag {
  padding: 0.2rem 0.5rem; border-radius: 0.25rem;
  font-size: 0.68rem; font-weight: 700;
  background: color-mix(in srgb, var(--brand-color) 10%, transparent);
  color: var(--brand-color);
}
.sdk-tag-sm {
  padding: 0.125rem 0.375rem; border-radius: 0.1875rem;
  font-size: 0.62rem; font-weight: 600;
  background: color-mix(in srgb, var(--vp-c-text-3) 8%, transparent);
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

/* Free cell special */
.sdk-free-price {
  display: flex; align-items: baseline; gap: 0.125rem;
  margin: 0.25rem 0;
}
.sdk-free-dollar { font-size: 1rem; font-weight: 700; color: var(--brand-color); }
.sdk-free-num { font-size: 1.5rem; font-weight: 800; color: var(--brand-color); }
.sdk-free-label { font-size: 0.68rem; color: var(--vp-c-text-3); margin-left: 0.25rem; }

/* Live dot */
.sdk-live-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #22c55e;
  animation: sdk-pulse 2s ease-in-out infinite;
}
@keyframes sdk-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* CTA */
.sdk-cta-wrap { text-align: center; margin-top: 1.5rem; }
.sdk-cta { display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.9rem; font-weight: 600; color: var(--brand-color); text-decoration: none !important; transition: gap 0.2s; }
.sdk-cta:hover { gap: 0.625rem; }

/* Responsive */
@media (max-width: 768px) {
  .sdk-bento { grid-template-columns: 1fr; }
  .sdk-cell-hero, .sdk-cell-market, .sdk-cell-free,
  .sdk-cell-streaming, .sdk-cell-trading, .sdk-cell-auth {
    grid-column: span 1;
    grid-row: span 1;
  }
  .sdk-hero-tabs { flex-direction: column; align-items: flex-start; }
}
</style>
