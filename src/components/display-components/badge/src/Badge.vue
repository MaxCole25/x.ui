<script setup lang="ts">
import { computed } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import type { BadgeProps } from './types'

defineOptions({ name: 'XBadge' })

const props = withDefaults(defineProps<BadgeProps>(), {
  modelValue: '',
  showZero: false,
  dot: false,
  hidden: false,
  status: 'danger',
  size: 'md'
})

const preset = computed(() => componentSizePreset[props.size])
const isVisible = computed(() => !props.hidden && (props.dot || props.showZero || (props.modelValue !== 0 && props.modelValue !== '' && props.modelValue !== undefined)))
const content = computed(() => {
  if (props.dot) return ''
  if (typeof props.modelValue === 'number' && typeof props.max === 'number' && props.modelValue > props.max) return props.max + '+'
  return String(props.modelValue ?? '')
})
const styleVars = computed(() => ({
  '--x-badge-bg': props.accentColor || props.backgroundColor,
  '--x-badge-text': props.textColor,
  '--x-badge-border': props.borderColor,
  '--x-badge-font-size': Math.max(10, preset.value.fontSize) + 'px'
}))
</script>

<template>
  <span class="x-badge" :style="styleVars">
    <slot />
    <sup v-if="isVisible" class="x-badge__content" :class="['x-badge__content--' + props.status, { 'is-dot': props.dot }]">{{ content }}</sup>
  </span>
</template>

<style scoped>
.x-badge { display: inline-block; font-family: var(--x-font-family); line-height: 1; position: relative; vertical-align: middle; }
.x-badge__content { align-items: center; background: var(--x-badge-bg, var(--x-badge-type-color)); border: 1px solid var(--x-badge-border, #fff); border-radius: 999px; box-sizing: border-box; color: var(--x-badge-text, #fff); display: inline-flex; font-size: var(--x-badge-font-size, 12px); font-weight: 700; height: 18px; justify-content: center; line-height: 1; min-width: 18px; padding: 0 6px; position: absolute; right: 0; top: 0; transform: translate(50%, -50%); white-space: nowrap; z-index: 1; }
.x-badge__content--primary { --x-badge-type-color: var(--x-color-primary); }
.x-badge__content--success { --x-badge-type-color: var(--x-color-success); }
.x-badge__content--warning { --x-badge-type-color: var(--x-color-warning); }
.x-badge__content--danger { --x-badge-type-color: var(--x-color-danger); }
.x-badge__content--info { --x-badge-type-color: var(--x-color-info); }
.x-badge__content.is-dot { height: 8px; min-width: 0; padding: 0; width: 8px; }
</style>
