<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import { createElementStyleVars, toCssSize } from '../../_utils/elementStyle'
import { formContextKey } from './context'
import type { FormProps } from './types'

defineOptions({
  name: 'XForm'
})

const props = withDefaults(defineProps<FormProps>(), {
  disabled: false,
  size: 'md',
  labelWidth: '96px',
  labelPosition: 'left'
})

provide(formContextKey, {
  disabled: toRef(props, 'disabled'),
  size: toRef(props, 'size'),
  labelWidth: toRef(props, 'labelWidth'),
  labelPosition: toRef(props, 'labelPosition')
})

const formStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-form-color': props.color,
  '--x-form-border-color': props.borderColor,
  '--x-form-border-width': toCssSize(props.borderWidth),
  '--x-form-bg': props.backgroundColor,
  '--x-form-text-color': props.textColor,
  '--x-form-radius': props.radius
}))
</script>

<template>
  <form
    class="x-form"
    :class="[`x-form--${props.size}`, `x-form--label-${props.labelPosition}`, { 'is-disabled': props.disabled }]"
    :style="formStyle"
  >
    <slot />
  </form>
</template>
