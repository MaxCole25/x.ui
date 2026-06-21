<script setup lang="ts">
import { computed } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { SkeletonProps } from './types'

defineOptions({ name: 'XSkeleton' })

const props = withDefaults(defineProps<SkeletonProps>(), { loading: true, rows: 3, animated: true, avatar: false, title: true, round: false, width: '100%', height: undefined })
const styleVars = computed(() => ({ '--x-skeleton-width': toCssSize(props.width), '--x-skeleton-height': toCssSize(props.height) }))
</script>

<template>
  <div v-if="props.loading" class="x-skeleton" :class="{ 'is-animated': props.animated, 'is-round': props.round }" :style="styleVars" aria-busy="true">
    <div v-if="props.avatar" class="x-skeleton__avatar" />
    <div class="x-skeleton__content">
      <div v-if="props.title" class="x-skeleton__title" />
      <div v-for="row in props.rows" :key="row" class="x-skeleton__row" :style="{ width: row === props.rows ? '62%' : '100%' }" />
    </div>
  </div>
  <slot v-else />
</template>

<style scoped>
.x-skeleton { box-sizing: border-box; display: flex; gap: 12px; width: var(--x-skeleton-width); }
.x-skeleton__avatar, .x-skeleton__title, .x-skeleton__row { background: linear-gradient(90deg, var(--x-color-surface-soft) 25%, #eef2f7 37%, var(--x-color-surface-soft) 63%); background-size: 400% 100%; border-radius: 6px; }
.x-skeleton.is-animated .x-skeleton__avatar, .x-skeleton.is-animated .x-skeleton__title, .x-skeleton.is-animated .x-skeleton__row { animation: x-skeleton-loading 1.2s ease infinite; }
.x-skeleton.is-round .x-skeleton__title, .x-skeleton.is-round .x-skeleton__row { border-radius: 999px; }
.x-skeleton__avatar { border-radius: 50%; flex: 0 0 40px; height: 40px; width: 40px; }
.x-skeleton__content { display: grid; flex: 1 1 auto; gap: 10px; min-width: 0; }
.x-skeleton__title { height: 18px; width: 42%; }
.x-skeleton__row { height: var(--x-skeleton-height, 14px); }
@keyframes x-skeleton-loading { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
</style>
