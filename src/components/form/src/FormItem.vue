<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { formContextKey, formItemContextKey } from './context'
import type { FormItemProps } from './types'

defineOptions({
  name: 'XFormItem'
})

const props = withDefaults(defineProps<FormItemProps>(), {
  required: false
})

const form = inject(formContextKey, null)
const id = `x-field-${Math.random().toString(36).slice(2, 10)}`

provide(formItemContextKey, {
  id,
  prop: props.prop,
  label: props.label
})

const labelStyle = computed(() => {
  const width = props.labelWidth ?? form?.labelWidth.value
  return width == null
    ? undefined
    : {
        width: typeof width === 'number' ? `${width}px` : width
      }
})
</script>

<template>
  <div class="x-form-item" :class="{ 'is-required': props.required, 'is-error': Boolean(props.error) }">
    <label v-if="props.label" class="x-form-item__label" :for="id" :style="labelStyle">
      {{ props.label }}
    </label>
    <div class="x-form-item__content">
      <slot />
      <div v-if="props.error" class="x-form-item__message" role="alert">{{ props.error }}</div>
      <div v-else-if="props.help" class="x-form-item__message is-help">{{ props.help }}</div>
    </div>
  </div>
</template>
