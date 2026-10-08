<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { createFontStyle } from '../../../_utils/size'
import type { TextProps } from './types'

defineOptions({
  name: 'XText',
  inheritAttrs: false
})

const props = withDefaults(defineProps<TextProps>(), {
  modelValue: '',
  fontSize: undefined,
  variant: 'default',
  tag: 'span',
  truncated: false,
  disabled: false,
  autoHeight: false,
  verticalAlign: 'middle'
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
const mergedVariant = computed(() => props.variant ?? 'default')
const verticalAlignMap = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end'
} as const
const toCssLineHeight = (value?: number | string) => (typeof value === 'number' ? String(value) : value)
const toCssFontWeight = (value?: number | string) => (value === undefined ? undefined : String(value))

const textStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-text-border-color': props.borderColor,
  '--x-text-border-width': toCssSize(props.borderWidth),
  '--x-text-bg': props.backgroundColor,
  '--x-text-color': props.textColor,
  '--x-text-font-family': props.fontFamily,
  '--x-text-font-weight': toCssFontWeight(props.fontWeight),
  '--x-text-font-size': toCssSize(props.fontSize),
  '--x-text-line-height': toCssLineHeight(props.lineHeight),
  '--x-text-width': toCssSize(props.width),
  '--x-text-height': props.autoHeight ? 'auto' : toCssSize(props.height),
  '--x-text-padding': toCssSize(props.padding),
  '--x-text-radius': toCssSize(props.radius),
  '--x-text-align': props.textAlign,
  '--x-text-vertical-align': verticalAlignMap[props.verticalAlign]
}))
</script>

<template>
  <component
    v-bind="attrs"
    :is="props.tag"
    :id="props.id"
    class="x-text"
    :class="[
      'x-text',
      `x-text--${mergedVariant}`,
      {
        'is-truncated': props.truncated,
        'is-disabled': props.disabled,
        'is-auto-height': props.autoHeight
      }
    ]"
    :style="[textStyle, createFontStyle(props.fontSize)]"
    :name="props.name"
    :aria-disabled="props.disabled ? 'true' : undefined"
  >
    <span class="x-text__content">
      <slot>{{ hasValue ? displayValue : '' }}</slot>
    </span>
  </component>
</template>
