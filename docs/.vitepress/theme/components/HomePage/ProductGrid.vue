<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const products = [
  {
    name: 'OpenAPI',
    descKey: 'home.grid.openapi',
    cmd: 'pip install longbridge',
    link: '/docs/getting-started',
    color: 'var(--brand-color)',
    bgColor: 'var(--brand-5)',
    icon: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
  },
  {
    name: 'MCP',
    descKey: 'home.grid.mcp',
    cmd: 'claude mcp add longbridge https://openapi.longbridge.com/mcp',
    link: '/docs/mcp',
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.08)',
    icon: `<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>`,
  },
  {
    name: 'CLI',
    descKey: 'home.grid.cli',
    cmd: 'curl -fsSL https://longbridge.sh/install | bash',
    link: '/docs/cli',
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.08)',
    icon: `<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>`,
  },
  {
    name: 'SKILL',
    descKey: 'home.grid.skill',
    cmd: 'npx skills add longbridge/developers -g -y',
    link: '/skill',
    color: '#ec4899',
    bgColor: 'rgba(236,72,153,0.08)',
    icon: `<path d="m12 3-1.9 5.8a2 2 0 01-1.3 1.3L3 12l5.8 1.9a2 2 0 011.3 1.3L12 21l1.9-5.8a2 2 0 011.3-1.3L21 12l-5.8-1.9a2 2 0 01-1.3-1.3L12 3z"/>`,
  },
]
</script>

<template>
  <section class="pg-section">
    <div class="homepage-container">
      <p class="pg-intro reveal">{{ t('home.grid.intro') }}</p>
      <div class="pg-grid">
        <a
          v-for="(p, i) in products"
          :key="p.name"
          :href="p.link"
          class="pg-card reveal"
          :class="`reveal-d${i + 1}`"
          :style="{ '--card-accent': p.color }"
        >
          <div class="pg-icon" :style="{ background: p.bgColor, color: p.color }">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="p.icon" />
          </div>
          <div class="pg-name">{{ p.name }}</div>
          <p class="pg-desc">{{ t(p.descKey) }}</p>
          <div class="pg-cmd"><span class="pg-ps">$</span>{{ p.cmd }}</div>
          <span class="pg-link" :style="{ color: p.color }">Docs &rarr;</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pg-section { padding: 32px 0 64px; }

.pg-intro {
  text-align: center; font-size: 15px; color: var(--text-color-3);
  font-weight: 500; margin-bottom: 24px;
}

.pg-intro :deep(b) { color: var(--text-color-1); font-weight: 700; }

.pg-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}

.pg-card {
  background: var(--home-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px; padding: 24px;
  text-decoration: none; color: inherit;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative; overflow: hidden; display: block;
}

.pg-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--card-accent); opacity: 0; transition: opacity 0.2s;
}

.pg-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  border-color: var(--card-accent);
  text-decoration: none;
}

.pg-card:hover::before { opacity: 1; }

.pg-icon {
  width: 36px; height: 36px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px;
}

.pg-name { font-size: 18px; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.01em; }

.pg-desc {
  font-size: 13px; color: var(--text-color-2); line-height: 1.5;
  margin-bottom: 14px; min-height: 60px;
}

.pg-cmd {
  background: #1b1b1f;
  border-radius: 6px; padding: 10px 12px;
  font-family: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px; color: #e5e7eb;
  margin-bottom: 14px; word-break: break-all; line-height: 1.6;
}

.pg-ps { color: #00d4b8; user-select: none; margin-right: 6px; }

.pg-link {
  font-size: 13px; font-weight: 600;
  display: inline-flex; align-items: center; gap: 4px;
  transition: gap 0.2s;
}

.pg-card:hover .pg-link { gap: 8px; }

@media (max-width: 900px) { .pg-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .pg-grid { grid-template-columns: 1fr; } }
</style>
