<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ProductTabs from './ProductTabs.vue'

const { t } = useI18n()

const titleRef = ref<HTMLElement | null>(null)
const typingRef = ref<HTMLElement | null>(null)
let typingTimer: ReturnType<typeof setTimeout> | null = null

const tabs = [
  { key: 'openapi', label: 'OpenAPI', command: 'pip install longbridge' },
  { key: 'mcp', label: 'MCP', command: 'claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp' },
  { key: 'cli', label: 'CLI', command: 'curl -fsSL https://longbridge.sh/install | bash' },
  { key: 'skill', label: 'SKILL', command: 'npx skills add longbridge/developers -g -y' },
]

// Typing animation: cycle through showcase commands
const showcaseLines = [
  { prompt: '$', text: 'longbridge quote TSLA.US AAPL.US NVDA.US', color: '' },
  { prompt: '$', text: 'longbridge financial-report AAPL.US', color: '' },
  { prompt: '$', text: 'claude mcp add longbridge https://openapi.longbridge.com/mcp', color: 'var(--brand-color)' },
  { prompt: '$', text: 'npx skills add longbridge/developers -g -y', color: '' },
  { prompt: '>>>', text: 'ctx.quote(["TSLA.US", "700.HK", "AAPL.US"])', color: '' },
  { prompt: '$', text: 'longbridge insider-trades NVDA.US --format json', color: '' },
]

const currentLine = ref(0)
const displayedText = ref('')
const isDeleting = ref(false)

function typeLoop() {
  const line = showcaseLines[currentLine.value]
  const fullText = line.text

  if (!isDeleting.value) {
    // Typing
    if (displayedText.value.length < fullText.length) {
      displayedText.value = fullText.slice(0, displayedText.value.length + 1)
      typingTimer = setTimeout(typeLoop, 30 + Math.random() * 20)
    } else {
      // Pause at end
      typingTimer = setTimeout(() => {
        isDeleting.value = true
        typeLoop()
      }, 2500)
    }
  } else {
    // Deleting
    if (displayedText.value.length > 0) {
      displayedText.value = displayedText.value.slice(0, -1)
      typingTimer = setTimeout(typeLoop, 15)
    } else {
      isDeleting.value = false
      currentLine.value = (currentLine.value + 1) % showcaseLines.length
      typingTimer = setTimeout(typeLoop, 300)
    }
  }
}

onMounted(() => {
  // Blur-in title animation
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

  // Start typing after hero animation completes
  typingTimer = setTimeout(typeLoop, 1200)
})

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer)
})
</script>

<template>
  <section class="hero-section">
    <div class="homepage-container hero-section__inner">
      <h1 ref="titleRef" class="hero-section__title">
        Longbridge Developers
      </h1>
      <p class="hero-section__subtitle hero-fade-up" style="animation-delay: 0.5s">
        {{ t('home.subtitle') }}
      </p>

      <!-- Typing showcase (bun.sh style) -->
      <div class="hero-typing hero-fade-up" style="animation-delay: 0.65s">
        <div class="hero-typing__window">
          <div class="hero-typing__dots">
            <span /><span /><span />
          </div>
          <div class="hero-typing__line">
            <span class="hero-typing__prompt">{{ showcaseLines[currentLine].prompt }}</span>
            <span
              class="hero-typing__text"
              :style="showcaseLines[currentLine].color ? { color: showcaseLines[currentLine].color } : {}"
            >{{ displayedText }}</span>
            <span class="typing-cursor" />
          </div>
        </div>
      </div>

      <!-- Tab switcher for install commands -->
      <div class="hero-fade-up" style="animation-delay: 0.8s">
        <ProductTabs :tabs="tabs" />
      </div>

      <div class="hero-section__cta hero-fade-up" style="animation-delay: 1s">
        <a href="/docs/getting-started" class="hero-section__btn hero-section__btn--primary">
          {{ t('home.getStarted') }}
        </a>
        <a href="/docs/api" class="hero-section__btn hero-section__btn--secondary">
          {{ t('home.apiReference') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  text-align: center;
  padding: 80px 0 56px;
}

.hero-section__title {
  font-size: 50px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  color: var(--text-color-1);
}

.hero-section__subtitle {
  font-size: 18px;
  color: var(--text-color-1-supplement);
  margin-bottom: 32px;
  white-space: pre-line;
}

/* Typing showcase */
.hero-typing {
  margin-bottom: 28px;
}

.hero-typing__window {
  max-width: 640px;
  margin: 0 auto;
  background: var(--home-bg-color-1);
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.dark .hero-typing__window {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.hero-typing__dots {
  display: flex;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid var(--border-color);
}

.dark .hero-typing__dots {
  background: rgba(255, 255, 255, 0.04);
}

.hero-typing__dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-color);
}

.hero-typing__line {
  padding: 18px 20px;
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
  min-height: 56px;
  display: flex;
  align-items: center;
  color: var(--text-color-1);
}

.hero-typing__prompt {
  color: var(--brand-color);
  user-select: none;
  margin-right: 10px;
  font-weight: 600;
}

.hero-typing__text {
  white-space: nowrap;
  overflow: hidden;
}

/* CTA */
.hero-section__cta {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.hero-section__btn {
  border-radius: 6px;
  padding: 12px 28px;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  display: inline-block;
}

.hero-section__btn--primary {
  background: var(--brand-color);
  color: #fff;
  border: none;
}

.hero-section__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 184, 184, 0.3);
}

.hero-section__btn--secondary {
  background: transparent;
  color: var(--brand-color);
  border: 1.5px solid var(--brand-color);
}

.hero-section__btn--secondary:hover {
  background: var(--brand-5);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .hero-section { padding: 56px 0 40px; }
  .hero-section__title { font-size: 34px; }
  .hero-section__subtitle { font-size: 16px; }
  .hero-section__cta { flex-direction: column; align-items: center; }
  .hero-typing__line { font-size: 12px; }
}
</style>
