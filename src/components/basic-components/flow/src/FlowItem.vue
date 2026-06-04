<script setup lang="ts">
import { computed } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { CSSProperties } from 'vue'
import type { FlowItemProps } from './types'

defineOptions({
  name: 'XFlowItem'
})

const props = withDefaults(defineProps<FlowItemProps>(), {
  overflow: undefined
})

const itemStyle = computed<CSSProperties>(() => ({
  '--x-flow-item-width': toCssSize(props.width),
  '--x-flow-item-height': toCssSize(props.height),
  '--x-flow-item-min-width': toCssSize(props.minWidth),
  '--x-flow-item-min-height': toCssSize(props.minHeight),
  '--x-flow-item-padding': toCssSize(props.padding),
  '--x-flow-item-justify-self': props.justifySelf,
  '--x-flow-item-align-self': props.alignSelf,
  '--x-flow-item-bg': props.backgroundColor,
  '--x-flow-item-text-color': props.textColor,
  '--x-flow-item-border-color': props.borderColor,
  '--x-flow-item-border-width': toCssSize(props.borderWidth),
  '--x-flow-item-border-style': props.borderStyle,
  '--x-flow-item-radius': toCssSize(props.radius),
  '--x-flow-item-overflow': props.overflow
}) as CSSProperties)
</script>

<template>
  <section class="x-flow-item" :style="itemStyle" data-x-flow-item>
    <slot />
  </section>
</template>
