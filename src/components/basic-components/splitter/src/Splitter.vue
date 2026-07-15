<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, shallowRef, watch } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { splitterContextKey } from './types'
import type { CSSProperties } from 'vue'
import type { SplitPaneRegistration, SplitterDirection, SplitterProps, SplitterResizePayload } from './types'

defineOptions({
  name: 'XSplitter'
})

const props = withDefaults(defineProps<SplitterProps>(), {
  direction: 'horizontal',
  splitterSize: 6
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void
  (e: 'resize-start', payload: SplitterResizePayload): void
  (e: 'resize', payload: SplitterResizePayload): void
  (e: 'resize-end', payload: SplitterResizePayload): void
}>()

const rootRef = ref<HTMLElement>()
const panes = shallowRef<SplitPaneRegistration[]>([])
const sizes = ref<number[]>([])
const activeIndex = ref<number | undefined>()
let resizeObserver: ResizeObserver | undefined
let dragState: { index: number; startPointer: number; startSizes: number[] } | undefined
let isApplyingModelValue = false

const direction = computed<SplitterDirection>(() => props.direction)
const splitterSize = computed(() => Math.max(2, Number(props.splitterSize) || 6))
const isHorizontal = computed(() => direction.value === 'horizontal')
const paneCount = computed(() => panes.value.length)
const splitterCount = computed(() => Math.max(0, paneCount.value - 1))

provide(splitterContextKey, {
  direction,
  registerPane(pane) {
    panes.value = [...panes.value, pane]
    void nextTick(initializeSizes)
    return () => {
      panes.value = panes.value.filter((item) => item !== pane)
      void nextTick(initializeSizes)
    }
  }
})

function getAvailableSize() {
  const rect = rootRef.value?.getBoundingClientRect()
  const mainSize = isHorizontal.value ? rect?.width ?? 0 : rect?.height ?? 0
  return Math.max(0, mainSize - splitterCount.value * splitterSize.value)
}

function toPixels(value: number | string | undefined, availableSize: number) {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, value)
  if (typeof value !== 'string') return undefined
  const normalized = value.trim()
  if (normalized.endsWith('%')) {
    const percentage = Number.parseFloat(normalized)
    return Number.isFinite(percentage) ? Math.max(0, (availableSize * percentage) / 100) : undefined
  }
  const pixels = Number.parseFloat(normalized)
  return Number.isFinite(pixels) && /px$|^\d+(\.\d+)?$/.test(normalized) ? Math.max(0, pixels) : undefined
}

function getMinSize(index: number) {
  return Math.max(0, Number(panes.value[index]?.props.minSize) || 0)
}

function getMaxSize(index: number) {
  const maxSize = panes.value[index]?.props.maxSize
  return maxSize === undefined ? Number.POSITIVE_INFINITY : Math.max(getMinSize(index), Number(maxSize) || 0)
}

function normalizeSizes(nextSizes: number[], availableSize = getAvailableSize()) {
  if (!paneCount.value) return []
  const normalized = nextSizes.slice(0, paneCount.value).map((value, index) => {
    const safeValue = Number.isFinite(value) ? value : 0
    return Math.min(getMaxSize(index), Math.max(getMinSize(index), safeValue))
  })
  while (normalized.length < paneCount.value) normalized.push(0)

  const total = normalized.reduce((sum, value) => sum + value, 0)
  const adjustableIndexes = panes.value
    .map((pane, index) => (!pane.props.locked ? index : -1))
    .filter((index) => index >= 0)
  const targetIndexes = adjustableIndexes.length ? adjustableIndexes : normalized.map((_, index) => index)
  const remainder = availableSize - total
  if (Math.abs(remainder) > 0.5 && targetIndexes.length) {
    const currentTotal = targetIndexes.reduce((sum, index) => sum + normalized[index], 0)
    targetIndexes.forEach((index, position) => {
      const share = currentTotal > 0 ? normalized[index] / currentTotal : 1 / targetIndexes.length
      const delta = position === targetIndexes.length - 1
        ? availableSize - normalized.reduce((sum, value) => sum + value, 0)
        : remainder * share
      normalized[index] = Math.min(getMaxSize(index), Math.max(getMinSize(index), normalized[index] + delta))
    })
  }
  return normalized
}

