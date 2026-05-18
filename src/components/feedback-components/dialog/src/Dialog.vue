<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { DialogProps } from './types'

defineOptions({
  name: 'XDialog',
  inheritAttrs: false
})

const props = withDefaults(defineProps<DialogProps>(), {
  title: '',
  size: undefined,
  width: 920,
  height: 760,
  minWidth: 720,
  minHeight: 520,
  maxWidth: 0,
  maxHeight: 0,
  draggable: true,
  resizable: true,
  closeOnMaskClick: true,
  zIndex: overlayZIndex.dialog
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const popupWidth = ref(toPixelNumber(props.width, 920))
const popupHeight = ref(toPixelNumber(props.height, 760))
const popupLeft = ref(0)
const popupTop = ref(0)

const dragState = reactive({
  active: false,
  startX: 0,
  startY: 0,
  startLeft: 0,
  startTop: 0
})

const resizeState = reactive({
  active: false,
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0
})

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function toPixelNumber(value: number | string | undefined, fallback: number) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : fallback
  }

  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }

  return fallback
}

function getMinWidth() {
  return toPixelNumber(props.minWidth, 720)
}

function getMinHeight() {
  return toPixelNumber(props.minHeight, 520)
}

function getMaxWidth() {
  const minWidth = getMinWidth()
  const maxWidth = toPixelNumber(props.maxWidth, 0)
  return maxWidth > 0 ? maxWidth : Math.max(minWidth, window.innerWidth - 24)
}

function getMaxHeight() {
  const minHeight = getMinHeight()
  const maxHeight = toPixelNumber(props.maxHeight, 0)
  return maxHeight > 0 ? maxHeight : Math.max(minHeight, window.innerHeight - 24)
}

function centerPopup() {
  const width = clamp(toPixelNumber(props.width, 920), getMinWidth(), getMaxWidth())
  const height = clamp(toPixelNumber(props.height, 760), getMinHeight(), getMaxHeight())
  popupWidth.value = width
  popupHeight.value = height
  popupLeft.value = Math.max((window.innerWidth - width) / 2, 12)
  popupTop.value = Math.max((window.innerHeight - height) / 2, 12)
}

function close() {
  visible.value = false
  emit('close')
}

function onMaskClick() {
  if (props.closeOnMaskClick) {
    close()
  }
}

function startDrag(event: MouseEvent) {
  if (!props.draggable) {
    return
  }
  event.preventDefault()
  dragState.active = true
  dragState.startX = event.clientX
  dragState.startY = event.clientY
  dragState.startLeft = popupLeft.value
  dragState.startTop = popupTop.value
}

function moveDrag(event: MouseEvent) {
  if (!dragState.active) {
    return
  }
  const nextLeft = dragState.startLeft + (event.clientX - dragState.startX)
  const nextTop = dragState.startTop + (event.clientY - dragState.startY)
  popupLeft.value = clamp(nextLeft, 12, Math.max(12, window.innerWidth - popupWidth.value - 12))
  popupTop.value = clamp(nextTop, 12, Math.max(12, window.innerHeight - popupHeight.value - 12))
}

function stopDrag() {
  dragState.active = false
}

