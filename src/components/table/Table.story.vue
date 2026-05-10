<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElButton, ElSpace, ElTag } from 'element-plus'
import { XTable } from './index'
import type { TableColumn, TableRowKey, TableSize } from './src/types'
import '../../styles/index.css'

type DemoRow = Record<string, unknown> & {
  id: number
  component: string
  category: 'Display' | 'Input' | 'Feedback'
  status: 'stable' | 'beta' | 'deprecated'
  owner: string
  usedBy: number
  updatedAt: string
  enabled: boolean
  priority: 'P0' | 'P1' | 'P2'
  assigneeId: number
  note: string
}

const loading = ref(false)
const selectedCount = ref(0)
const latestEvent = ref('暂无事件')
const enableSelection = ref(true)
const enablePagination = ref(true)
const enableActions = ref(true)
const enableRowDrag = ref(true)
const enableColumnDrag = ref(true)
const compactRows = ref(false)
const enableEditable = ref(true)
const dirtyCount = ref(0)
const density = ref<TableSize>('default')

const assignees = [
  { id: 1, name: '林舟', team: 'Platform Team' },
  { id: 2, name: '周宁', team: 'UI Team' },
  { id: 3, name: '陈墨', team: 'Ops Team' }
]

const columns: TableColumn[] = [
  { key: 'component', label: '组件', minWidth: 180, searchable: true, fixed: 'left' },
  {
    key: 'category',
    label: '分类',
    width: 120,
    type: 'tag',
    options: [
      { label: 'Display', value: 'Display', type: 'primary' },
      { label: 'Input', value: 'Input', type: 'success' },
      { label: 'Feedback', value: 'Feedback', type: 'warning' }
    ]
  },
  {
    key: 'status',
    label: '状态',
    width: 120,
    type: 'tag',
    options: [
      { label: 'stable', value: 'stable', type: 'success' },
      { label: 'beta', value: 'beta', type: 'warning' },
      { label: 'deprecated', value: 'deprecated', type: 'danger' }
    ]
  },
  { key: 'owner', label: '负责人', width: 140, searchable: true },
  { key: 'note', label: '备注', minWidth: 180, type: 'input', editable: true, placeholder: '输入备注' },
  {
    key: 'priority',
    label: '优先级',
    width: 120,
    type: 'select',
    editable: true,
    options: [
      { label: 'P0', value: 'P0', type: 'danger' },
      { label: 'P1', value: 'P1', type: 'warning' },
      { label: 'P2', value: 'P2', type: 'info' }
    ]
  },
  {
    key: 'assigneeId',
    label: '经办人',
    width: 140,
    type: 'dropdown',
    editable: true,
    valueKey: 'id',
    labelKey: 'name',
    dialogTitle: '选择经办人',
    dialogColumns: [
      { key: 'name', label: '姓名', minWidth: 120 },
      { key: 'team', label: '团队', minWidth: 180 }
    ],
    dialogData: assignees
  },
  { key: 'usedBy', label: '使用数', width: 100, align: 'right', sortable: true },
  { key: 'updatedAt', label: '更新时间', minWidth: 180, type: 'date', sortable: true },
  { key: 'enabled', label: '启用', width: 100, type: 'boolean' }
]

const rows = ref<DemoRow[]>([
  { id: 1, component: 'XTable', category: 'Display', status: 'stable', owner: 'Platform Team', usedBy: 14, updatedAt: '2026-04-10T09:30:00Z', enabled: true, priority: 'P0', assigneeId: 1, note: '核心表格' },
  { id: 2, component: 'XDialog', category: 'Feedback', status: 'beta', owner: 'UI Team', usedBy: 7, updatedAt: '2026-04-09T13:10:00Z', enabled: true, priority: 'P1', assigneeId: 2, note: '确认交互' },
  { id: 3, component: 'XTabs', category: 'Display', status: 'stable', owner: 'Platform Team', usedBy: 10, updatedAt: '2026-04-08T05:45:00Z', enabled: true, priority: 'P1', assigneeId: 1, note: '页签容器' },
  { id: 4, component: 'XSearchForm', category: 'Input', status: 'beta', owner: 'Ops Team', usedBy: 5, updatedAt: '2026-04-07T11:20:00Z', enabled: true, priority: 'P2', assigneeId: 3, note: '组合查询' },
  { id: 5, component: 'XLegacyGrid', category: 'Display', status: 'deprecated', owner: 'Legacy Team', usedBy: 2, updatedAt: '2026-03-29T02:05:00Z', enabled: false, priority: 'P2', assigneeId: 2, note: '准备下线' },
  { id: 6, component: 'XDrawer', category: 'Display', status: 'stable', owner: 'Platform Team', usedBy: 9, updatedAt: '2026-04-06T08:00:00Z', enabled: true, priority: 'P1', assigneeId: 1, note: '侧边面板' },
  { id: 7, component: 'XForm', category: 'Input', status: 'beta', owner: 'Ops Team', usedBy: 6, updatedAt: '2026-04-05T10:30:00Z', enabled: true, priority: 'P0', assigneeId: 3, note: '表单能力' },
  { id: 8, component: 'XSelect', category: 'Input', status: 'stable', owner: 'UI Team', usedBy: 12, updatedAt: '2026-04-04T06:40:00Z', enabled: true, priority: 'P2', assigneeId: 2, note: '选择器' },
  { id: 9, component: 'XInput', category: 'Input', status: 'stable', owner: 'Platform Team', usedBy: 15, updatedAt: '2026-04-03T07:15:00Z', enabled: true, priority: 'P1', assigneeId: 1, note: '输入框' },
  { id: 10, component: 'XSwitch', category: 'Input', status: 'stable', owner: 'UI Team', usedBy: 11, updatedAt: '2026-04-02T09:55:00Z', enabled: true, priority: 'P2', assigneeId: 2, note: '开关' },
  { id: 11, component: 'XDatePicker', category: 'Input', status: 'beta', owner: 'Ops Team', usedBy: 4, updatedAt: '2026-04-01T05:05:00Z', enabled: true, priority: 'P1', assigneeId: 3, note: '日期选择' },
  { id: 12, component: 'XTag', category: 'Display', status: 'stable', owner: 'Platform Team', usedBy: 13, updatedAt: '2026-03-31T03:45:00Z', enabled: true, priority: 'P2', assigneeId: 1, note: '标签' }
])