function initializeSizes() {
  const availableSize = getAvailableSize()
  if (!paneCount.value || availableSize <= 0) return
  const modelSizes = props.modelValue
  if (modelSizes?.length === paneCount.value) {
    sizes.value = normalizeSizes(modelSizes, availableSize)
    return
  }
  const configuredSizes = panes.value.map((pane) => toPixels(pane.props.paneSize, availableSize))
  const fixedTotal = configuredSizes.reduce<number>((sum, value) => sum + (value ?? 0), 0)
  const flexibleIndexes = configuredSizes.map((value, index) => (value === undefined ? index : -1)).filter((index) => index >= 0)
  const fallbackSize = flexibleIndexes.length ? Math.max(0, (availableSize - fixedTotal) / flexibleIndexes.length) : 0
  sizes.value = normalizeSizes(configuredSizes.map((value) => value ?? fallbackSize), availableSize)
}

function updateSizes(nextSizes: number[], eventName?: 'resize' | 'resize-end') {
  sizes.value = nextSizes.map((value) => Math.round(value * 100) / 100)
  if (!isApplyingModelValue) emit('update:modelValue', [...sizes.value])
  if (eventName === 'resize' && activeIndex.value !== undefined) emit('resize', createPayload(activeIndex.value))
  if (eventName === 'resize-end' && activeIndex.value !== undefined) emit('resize-end', createPayload(activeIndex.value))
}

function createPayload(index: number): SplitterResizePayload {
  return { index, sizes: [...sizes.value] }
}

function isSplitterDisabled(index: number) {
  return Boolean(panes.value[index]?.props.locked || panes.value[index + 1]?.props.locked)
}

function getSplitterOffset(index: number) {
  return sizes.value.slice(0, index + 1).reduce((sum, value) => sum + value, 0) + index * splitterSize.value
}

function applyPaneSizes() {
  panes.value.forEach((pane, index) => {
    const element = pane.element.value
    if (!element) return
    const size = sizes.value[index] ?? 0
    element.style.flex = `0 0 ${size}px`
    if (isHorizontal.value) {
      element.style.width = `${size}px`
      element.style.height = ''
    } else {
      element.style.height = `${size}px`
      element.style.width = ''
    }
  })
}

function getSplitterStyle(index: number): CSSProperties {
  const offset = getSplitterOffset(index)
  const hitAreaPadding = 4
  return isHorizontal.value
    ? { left: `${offset - hitAreaPadding}px`, width: `${splitterSize.value + hitAreaPadding * 2}px` }
    : { top: `${offset - hitAreaPadding}px`, height: `${splitterSize.value + hitAreaPadding * 2}px` }
}

function startResize(index: number, event: PointerEvent) {
  if (isSplitterDisabled(index)) return
  event.preventDefault()
  dragState = {
    index,
    startPointer: isHorizontal.value ? event.clientX : event.clientY,
    startSizes: [...sizes.value]
  }
  activeIndex.value = index
  document.body.style.userSelect = 'none'
  window.addEventListener('pointermove', moveResize)
  window.addEventListener('pointerup', stopResize)
  window.addEventListener('pointercancel', stopResize)
  emit('resize-start', createPayload(index))
}

function moveResize(event: PointerEvent) {
  if (!dragState) return
  const { index, startPointer, startSizes } = dragState
  const delta = (isHorizontal.value ? event.clientX : event.clientY) - startPointer
  const pairTotal = startSizes[index] + startSizes[index + 1]
  const minimum = Math.max(getMinSize(index), pairTotal - getMaxSize(index + 1))
  const maximum = Math.min(getMaxSize(index), pairTotal - getMinSize(index + 1))
  const leftSize = Math.min(maximum, Math.max(minimum, startSizes[index] + delta))
  const nextSizes = [...startSizes]
  nextSizes[index] = leftSize
  nextSizes[index + 1] = pairTotal - leftSize
  updateSizes(nextSizes, 'resize')
}

function stopResize() {
  if (activeIndex.value !== undefined) emit('resize-end', createPayload(activeIndex.value))
  dragState = undefined
  activeIndex.value = undefined
  document.body.style.userSelect = ''
  window.removeEventListener('pointermove', moveResize)
  window.removeEventListener('pointerup', stopResize)
  window.removeEventListener('pointercancel', stopResize)
}

const rootStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-splitter-width': toCssSize(props.width),
  '--x-splitter-height': toCssSize(props.height),
  '--x-splitter-handle-size': `${splitterSize.value}px`,
  '--x-splitter-handle-color': props.splitterColor,
  '--x-splitter-handle-active-color': props.activeSplitterColor
}))

watch(
  () => props.modelValue,
  (value) => {
    if (!value || value.length !== paneCount.value) return
    isApplyingModelValue = true
    sizes.value = normalizeSizes(value)
    isApplyingModelValue = false
  },
  { deep: true }
)

