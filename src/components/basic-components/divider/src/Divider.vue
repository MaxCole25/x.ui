<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import type { DividerProps } from './types'

defineOptions({
  name: 'XDivider'
})

const props = withDefaults(defineProps<DividerProps>(), {
  direction: 'horizontal',
  contentPosition: 'center',
  borderStyle: 'solid'
})

const dividerStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-divider-spacing': toCssSize(props.spacing),
  '--x-divider-border-style': props.borderStyle
}))
</script>

<template>
  <div
    class="x-divider"
    :class="[`x-divider--${props.direction}`, `x-divider--${props.contentPosition}`]"
    :style="dividerStyle"
    role="separator"
  >
    <span v-if="$slots.default && props.direction === 'horizontal'" class="x-divider__text">
      <slot />
    </span>
  </div>
</template>
