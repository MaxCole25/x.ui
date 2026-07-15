<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import { brickContentLayoutKey, brickDirectionKey, brickGroupLayoutKey } from './types'
import type { CSSProperties } from 'vue'
import type { BrickDirection, BrickItemProps } from './types'

defineOptions({
  name: 'XBrickItem'
})

const props = withDefaults(defineProps<BrickItemProps>(), {
  backgroundColor: 'transparent',
  overflow: 'auto',
  verticalCenter: undefined,
  horizontalCenter: undefined,
  bottomAlign: undefined,
  rightAlign: undefined
})

const injectedDirection = inject(brickDirectionKey, computed<BrickDirection>(() => 'horizontal'))
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
const injectedGroupLayout = inject(
  brickGroupLayoutKey,
  computed(() => ({
    rightAlign: false
  }))
)
const direction = computed(() => injectedDirection?.value ?? 'horizontal')
const shouldShrinkOnHorizontalRightAlign = computed(
  () => direction.value === 'horizontal' && Boolean(injectedGroupLayout.value.rightAlign)
)
const mergedVerticalCenter = computed(() => props.verticalCenter ?? injectedContentLayout.value.verticalCenter ?? false)
const mergedHorizontalCenter = computed(() => props.horizontalCenter ?? injectedContentLayout.value.horizontalCenter ?? false)
const mergedBottomAlign = computed(() => props.bottomAlign ?? injectedContentLayout.value.bottomAlign ?? false)
const mergedRightAlign = computed(() => props.rightAlign ?? injectedContentLayout.value.rightAlign ?? false)
const mergedPadding = computed(() => (props.padding !== undefined ? props.padding : injectedContentLayout.value.padding))
const nestedContentLayout = computed(() => ({
  verticalCenter: mergedVerticalCenter.value,
  horizontalCenter: mergedHorizontalCenter.value,
  bottomAlign: mergedBottomAlign.value,
  rightAlign: mergedRightAlign.value,
  padding: mergedPadding.value
}))

provide(brickContentLayoutKey, nestedContentLayout)

const mainSize = computed(() => {
  if (props.size !== undefined) {
    return props.size
  }

  return direction.value === 'horizontal' ? props.width : props.height
})

const itemStyle = computed<CSSProperties>(() => {
  const fixedSize = toCssSize(mainSize.value)
  const minSize = toCssSize(props.minSize)
  const maxSize = toCssSize(props.maxSize)
  const shouldAlign = mergedVerticalCenter.value || mergedHorizontalCenter.value || mergedBottomAlign.value || mergedRightAlign.value

  return {
    flex: fixedSize ? `0 0 ${fixedSize}` : shouldShrinkOnHorizontalRightAlign.value ? '0 1 auto' : '1 1 0',
    width: toCssSize(props.width),
    height: toCssSize(props.height),
    minWidth: direction.value === 'horizontal' ? minSize : undefined,
    minHeight: direction.value === 'vertical' ? minSize : undefined,
    maxWidth: direction.value === 'horizontal' ? maxSize : undefined,
    maxHeight: direction.value === 'vertical' ? maxSize : undefined,
    backgroundColor: props.backgroundColor,
    borderWidth: toCssSize(props.borderWidth),
    borderColor: props.borderColor,
    borderRadius: toCssSize(props.radius),
    color: props.textColor,
    overflow: props.overflow,
    display: shouldAlign ? 'flex' : undefined,
    flexDirection: shouldAlign ? 'column' : undefined,
    justifyContent: mergedBottomAlign.value ? 'flex-end' : mergedVerticalCenter.value ? 'center' : undefined,
    alignItems: mergedRightAlign.value ? 'flex-end' : mergedHorizontalCenter.value ? 'center' : undefined,
    padding: toCssSize(mergedPadding.value)
  }
})
</script>

<template>
  <section
    class="x-brick-item x-scrollbar--native"
    :class="[`x-brick-item--${direction}`, { 'is-fixed': mainSize !== undefined, 'is-fluid': mainSize === undefined }]"
    :style="itemStyle"
    data-x-brick-item
    data-x-brick-resizable="false"
  >
    <slot />
  </section>
</template>
