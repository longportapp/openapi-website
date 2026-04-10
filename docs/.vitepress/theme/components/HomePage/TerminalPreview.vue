<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="terminal">
    <div class="terminal__header">
      <span class="terminal__dot terminal__dot--red" />
      <span class="terminal__dot terminal__dot--yellow" />
      <span class="terminal__dot terminal__dot--green" />
      <span class="terminal__title">{{ title || 'terminal' }}</span>
    </div>
    <div class="terminal__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.terminal {
  background: #1b1b1f;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.terminal__header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.terminal__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.terminal__dot--red { background: #ff5f57; }
.terminal__dot--yellow { background: #febc2e; }
.terminal__dot--green { background: #28c840; }

.terminal__title {
  font-size: 12px;
  color: #6b7280;
  margin-left: 8px;
  font-family: 'SF Mono', ui-monospace, monospace;
}

.terminal__body {
  padding: 16px 20px;
  font-family: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  color: #e5e7eb;
  line-height: 1.9;
  overflow-x: auto;
}
</style>
