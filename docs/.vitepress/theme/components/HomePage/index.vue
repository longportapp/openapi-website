<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../../composables/useScrollReveal'
import HeroSection from './HeroSection.vue'
import PlatformStats from './PlatformStats.vue'
import ProductSection from './ProductSection.vue'
import CodeBlockTabs from './CodeBlockTabs.vue'
import McpShowcase from './McpShowcase.vue'
import TerminalPreview from './TerminalPreview.vue'
import MarketCoverage from './MarketCoverage.vue'
import Footer from './Footer.vue'

const { t } = useI18n()
const rootRef = ref<HTMLElement | null>(null)
useScrollReveal(rootRef)

const openApiCodeTabs = [
  {
    key: 'python',
    label: 'Python',
    code: `<span style="color:var(--brand-color)">from</span> longbridge.openapi <span style="color:var(--brand-color)">import</span> QuoteContext, Config\n\n<span style="color:var(--text-color-3)"># Initialize with environment variables</span>\nconfig = Config.from_env()\nctx = QuoteContext(config)\n\n<span style="color:var(--text-color-3)"># Get real-time quotes</span>\nresp = ctx.quote([<span style="color:var(--link-text-color)">"TSLA.US"</span>, <span style="color:var(--link-text-color)">"700.HK"</span>])\n<span style="color:var(--brand-color)">for</span> q <span style="color:var(--brand-color)">in</span> resp:\n  print(<span style="color:var(--brand-color)">f</span><span style="color:var(--link-text-color)">"{q.symbol}: {q.last_done}"</span>)`,
  },
  {
    key: 'nodejs',
    label: 'Node.js',
    code: `<span style="color:var(--brand-color)">import</span> { Config, QuoteContext } <span style="color:var(--brand-color)">from</span> <span style="color:var(--link-text-color)">'longbridge'</span>\n\n<span style="color:var(--brand-color)">const</span> config = Config.fromEnv()\n<span style="color:var(--brand-color)">const</span> ctx = <span style="color:var(--brand-color)">await</span> QuoteContext.open(config)\n\n<span style="color:var(--text-color-3)">// Get real-time quotes</span>\n<span style="color:var(--brand-color)">const</span> quotes = <span style="color:var(--brand-color)">await</span> ctx.quote([<span style="color:var(--link-text-color)">"TSLA.US"</span>, <span style="color:var(--link-text-color)">"700.HK"</span>])\nquotes.forEach(q =&gt; console.log(<span style="color:var(--link-text-color)">\`\${q.symbol}: \${q.lastDone}\`</span>))`,
  },
  {
    key: 'rust',
    label: 'Rust',
    code: `<span style="color:var(--brand-color)">use</span> longbridge::quote::QuoteContext;\n<span style="color:var(--brand-color)">use</span> longbridge::Config;\n\n<span style="color:var(--brand-color)">let</span> config = Config::from_env()?;\n<span style="color:var(--brand-color)">let</span> (ctx, _) = QuoteContext::try_new(config).<span style="color:var(--brand-color)">await</span>?;\n\n<span style="color:var(--text-color-3)">// Get real-time quotes</span>\n<span style="color:var(--brand-color)">let</span> quotes = ctx.quote([<span style="color:var(--link-text-color)">"TSLA.US"</span>]).<span style="color:var(--brand-color)">await</span>?;\n<span style="color:var(--brand-color)">for</span> q <span style="color:var(--brand-color)">in</span> quotes {\n  println!(<span style="color:var(--link-text-color)">"{}: {}"</span>, q.symbol, q.last_done);\n}`,
  },
]
</script>

