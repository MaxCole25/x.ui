<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import { overlayZIndex } from '../../../_utils/zIndex'
import { XIcon } from '../../../basic-components/icon'
import { XTooltip } from '../../../feedback-components/tooltip'
import type { TooltipPlacement } from '../../../feedback-components/tooltip'
import type { FloatButtonGroupItem, FloatButtonGroupProps } from './types'

defineOptions({
  name: 'XFloatButtonGroup'
})

const props = withDefaults(defineProps<FloatButtonGroupProps>(), {
  items: () => [],
  mode: 'menu',
  modelValue: undefined,
  defaultModelValue: false,
  direction: 'vertical',
  placement: 'bottom-right',
  position: 'fixed',
  offsetX: 24,
  offsetY: 24,
  top: undefined,
  right: undefined,
  bottom: undefined,
  left: undefined,
  size: 'md',
  zIndex: overlayZIndex.popper,
  triggerIcon: 'customer-service-2',
  closeIcon: 'close',
  triggerLabel: '快捷菜单',
  tooltipPlacement: undefined,
  showTooltip: true
})

const emit = defineEmits<{
  'update:modelValue': [expanded: boolean]
  'item-click': [item: FloatButtonGroupItem, event: MouseEvent]
  'trigger-click': [expanded: boolean, event: MouseEvent]
}>()

const uncontrolledExpanded = ref(props.defaultModelValue)
const isExpanded = computed(() => props.modelValue ?? uncontrolledExpanded.value)
const isMenuMode = computed(() => props.mode === 'menu')
const shouldShowItems = computed(() => props.mode === 'direct' || isExpanded.value)
const sizePreset = computed(() => componentSizePreset[props.size])

const autoTooltipPlacement = computed<TooltipPlacement>(() => {
  if (props.tooltipPlacement) return props.tooltipPlacement
  if (props.placement.endsWith('right')) return 'left'
  if (props.placement.endsWith('left')) return 'right'
  return props.placement.startsWith('bottom') ? 'top' : 'bottom'
})

const rootStyle = computed(() => {
  const style: Record<string, string | number | undefined> = {
    position: props.position,
    '--x-float-button-group-size': `${sizePreset.value.height + 16}px`,
    '--x-float-button-group-icon-size': `${sizePreset.value.fontSize + 8}px`,
    '--x-float-button-group-gap': props.size === 'sm' ? '8px' : props.size === 'lg' ? '14px' : '10px',
    '--x-float-button-group-radius': '999px',
    '--x-float-button-group-z-index': props.zIndex
  }

  if (props.placement.endsWith('left')) {
    style.left = toCssSize(props.offsetX)
  } else {
    style.right = toCssSize(props.offsetX)
  }

  if (props.placement.startsWith('top')) {
    style.top = toCssSize(props.offsetY)
  } else {
    style.bottom = toCssSize(props.offsetY)
  }

  if (props.top !== undefined) style.top = toCssSize(props.top)
  if (props.right !== undefined) style.right = toCssSize(props.right)
  if (props.bottom !== undefined) style.bottom = toCssSize(props.bottom)
  if (props.left !== undefined) style.left = toCssSize(props.left)

  return style
})

const listClasses = computed(() => [
  `x-float-button-group__list--${props.direction}`,
  `x-float-button-group__list--${props.placement}`
])

function setExpanded(value: boolean) {
  if (props.modelValue === undefined) {
    uncontrolledExpanded.value = value
  }
  emit('update:modelValue', value)
}

function handleTriggerClick(event: MouseEvent) {
  const nextExpanded = !isExpanded.value
  setExpanded(nextExpanded)
  emit('trigger-click', nextExpanded, event)
}

function handleItemClick(item: FloatButtonGroupItem, event: MouseEvent) {
  if (item.disabled) return
  emit('item-click', item, event)
  if (props.mode === 'menu' && isExpanded.value) {
    setExpanded(false)
  }
}

watch(
  () => props.mode,
  (mode) => {
    if (mode === 'direct' && isExpanded.value) {
      setExpanded(false)
    }
  }
)
</script>

