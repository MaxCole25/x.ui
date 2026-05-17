<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import type { ButtonProps } from './types'

defineOptions({
  name: 'XButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: undefined,
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const usesExplicitSize = computed(() => props.size != null)

const buttonStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-button-width': toCssSize(props.width),
  '--x-button-height': toCssSize(usesExplicitSize.value ? sizePreset.value.height : props.height),
  '--x-button-font-size': toCssSize(usesExplicitSize.value ? sizePreset.value.fontSize : props.fontSize),
  '--x-button-padding': usesExplicitSize.value ? sizePreset.value.padding : toCssSize(props.padding),
  '--x-button-radius': usesExplicitSize.value ? sizePreset.value.radius : toCssSize(props.radius),
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
    :class="[`x-button--${props.variant}`, `x-button--${mergedSize}`, { 'is-loading': props.loading }]"
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
