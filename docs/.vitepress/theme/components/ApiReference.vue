<script setup lang="ts">
import { load } from 'js-yaml'
import MarkdownIt from 'markdown-it'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import spec from '../../../../openapi.yaml?raw'

const md = new MarkdownIt({ html: false, linkify: false })

interface Parameter {
  name: string
  in: string
  required?: boolean
  description?: string
  schema?: { type?: string }
}

interface Operation {
  operationId: string
  summary: string
  description?: string
  tags?: string[]
  parameters?: Parameter[]
  requestBody?: {
    content?: {
      'application/json'?: {
        schema?: {
          required?: string[]
          properties?: Record<string, { type?: string; description?: string }>
        }
      }
    }
  }
}

interface EndpointItem {
  method: string
  path: string
  operation: Operation
}

interface TagGroup {
  name: string
  endpoints: EndpointItem[]
}

function parseSpec(): TagGroup[] {
  const parsed = load(spec) as any
  const paths = parsed.paths ?? {}
  const httpMethods = ['get', 'post', 'put', 'delete', 'patch']
  const endpointsByTag: Record<string, EndpointItem[]> = {}

  for (const [path, pathItem] of Object.entries(paths as Record<string, any>)) {
    for (const method of httpMethods) {
      const operation = pathItem[method] as Operation | undefined
      if (!operation) continue
      const tags = operation.tags?.length ? operation.tags : ['Other']
      for (const tag of tags) {
        if (!endpointsByTag[tag]) endpointsByTag[tag] = []
        endpointsByTag[tag].push({ method: method.toUpperCase(), path, operation })
      }
    }
  }

  const specTags: string[] = ((parsed.tags ?? []) as any[]).map((t: any) => t.name)
  const orderedTags = [
    ...specTags,
    ...Object.keys(endpointsByTag).filter(t => !specTags.includes(t)),
  ]

  return orderedTags
    .filter(tag => endpointsByTag[tag])
    .map(tag => ({ name: tag, endpoints: endpointsByTag[tag] }))
}

function splitDescriptionAndCode(mdText: string): { prose: string; codeBlocks: string[] } {
  const codeBlockRegex = /^```[\w-]*\n[\s\S]*?^```/gm
  const codeBlocks = [...mdText.matchAll(codeBlockRegex)].map(m => m[0])
  const prose = mdText.replace(codeBlockRegex, '').trim()
  return { prose, codeBlocks }
}

function parseCodeBlock(raw: string): { lang: string; code: string } {
  const match = raw.match(/^```([\w-]*)\n([\s\S]*?)^```/m)
  return { lang: match?.[1] ?? '', code: match?.[2]?.trimEnd() ?? '' }
}

const STORAGE_KEY = 'api-reference-sidebar-width'

const tagGroups = ref<TagGroup[]>([])
const selectedEndpoint = ref<EndpointItem | null>(null)
const sidebarWidth = ref(240)
const isCollapsed = ref(false)

let isResizing = false

function onResizeMousedown(e: MouseEvent) {
  isResizing = true
  e.preventDefault()
}

function onMousemove(e: MouseEvent) {
  if (!isResizing) return
  sidebarWidth.value = Math.min(400, Math.max(160, e.clientX))
  localStorage.setItem(STORAGE_KEY, String(sidebarWidth.value))
}

function onMouseup() {
  isResizing = false
}

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}

const selectedProse = computed(() => {
  const desc = selectedEndpoint.value?.operation.description
  if (!desc) return ''
  return md.render(splitDescriptionAndCode(desc).prose)
})

const selectedCodeBlocks = computed(() => {
  const desc = selectedEndpoint.value?.operation.description
  if (!desc) return []
  return splitDescriptionAndCode(desc).codeBlocks.map(parseCodeBlock)
})

const selectedParameters = computed(() => selectedEndpoint.value?.operation.parameters ?? [])

const selectedRequestBody = computed(() => {
  const rb = selectedEndpoint.value?.operation.requestBody
  if (!rb) return null
  const schema = rb.content?.['application/json']?.schema
  if (!schema?.properties) return 'fallback' as const
  return Object.entries(schema.properties).map(([name, prop]: [string, any]) => ({
    name,
    type: prop.type ?? 'object',
    description: prop.description ?? '',
    required: (schema.required ?? []).includes(name),
  }))
})

async function copyCode(code: string) {
  await navigator.clipboard.writeText(code)
}

function methodClass(method: string) {
  return `method-${method.toLowerCase()}`
}

onMounted(() => {
  tagGroups.value = parseSpec()
  if (tagGroups.value[0]?.endpoints[0]) {
    selectedEndpoint.value = tagGroups.value[0].endpoints[0]
  }
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) sidebarWidth.value = parseInt(stored, 10)
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)
})
</script>

