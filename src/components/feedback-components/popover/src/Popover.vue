<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import { toCssSize } from '../../../_utils/elementStyle'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { PopoverProps } from './types'

defineOptions({ name: 'XPopover' })

const props = withDefaults(defineProps<PopoverProps>(), { modelValue: undefined, title: '', content: '', placement: 'bottom', trigger: 'click', disabled: false, showArrow: true, width: 220, teleported: true, teleportTo: 'body', zIndex: overlayZIndex.popper, size: 'md' })
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; show: []; hide: [] }>()
const uncontrolledVisible = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const position = ref<Record<string, string>>({})
const visible = computed(() => props.modelValue ?? uncontrolledVisible.value)
const preset = computed(() => componentSizePreset[props.size])
const styleVars = computed(() => ({ '--x-popover-width': toCssSize(props.width), '--x-popover-font-size': preset.value.fontSize + 'px', '--x-popover-z-index': props.zIndex, ...position.value }))
function setVisible(value: boolean) {
  if (props.disabled) value = false
  if (props.modelValue === undefined) uncontrolledVisible.value = value
  emit('update:modelValue', value)
  if (value) emit('show')
  else emit('hide')
}
function toggle() { if (props.trigger === 'click') setVisible(!visible.value) }
function onMouseenter() { if (props.trigger === 'hover') setVisible(true) }
function onMouseleave() { if (props.trigger === 'hover') setVisible(false) }
function onFocus() { if (props.trigger === 'focus') setVisible(true) }
function onBlur() { if (props.trigger === 'focus') setVisible(false) }
function updatePosition() {
  if (!props.teleported || !visible.value || !triggerRef.value || !popperRef.value) return
  const gap = 8; const trigger = triggerRef.value.getBoundingClientRect(); const popper = popperRef.value.getBoundingClientRect()
  let left = trigger.left + trigger.width / 2 - popper.width / 2; let top = trigger.bottom + gap
  if (props.placement === 'top') top = trigger.top - popper.height - gap
  if (props.placement === 'left') { left = trigger.left - popper.width - gap; top = trigger.top + trigger.height / 2 - popper.height / 2 }
  if (props.placement === 'right') { left = trigger.right + gap; top = trigger.top + trigger.height / 2 - popper.height / 2 }
  position.value = { left: Math.round(left) + 'px', top: Math.round(top) + 'px' }
}
watch(visible, async (value) => { if (value) { await nextTick(); updatePosition() } }, { flush: 'post' })
onBeforeUnmount(() => setVisible(false))
</script>

<template>
  <span ref="triggerRef" class="x-popover" :class="{ 'is-visible': visible }" @click="toggle" @mouseenter="onMouseenter" @mouseleave="onMouseleave" @focusin="onFocus" @focusout="onBlur">
    <slot />
    <Teleport v-if="props.teleported" :to="props.teleportTo"><div v-if="visible" ref="popperRef" class="x-popover__popper is-teleported" :class="'x-popover__popper--' + props.placement" :style="styleVars"><strong v-if="props.title" class="x-popover__title">{{ props.title }}</strong><div class="x-popover__content"><slot name="content">{{ props.content }}</slot></div><span v-if="props.showArrow" class="x-popover__arrow" /></div></Teleport>
    <div v-else-if="visible" ref="popperRef" class="x-popover__popper" :class="'x-popover__popper--' + props.placement" :style="styleVars"><strong v-if="props.title" class="x-popover__title">{{ props.title }}</strong><div class="x-popover__content"><slot name="content">{{ props.content }}</slot></div><span v-if="props.showArrow" class="x-popover__arrow" /></div>
  </span>
</template>

<style scoped>
.x-popover { display: inline-flex; position: relative; }
.x-popover__popper { background: var(--x-color-surface); border: 1px solid var(--x-color-border); border-radius: 8px; box-shadow: 0 12px 30px rgba(15, 23, 42, 0.14); box-sizing: border-box; color: var(--x-color-text); display: grid; font-family: var(--x-font-family); font-size: var(--x-popover-font-size); gap: 8px; line-height: 1.5; padding: 12px; position: absolute; width: var(--x-popover-width); z-index: var(--x-popover-z-index, var(--x-z-index-popper)); }
.x-popover__popper.is-teleported { position: fixed; }
.x-popover__popper--bottom { left: 0; top: calc(100% + 8px); }
.x-popover__popper--top { bottom: calc(100% + 8px); left: 0; }
.x-popover__popper--left { right: calc(100% + 8px); top: 0; }
.x-popover__popper--right { left: calc(100% + 8px); top: 0; }
.x-popover__title { font-size: 14px; font-weight: 800; }
.x-popover__content { color: var(--x-color-muted); min-width: 0; }
.x-popover__arrow { display: none; }
</style>