function startResize(event: MouseEvent) {
  if (!props.resizable) {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  resizeState.active = true
  resizeState.startX = event.clientX
  resizeState.startY = event.clientY
  resizeState.startWidth = popupWidth.value
  resizeState.startHeight = popupHeight.value
}

function moveResize(event: MouseEvent) {
  if (!resizeState.active) {
    return
  }
  const nextWidth = resizeState.startWidth + (event.clientX - resizeState.startX)
  const nextHeight = resizeState.startHeight + (event.clientY - resizeState.startY)
  popupWidth.value = clamp(nextWidth, getMinWidth(), getMaxWidth())
  popupHeight.value = clamp(nextHeight, getMinHeight(), getMaxHeight())
}

function stopResize() {
  resizeState.active = false
}

watch(
  () => [visible.value, props.width, props.height, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight],
  ([isVisible]) => {
    popupWidth.value = toPixelNumber(props.width, 920)
    popupHeight.value = toPixelNumber(props.height, 760)
    if (isVisible) {
      centerPopup()
    }
  },
  { immediate: true }
)

watch(
  () => visible.value,
  (value) => {
    if (value) {
      window.addEventListener('mousemove', moveDrag)
      window.addEventListener('mouseup', stopDrag)
      window.addEventListener('mousemove', moveResize)
      window.addEventListener('mouseup', stopResize)
      return
    }
    stopDrag()
    stopResize()
    window.removeEventListener('mousemove', moveDrag)
    window.removeEventListener('mouseup', stopDrag)
    window.removeEventListener('mousemove', moveResize)
    window.removeEventListener('mouseup', stopResize)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('mousemove', moveResize)
  window.removeEventListener('mouseup', stopResize)
})

const popupStyle = computed(() => ({
  width: `${popupWidth.value}px`,
  height: `${popupHeight.value}px`,
  left: `${popupLeft.value}px`,
  top: `${popupTop.value}px`,
  '--x-dialog-font-size': `${componentSizePreset[props.size ?? 'md'].fontSize}px`,
  '--x-dialog-control-height': `${componentSizePreset[props.size ?? 'md'].height}px`
}))

const maskStyle = computed(() => ({
  '--x-dialog-z-index': props.zIndex
}))
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="x-dialog__mask" :style="maskStyle" @click.self="onMaskClick">
      <div class="x-dialog" v-bind="$attrs" :class="`x-dialog--${props.size ?? 'md'}`" :style="popupStyle">
        <header class="x-dialog__header" @mousedown="startDrag">
          <slot name="header">
            <div class="x-dialog__title">{{ title }}</div>
          </slot>
          <button type="button" class="x-dialog__close" aria-label="关闭弹窗" @click="close">×</button>
        </header>

        <section class="x-dialog__body">
          <slot />
        </section>

        <footer v-if="$slots.footer" class="x-dialog__footer">
          <slot name="footer" />
        </footer>

        <div v-if="resizable" class="x-dialog__resizer" title="拖拽调整大小" @mousedown="startResize" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.x-dialog__mask {
  position: fixed;
  inset: 0;
  z-index: var(--x-dialog-z-index, var(--x-z-index-dialog, 1900));
  background: rgba(18, 28, 45, 0.4);
}

.x-dialog {
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--x-color-border, #d8d9df);
  border-radius: var(--x-dialog-radius, 8px);
  background: #fff;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22);
}

.x-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: var(--x-dialog-header-padding, 16px 18px 10px);
  cursor: move;
  user-select: none;
}

.x-dialog__title {
  min-width: 0;
  font-size: calc(var(--x-dialog-font-size, 12px) + 4px);
  font-weight: 700;
  color: var(--x-color-text, #2f3445);
}

.x-dialog__close {
  width: var(--x-dialog-control-height, 28px);
  height: var(--x-dialog-control-height, 28px);
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--x-color-text-muted, #8c93a6);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

.x-dialog__close:hover {
  background: var(--x-color-surface-soft, #f7f8fb);
  color: var(--x-color-text, #2f3445);
}

.x-dialog__body {
  flex: 1 1 auto;
  min-height: 0;
  padding: var(--x-dialog-body-padding, 0 18px 12px);
  overflow-y: auto;
  overflow-x: hidden;
}

.x-dialog__footer {
  flex: 0 0 auto;
  padding: var(--x-dialog-footer-padding, 0 18px 14px);
}

.x-dialog__resizer {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 20px;
  height: 20px;
  z-index: 20;
  cursor: se-resize;
}

.x-dialog__resizer::before,
.x-dialog__resizer::after {
  content: '';
  position: absolute;
  right: 1px;
  bottom: 1px;
  border-right: 2px solid rgba(140, 147, 166, 0.75);
  border-bottom: 2px solid rgba(140, 147, 166, 0.75);
}

.x-dialog__resizer::before {
  width: 10px;
  height: 10px;
}

.x-dialog__resizer::after {
  right: 6px;
  bottom: 6px;
  width: 4px;
  height: 4px;
  opacity: 0.65;
}
</style>
