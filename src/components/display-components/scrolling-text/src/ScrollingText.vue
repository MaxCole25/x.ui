<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { ScrollingTextFlowDirection, ScrollingTextProps } from './types'

defineOptions({
  name: 'XScrollingText'
})

const props = withDefaults(defineProps<ScrollingTextProps>(), {
  displayDirection: 'horizontal',
  speed: 40
})

const rootRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const duration = ref(6)
let resizeObserver: ResizeObserver | undefined

const isHorizontal = computed(() => props.displayDirection === 'horizontal')
const effectiveFlowDirection = computed<ScrollingTextFlowDirection>(() => {
  if (isHorizontal.value) return props.flowDirection === 'right' ? 'right' : 'left'
  return props.flowDirection === 'down' ? 'down' : 'up'
})

const rootStyle = computed(() => ({
  '--x-scrolling-text-width': isHorizontal.value ? toCssSize(props.width) : undefined,
  '--x-scrolling-text-height': isHorizontal.value ? undefined : toCssSize(props.height),
  '--x-scrolling-text-duration': `${duration.value}s`,
  '--x-scrolling-text-font-family': props.fontFamily,
  '--x-scrolling-text-font-size': toCssSize(props.fontSize),
  '--x-scrolling-text-color': props.textColor,
  '--x-scrolling-text-bg': props.backgroundColor
}))

function measureContentSize() {
  const content = contentRef.value
  if (!content) return 0

  const rect = content.getBoundingClientRect()
  return isHorizontal.value ? rect.width || content.scrollWidth : rect.height || content.scrollHeight
}

function updateDuration() {
  const speed = typeof props.speed === 'number' && props.speed > 0 ? props.speed : 40
  const distance = measureContentSize()
  duration.value = Math.max(distance / speed, 0.1)
}

function scheduleDurationUpdate() {
  void nextTick(updateDuration)
}

onMounted(() => {
  scheduleDurationUpdate()

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(scheduleDurationUpdate)
    if (rootRef.value) resizeObserver.observe(rootRef.value)
    if (contentRef.value) resizeObserver.observe(contentRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

watch(
  () => [props.displayDirection, props.flowDirection, props.speed, props.width, props.height, props.fontFamily, props.fontSize],
  scheduleDurationUpdate
)
</script>

<template>
  <div
    ref="rootRef"
    class="x-scrolling-text"
    :class="[
      `x-scrolling-text--${props.displayDirection}`,
      `x-scrolling-text--to-${effectiveFlowDirection}`
    ]"
    :style="rootStyle"
  >
    <div class="x-scrolling-text__track">
      <span ref="contentRef" class="x-scrolling-text__content"><slot /></span>
      <span class="x-scrolling-text__content" aria-hidden="true"><slot /></span>
    </div>
  </div>
</template>
