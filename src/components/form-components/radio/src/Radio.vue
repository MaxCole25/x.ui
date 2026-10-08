<script setup lang="ts">
import { createFontStyle } from '../../../_utils/size'
import { computed, inject } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { formContextKey } from '../../form/src/context'
import type { RadioProps } from './types'

defineOptions({
  name: 'XRadio'
})

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  fontSize: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

const form = inject(formContextKey, null)
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.fontSize ?? form?.fontSize.value ?? 14)
const checked = computed(() => props.modelValue === props.value)
const buttonColor = computed(() => props.buttonColor)
const labelColor = computed(() => props.labelColor)
const radioStyle = computed(() => ({
  ...createElementStyleVars(props),
  height: toCssSize(props.height ?? 32),
  '--x-radio-color': buttonColor.value,
  '--x-radio-text-color': labelColor.value,
  '--x-radio-font-family': props.fontFamily,
  '--x-radio-font-size': toCssSize(mergedSize.value)
}))
const nativeStyle = computed(() => ({
  accentColor: buttonColor.value,
  height: toCssSize(props.buttonSize),
  width: toCssSize(props.buttonSize)
}))
const labelStyle = computed(() => ({
  color: labelColor.value,
  fontSize: toCssSize(mergedSize.value),
  fontFamily: props.fontFamily
}))

const select = () => {
  if (mergedDisabled.value || checked.value) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<template>
  <label class="x-radio" :class="['x-radio', { 'is-checked': checked, 'is-disabled': mergedDisabled }]" :style="[radioStyle, createFontStyle(mergedSize)]">
    <input
      class="x-radio__native"
      type="radio"
      :name="props.name"
      :value="String(props.value)"
      :checked="checked"
      :disabled="mergedDisabled"
      :style="nativeStyle"
      @change="select"
    />
    <span class="x-radio__label" :style="labelStyle">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>
