<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import XColorPickerPanel from '../../color-picker-panel'
import type { ColorPickerProps } from './types'

defineOptions({
  name: 'XColorPicker'
})

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: '#1264f4',
  disabled: false,
  showActiveBorder: true
})

const colorPickerStyle = computed(() => createElementStyleVars(props))

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
}>()

const commit = (value: string) => {
  if (props.disabled) return
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="x-color-picker" :class="{ 'is-disabled': props.disabled, 'is-active-border-hidden': !props.showActiveBorder }" :style="colorPickerStyle">
    <label class="x-color-picker__trigger">
      <span class="x-color-picker__chip" :style="{ backgroundColor: props.modelValue }" />
      <span class="x-color-picker__value">{{ props.modelValue }}</span>
      <input :value="props.modelValue" type="color" :disabled="props.disabled" @focus="emit('focus', $event)" @input="commit(($event.target as HTMLInputElement).value)" />
    </label>
    <slot name="panel">
      <XColorPickerPanel
        :model-value="props.modelValue"
        :border-width="props.borderWidth"
        :border-color="props.borderColor"
        :background-color="props.backgroundColor"
        :text-color="props.textColor"
        @update:model-value="commit"
      />
    </slot>
  </div>
</template>
