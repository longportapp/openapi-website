<script setup lang="ts">
import { load } from 'js-yaml'
import MarkdownIt from 'markdown-it'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import spec from '../../../../openapi.yaml?raw'

const { t } = useI18n()
const md = new MarkdownIt({ html: false, linkify: false })

interface Parameter {
  name: string
  in: string
  required?: boolean
  description?: string
  schema?: { type?: string }
}

interface ParamRow {
  name: string
  type: string
  location: string
  required: boolean
  description: string
}

interface Section {
  key: string
  title: string
  params: ParamRow[]
  fallback?: boolean
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
  responses?: Record<string, {
    description?: string
    content?: {
      'application/json'?: {
        schema?: {
          properties?: Record<string, { type?: string; description?: string }>
        }
      }
    }
  }>
}

interface EndpointItem { method: string; path: string; operation: Operation }
interface TagGroup { name: string; endpoints: EndpointItem[] }

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
  const orderedTags = [...specTags, ...Object.keys(endpointsByTag).filter(t => !specTags.includes(t))]
  return orderedTags.filter(tag => endpointsByTag[tag]).map(tag => ({ name: tag, endpoints: endpointsByTag[tag] }))
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
const copiedIndex = ref<number | null>(null)
let isResizing = false

function onResizeMousedown(e: MouseEvent) { isResizing = true; e.preventDefault() }
function onMousemove(e: MouseEvent) {
  if (!isResizing) return
  sidebarWidth.value = Math.min(400, Math.max(160, e.clientX))
  localStorage.setItem(STORAGE_KEY, String(sidebarWidth.value))
}
function onMouseup() { isResizing = false }
function toggleSidebar() { isCollapsed.value = !isCollapsed.value }

const selectedSplit = computed(() => {
  const desc = selectedEndpoint.value?.operation.description
  if (!desc) return { prose: '', codeBlocks: [] as string[] }
  return splitDescriptionAndCode(desc)
})

const selectedProse = computed(() => {
  if (!selectedSplit.value.prose) return ''
  return md.render(selectedSplit.value.prose)
})

const selectedCodeBlocks = computed(() => selectedSplit.value.codeBlocks.map(parseCodeBlock))

const selectedSections = computed((): Section[] => {
  const ep = selectedEndpoint.value
  if (!ep) return []
  const sections: Section[] = []

  // Authorizations (global OAuth2 Bearer applies to all endpoints)
  sections.push({
    key: 'auth',
    title: t('api.section.authorizations'),
    params: [{
      name: 'Authorization',
      type: 'string',
      location: 'header',
      required: true,
      description: t('api.authDescription'),
    }],
  })

  // Path parameters
  const pathParams = (ep.operation.parameters ?? []).filter(p => p.in === 'path')
  if (pathParams.length > 0) {
    sections.push({
      key: 'path',
      title: t('api.section.pathParams'),
      params: pathParams.map(p => ({
        name: p.name,
        type: p.schema?.type ?? 'string',
        location: 'path',
        required: p.required !== false,
        description: p.description ?? '',
      })),
    })
  }

  // Query parameters
  const queryParams = (ep.operation.parameters ?? []).filter(p => p.in === 'query')
  if (queryParams.length > 0) {
    sections.push({
      key: 'query',
      title: t('api.section.queryParams'),
      params: queryParams.map(p => ({
        name: p.name,
        type: p.schema?.type ?? 'string',
        location: 'query',
        required: p.required === true,
        description: p.description ?? '',
      })),
    })
  }

  // Request body
  const rb = ep.operation.requestBody
  if (rb) {
    const schema = rb.content?.['application/json']?.schema
    if (schema?.properties) {
      sections.push({
        key: 'body',
        title: t('api.section.body'),
        params: Object.entries(schema.properties).map(([name, prop]: [string, any]) => ({
          name,
          type: prop.type ?? 'object',
          location: 'body',
          required: (schema.required ?? []).includes(name),
          description: prop.description ?? '',
        })),
      })
    } else {
      sections.push({ key: 'body', title: t('api.section.body'), params: [], fallback: true })
    }
  }

  // Response 200
  const resp = ep.operation.responses?.['200']
  if (resp?.content?.['application/json']?.schema?.properties) {
    sections.push({
      key: 'response',
      title: t('api.section.response'),
      params: Object.entries(resp.content['application/json']!.schema!.properties!).map(([name, prop]: [string, any]) => ({
        name,
        type: prop.type ?? 'object',
        location: '',
        required: false,
        description: prop.description ?? '',
      })),
    })
  }

  return sections
})

async function copyCode(code: string, index: number) {
  await navigator.clipboard.writeText(code).catch(() => {})
  copiedIndex.value = index
  setTimeout(() => { copiedIndex.value = null }, 1500)
}

function methodClass(method: string) { return `method-${method.toLowerCase()}` }