<template>
  <div class="api-reference-page">
    <div
      class="api-sidebar"
      :class="{ collapsed: isCollapsed }"
      :style="isCollapsed ? {} : { width: sidebarWidth + 'px' }"
    >
      <div v-if="!isCollapsed" class="sidebar-content">
        <div v-for="group in tagGroups" :key="group.name" class="tag-group">
          <div class="tag-label">{{ group.name }}</div>
          <button
            v-for="ep in group.endpoints"
            :key="ep.operation.operationId"
            class="endpoint-item"
            :class="{ active: selectedEndpoint?.operation.operationId === ep.operation.operationId }"
            @click="selectedEndpoint = ep"
          >
            <span class="method-badge" :class="methodClass(ep.method)">{{ ep.method }}</span>
            <span class="endpoint-summary">{{ ep.operation.summary }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="resize-handle" @mousedown="onResizeMousedown">
      <button class="toggle-btn" @click.stop="toggleSidebar">
        {{ isCollapsed ? '›' : '‹' }}
      </button>
    </div>

    <div v-if="selectedEndpoint" class="api-content">
      <div class="content-top">
        <div class="endpoint-header">
          <span class="method-badge large" :class="methodClass(selectedEndpoint.method)">
            {{ selectedEndpoint.method }}
          </span>
          <code class="endpoint-path">{{ selectedEndpoint.path }}</code>
        </div>
        <h2 class="endpoint-title">{{ selectedEndpoint.operation.summary }}</h2>

        <div v-if="selectedProse" class="prose vp-doc" v-html="selectedProse" />

        <div class="params-section">
          <div class="section-label">Parameters</div>
          <p v-if="selectedParameters.length === 0" class="no-params">No parameters.</p>
          <table v-else class="params-table">
            <thead>
              <tr>
                <th>Name</th><th>Type</th><th>In</th><th>Required</th><th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in selectedParameters" :key="p.name">
                <td><code>{{ p.name }}</code></td>
                <td>{{ p.schema?.type ?? '—' }}</td>
                <td>{{ p.in }}</td>
                <td>{{ p.required ? '✓' : '' }}</td>
                <td>{{ p.description ?? '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="selectedRequestBody" class="params-section">
          <div class="section-label">Request Body</div>
          <p v-if="selectedRequestBody === 'fallback'" class="no-params">
            Request body — see code example below.
          </p>
          <table v-else class="params-table">
            <thead>
              <tr>
                <th>Field</th><th>Type</th><th>Required</th><th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in (selectedRequestBody as any[])" :key="field.name">
                <td><code>{{ field.name }}</code></td>
                <td>{{ field.type }}</td>
                <td>{{ field.required ? '✓' : '' }}</td>
                <td>{{ field.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-bottom">
        <p v-if="selectedCodeBlocks.length === 0" class="no-params">No code examples.</p>
        <div v-for="(block, i) in selectedCodeBlocks" :key="i" class="code-block-wrapper">
          <div class="code-block-header">
            <span class="lang-label">{{ block.lang || 'code' }}</span>
            <button class="copy-btn" @click="copyCode(block.code)">Copy</button>
          </div>
          <pre class="code-block-pre"><code>{{ block.code }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.api-reference-page {
  display: flex;
  height: calc(100vh - var(--vp-nav-height));
  overflow: hidden;
}

.api-sidebar {
  flex-shrink: 0;
  background: var(--vp-c-bg-soft);
  border-right: 1px solid var(--vp-c-divider);
  overflow-y: auto;
  width: 240px;
}

.api-sidebar.collapsed {
  width: 0 !important;
  overflow: hidden;
}

.sidebar-content {
  padding: 12px 8px;
}

.tag-group {
  margin-bottom: 12px;
}

.tag-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
  padding: 0 8px;
  margin-bottom: 4px;
}

.endpoint-item {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 2px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.endpoint-item:hover {
  background: var(--vp-c-default-soft);
}

.endpoint-item.active {
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.endpoint-summary {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.method-badge {
  display: inline-flex;
  align-items: center;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
}

.method-badge.large {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 5px;
}

.method-get    { color: var(--vp-c-success-1);   background: var(--vp-c-success-soft);   }
.method-post   { color: var(--vp-c-brand-1);     background: var(--vp-c-brand-soft);     }
.method-put    { color: var(--vp-c-warning-1);   background: var(--vp-c-warning-soft);   }
.method-delete { color: var(--vp-c-danger-1);    background: var(--vp-c-danger-soft);    }
.method-patch  { color: var(--vp-c-important-1); background: var(--vp-c-important-soft); }

.resize-handle {
  width: 8px;
  flex-shrink: 0;
  background: var(--vp-c-divider);
  cursor: col-resize;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn {
  position: absolute;
  right: -10px;
  width: 18px;
  height: 32px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 12px;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 0;
}

.api-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.content-top {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.content-bottom {
  flex: 1;
  overflow-y: auto;
  padding: 20px 28px;
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.endpoint-path {
  font-size: 14px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
}

.endpoint-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
}

.prose {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 16px;
}

.params-section {
  margin-bottom: 16px;
}

.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.no-params {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 0;
}

.params-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.params-table th,
.params-table td {
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
  color: var(--vp-c-text-2);
}

.params-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 12px;
}

.params-table code {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  background: var(--vp-c-bg-soft);
  padding: 1px 4px;
  border-radius: 3px;
}

.code-block-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.lang-label {
  font-size: 11px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
}

.copy-btn {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 3px;
}

.copy-btn:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.code-block-pre {
  margin: 0;
  padding: 14px 16px;
  background: var(--vp-code-block-bg);
  color: var(--vp-code-block-color);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
}

.code-block-pre code {
  font-family: inherit;
  font-size: inherit;
  background: transparent;
  padding: 0;
  color: inherit;
}
</style>
