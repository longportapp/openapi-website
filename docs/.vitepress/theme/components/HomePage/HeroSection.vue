<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const titleRef = ref<HTMLElement | null>(null)
const typingEl = ref<HTMLElement | null>(null)

const cmds = [
  'pip install longbridge',
  'longbridge quote TSLA.US AAPL.US NVDA.US',
  'claude mcp add longbridge https://openapi.longbridge.com/mcp',
  'longbridge financial-report AAPL.US --format json',
  'npx skills add longbridge/developers -g -y',
  'longbridge insider-trades NVDA.US',
  'ctx.quote(["TSLA.US", "700.HK", "AAPL.US"])',
  'longbridge screener --market us --sector technology',
]

let ci = 0
let timer: ReturnType<typeof setTimeout> | null = null

function typeLoop() {
  if (!typingEl.value) return
  const cmd = cmds[ci]
  let i = 0
  typingEl.value.textContent = ''
  function step() {
    if (!typingEl.value) return
    if (i < cmd.length) {
      typingEl.value.textContent = cmd.slice(0, ++i)
      timer = setTimeout(step, 25 + Math.random() * 15)
    } else {
      timer = setTimeout(delLoop, 2800)
    }
  }
  step()
}

function delLoop() {
  if (!typingEl.value) return
  const txt = typingEl.value.textContent || ''
  if (txt.length > 0) {
    typingEl.value.textContent = txt.slice(0, -1)
    timer = setTimeout(delLoop, 12)
  } else {
    ci = (ci + 1) % cmds.length
    timer = setTimeout(typeLoop, 250)
  }
}

onMounted(() => {
  // Title blur-in
  if (titleRef.value) {
    const text = titleRef.value.textContent || ''
    titleRef.value.innerHTML = ''
    ;[...text].forEach((char, i) => {
      const span = document.createElement('span')
      span.className = 'hero-char'
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.animationDelay = `${i * 0.03}s`
      titleRef.value!.appendChild(span)
    })
  }
  timer = setTimeout(typeLoop, 800)
})

onUnmounted(() => { if (timer) clearTimeout(timer) })
</script>

<template>
  <section class="hero">
    <div class="homepage-container">
      <h1 ref="titleRef" class="hero__title">Longbridge Developers</h1>
      <p class="hero__tagline hero-fade-up" style="animation-delay:0.4s">
        <strong>OpenAPI</strong>. <strong>MCP</strong>. <strong>CLI</strong>. <strong>SKILL</strong>.
      </p>
      <p class="hero__desc hero-fade-up" style="animation-delay:0.55s">{{ t('home.subtitle') }}</p>

      <div class="hero__term hero-fade-up" style="animation-delay:0.7s">
        <div class="hero__term-bar">
          <span class="hero__dot" style="background:#ff5f57" />
          <span class="hero__dot" style="background:#febc2e" />
          <span class="hero__dot" style="background:#28c840" />
        </div>
        <div class="hero__term-cmd">
          <span class="hero__ps">$</span>
          <span ref="typingEl" class="hero__typed" />
          <span class="typing-cursor" />
        </div>
      </div>

      <div class="hero__cta hero-fade-up" style="animation-delay:0.9s">
        <a href="/docs/getting-started" class="hero__btn hero__btn--pri">{{ t('home.getStarted') }}</a>
        <a href="/docs/api" class="hero__btn hero__btn--sec">{{ t('home.apiReference') }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { text-align: center; padding: 80px 0 48px; }

.hero__title {
  font-size: 52px; font-weight: 900; letter-spacing: -0.035em;
  line-height: 1.05; margin-bottom: 12px; color: var(--text-color-1);
}

.hero__tagline {
  font-size: 20px; color: var(--text-color-2); margin-bottom: 8px; font-weight: 500;
}

.hero__tagline strong { color: var(--brand-color); font-weight: 700; }

.hero__desc {
  font-size: 15px; color: var(--text-color-3); margin-bottom: 36px;
  max-width: 540px; margin-left: auto; margin-right: auto; line-height: 1.6;
  white-space: pre-line;
}

/* Terminal */
.hero__term {
  max-width: 580px; margin: 0 auto 32px;
  background: #1b1b1f; border-radius: 8px;
  overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); text-align: left;
}

.hero__term-bar {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px; background: rgba(255,255,255,0.04);
}

.hero__dot { width: 8px; height: 8px; border-radius: 50%; }

.hero__term-cmd {
  padding: 16px 20px;
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 14px; color: #e5e7eb; display: flex; align-items: center;
  min-height: 50px;
}

.hero__ps { color: #00d4b8; user-select: none; margin-right: 10px; font-weight: 600; }
.hero__typed { white-space: nowrap; overflow: hidden; }

/* CTA */
.hero__cta { display: flex; justify-content: center; gap: 12px; }

.hero__btn {
  border-radius: 6px; padding: 11px 26px; font-size: 14px; font-weight: 600;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none; display: inline-block;
}

.hero__btn--pri { background: var(--brand-color); color: #fff; }
.hero__btn--pri:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,184,184,0.3); }

.hero__btn--sec { background: transparent; color: var(--brand-color); border: 1.5px solid var(--brand-color); }
.hero__btn--sec:hover { background: var(--brand-5); transform: translateY(-2px); }

@media (max-width: 640px) {
  .hero { padding: 56px 0 36px; }
  .hero__title { font-size: 34px; }
  .hero__tagline { font-size: 17px; }
  .hero__desc { font-size: 14px; }
  .hero__cta { flex-direction: column; align-items: center; }
  .hero__term-cmd { font-size: 12px; }
}
</style>
