<script setup lang="ts">
import { computed, useSlots } from 'vue'
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

const slots = useSlots()
const hasDividerText = computed(() => props.direction === 'horizontal' && Boolean(slots.default))

const dividerStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-divider-spacing': toCssSize(props.spacing),
  '--x-divider-thickness': toCssSize(props.thickness),
  '--x-divider-border-style': props.borderStyle
}))
</script>

<template>
  <div
    class="x-divider"
    :class="[`x-divider--${props.direction}`, hasDividerText ? `x-divider--${props.contentPosition}` : undefined]"
    :style="dividerStyle"
    role="separator"
  >
    <span v-if="hasDividerText" class="x-divider__text">
      <slot />
    </span>
  </div>
</template>
