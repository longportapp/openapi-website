<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { VueFlow, Position, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

const nodeDefaults = {
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
}

const nodes = ref([
  // Layer 1: Client
  {
    id: 'dev',
    type: 'custom',
    position: { x: 300, y: 0 },
    data: { label: 'Developer App', layer: 'CLIENT' },
    ...nodeDefaults,
  },
  // Layer 2: Auth
  {
    id: 'oauth',
    type: 'custom',
    position: { x: 300, y: 100 },
    data: { label: 'OAuth 2.0', layer: 'AUTH' },
    ...nodeDefaults,
  },
  // Layer 3: Access
  {
    id: 'sdk',
    type: 'custom',
    position: { x: 50, y: 220 },
    data: { label: 'SDK' },
    ...nodeDefaults,
  },
  {
    id: 'cli',
    type: 'custom',
    position: { x: 190, y: 220 },
    data: { label: 'CLI' },
    ...nodeDefaults,
  },
  {
    id: 'mcp',
    type: 'custom',
    position: { x: 310, y: 220 },
    data: { label: 'MCP' },
    ...nodeDefaults,
  },
  {
    id: 'http',
    type: 'custom',
    position: { x: 430, y: 220 },
    data: { label: 'HTTP' },
    ...nodeDefaults,
  },
  {
    id: 'ws',
    type: 'custom',
    position: { x: 550, y: 220 },
    data: { label: 'WebSocket' },
    ...nodeDefaults,
  },
  // Layer 4: Gateway
  {
    id: 'gateway',
    type: 'gateway',
    position: { x: 250, y: 350 },
    data: { label: 'API Gateway' },
    ...nodeDefaults,
  },
  // Layer 5: Services
  {
    id: 'quote',
    type: 'service',
    position: { x: 80, y: 470 },
    data: { label: 'Quote API', protocol: 'WebSocket + HTTP' },
    ...nodeDefaults,
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  },
  {
    id: 'trade',
    type: 'service',
    position: { x: 280, y: 470 },
    data: { label: 'Trade API', protocol: 'WebSocket + REST' },
    ...nodeDefaults,
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  },
  {
    id: 'content',
    type: 'service',
    position: { x: 480, y: 470 },
    data: { label: 'Content API', protocol: 'REST' },
    ...nodeDefaults,
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  },
])

// Responsive: re-fit view on resize
const { fitView } = useVueFlow()
let resizeObserver: ResizeObserver | undefined
const wrapRef = ref<HTMLElement>()

onMounted(() => {
  if (wrapRef.value) {
    resizeObserver = new ResizeObserver(() => {
      setTimeout(() => fitView({ padding: 0.15 }), 50)
    })
    resizeObserver.observe(wrapRef.value)
  }
})

onBeforeUnmount(() => resizeObserver?.disconnect())

const edgeDefaults = {
  animated: true,
  style: { stroke: 'var(--brand-color)', strokeWidth: 2 },
}

const edges = ref([
  { id: 'e-dev-oauth', source: 'dev', target: 'oauth', ...edgeDefaults },
  { id: 'e-oauth-sdk', source: 'oauth', target: 'sdk', ...edgeDefaults },
  { id: 'e-oauth-cli', source: 'oauth', target: 'cli', ...edgeDefaults },
  { id: 'e-oauth-mcp', source: 'oauth', target: 'mcp', ...edgeDefaults },
  { id: 'e-oauth-http', source: 'oauth', target: 'http', ...edgeDefaults },
  { id: 'e-oauth-ws', source: 'oauth', target: 'ws', ...edgeDefaults },
  { id: 'e-sdk-gw', source: 'sdk', target: 'gateway', ...edgeDefaults },
  { id: 'e-cli-gw', source: 'cli', target: 'gateway', ...edgeDefaults },
  { id: 'e-mcp-gw', source: 'mcp', target: 'gateway', ...edgeDefaults },
  { id: 'e-http-gw', source: 'http', target: 'gateway', ...edgeDefaults },
  { id: 'e-ws-gw', source: 'ws', target: 'gateway', ...edgeDefaults },
  { id: 'e-gw-quote', source: 'gateway', target: 'quote', ...edgeDefaults },
  { id: 'e-gw-trade', source: 'gateway', target: 'trade', ...edgeDefaults },
  { id: 'e-gw-content', source: 'gateway', target: 'content', ...edgeDefaults },
])
</script>

<template>
  <div ref="wrapRef" class="arch-flow-wrap">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :fit-view-on-init="true"
      :nodes-draggable="false"
      :nodes-connectable="false"
      :zoom-on-scroll="false"
      :zoom-on-pinch="false"
      :pan-on-drag="false"
      :prevent-scrolling="false"
      :min-zoom="0.3"
      :max-zoom="2"
    >
      <Background :gap="20" :size="1" />

      <!-- Custom node: default -->
      <template #node-custom="{ data }">
        <div class="flow-node">
          <span class="flow-node-label">{{ data.label }}</span>
        </div>
      </template>

      <!-- Gateway node -->
      <template #node-gateway="{ data }">
        <div class="flow-node flow-node-gw">
          <span class="flow-node-label">{{ data.label }}</span>
        </div>
      </template>

      <!-- Service node -->
      <template #node-service="{ data }">
        <div class="flow-node flow-node-svc">
          <span class="flow-node-label">{{ data.label }}</span>
          <span class="flow-node-proto">{{ data.protocol }}</span>
        </div>
      </template>
    </VueFlow>
  </div>
</template>

<style scoped>
.arch-flow-wrap {
  width: 100%;
  max-width: 56rem;
  height: 36rem;
  margin: 0 auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  overflow: hidden;
}

/* Node styles */
.flow-node {
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  border: 1.5px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  text-align: center;
  min-width: 5rem;
}

.flow-node:hover {
  border-color: var(--brand-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand-color) 8%, transparent);
}

.flow-node-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

/* Gateway */
.flow-node-gw {
  border-color: var(--brand-color);
  background: color-mix(in srgb, var(--brand-color) 6%, var(--vp-c-bg));
  padding: 0.625rem 2rem;
}

.flow-node-gw .flow-node-label {
  color: var(--brand-color);
  font-weight: 700;
  font-size: 1rem;
}

/* Service */
.flow-node-svc {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
}

.flow-node-proto {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Override vue-flow theme for our design */
:deep(.vue-flow__node) {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
  padding: 0 !important;
}

:deep(.vue-flow__edge-path) {
  stroke: var(--brand-color) !important;
  stroke-width: 1.5 !important;
}

:deep(.vue-flow__edge.animated path) {
  stroke-dasharray: 5 !important;
  animation: flow-dash 1s linear infinite !important;
}

@keyframes flow-dash {
  to {
    stroke-dashoffset: -10;
  }
}

:deep(.vue-flow__background) {
  --vf-dot: var(--vp-c-divider);
}

@media (max-width: 640px) {
  .arch-flow-wrap {
    height: 28rem;
  }
}
</style>
