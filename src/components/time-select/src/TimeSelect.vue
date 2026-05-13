<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { TimeSelectProps } from './types'

defineOptions({
  name: 'XTimeSelect'
})

const props = withDefaults(defineProps<TimeSelectProps>(), {
  modelValue: '',
  start: '09:00',
  end: '18:00',
  stepMinutes: 30,
  placeholder: '请选择时间',
  disabled: false,
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
}>()

const timeSelectStyle = computed(() => createElementStyleVars(props))

const toMinutes = (value: string) => {
  const [hour, minute] = value.split(':').map(Number)
  return hour * 60 + minute
}

const options = computed(() => {
  const result: string[] = []
  for (let current = toMinutes(props.start); current <= toMinutes(props.end); current += props.stepMinutes) {
    result.push(`${String(Math.floor(current / 60)).padStart(2, '0')}:${String(current % 60).padStart(2, '0')}`)
  }
  return result
})

const commit = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <select
    class="x-time-select"
    :class="{ 'is-active-border-hidden': !props.showActiveBorder }"
    :value="props.modelValue"
    :disabled="props.disabled"
    :style="timeSelectStyle"
    @focus="emit('focus', $event)"
    @change="commit(($event.target as HTMLSelectElement).value)"
  >
    <option value="" disabled>{{ props.placeholder }}</option>
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
  </select>
</template>
