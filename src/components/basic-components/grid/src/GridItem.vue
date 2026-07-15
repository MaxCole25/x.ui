<script setup lang="ts">
import { computed } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { GridItemProps } from './types'

defineOptions({
  name: 'XGridItem'
})

const props = withDefaults(defineProps<GridItemProps>(), {
  overflow: 'auto'
})

const toPositiveSpan = (value?: number) => {
  if (value == null) return undefined
  return Math.max(1, Math.floor(value))
}

const itemStyle = computed(() => {
  const columnSpan = toPositiveSpan(props.colSpan ?? props.span)
  const rowSpan = toPositiveSpan(props.rowSpan)

  return {
    '--x-grid-item-column': props.column ?? (columnSpan ? `span ${columnSpan}` : undefined),
    '--x-grid-item-row': props.row ?? (rowSpan ? `span ${rowSpan}` : undefined),
    '--x-grid-item-width': toCssSize(props.width),
    '--x-grid-item-height': toCssSize(props.height),
    '--x-grid-item-min-width': toCssSize(props.minWidth),
    '--x-grid-item-min-height': toCssSize(props.minHeight),
    '--x-grid-item-padding': toCssSize(props.padding),
    '--x-grid-item-justify-self': props.justifySelf,
    '--x-grid-item-align-self': props.alignSelf,
    '--x-grid-item-bg': props.backgroundColor,
    '--x-grid-item-text-color': props.textColor,
    '--x-grid-item-border-color': props.borderColor,
    '--x-grid-item-border-width': toCssSize(props.borderWidth),
    '--x-grid-item-border-style': props.borderStyle,
    '--x-grid-item-radius': toCssSize(props.radius),
    '--x-grid-item-overflow': props.overflow
  }
})
</script>

<template>
  <section class="x-grid-item x-scrollbar--native" :style="itemStyle" data-x-grid-item>
    <slot />
  </section>
</template>
