<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { overlayZIndex } from '../../../_utils/zIndex'
import { dropdownContextKey } from './context'
import type { DropdownProps } from './types'

defineOptions({
  name: 'XDropdown'
})

const props = withDefaults(defineProps<DropdownProps>(), {
  trigger: 'hover',
  placement: 'bottom-start',
  size: 'md',
  disabled: false,
  hideOnClick: true,
  showArrow: true,
  teleported: false,
  teleportTo: 'body',
  offset: 6,
  zIndex: overlayZIndex.popper
})

const emit = defineEmits<{
  command: [command: unknown]
  'visible-change': [visible: boolean]
}>()

const visible = ref(false)
const dropdownRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()
const popperLeft = ref(0)
const popperTop = ref(0)
let timer: number | undefined
const resolvedZIndex = computed(() => props.zIndex ?? overlayZIndex.popper)
const dropdownStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-dropdown-offset': typeof props.offset === 'number' ? `${props.offset}px` : props.offset,
  '--x-dropdown-popper-width': typeof props.popperWidth === 'number' ? `${props.popperWidth}px` : props.popperWidth,
  '--x-dropdown-z-index': resolvedZIndex.value,
  '--x-dropdown-radius': typeof props.radius === 'number' ? `${props.radius}px` : props.radius,
  '--x-dropdown-shadow': props.shadow,
  '--x-dropdown-hover-bg': props.hoverBackgroundColor,
  '--x-dropdown-hover-text': props.hoverTextColor,
  '--x-dropdown-active-bg': props.activeBackgroundColor,
  '--x-dropdown-active-text': props.activeTextColor
}))
const teleportedPopperStyle = computed(() => ({
  ...dropdownStyle.value,
  left: `${popperLeft.value}px`,
  top: `${popperTop.value}px`,
  right: 'auto',
  bottom: 'auto',
  transform: 'none'
}))

function setVisible(value: boolean) {
  if (props.disabled) value = false
  if (visible.value === value) return
  visible.value = value
  emit('visible-change', value)
  if (value) {
    void nextTick(updatePopperPosition)
  }
}

function schedule(value: boolean) {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => setVisible(value), value ? 0 : 100)
}

function toggle() {
  if (props.trigger === 'click') {
    setVisible(!visible.value)
  }
}

function onMouseenter() {
  if (props.trigger === 'hover') schedule(true)
}

function onMouseleave() {
  if (props.trigger === 'hover') schedule(false)
}

provide(dropdownContextKey, {
  select(command: unknown) {
    emit('command', command)
    if (props.hideOnClick) setVisible(false)
  }
})

function toNumber(value: number | string | undefined, fallback: number) {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const next = Number.parseFloat(value)
    return Number.isFinite(next) ? next : fallback
  }
  return fallback
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function updatePopperPosition() {
  if (!props.teleported || !visible.value || !triggerRef.value || !popperRef.value) return

  const gap = 8
  const offset = toNumber(props.offset, 6)
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popperRect = popperRef.value.getBoundingClientRect()
  const width = popperRect.width || toNumber(props.popperWidth, triggerRect.width)
  const height = popperRect.height
  const [side, align = 'center'] = props.placement.split('-') as [string, string?]

  let left = triggerRect.left
  let top = triggerRect.bottom + offset

  if (side === 'top') top = triggerRect.top - height - offset
  if (side === 'left') left = triggerRect.left - width - offset
  if (side === 'right') left = triggerRect.right + offset

  if (side === 'bottom' || side === 'top') {
    if (align === 'end') left = triggerRect.right - width
    else if (align !== 'start') left = triggerRect.left + (triggerRect.width - width) / 2
  }

  if (side === 'left' || side === 'right') {
    if (align === 'end') top = triggerRect.bottom - height
    else if (align !== 'start') top = triggerRect.top + (triggerRect.height - height) / 2
  }

  popperLeft.value = clamp(left, gap, window.innerWidth - width - gap)
  popperTop.value = clamp(top, gap, window.innerHeight - height - gap)
}

function handleDocumentPointerdown(event: PointerEvent) {
  if (!visible.value || props.disabled) return

  const target = event.target
  if (!(target instanceof Node)) return
  if (dropdownRef.value?.contains(target)) return
  if (popperRef.value?.contains(target)) return

  setVisible(false)
}

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerdown, true)
  window.addEventListener('resize', updatePopperPosition)
  window.addEventListener('scroll', updatePopperPosition, true)
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  document.removeEventListener('pointerdown', handleDocumentPointerdown, true)
  window.removeEventListener('resize', updatePopperPosition)
  window.removeEventListener('scroll', updatePopperPosition, true)
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="x-dropdown"
    :class="[`x-dropdown--${props.size}`, { 'is-open': visible, 'is-disabled': props.disabled }]"
    :style="dropdownStyle"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <div ref="triggerRef" class="x-dropdown__trigger" tabindex="0" @click="toggle">
      <slot />
    </div>
    <Teleport :to="props.teleportTo" :disabled="!props.teleported">
      <div
        v-show="visible"
        ref="popperRef"
        class="x-dropdown__popper"
        :class="[`x-dropdown__popper--${props.placement}`, { 'is-teleported': props.teleported }]"
        :style="props.teleported ? teleportedPopperStyle : undefined"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
      >
        <span v-if="props.showArrow" class="x-dropdown__arrow" aria-hidden="true"></span>
        <slot name="dropdown" />
      </div>
    </Teleport>
  </div>
</template>
