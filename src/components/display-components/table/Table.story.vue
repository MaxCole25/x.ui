<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XInputNumber } from '../../form-components/input-number'
import { XSelect } from '../../form-components/select'
import type { SelectOptionValue } from '../../form-components/select'
import { XTable } from './index'
import type { TableColumn, TableProps } from './src/types'
import '../../../styles/index.css'

type DemoRow = Record<string, unknown> & {
  id: number
  component: string
  category: string
  owner: string
  count: number
  updatedAt: string
}
const rows: DemoRow[] = [
  { id: 1, component: 'XTable', category: 'Display', owner: 'Platform Team', count: 14, updatedAt: '2026-04-10' },
  { id: 2, component: 'XDialog', category: 'Feedback', owner: 'UI Team', count: 7, updatedAt: '2026-04-09' },
  { id: 3, component: 'XTabs', category: 'Display', owner: 'Platform Team', count: 10, updatedAt: '2026-04-08' },
  { id: 4, component: 'XInput', category: 'Input', owner: 'UI Team', count: 15, updatedAt: '2026-04-03' },
  { id: 5, component: 'XSelect', category: 'Input', owner: 'UI Team', count: 12, updatedAt: '2026-04-02' },
  { id: 6, component: 'XSwitch', category: 'Input', owner: 'Platform Team', count: 11, updatedAt: '2026-04-01' },
  { id: 7, component: 'XTree', category: 'Data', owner: 'Platform Team', count: 8, updatedAt: '2026-03-29' },
  { id: 8, component: 'XUpload', category: 'Form', owner: 'UI Team', count: 6, updatedAt: '2026-03-26' }
]
const columns: TableColumn[] = [
  { key: 'component', label: '组件', minWidth: '12rem' },
  { key: 'category', label: '分类' },
  { key: 'owner', label: '负责人', minWidth: 'calc(8rem + 16px)' },
  { key: 'count', label: '使用数', align: 'right', sortable: true, formatter: (value) => `${value} 次` },
  { key: 'updatedAt', label: '更新时间' }
]
const summaryRow = {
  label: '汇总',
  cells: {
    count: 'sum'
  }
} as const
const categoryOptions = [
  { label: 'Display', value: 'Display' },
  { label: 'Feedback', value: 'Feedback' },
  { label: 'Input', value: 'Input' },
  { label: 'Data', value: 'Data' },
  { label: 'Form', value: 'Form' }
]

const initialProps = {
  columns,
  data: rows.slice(0, 4),
  rowKey: 'id',
  selectedRowKeys: [],
  selectedCellKeys: [],
  columnSettings: [],
  actionsFixed: true,
  showActions: true,
  editable: false,
  editableDataStrategy: 'auto',
  columnResizable: true,
  selectionMode: 'row',
  rowDraggable: true,
  summaryRow
} satisfies TableProps

function getEditorNumberValue(value: string | number | undefined) {
  if (typeof value === 'number') {
    return value
  }
  const next = Number(value)
  return Number.isNaN(next) ? undefined : next
}
function normalizeCategoryValue(value: SelectOptionValue | SelectOptionValue[] | undefined) {
  return Array.isArray(value) ? undefined : value === undefined ? undefined : String(value)
}
function updateCategoryValue(
  value: SelectOptionValue | SelectOptionValue[] | undefined,
  updateModelValue: (value: string | number | undefined) => void
) {
  updateModelValue(normalizeCategoryValue(value))
}
function commitCategoryValue(
  value: SelectOptionValue | SelectOptionValue[] | undefined,
  commitValue: (value: string | number | undefined) => void
) {
  commitValue(normalizeCategoryValue(value))
}
</script>

<template>
  <Story title="展示组件/表格 Table" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XTable" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XTable v-bind="apiProps" :data="apiProps.data as Record<string, unknown>[]" :columns="apiProps.columns as TableColumn[]" v-on="apiEvents" @vue:mounted="captureInstance">
            <template #editor-category="{ modelValue, updateModelValue, commitValue }">
              <XSelect class="table-story__category-editor" :model-value="modelValue" :options="categoryOptions" :font-size="10" auto-height :show-active-border="false" @update:model-value="updateCategoryValue($event, updateModelValue)" @change="commitCategoryValue($event, commitValue)" />
            </template>
            <template #editor-count="{ modelValue, updateModelValue, commitValue }">
              <XInputNumber class="table-story__count-editor" :model-value="getEditorNumberValue(modelValue)" :min="0" :radius="0" :show-active-border="false" @update:model-value="updateModelValue" @change="commitValue" />
            </template>
            <template #row-actions="{ row }">
              <div class="table-story__actions" @click.stop>
                <details><summary>查看</summary><pre>{{ row }}</pre></details>
                <button type="button" @click="apiProps.editable = true">允许编辑</button>
              </div>
            </template>
          </XTable>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.table-story__actions { display: flex; align-items: center; gap: 8px; }
.table-story__actions pre { white-space: pre-wrap; }
.table-story__category-editor, .table-story__count-editor { width: 100%; }
</style>
