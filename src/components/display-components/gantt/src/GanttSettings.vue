<script setup lang="ts">import { translate as t } from '../../../../locale'

import { computed, nextTick, ref, watch } from 'vue'
import { XDialog } from '../../../feedback-components/dialog'
import { XButton } from '../../../basic-components/button'
import { copySettings } from './useSettings'
import { holidayDates, holidayPresets } from './holidayPresets'
import type { GanttSettings, GanttScheduleReason } from './types'

const props = defineProps<{ modelValue: boolean; settings: GanttSettings; pending: boolean; error: string; disabled: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; apply: [settings: GanttSettings, reason: GanttScheduleReason] }>()
const draft = ref(copySettings(props.settings))
const weekdays = computed(() => [t('common.sunday'), t('common.monday'), t('common.tuesday'), t('common.wednesday'), t('common.thursday'), t('common.friday'), t('common.saturday')])
const newHoliday = ref(''), newWorkingDate = ref('')
const calendarKeys = ['holidays', 'workingDates'] as const
const calendarTitles = { get holidays() { return t("extension.7470711099df") }, get workingDates() { return t("extension.0806c9683f75") } }
const displayFields = ['showToday', 'showWeekends', 'showProgress', 'showDependencies'] as const
const displayTitles = { get showToday() { return t("extension.e693835f2157") }, get showWeekends() { return t("extension.9892849da95c") }, get showProgress() { return t("extension.83dba218eb39") }, get showDependencies() { return t("extension.05227b5cebfc") } }
const restMode = ref('double')
const holidayYear = ref(2026), selectedHoliday = ref(''), holidayFeedback = ref('')
const holidayYears = Object.keys(holidayPresets).map(Number)
const annualHolidays = computed(() => holidayPresets[holidayYear.value])
watch(() => props.modelValue, open => {
  if (!open) return
  draft.value = copySettings(props.settings)
  const days = draft.value.calendar.weekendDays!
  restMode.value = days.length === 0 ? 'none' : days.length === 1 ? 'single' : days.length === 2 && days.includes(0) && days.includes(6) ? 'double' : 'custom'
  newHoliday.value = ''; newWorkingDate.value = ''
  const year = Number(draft.value.scheduleStartDate.slice(0, 4))
  holidayYear.value = holidayPresets[year] ? year : 2026
  selectedHoliday.value = ''; holidayFeedback.value = ''
}, { immediate: true })
const calendarLocked = computed(() => props.pending || draft.value.readonly || props.disabled)
function setRestMode(mode: string) {
  restMode.value = mode
  draft.value.calendar.weekendDays = mode === 'none' ? [] : mode === 'single' ? [0] : mode === 'double' ? [0, 6] : [...(draft.value.calendar.weekendDays ?? [])]
}
function toggleDay(day: number, checked: boolean) {
  const days = new Set(draft.value.calendar.weekendDays)
  if (checked) days.add(day); else days.delete(day)
  draft.value.calendar.weekendDays = [...days].sort()
}
function addDate(key: 'holidays' | 'workingDates') {
  const value = key === 'holidays' ? newHoliday.value : newWorkingDate.value
  if (!value) return
  draft.value.calendar[key] = [...new Set([...(draft.value.calendar[key] ?? []), value])].sort()
  if (key === 'holidays') newHoliday.value = ''; else newWorkingDate.value = ''
}
function addLegalHoliday(name: string) {
  if (!name || calendarLocked.value) return
  const presets = name === 'all' ? annualHolidays.value.holidays : annualHolidays.value.holidays.filter(preset => preset.name === name)
  draft.value.calendar.holidays = [...new Set([...(draft.value.calendar.holidays ?? []), ...presets.flatMap(holidayDates)])].sort()
  draft.value.calendar.workingDates = [...new Set([...(draft.value.calendar.workingDates ?? []), ...presets.flatMap(preset => preset.workingDates)])].sort()
  holidayFeedback.value = t("extension.1d7d0ab8345e", { p0: holidayYear.value, p1: name === 'all' ? t("extension.8624f58c155e") : name })
  void nextTick(() => { selectedHoliday.value = '' })
}
function close(value: boolean) { if (!props.pending) emit('update:modelValue', value) }
</script>

