<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { createPickerThemeVars } from '../../_utils/pickerTheme'
import { getChinaCalendarItems } from './chinaCalendar'
import type { DatePickerPanelProps } from './types'

defineOptions({
  name: 'XDatePickerPanel'
})

const props = withDefaults(defineProps<DatePickerPanelProps>(), {
  modelValue: '',
  showChinaFestivals: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const baseDate = computed(() => {
  const now = props.modelValue ? new Date(props.modelValue) : new Date()
  return Number.isNaN(now.getTime()) ? new Date() : now
})
const year = computed(() => props.year ?? baseDate.value.getFullYear())
const month = computed(() => props.month ?? baseDate.value.getMonth() + 1)
const days = computed(() => new Date(year.value, month.value, 0).getDate())
const cells = computed(() => Array.from({ length: days.value }, (_, index) => index + 1))
const datePanelStyle = computed(() => ({
  ...createElementStyleVars(props),
  ...createPickerThemeVars(props)
}))
const festivalMap = computed(() => ({
  ...(props.showChinaFestivals ? getChinaCalendarItems(year.value, month.value) : {}),
  ...(props.festivals ?? {})
}))

const toValue = (day: number) => `${year.value}-${String(month.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`
const getFestival = (day: number) => festivalMap.value[toValue(day)]
const select = (day: number) => {
  const value = toValue(day)
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="x-date-panel" :style="datePanelStyle">
    <div class="x-date-panel__header">{{ year }} 年 {{ month }} 月</div>
    <div class="x-date-panel__week">
      <span v-for="day in ['一', '二', '三', '四', '五', '六', '日']" :key="day">{{ day }}</span>
    </div>
    <div class="x-date-panel__grid">
      <button
        v-for="day in cells"
        :key="day"
        type="button"
        class="x-date-panel__day"
        :class="[
          { 'is-active': toValue(day) === props.modelValue },
          getFestival(day) ? `is-${getFestival(day).type}` : ''
        ]"
        @click="select(day)"
      >
        <span class="x-date-panel__day-number">{{ day }}</span>
        <span v-if="getFestival(day)" class="x-date-panel__festival-name">{{ getFestival(day).name }}</span>
        <span v-if="getFestival(day)" class="x-date-panel__festival-badge">
          {{ getFestival(day).type === 'solar-term' ? '气' : '节' }}
        </span>
      </button>
    </div>
  </div>
</template>
