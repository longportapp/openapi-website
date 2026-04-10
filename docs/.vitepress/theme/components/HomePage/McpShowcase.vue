<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const tools = ['Claude Code', 'Cursor', 'Zed', 'ChatGPT', 'Codex', 'Cherry Studio']
const endpoint = 'https://openapi.longbridge.com/mcp'
const setupCmd = `claude mcp add --transport http longbridge ${endpoint}`
</script>

<template>
  <div class="mcp-showcase">
    <div class="mcp-showcase__label">MCP Endpoint</div>
    <div class="mcp-showcase__url">{{ endpoint }}</div>

    <div class="mcp-showcase__label" style="margin-top: 16px">{{ t('home.mcp.supportedTools') }}</div>
    <div class="mcp-showcase__tools">
      <span v-for="tool in tools" :key="tool" class="mcp-showcase__tool">{{ tool }}</span>
    </div>

    <div class="mcp-showcase__label">Quick Setup</div>
    <div class="mcp-showcase__cmd">$ {{ setupCmd }}</div>
  </div>
</template>

<style scoped>
.mcp-showcase {
  background: var(--home-bg-color-1);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.mcp-showcase__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-color-3);
  margin-bottom: 8px;
}

.mcp-showcase__url {
  font-family: 'SF Mono', ui-monospace, monospace;
  font-size: 14px;
  color: var(--brand-color);
  font-weight: 600;
  background: var(--brand-5);
  padding: 10px 14px;
  border-radius: 6px;
  margin-bottom: 16px;
  word-break: break-all;
}

.mcp-showcase__tools {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.mcp-showcase__tool {
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 6px;
  background: var(--front-bg-color);
  color: var(--text-color-2);
  transition: all 0.2s;
  cursor: default;
}

.mcp-showcase__tool:hover {
  color: var(--brand-color);
  background: var(--brand-5);
}

.mcp-showcase__cmd {
  font-family: 'SF Mono', ui-monospace, monospace;
  font-size: 12px;
  color: var(--text-color-2);
  background: var(--front-bg-color);
  padding: 10px 14px;
  border-radius: 6px;
  word-break: break-all;
}
</style>
