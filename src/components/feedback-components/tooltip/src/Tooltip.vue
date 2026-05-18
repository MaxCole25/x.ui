<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { TooltipProps } from './types'

defineOptions({
  name: 'XTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  modelValue: undefined,
  placement: 'top',
  trigger: 'hover',
  disabled: false,
  showArrow: true,
  openDelay: 0,
  closeDelay: 80,
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.tooltip
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  show: []
  hide: []
}>()

const uncontrolledVisible = ref(false)
const tooltipRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const teleportedPopperStyle = ref<Record<string, string>>({})
const visible = computed(() => props.modelValue ?? uncontrolledVisible.value)
let timer: number | undefined
let isListeningForPositionChanges = false

const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const tooltipStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-tooltip-font-size': `${sizePreset.value.fontSize}px`,
  '--x-tooltip-z-index': props.zIndex
}))
const popperStyle = computed(() => ({
  ...tooltipStyle.value,
  ...(props.teleported ? teleportedPopperStyle.value : {})
}))

function getViewportSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function updatePopperPosition() {
  if (!props.teleported || !visible.value || !tooltipRef.value || !popperRef.value) return

  const gap = 8
  const viewport = getViewportSize()
  const triggerRect = tooltipRef.value.getBoundingClientRect()
  const popperRect = popperRef.value.getBoundingClientRect()
  const popperWidth = popperRect.width
  const popperHeight = popperRect.height
  const centerX = triggerRect.left + triggerRect.width / 2
  const centerY = triggerRect.top + triggerRect.height / 2
  let left = centerX - popperWidth / 2
  let top = triggerRect.top - gap - popperHeight

  if (props.placement === 'bottom') {
    top = triggerRect.bottom + gap
  }

  if (props.placement === 'left') {
    left = triggerRect.left - gap - popperWidth
    top = centerY - popperHeight / 2
  }

  if (props.placement === 'right') {
    left = triggerRect.right + gap
    top = centerY - popperHeight / 2
  }

  teleportedPopperStyle.value = {
    left: `${Math.round(clamp(left, gap, Math.max(gap, viewport.width - popperWidth - gap)))}px`,
    top: `${Math.round(clamp(top, gap, Math.max(gap, viewport.height - popperHeight - gap)))}px`
  }
}

function addPositionListeners() {
  if (!props.teleported || isListeningForPositionChanges) return

  window.addEventListener('resize', updatePopperPosition)
  window.addEventListener('scroll', updatePopperPosition, true)
  isListeningForPositionChanges = true
}

function removePositionListeners() {
  if (!isListeningForPositionChanges) return

  window.removeEventListener('resize', updatePopperPosition)
  window.removeEventListener('scroll', updatePopperPosition, true)
  isListeningForPositionChanges = false
}

function setVisible(value: boolean) {
  if (props.disabled) value = false
  if (props.modelValue === undefined) uncontrolledVisible.value = value
  emit('update:modelValue', value)
  if (value) {
    emit('show')
  } else {
    emit('hide')
  }
}

function schedule(value: boolean) {
  window.clearTimeout(timer)
  const delay = value ? props.openDelay : props.closeDelay
  timer = window.setTimeout(() => setVisible(value), delay)
}

function toggle() {
  if (props.trigger === 'click') schedule(!visible.value)
}

function onMouseenter() {
  if (props.trigger === 'hover') schedule(true)
}

function onMouseleave() {
  if (props.trigger === 'hover') schedule(false)
}

function onFocus() {
  if (props.trigger === 'focus') schedule(true)
}

function onBlur() {
  if (props.trigger === 'focus') schedule(false)
}

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) setVisible(false)
  }
)

watch(
  visible,
  async (value) => {
    if (!value) {
      removePositionListeners()
      return
    }

    await nextTick()
    updatePopperPosition()
    addPositionListeners()
  },
  { flush: 'post' }
)

watch(
  () => [props.teleported, props.teleportTo, props.placement, props.showArrow, props.content],
  async () => {
    if (!visible.value) return
    removePositionListeners()
    await nextTick()
    updatePopperPosition()
    addPositionListeners()
  }
)

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  removePositionListeners()
})
</script>

<template>
  <span
    ref="tooltipRef"
    class="x-tooltip"
    :class="{ 'is-visible': visible }"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @focusin="onFocus"
    @focusout="onBlur"
    @click="toggle"
  >
    <slot />
    <Teleport v-if="props.teleported" :to="props.teleportTo">
      <span
        v-if="visible"
        ref="popperRef"
        class="x-tooltip__popper is-teleported"
        :class="[`x-tooltip__popper--${props.placement}`, { 'has-arrow': props.showArrow }]"
        :style="popperStyle"
        role="tooltip"
      >
        <slot name="content">{{ props.content }}</slot>
        <span v-if="props.showArrow" class="x-tooltip__arrow" aria-hidden="true" />
      </span>
    </Teleport>
    <span
      v-else-if="visible"
      ref="popperRef"
      class="x-tooltip__popper"
      :class="[`x-tooltip__popper--${props.placement}`, { 'has-arrow': props.showArrow }]"
      :style="popperStyle"
      role="tooltip"
    >
      <slot name="content">{{ props.content }}</slot>
      <span v-if="props.showArrow" class="x-tooltip__arrow" aria-hidden="true" />
    </span>
  </span>
</template>
