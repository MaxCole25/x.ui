<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { XButton } from '../../basic-components/button'
import { XInputNumber } from '../../form-components/input-number'
import { XPagination } from '../../navigation-components/pagination'
import { XSelect } from '../../form-components/select'
import type { SelectOptionValue } from '../../form-components/select'
import { XSwitch } from '../../form-components/switch'
import { XTable } from './index'
import { XTableColumnSettings } from '../../other-components/table-column-settings'
import type {
  TableColumn,
  TableColumnResizePayload,
  TableColumnSetting,
  TableDirtyChangePayload,
  TableRowClickPayload,
  TableRowReorderPayload,
  TableSavePayload,
  TableSelectionMode
} from './src/types'
import type { XSize } from '../../_utils/size'
import '../../../styles/index.css'

type DemoRow = Record<string, unknown> & {
  id: number
  component: string
  category: string
  owner: string
  count: number
  updatedAt: string
}

const rows = ref<DemoRow[]>([
  { id: 1, component: 'XTable', category: 'Display', owner: 'Platform Team', count: 14, updatedAt: '2026-04-10' },
  { id: 2, component: 'XDialog', category: 'Feedback', owner: 'UI Team', count: 7, updatedAt: '2026-04-09' },
  { id: 3, component: 'XTabs', category: 'Display', owner: 'Platform Team', count: 10, updatedAt: '2026-04-08' },
  { id: 4, component: 'XInput', category: 'Input', owner: 'UI Team', count: 15, updatedAt: '2026-04-03' },
  { id: 5, component: 'XSelect', category: 'Input', owner: 'UI Team', count: 12, updatedAt: '2026-04-02' },
  { id: 6, component: 'XSwitch', category: 'Input', owner: 'Platform Team', count: 11, updatedAt: '2026-04-01' },
  { id: 7, component: 'XTree', category: 'Data', owner: 'Platform Team', count: 8, updatedAt: '2026-03-29' },
  { id: 8, component: 'XUpload', category: 'Form', owner: 'UI Team', count: 6, updatedAt: '2026-03-26' }
])

