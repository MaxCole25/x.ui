<script setup lang="ts">
import { ref } from 'vue'
import { XGantt } from '@x-soft88/x-ui'
import type { GanttChangePayload, GanttExpose, GanttScheduleChangePayload, GanttScheduleRejectPayload, GanttTask } from '@x-soft88/x-ui'
const gantt = ref<GanttExpose>()
const eventText = ref('拖动任务、调整边缘或双击任务查看事件')
const readonly = ref(false), rejectSave = ref(false)
const tasks = ref<GanttTask[]>([
  { id: 'project', title: '组件库交付', start: '2026-10-01', end: '2026-10-24', progress: 60, taskType: 'summary' },
  { id: 'design', parentId: 'project', title: '设计与需求评审', start: '2026-10-01', end: '2026-10-06', progress: 100 },
  { id: 'core', parentId: 'project', title: '内核开发', start: '2026-10-07', end: '2026-10-14', progress: 65 },
  { id: 'date', parentId: 'core', title: '日期与坐标模块', start: '2026-10-07', end: '2026-10-10', progress: 100 },
  { id: 'ui', parentId: 'project', title: '界面与交互', start: '2026-10-11', end: '2026-10-21', progress: 35 },
  { id: 'release', parentId: 'project', title: '发布里程碑', start: '2026-10-24', end: '2026-10-24', taskType: 'milestone', progress: 0 }
])
async function beforeTaskChange(change: GanttChangePayload) {
  eventText.value = `正在保存 ${change.task.title}…`
  // 替换成自己的 HTTP 保存逻辑。返回 false 或抛出异常会恢复原数据。
  await new Promise(resolve => setTimeout(resolve, 300))
  return !rejectSave.value
}
async function beforeScheduleChange(change: GanttScheduleChangePayload) {
  eventText.value = `正在批量保存 ${change.changes.length} 个任务…`
  // 将 change.tasks 和 change.settings 一起保存；返回 false 时整体恢复。
  await new Promise(resolve => setTimeout(resolve, 300))
  return !rejectSave.value
}
function onScheduleReject(rejection: GanttScheduleRejectPayload) {
  eventText.value = rejection.issues.map(issue => issue.message).join('；')
}
</script>
<template>
  <div class="gantt-demo">
    <div class="gantt-demo__controls"><label><input v-model="rejectSave" type="checkbox">模拟保存失败</label><button @click="gantt?.scrollToTask('release')">定位发布</button></div>
    <XGantt ref="gantt" v-model:tasks="tasks" v-model:readonly="readonly" :height="480" :table-width="360" :columns="[{ key: 'title', title: '任务名称', width: 230 }, { key: 'start', title: '开始日期', width: 130 }, { key: 'end', title: '结束日期', width: 130 }]" accent-color="#0b806a" :before-task-change="beforeTaskChange" :before-schedule-change="beforeScheduleChange" :dependencies="[{ id: 'd1', from: 'design', to: 'core' }, { id: 'd2', from: 'ui', to: 'release' }]" @task-change="eventText = `${$event.task.title}：${$event.task.start} 至 ${$event.task.end}`" @task-reject="eventText = '保存失败，已恢复原数据'" @schedule-change="eventText = `排程已应用，${$event.changes.length} 个任务日期变化`" @schedule-reject="onScheduleReject" @task-dblclick="eventText = `编辑任务：${$event.title}`">
      <template #task="{ task }">{{ task.title }} · {{ task.progress }}%</template>
    </XGantt>
    <p aria-live="polite">{{ eventText }}</p>
  </div>
</template>
<style scoped>
.gantt-demo { width: 100%; min-width: 0; }.gantt-demo__controls { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }.gantt-demo__controls button { border: 1px solid var(--x-color-border); border-radius: 4px; padding: 2px 10px; }
</style>
