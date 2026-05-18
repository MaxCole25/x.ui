<script setup lang="ts">
import { computed, provide, ref } from 'vue'
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
  offset: 6,
  popperZIndex: overlayZIndex.popper
})

const emit = defineEmits<{
  command: [command: unknown]
  'visible-change': [visible: boolean]
}>()

const visible = ref(false)
let timer: number | undefined
const dropdownStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-dropdown-offset': typeof props.offset === 'number' ? `${props.offset}px` : props.offset,
  '--x-dropdown-popper-width': typeof props.popperWidth === 'number' ? `${props.popperWidth}px` : props.popperWidth,
  '--x-dropdown-z-index': props.popperZIndex,
  '--x-dropdown-radius': typeof props.radius === 'number' ? `${props.radius}px` : props.radius,
  '--x-dropdown-shadow': props.shadow,
  '--x-dropdown-hover-bg': props.hoverBackgroundColor,
  '--x-dropdown-hover-text': props.hoverTextColor,
  '--x-dropdown-active-bg': props.activeBackgroundColor,
  '--x-dropdown-active-text': props.activeTextColor
}))

function setVisible(value: boolean) {
  if (props.disabled) value = false
  if (visible.value === value) return
  visible.value = value
  emit('visible-change', value)
}

function schedule(value: boolean) {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => setVisible(value), value ? 0 : 100)
}

function toggle() {
  if (props.trigger === 'click') setVisible(!visible.value)
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
</script>

<template>
  <div
    class="x-dropdown"
    :class="[`x-dropdown--${props.size}`, { 'is-open': visible, 'is-disabled': props.disabled }]"
    :style="dropdownStyle"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <div class="x-dropdown__trigger" tabindex="0" @click="toggle">
      <slot />
    </div>
    <div v-show="visible" class="x-dropdown__popper" :class="`x-dropdown__popper--${props.placement}`">
      <span v-if="props.showArrow" class="x-dropdown__arrow" aria-hidden="true"></span>
      <slot name="dropdown" />
    </div>
  </div>
</template>
