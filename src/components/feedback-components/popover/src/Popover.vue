<script setup lang="ts">
import { useFloatingPosition } from '../../../_utils/useFloatingPosition'

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createFontStyle, getComponentMetrics } from '../../../_utils/size'
import { toCssSize } from '../../../_utils/elementStyle'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { PopoverProps } from './types'

defineOptions({ name: 'XPopover' })

const props = withDefaults(defineProps<PopoverProps & { contentPlain?: boolean }>(), { modelValue: undefined, title: '', content: '', placement: 'bottom', trigger: 'click', disabled: false, showArrow: true, contentPlain: false, width: 220, teleported: true, teleportTo: 'body', zIndex: overlayZIndex.popper, fontSize: 14 })
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; show: []; hide: [] }>()
const uncontrolledVisible = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)


const visible = computed(() => props.modelValue ?? uncontrolledVisible.value)
const { position, effectivePlacement, updatePosition } = useFloatingPosition({ trigger: triggerRef, popper: popperRef, visible, placement: () => props.placement, teleported: () => props.teleported })
const preset = computed(() => getComponentMetrics(props.fontSize))
const styleVars = computed(() => ({ '--x-popover-width': toCssSize(props.width), '--x-popover-font-size': preset.value.fontSize + 'px', '--x-popover-z-index': props.zIndex, ...(props.teleported ? position.value : {}) }))
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
function handleDocumentPointerdown(event: PointerEvent) {
  if (props.trigger !== 'click' || !visible.value) return

  const target = event.target
  if (!(target instanceof Node)) return
  if (triggerRef.value?.contains(target) || popperRef.value?.contains(target)) return

  setVisible(false)
}
watch(visible, async (value) => { if (value) { await nextTick(); updatePosition() } }, { flush: 'post' })
onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerdown, true)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerdown, true)
  setVisible(false)
})
</script>

<template>
  <span :style="createFontStyle(props.fontSize ?? 14)" ref="triggerRef" class="x-popover" :class="{ 'is-visible': visible }" @click="toggle" @mouseenter="onMouseenter" @mouseleave="onMouseleave" @focusin="onFocus" @focusout="onBlur">
    <slot />
    <Teleport v-if="props.teleported" :to="props.teleportTo"><div v-if="visible" ref="popperRef" class="x-popover__popper is-teleported" :class="['x-popover__popper--' + effectivePlacement, { 'is-content-plain': props.contentPlain }]" :style="styleVars"><strong v-if="props.title" class="x-popover__title">{{ props.title }}</strong><div class="x-popover__content"><slot name="content">{{ props.content }}</slot></div><span v-if="props.showArrow" class="x-popover__arrow" /></div></Teleport>
    <div v-else-if="visible" ref="popperRef" class="x-popover__popper" :class="['x-popover__popper--' + props.placement, { 'is-content-plain': props.contentPlain }]" :style="styleVars"><strong v-if="props.title" class="x-popover__title">{{ props.title }}</strong><div class="x-popover__content"><slot name="content">{{ props.content }}</slot></div><span v-if="props.showArrow" class="x-popover__arrow" /></div>
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
.x-popover__popper.is-content-plain { background: transparent; border: 0; box-shadow: none; padding: 0; width: auto; }
.x-popover__title { font-size: 14px; font-weight: 800; }
.x-popover__content { color: var(--x-color-muted); min-width: 0; }
.x-popover__popper.is-content-plain .x-popover__content { color: inherit; }
.x-popover__arrow { display: none; }
</style>
