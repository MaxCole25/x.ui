<script setup lang="ts">
import { computed } from 'vue'
import type { StatisticProps } from './types'

defineOptions({ name: 'XStatistic' })

const props = withDefaults(defineProps<StatisticProps>(), { modelValue: 0, precision: undefined })
const displayValue = computed(() => {
  if (props.formatter) return props.formatter(props.modelValue)
  if (typeof props.modelValue === 'number' && typeof props.precision === 'number') return props.modelValue.toFixed(props.precision)
  return String(props.modelValue ?? '')
})
const styleVars = computed(() => ({ '--x-statistic-value': props.valueColor, '--x-statistic-title': props.titleColor }))
</script>

<template>
  <div class="x-statistic" :style="styleVars">
    <div v-if="props.title || $slots.title" class="x-statistic__title"><slot name="title">{{ props.title }}</slot></div>
    <div class="x-statistic__value"><span v-if="props.prefix" class="x-statistic__prefix">{{ props.prefix }}</span><slot>{{ displayValue }}</slot><span v-if="props.suffix" class="x-statistic__suffix">{{ props.suffix }}</span></div>
  </div>
</template>

<style scoped>
.x-statistic { color: var(--x-statistic-value, var(--x-color-text)); display: inline-grid; font-family: var(--x-font-family); gap: 6px; min-width: 0; }
.x-statistic__title { color: var(--x-statistic-title, var(--x-color-muted)); font-size: 13px; line-height: 1.4; }
.x-statistic__value { align-items: baseline; display: inline-flex; font-size: 26px; font-weight: 800; gap: 4px; line-height: 1.2; min-width: 0; }
.x-statistic__prefix, .x-statistic__suffix { font-size: 14px; font-weight: 700; }
</style>
