<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import type { ScrollbarProps } from './types'

defineOptions({
  name: 'XScrollbar'
})

const props = defineProps<ScrollbarProps>()

const toCssSize = (value?: string | number) => (typeof value === 'number' ? `${value}px` : value)
const scrollbarStyle = computed(() => ({
  ...createElementStyleVars(props),
  height: toCssSize(props.height),
  maxHeight: toCssSize(props.maxHeight)
}))
</script>

<template>
  <div class="x-scrollbar" :style="scrollbarStyle">
    <slot />
  </div>
</template>
