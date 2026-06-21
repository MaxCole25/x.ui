<script setup lang="ts">
import { computed } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { DescriptionsProps } from './types'

defineOptions({ name: 'XDescriptions' })

const props = withDefaults(defineProps<DescriptionsProps>(), { items: () => [], column: 3, bordered: false, labelWidth: '96px' })
const styleVars = computed(() => ({ '--x-descriptions-column': props.column, '--x-descriptions-label-width': toCssSize(props.labelWidth), '--x-descriptions-label': props.labelColor, '--x-descriptions-text': props.textColor }))
function spanOf(span?: number) { return 'span ' + Math.min(props.column, span ?? 1) }
</script>

<template>
  <section class="x-descriptions" :class="{ 'is-bordered': props.bordered }" :style="styleVars">
    <header v-if="props.title || $slots.title" class="x-descriptions__header"><slot name="title">{{ props.title }}</slot></header>
    <dl class="x-descriptions__body">
      <template v-for="(item, index) in props.items" :key="item.label + '-' + index">
        <div class="x-descriptions__item" :style="{ gridColumn: spanOf(item.span) }">
          <dt class="x-descriptions__label">{{ item.label }}</dt>
          <dd class="x-descriptions__value"><slot name="item" :item="item" :index="index">{{ item.value }}</slot></dd>
        </div>
      </template>
      <slot />
    </dl>
  </section>
</template>

<style scoped>
.x-descriptions { color: var(--x-descriptions-text, var(--x-color-text)); display: grid; font-family: var(--x-font-family); gap: 12px; min-width: 0; width: 100%; }
.x-descriptions__header { font-size: 15px; font-weight: 800; line-height: 1.4; }
.x-descriptions__body { display: grid; gap: 0; grid-template-columns: repeat(var(--x-descriptions-column), minmax(0, 1fr)); margin: 0; }
.x-descriptions__item { display: grid; grid-template-columns: var(--x-descriptions-label-width) minmax(0, 1fr); min-width: 0; }
.x-descriptions__label, .x-descriptions__value { border-bottom: 1px solid transparent; box-sizing: border-box; line-height: 1.5; margin: 0; min-width: 0; padding: 8px 10px; }
.x-descriptions__label { color: var(--x-descriptions-label, var(--x-color-muted)); font-weight: 700; }
.x-descriptions__value { overflow-wrap: anywhere; }
.x-descriptions.is-bordered .x-descriptions__body { border-left: 1px solid var(--x-color-border); border-top: 1px solid var(--x-color-border); }
.x-descriptions.is-bordered .x-descriptions__label, .x-descriptions.is-bordered .x-descriptions__value { border-bottom-color: var(--x-color-border); border-right: 1px solid var(--x-color-border); }
.x-descriptions.is-bordered .x-descriptions__label { background: var(--x-color-surface-soft); }
</style>
