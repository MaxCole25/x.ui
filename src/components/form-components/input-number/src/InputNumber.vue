<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
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
  fullWidth: false,
  fullHeight: false,
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: number | undefined]
  change: [value: number | undefined]
  focus: [event: FocusEvent]
}>()

const instance = getCurrentInstance()
const value = computed(() => props.modelValue ?? '')
const hasExplicitSize = computed(() => Boolean(instance?.vnode.props && 'size' in instance.vnode.props))
const sizePreset = computed(() => componentSizePreset[props.size])
const inputNumberStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-input-number-color': props.accentColor,
  '--x-input-number-active-border-color': props.activeBorderColor ?? props.accentColor,
  '--x-input-number-border-color': props.borderColor,
  '--x-input-number-border-width': toCssSize(props.borderWidth),
  '--x-input-number-height': hasExplicitSize.value ? toCssSize(sizePreset.value.height) : undefined,
  '--x-input-number-padding': hasExplicitSize.value ? sizePreset.value.padding : undefined,
  '--x-input-number-radius': hasExplicitSize.value ? sizePreset.value.radius : toCssSize(props.radius),
  '--x-input-number-font-family': props.fontFamily,
  '--x-input-number-font-size': hasExplicitSize.value ? toCssSize(sizePreset.value.fontSize) : toCssSize(props.fontSize),
  '--x-input-number-decrease-bg': props.decreaseButtonBackgroundColor,
  '--x-input-number-increase-bg': props.increaseButtonBackgroundColor
}))

const normalize = (value: number | undefined) => {
  if (value == null || Number.isNaN(value)) return undefined
  if (props.min != null && value < props.min) return props.min
  if (props.max != null && value > props.max) return props.max
  return value
}

const getDecimalLength = (value: number | undefined) => {
  if (value == null || Number.isNaN(value)) return 0
  const [, decimal = ''] = String(value).split('.')
  return decimal.length
}

const getStepPrecision = () => Math.max(getDecimalLength(props.step), getDecimalLength(props.min), getDecimalLength(props.max))

const fixStepPrecision = (value: number) => {
  const precision = getStepPrecision()
  if (precision === 0) return value
  const base = 10 ** precision
  return Math.round(value * base) / base
}

const commit = (value: number | undefined) => {
  const next = normalize(value)
  emit('update:modelValue', next)
  emit('change', next)
}

const stepBy = (direction: 1 | -1) => {
  if (props.disabled || props.readonly) return
  commit(fixStepPrecision((props.modelValue ?? 0) + props.step * direction))
}
</script>

<template>
  <div class="x-input-number" :class="[`x-input-number--${props.size}`, { 'is-disabled': props.disabled, 'is-full-width': props.fullWidth, 'is-full-height': props.fullHeight, 'is-active-border-hidden': !props.showActiveBorder }]" :style="inputNumberStyle">
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