<template>
  <XDialog :model-value="modelValue" :title="t('extension.cbe9aafdbc7d')" :width="600" :height="650" :max-width="600" :min-width="300" :close-on-mask-click="!pending" :close-on-esc="!pending" @update:model-value="close">
    <div class="x-gantt-settings" :aria-busy="pending">
      <fieldset :disabled="calendarLocked">
        <legend>{{ t("extension.76d6bcb018f4") }}</legend>
        <label><input v-model="draft.enableAutoSchedule" type="checkbox">{{ t("extension.c5f882c1ee11") }}</label>
        <label>{{ t("extension.1665f7839abd") }}<input v-model="draft.scheduleStartDate" :aria-label="t('extension.1665f7839abd')" type="date" min="0001-01-01" max="9999-12-31"></label>
        <p>{{ t("extension.742871e5afc4") }}</p>
        <XButton width="110px" :disabled="calendarLocked || !draft.enableAutoSchedule" @click="emit('apply', copySettings(draft), 'reschedule')">{{ t("extension.46ae19d7c441") }}</XButton>
      </fieldset>
      <fieldset :disabled="calendarLocked">
        <legend>{{ t("extension.db825c350825") }}</legend>
        <label>{{ t("extension.b0c548f091b6") }}<select :aria-label="t('extension.b0c548f091b6')" :value="restMode" @change="setRestMode(($event.target as HTMLSelectElement).value)"><option value="none">{{ t("extension.87359b0d8666") }}</option><option value="single">{{ t("extension.15b9d803b8cb") }}</option><option value="double">{{ t("extension.232746dfd528") }}</option><option value="custom">{{ t("extension.c493338e8c33") }}</option></select></label>
        <label v-if="restMode === 'single'">{{ t("extension.743a4ad0dd4c") }}<select :aria-label="t('extension.b68ed1b4f0b4')" :value="draft.calendar.weekendDays?.[0] ?? 0" @change="draft.calendar.weekendDays = [Number(($event.target as HTMLSelectElement).value)]"><option v-for="(day, index) in weekdays" :key="index" :value="index">{{ day }}</option></select></label>
        <div v-if="restMode === 'custom'" class="x-gantt-settings__days"><label v-for="(day, index) in weekdays" :key="index"><input type="checkbox" :checked="draft.calendar.weekendDays?.includes(index)" @change="toggleDay(index, ($event.target as HTMLInputElement).checked)">{{ day }}</label></div>
        <div class="x-gantt-settings__legal-holidays">
          <h4>{{ t("extension.b2625d43a187") }}</h4>
          <div class="x-gantt-settings__date-add">
            <label>{{ t("extension.c668c7a28f7c") }}<select v-model.number="holidayYear" :aria-label="t('extension.6f18730e6ba3')" @change="holidayFeedback = ''"><option v-for="year in holidayYears" :key="year" :value="year">{{ year }}{{ t("extension.6f14c2641c25") }}</option></select></label>
            <select v-model="selectedHoliday" :aria-label="t('extension.d09465eaec02')" @change="addLegalHoliday(selectedHoliday)">
              <option value="">{{ t("extension.ea34e0590493") }}</option>
              <option value="all">{{ t("extension.8624f58c155e") }}</option>
              <option v-for="preset in annualHolidays.holidays" :key="preset.name" :value="preset.name">{{ preset.name }}（{{ preset.start.slice(5) }}{{ t("extension.43401e739ef4") }}{{ preset.end.slice(5) }}）</option>
            </select>
          </div>
          <p>{{ t("extension.9b6b04bb62f8") }}<a :href="annualHolidays.source" target="_blank" rel="noopener noreferrer">{{ t("extension.53f5d3b15f5f") }}</a></p>
          <p v-if="holidayFeedback" role="status">{{ holidayFeedback }}</p>
        </div>
        <div v-for="key in calendarKeys" :key="key" class="x-gantt-settings__dates">
          <h4>{{ calendarTitles[key] }}</h4>
          <div class="x-gantt-settings__date-add">
            <input v-if="key === 'holidays'" v-model="newHoliday" type="date" min="0001-01-01" max="9999-12-31" :aria-label="t('extension.42f3dc56864d')">
            <input v-else v-model="newWorkingDate" type="date" min="0001-01-01" max="9999-12-31" :aria-label="t('extension.73dce7fd2db8')">
            <button type="button" @click="addDate(key)">{{ t("extension.94191ce210d3") }}</button>
          </div>
          <ul><li v-for="date in draft.calendar[key]" :key="date"><span>{{ date }}</span><button type="button" :aria-label="t('extension.14b9dc8d1aa8', { p0: calendarTitles[key], p1: date })" @click="draft.calendar[key] = draft.calendar[key]?.filter(value => value !== date)">{{ t("extension.3755f56f2f83") }}</button></li></ul>
          <p v-if="!draft.calendar[key]?.length">{{ t("extension.5838d0141870") }}{{ calendarTitles[key] }}</p>
        </div>
        <p>{{ t("extension.443d23f4dba0") }}</p>
      </fieldset>
      <fieldset :disabled="pending || disabled">
        <legend>{{ t("extension.c934080bbc1f") }}</legend>
        <label><input v-model="draft.readonly" type="checkbox">{{ t("extension.ffc1d065fb53") }}</label>
        <label v-for="key in displayFields" :key="key"><input v-model="draft[key]" type="checkbox">{{ displayTitles[key] }}</label>
        <p v-if="draft.readonly">{{ t("extension.869a51058147") }}</p>
      </fieldset>
      <p v-if="error" class="x-gantt-settings__error" role="alert">{{ error }}</p>
    </div>
    <template #footer>
      <span v-if="pending" role="status">{{ t("extension.5bfd1c9bc456") }}</span>
      <XButton width="72px" :disabled="pending" @click="close(false)">{{ t("extension.4d0b4688c787") }}</XButton>
      <XButton width="72px" :disabled="pending || disabled" @click="emit('apply', copySettings(draft), 'settings')">{{ t("extension.4562024ddec7") }}</XButton>
    </template>
  </XDialog>
