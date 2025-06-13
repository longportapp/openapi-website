<template>
  <div
    v-if="props.parameters.length > 0"
    class="parameters-form border border-gray-200 dark:border-gray-600 rounded-lg p-4">
    <h2 class="pb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Params</h2>
    <json-forms :data="data" :schema="schema" :uischema="uischema" :renderers="renderers" @change="onChange" />
  </div>
  <div v-else class="text-gray-500 dark:text-gray-400 text-sm">No parameters required for this API</div>
</template>

<script setup lang="ts">
import type { ParameterRow } from '../../../types'
import { JsonForms } from '@jsonforms/vue'
import { vanillaRenderers } from './renderers'
import { computed, ref, markRaw } from 'vue'

interface Props {
  parameters?: ParameterRow[]
}

const props = withDefaults(defineProps<Props>(), {
  parameters: () => [],
})

// 定义事件
const emit = defineEmits<{
  'form-change': [data: Record<string, any>]
}>()

const renderers = markRaw([...vanillaRenderers])

// 将 ParameterRow[] 转换为 JSON Schema
const schema = computed(() => {
  const properties: Record<string, any> = {}
  const required: string[] = []

  props.parameters.forEach((param) => {
    // 将 API 参数类型转换为 JSON Schema 类型
    let jsonType = param.type.toLowerCase()
    let schemaProperty: any = {
      description: param.description,
    }

    if (jsonType === 'integer' || jsonType === 'int') {
      schemaProperty.type = 'number'
    } else if (jsonType === 'string[]') {
      // 处理字符串数组类型
      schemaProperty.type = 'array'
      schemaProperty.items = {
        type: 'string',
      }
    } else {
      schemaProperty.type = jsonType
    }

    properties[param.name] = schemaProperty

    // 如果 required 字段为 'true' 或 'yes'，则添加到 required 数组
    if (
      param.required.toLowerCase() === 'true' ||
      param.required.toLowerCase() === 'yes' ||
      param.required.toLowerCase() === '是'
    ) {
      required.push(param.name)
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
  const elements = props.parameters.map((param) => ({
    type: 'Control',
    scope: `#/properties/${param.name}`,
    options: {
      showUnfocusedDescription: true,
    },
  }))

  return {
    type: 'VerticalLayout',
    elements,
  }
})

// 表单数据
const data = ref<Record<string, any>>({})

// 表单变化处理
const onChange = (event: any) => {
  data.value = event.data
  console.log('Form data changed:', event.data)
  // 发出事件给父组件
  emit('form-change', event.data)
}
</script>

<style lang="scss">
.parameters-form {
  input {
    @apply w-full border border-gray-200 dark:border-gray-600 rounded-lg border-solid text-sm py-1.5 px-2.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-500 focus:ring-gray-300 dark:focus:ring-gray-500 transition-all duration-200;
  }

  button {
    @apply border border-gray-200 dark:border-gray-600 rounded-lg border-solid text-sm py-1 px-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:border-gray-300 dark:focus:border-gray-500 focus:ring-gray-300 dark:focus:ring-gray-500 transition-all duration-200;
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
    @apply border-t border-gray-200 dark:border-gray-600 border-solid py-4;
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
    background-color: rgb(238, 238, 238);
    @apply dark:bg-gray-600;
    flex: 1;
    padding-left: 0.5em;
    height: 1.5em;
    line-height: 1.5em;
  }
  .array-list-item-label:hover {
    background-color: rgb(221, 221, 221);
    @apply dark:bg-gray-500;
  }

  .array-list-item-content {
    display: none;
    padding: 0 1em;
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
