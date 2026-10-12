<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { XDialog } from '../../../feedback-components/dialog'
import { XButton } from '../../../basic-components/button'
import { copySettings } from './useSettings'
import { holidayDates, holidayPresets } from './holidayPresets'
import type { GanttSettings, GanttScheduleReason } from './types'

const props = defineProps<{ modelValue: boolean; settings: GanttSettings; pending: boolean; error: string; disabled: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; apply: [settings: GanttSettings, reason: GanttScheduleReason] }>()
const draft = ref(copySettings(props.settings))
const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const newHoliday = ref(''), newWorkingDate = ref('')
const calendarKeys = ['holidays', 'workingDates'] as const
const calendarTitles = { holidays: '节假日', workingDates: '调休补班日期' }
const displayFields = ['showToday', 'showWeekends', 'showProgress', 'showDependencies'] as const
const displayTitles = { showToday: '显示今天线', showWeekends: '显示休息日背景', showProgress: '显示进度', showDependencies: '显示依赖线' }
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
  holidayFeedback.value = `已加入 ${holidayYear.value} 年${name === 'all' ? '全年法定节假日' : name}及对应补班日期，请点击应用。`
  void nextTick(() => { selectedHoliday.value = '' })
}
function close(value: boolean) { if (!props.pending) emit('update:modelValue', value) }
</script>

<template>
  <XDialog :model-value="modelValue" title="甘特图设置" :width="600" :height="650" :max-width="600" :min-width="300" :close-on-mask-click="!pending" :close-on-esc="!pending" @update:model-value="close">
    <div class="x-gantt-settings" :aria-busy="pending">
      <fieldset :disabled="calendarLocked">
        <legend>排程</legend>
        <label><input v-model="draft.enableAutoSchedule" type="checkbox">开启自动排程</label>
        <label>项目起始日期<input v-model="draft.scheduleStartDate" aria-label="项目起始日期" type="date" min="0001-01-01" max="9999-12-31"></label>
        <p>按工作日保留工期，并联动依赖任务和父任务日期。</p>
        <XButton width="110px" :disabled="calendarLocked || !draft.enableAutoSchedule" @click="emit('apply', copySettings(draft), 'reschedule')">重新排程</XButton>
      </fieldset>
      <fieldset :disabled="calendarLocked">
        <legend>工作日历</legend>
        <label>每周休息<select aria-label="每周休息" :value="restMode" @change="setRestMode(($event.target as HTMLSelectElement).value)"><option value="none">无固定休息日</option><option value="single">单休</option><option value="double">双休</option><option value="custom">自定义</option></select></label>
        <label v-if="restMode === 'single'">休息日<select aria-label="单休休息日" :value="draft.calendar.weekendDays?.[0] ?? 0" @change="draft.calendar.weekendDays = [Number(($event.target as HTMLSelectElement).value)]"><option v-for="(day, index) in weekdays" :key="index" :value="index">{{ day }}</option></select></label>
        <div v-if="restMode === 'custom'" class="x-gantt-settings__days"><label v-for="(day, index) in weekdays" :key="index"><input type="checkbox" :checked="draft.calendar.weekendDays?.includes(index)" @change="toggleDay(index, ($event.target as HTMLInputElement).checked)">{{ day }}</label></div>
        <div class="x-gantt-settings__legal-holidays">
          <h4>法定节假日</h4>
          <div class="x-gantt-settings__date-add">
            <label>年份<select v-model.number="holidayYear" aria-label="法定节假日年份" @change="holidayFeedback = ''"><option v-for="year in holidayYears" :key="year" :value="year">{{ year }} 年</option></select></label>
            <select v-model="selectedHoliday" aria-label="选择法定节假日" @change="addLegalHoliday(selectedHoliday)">
              <option value="">选择假期加入日历</option>
              <option value="all">全年法定节假日</option>
              <option v-for="preset in annualHolidays.holidays" :key="preset.name" :value="preset.name">{{ preset.name }}（{{ preset.start.slice(5) }} 至 {{ preset.end.slice(5) }}）</option>
            </select>
          </div>
          <p>含公布的放假调休区间及补班日期，可继续手动增删。<a :href="annualHolidays.source" target="_blank" rel="noopener noreferrer">查看官方安排</a></p>
          <p v-if="holidayFeedback" role="status">{{ holidayFeedback }}</p>
        </div>
        <div v-for="key in calendarKeys" :key="key" class="x-gantt-settings__dates">
          <h4>{{ calendarTitles[key] }}</h4>
          <div class="x-gantt-settings__date-add">
            <input v-if="key === 'holidays'" v-model="newHoliday" type="date" min="0001-01-01" max="9999-12-31" aria-label="新增节假日">
            <input v-else v-model="newWorkingDate" type="date" min="0001-01-01" max="9999-12-31" aria-label="新增调休补班日期">
            <button type="button" @click="addDate(key)">添加</button>
          </div>
          <ul><li v-for="date in draft.calendar[key]" :key="date"><span>{{ date }}</span><button type="button" :aria-label="`删除${calendarTitles[key]}${date}`" @click="draft.calendar[key] = draft.calendar[key]?.filter(value => value !== date)">删除</button></li></ul>
          <p v-if="!draft.calendar[key]?.length">尚未配置{{ calendarTitles[key] }}</p>
        </div>
        <p>补班日期优先于节假日和每周休息日；已有自定义日期会保留。</p>
      </fieldset>
      <fieldset :disabled="pending || disabled">
        <legend>编辑与显示</legend>
        <label><input v-model="draft.readonly" type="checkbox">只读</label>
        <label v-for="key in displayFields" :key="key"><input v-model="draft[key]" type="checkbox">{{ displayTitles[key] }}</label>
        <p v-if="draft.readonly">只读时可以查看和定位，不能编辑任务或执行排程。</p>
      </fieldset>
      <p v-if="error" class="x-gantt-settings__error" role="alert">{{ error }}</p>
    </div>
    <template #footer>
      <span v-if="pending" role="status">正在保存排程…</span>
      <XButton width="72px" :disabled="pending" @click="close(false)">取消</XButton>
      <XButton width="72px" :disabled="pending || disabled" @click="emit('apply', copySettings(draft), 'settings')">应用</XButton>
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
