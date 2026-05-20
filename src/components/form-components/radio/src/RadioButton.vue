<script setup lang="ts">
import { computed, inject } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import { formContextKey } from '../../form/src/context'
import type { RadioButtonProps } from './types'

defineOptions({
  name: 'XRadioButton'
})

const props = withDefaults(defineProps<RadioButtonProps>(), {
  disabled: false,
  direction: 'horizontal',
  size: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

const form = inject(formContextKey, null)
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const usesExplicitSize = computed(() => props.size != null || form?.size.value != null)
const checked = computed(() => props.modelValue === props.value)
const buttonColor = computed(() => props.buttonColor)
const textColor = computed(() => props.textColor ?? props.labelColor)
const activeBackgroundColor = computed(() => props.activeBackgroundColor ?? buttonColor.value)
const activeBorderColor = computed(() => props.activeBorderColor ?? activeBackgroundColor.value)
const radioButtonStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-radio-button-color': buttonColor.value,
  '--x-radio-button-text': textColor.value,
  '--x-radio-button-text-color': textColor.value,
  '--x-radio-button-bg': props.backgroundColor,
  '--x-radio-button-border': props.borderColor,
  '--x-radio-button-border-color': props.borderColor,
  '--x-radio-button-border-width': toCssSize(props.borderWidth),
  '--x-radio-button-font-family': props.fontFamily,
  '--x-radio-button-font-size': toCssSize(usesExplicitSize.value ? sizePreset.value.fontSize : props.fontSize),
  '--x-radio-button-width': toCssSize(props.width),
  '--x-radio-button-height': toCssSize(usesExplicitSize.value ? sizePreset.value.height : props.height ?? props.buttonSize),
  '--x-radio-button-padding': usesExplicitSize.value ? sizePreset.value.padding : undefined,
  '--x-radio-button-radius': usesExplicitSize.value ? sizePreset.value.radius : toCssSize(props.radius),
  '--x-radio-button-active-bg': activeBackgroundColor.value,
  '--x-radio-button-active-border-color': activeBorderColor.value,
  '--x-radio-button-active-text': props.activeTextColor
}))
const labelStyle = computed(() => ({
  fontSize: toCssSize(usesExplicitSize.value ? sizePreset.value.fontSize : props.fontSize),
  fontFamily: props.fontFamily
}))

const select = () => {
  if (mergedDisabled.value || checked.value) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<template>
  <div
    class="x-radio-button"
    role="radio"
    :tabindex="mergedDisabled ? -1 : 0"
    :aria-checked="checked"
    :aria-disabled="mergedDisabled"
    :data-name="props.name"
    :data-value="String(props.value)"
    :class="[
      `x-radio-button--${mergedSize}`,
      `x-radio-button--${props.variant ?? 'outline'}`,
      `x-radio-button--${props.direction}`,
      { 'is-checked': checked, 'is-disabled': mergedDisabled }
    ]"
    :style="radioButtonStyle"
    @click="select"
    @keydown.enter.prevent="select"
    @keydown.space.prevent="select"
  >
    <span class="x-radio-button__label" :style="labelStyle">
      <slot>{{ props.label }}</slot>
    </span>
  </div>
</template>
