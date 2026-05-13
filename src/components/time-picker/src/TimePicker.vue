<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { TimePickerProps } from './types'

defineOptions({
  name: 'XTimePicker'
})

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  placeholder: '请选择时间',
  disabled: false,
  showActiveBorder: true
})

const timePickerStyle = computed(() => createElementStyleVars(props))

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
}>()

const commit = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <label class="x-time-picker" :class="{ 'is-disabled': props.disabled, 'is-active-border-hidden': !props.showActiveBorder }" :style="timePickerStyle">
    <input
      :value="props.modelValue"
      type="time"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      @focus="emit('focus', $event)"
      @input="commit(($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