</template>

<style scoped>
.x-gantt-settings { font-size: 14px; color: var(--x-color-text); }
.x-gantt-settings fieldset { display: flex; flex-direction: column; gap: 10px; border: 1px solid var(--x-color-border); border-radius: 6px; margin: 0 0 16px; padding: 12px; min-width: 0; }
.x-gantt-settings legend { padding: 0 6px; font-weight: var(--x-font-weight-semibold, 600); }
.x-gantt-settings label { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.x-gantt-settings input:not([type="checkbox"]), .x-gantt-settings select, .x-gantt-settings button { max-width: 100%; height: 32px; border: 1px solid var(--x-color-border); border-radius: 4px; padding: 0 8px; font: inherit; color: inherit; background: var(--x-color-surface); }
.x-gantt-settings input[type="checkbox"] { accent-color: var(--x-color-primary); }
.x-gantt-settings p { margin: 0; font-size: 12px; color: var(--x-color-text-muted); }
.x-gantt-settings__days, .x-gantt-settings__date-add { display: flex; flex-wrap: wrap; gap: 8px; }
.x-gantt-settings h4 { margin: 4px 0 8px; font-size: 14px; }
.x-gantt-settings ul { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; margin: 8px 0 0; }
.x-gantt-settings__dates ul { max-height: 112px; overflow-y: auto; }
.x-gantt-settings__legal-holidays p { margin-top: 8px; }
.x-gantt-settings__legal-holidays a { color: var(--x-color-primary); }
.x-gantt-settings li { display: flex; align-items: center; gap: 6px; }
.x-gantt-settings .x-gantt-settings__error { color: var(--x-color-danger); white-space: pre-line; }
</style>
