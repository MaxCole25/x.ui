<script setup lang="ts">
import { computed, inject } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { formContextKey } from '../../form/src/context'
import type { CheckboxProps } from './types'

defineOptions({
  name: 'XCheckbox'
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  indeterminate: false,
  size: undefined,
  value: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | Array<string | number | boolean>]
  change: [value: boolean | Array<string | number | boolean>]
}>()

const form = inject(formContextKey, null)
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')
const checked = computed(() => (Array.isArray(props.modelValue) ? props.modelValue.includes(props.value) : Boolean(props.modelValue)))
const checkboxStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-checkbox-color': props.color,
  '--x-checkbox-border-color': props.borderColor,
  '--x-checkbox-border-width': toCssSize(props.borderWidth),
  '--x-checkbox-bg': props.backgroundColor,
  '--x-checkbox-text-color': props.textColor,
  '--x-checkbox-radius': props.radius
}))

const toggle = () => {
  if (mergedDisabled.value) return

  const next = Array.isArray(props.modelValue)
    ? checked.value
      ? props.modelValue.filter((item) => item !== props.value)
      : [...props.modelValue, props.value]
    : !checked.value

  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <label
    class="x-checkbox"
    :class="[`x-checkbox--${mergedSize}`, { 'is-checked': checked, 'is-disabled': mergedDisabled, 'is-indeterminate': props.indeterminate }]"
    :style="checkboxStyle"
  >
    <input
      class="x-checkbox__native"
      type="checkbox"
      :name="props.name"
      :value="String(props.value)"
      :checked="checked"
      :disabled="mergedDisabled"
      :indeterminate.prop="props.indeterminate"
      @change="toggle"
    />
    <span class="x-checkbox__box" aria-hidden="true" />
    <span class="x-checkbox__label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>
