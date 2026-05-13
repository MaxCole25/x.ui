<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { TextProps } from './types'

defineOptions({
  name: 'XText'
})

const props = withDefaults(defineProps<TextProps>(), {
  size: 'md',
  type: 'default',
  tag: 'span',
  truncated: false
})

const textStyle = computed(() => createElementStyleVars(props))
</script>

<template>
  <component
    :is="props.tag"
    class="x-text"
    :class="[`x-text--${props.size}`, `x-text--${props.type}`, { 'is-truncated': props.truncated }]"
    :style="textStyle"
  >
    <slot />
  </component>
</template>
