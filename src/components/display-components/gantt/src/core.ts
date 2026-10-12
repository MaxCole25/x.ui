import type { GanttDependency, GanttId, GanttIssue, GanttTask, GanttView } from './types'
const DAY = 86400000
/** 使用民用日期序号，不以本地毫秒差计算天数，避免夏令时误差。 */
export function parseDay(value: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  date.setUTCHours(0, 0, 0, 0)
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date.getTime() / DAY : NaN
}
export function formatDay(day: number): string { return new Date(Math.round(day) * DAY).toISOString().slice(0, 10) }
export function todayDay(): number {
  const now = new Date()
  return parseDay(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`)
}
export function dayOfWeek(day: number): number { return new Date(day * DAY).getUTCDay() }
export function dateToPixel(day: number, start: number, dayWidth: number): number { return (day - start) * dayWidth }
export function pixelToDate(pixel: number, start: number, dayWidth: number): number { return start + pixel / dayWidth }
export interface TaskRow { task: GanttTask; depth: number; hasChildren: boolean; index: number }
export function indexTasks(input: GanttTask[]) {
  const tasks = new Map<GanttId, GanttTask>()
  const issues: GanttIssue[] = []
  for (const task of input) {
    if (tasks.has(task.id)) { issues.push({ taskId: task.id, message: '任务 ID 重复，保留第一条' }); continue }
    const start = parseDay(task.start), end = parseDay(task.end)
    if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) {
      issues.push({ taskId: task.id, message: '日期无效或结束日期早于开始日期' }); continue
    }
    tasks.set(task.id, { ...task, progress: Math.max(0, Math.min(100, Number.isFinite(task.progress) ? task.progress! : 0)) })
  }
  const parents = new Map<GanttId, GanttId>()
  for (const task of tasks.values()) {
    if (task.parentId == null) continue
    if (!tasks.has(task.parentId)) { issues.push({ taskId: task.id, message: '父任务不存在，作为根任务显示' }); continue }
    parents.set(task.id, task.parentId)
  }
  const visited = new Set<GanttId>()
  for (const id of tasks.keys()) {
    const path = new Set<GanttId>()
    let current: GanttId | undefined = id
    while (current != null && !visited.has(current)) {
      if (path.has(current)) { parents.delete(current); issues.push({ taskId: current, message: '循环层级已断开' }); break }
      path.add(current); current = parents.get(current)
    }
    path.forEach(key => visited.add(key))
  }
  const children = new Map<GanttId | null, GanttTask[]>()
  for (const task of tasks.values()) {
    const parent = parents.get(task.id) ?? null
    const group = children.get(parent) ?? []
    group.push(task); children.set(parent, group)
  }
  return { tasks, parents, children, issues }
}
export function flattenRows(index: ReturnType<typeof indexTasks>, expanded: Set<GanttId>): TaskRow[] {
  const rows: TaskRow[] = []
  const stack = (index.children.get(null) ?? []).map(task => ({ task, depth: 0 })).reverse()
  while (stack.length) {
    const item = stack.pop()!
    const children = index.children.get(item.task.id) ?? []
    rows.push({ ...item, hasChildren: children.length > 0, index: rows.length })
    if (expanded.has(item.task.id)) for (let i = children.length - 1; i >= 0; i--) stack.push({ task: children[i], depth: item.depth + 1 })
  }
  return rows
}
export function validateDependencies(dependencies: GanttDependency[], tasks: Map<GanttId, GanttTask>) {
  const valid: GanttDependency[] = [], issues: GanttIssue[] = []
  const ids = new Set<GanttId>(), graph = new Map<GanttId, GanttId[]>()
  for (const item of dependencies) {
    const stack = [item.to], seen = new Set<GanttId>()
    let cyclic = item.from === item.to
    while (stack.length && !cyclic) {
      const id = stack.pop()!
      if (id === item.from) { cyclic = true; break }
      if (seen.has(id)) continue
      seen.add(id); stack.push(...(graph.get(id) ?? []))
    }
    if (ids.has(item.id) || !tasks.has(item.from) || !tasks.has(item.to) || cyclic) {
      issues.push({ dependencyId: item.id, message: '依赖重复、引用无效或存在循环' }); continue
    }
    ids.add(item.id); valid.push(item)
    graph.set(item.from, [...(graph.get(item.from) ?? []), item.to])
  }
  return { valid, issues }
}
export interface TimeTick { start: number; end: number; label: string; group: string }
export function timeTicks(start: number, end: number, view: GanttView, weekStartsOn: number, locale: string): TimeTick[] {
  const ticks: TimeTick[] = []
  let cursor = Math.floor(start)
  if (view === 'week') cursor -= (dayOfWeek(cursor) - weekStartsOn + 7) % 7
  if (view === 'month') { const date = new Date(cursor * DAY); date.setUTCDate(1); cursor = date.getTime() / DAY }
  while (cursor < end) {
    const date = new Date(cursor * DAY)
    let next = cursor + (view === 'week' ? 7 : 1)
    if (view === 'month') { date.setUTCMonth(date.getUTCMonth() + 1, 1); next = date.getTime() / DAY }
    const current = new Date(cursor * DAY)
    const label = view === 'month' ? new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }).format(current) : view === 'week' ? `${current.getUTCMonth() + 1}/${current.getUTCDate()}` : String(current.getUTCDate())
    ticks.push({ start: cursor, end: next, label, group: view === 'month' ? String(current.getUTCFullYear()) : `${current.getUTCFullYear()}-${String(current.getUTCMonth() + 1).padStart(2, '0')}` })
    cursor = next
  }
  return ticks
}
