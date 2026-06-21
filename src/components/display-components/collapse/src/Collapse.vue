<script setup lang="ts">
import { computed } from 'vue'
import type { CollapseItem, CollapseProps, CollapseValue } from './types'

defineOptions({ name: 'XCollapse' })

const props = withDefaults(defineProps<CollapseProps>(), { items: () => [], accordion: false })
const emit = defineEmits<{ 'update:modelValue': [value: CollapseValue | CollapseValue[]]; change: [value: CollapseValue | CollapseValue[]] }>()
const activeValues = computed(() => Array.isArray(props.modelValue) ? props.modelValue : props.modelValue === undefined ? [] : [props.modelValue])
function isActive(name: CollapseValue) { return activeValues.value.includes(name) }
function toggle(item: CollapseItem) {
  if (item.disabled) return
  let next: CollapseValue | CollapseValue[]
  if (props.accordion) next = isActive(item.name) ? '' : item.name
  else next = isActive(item.name) ? activeValues.value.filter((value) => value !== item.name) : [...activeValues.value, item.name]
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <div class="x-collapse">
    <section v-for="(item, index) in props.items" :key="item.name" class="x-collapse__item" :class="{ 'is-active': isActive(item.name), 'is-disabled': item.disabled }">
      <button class="x-collapse__header" type="button" :disabled="item.disabled" :aria-expanded="isActive(item.name)" @click="toggle(item)">
        <slot name="title" :item="item" :index="index">{{ item.title }}</slot>
        <span class="x-collapse__arrow">›</span>
      </button>
      <div v-if="isActive(item.name)" class="x-collapse__body"><slot name="item" :item="item" :index="index">{{ item.content }}</slot></div>
    </section>
    <slot />
  </div>
</template>

<style scoped>
.x-collapse { border: 1px solid var(--x-color-border); border-radius: 6px; color: var(--x-color-text); font-family: var(--x-font-family); overflow: hidden; width: 100%; }
.x-collapse__item + .x-collapse__item { border-top: 1px solid var(--x-color-border); }
.x-collapse__header { align-items: center; background: var(--x-color-surface); border: 0; color: inherit; cursor: pointer; display: flex; font: 700 13px/1.4 var(--x-font-family); justify-content: space-between; min-height: 40px; padding: 0 12px; text-align: left; width: 100%; }
.x-collapse__header:disabled { color: var(--x-color-disabled-text); cursor: not-allowed; }
.x-collapse__arrow { transition: transform 160ms ease; }
.x-collapse__item.is-active .x-collapse__arrow { transform: rotate(90deg); }
.x-collapse__body { background: var(--x-color-surface-soft); color: var(--x-color-muted); font-size: 13px; line-height: 1.7; padding: 12px; }
</style>
