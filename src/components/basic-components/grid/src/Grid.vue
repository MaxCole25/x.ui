<script setup lang="ts">
import { Comment, computed, useSlots } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { VNode } from 'vue'
import type { GridProps } from './types'

defineOptions({
  name: 'XGrid'
})

const props = withDefaults(defineProps<GridProps>(), {
  columns: 3,
  count: 0,
  justifyItems: 'stretch',
  alignItems: 'stretch'
})

const slots = useSlots()

const toGridTemplate = (value?: number | string) => {
  if (typeof value === 'number') {
    const count = Math.max(1, Math.floor(value))
    return `repeat(${count}, minmax(0, 1fr))`
  }

  return value
}

const visibleSlotNodes = computed(() => (slots.default?.({}) ?? []).filter((node: VNode) => node.type !== Comment))
const hasDefaultContent = computed(() => visibleSlotNodes.value.length > 0)
const placeholderCount = computed(() => Math.max(0, Math.floor(Number(props.count) || 0)))

const gridStyle = computed(() => {
  const gap = toCssSize(props.gap)

  return {
    '--x-grid-columns': toGridTemplate(props.columns),
    '--x-grid-columns-sm': toGridTemplate(props.responsiveColumns?.sm),
    '--x-grid-columns-md': toGridTemplate(props.responsiveColumns?.md),
    '--x-grid-columns-lg': toGridTemplate(props.responsiveColumns?.lg),
    '--x-grid-rows': toGridTemplate(props.rows),
    '--x-grid-gap': gap,
    '--x-grid-row-gap': toCssSize(props.rowGap) ?? gap,
    '--x-grid-column-gap': toCssSize(props.columnGap) ?? gap,
    '--x-grid-width': toCssSize(props.width),
    '--x-grid-height': toCssSize(props.height),
    '--x-grid-min-width': toCssSize(props.minWidth),
    '--x-grid-min-height': toCssSize(props.minHeight),
    '--x-grid-padding': toCssSize(props.padding),
    '--x-grid-auto-rows': toCssSize(props.autoRows),
    '--x-grid-auto-columns': toCssSize(props.autoColumns),
    '--x-grid-justify-items': props.justifyItems,
    '--x-grid-align-items': props.alignItems,
    '--x-grid-bg': props.backgroundColor,
    '--x-grid-text-color': props.textColor,
    '--x-grid-border-color': props.borderColor,
    '--x-grid-border-width': toCssSize(props.borderWidth),
    '--x-grid-border-style': props.borderStyle,
    '--x-grid-radius': toCssSize(props.radius)
  }
})
</script>

<template>
  <div class="x-grid" :style="gridStyle">
    <slot v-if="hasDefaultContent" />
    <div
      v-for="itemIndex in placeholderCount"
      v-else
      :key="itemIndex"
      class="x-grid-item x-grid-item--placeholder x-scrollbar--native"
      data-x-grid-item
    />
  </div>
</template>
