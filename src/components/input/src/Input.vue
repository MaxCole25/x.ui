<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { XBaseInput } from '../../base-input'
import type { InputProps, InputSize } from './types'

defineOptions({
  name: 'XInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  clearable: false,
  hideClearButton: false,
  status: 'default',
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()

const sizePreset: Record<InputSize, Pick<InputProps, 'fontSize' | 'height' | 'padding' | 'radius'>> = {
  sm: {
    fontSize: 12,
    height: 28,
    padding: '0 8px',
    radius: '6px'
  },
  md: {
    fontSize: 14,
    height: 36,
    padding: '0 12px',
    radius: '8px'
  },
  lg: {
    fontSize: 16,
    height: 44,
    padding: '0 14px',
    radius: '10px'
  }
}

const baseProps = computed(() => {
  const preset = props.size ? sizePreset[props.size] : undefined

  return {
    ...props,
    fontSize: props.fontSize ?? preset?.fontSize,
    height: props.height ?? preset?.height,
    padding: props.padding ?? preset?.padding,
    radius: props.radius ?? preset?.radius
  }
})
</script>

<template>
  <XBaseInput
    v-bind="{ ...attrs, ...baseProps }"
    @update:model-value="emit('update:modelValue', $event)"
    @input="emit('input', $event)"
    @change="emit('change', $event)"
    @clear="emit('clear')"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
  </XBaseInput>
</template>
