<script setup lang="ts">
import { computed, inject } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { createFontStyle, getComponentMetrics } from '../../../_utils/size'
import { formContextKey } from '../../form/src/context'
import type { SwitchEmits, SwitchProps } from './types'

defineOptions({
  name: 'XSwitch'
})

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  fontSize: undefined,
  activeText: '开',
  inactiveText: '关',
  labelPosition: 'outside',
  activeValue: true,
  inactiveValue: false
})

const emit = defineEmits<SwitchEmits>()

const form = inject(formContextKey, null)
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.fontSize ?? form?.fontSize.value ?? 14)
const hasSizeOverride = computed(() => props.fontSize != null || form?.fontSize.value != null)
const sizePreset = computed(() => getComponentMetrics(mergedSize.value))
const checked = computed(() => props.modelValue === props.activeValue)
const switchStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-switch-color': props.checkedColor,
  '--x-switch-inactive-color': props.inactiveColor,
  '--x-switch-thumb-color': props.thumbColor,
  '--x-switch-size': toCssSize(props.height ?? props.buttonSize ?? 24),
  '--x-switch-button-size': toCssSize(props.height ?? props.buttonSize ?? 24),
  '--x-switch-font-size': hasSizeOverride.value ? toCssSize(sizePreset.value.fontSize) : toCssSize(props.fontSize),
  '--x-switch-font-family': props.fontFamily,
  '--x-switch-border-color': props.borderColor,
  '--x-switch-border-width': toCssSize(props.borderWidth),
  '--x-switch-bg': props.backgroundColor,
  '--x-switch-text-color': props.textColor,
  '--x-switch-radius': toCssSize(props.radius) ?? '999px'
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
    :class="['x-switch', `x-switch--label-${props.labelPosition}`, { 'is-checked': checked, 'is-disabled': mergedDisabled }]"
    :style="[switchStyle, createFontStyle(mergedSize)]"
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
