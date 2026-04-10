<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const products = [
  { name: 'OpenAPI', cmd: 'pip install longbridge', link: '/docs/getting-started', color: 'var(--brand-color)' },
  { name: 'MCP', cmd: 'claude mcp add longbridge ...', link: '/docs/mcp', color: '#8b5cf6' },
  { name: 'CLI', cmd: 'curl -fsSL .../install | bash', link: '/docs/cli', color: '#f59e0b' },
  { name: 'SKILL', cmd: 'npx skills add longbridge/...', link: '/skill', color: '#ec4899' },
]
</script>

<template>
  <section class="homepage-section homepage-section--white">
    <div class="homepage-container">
      <div class="gs-header reveal">
        <h2 class="gs-title">{{ t('home.getStarted') }}</h2>
      </div>
      <div class="gs-grid">
        <a
          v-for="(p, i) in products"
          :key="p.name"
          :href="p.link"
          class="gs-card reveal"
          :class="`reveal-d${i + 1}`"
        >
          <div class="gs-name">{{ p.name }}</div>
          <div class="gs-cmd">{{ p.cmd }}</div>
          <span class="gs-link" :style="{ color: p.color }">Quick Start &rarr;</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gs-header { text-align: center; margin-bottom: 40px; }

.gs-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-color-1);
}

.gs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.gs-card {
  background: var(--home-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 24px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  display: block;
}

.gs-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--brand-color);
}

.gs-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-color-1);
}

.gs-cmd {
  font-family: 'SF Mono', ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--text-color-3);
  background: var(--front-bg-color);
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  word-break: break-all;
}

.gs-link {
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .gs-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .gs-grid { grid-template-columns: 1fr; }
}
</style>
