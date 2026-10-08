<script setup lang="ts">
import { useFloatingPosition } from '../../../_utils/useFloatingPosition'

import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { createFontStyle, getComponentMetrics } from '../../../_utils/size'
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

const visible = computed(() => props.modelValue ?? uncontrolledVisible.value)
const { position: teleportedPopperStyle, effectivePlacement, updatePosition: updatePopperPosition } = useFloatingPosition({ trigger: tooltipRef, popper: popperRef, visible, placement: () => props.placement, teleported: () => props.teleported })
let timer: number | undefined


const mergedSize = computed(() => props.fontSize ?? 14)
const sizePreset = computed(() => getComponentMetrics(mergedSize.value))
const tooltipStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-tooltip-font-size': `${sizePreset.value.fontSize}px`,
  '--x-tooltip-z-index': props.zIndex
}))
const popperStyle = computed(() => ({
  ...tooltipStyle.value,
  ...(props.teleported ? teleportedPopperStyle.value : {})
}))

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
      return
    }

    await nextTick()
    updatePopperPosition()
  },
  { flush: 'post' }
)

watch(
  () => [props.teleported, props.teleportTo, props.placement, props.showArrow, props.content],
  async () => {
    if (!visible.value) return
    await nextTick()
    updatePopperPosition()
  }
)

onBeforeUnmount(() => {
  window.clearTimeout(timer)
})
</script>

<template>
  <span :style="createFontStyle(mergedSize)"
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
        :class="[`x-tooltip__popper--${props.teleported ? effectivePlacement : props.placement}`, { 'has-arrow': props.showArrow }]"
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
      :class="[`x-tooltip__popper--${props.teleported ? effectivePlacement : props.placement}`, { 'has-arrow': props.showArrow }]"
      :style="popperStyle"
      role="tooltip"
    >
      <slot name="content">{{ props.content }}</slot>
      <span v-if="props.showArrow" class="x-tooltip__arrow" aria-hidden="true" />
    </span>
  </span>
</template>
