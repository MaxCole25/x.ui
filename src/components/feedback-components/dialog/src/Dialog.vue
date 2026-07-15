<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
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
  showFullscreen: false,
  closeOnMaskClick: true,
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.dialog
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const uncontrolledVisible = ref(false)
const visible = computed({
  get: () => props.modelValue ?? uncontrolledVisible.value,
  set: (value: boolean) => {
    if (props.modelValue === undefined) uncontrolledVisible.value = value
    emit('update:modelValue', value)
  }
})

const popupWidth = ref(toPixelNumber(props.width, 920))
const popupHeight = ref(toPixelNumber(props.height, 760))
const popupLeft = ref(0)
const popupTop = ref(0)
const isFullscreen = ref(false)

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

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function startDrag(event: MouseEvent) {
  if (!props.draggable || isFullscreen.value) {
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
  if (!props.resizable || isFullscreen.value) {
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
    isFullscreen.value = false
    stopDrag()
    stopResize()
    window.removeEventListener('mousemove', moveDrag)
    window.removeEventListener('mouseup', stopDrag)
    window.removeEventListener('mousemove', moveResize)
    window.removeEventListener('mouseup', stopResize)
  },
  { immediate: true }
)

watch(
  () => props.showFullscreen,
  (value) => {
    if (!value) {
      isFullscreen.value = false
    }
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('mousemove', moveResize)
  window.removeEventListener('mouseup', stopResize)
})

const popupStyle = computed(() => ({
  ...createElementStyleVars(props),
  width: isFullscreen.value ? '100vw' : `${popupWidth.value}px`,
  height: isFullscreen.value ? '100vh' : `${popupHeight.value}px`,
  left: isFullscreen.value ? '0px' : `${popupLeft.value}px`,
  top: isFullscreen.value ? '0px' : `${popupTop.value}px`,
  '--x-dialog-bg': props.backgroundColor,
  '--x-dialog-text': props.textColor,
  '--x-dialog-border-color': props.borderColor,
  '--x-dialog-border-width': toCssSize(props.borderWidth),
  '--x-dialog-title': props.titleColor,
  '--x-dialog-header-bg': props.headerBackgroundColor,
  '--x-dialog-body-bg': props.bodyBackgroundColor,
  '--x-dialog-footer-bg': props.footerBackgroundColor,
  '--x-dialog-header-border': props.headerBorderColor,
  '--x-dialog-footer-border': props.footerBorderColor,
  '--x-dialog-close-icon': props.closeIconColor,
  '--x-dialog-close-icon-hover': props.closeIconHoverColor,
  '--x-dialog-close-hover-bg': props.closeIconHoverBackgroundColor,
  '--x-dialog-shadow': props.shadow,
  '--x-dialog-resizer-color': props.resizerColor,
  '--x-dialog-font-size': `${componentSizePreset[props.size ?? 'md'].fontSize}px`,
  '--x-dialog-control-height': `${componentSizePreset[props.size ?? 'md'].height}px`
}))

const maskStyle = computed(() => ({
  '--x-dialog-mask': props.maskColor,
  '--x-dialog-z-index': props.zIndex
}))

const fullscreenIconClass = computed(() => (isFullscreen.value ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'))
const fullscreenLabel = computed(() => (isFullscreen.value ? '退出全屏' : '全屏显示'))
</script>

<template>
  <Teleport :to="props.teleportTo" :disabled="!props.teleported">
    <div v-if="visible" class="x-dialog__mask" :style="maskStyle" @click.self="onMaskClick">
      <div class="x-dialog" v-bind="$attrs" :class="[`x-dialog--${props.size ?? 'md'}`, { 'is-fullscreen': isFullscreen }]" :style="popupStyle">
        <header class="x-dialog__header" @mousedown="startDrag">
          <slot name="header">
            <div class="x-dialog__title">{{ title }}</div>
          </slot>
          <div class="x-dialog__actions" @mousedown.stop>
            <button v-if="showFullscreen" type="button" class="x-dialog__fullscreen" :aria-label="fullscreenLabel" :title="fullscreenLabel" @click="toggleFullscreen">
              <i :class="fullscreenIconClass" aria-hidden="true" />
            </button>
            <button type="button" class="x-dialog__close" aria-label="关闭弹窗" @click="close">×</button>
          </div>
        </header>

        <section class="x-dialog__body x-scrollbar--native">
          <slot />
        </section>

        <footer v-if="$slots.footer" class="x-dialog__footer">
          <slot name="footer" />
        </footer>

        <div v-if="resizable && !isFullscreen" class="x-dialog__resizer" title="拖拽调整大小" @mousedown="startResize" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.x-dialog__mask {
  position: fixed;
  inset: 0;
  z-index: var(--x-dialog-z-index, var(--x-z-index-dialog, 1900));
  background: var(--x-dialog-mask, rgba(18, 28, 45, 0.4));
}

.x-dialog {
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  border: var(--x-element-border-width, var(--x-dialog-border-width, 1px)) solid var(--x-element-border-color, var(--x-dialog-border-color, var(--x-color-border, #d8d9df)));
  border-radius: var(--x-dialog-radius, 8px);
  background: var(--x-element-bg, var(--x-dialog-bg, var(--x-color-surface, #fff)));
  box-shadow: var(--x-dialog-shadow, 0 24px 80px rgba(15, 23, 42, 0.22));
  color: var(--x-element-text, var(--x-dialog-text, var(--x-color-text, #2f3445)));
}

.x-dialog.is-fullscreen {
  border-radius: 0;
}

.x-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--x-dialog-header-bg, var(--x-element-bg, var(--x-dialog-bg, var(--x-color-surface, #fff))));
  border-bottom: 1px solid var(--x-dialog-header-border, transparent);
  color: var(--x-dialog-title, var(--x-element-text, var(--x-dialog-text, var(--x-color-text, #2f3445))));
  padding: var(--x-dialog-header-padding, 16px 18px 10px);
  cursor: move;
  user-select: none;
}

.x-dialog__title {
  min-width: 0;
  flex: 1 1 auto;
  font-size: calc(var(--x-dialog-font-size, 12px) + 4px);
  font-weight: 700;
  color: inherit;
}

.x-dialog__actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
}

.x-dialog__close,
.x-dialog__fullscreen {
  width: var(--x-dialog-control-height, 28px);
  height: var(--x-dialog-control-height, 28px);
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--x-dialog-close-icon, var(--x-color-text-muted, #8c93a6));
  line-height: 1;
  cursor: pointer;
}

.x-dialog__close {
  font-size: 20px;
}

.x-dialog__fullscreen {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--x-dialog-font-size, 12px) + 4px);
}

.x-dialog__close:hover,
.x-dialog__fullscreen:hover {
  background: var(--x-dialog-close-hover-bg, var(--x-color-surface-soft, #f7f8fb));
  color: var(--x-dialog-close-icon-hover, var(--x-color-text, #2f3445));
}

.x-dialog__body {
  background: var(--x-dialog-body-bg, var(--x-element-bg, var(--x-dialog-bg, var(--x-color-surface, #fff))));
  color: var(--x-element-text, var(--x-dialog-text, var(--x-color-text, #2f3445)));
  flex: 1 1 auto;
  min-height: 0;
  padding: var(--x-dialog-body-padding, 0 18px 12px);
  overflow-y: auto;
  overflow-x: hidden;
}

.x-dialog__footer {
  background: var(--x-dialog-footer-bg, var(--x-element-bg, var(--x-dialog-bg, var(--x-color-surface, #fff))));
  border-top: 1px solid var(--x-dialog-footer-border, transparent);
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
  border-right: 2px solid var(--x-dialog-resizer-color, rgba(140, 147, 166, 0.75));
  border-bottom: 2px solid var(--x-dialog-resizer-color, rgba(140, 147, 166, 0.75));
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