onMounted(() => {
  tagGroups.value = parseSpec()
  if (tagGroups.value[0]?.endpoints[0]) selectedEndpoint.value = tagGroups.value[0].endpoints[0]
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    const n = parseInt(stored, 10)
    if (!isNaN(n)) sidebarWidth.value = n
  }
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
    <!-- Left sidebar -->
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
            :key="ep.operation.operationId ?? `${ep.method}-${ep.path}`"
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

    <!-- Resize handle + collapse toggle -->
    <div class="resize-handle" @mousedown="onResizeMousedown">
      <button class="toggle-btn" @click.stop="toggleSidebar">
        {{ isCollapsed ? '›' : '‹' }}
      </button>
    </div>

    <!-- Main: content + code panel side by side -->
    <div v-if="selectedEndpoint" class="api-main">
      <!-- Content area -->
      <div class="api-content">
        <div class="endpoint-tag">{{ selectedEndpoint.operation.tags?.[0] ?? '' }}</div>
        <h1 class="endpoint-title">{{ selectedEndpoint.operation.summary }}</h1>

        <div class="endpoint-path-row">
          <span class="method-badge large" :class="methodClass(selectedEndpoint.method)">
            {{ selectedEndpoint.method }}
          </span>
          <code class="endpoint-path">{{ selectedEndpoint.path }}</code>
        </div>

        <div v-if="selectedProse" class="prose vp-doc" v-html="selectedProse" />

        <!-- Sections -->
        <div v-for="section in selectedSections" :key="section.key" class="api-section">
          <h4 class="section-title">{{ section.title }}</h4>
          <p v-if="section.fallback" class="no-content">{{ $t('api.bodyFallback') }}</p>
          <div v-else class="param-list">
            <div v-for="param in section.params" :key="param.name" class="param-field">
              <div class="param-head">
                <span class="param-name">{{ param.name }}</span>
                <span class="param-badge type-badge">{{ param.type }}</span>
                <span v-if="param.location" class="param-badge location-badge">{{ param.location }}</span>
                <span
                  v-if="section.key !== 'response'"
                  class="param-badge"
                  :class="param.required ? 'required-badge' : 'optional-badge'"
                >{{ param.required ? $t('api.param.required') : $t('api.param.optional') }}</span>
              </div>
              <p v-if="param.description" class="param-desc">{{ param.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Code panel -->
      <div class="api-code-panel">
        <p v-if="selectedCodeBlocks.length === 0" class="no-content">{{ $t('api.noCodeExamples') }}</p>
        <div v-for="(block, i) in selectedCodeBlocks" :key="i" class="code-block-wrapper">
          <div class="code-block-header">
            <span class="lang-label">{{ block.lang || 'code' }}</span>
            <button class="copy-btn" @click="copyCode(block.code, i)">
              {{ copiedIndex === i ? $t('api.copied') : $t('api.copy') }}
            </button>
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
  font-size: 14px;
}

/* ── Sidebar ── */
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
  padding: 16px 8px;
}

.tag-group {
  margin-bottom: 16px;
}

.tag-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  padding: 0 10px;
  margin-bottom: 4px;
}

.endpoint-item {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 4px 10px;
  margin-bottom: 1px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.5;
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

/* ── Method badges ── */
.method-badge {
  display: inline-flex;
  align-items: center;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 4px;
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  letter-spacing: 0.02em;
}

.method-badge.large {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 5px;
}

.method-get    { color: var(--vp-c-success-1);   background: var(--vp-c-success-soft);   }
.method-post   { color: var(--vp-c-brand-1);     background: var(--vp-c-brand-soft);     }
.method-put    { color: var(--vp-c-warning-1);   background: var(--vp-c-warning-soft);   }
.method-delete { color: var(--vp-c-danger-1);    background: var(--vp-c-danger-soft);    }
.method-patch  { color: var(--vp-c-important-1); background: var(--vp-c-important-soft); }

/* ── Resize handle ── */
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

/* ── Main area ── */
.api-main {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-width: 0;
}

/* ── Content area ── */
.api-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px 40px 48px;
  min-width: 0;
}

.endpoint-tag {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.endpoint-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 14px;
  line-height: 1.25;
  border: none;
  padding: 0;
  letter-spacing: -0.02em;
}

.endpoint-path-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  width: fit-content;
  max-width: 100%;
}

.endpoint-path {
  font-size: 13px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  background: transparent;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.prose {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  margin-bottom: 24px;
}

/* ── Sections ── */
.api-section {
  margin-top: 28px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  letter-spacing: 0;
  border-top: none;
}

.no-content {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 12px 0 0;
  padding: 0;
}

/* ── Param rows ── */
.param-list {
  margin-top: 0;
}

.param-field {
  padding: 14px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.param-field:last-child {
  border-bottom: none;
}

.param-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.param-name {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.param-badge {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-family: var(--vp-font-family-mono);
  padding: 1px 6px;
  border-radius: 4px;
  line-height: 1.6;
}

.type-badge {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.location-badge {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-3);
}

.required-badge {
  background: color-mix(in srgb, var(--vp-c-danger-1) 12%, transparent);
  color: var(--vp-c-danger-1);
  font-weight: 600;
}

.optional-badge {
  background: transparent;
  color: var(--vp-c-text-3);
}

.param-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 6px 0 0;
  padding: 0;
  font-family: var(--vp-font-family-base);
}

/* ── Code panel ── */
.api-code-panel {
  width: 420px;
  flex-shrink: 0;
  border-left: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow-y: auto;
  padding: 20px 16px;
}

.code-block-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 12px;
  background: var(--vp-c-bg-mute);
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
  font-family: var(--vp-font-family-base);
  transition: color 0.15s;
}

.copy-btn:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.code-block-pre {
  margin: 0;
  padding: 12px 14px;
  background: var(--vp-code-block-bg);
  color: var(--vp-code-block-color);
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
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
