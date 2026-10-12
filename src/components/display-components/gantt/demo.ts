import type { GanttDependency, GanttTask } from './src/types'
import { formatDay, parseDay } from './src/core'
/** 演示数据单独维护，不进入组件默认数据。 */
export function createGanttTasks(count = 20): GanttTask[] {
  const base = parseDay('2026-10-01')
  return Array.from({ length: count }, (_, index) => {
    const start = base + index % 28
    return { id: index + 1, parentId: index === 1 ? 1 : index === 2 ? 2 : index > 2 && index < 6 ? 3 : undefined,
      title: ['项目启动', '产品规划', '需求评审', '界面设计', '组件开发', '验收发布'][index % 6] + ` ${index + 1}`,
      start: formatDay(start), end: formatDay(start + (index % 5 === 0 ? 0 : 3 + index % 7)),
      taskType: index % 5 === 0 ? 'milestone' : index === 1 ? 'summary' : 'task', progress: index * 17 % 101,
      readonly: index === 8, data: { owner: ['张工', '李工', '王工'][index % 3], status: index % 3 === 0 ? '进行中' : '计划中' } }
  })
}
export const ganttDependencies: GanttDependency[] = [{ id: 'd1', from: 1, to: 3 }, { id: 'd2', from: 4, to: 7 }, { id: 'd3', from: 7, to: 10, dependencyType: 'SS' }]
/** 自动排程人工验收场景：四种依赖、正负偏移、多前置、汇总及里程碑。 */
export function createScheduleScene(fixed = false): { tasks: GanttTask[]; dependencies: GanttDependency[] } {
  return {
    tasks: [
      { id: 'project', title: '排程验收项目', taskType: 'summary', start: '2026-10-01', end: '2026-10-30' },
      { id: 'a', parentId: 'project', title: '前置任务（周五至周一）', start: '2026-10-09', end: '2026-10-12' },
      { id: 'fs', parentId: 'project', title: 'FS 后续任务', start: '2026-10-09', end: '2026-10-12', readonly: fixed },
      { id: 'ss', parentId: 'project', title: 'SS 后续（偏移 +1）', start: '2026-10-09', end: '2026-10-09' },
      { id: 'ff', parentId: 'project', title: 'FF 后续任务', start: '2026-10-09', end: '2026-10-09' },
      { id: 'sf', parentId: 'project', title: 'SF 后续任务', start: '2026-10-08', end: '2026-10-08' },
      { id: 'multi', parentId: 'project', title: '多前置（含偏移 -1）', start: '2026-10-09', end: '2026-10-09' },
      { id: 'release', parentId: 'project', title: '交付里程碑', taskType: 'milestone', start: '2026-10-09', end: '2026-10-09' }
    ],
    dependencies: [
      { id: 'fs-link', from: 'a', to: 'fs' },
      { id: 'ss-link', from: 'a', to: 'ss', dependencyType: 'SS', lag: 1 },
      { id: 'ff-link', from: 'a', to: 'ff', dependencyType: 'FF' },
      { id: 'sf-link', from: 'a', to: 'sf', dependencyType: 'SF' },
      { id: 'multi-link1', from: 'fs', to: 'multi', lag: -1 },
      { id: 'multi-link2', from: 'ff', to: 'multi' },
      { id: 'release-link', from: 'multi', to: 'release' }
    ]
  }
}
export function createBoundaryTasks(): GanttTask[] {
  return [{ id: 'leap', title: '闰年与跨月', start: '2024-02-28', end: '2024-03-02', progress: 45 },
    { id: 'year', title: '跨年计划', start: '2024-12-29', end: '2025-01-03', progress: 75 },
    { id: 'long', title: '长周期任务与长文本：完整交付计划，检查截断和定位', start: '2024-02-29', end: '2025-01-05', progress: 60 }]
}
