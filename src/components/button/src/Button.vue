<script setup lang="ts">
import type { ButtonProps } from './types'

defineOptions({
  name: 'XButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: 'md',
  disabled: false,
  loading: false
})
</script>

<template>
  <button
    class="x-button"
    :class="[`x-button--${props.variant}`, `x-button--${props.size}`, { 'is-loading': props.loading }]"
    :disabled="props.disabled || props.loading"
    type="button"
  >
    <span v-if="props.loading" class="x-button__spinner" aria-hidden="true" />
    <span class="x-button__content">
      <slot />
    </span>
  </button>
</template>
