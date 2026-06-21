<script setup lang="ts">
import { computed } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import type { PaginationProps } from './types'

defineOptions({ name: 'XPagination' })

const props = withDefaults(defineProps<PaginationProps>(), { modelValue: 1, total: 0, pageSize: 10, pagerCount: 7, disabled: false, showTotal: true, showPageSize: false, pageSizes: () => [10, 20, 50, 100], size: 'md' })
const emit = defineEmits<{ 'update:modelValue': [value: number]; 'update:pageSize': [value: number]; change: [page: number, pageSize: number] }>()
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const current = computed(() => Math.min(pageCount.value, Math.max(1, props.modelValue)))
const preset = computed(() => componentSizePreset[props.size])
const pages = computed(() => {
  const count = pageCount.value
  const pagerCount = Math.max(5, props.pagerCount)
  if (count <= pagerCount) return Array.from({ length: count }, (_, index) => index + 1)
  const half = Math.floor(pagerCount / 2)
  let start = Math.max(1, current.value - half)
  let end = Math.min(count, start + pagerCount - 1)
  start = Math.max(1, end - pagerCount + 1)
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
})
const styleVars = computed(() => ({ '--x-pagination-height': preset.value.height + 'px', '--x-pagination-font-size': preset.value.fontSize + 'px', '--x-pagination-radius': preset.value.radius }))
function setPage(page: number) {
  if (props.disabled) return
  const next = Math.min(pageCount.value, Math.max(1, page))
  emit('update:modelValue', next)
  emit('change', next, props.pageSize)
}
function setPageSize(event: Event) {
  const next = Number((event.target as HTMLSelectElement).value)
  emit('update:pageSize', next)
  emit('update:modelValue', 1)
  emit('change', 1, next)
}
</script>

<template>
  <nav class="x-pagination" :class="{ 'is-disabled': props.disabled }" :style="styleVars" aria-label="分页">
    <span v-if="props.showTotal" class="x-pagination__total">共 {{ props.total }} 条</span>
    <select v-if="props.showPageSize" class="x-pagination__size" :value="props.pageSize" :disabled="props.disabled" @change="setPageSize"><option v-for="item in props.pageSizes" :key="item" :value="item">{{ item }} 条/页</option></select>
    <button class="x-pagination__button" type="button" :disabled="props.disabled || current <= 1" @click="setPage(current - 1)">上一页</button>
    <button v-for="page in pages" :key="page" class="x-pagination__pager" :class="{ 'is-active': page === current }" type="button" :disabled="props.disabled" @click="setPage(page)">{{ page }}</button>
    <button class="x-pagination__button" type="button" :disabled="props.disabled || current >= pageCount" @click="setPage(current + 1)">下一页</button>
  </nav>
</template>

<style scoped>
.x-pagination { align-items: center; color: var(--x-color-text); display: inline-flex; flex-wrap: wrap; font-family: var(--x-font-family); font-size: var(--x-pagination-font-size); gap: 6px; }
.x-pagination__total { color: var(--x-color-muted); }
.x-pagination__button, .x-pagination__pager, .x-pagination__size { background: var(--x-color-surface); border: 1px solid var(--x-color-border); border-radius: var(--x-pagination-radius); box-sizing: border-box; color: inherit; font: inherit; height: var(--x-pagination-height); min-width: var(--x-pagination-height); padding: 0 8px; }
.x-pagination__button, .x-pagination__pager { cursor: pointer; }
.x-pagination__button:disabled, .x-pagination__pager:disabled, .x-pagination__size:disabled { color: var(--x-color-disabled-text); cursor: not-allowed; }
.x-pagination__pager.is-active { background: var(--x-color-primary); border-color: var(--x-color-primary); color: #fff; }
.x-pagination.is-disabled { opacity: 0.7; }
</style>
