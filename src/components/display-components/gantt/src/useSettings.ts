import { computed, ref } from 'vue'
import { formatDay, parseDay, todayDay } from './core'
import type { GanttEmits, GanttProps, GanttSettings } from './types'

export function copySettings(settings: GanttSettings): GanttSettings {
  return { ...settings, calendar: { weekendDays: [...(settings.calendar.weekendDays ?? [0, 6])], holidays: [...(settings.calendar.holidays ?? [])], workingDates: [...(settings.calendar.workingDates ?? [])] } }
}

/** 传入的属性为受控值；未传入的属性由设置面板内部管理。 */
export function useSettings(props: GanttProps, emit: GanttEmits) {
  const dates = (props.tasks ?? []).map(task => parseDay(task.start)).filter(Number.isFinite)
  const local = ref<GanttSettings>({
    enableAutoSchedule: false,
    scheduleStartDate: formatDay(dates.length ? Math.min(...dates) : todayDay()),
    calendar: { weekendDays: [0, 6], holidays: [], workingDates: [] },
    readonly: false, showToday: true, showWeekends: true, showProgress: true, showDependencies: true
  })
  const settings = computed<GanttSettings>(() => ({
    enableAutoSchedule: props.enableAutoSchedule ?? local.value.enableAutoSchedule,
    scheduleStartDate: props.scheduleStartDate ?? local.value.scheduleStartDate,
    calendar: props.calendar ?? local.value.calendar,
    readonly: props.readonly ?? local.value.readonly,
    showToday: props.showToday ?? local.value.showToday,
    showWeekends: props.showWeekends ?? local.value.showWeekends,
    showProgress: props.showProgress ?? local.value.showProgress,
    showDependencies: props.showDependencies ?? local.value.showDependencies
  }))
  function applySettings(next: GanttSettings) {
    const previous = settings.value
    local.value = copySettings(next)
    if (JSON.stringify(previous.calendar) !== JSON.stringify(next.calendar)) emit('update:calendar', copySettings(next).calendar)
    if (previous.readonly !== next.readonly) emit('update:readonly', next.readonly)
    if (previous.enableAutoSchedule !== next.enableAutoSchedule) emit('update:enableAutoSchedule', next.enableAutoSchedule)
    if (previous.scheduleStartDate !== next.scheduleStartDate) emit('update:scheduleStartDate', next.scheduleStartDate)
    if (previous.showToday !== next.showToday) emit('update:showToday', next.showToday)
    if (previous.showWeekends !== next.showWeekends) emit('update:showWeekends', next.showWeekends)
    if (previous.showProgress !== next.showProgress) emit('update:showProgress', next.showProgress)
    if (previous.showDependencies !== next.showDependencies) emit('update:showDependencies', next.showDependencies)
  }
  return { settings, applySettings }
}
