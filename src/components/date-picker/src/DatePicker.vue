<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { DatePickerProps } from './types'

defineOptions({
  name: 'XDatePicker'
})

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  placeholder: '请选择日期',
  disabled: false,
  showActiveBorder: true
})

const datePickerStyle = computed(() => createElementStyleVars(props))

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
  <label class="x-date-picker" :class="{ 'is-disabled': props.disabled, 'is-active-border-hidden': !props.showActiveBorder }" :style="datePickerStyle">
    <input
      :value="props.modelValue"
      type="date"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      @focus="emit('focus', $event)"
      @input="commit(($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