<template>
  <div ref="rootRef">
    <HeroSection />
    <PlatformStats />

    <!-- OpenAPI -->
    <ProductSection accent="brand">
      <template #content>
        <span class="ps-badge ps-badge--brand">OpenAPI</span>
        <h2 class="ps-title">{{ t('home.openapi.title') }}</h2>
        <p class="ps-desc">{{ t('home.openapi.desc') }}</p>
        <ul class="ps-features">
          <li><strong>{{ t('home.openapi.feat1.title') }}</strong> — {{ t('home.openapi.feat1.desc') }}</li>
          <li><strong>{{ t('home.openapi.feat2.title') }}</strong> — {{ t('home.openapi.feat2.desc') }}</li>
          <li><strong>{{ t('home.openapi.feat3.title') }}</strong> — {{ t('home.openapi.feat3.desc') }}</li>
          <li><strong>{{ t('home.openapi.feat4.title') }}</strong> — {{ t('home.openapi.feat4.desc') }}</li>
        </ul>
        <a href="/docs/getting-started" class="ps-link">{{ t('home.openapi.link') }} &rarr;</a>
      </template>
      <template #visual>
        <CodeBlockTabs :tabs="openApiCodeTabs" />
      </template>
    </ProductSection>

    <!-- MCP -->
    <ProductSection accent="purple" reverse>
      <template #content>
        <span class="ps-badge ps-badge--purple">MCP</span>
        <h2 class="ps-title">{{ t('home.mcp.title') }}</h2>
        <p class="ps-desc">{{ t('home.mcp.desc') }}</p>
        <ul class="ps-features">
          <li><strong>{{ t('home.mcp.feat1.title') }}</strong> — {{ t('home.mcp.feat1.desc') }}</li>
          <li><strong>{{ t('home.mcp.feat2.title') }}</strong> — {{ t('home.mcp.feat2.desc') }}</li>
          <li><strong>{{ t('home.mcp.feat3.title') }}</strong> — {{ t('home.mcp.feat3.desc') }}</li>
        </ul>
        <a href="/docs/mcp" class="ps-link">{{ t('home.mcp.link') }} &rarr;</a>
      </template>
      <template #visual>
        <McpShowcase />
      </template>
    </ProductSection>

    <!-- CLI + SKILL: compact 2-column cards -->
    <section class="homepage-section homepage-section--alt">
      <div class="homepage-container">
        <div class="compact-grid reveal">
          <!-- CLI -->
          <div class="compact-card">
            <span class="ps-badge ps-badge--amber">CLI</span>
            <h3 class="compact-title">{{ t('home.cli.title') }}</h3>
            <p class="compact-desc">{{ t('home.cli.desc') }}</p>
            <TerminalPreview>
              <div style="color:var(--code-dim)">$ longbridge quote TSLA.US AAPL.US</div>
              <br />
              <table style="width:100%;border-collapse:collapse;font-size:11px">
                <tr style="color:var(--code-dim)"><td>Symbol</td><td>Last</td><td>Change</td></tr>
                <tr><td>TSLA.US</td><td>248.50</td><td style="color:var(--code-up)">+2.18%</td></tr>
                <tr><td>AAPL.US</td><td>195.20</td><td style="color:var(--code-down)">-0.71%</td></tr>
              </table>
            </TerminalPreview>
            <a href="/docs/cli" class="ps-link" style="margin-top:16px">{{ t('home.cli.link') }} &rarr;</a>
          </div>

          <!-- SKILL -->
          <div class="compact-card">
            <span class="ps-badge ps-badge--pink">SKILL</span>
            <h3 class="compact-title">{{ t('home.skill.title') }}</h3>
            <p class="compact-desc">{{ t('home.skill.desc') }}</p>
            <TerminalPreview title="AI + SKILL">
              <div style="color:var(--code-dim)">User: <span style="color:var(--code-str)">"筛出 PE&lt;25 的美股科技股"</span></div>
              <br />
              <div style="color:var(--code-up)">&#10003; SKILL activated</div>
              <div>INTC.US PE:22.1 <span style="color:var(--code-up)">MACD 金叉</span></div>
              <div>CSCO.US PE:16.8 <span style="color:var(--code-up)">MACD 金叉</span></div>
            </TerminalPreview>
            <a href="/skill" class="ps-link" style="margin-top:16px">{{ t('home.skill.link') }} &rarr;</a>
          </div>
        </div>
      </div>
    </section>

    <MarketCoverage />
    <Footer />
  </div>
</template>

<style>
.ps-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.ps-badge--brand { background: var(--brand-5); color: var(--brand-color); }
.ps-badge--purple { background: rgba(139, 92, 246, 0.1); color: var(--product-mcp); }
.ps-badge--amber { background: rgba(245, 158, 11, 0.1); color: var(--product-cli); }
.ps-badge--pink { background: rgba(236, 72, 153, 0.1); color: var(--product-skill); }

.ps-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  line-height: 1.2;
  color: var(--text-color-1);
}

.ps-desc {
  font-size: 15px;
  color: var(--text-color-1-supplement);
  margin-bottom: 24px;
  line-height: 1.7;
}

.ps-features {
  list-style: none;
  margin-bottom: 24px;
  padding: 0;
}

.ps-features li {
  font-size: 14px;
  color: var(--text-color-1-supplement);
  padding: 8px 0;
  line-height: 1.5;
}

.ps-features li strong {
  color: var(--text-color-1);
  font-weight: 600;
}

.ps-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--brand-color);
  text-decoration: none;
  transition: gap 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.ps-link:hover { gap: 10px; }

/* Compact 2-column for CLI + SKILL */
.compact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.compact-card {
  background: var(--home-bg-color-1);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 28px;
  display: flex;
  flex-direction: column;
}

.compact-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: var(--text-color-1);
}

.compact-desc {
  font-size: 13px;
  color: var(--text-color-1-supplement);
  line-height: 1.6;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .compact-grid { grid-template-columns: 1fr; }
}
</style>
