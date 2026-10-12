<script setup lang="ts">
import { ref } from 'vue'
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XGantt } from './index'
import { createBoundaryTasks, createGanttTasks, createScheduleScene, ganttDependencies } from './demo'
import '../../../styles/index.css'
const scenario = ref('20')
const rejectSave = ref(false)
const delaySave = ref(false)
function createScene() {
  const scheduleScene = ['schedule', 'conflict'].includes(scenario.value) ? createScheduleScene(scenario.value === 'conflict') : undefined
  return {
    tasks: scheduleScene?.tasks ?? (scenario.value === 'boundary' ? createBoundaryTasks() : scenario.value === 'empty' ? [] : createGanttTasks(Number(scenario.value))),
    dependencies: scheduleScene?.dependencies ?? (scenario.value === 'boundary' || scenario.value === 'empty' ? [] : ganttDependencies),
    height: 380, tableWidth: 360, accentColor: '#0b806a',
    readonly: false, enableAutoSchedule: false, showToday: true, showWeekends: true, showProgress: true, showDependencies: true,
    columns: [{ key: 'title', title: '任务名称', width: 210 }, { key: 'start', title: '开始日期', width: 110 }, { key: 'end', title: '结束日期', width: 110 }, { key: 'progress', title: '进度', width: 80 }, { key: 'owner', title: '负责人', width: 80 }],
    beforeTaskChange: async () => { if (delaySave.value) await new Promise(resolve => setTimeout(resolve, 600)); return !rejectSave.value },
    beforeScheduleChange: async () => { if (delaySave.value) await new Promise(resolve => setTimeout(resolve, 600)); return !rejectSave.value }
  }
}
</script>
<template>
  <Story title="展示组件/Gantt 甘特图" group="components">
    <Variant title="外观接口">
      <div style="display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap">
        <label>验收数据 <select v-model="scenario"><option value="20">20 个多层级任务</option><option value="100">100 个任务</option><option value="1000">1,000 个任务</option><option value="10000">10,000 个任务</option><option value="schedule">工作日自动排程与四种依赖</option><option value="conflict">固定任务与依赖冲突</option><option value="boundary">跨月、跨年与闰年</option><option value="empty">空数据</option></select></label>
        <label><input v-model="delaySave" type="checkbox">模拟异步保存</label><label><input v-model="rejectSave" type="checkbox">拒绝保存并回滚</label>
      </div>
      <ApiPlayground :key="scenario" component="XGantt" :create-initial-props="createScene">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XGantt v-bind="{ ...apiProps, ...styleProps }" v-on="apiEvents" @vue:mounted="captureInstance" @vue:updated="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
