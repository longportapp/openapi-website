<template>
  <div v-if="visible" :id="id" class="control-wrapper">
    <div class="flex gap-2 md:gap-6 flex-col md:flex-row">
      <!-- 左侧：字段信息区域 -->
      <div class="field-info flex-1 min-w-0">
        <!-- 字段标题行 -->
        <div class="field-header mb-2">
          <div class="flex items-center gap-2 mb-1">
            <label :for="id + '-input'" class="field-label text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ label }}
            </label>
            <span v-if="type" class="field-type text-xs text-gray-500 dark:text-gray-400 font-mono px-1.5 py-0.5">
              {{ type }}
            </span>
            <span
              v-if="showAsterisk"
              class="required-badge inline-flex items-center px-2 py-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-red-100/50 dark:bg-red-400/10 text-red-600 dark:text-red-300 font-medium whitespace-nowrap">
              required
            </span>
            <span v-else class="optional-badge text-xs text-gray-400 dark:text-gray-500 font-medium"> optional </span>
          </div>
        </div>

        <!-- 描述信息 -->
        <div
          v-if="showDescription && description"
          class="field-description text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2 vp-doc">
          <div v-html="description"></div>
        </div>

        <!-- 错误信息 -->
        <!-- <div v-if="errors" class="field-errors text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded px-3 py-2">
          {{ errors }}
        </div> -->
      </div>

      <!-- 右侧：输入控件区域 -->
      <div class="control-input-wrapper flex-shrink-0 flex-1 max-w-80">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isDescriptionHidden } from '@jsonforms/core'
import { defineComponent, PropType } from 'vue'
import { Styles } from '../styles'
import { Options } from '../util'

export default defineComponent({
  name: 'ControlWrapper',
  props: {
    id: {
      required: true,
      type: String,
    },
    description: {
      required: false as const,
      type: String,
      default: undefined,
    },
    errors: {
      required: false as const,
      type: String,
      default: undefined,
    },
    label: {
      required: false as const,
      type: String,
      default: undefined,
    },
    type: {
      required: false as const,
      type: String,
      default: undefined,
    },
    appliedOptions: {
      required: false as const,
      type: Object as PropType<Options>,
      default: undefined,
    },
    visible: {
      required: false as const,
      type: Boolean,
      default: true,
    },
    required: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    isFocused: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    styles: {
      required: true,
      type: Object as PropType<Styles>,
    },
  },
  computed: {
    showDescription(): boolean {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        !!this.appliedOptions?.showUnfocusedDescription
      )
    },
    showAsterisk(): boolean {
      return this.required && !this.appliedOptions?.hideRequiredAsterisk
    },
  },
})
</script>
