<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import type { CardProps } from './types'

defineOptions({
  name: 'XCard'
})

const props = withDefaults(defineProps<CardProps>(), {
  size: undefined,
  shadow: 'always'
})

const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const cardStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-card-width': toCssSize(props.width),
  '--x-card-height': toCssSize(props.height),
  '--x-card-font-size': `${sizePreset.value.fontSize}px`
}))
</script>

<template>
  <section class="x-card" :class="[`x-card--${props.shadow}`, `x-card--${mergedSize}`]" :style="cardStyle">
    <header v-if="$slots.header || props.header" class="x-card__header">
      <slot name="header">{{ props.header }}</slot>
    </header>
    <div class="x-card__body" :style="props.bodyStyle">
      <slot />
    </div>
    <footer v-if="$slots.footer || props.footer" class="x-card__footer">
      <slot name="footer">{{ props.footer }}</slot>
    </footer>
  </section>
</template>
