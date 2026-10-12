import { dayOfWeek, flattenRows, formatDay, indexTasks, parseDay, validateDependencies } from './core'
import type { GanttAction, GanttCalendar, GanttDependency, GanttId, GanttIssue, GanttTask } from './types'

/** 背景和排程共用日历判断；补班日期拥有最高优先级。 */
export function createWorkCalendar(calendar: GanttCalendar = {}) {
  const weekends = new Set(calendar.weekendDays ?? [0, 6])
  const holidays = new Set(calendar.holidays ?? [])
  const working = new Set(calendar.workingDates ?? [])
  const explicit = [...working].map(parseDay).filter(Number.isFinite).sort((a, b) => a - b)
  const minimum = parseDay('0001-01-01'), maximum = parseDay('9999-12-31')
  function isWorking(day: number) {
    const date = formatDay(day)
    return working.has(date) || (!weekends.has(dayOfWeek(day)) && !holidays.has(date))
  }
  function seek(day: number, direction = 1): number {
    if (weekends.size === 7) {
      const found = direction > 0 ? explicit.find(value => value >= day) : [...explicit].reverse().find(value => value <= day)
      if (found !== undefined) return found
      throw new Error('工作日历没有可用工作日，请调整休息日或补班日期')
    }
    while (day >= minimum && day <= maximum) {
      if (isWorking(day)) return day
      day += direction
    }
    throw new Error('排程日期超出 0001 至 9999 年范围')
  }
  function shift(day: number, count: number) {
    const direction = count < 0 ? -1 : 1
    day = seek(day, direction)
    for (let remaining = Math.abs(count); remaining > 0; remaining--) day = seek(day + direction, direction)
    return day
  }
  function duration(start: string, end: string) {
    let count = 0
    for (let day = parseDay(start); day <= parseDay(end); day++) if (isWorking(day)) count++
    return Math.max(1, count)
  }
  return { isWorking, seek, shift, duration }
}

export function calendarIssues(calendar: GanttCalendar): GanttIssue[] {
  const issues: GanttIssue[] = []
  if ((calendar.weekendDays ?? []).some(day => !Number.isInteger(day) || day < 0 || day > 6)) issues.push({ message: '每周休息日必须为 0 至 6 的整数' })
  if ([...(calendar.holidays ?? []), ...(calendar.workingDates ?? [])].some(date => !Number.isFinite(parseDay(date)) || date < '0001-01-01')) issues.push({ message: '节假日和补班日期必须为有效的 YYYY-MM-DD 日期' })
  return issues
}

export interface ScheduleInput {
  tasks: GanttTask[]
  dependencies: GanttDependency[]
  calendar: GanttCalendar
  previousCalendar: GanttCalendar
  startDate: string
  edit?: { task: GanttTask; action: GanttAction }
  canEditTask?: (task: GanttTask, action: GanttAction) => boolean
}

