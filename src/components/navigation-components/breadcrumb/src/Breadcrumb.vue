<script setup lang="ts">
import type { BreadcrumbItem, BreadcrumbProps } from './types'

defineOptions({ name: 'XBreadcrumb' })

const props = withDefaults(defineProps<BreadcrumbProps>(), { items: () => [], separator: '/' })
const emit = defineEmits<{ click: [item: BreadcrumbItem, index: number, event: MouseEvent] }>()
function handleClick(item: BreadcrumbItem, index: number, event: MouseEvent) {
  if (item.disabled) return
  emit('click', item, index, event)
}
</script>

<template>
  <nav class="x-breadcrumb" aria-label="面包屑">
    <ol class="x-breadcrumb__list">
      <li v-for="(item, index) in props.items" :key="item.label + index" class="x-breadcrumb__item" :class="{ 'is-disabled': item.disabled, 'is-current': index === props.items.length - 1 }">
        <a v-if="item.to && !item.disabled" class="x-breadcrumb__link" :href="item.to" @click="handleClick(item, index, $event)">{{ item.label }}</a>
        <button v-else class="x-breadcrumb__link" type="button" :disabled="item.disabled || index === props.items.length - 1" @click="handleClick(item, index, $event)">{{ item.label }}</button>
        <span v-if="index < props.items.length - 1" class="x-breadcrumb__separator">{{ props.separator }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.x-breadcrumb { color: var(--x-color-muted); font-family: var(--x-font-family); font-size: 13px; line-height: 1.4; }
.x-breadcrumb__list { align-items: center; display: flex; flex-wrap: wrap; gap: 6px; list-style: none; margin: 0; padding: 0; }
.x-breadcrumb__item { align-items: center; display: inline-flex; gap: 6px; min-width: 0; }
.x-breadcrumb__link { background: transparent; border: 0; color: inherit; cursor: pointer; font: inherit; max-width: 180px; overflow: hidden; padding: 0; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; }
.x-breadcrumb__link:hover:not(:disabled) { color: var(--x-color-primary); }
.x-breadcrumb__link:disabled, .x-breadcrumb__item.is-disabled { color: var(--x-color-disabled-text); cursor: not-allowed; }
.x-breadcrumb__item.is-current .x-breadcrumb__link { color: var(--x-color-text); cursor: default; font-weight: 700; }
.x-breadcrumb__separator { color: var(--x-color-disabled-text); }
</style>
