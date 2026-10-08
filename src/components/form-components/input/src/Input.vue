<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getInputMetrics } from '../../../_utils/inputSize'
import { XBaseInput } from '../../../basic-components/base-input'
import type { InputProps } from './types'

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

const baseProps = computed(() => props)
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