/** 按拓扑顺序推导全部日期；存在任何冲突时返回原数据，不提交部分结果。 */
export function scheduleTasks(input: ScheduleInput): { tasks: GanttTask[]; issues: GanttIssue[] } {
  const index = indexTasks(input.tasks)
  const dependencyIndex = validateDependencies(input.dependencies, index.tasks)
  const issues = [...index.issues, ...dependencyIndex.issues, ...calendarIssues(input.calendar), ...calendarIssues(input.previousCalendar)]
  const anchor = parseDay(input.startDate)
  if (!Number.isFinite(anchor) || input.startDate < '0001-01-01') issues.push({ message: '项目起始日期无效' })
  for (const task of input.tasks) {
    if (task.start < '0001-01-01') issues.push({ taskId: task.id, message: `${task.title}：日期超出支持范围` })
    if (task.workdayDuration !== undefined && (!Number.isInteger(task.workdayDuration) || task.workdayDuration < (task.taskType === 'milestone' ? 0 : 1) || task.workdayDuration > 3652059)) issues.push({ taskId: task.id, message: `${task.title}：工作日工期无效` })
  }
  for (const dependency of input.dependencies) {
    if (index.tasks.get(dependency.from)?.taskType === 'summary' || index.tasks.get(dependency.to)?.taskType === 'summary') issues.push({ dependencyId: dependency.id, message: '自动排程的依赖不能连接汇总任务' })
    if (!['FS', 'SS', 'FF', 'SF'].includes(dependency.dependencyType ?? 'FS') || !Number.isInteger(dependency.lag ?? 0) || Math.abs(dependency.lag ?? 0) > 3652059 || (dependency.lagUnit !== undefined && dependency.lagUnit !== 'day')) issues.push({ dependencyId: dependency.id, message: '依赖类型或工作日偏移无效' })
  }
  if (issues.length) return { tasks: input.tasks, issues }
  const calendar = createWorkCalendar(input.calendar), previousCalendar = createWorkCalendar(input.previousCalendar)
  const result = new Map(input.tasks.map(task => [task.id, { ...task }]))
  const incoming = new Map<GanttId, GanttDependency[]>(), outgoing = new Map<GanttId, GanttId[]>()
  const degrees = new Map(input.tasks.map(task => [task.id, 0]))
  for (const dependency of input.dependencies) {
    incoming.set(dependency.to, [...(incoming.get(dependency.to) ?? []), dependency])
    outgoing.set(dependency.from, [...(outgoing.get(dependency.from) ?? []), dependency.to])
    degrees.set(dependency.to, degrees.get(dependency.to)! + 1)
  }
  const queue = input.tasks.filter(task => degrees.get(task.id) === 0).map(task => task.id)
  try {
    for (let cursor = 0; cursor < queue.length; cursor++) {
      const id = queue[cursor], original = index.tasks.get(id)!, task = result.get(id)!
      if (task.taskType !== 'summary') {
        const edited = input.edit?.task.id === id ? input.edit : undefined
        const seed = edited?.task ?? task
        const duration = task.taskType === 'milestone' ? 0 : edited && edited.action !== 'move'
          ? calendar.duration(seed.start, seed.end)
          : task.workdayDuration ?? previousCalendar.duration(task.start, task.end)
        const steps = Math.max(0, duration - 1)
        let start = calendar.seek(Math.max(anchor, parseDay(seed.start)))
        for (const dependency of incoming.get(id) ?? []) {
          const from = result.get(dependency.from)!, type = dependency.dependencyType ?? 'FS'
          const base = parseDay(type[0] === 'F' ? from.end : from.start)
          const bound = calendar.shift(type === 'FS' ? calendar.seek(base + 1) : calendar.seek(base), dependency.lag ?? 0)
          start = Math.max(start, type[1] === 'F' ? calendar.shift(bound, -steps) : bound)
        }
        const end = calendar.shift(start, steps)
        const fixed = original.readonly || input.canEditTask?.(original, 'move') === false
        if (fixed) {
          // 固定任务只检查依赖和起点，不因日历规范化强制改动原日期。
          let valid = parseDay(original.start) >= anchor
          for (const dependency of incoming.get(id) ?? []) {
            const from = result.get(dependency.from)!, type = dependency.dependencyType ?? 'FS'
            const base = parseDay(type[0] === 'F' ? from.end : from.start)
            const bound = calendar.shift(type === 'FS' ? calendar.seek(base + 1) : calendar.seek(base), dependency.lag ?? 0)
            if (parseDay(type[1] === 'F' ? original.end : original.start) < bound) valid = false
          }
          if (edited && (seed.start !== original.start || seed.end !== original.end)) valid = false
          if (!valid) issues.push({ taskId: id, message: `${task.title}：固定任务无法满足排程约束` })
        } else {
          task.start = formatDay(start); task.end = formatDay(end)
        }
        task.workdayDuration = duration
      }
      for (const to of outgoing.get(id) ?? []) {
        degrees.set(to, degrees.get(to)! - 1)
        if (degrees.get(to) === 0) queue.push(to)
      }
    }
    // 逆序树遍历保证多级父任务从已汇总的子任务计算日期。
    const tree = flattenRows(index, new Set(index.tasks.keys()))
    const extents = new Map<GanttId, { start: number; end: number }>()
    for (let cursor = tree.length - 1; cursor >= 0; cursor--) {
      const task = result.get(tree[cursor].task.id)!
      const children = index.children.get(task.id) ?? []
      let first = task.taskType === 'summary' && children.length ? Infinity : parseDay(task.start)
      let last = task.taskType === 'summary' && children.length ? -Infinity : parseDay(task.end)
      for (const child of children) {
        const extent = extents.get(child.id)!
        first = Math.min(first, extent.start); last = Math.max(last, extent.end)
      }
      extents.set(task.id, { start: first, end: last })
      if (task.taskType !== 'summary' || !children.length) continue
      const start = formatDay(first), end = formatDay(last)
      if ((task.readonly || input.canEditTask?.(task, 'move') === false) && (task.start !== start || task.end !== end)) issues.push({ taskId: task.id, message: `${task.title}：固定父任务无法汇总子任务日期` })
      else { task.start = start; task.end = end }
    }
  } catch (error) { issues.push({ message: error instanceof Error ? error.message : '工作日历无法完成排程' }) }
  return { tasks: issues.length ? input.tasks : input.tasks.map(task => result.get(task.id)!), issues }
}