watch(direction, () => void nextTick(initializeSizes))

watch([sizes, direction, panes], () => void nextTick(applyPaneSizes), { deep: true })

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    if (!dragState) initializeSizes()
  })
  if (rootRef.value) resizeObserver.observe(rootRef.value)
  void nextTick(initializeSizes)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  stopResize()
})
</script>

<template>
  <div
    ref="rootRef"
    class="x-splitter"
    :class="[`x-splitter--${direction}`, { 'is-resizing': activeIndex !== undefined }]"
    :style="rootStyle"
  >
    <slot />
    <div
      v-for="index in splitterCount"
      :key="index - 1"
      class="x-splitter__handle"
      :class="{ 'is-active': activeIndex === index - 1, 'is-disabled': isSplitterDisabled(index - 1) }"
      :style="getSplitterStyle(index - 1)"
      role="separator"
      :aria-orientation="isHorizontal ? 'vertical' : 'horizontal'"
      :aria-disabled="isSplitterDisabled(index - 1)"
      @pointerdown="startResize(index - 1, $event)"
    >
      <span class="x-splitter__hint" aria-hidden="true">
        <span class="x-splitter__arrow x-splitter__arrow--before" />
        <span class="x-splitter__arrow x-splitter__arrow--after" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.x-splitter {
  border-color: var(--x-element-border-color, #d8e2e8);
  border-radius: var(--x-element-radius, 0);
  border-style: solid;
  border-width: var(--x-element-border-width, 0);
  box-sizing: border-box;
  color: var(--x-element-text, inherit);
  display: flex;
  gap: var(--x-splitter-handle-size);
  height: var(--x-splitter-height, auto);
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  position: relative;
  width: var(--x-splitter-width, 100%);
}

.x-splitter--vertical { flex-direction: column; }

.x-splitter :deep(.x-split-pane) {
  box-sizing: border-box;
  isolation: isolate;
  min-height: 0;
  min-width: 0;
  position: relative;
}

.x-splitter__handle {
  align-items: center;
  background: transparent;
  display: flex;
  justify-content: center;
  position: absolute;
  touch-action: none;
  z-index: 40;
}

.x-splitter__handle::before {
  background: var(--x-splitter-handle-color, #d8e2e8);
  content: '';
  position: absolute;
  transition: background-color 0.16s ease;
}
.x-splitter--horizontal .x-splitter__handle::before { bottom: 0; left: 50%; top: 0; transform: translateX(-50%); width: 1px; }
.x-splitter--vertical .x-splitter__handle::before { height: 1px; left: 0; right: 0; top: 50%; transform: translateY(-50%); }
.x-splitter__hint { align-items: center; display: flex; gap: 3px; opacity: 0; pointer-events: none; position: relative; transition: opacity 0.16s ease; z-index: 1; }
.x-splitter__arrow { display: block; height: 0; width: 0; }
.x-splitter--horizontal .x-splitter__arrow { border-bottom: 4px solid transparent; border-top: 4px solid transparent; }
.x-splitter--horizontal .x-splitter__arrow--before { border-right: 5px solid var(--x-splitter-handle-active-color, #5b6b9a); }
.x-splitter--horizontal .x-splitter__arrow--after { border-left: 5px solid var(--x-splitter-handle-active-color, #5b6b9a); }
.x-splitter--vertical .x-splitter__hint { flex-direction: column; gap: 3px; }
.x-splitter--vertical .x-splitter__arrow { border-left: 4px solid transparent; border-right: 4px solid transparent; }
.x-splitter--vertical .x-splitter__arrow--before { border-bottom: 5px solid var(--x-splitter-handle-active-color, #5b6b9a); }
.x-splitter--vertical .x-splitter__arrow--after { border-top: 5px solid var(--x-splitter-handle-active-color, #5b6b9a); }
.x-splitter--horizontal .x-splitter__handle { bottom: 0; cursor: col-resize; top: 0; }
.x-splitter--vertical .x-splitter__handle { cursor: row-resize; left: 0; right: 0; }
.x-splitter__handle:hover::before, .x-splitter__handle.is-active::before { background: var(--x-splitter-handle-active-color, #5b6b9a); }
.x-splitter__handle:hover .x-splitter__hint, .x-splitter__handle.is-active .x-splitter__hint { opacity: 1; }
.x-splitter__handle.is-disabled { cursor: not-allowed; opacity: 0.55; }
.x-splitter__handle.is-disabled .x-splitter__hint { opacity: 0; }
.x-splitter__handle.is-disabled:hover::before { background: var(--x-splitter-handle-color, #d8e2e8); }
</style>
