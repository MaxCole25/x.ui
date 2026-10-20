<script setup lang="ts">import { translate as t } from '../../../../locale'

import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useLocale } from '../../../../locale'
import { XButton } from '../../../basic-components/button'
import { XIcon } from '../../../basic-components/icon'
import { XEmpty } from '../../empty'
import GanttSettingsPanel from './GanttSettings.vue'
import { copySettings, useSettings } from './useSettings'
import { calendarIssues, createWorkCalendar, scheduleTasks } from './schedule'
import type { GanttAction, GanttChangePayload, GanttColumn, GanttEmits, GanttExpose, GanttId, GanttIssue, GanttProps, GanttScheduleChangePayload, GanttScheduleReason, GanttSettings, GanttSlots, GanttTask, GanttView } from './types'
import { dateToPixel, flattenRows, formatDay, indexTasks, parseDay, pixelToDate, timeTicks, todayDay, validateDependencies } from './core'
defineOptions({ name: 'XGantt' })
const props = withDefaults(defineProps<GanttProps>(), {
  tasks: () => [], dependencies: () => [],
  columns: () => [{ key: 'title', get title() { return t("extension.2e3046989973") }, width: 230 }, { key: 'start', get title() { return t("extension.1f2919689118") }, width: 110 }, { key: 'end', get title() { return t("extension.f4b9b2b5de8a") }, width: 110 }],
  view: 'day', zoom: 1, height: 520, rowHeight: 40, tableWidth: 450, fontSize: 14, radius: 6,
  readonly: undefined, disabled: false, showToolbar: true, showToday: undefined, showWeekends: undefined,
  showProgress: undefined, showDependencies: undefined, enableAutoSchedule: undefined,
  showSettings: true, showFooter: true, weekStartsOn: 1
})
const { locale } = useLocale()
const emit = defineEmits<GanttEmits>()
defineSlots<GanttSlots>()
const { settings, applySettings } = useSettings(props, emit)
const settingsOpen = ref(false), scheduleError = ref('')
const viewport = ref<HTMLDivElement>()
const width = ref(1000), viewportHeight = ref(400), scrollLeft = ref(0), scrollTop = ref(0)
const localView = ref(props.view), localZoom = ref(props.zoom), localTableWidth = ref(props.tableWidth)
const selected = ref<GanttId | null>(props.selectedTaskId ?? null)
const expanded = ref<GanttId[]>([])
const rangeOverride = ref<{ start: number; end: number }>()
const columnWidths = ref<Record<string, number>>({})
const pending = ref(false)
const preview = shallowRef<GanttTask>()
const taskIndex = computed(() => indexTasks(props.tasks))
const dependencyIndex = computed(() => validateDependencies(props.dependencies, taskIndex.value.tasks))
watch(() => [...taskIndex.value.issues, ...dependencyIndex.value.issues], issues => { if (issues.length) emit('data-error', issues) }, { immediate: true })
watch(() => props.view, value => { localView.value = value })
watch(() => props.zoom, value => { localZoom.value = value })
watch(() => props.tableWidth, value => { localTableWidth.value = value })
watch(() => props.selectedTaskId, value => { selected.value = value ?? null })
watch(() => props.expandedTaskIds, value => { if (value) expanded.value = [...value] }, { immediate: true })
let initializedExpansion = false
watch(taskIndex, value => {
  if (props.expandedTaskIds === undefined) expanded.value = initializedExpansion ? expanded.value.filter(id => value.tasks.has(id)) : [...value.children.keys()].filter((id): id is GanttId => id !== null)
  initializedExpansion = true
}, { immediate: true })
const rowHeight = computed(() => Math.max(28, props.rowHeight))
const tableWidth = computed(() => Math.max(160, localTableWidth.value))
const dayWidth = computed(() => ({ day: 36, week: 14, month: 4 }[localView.value]) * Math.max(.25, Math.min(4, localZoom.value)))
const rows = computed(() => flattenRows(taskIndex.value, new Set(expanded.value)))
const rowIndex = computed(() => new Map(rows.value.map(row => [row.task.id, row])))
const range = computed(() => {
  if (rangeOverride.value) return rangeOverride.value
  let start = Infinity, end = -Infinity
  for (const task of taskIndex.value.tasks.values()) { start = Math.min(start, parseDay(task.start)); end = Math.max(end, parseDay(task.end)) }
  if (!Number.isFinite(start)) { start = todayDay(); end = start + 30 }
  const explicitStart = props.startDate ? parseDay(props.startDate) : NaN
  const explicitEnd = props.endDate ? parseDay(props.endDate) : NaN
  start = Number.isFinite(explicitStart) ? explicitStart : start - 3
  end = Number.isFinite(explicitEnd) ? explicitEnd + 1 : end + 8
  return { start, end: Math.max(start + 1, end) }
})
const timelineWidth = computed(() => Math.max(width.value - tableWidth.value - 2, (range.value.end - range.value.start) * dayWidth.value))
const canvasHeight = computed(() => Math.max(viewportHeight.value, 56 + rows.value.length * rowHeight.value))
const firstRow = computed(() => Math.max(0, Math.floor((scrollTop.value - 56) / rowHeight.value) - 4))
const visibleRows = computed(() => rows.value.slice(firstRow.value, firstRow.value + Math.ceil(viewportHeight.value / rowHeight.value) + 9))
const visibleDays = computed(() => ({ start: range.value.start + Math.max(0, scrollLeft.value - 100) / dayWidth.value, end: Math.min(range.value.end, range.value.start + (scrollLeft.value + width.value - tableWidth.value + 100) / dayWidth.value) }))
const ticks = computed(() => timeTicks(visibleDays.value.start, visibleDays.value.end, localView.value, props.weekStartsOn, props.locale ?? locale.value))
const groups = computed(() => {
  const result: { label: string; start: number; end: number }[] = []
  for (const tick of ticks.value) {
    const last = result[result.length - 1]
    if (last?.label === tick.group) last.end = tick.end
    else result.push({ label: tick.group, start: tick.start, end: tick.end })
  }
  return result
})
const nonWorkingDays = computed(() => {
  if (!settings.value.showWeekends) return []
  const days: number[] = [], calendar = createWorkCalendar(settings.value.calendar)
  for (let day = Math.max(range.value.start, Math.floor(visibleDays.value.start)); day < visibleDays.value.end; day++) {
    if (!calendar.isWorking(day)) days.push(day)
  }
  return days
})
const columns = computed(() => props.columns.filter(column => column.visible !== false))
function columnWidth(column: GanttColumn) { return Math.max(column.minWidth ?? 60, columnWidths.value[column.key] ?? column.width ?? 120) }
const totalColumnWidth = computed(() => columns.value.reduce((sum, column) => sum + columnWidth(column), 0))
const tableScroll = ref(0)
function cellValue(task: GanttTask, column: GanttColumn) {
  if (column.formatter) return column.formatter(task)
  if (column.key === 'duration') return t("extension.b430eaf6146e", { p0: task.taskType === 'milestone' ? 0 : parseDay(task.end) - parseDay(task.start) + 1 })
  if (column.key === 'progress') return `${task.progress ?? 0}%`
  const fields: Record<string, unknown> = { ...task.data, ...task }
  return String(fields[column.key] ?? '')
}
function currentTask(task: GanttTask) { return preview.value?.id === task.id ? preview.value : task }
function layout(task: GanttTask) {
  const value = currentTask(task), start = parseDay(value.start)
  return { left: dateToPixel(start, range.value.start, dayWidth.value), width: value.taskType === 'milestone' ? 0 : (parseDay(value.end) - start + 1) * dayWidth.value }
}
function barVisible(task: GanttTask) { const box = layout(task); return box.left + box.width >= scrollLeft.value - 30 && box.left <= scrollLeft.value + width.value - tableWidth.value + 30 }
const dependencyPaths = computed(() => {
  if (!settings.value.showDependencies) return []
  const paths: { id: GanttId; path: string }[] = []
  for (const dependency of dependencyIndex.value.valid) {
    const from = rowIndex.value.get(dependency.from), to = rowIndex.value.get(dependency.to)
    if (!from || !to) continue
    if (Math.max(from.index, to.index) < firstRow.value || Math.min(from.index, to.index) > firstRow.value + visibleRows.value.length) continue
    const a = layout(from.task), b = layout(to.task), type = dependency.dependencyType ?? 'FS'
    const x1 = a.left + (type[0] === 'F' ? a.width : 0), x2 = b.left + (type[1] === 'F' ? b.width : 0)
    const y1 = (from.index + .5) * rowHeight.value, y2 = (to.index + .5) * rowHeight.value
    const bend = Math.max(x1 + 12, x2 + 12)
    paths.push({ id: dependency.id, path: `M ${x1} ${y1} H ${bend} V ${y2} H ${x2} M ${x2 + 5} ${y2 - 3} L ${x2} ${y2} L ${x2 + 5} ${y2 + 3}` })
  }
  return paths
})
function syncScroll() { if (viewport.value) { scrollLeft.value = viewport.value.scrollLeft; scrollTop.value = viewport.value.scrollTop } }
function selectTask(id: GanttId | null) { if (props.disabled) return; selected.value = id; emit('update:selectedTaskId', id); emit('task-select', id) }
let suppressClick = false
function clickTask(task: GanttTask, source: 'table' | 'bar') { if (suppressClick || props.disabled) return; selectTask(task.id); emit('task-click', task, source) }
function doubleClick(task: GanttTask, source: 'table' | 'bar') { if (!props.disabled) emit('task-dblclick', task, source) }
function setExpanded(ids: GanttId[]) { expanded.value = ids; emit('update:expandedTaskIds', ids) }
function toggleTask(id: GanttId) { if (!props.disabled) setExpanded(expanded.value.includes(id) ? expanded.value.filter(key => key !== id) : [...expanded.value, id]) }
function expandAll() { setExpanded([...taskIndex.value.children.keys()].filter((id): id is GanttId => id !== null)) }
function collapseAll() { setExpanded([]) }
function scrollToDate(date: string) { const day = parseDay(date); if (Number.isFinite(day) && viewport.value) viewport.value.scrollLeft = Math.max(0, dateToPixel(day, range.value.start, dayWidth.value) - (width.value - tableWidth.value) / 2) }
async function scrollToTask(id: GanttId) {
  const task = taskIndex.value.tasks.get(id); if (!task) return
  const ids = new Set(expanded.value); let parent = taskIndex.value.parents.get(id)
  while (parent != null) { ids.add(parent); parent = taskIndex.value.parents.get(parent) }
  setExpanded([...ids]); await nextTick()
  const row = rowIndex.value.get(id)
  if (row && viewport.value) viewport.value.scrollTop = row.index * rowHeight.value
  scrollToDate(task.start); selectTask(id)
}
function getVisibleRange() { return { start: formatDay(Math.floor(range.value.start + scrollLeft.value / dayWidth.value)), end: formatDay(Math.ceil(Math.min(range.value.end, range.value.start + (scrollLeft.value + width.value - tableWidth.value) / dayWidth.value)) - 1) } }
function setRange(start: string, end: string) { const a = parseDay(start), b = parseDay(end); if (Number.isFinite(a) && b >= a) rangeOverride.value = { start: a, end: b + 1 } }
function fitToTasks() { rangeOverride.value = undefined; nextTick(() => { const available = Math.max(100, width.value - tableWidth.value); setZoom(Math.max(.25, Math.min(4, available / ((range.value.end - range.value.start) * ({ day: 36, week: 14, month: 4 }[localView.value]))))) }) }
async function changeScale(view: GanttView, zoom: number) {
  const center = pixelToDate(scrollLeft.value + (width.value - tableWidth.value) / 2, range.value.start, dayWidth.value)
  localView.value = view; localZoom.value = Math.max(.25, Math.min(4, zoom))
  emit('update:view', view); emit('update:zoom', localZoom.value); emit('zoom-change', localZoom.value)
  await nextTick(); if (viewport.value) viewport.value.scrollLeft = Math.max(0, dateToPixel(center, range.value.start, dayWidth.value) - (width.value - tableWidth.value) / 2)
}
function setZoom(zoom: number) { void changeScale(localView.value, zoom) }
function zoomIn() { setZoom(localZoom.value * 1.25) }
function zoomOut() { setZoom(localZoom.value / 1.25) }
function canEdit(task: GanttTask, action: GanttAction) { return !settings.value.readonly && !props.disabled && !task.readonly && task.taskType !== 'summary' && !pending.value && (props.canEditTask?.(task, action) ?? true) }
let drag: { task: GanttTask; action: GanttAction; x: number; scroll: number; moved: boolean } | undefined
let cleanupPointer: (() => void) | undefined
let editVersion = 0
function openSettings() {
  if (props.disabled || pending.value) return
  cancelEdit(); scheduleError.value = ''; settingsOpen.value = true
}
function inputSnapshot() {
  return JSON.stringify({ tasks: props.tasks, dependencies: props.dependencies, settings: settings.value, disabled: props.disabled,
    permissions: props.canEditTask ? props.tasks.map(task => props.canEditTask!(task, 'move')) : undefined })
}
function rejectSchedule(issues: GanttIssue[], change?: GanttScheduleChangePayload) {
  scheduleError.value = issues.map(issue => issue.message).join('\n')
  emit('schedule-reject', { issues, change })
}
async function runSchedule(next: GanttSettings, reason: GanttScheduleReason, edit?: GanttChangePayload): Promise<boolean> {
  if (pending.value || props.disabled) return false
  if (next.readonly) { rejectSchedule([{ message: '只读状态不能执行排程' }]); return false }
  const previousSettings = copySettings(settings.value)
  const snapshot = inputSnapshot(), permission = props.canEditTask
  const result = scheduleTasks({ tasks: props.tasks, dependencies: props.dependencies, calendar: next.calendar, previousCalendar: previousSettings.calendar, startDate: next.scheduleStartDate, edit, canEditTask: permission })
  if (result.issues.length) { preview.value = undefined; rejectSchedule(result.issues); return false }
  const previousTasks = props.tasks.map(task => ({ ...task }))
  const change: GanttScheduleChangePayload = {
    previousTasks, tasks: result.tasks,
    changes: result.tasks.flatMap((task, index) => task.start !== previousTasks[index].start || task.end !== previousTasks[index].end ? [{ previous: previousTasks[index], task }] : []),
    previousSettings, settings: copySettings(next), reason
  }
  const version = ++editVersion
  pending.value = true; scheduleError.value = ''
  try {
    const accepted = change.changes.length ? await props.beforeScheduleChange?.(change) : true
    if (version !== editVersion) return false
    if (accepted === false) { rejectSchedule([{ message: '排程保存被拒绝，已恢复原数据' }], change); return false }
    if (snapshot !== inputSnapshot() || permission !== props.canEditTask) { rejectSchedule([{ message: '保存期间任务或设置发生变化，请重新排程' }], change); return false }
    // 工期首次推导也通过 tasks 输出，日期未变时不调用保存回调。
    if (JSON.stringify(result.tasks) !== JSON.stringify(props.tasks)) emit('update:tasks', result.tasks)
    applySettings(next)
    emit('schedule-change', change)
    return true
  } catch (error) {
    if (version === editVersion) rejectSchedule([{ message: error instanceof Error ? t("extension.193946908dee", { p0: error.message }) : t("extension.84418def40d3") }], change)
    return false
  } finally {
    if (version === editVersion) { pending.value = false; preview.value = undefined }
  }
}
async function applyDraft(next: GanttSettings, reason: GanttScheduleReason) {
  if (pending.value || props.disabled) return
  const issues = calendarIssues(next.calendar)
  if (!Number.isFinite(parseDay(next.scheduleStartDate)) || next.scheduleStartDate < '0001-01-01') issues.push({ message: '项目起始日期无效' })
  if (issues.length) { rejectSchedule(issues); return }
  const previous = copySettings(settings.value)
  const needsSchedule = reason === 'reschedule' || (next.enableAutoSchedule && !next.readonly && (
    !previous.enableAutoSchedule || previous.scheduleStartDate !== next.scheduleStartDate || JSON.stringify(previous.calendar) !== JSON.stringify(next.calendar)
  ))
  if (needsSchedule && !await runSchedule(next, reason)) return
  if (!needsSchedule) { applySettings(next); scheduleError.value = '' }
  settingsOpen.value = false
}
function reschedule() { return runSchedule(copySettings(settings.value), 'reschedule') }
function cancelEdit() { editVersion++; drag = undefined; preview.value = undefined; pending.value = false; cleanupPointer?.(); cleanupPointer = undefined }
function startDrag(event: PointerEvent, task: GanttTask, action: GanttAction) {
  if (event.button !== 0 || !canEdit(task, action)) return
  event.preventDefault(); cleanupPointer?.()
  drag = { task, action, x: event.clientX, scroll: scrollLeft.value, moved: false }
  const move = (e: PointerEvent) => {
    if (!drag || !viewport.value) return
    const bounds = viewport.value.getBoundingClientRect()
    if (e.clientX > bounds.right - 30) viewport.value.scrollLeft += 18
    if (e.clientX < bounds.left + tableWidth.value + 30) viewport.value.scrollLeft -= 18
    const pixels = e.clientX - drag.x + viewport.value.scrollLeft - drag.scroll
    if (!drag.moved && Math.abs(pixels) < 4) return
    drag.moved = true
    const days = Math.round(pixels / dayWidth.value), start = parseDay(task.start), end = parseDay(task.end)
    let next: GanttTask = { ...task }
    if (action === 'move') next = { ...task, start: formatDay(start + days), end: formatDay(end + days) }
    if (action === 'resize-start') next.start = formatDay(Math.min(end, start + days))
    if (action === 'resize-end') next.end = formatDay(Math.max(start, end + days))
    if (action === 'progress') next.progress = Math.round(Math.max(0, Math.min(100, (task.progress ?? 0) + pixels / Math.max(1, layout(task).width) * 100)))
    preview.value = next
  }
  const stop = () => { const previous = drag; drag = undefined; cleanupPointer?.(); cleanupPointer = undefined; if (previous?.moved && preview.value) { suppressClick = true; setTimeout(() => { suppressClick = false }, 0); void commit({ previous: task, task: preview.value, action }) } else preview.value = undefined }
  const cancel = () => cancelEdit()
  window.addEventListener('pointermove', move); window.addEventListener('pointerup', stop); window.addEventListener('pointercancel', cancel)
  cleanupPointer = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', stop); window.removeEventListener('pointercancel', cancel) }
}
async function commit(change: GanttChangePayload) {
  if (change.task.start === change.previous.start && change.task.end === change.previous.end && change.task.progress === change.previous.progress) { preview.value = undefined; return }
  if (settings.value.enableAutoSchedule && change.action !== 'progress') { await runSchedule(copySettings(settings.value), 'edit', change); return }
  if (change.action.startsWith('resize') && change.previous.workdayDuration !== undefined) {
    change = { ...change, task: { ...change.task, workdayDuration: createWorkCalendar(settings.value.calendar).duration(change.task.start, change.task.end) } }
  }
  const version = ++editVersion; pending.value = true
  try {
    const accepted = await props.beforeTaskChange?.(change)
    if (version !== editVersion) return
    const current = taskIndex.value.tasks.get(change.previous.id)
    if (accepted === false || settings.value.readonly || props.disabled || !current || current.readonly || props.canEditTask?.(current, change.action) === false || current.start !== change.previous.start || current.end !== change.previous.end || current.progress !== change.previous.progress || current.workdayDuration !== change.previous.workdayDuration) { emit('task-reject', change); return }
    const duration = change.task.workdayDuration
    emit('update:tasks', props.tasks.map(task => task.id === change.task.id ? { ...task, start: change.task.start, end: change.task.end, progress: change.task.progress, ...(duration !== undefined ? { workdayDuration: duration } : {}) } : task))
    emit('task-change', change)
  } catch { if (version === editVersion) emit('task-reject', change) }
  finally { if (version === editVersion) { pending.value = false; preview.value = undefined } }
}
function resize(event: PointerEvent, column?: GanttColumn) {
  if (props.disabled || event.button !== 0) return
  event.preventDefault(); cleanupPointer?.()
  const origin = event.clientX, initial = column ? columnWidth(column) : tableWidth.value
  const move = (e: PointerEvent) => {
    const value = Math.max(column?.minWidth ?? (column ? 60 : 160), initial + e.clientX - origin)
    if (column) columnWidths.value = { ...columnWidths.value, [column.key]: value }
    else localTableWidth.value = Math.min(value, Math.max(160, width.value - 160))
  }
  const stop = () => { cleanupPointer?.(); cleanupPointer = undefined; if (column) emit('column-resize', column, columnWidth(column)); else emit('update:tableWidth', tableWidth.value) }
  window.addEventListener('pointermove', move); window.addEventListener('pointerup', stop)
  cleanupPointer = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', stop) }
}
let observer: ResizeObserver | undefined
function refresh() { if (viewport.value) { width.value = viewport.value.clientWidth; viewportHeight.value = viewport.value.clientHeight; syncScroll() } }
function onKey(event: KeyboardEvent) { if (event.key === 'Escape' && !settingsOpen.value) cancelEdit() }
watch([scrollLeft, dayWidth, range, width], () => emit('range-change', getVisibleRange()))
watch(() => [settings.value.readonly, props.disabled], () => { if (!pending.value) cancelEdit() })
onMounted(() => { refresh(); observer = new ResizeObserver(refresh); if (viewport.value) observer.observe(viewport.value); window.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { cancelEdit(); observer?.disconnect(); window.removeEventListener('keydown', onKey) })
defineExpose<GanttExpose>({ scrollToDate, scrollToTask: id => { void scrollToTask(id) }, selectTask, setRange, zoomIn, zoomOut, fitToTasks, expandAll, collapseAll, refresh, getVisibleRange, cancelEdit, openSettings, reschedule })
</script>

<template>
  <section class="x-gantt" :class="{ 'is-disabled': disabled, 'is-pending': pending }" :style="{ height: typeof height === 'number' ? `${height}px` : height, fontSize: `${fontSize}px`, borderRadius: `${radius}px`, '--x-gantt-accent': accentColor || 'var(--x-color-primary, #0b806a)' }" :aria-label="t('extension.85f232055403')" :aria-busy="pending">
    <div v-if="showToolbar" class="x-gantt__toolbar">
      <slot name="toolbar" :view="localView" :zoom="localZoom" :fit-to-tasks="fitToTasks" :open-settings="openSettings">
        <strong>{{ t("extension.cd633dc77a8b") }}</strong>
        <select :aria-label="t('extension.3a4cb5401893')" :value="localView" :disabled="disabled" @change="changeScale(($event.target as HTMLSelectElement).value as GanttView, localZoom)"><option value="day">{{ t("extension.2c352048777d") }}</option><option value="week">{{ t("extension.ba71392c6624") }}</option><option value="month">{{ t("extension.3b13451139dd") }}</option></select>
        <XButton width="32px" :disabled="disabled" :aria-label="t('extension.11f8516f82b1')" @click="zoomOut">−</XButton>
        <span>{{ Math.round(localZoom * 100) }}%</span>
        <XButton width="32px" :disabled="disabled" :aria-label="t('extension.d7f48a059cf3')" @click="zoomIn">+</XButton>
        <XButton width="56px" :disabled="disabled" @click="scrollToDate(formatDay(todayDay()))">{{ t("extension.17e83cc25e22") }}</XButton>
        <XButton width="32px" :padding="0" :disabled="disabled" :title="t('extension.59d0f243e3db')" :aria-label="t('extension.b72c8bf4285d')" @click="fitToTasks"><XIcon name="focus-3" :icon-size="18" decorative /></XButton>
        <XButton width="32px" :padding="0" :disabled="disabled" :title="t('extension.66c98ab6d82d')" :aria-label="t('extension.66c98ab6d82d')" @click="expandAll"><XIcon name="expand-up-down" :icon-size="18" decorative /></XButton>
        <XButton width="32px" :padding="0" :disabled="disabled" :title="t('extension.5f6a1bf1908d')" :aria-label="t('extension.5f6a1bf1908d')" @click="collapseAll"><XIcon name="contract-up-down" :icon-size="18" decorative /></XButton>
        <XButton v-if="showSettings" width="32px" :padding="0" :disabled="disabled || pending" :title="t('extension.cbe9aafdbc7d')" :aria-label="t('extension.7debf9cb0372')" @click="openSettings"><XIcon name="settings-3" :icon-size="18" decorative /></XButton>
        <span v-if="preview" class="x-gantt__feedback" role="status">{{ preview.start }} → {{ preview.end }} · {{ preview.progress }}% {{ pending ? t('extension.a032e8fdda3c') : '' }}</span>
      </slot>
    </div>
    <p v-if="scheduleError && !settingsOpen" class="x-gantt__error" role="alert">{{ scheduleError }}</p>
    <GanttSettingsPanel :model-value="settingsOpen" :settings="settings" :pending="pending" :error="scheduleError" :disabled="disabled" @update:model-value="settingsOpen = $event" @apply="applyDraft" />
    <div ref="viewport" class="x-gantt__viewport" tabindex="0" @scroll="syncScroll" @wheel.ctrl.prevent="!disabled && ($event.deltaY < 0 ? zoomIn() : zoomOut())">
      <div class="x-gantt__canvas" :style="{ width: `${tableWidth + timelineWidth}px`, height: `${canvasHeight}px` }">
        <div class="x-gantt__header">
          <div class="x-gantt__table-header" :style="{ width: `${tableWidth}px` }">
            <div class="x-gantt__cells" :style="{ width: `${totalColumnWidth}px`, transform: `translateX(-${tableScroll}px)` }">
              <div v-for="column in columns" :key="column.key" class="x-gantt__cell" :style="{ width: `${columnWidth(column)}px`, textAlign: column.align }">{{ column.title }}<span v-if="column.resizable !== false" class="x-gantt__column-resizer" @pointerdown.stop="resize($event, column)" /></div>
            </div>
            <span class="x-gantt__splitter" @pointerdown.stop="resize($event)" />
          </div>
          <div class="x-gantt__time-header" :style="{ left: `${tableWidth}px`, width: `${timelineWidth}px` }">
            <div v-for="group in groups" :key="group.start" class="x-gantt__time-group" :style="{ left: `${dateToPixel(group.start, range.start, dayWidth)}px`, width: `${(group.end - group.start) * dayWidth}px` }">{{ group.label }}</div>
            <div v-for="tick in ticks" :key="tick.start" class="x-gantt__tick" :style="{ left: `${dateToPixel(tick.start, range.start, dayWidth)}px`, width: `${(tick.end - tick.start) * dayWidth}px` }">{{ tick.label }}</div>
          </div>
        </div>
        <div class="x-gantt__background" :style="{ left: `${tableWidth}px`, top: '56px', width: `${timelineWidth}px`, height: `${canvasHeight - 56}px` }">
          <div v-for="day in nonWorkingDays" :key="day" class="x-gantt__weekend" :style="{ left: `${dateToPixel(day, range.start, dayWidth)}px`, width: `${dayWidth}px` }" />
          <div v-for="tick in ticks" :key="tick.start" class="x-gantt__grid-line" :style="{ left: `${dateToPixel(tick.start, range.start, dayWidth)}px` }" />
          <div v-if="settings.showToday && todayDay() >= range.start && todayDay() < range.end" class="x-gantt__today" :style="{ left: `${dateToPixel(todayDay(), range.start, dayWidth)}px` }"><span>{{ t("extension.17e83cc25e22") }}</span></div>
          <svg v-if="settings.showDependencies" class="x-gantt__dependencies" :width="timelineWidth" :height="canvasHeight - 56" aria-hidden="true"><path v-for="line in dependencyPaths" :key="line.id" :d="line.path" /></svg>
        </div>
        <div v-for="row in visibleRows" :key="row.task.id" class="x-gantt__row" :class="{ 'is-selected': selected === row.task.id }" :style="{ top: `${56 + row.index * rowHeight}px`, height: `${rowHeight}px` }">
          <div class="x-gantt__table-row" :style="{ width: `${tableWidth}px` }" @click="clickTask(row.task, 'table')" @dblclick="doubleClick(row.task, 'table')">
            <div class="x-gantt__cells" :style="{ width: `${totalColumnWidth}px`, transform: `translateX(-${tableScroll}px)` }">
              <div v-for="(column, columnIndex) in columns" :key="column.key" class="x-gantt__cell" :style="{ width: `${columnWidth(column)}px`, textAlign: column.align, paddingLeft: columnIndex === 0 ? `${12 + row.depth * 18}px` : undefined }" :title="cellValue(currentTask(row.task), column)">
                <button v-if="columnIndex === 0 && row.hasChildren" class="x-gantt__expand" :aria-expanded="expanded.includes(row.task.id)" :aria-label="t('extension.c161211acb69', { p0: expanded.includes(row.task.id) ? t('extension.e9132e604824') : t('extension.b0e24833f752'), p1: row.task.title })" :disabled="disabled" @click.stop="toggleTask(row.task.id)">{{ expanded.includes(row.task.id) ? '▾' : '▸' }}</button>
                <span v-else-if="columnIndex === 0" class="x-gantt__indent" />
                <slot name="cell" :task="currentTask(row.task)" :column="column" :value="cellValue(currentTask(row.task), column)"><span class="x-gantt__cell-text">{{ cellValue(currentTask(row.task), column) }}</span></slot>
              </div>
            </div>
            <span class="x-gantt__splitter" @pointerdown.stop="resize($event)" />
          </div>
          <div class="x-gantt__timeline-row" :style="{ width: `${timelineWidth}px` }" @click.self="selectTask(null)">
            <div v-if="barVisible(row.task)" class="x-gantt__bar" :class="{ 'is-milestone': row.task.taskType === 'milestone', 'is-summary': row.task.taskType === 'summary', 'is-readonly': !canEdit(row.task, 'move'), 'is-selected': selected === row.task.id }" :style="{ left: `${layout(row.task).left}px`, width: row.task.taskType === 'milestone' ? '18px' : `${layout(row.task).width}px`, '--x-gantt-bar-color': row.task.barColor || 'var(--x-gantt-accent)' }" role="button" :tabindex="disabled ? -1 : 0" :aria-label="t('extension.785f2b4280f4', { p0: row.task.title, p1: currentTask(row.task).start, p2: currentTask(row.task).end, p3: currentTask(row.task).progress ?? 0 })" :title="`${row.task.title}\n${currentTask(row.task).start} → ${currentTask(row.task).end}\n${currentTask(row.task).progress}%`" @pointerdown.stop="startDrag($event, row.task, 'move')" @click.stop="clickTask(row.task, 'bar')" @dblclick.stop="doubleClick(row.task, 'bar')" @keydown.enter.prevent="clickTask(row.task, 'bar')" @keydown.space.prevent="clickTask(row.task, 'bar')">
              <template v-if="row.task.taskType === 'milestone'"><slot name="milestone" :task="currentTask(row.task)" :selected="selected === row.task.id"><span class="x-gantt__diamond" /></slot></template>
              <template v-else>
                <span v-if="settings.showProgress" class="x-gantt__progress" :style="{ width: `${currentTask(row.task).progress ?? 0}%` }" />
                <span class="x-gantt__bar-content"><slot name="task" :task="currentTask(row.task)" :selected="selected === row.task.id">{{ row.task.title }}</slot></span>
                <span v-if="canEdit(row.task, 'resize-start')" class="x-gantt__handle x-gantt__handle--start" @pointerdown.stop="startDrag($event, row.task, 'resize-start')" />
                <span v-if="canEdit(row.task, 'resize-end')" class="x-gantt__handle x-gantt__handle--end" @pointerdown.stop="startDrag($event, row.task, 'resize-end')" />
                <span v-if="settings.showProgress && canEdit(row.task, 'progress')" class="x-gantt__progress-handle" :style="{ left: `${currentTask(row.task).progress ?? 0}%` }" @pointerdown.stop="startDrag($event, row.task, 'progress')" />
              </template>
            </div>
          </div>
        </div>
        <div v-if="!rows.length" class="x-gantt__empty" :style="{ width: `${width}px`, left: `${scrollLeft}px` }"><slot name="empty"><XEmpty :description="t('extension.7003c43f43fd')" /></slot></div>
      </div>
    </div>
    <div v-if="totalColumnWidth > tableWidth" class="x-gantt__table-scroll" :style="{ width: `${tableWidth}px`, maxWidth: '100%' }"><input v-model.number="tableScroll" :aria-label="t('extension.0d3c9f19a7b1')" type="range" :min="0" :max="Math.max(0, totalColumnWidth - tableWidth)" /></div>
    <div v-if="showFooter" class="x-gantt__footer"><slot name="footer" :count="rows.length" :range="getVisibleRange()">{{ rows.length }}{{ t("extension.a1506fa021c7") }}{{ formatDay(range.start) }}{{ t("extension.43401e739ef4") }}{{ formatDay(range.end - 1) }}<span>{{ pending ? t('extension.9ca32f988d16') : settings.readonly ? t('extension.2cc2bef6aa84') : t('extension.d170ac9ebf4c') }}{{ t("extension.736fc575a42e") }}</span></slot></div>
  </section>
</template>
