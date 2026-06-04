<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { CSSProperties } from 'vue'
import type { FlowItemKey, FlowProps } from './types'

defineOptions({
  name: 'XFlow'
})

const props = withDefaults(defineProps<FlowProps>(), {
  itemWidth: '72px',
  justifyItems: 'center',
  alignItems: 'center',
  borderStyle: 'solid',
  itemBorderStyle: 'solid',
  itemOverflow: 'auto',
  lazy: false,
  initialCount: 120,
  loadCount: 80
})

defineSlots<{
  default?: (props: { item?: any; index?: number }) => any
}>()

const rootRef = ref<HTMLElement>()
const visibleCount = ref(0)
let scrollFrame = 0

const dataItems = computed(() => (Array.isArray(props.items) ? props.items : []))
const hasDataItems = computed(() => Array.isArray(props.items))
const normalizedInitialCount = computed(() => Math.max(0, Math.floor(Number(props.initialCount) || 0)))
const normalizedLoadCount = computed(() => Math.max(1, Math.floor(Number(props.loadCount) || 1)))
const renderedItems = computed(() => {
  if (!hasDataItems.value || !props.lazy) {
    return dataItems.value
  }

  return dataItems.value.slice(0, visibleCount.value)
})
const hasMore = computed(() => props.lazy && visibleCount.value < dataItems.value.length)

const flowStyle = computed<CSSProperties>(() => {
  const gap = toCssSize(props.gap)

  return {
    '--x-flow-item-track-width': toCssSize(props.itemWidth),
    '--x-flow-gap': gap,
    '--x-flow-row-gap': toCssSize(props.rowGap) ?? gap,
    '--x-flow-column-gap': toCssSize(props.columnGap) ?? gap,
    '--x-flow-width': toCssSize(props.width),
    '--x-flow-height': toCssSize(props.height),
    '--x-flow-min-width': toCssSize(props.minWidth),
    '--x-flow-min-height': toCssSize(props.minHeight),
    '--x-flow-padding': toCssSize(props.padding),
    '--x-flow-justify-items': props.justifyItems,
    '--x-flow-align-items': props.alignItems,
    '--x-flow-bg': props.backgroundColor,
    '--x-flow-text-color': props.textColor,
    '--x-flow-border-color': props.borderColor,
    '--x-flow-border-width': toCssSize(props.borderWidth),
    '--x-flow-border-style': props.borderStyle,
    '--x-flow-radius': toCssSize(props.radius),
    '--x-flow-default-item-bg': props.itemBackgroundColor,
    '--x-flow-default-item-text-color': props.itemTextColor,
    '--x-flow-default-item-border-color': props.itemBorderColor,
    '--x-flow-default-item-border-width': toCssSize(props.itemBorderWidth),
    '--x-flow-default-item-border-style': props.itemBorderStyle,
    '--x-flow-default-item-radius': toCssSize(props.itemRadius),
    '--x-flow-default-item-padding': toCssSize(props.itemPadding),
    '--x-flow-default-item-overflow': props.itemOverflow
  } as CSSProperties
})

const getItemKey = (item: unknown, index: number) => {
  const key = props.itemKey as FlowItemKey | undefined

  if (typeof key === 'function') {
    return key(item, index)
  }

  if (key !== undefined && item !== null && typeof item === 'object') {
    const record = item as Record<string | number, unknown>
    const value = record[key]
    if (typeof value === 'string' || typeof value === 'number') {
      return value
    }
  }

  return index
}

const resetVisibleCount = () => {
  visibleCount.value = props.lazy ? Math.min(normalizedInitialCount.value, dataItems.value.length) : dataItems.value.length
}

const loadMore = () => {
  if (!props.lazy || visibleCount.value >= dataItems.value.length) return

  visibleCount.value = Math.min(dataItems.value.length, visibleCount.value + normalizedLoadCount.value)
}

const syncScrollLoad = () => {
  scrollFrame = 0
  const root = rootRef.value
  if (!root || !props.lazy) return

  const distanceToBottom = root.scrollHeight - root.scrollTop - root.clientHeight
  if (distanceToBottom <= 160) {
    loadMore()
  }
}

const handleScroll = () => {
  if (scrollFrame || !props.lazy) return

  scrollFrame = window.requestAnimationFrame(syncScrollLoad)
}

watch(
  () => [dataItems.value.length, props.lazy, props.initialCount],
  () => {
    resetVisibleCount()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (scrollFrame) {
    window.cancelAnimationFrame(scrollFrame)
    scrollFrame = 0
  }
})
</script>

<template>
  <div ref="rootRef" class="x-flow" :class="{ 'is-lazy': props.lazy }" :style="flowStyle" @scroll="handleScroll">
    <template v-if="hasDataItems">
      <section
        v-for="(item, index) in renderedItems"
        :key="getItemKey(item, index)"
        class="x-flow-item"
        data-x-flow-item
      >
        <slot :item="item" :index="index">{{ item }}</slot>
      </section>
      <div v-if="hasMore" class="x-flow__sentinel" aria-hidden="true" />
    </template>
    <slot v-else />
  </div>
</template>