const pageSize = computed(() => (compactRows.value ? 5 : 8))

function refreshRows() {
  loading.value = true
  latestEvent.value = '触发刷新'
  window.setTimeout(() => {
    loading.value = false
  }, 360)
}

function handleSelectionChange(selectedRows: Record<string, unknown>[]) {
  selectedCount.value = selectedRows.length
  latestEvent.value = `选择 ${selectedRows.length} 行`
}

function handleRowOrderChange(rowKeys: TableRowKey[]) {
  latestEvent.value = `行顺序：${rowKeys.join(', ')}`
}

function handleColumnOrderChange(columnKeys: string[]) {
  latestEvent.value = `列顺序：${columnKeys.join(', ')}`
}

function handleDirtyChange(changes: unknown[]) {
  dirtyCount.value = changes.length
}

function handleSubmitChanges(payload: { changes: unknown[] }) {
  latestEvent.value = `统一提交 ${payload.changes.length} 项脏数据`
  dirtyCount.value = 0
}

function handleRowDblclick(payload: { rowKey: TableRowKey }) {
  latestEvent.value = `双击行：${payload.rowKey}`
}
</script>

<template>
  <Story title="组件/表格 Table" group="components">
    <Variant title="完整能力">
      <div class="table-story">
        <div class="table-story__controls">
          <label><input v-model="enableSelection" type="checkbox" /> 多选</label>
          <label><input v-model="enablePagination" type="checkbox" /> 分页</label>
          <label><input v-model="enableActions" type="checkbox" /> 操作列</label>
          <label><input v-model="enableRowDrag" type="checkbox" /> 行拖拽</label>
          <label><input v-model="enableColumnDrag" type="checkbox" /> 列拖拽</label>
          <label><input v-model="enableEditable" type="checkbox" /> 可编辑</label>
          <label><input v-model="compactRows" type="checkbox" /> 小分页</label>
          <label>
            密度
            <select v-model="density">
              <option value="large">宽松</option>
              <option value="default">标准</option>
              <option value="small">紧凑</option>
            </select>
          </label>
          <ElTag type="info" effect="plain">已选 {{ selectedCount }} 行</ElTag>
          <ElTag type="warning" effect="plain">脏数据 {{ dirtyCount }} 项</ElTag>
          <ElTag effect="plain">{{ latestEvent }}</ElTag>
        </div>

        <div class="table-story__fill">
          <XTable
            title="组件使用情况"
            :columns="columns"
            :data="rows"
            row-key="id"
            :loading="loading"
            searchable
            :selectable="enableSelection"
            show-index
            show-metrics
            fill-height
            :editable="enableEditable"
            v-model:density="density"
            :show-pagination="enablePagination"
            :show-actions="enableActions"
            :draggable-rows="enableRowDrag"
            :draggable-columns="enableColumnDrag"
            :page-size="pageSize"
            :page-sizes="[5, 8, 12]"
            storage-key="story-x-table"
            @refresh="refreshRows"
            @selection-change="handleSelectionChange"
            @row-order-change="handleRowOrderChange"
            @column-order-change="handleColumnOrderChange"
            @dirty-change="handleDirtyChange"
            @submit-changes="handleSubmitChanges"
            @row-dblclick="handleRowDblclick"
          >
            <template #toolbar-left-extra>
              <ElTag type="success" effect="plain">撑满父元素 / 内部滚动</ElTag>
            </template>

            <template #cell-component="{ row }">
              <strong>{{ row.component }}</strong>
            </template>

            <template #row-actions="{ row }">
              <ElSpace>
                <ElButton size="small" link type="primary">查看 {{ row.component }}</ElButton>
                <ElButton size="small" link type="danger">禁用</ElButton>
              </ElSpace>
            </template>
          </XTable>
        </div>
      </div>
    </Variant>

    <Variant title="简洁表格">
      <XTable
        title="无工具栏操作的简洁表格"
        :columns="columns.slice(0, 4)"
        :data="rows.slice(0, 4)"
        :selectable="false"
        :draggable-rows="false"
        :draggable-columns="false"
        :show-pagination="false"
        :show-actions="false"
      />
    </Variant>

    <Variant title="空态图片">
      <div style="height: 360px">
        <XTable
          title="暂无数据的表格"
          :columns="columns.slice(0, 4)"
          :data="[]"
          fill-height
          :selectable="false"
          :draggable-rows="false"
          :draggable-columns="false"
          :show-pagination="false"
          empty-text="没有匹配的数据"
          empty-image=""
        />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.table-story {
  display: grid;
  gap: 14px;
}

.table-story__controls {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
}

.table-story__fill {
  border: 1px solid #d7e3ee;
  border-radius: 10px;
  height: 560px;
  padding: 12px;
}
</style>