const columns: TableColumn[] = [
  { key: 'component', label: '组件', minWidth: 180 },
  { key: 'category', label: '分类', width: 140 },
  { key: 'owner', label: '负责人', minWidth: 160 },
  { key: 'count', label: '使用数', width: 110, align: 'right', sortable: true, formatter: (value) => `${value} 次` },
  { key: 'updatedAt', label: '更新时间', width: 140 }
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

const parentState = reactive({
  width: 800,
  height: 320,
  autoWidth: false,
  autoHeight: false,
  fullHeight: true,
  size: 'md' as XSize,
  rowHeight: 40,
  selectable: true,
  showActions: true,
  actionsFixed: true,
  actionsWidth: 160,
  showSelectionColumn: true,
  editable: false,
  showDirtyActions: false,
  columnResizable: true,
  selectionMode: 'row' as TableSelectionMode,
  rowDraggable: true,
  page: 1,
  pageSize: 4,
  panelBackgroundColor: '',
  headerBackgroundColor: '',
  headerTextColor: '',
  bodyBackgroundColor: '',
  bodyStripeBackgroundColor: '',
  bodyTextColor: '',
  selectedCellBackgroundColor: '',
  selectedCellTextColor: '',
  selectedCellBorderColor: '',
  selectedCellInnerBorderColor: '',
  borderColor: '',
  viewportBorderColor: '',
  headerDividerColor: '',
  rowBorderColor: '',
  columnBorderColor: '',
  horizontalBorderColor: '',
  horizontalBorderWidth: 1,
  verticalBorderColor: '',
  verticalBorderWidth: 1
})

const selectedRowKeys = ref<string[]>([])
const selectedCellKeys = ref<string[]>([])
const columnSettings = ref<TableColumnSetting[]>([])
const rowEventText = ref('尚未触发行事件')

const pagedRows = computed(() => {
  const start = (parentState.page - 1) * parentState.pageSize
  return rows.value.slice(start, start + parentState.pageSize)
})

const parentStyle = computed(() => ({
  width: parentState.autoWidth ? '100%' : `${parentState.width}px`,
  height: parentState.autoHeight ? 'auto' : `${parentState.height}px`
}))

const selectedText = computed(() => {
  if (!parentState.selectable) {
    return '未开启选择'
  }
  if (parentState.selectionMode === 'cell' && parentState.showSelectionColumn) {
    return `已选 ${selectedRowKeys.value.length} 行 / ${selectedCellKeys.value.length} 个单元格`
  }
  return parentState.selectionMode === 'row' ? `已选 ${selectedRowKeys.value.length} 行` : `已选 ${selectedCellKeys.value.length} 个单元格`
})

function handleRowReorder(payload: TableRowReorderPayload) {
  rows.value = payload.rows as DemoRow[]
}

function handleTableDataUpdate(value: Record<string, unknown>[]) {
  const start = (parentState.page - 1) * parentState.pageSize
  rows.value = [
    ...rows.value.slice(0, start),
    ...(value as DemoRow[]),
    ...rows.value.slice(start + parentState.pageSize)
  ]
}

function handleRowClick(payload: TableRowClickPayload) {
  rowEventText.value = `单击第 ${payload.rowIndex + 1} 行：${payload.row.component}`
}

function handleRowDoubleClick(payload: TableRowClickPayload) {
  rowEventText.value = `双击第 ${payload.rowIndex + 1} 行：${payload.row.component}`
}

function handleColumnResize(payload: TableColumnResizePayload) {
  rowEventText.value = `调整列宽：${payload.column.label} ${Math.round(payload.width)}px`
}

function handleExcelExport(payload: { mode: 'raw' | 'formatted' }) {
  rowEventText.value = payload.mode === 'formatted' ? '已导出格式化文字 Excel' : '已导出默认表格数据 Excel'
}

function handleExcelImport(payload: { rows: Record<string, unknown>[] }) {
  rows.value = payload.rows as DemoRow[]
  rowEventText.value = `已导入 Excel：${payload.rows.length} 条`
}

function handleDirtyChange(payload: TableDirtyChangePayload) {
  rowEventText.value = `脏单元格：${payload.changes.length} 个`
}

function handleSave(payload: TableSavePayload) {
  rowEventText.value = `保存修改：${payload.changes.length} 个单元格 / ${payload.dirtyRows.length} 行`
}

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

function updateSelectionMode(value: string | number | boolean) {
  parentState.selectionMode = value as TableSelectionMode
}

function updateSize(value: string | number | boolean) {
  parentState.size = value as XSize
}

function updateSelectionModeFromEvent(event: Event) {
  updateSelectionMode((event.target as HTMLSelectElement).value)
}

function updateSizeFromEvent(event: Event) {
  updateSize((event.target as HTMLSelectElement).value)
}
</script>

<template>
  <Story title="展示组件/表格 Table" group="components">
    <Variant title="外观接口">
      <div class="table-story__playground">
        <div class="table-story__controls">
          <label><span>父元素宽度</span><input v-model.number="parentState.width" type="number" min="320" max="960" step="20" :disabled="parentState.autoWidth" /></label>
          <label><span>父元素高度</span><input v-model.number="parentState.height" type="number" min="180" max="520" step="20" :disabled="parentState.autoHeight" /></label>
          <label><input v-model="parentState.autoHeight" type="checkbox" /><span>父元素高度自适应</span></label>
          <label><input v-model="parentState.autoWidth" type="checkbox" /><span>父元素宽度自适应</span></label>
          <label><input v-model="parentState.fullHeight" type="checkbox" /><span>撑满父元素高度</span></label>
          <div class="table-story__control-item">
            <span>尺寸</span>
            <select :value="parentState.size" @change="updateSizeFromEvent">
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </div>
          <label><span>行高</span><input v-model.number="parentState.rowHeight" type="number" min="12" max="80" step="1" /></label>
          <div class="table-story__control-item"><span>表格可选</span><XSwitch v-model="parentState.selectable" size="sm" /></div>
          <div class="table-story__control-item"><span>操作列</span><XSwitch v-model="parentState.showActions" size="sm" /></div>
          <div class="table-story__control-item" :class="{ 'is-disabled': !parentState.showActions }"><span>操作列冻结</span><XSwitch v-model="parentState.actionsFixed" size="sm" :disabled="!parentState.showActions" /></div>
          <label><span>操作列宽度</span><input v-model.number="parentState.actionsWidth" type="number" min="96" max="260" step="8" :disabled="!parentState.showActions" /></label>
          <div class="table-story__control-item" :class="{ 'is-disabled': !parentState.selectable }">
            <span>选择模式</span>
            <select :value="parentState.selectionMode" :disabled="!parentState.selectable" @change="updateSelectionModeFromEvent">
              <option value="row">行选</option>
              <option value="cell">单元格</option>
            </select>
          </div>
          <div class="table-story__control-item" :class="{ 'is-disabled': !parentState.selectable }"><span>选择行列</span><XSwitch v-model="parentState.showSelectionColumn" size="sm" :disabled="!parentState.selectable" /></div>
          <div class="table-story__control-item"><span>可编辑</span><XSwitch v-model="parentState.editable" size="sm" /></div>
          <div class="table-story__control-item" :class="{ 'is-disabled': !parentState.editable }"><span>脏数据按钮</span><XSwitch v-model="parentState.showDirtyActions" size="sm" :disabled="!parentState.editable" /></div>
          <div class="table-story__control-item"><span>列宽拖拽</span><XSwitch v-model="parentState.columnResizable" size="sm" /></div>
          <label><input v-model="parentState.rowDraggable" type="checkbox" /><span>行拖拽排序</span></label>
          <label class="table-story__style-control"><span>面板背景</span><input v-model="parentState.panelBackgroundColor" type="text" /></label>
          <label class="table-story__style-control"><span>表头背景</span><input v-model="parentState.headerBackgroundColor" type="text" /></label>
          <label class="table-story__style-control"><span>表头文字</span><input v-model="parentState.headerTextColor" type="text" /></label>
          <label class="table-story__style-control"><span>内容背景</span><input v-model="parentState.bodyBackgroundColor" type="text" /></label>
          <label class="table-story__style-control"><span>斑马纹背景</span><input v-model="parentState.bodyStripeBackgroundColor" type="text" /></label>
          <label class="table-story__style-control"><span>内容文字</span><input v-model="parentState.bodyTextColor" type="text" /></label>
          <label class="table-story__style-control"><span>选区背景</span><input v-model="parentState.selectedCellBackgroundColor" type="text" /></label>
          <label class="table-story__style-control"><span>选区文字</span><input v-model="parentState.selectedCellTextColor" type="text" /></label>
          <label class="table-story__style-control"><span>选区边框</span><input v-model="parentState.selectedCellBorderColor" type="text" /></label>
          <label class="table-story__style-control"><span>选区内线</span><input v-model="parentState.selectedCellInnerBorderColor" type="text" /></label>
          <label class="table-story__style-control"><span>统一边框色</span><input v-model="parentState.borderColor" type="text" /></label>
          <label class="table-story__style-control"><span>外框色</span><input v-model="parentState.viewportBorderColor" type="text" /></label>
          <label class="table-story__style-control"><span>表头底线色</span><input v-model="parentState.headerDividerColor" type="text" /></label>
          <label class="table-story__style-control"><span>行线色</span><input v-model="parentState.rowBorderColor" type="text" /></label>
          <label class="table-story__style-control"><span>列线色</span><input v-model="parentState.columnBorderColor" type="text" /></label>
          <label class="table-story__style-control"><span>横线颜色</span><input v-model="parentState.horizontalBorderColor" type="text" /></label>
          <label><span>横线宽度</span><input v-model.number="parentState.horizontalBorderWidth" type="number" min="0" max="8" step="1" /></label>
          <label class="table-story__style-control"><span>竖线颜色</span><input v-model="parentState.verticalBorderColor" type="text" /></label>
          <label><span>竖线宽度</span><input v-model.number="parentState.verticalBorderWidth" type="number" min="0" max="8" step="1" /></label>
        </div>

        <div class="table-story__toolbar">
          <XButton width="auto" @click="rowEventText = '外部工具栏按钮'">外部按钮</XButton>
          <XTableColumnSettings v-model="columnSettings" :columns="columns" />
          <span>{{ selectedText }}</span>
          <span>{{ rowEventText }}</span>
        </div>

        <div class="table-story__parent" :style="parentStyle">
          <XTable
            v-model:selected-row-keys="selectedRowKeys"
            v-model:selected-cell-keys="selectedCellKeys"
            v-model:column-settings="columnSettings"
            :columns="columns"
            :data="pagedRows"
            row-key="id"
            :size="parentState.size"
            :row-height="parentState.rowHeight"
            :full-height="parentState.fullHeight"
            :show-actions="parentState.showActions"
            :actions-fixed="parentState.actionsFixed"
            :actions-width="parentState.actionsWidth"
            :show-selection="parentState.selectable"
            :show-selection-column="parentState.showSelectionColumn"
            :editable="parentState.editable"
            :show-dirty-actions="parentState.showDirtyActions"
            :column-resizable="parentState.columnResizable"
            :selection-mode="parentState.selectionMode"
            :row-draggable="parentState.rowDraggable"
            :summary-row="summaryRow"
            :panel-background-color="parentState.panelBackgroundColor || undefined"
            :header-background-color="parentState.headerBackgroundColor || undefined"
            :header-text-color="parentState.headerTextColor || undefined"
            :body-background-color="parentState.bodyBackgroundColor || undefined"
            :body-stripe-background-color="parentState.bodyStripeBackgroundColor || undefined"
            :body-text-color="parentState.bodyTextColor || undefined"
            :selected-cell-background-color="parentState.selectedCellBackgroundColor || undefined"
            :selected-cell-text-color="parentState.selectedCellTextColor || undefined"
            :selected-cell-border-color="parentState.selectedCellBorderColor || undefined"
            :selected-cell-inner-border-color="parentState.selectedCellInnerBorderColor || undefined"
            :border-color="parentState.borderColor || undefined"
            :viewport-border-color="parentState.viewportBorderColor || undefined"
            :header-divider-color="parentState.headerDividerColor || undefined"
            :row-border-color="parentState.rowBorderColor || undefined"
            :column-border-color="parentState.columnBorderColor || undefined"
            :horizontal-border-color="parentState.horizontalBorderColor || undefined"
            :horizontal-border-width="parentState.horizontalBorderWidth"
            :vertical-border-color="parentState.verticalBorderColor || undefined"
            :vertical-border-width="parentState.verticalBorderWidth"
            @row-click="handleRowClick"
            @row-dblclick="handleRowDoubleClick"
            @update:data="handleTableDataUpdate"
            @column-resize="handleColumnResize"
            @row-reorder="handleRowReorder"
            @excel-export="handleExcelExport"
            @excel-import="handleExcelImport"
            @dirty-change="handleDirtyChange"
            @save="handleSave"
          >
            <template #editor-category="{ modelValue, updateModelValue, commitValue }">
              <XSelect class="table-story__category-editor" :model-value="modelValue" :options="categoryOptions" size="sm" auto-height :show-active-border="false" @update:model-value="updateCategoryValue($event, updateModelValue)" @change="commitCategoryValue($event, commitValue)" />
            </template>
            <template #editor-count="{ modelValue, updateModelValue, commitValue }">
              <XInputNumber class="table-story__count-editor" :model-value="getEditorNumberValue(modelValue)" :min="0" :radius="0" :show-active-border="false" @update:model-value="updateModelValue" @change="commitValue" />
            </template>
            <template #row-actions="{ row }">
              <div class="table-story__actions">
                <button type="button" @click.stop="rowEventText = `查看 ${row.component}`">查看</button>
                <button type="button" @click.stop="rowEventText = `编辑 ${row.component}`">编辑</button>
              </div>
            </template>
          </XTable>
        </div>

        <div class="table-story__pagination">
          <XPagination v-model="parentState.page" v-model:page-size="parentState.pageSize" :total="rows.length" show-page-size :page-sizes="[4, 8, 12]" />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.table-story__playground {
  display: grid;
  gap: 12px;
}

.table-story__controls,
.table-story__toolbar,
.table-story__pagination {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.table-story__controls label,
.table-story__control-item,
.table-story__toolbar,
.table-story__pagination {
  color: #334155;
  font-size: 13px;
}

.table-story__controls label,
.table-story__control-item {
  align-items: center;
  display: inline-flex;
  gap: 8px;
}

.table-story__control-item.is-disabled {
  color: #94a3b8;
}

.table-story__controls input[type='number'],
.table-story__controls select,
.table-story__control-item select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-height: 32px;
  padding: 0 8px;
  width: 96px;
}

.table-story__style-control input[type='text'] {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  color: #0f172a;
  min-height: 32px;
  padding: 0 8px;
  width: 118px;
}

.table-story__controls input:disabled,
.table-story__control-item select:disabled {
  background: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
}

.table-story__parent {
  background: #dcfce7;
  border: 1px dashed #86efac;
  box-sizing: border-box;
  display: grid;
  max-width: 100%;
  overflow: hidden;
  padding: 12px;
}

.table-story__actions {
  display: inline-flex;
  gap: 6px;
  min-width: 0;
}

.table-story__actions button {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 4px;
  color: #1d4ed8;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  padding: 4px 8px;
}

.table-story__count-editor,
.table-story__category-editor {
  height: 100%;
  width: 100%;
}
</style>