<template>
  <div
    class="x-float-button-group"
    :class="[`x-float-button-group--${props.placement}`, `x-float-button-group--${props.direction}`, `x-float-button-group--${props.mode}`]"
    :style="rootStyle"
  >
    <Transition name="x-float-button-group-list">
      <div v-if="shouldShowItems" class="x-float-button-group__list" :class="listClasses" role="group">
        <XTooltip
          v-for="item in props.items"
          :key="item.key"
          :content="item.label"
          :placement="autoTooltipPlacement"
          :disabled="!props.showTooltip || !item.label"
          :z-index="props.zIndex"
        >
          <button
            class="x-float-button-group__button"
            :class="{ 'is-disabled': item.disabled }"
            type="button"
            :disabled="item.disabled"
            :aria-label="item.label"
            :title="props.showTooltip ? undefined : item.label"
            :style="{ '--x-float-button-group-bg': item.backgroundColor, '--x-float-button-group-text': item.textColor }"
            @click="handleItemClick(item, $event)"
          >
            <slot name="item" :item="item">
              <XIcon :name="item.icon" :icon-size="`${sizePreset.fontSize + 8}px`" />
            </slot>
          </button>
        </XTooltip>
      </div>
    </Transition>

    <XTooltip
      v-if="isMenuMode"
      :content="props.triggerLabel"
      :placement="autoTooltipPlacement"
      :disabled="!props.showTooltip || !props.triggerLabel"
      :z-index="props.zIndex"
    >
      <button
        class="x-float-button-group__button x-float-button-group__trigger"
        type="button"
        :aria-label="props.triggerLabel"
        :aria-expanded="isExpanded"
        :title="props.showTooltip ? undefined : props.triggerLabel"
        @click="handleTriggerClick"
      >
        <slot name="trigger" :expanded="isExpanded">
          <XIcon :name="props.triggerIcon" :icon-size="`${sizePreset.fontSize + 8}px`" />
        </slot>
      </button>
    </XTooltip>
  </div>
</template>

<style scoped>
.x-float-button-group {
  align-items: center;
  display: inline-flex;
  gap: var(--x-float-button-group-gap);
  z-index: var(--x-float-button-group-z-index);
}

.x-float-button-group--horizontal.x-float-button-group--top-right,
.x-float-button-group--horizontal.x-float-button-group--bottom-right {
  flex-direction: row;
}

.x-float-button-group--horizontal.x-float-button-group--top-left,
.x-float-button-group--horizontal.x-float-button-group--bottom-left {
  flex-direction: row-reverse;
}

.x-float-button-group--vertical.x-float-button-group--bottom-left,
.x-float-button-group--vertical.x-float-button-group--bottom-right {
  flex-direction: column;
}

.x-float-button-group--vertical.x-float-button-group--top-left,
.x-float-button-group--vertical.x-float-button-group--top-right {
  flex-direction: column-reverse;
}

.x-float-button-group__list {
  align-items: center;
  display: inline-flex;
  gap: var(--x-float-button-group-gap);
}

.x-float-button-group__list--horizontal {
  flex-direction: row;
}

.x-float-button-group__list--vertical {
  flex-direction: column;
}

.x-float-button-group__button {
  align-items: center;
  background: var(--x-float-button-group-bg, var(--x-color-primary));
  border: 1px solid var(--x-float-button-group-border, rgba(255, 255, 255, 0.22));
  border-radius: var(--x-float-button-group-radius);
  box-shadow: 0 8px 20px rgba(24, 39, 75, 0.18);
  box-sizing: border-box;
  color: var(--x-float-button-group-text, #fff);
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  height: var(--x-float-button-group-size);
  justify-content: center;
  line-height: 1;
  min-width: var(--x-float-button-group-size);
  outline: none;
  padding: 0;
  transition: background-color 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease, transform 0.18s ease;
  width: var(--x-float-button-group-size);
}

.x-float-button-group__button:hover:not(:disabled) {
  box-shadow: 0 10px 24px rgba(24, 39, 75, 0.24);
  transform: translateY(-1px);
}

.x-float-button-group__button:focus-visible {
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.24), 0 8px 20px rgba(24, 39, 75, 0.18);
}

.x-float-button-group__button:disabled,
.x-float-button-group__button.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
  transform: none;
}

.x-float-button-group__trigger {
  background: var(--x-float-button-group-trigger-bg, #f97316);
}

.x-float-button-group-list-enter-active,
.x-float-button-group-list-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.x-float-button-group-list-enter-from,
.x-float-button-group-list-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
