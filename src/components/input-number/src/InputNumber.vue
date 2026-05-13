<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { InputNumberProps } from './types'

defineOptions({
  name: 'XInputNumber'
})

const props = withDefaults(defineProps<InputNumberProps>(), {
  step: 1,
  disabled: false,
  readonly: false,
  size: 'md',
  placeholder: '请输入数字',
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: number | undefined]
  change: [value: number | undefined]
  focus: [event: FocusEvent]
}>()

const value = computed(() => props.modelValue ?? '')
const inputNumberStyle = computed(() => createElementStyleVars(props))

const normalize = (value: number | undefined) => {
  if (value == null || Number.isNaN(value)) return undefined
  if (props.min != null && value < props.min) return props.min
  if (props.max != null && value > props.max) return props.max
  return value
}

const commit = (value: number | undefined) => {
  const next = normalize(value)
  emit('update:modelValue', next)
  emit('change', next)
}

const stepBy = (direction: 1 | -1) => {
  if (props.disabled || props.readonly) return
  commit((props.modelValue ?? 0) + props.step * direction)
}
</script>

<template>
  <div class="x-input-number" :class="[`x-input-number--${props.size}`, { 'is-disabled': props.disabled, 'is-active-border-hidden': !props.showActiveBorder }]" :style="inputNumberStyle">
    <button type="button" :disabled="props.disabled || props.readonly" aria-label="减少" @click="stepBy(-1)">-</button>
    <input
      :value="value"
      type="number"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :placeholder="props.placeholder"
      @focus="emit('focus', $event)"
      @input="commit(($event.target as HTMLInputElement).value === '' ? undefined : Number(($event.target as HTMLInputElement).value))"
    />
    <button type="button" :disabled="props.disabled || props.readonly" aria-label="增加" @click="stepBy(1)">+</button>
  </div>
</template>
