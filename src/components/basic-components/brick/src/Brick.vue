<script setup lang="ts">
import { Comment, computed, inject, provide, useSlots } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { brickContentLayoutKey, brickDirectionKey, brickGroupLayoutKey } from './types'
import type { CSSProperties, VNode } from 'vue'
import type { BrickProps } from './types'

defineOptions({
  name: 'XBrick'
})

const props = withDefaults(defineProps<BrickProps>(), {
  direction: 'horizontal',
  count: 0,
  gap: 0,
  backgroundColor: 'transparent',
  wrap: false,
  verticalCenter: undefined,
  horizontalCenter: undefined,
  bottomAlign: undefined,
  rightAlign: undefined
})

const slots = useSlots()

const injectedContentLayout = inject(
  brickContentLayoutKey,
  computed(() => ({
    verticalCenter: false,
    horizontalCenter: false,
    bottomAlign: false,
    rightAlign: false,
    padding: undefined
  }))
)
const mergedDirection = computed(() => props.direction)
const mergedVerticalCenter = computed(() => props.verticalCenter ?? injectedContentLayout.value.verticalCenter ?? false)
const mergedHorizontalCenter = computed(() => props.horizontalCenter ?? injectedContentLayout.value.horizontalCenter ?? false)
const mergedBottomAlign = computed(() => props.bottomAlign ?? injectedContentLayout.value.bottomAlign ?? false)
const mergedRightAlign = computed(() => props.rightAlign ?? false)
const mergedContentRightAlign = computed(() =>
  props.rightAlign === undefined ? injectedContentLayout.value.rightAlign ?? false : false
)
const mergedPadding = computed(() => (props.padding !== undefined ? props.padding : injectedContentLayout.value.padding))
const groupLayout = computed(() => ({
  rightAlign: mergedRightAlign.value
}))
const contentLayout = computed(() => ({
  verticalCenter: mergedVerticalCenter.value,
  horizontalCenter: mergedHorizontalCenter.value,
  bottomAlign: mergedBottomAlign.value,
  rightAlign: mergedContentRightAlign.value,
  padding: mergedPadding.value
}))

provide(brickDirectionKey, mergedDirection)
provide(brickGroupLayoutKey, groupLayout)
provide(brickContentLayoutKey, contentLayout)

const visibleSlotNodes = computed(() => (slots.default?.({}) ?? []).filter((node: VNode) => node.type !== Comment))
const hasDefaultContent = computed(() => visibleSlotNodes.value.length > 0)
const placeholderCount = computed(() => Math.max(0, Math.floor(Number(props.count) || 0)))

const brickStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-brick-gap': toCssSize(props.gap),
  '--x-brick-width': toCssSize(props.width),
  '--x-brick-height': toCssSize(props.height),
  justifyContent: mergedDirection.value === 'horizontal' && mergedRightAlign.value ? 'flex-end' : undefined,
  alignItems: mergedDirection.value === 'vertical' && mergedRightAlign.value ? 'flex-end' : undefined
}))

const placeholderStyle = computed<CSSProperties>(() => {
  const shouldAlign =
    mergedVerticalCenter.value || mergedHorizontalCenter.value || mergedBottomAlign.value || mergedContentRightAlign.value

  return {
    flex: '1 1 0',
    display: shouldAlign ? 'flex' : undefined,
    flexDirection: shouldAlign ? 'column' : undefined,
    justifyContent: mergedBottomAlign.value ? 'flex-end' : mergedVerticalCenter.value ? 'center' : undefined,
    alignItems: mergedContentRightAlign.value ? 'flex-end' : mergedHorizontalCenter.value ? 'center' : undefined,
    padding: toCssSize(mergedPadding.value)
  }
})
</script>

<template>
  <div
    class="x-brick"
    :class="[`x-brick--${mergedDirection}`, { 'is-wrap': props.wrap, 'is-right-align': mergedRightAlign }]"
    :style="brickStyle"
    data-x-brick
  >
    <slot v-if="hasDefaultContent" />
    <div
      v-for="itemIndex in placeholderCount"
      v-else
      :key="itemIndex"
      class="x-brick-item x-brick-item--placeholder"
      data-x-brick-item
      data-x-brick-resizable="false"
      :style="placeholderStyle"
    />
  </div>
</template>
