<script setup lang="ts">
import { computed } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { ButtonGroupProps } from './types'

defineOptions({
  name: 'XButtonGroup'
})

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  direction: 'horizontal'
})

const groupStyle = computed(() => ({
  '--x-element-border-width': toCssSize(props.borderWidth),
  '--x-button-border-color': props.borderColor,
  '--x-button-bg': props.backgroundColor,
  '--x-button-text': props.textColor,
  '--x-button-group-width': toCssSize(props.width),
  '--x-button-group-height': toCssSize(props.height),
  '--x-button-group-radius': toCssSize(props.radius)
}))
</script>

<template>
  <div
    class="x-button-group"
    :class="`x-button-group--${props.direction}`"
    :style="groupStyle"
    role="group"
  >
    <slot />
  </div>
</template>
