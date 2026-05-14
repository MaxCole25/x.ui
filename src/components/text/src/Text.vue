<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { createElementStyleVars, toCssSize } from '../../_utils/elementStyle'
import type { TextProps } from './types'

defineOptions({
  name: 'XText',
  inheritAttrs: false
})

const props = withDefaults(defineProps<TextProps>(), {
  modelValue: '',
  size: 'md',
  type: 'default',
  tag: 'span',
  truncated: false,
  disabled: false,
  autoHeight: false
})

const attrs = useAttrs()
const rawValue = computed(() => props.modelValue ?? '')
const textValue = computed(() => String(rawValue.value))
const formattedValue = computed(() => {
  if (typeof props.formatter === 'function') return props.formatter(rawValue.value)
  return textValue.value
})
const displayValue = computed(() => {
  if (typeof props.maxlength !== 'number' || props.maxlength < 0) return formattedValue.value
  return formattedValue.value.slice(0, props.maxlength)
})
const hasValue = computed(() => textValue.value !== '')

const textStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-text-border-color': props.borderColor,
  '--x-text-border-width': toCssSize(props.borderWidth),
  '--x-text-radius': props.radius,
  '--x-text-bg': props.backgroundColor ?? props.background,
  '--x-text-color': props.textColor,
  '--x-text-font-family': props.fontFamily,
  '--x-text-font-size': toCssSize(props.fontSize),
  '--x-text-height': props.autoHeight ? 'auto' : toCssSize(props.height),
  '--x-text-padding': toCssSize(props.padding),
  '--x-text-align': props.textAlign
}))
</script>

<template>
  <component
    v-bind="attrs"
    :is="props.tag"
    :id="props.id"
    class="x-text"
    :class="[
      `x-text--${props.size}`,
      `x-text--${props.type}`,
      {
        'is-truncated': props.truncated,
        'is-disabled': props.disabled,
        'is-auto-height': props.autoHeight
      }
    ]"
    :style="textStyle"
    :name="props.name"
    :aria-disabled="props.disabled ? 'true' : undefined"
  >
    <span class="x-text__content">
      <slot>{{ hasValue ? displayValue : '' }}</slot>
    </span>
  </component>
</template>
