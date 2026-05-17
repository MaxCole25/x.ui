<script setup lang="ts">
import { computed, inject } from 'vue'
import { dropdownContextKey } from '../../dropdown/src/context'
import type { DropdownItemProps } from './types'

defineOptions({
  name: 'XDropdownItem'
})

const props = withDefaults(defineProps<DropdownItemProps>(), {
  disabled: false,
  divided: false,
  size: 'md',
  active: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const dropdown = inject(dropdownContextKey, null)

const itemStyle = computed(() => ({
  '--x-element-border-width': typeof props.borderWidth === 'number' ? `${props.borderWidth}px` : props.borderWidth,
  '--x-element-border-color': props.borderColor,
  '--x-element-bg': props.backgroundColor,
  '--x-element-text': props.textColor,
  '--x-dropdown-item-height': typeof props.height === 'number' ? `${props.height}px` : props.height,
  '--x-dropdown-item-padding': props.padding,
  '--x-dropdown-item-radius': typeof props.radius === 'number' ? `${props.radius}px` : props.radius,
  '--x-dropdown-item-hover-bg': props.hoverBackgroundColor,
  '--x-dropdown-item-hover-text': props.hoverTextColor,
  '--x-dropdown-item-active-bg': props.activeBackgroundColor,
  '--x-dropdown-item-active-text': props.activeTextColor,
  '--x-dropdown-item-divided-color': props.dividedColor
}))

function handleClick(event: MouseEvent) {
  if (props.disabled) return
  emit('click', event)
  dropdown?.select(props.command)
}
</script>

<template>
  <button
    class="x-dropdown-item"
    :class="[`x-dropdown-item--${props.size}`, { 'is-disabled': props.disabled, 'is-divided': props.divided, 'is-active': props.active }]"
    :style="itemStyle"
    type="button"
    role="menuitem"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <i v-if="props.icon" class="x-dropdown-item__icon" :class="props.icon" aria-hidden="true"></i>
    <span class="x-dropdown-item__content"><slot /></span>
  </button>
</template>
