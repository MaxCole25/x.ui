<script setup lang="ts">
import { computed } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import type { ButtonProps } from './types'

defineOptions({
  name: 'XButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: undefined,
  width: 120,
  liftOnHover: true,
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const usesExplicitSize = computed(() => props.size != null)
const resolveSizeStyle = (customValue: number | string | undefined, presetValue: number | string) =>
  toCssSize(usesExplicitSize.value ? presetValue : customValue ?? presetValue)

const buttonStyle = computed(() => ({
  '--x-element-border-width': toCssSize(props.borderWidth),
  '--x-button-width': toCssSize(props.width),
  '--x-button-height': resolveSizeStyle(props.height, sizePreset.value.height),
  '--x-button-font-size': resolveSizeStyle(props.fontSize, sizePreset.value.fontSize),
  '--x-button-padding': resolveSizeStyle(props.padding, sizePreset.value.padding),
  '--x-button-radius': resolveSizeStyle(props.radius, sizePreset.value.radius),
  '--x-button-bg': props.backgroundColor,
  '--x-button-text': props.textColor,
  '--x-button-border-color': props.borderColor,
  '--x-button-active-bg': props.activeBackgroundColor,
  '--x-button-active-border-color': props.activeBorderColor,
  '--x-button-active-text': props.activeTextColor
}))

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <button
    class="x-button"
    :class="[
      `x-button--${props.variant}`,
      `x-button--${mergedSize}`,
      { 'is-loading': props.loading, 'is-hover-lift-disabled': !props.liftOnHover }
    ]"
    :disabled="props.disabled || props.loading"
    type="button"
    :style="buttonStyle"
    @click="handleClick"
  >
    <span v-if="props.loading" class="x-button__spinner" aria-hidden="true" />
    <span v-if="$slots.prefix" class="x-button__prefix">
      <slot name="prefix" />
    </span>
    <span class="x-button__content">
      <slot />
    </span>
    <span v-if="$slots.suffix" class="x-button__suffix">
      <slot name="suffix" />
    </span>
  </button>
</template>
