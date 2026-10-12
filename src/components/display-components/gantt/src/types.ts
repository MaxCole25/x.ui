import type { VNode } from 'vue'
export type GanttId = string | number
export type GanttView = 'day' | 'week' | 'month'
export type GanttAction = 'move' | 'resize-start' | 'resize-end' | 'progress'
/** 日期使用 YYYY-MM-DD，普通任务首尾包含，里程碑为零工期。 */
export interface GanttTask {
  id: GanttId
  parentId?: GanttId
  title: string
  start: string
  end: string
  progress?: number
  /** 自动排程使用的工作日工期；里程碑为 0。 */
  workdayDuration?: number
  taskType?: 'task' | 'summary' | 'milestone'
  barColor?: string
  readonly?: boolean
  data?: Record<string, unknown>
}
export interface GanttColumn {
  key: string
  title: string
  width?: number
  minWidth?: number
  align?: 'left' | 'center' | 'right'
  visible?: boolean
  resizable?: boolean
  formatter?: (task: GanttTask) => string
}
export interface GanttDependency {
  id: GanttId
  from: GanttId
  to: GanttId
  dependencyType?: 'FS' | 'SS' | 'FF' | 'SF'
  lag?: number
  lagUnit?: 'day'
}
export interface GanttResource { id: GanttId; name: string; capacity?: number; data?: Record<string, unknown> }
export interface GanttAssignment { id: GanttId; taskId: GanttId; resourceId: GanttId; start?: string; end?: string; quantity?: number }
export interface GanttRange { start: string; end: string }
export interface GanttIssue { taskId?: GanttId; dependencyId?: GanttId; message: string }
export interface GanttChangePayload { task: GanttTask; previous: GanttTask; action: GanttAction }
export interface GanttCalendar { weekendDays?: number[]; holidays?: string[]; workingDates?: string[] }
export interface GanttSettings {
  enableAutoSchedule: boolean
  scheduleStartDate: string
  calendar: GanttCalendar
  readonly: boolean
  showToday: boolean
  showWeekends: boolean
  showProgress: boolean
  showDependencies: boolean
}
export type GanttScheduleReason = 'settings' | 'edit' | 'reschedule'
export interface GanttScheduleChangePayload {
  previousTasks: GanttTask[]
  tasks: GanttTask[]
  changes: { previous: GanttTask; task: GanttTask }[]
  previousSettings: GanttSettings
  settings: GanttSettings
  reason: GanttScheduleReason
}
export interface GanttScheduleRejectPayload { change?: GanttScheduleChangePayload; issues: GanttIssue[] }
export interface GanttProps {
  tasks?: GanttTask[]
  dependencies?: GanttDependency[]
  columns?: GanttColumn[]
  view?: GanttView
  zoom?: number
  startDate?: string
  endDate?: string
  selectedTaskId?: GanttId | null
  expandedTaskIds?: GanttId[]
  height?: number | string
  rowHeight?: number
  tableWidth?: number
  fontSize?: number
  radius?: number
  accentColor?: string
  readonly?: boolean
  disabled?: boolean
  showToolbar?: boolean
  showSettings?: boolean
  enableAutoSchedule?: boolean
  scheduleStartDate?: string
  showToday?: boolean
  showWeekends?: boolean
  showProgress?: boolean
  showDependencies?: boolean
  showFooter?: boolean
  weekStartsOn?: number
  locale?: string
  calendar?: GanttCalendar
  canEditTask?: (task: GanttTask, action: GanttAction) => boolean
  /** 返回 false 或抛出异常则拒绝变更；只有通过后才发出更新事件。 */
  beforeTaskChange?: (change: GanttChangePayload) => boolean | void | Promise<boolean | void>
  /** 批量保存入口，拒绝时整个排程及设置不提交。 */
  beforeScheduleChange?: (change: GanttScheduleChangePayload) => boolean | void | Promise<boolean | void>
}
export interface GanttEmits {
  (event: 'update:tasks', tasks: GanttTask[]): void
  (event: 'update:view', view: GanttView): void
  (event: 'update:zoom', zoom: number): void
  (event: 'update:selectedTaskId', id: GanttId | null): void
  (event: 'update:expandedTaskIds', ids: GanttId[]): void
  (event: 'update:tableWidth', width: number): void
  (event: 'update:calendar', calendar: GanttCalendar): void
  (event: 'update:readonly', value: boolean): void
  (event: 'update:enableAutoSchedule', value: boolean): void
  (event: 'update:scheduleStartDate', value: string): void
  (event: 'update:showToday', value: boolean): void
  (event: 'update:showWeekends', value: boolean): void
  (event: 'update:showProgress', value: boolean): void
  (event: 'update:showDependencies', value: boolean): void
  (event: 'schedule-change', change: GanttScheduleChangePayload): void
  (event: 'schedule-reject', rejection: GanttScheduleRejectPayload): void
  (event: 'task-click', task: GanttTask, source: 'table' | 'bar'): void
  (event: 'task-dblclick', task: GanttTask, source: 'table' | 'bar'): void
  (event: 'task-select', id: GanttId | null): void
  (event: 'task-change', change: GanttChangePayload): void
  (event: 'task-reject', change: GanttChangePayload): void
  (event: 'zoom-change', zoom: number): void
  (event: 'range-change', range: GanttRange): void
  (event: 'column-resize', column: GanttColumn, width: number): void
  (event: 'data-error', issues: GanttIssue[]): void
}
export interface GanttSlots {
  toolbar?: (props: { view: GanttView; zoom: number; fitToTasks: () => void; openSettings: () => void }) => VNode[]
  cell?: (props: { task: GanttTask; column: GanttColumn; value: string }) => VNode[]
  task?: (props: { task: GanttTask; selected: boolean }) => VNode[]
  milestone?: (props: { task: GanttTask; selected: boolean }) => VNode[]
  empty?: () => VNode[]
  footer?: (props: { count: number; range: GanttRange }) => VNode[]
}
export interface GanttExpose {
  scrollToDate: (date: string) => void
  scrollToTask: (id: GanttId) => void
  selectTask: (id: GanttId | null) => void
  setRange: (start: string, end: string) => void
  zoomIn: () => void
  zoomOut: () => void
  fitToTasks: () => void
  expandAll: () => void
  collapseAll: () => void
  refresh: () => void
  getVisibleRange: () => GanttRange
  cancelEdit: () => void
  openSettings: () => void
  reschedule: () => Promise<boolean>
}
