<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ProductTabs from './ProductTabs.vue'

const { t } = useI18n()

const titleRef = ref<HTMLElement | null>(null)

const tabs = [
  { key: 'openapi', label: 'OpenAPI', command: 'pip install longbridge' },
  { key: 'mcp', label: 'MCP', command: 'claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp' },
  { key: 'cli', label: 'CLI', command: 'curl -fsSL https://longbridge.sh/install | bash' },
  { key: 'skill', label: 'SKILL', command: 'npx skills add longbridge/developers -g -y' },
]

onMounted(() => {
  if (!titleRef.value) return
  const text = titleRef.value.textContent || ''
  titleRef.value.innerHTML = ''
  ;[...text].forEach((char, i) => {
    const span = document.createElement('span')
    span.className = 'hero-char'
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.animationDelay = `${i * 0.03}s`
    titleRef.value!.appendChild(span)
  })
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

      <div class="hero-fade-up" style="animation-delay: 0.65s">
        <ProductTabs :tabs="tabs" />
      </div>

      <div class="hero-section__cta hero-fade-up" style="animation-delay: 0.95s">
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
  padding: 88px 0 72px;
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
  margin-bottom: 40px;
  white-space: pre-line;
}

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
  .hero-section { padding: 64px 0 48px; }
  .hero-section__title { font-size: 34px; }
  .hero-section__subtitle { font-size: 16px; }
  .hero-section__cta { flex-direction: column; align-items: center; }
}
</style>
