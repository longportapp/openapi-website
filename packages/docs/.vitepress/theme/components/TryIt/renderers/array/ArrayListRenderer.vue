<template>
  <fieldset v-if="control.visible" :class="styles.arrayList.root">
    <legend :class="styles.arrayList.legend">
      <label :class="styles.arrayList.label">
        {{ control.label }}
      </label>
    </legend>
    <div
      v-for="(element, index) in control.data"
      :key="`${control.path}-${index}`"
      :class="styles.arrayList.itemWrapper">
      <array-list-element
        :move-up="moveUp?.(control.path, index)"
        :move-up-enabled="control.enabled && index > 0"
        :move-down="moveDown?.(control.path, index)"
        :move-down-enabled="control.enabled && index < control.data.length - 1"
        :delete-enabled="control.enabled && !minItemsReached"
        :delete="removeItems?.(control.path, [index])"
        :label="childLabelForIndex(index)"
        :styles="styles">
        <dispatch-renderer
          :schema="control.schema"
          :uischema="childUiSchema"
          :path="composePaths(control.path, `${index}`)"
          :enabled="control.enabled"
          :renderers="control.renderers"
          :cells="control.cells" />
      </array-list-element>
    </div>
    <div v-if="noData" :class="styles.arrayList.noData">
      {{ translations.noDataMessage }}
    </div>

    <button
      type="button"
      :disabled="!control.enabled || (appliedOptions.restrict && maxItemsReached)"
      @click="addButtonClick"
      :class="[
        'flex text-sm  w-fit items-center py-1 px-2 hover:bg-gray-50 dark:hover:bg-white/[0.03]',
        styles.arrayList.addButton,
      ]">
      <span class="text-gray-600 dark:text-gray-200 inline-flex items-center gap-x-1.5">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 1V11M1 6H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <span class="">Add an item</span>
      </span>
    </button>
  </fieldset>
</template>

<script lang="ts">
import {
  composePaths,
  createDefaultValue,
  JsonFormsRendererRegistryEntry,
  rankWith,
  ControlElement,
  schemaTypeIs,
  Resolve,
  JsonSchema,
  JsonFormsSubStates,
  arrayDefaultTranslations,
  getArrayTranslations,
  defaultJsonFormsI18nState,
} from '@jsonforms/core'
import { defineComponent, inject } from 'vue'
import { DispatchRenderer, rendererProps, useJsonFormsArrayControl, RendererProps } from '@jsonforms/vue'
import { useVanillaArrayControl } from '../util'
import ArrayListElement from './ArrayListElement.vue'

const controlRenderer = defineComponent({
  name: 'ArrayListRenderer',
  components: {
    ArrayListElement,
    DispatchRenderer,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaArrayControl(useJsonFormsArrayControl(props))
  },
  computed: {
    noData(): boolean {
      return !this.control.data || this.control.data.length === 0
    },
    arraySchema(): JsonSchema | undefined {
      return Resolve.schema(this.schema, this.control.uischema.scope, this.control.rootSchema)
    },
    maxItemsReached(): boolean | undefined {
      return (
        this.arraySchema !== undefined &&
        this.arraySchema.maxItems !== undefined &&
        this.control.data !== undefined &&
        this.control.data.length >= this.arraySchema.maxItems
      )
    },
    minItemsReached(): boolean | undefined {
      return (
        this.arraySchema !== undefined &&
        this.arraySchema.minItems !== undefined &&
        this.control.data !== undefined &&
        this.control.data.length <= this.arraySchema.minItems
      )
    },
    translations(): any {
      const jsonforms = inject<JsonFormsSubStates>('jsonforms')
      return getArrayTranslations(
        jsonforms?.i18n?.translate ?? defaultJsonFormsI18nState.translate,
        arrayDefaultTranslations,
        this.control.i18nKeyPrefix,
        this.control.label
      )
    },
  },
  methods: {
    composePaths,
    createDefaultValue,
    addButtonClick() {
      this.addItem(this.control.path, createDefaultValue(this.control.schema, this.control.rootSchema))()
    },
  },
})

export default controlRenderer

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, schemaTypeIs('array')),
}
</script>
