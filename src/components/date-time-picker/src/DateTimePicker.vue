<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { DateTimePickerProps } from './types'

defineOptions({
  name: 'XDateTimePicker'
})

const props = withDefaults(defineProps<DateTimePickerProps>(), {
  modelValue: '',
  placeholder: '请选择日期时间',
  disabled: false,
  showActiveBorder: true
})

const dateTimePickerStyle = computed(() => createElementStyleVars(props))

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
  <label class="x-date-picker x-date-time-picker" :class="{ 'is-disabled': props.disabled, 'is-active-border-hidden': !props.showActiveBorder }" :style="dateTimePickerStyle">
    <input
      :value="props.modelValue"
      type="datetime-local"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      @focus="emit('focus', $event)"
      @input="commit(($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
