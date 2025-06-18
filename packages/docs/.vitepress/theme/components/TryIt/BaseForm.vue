<template>
  <div
    v-if="hasData"
    class="base-form border border-solid border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
    <div
      v-if="title"
      :class="[
        'flex items-center justify-between cursor-pointer select-none border-b border-gray-200 dark:border-white/10 p-4 hover:bg-gray-100 dark:hover:bg-white/5',
      ]"
      @click="toggleCollapsed">
      <h2 class="font-semibold text-gray-900 dark:text-gray-100 m-0">{{ title }}</h2>
      <div class="flex items-center gap-2" @click.stop>
        <slot name="title-actions"></slot>
      </div>
    </div>
    <div class="form-content" :class="{ collapsed: collapsed }">
      <div class="px-4 pb-4">
        <json-forms :data="data" :schema="schema" :uischema="uischema" :renderers="renderers" @change="onChange" />
      </div>
    </div>
  </div>
  <div v-else-if="emptyMessage" class="text-gray-500 dark:text-gray-400 text-sm">{{ emptyMessage }}</div>
</template>

<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue'
import { vanillaRenderers } from './renderers'
import { computed, ref, markRaw } from 'vue'

interface FormSchema {
  type: string
  properties: Record<string, any>
  required?: string[]
}

interface FormField {
  name: string
  type: string
  description?: string
  required?: boolean
}

interface Props {
  title?: string
  emptyMessage?: string
  schema?: FormSchema
  fields?: FormField[]
  initialData?: Record<string, any>
  defaultCollapsed?: boolean
  defaultUischemaOptions?: Record<string, any>
  uischemaOptions?: Record<string, Record<string, any>>
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  emptyMessage: '',
  schema: undefined,
  fields: () => [],
  initialData: () => ({}),
  defaultCollapsed: false,
  defaultUischemaOptions: () => ({ showUnfocusedDescription: true }),
  uischemaOptions: () => ({}),
})

// 定义事件
const emit = defineEmits<{
  'form-change': [data: Record<string, any>]
}>()

const renderers = markRaw([...vanillaRenderers])

// 展开收起状态
const collapsed = ref(props.defaultCollapsed)

// 切换展开收起状态
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}

// 计算是否有数据
const hasData = computed(() => {
  return (props.schema && Object.keys(props.schema.properties || {}).length > 0) || props.fields.length > 0
})

// 计算 schema，支持从 props.schema 或 props.fields 生成
const schema = computed(() => {
  if (props.schema) {
    return props.schema
  }

  if (props.fields.length === 0) {
    return { type: 'object', properties: {} }
  }

  const properties: Record<string, any> = {}
  const required: string[] = []

  props.fields.forEach((field) => {
    let jsonType = field.type.toLowerCase()
    let schemaProperty: any = {
      description: field.description || '',
    }

    if (jsonType === 'integer' || jsonType === 'int') {
      schemaProperty.type = 'number'
    } else if (jsonType === 'string[]') {
      schemaProperty.type = 'array'
      schemaProperty.items = {
        type: 'string',
      }
    } else {
      schemaProperty.type = jsonType
    }

    properties[field.name] = schemaProperty

    if (field.required) {
      required.push(field.name)
    }
  })

  return {
    type: 'object',
    properties,
    required: required.length > 0 ? required : undefined,
  }
})

// UI Schema 用于控制表单布局
const uischema = computed(() => {
  const fieldNames = props.schema ? Object.keys(props.schema.properties || {}) : props.fields.map((field) => field.name)

  const elements = fieldNames.map((name) => ({
    type: 'Control',
    scope: `#/properties/${name}`,
    options: {
      ...props.defaultUischemaOptions,
      ...(props.uischemaOptions[name] || {}),
    },
  }))

  return {
    type: 'VerticalLayout',
    elements,
  }
})

// 表单数据
const data = ref<Record<string, any>>(props.initialData)

// 表单变化处理
const onChange = (event: any) => {
  data.value = event.data
  emit('form-change', event.data)
}
</script>

<style lang="scss">
.base-form {
  .form-content {
    interpolate-size: allow-keywords;
    transition: height 0.3s ease-in-out;
    height: auto;
    overflow: hidden;
  }

  .form-content.collapsed {
    height: 0;
  }

  input {
    @apply w-full border border-gray-200/70 dark:border-white/10 rounded-lg border-solid text-sm py-1.5 px-2.5 text-gray-900 dark:text-gray-100  focus:border-gray-300 dark:focus:border-gray-500 focus:ring-gray-300 dark:focus:ring-gray-500 transition-all duration-200;
  }

  fieldset {
    border: none;
  }

  .horizontal-layout {
    display: flex;
    flex-direction: row;
  }

  .vertical-layout {
    display: flex;
    flex-direction: column;
  }

  .horizontal-layout-item,
  .vertical-layout-item {
    flex: 1;
  }

  .vertical-layout-item {
    @apply border-gray-200 dark:border-white/10 border-solid py-4 border-x-0 border-b-0;
  }

  .error {
    @apply text-red-500 dark:text-red-400;
  }

  .control {
    display: flex;
    flex-direction: column;
  }

  .control > .wrapper {
    display: flex;
  }

  .control > .wrapper > input,
  .control > .wrapper > select,
  .control > .wrapper > textarea {
    flex: 1;
  }

  .control > .error,
  .control > .description {
    min-height: 1.5em;
  }

  .array-list {
    display: flex;
    flex-direction: column;
  }
  .array-list-item {
    @apply flex items-start;
  }

  .array-list-item-toolbar {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    margin: 0.2em 0;
  }

  .array-list-item-toolbar > button {
    user-select: none;
    cursor: pointer;
  }
  .array-list-item-toolbar > button:disabled {
    cursor: initial;
  }

  .array-list-item-label {
    @apply mt-3;
  }

  .array-list-item-delete {
    @apply mt-3.5;
  }

  .array-list-item-content {
    display: none;
    padding: 0 1em;

    > .vertical-layout > .vertical-layout-item {
      @apply py-2 border-t-0;
      & > .control-wrapper {
        @apply items-center;
      }
    }
  }

  .array-list-item-content.expanded {
    display: block;
  }

  .categorization .categorization-category,
  .categorization .categorization-stepper {
    display: flex;
  }
  .categorization .categorization-stepper-line {
    flex-grow: 1;
    height: 1px;
    border-width: 0 0 1px 0;
  }
  .categorization .categorization-stepper-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
