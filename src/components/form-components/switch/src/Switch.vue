<script setup lang="ts">
import { computed, inject } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import { formContextKey } from '../../form/src/context'
import type { SwitchEmits, SwitchProps } from './types'

defineOptions({
  name: 'XSwitch'
})

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: undefined,
  activeText: '开',
  inactiveText: '关',
  labelPosition: 'outside',
  activeValue: true,
  inactiveValue: false
})

const emit = defineEmits<SwitchEmits>()

const form = inject(formContextKey, null)
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')
const hasSizeOverride = computed(() => props.size != null || form?.size.value != null)
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const sizeVisualHeight = computed(() => `${Number((sizePreset.value.height * 0.8).toFixed(1))}px`)
const checked = computed(() => props.modelValue === props.activeValue)
const switchStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-switch-color': props.color,
  '--x-switch-inactive-color': props.inactiveColor,
  '--x-switch-thumb-color': props.thumbColor,
  '--x-switch-size': hasSizeOverride.value ? sizeVisualHeight.value : toCssSize(props.buttonSize),
  '--x-switch-button-size': hasSizeOverride.value ? undefined : toCssSize(props.buttonSize),
  '--x-switch-font-size': hasSizeOverride.value ? toCssSize(sizePreset.value.fontSize) : toCssSize(props.fontSize),
  '--x-switch-font-family': props.fontFamily,
  '--x-switch-border-color': props.borderColor,
  '--x-switch-border-width': toCssSize(props.borderWidth),
  '--x-switch-bg': props.backgroundColor,
  '--x-switch-text-color': props.textColor,
  '--x-switch-radius': hasSizeOverride.value ? '999px' : props.radius
}))

const toggle = () => {
  if (mergedDisabled.value) return
  const next = checked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <button
    class="x-switch"
    :class="[`x-switch--${mergedSize}`, `x-switch--label-${props.labelPosition}`, { 'is-checked': checked, 'is-disabled': mergedDisabled }]"
    :style="switchStyle"
    type="button"
    role="switch"
    :name="props.name"
    :aria-checked="checked"
    :disabled="mergedDisabled"
    @click="toggle"
  >
    <span v-if="props.labelPosition === 'outside' && props.inactiveText" class="x-switch__text x-switch__text--inactive">{{ props.inactiveText }}</span>
    <span class="x-switch__track" aria-hidden="true">
      <span v-if="props.labelPosition === 'inside'" class="x-switch__track-text">{{ checked ? props.activeText : props.inactiveText }}</span>
      <span class="x-switch__thumb">
      </span>
    </span>
    <span v-if="props.labelPosition === 'outside' && props.activeText" class="x-switch__text x-switch__text--active">{{ props.activeText }}</span>
  </button>
</template>
