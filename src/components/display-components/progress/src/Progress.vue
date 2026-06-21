<script setup lang="ts">
import { computed } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import { toCssSize } from '../../../_utils/elementStyle'
import type { ProgressProps } from './types'

defineOptions({ name: 'XProgress' })

const props = withDefaults(defineProps<ProgressProps>(), {
  percentage: 0,
  status: 'primary',
  variant: 'line',
  size: 'md',
  strokeWidth: 8,
  showText: true,
  textInside: false,
  width: '100%'
})

const normalized = computed(() => Math.min(100, Math.max(0, props.percentage)))
const preset = computed(() => componentSizePreset[props.size])
const radius = 46
const perimeter = 2 * Math.PI * radius
const styleVars = computed(() => ({
  '--x-progress-percent': normalized.value + '%',
  '--x-progress-color': props.accentColor,
  '--x-progress-track': props.trackColor,
  '--x-progress-text': props.textColor,
  '--x-progress-height': props.strokeWidth + 'px',
  '--x-progress-font-size': preset.value.fontSize + 'px',
  '--x-progress-width': toCssSize(props.width),
  '--x-progress-dash': String(perimeter),
  '--x-progress-offset': String(perimeter * (1 - normalized.value / 100))
}))
</script>

<template>
  <div class="x-progress" :class="['x-progress--' + props.status, 'x-progress--' + props.variant, { 'is-text-inside': props.textInside }]" :style="styleVars" role="progressbar" :aria-valuenow="normalized" aria-valuemin="0" aria-valuemax="100">
    <template v-if="props.variant === 'circle'">
      <svg class="x-progress__circle" viewBox="0 0 100 100" aria-hidden="true">
        <circle class="x-progress__circle-track" cx="50" cy="50" :r="radius" />
        <circle class="x-progress__circle-bar" cx="50" cy="50" :r="radius" />
      </svg>
      <span v-if="props.showText" class="x-progress__text"><slot>{{ normalized }}%</slot></span>
    </template>
    <template v-else>
      <div class="x-progress__track"><div class="x-progress__bar"><span v-if="props.showText && props.textInside" class="x-progress__inner-text">{{ normalized }}%</span></div></div>
      <span v-if="props.showText && !props.textInside" class="x-progress__text"><slot>{{ normalized }}%</slot></span>
    </template>
  </div>
</template>

<style scoped>
.x-progress { --x-progress-status-color: var(--x-color-primary); align-items: center; color: var(--x-progress-text, var(--x-color-muted)); display: inline-flex; font-family: var(--x-font-family); font-size: var(--x-progress-font-size); gap: 10px; width: var(--x-progress-width); }
.x-progress--success { --x-progress-status-color: var(--x-color-success); }
.x-progress--warning { --x-progress-status-color: var(--x-color-warning); }
.x-progress--danger { --x-progress-status-color: var(--x-color-danger); }
.x-progress__track { background: var(--x-progress-track, var(--x-color-surface-soft)); border-radius: 999px; flex: 1 1 auto; height: var(--x-progress-height); min-width: 0; overflow: hidden; }
.x-progress__bar { align-items: center; background: var(--x-progress-color, var(--x-progress-status-color)); border-radius: inherit; color: #fff; display: flex; height: 100%; justify-content: flex-end; max-width: 100%; transition: width 180ms ease; width: var(--x-progress-percent); }
.x-progress__inner-text { font-size: 10px; padding-right: 6px; }
.x-progress__text { flex: 0 0 auto; font-weight: 700; line-height: 1; }
.x-progress--circle { display: inline-grid; place-items: center; position: relative; width: 96px; }
.x-progress__circle { height: 96px; transform: rotate(-90deg); width: 96px; }
.x-progress__circle-track, .x-progress__circle-bar { fill: none; stroke-width: var(--x-progress-height); }
.x-progress__circle-track { stroke: var(--x-progress-track, var(--x-color-surface-soft)); }
.x-progress__circle-bar { stroke: var(--x-progress-color, var(--x-progress-status-color)); stroke-dasharray: var(--x-progress-dash); stroke-dashoffset: var(--x-progress-offset); stroke-linecap: round; transition: stroke-dashoffset 180ms ease; }
.x-progress--circle .x-progress__text { position: absolute; }
</style>
