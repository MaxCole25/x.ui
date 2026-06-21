<script setup lang="ts">
import type { StepItem, StepsProps, StepStatus } from './types'

defineOptions({ name: 'XSteps' })

const props = withDefaults(defineProps<StepsProps>(), { modelValue: 0, items: () => [], direction: 'horizontal', clickable: false })
const emit = defineEmits<{ 'update:modelValue': [value: number]; change: [value: number, item: StepItem] }>()
function statusOf(index: number, item: StepItem): StepStatus { return item.status ?? (index < props.modelValue ? 'success' : index === props.modelValue ? 'process' : 'wait') }
function selectStep(index: number, item: StepItem) {
  if (!props.clickable || item.disabled) return
  emit('update:modelValue', index)
  emit('change', index, item)
}
</script>

<template>
  <div class="x-steps" :class="'x-steps--' + props.direction">
    <button v-for="(item, index) in props.items" :key="item.title + index" class="x-steps__item" :class="['x-steps__item--' + statusOf(index, item), { 'is-clickable': props.clickable, 'is-disabled': item.disabled }]" type="button" :disabled="item.disabled" @click="selectStep(index, item)">
      <span class="x-steps__icon">{{ index + 1 }}</span>
      <span class="x-steps__content"><span class="x-steps__title">{{ item.title }}</span><span v-if="item.description" class="x-steps__description">{{ item.description }}</span></span>
    </button>
  </div>
</template>

<style scoped>
.x-steps { color: var(--x-color-muted); display: flex; font-family: var(--x-font-family); gap: 0; width: 100%; }
.x-steps--vertical { flex-direction: column; }
.x-steps__item { align-items: flex-start; background: transparent; border: 0; color: inherit; display: flex; flex: 1 1 0; gap: 10px; min-width: 0; padding: 0; position: relative; text-align: left; }
.x-steps--horizontal .x-steps__item:not(:last-child)::after { background: var(--x-color-border); content: ''; height: 1px; left: 34px; position: absolute; right: 10px; top: 12px; }
.x-steps--vertical .x-steps__item { min-height: 58px; }
.x-steps--vertical .x-steps__item:not(:last-child)::after { background: var(--x-color-border); bottom: 6px; content: ''; left: 12px; position: absolute; top: 28px; width: 1px; }
.x-steps__icon { align-items: center; background: var(--x-color-surface-soft); border: 1px solid var(--x-color-border); border-radius: 50%; box-sizing: border-box; color: var(--x-color-muted); display: inline-flex; flex: 0 0 24px; font-size: 12px; font-weight: 800; height: 24px; justify-content: center; position: relative; width: 24px; z-index: 1; }
.x-steps__content { display: grid; gap: 4px; min-width: 0; padding-right: 12px; }
.x-steps__title { color: var(--x-color-text); font-size: 13px; font-weight: 800; line-height: 1.35; }
.x-steps__description { color: var(--x-color-muted); font-size: 12px; line-height: 1.4; }
.x-steps__item--success .x-steps__icon { background: var(--x-color-success); border-color: var(--x-color-success); color: #fff; }
.x-steps__item--process .x-steps__icon { background: var(--x-color-primary); border-color: var(--x-color-primary); color: #fff; }
.x-steps__item--error .x-steps__icon { background: var(--x-color-danger); border-color: var(--x-color-danger); color: #fff; }
.x-steps__item.is-clickable { cursor: pointer; }
.x-steps__item.is-disabled { cursor: not-allowed; opacity: 0.56; }
</style>
