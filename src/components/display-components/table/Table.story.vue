<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { XInputNumber } from '../../form-components/input-number'
import { XRadio } from '../../form-components/radio'
import { XSelect } from '../../form-components/select'
import type { SelectOptionValue } from '../../form-components/select'
import { XSwitch } from '../../form-components/switch'
import { XTable } from './index'
import type {
  TableColumn,
  TableColumnResizePayload,
  TableColumnSettingsDialogMode,
  TablePaginationChangePayload,
  TablePaginationMode,
  TableRowClickPayload,
  TableRowReorderPayload,
  TableSelectionMode
} from './src/types'
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
  { key: 'count', label: '使用数', width: 110, align: 'right', formatter: (value) => `${value} 次` },
  { key: 'updatedAt', label: '更新时间', width: 140 }
]

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
  fillHeight: true,
  selectable: true,
  showActions: true,
  actionsFixed: true,
  actionsWidth: 160,
  showSelectionColumn: true,
  editable: false,
  columnResizable: true,
  columnSettingsDialog: 'auto' as TableColumnSettingsDialogMode,
  columnSettingsDialogTitle: '列设置',
  columnSettingsDialogWidth: 760,
  columnSettingsDialogHeight: 620,
  selectionMode: 'row' as TableSelectionMode,
  rowDraggable: true,
  showPagination: true,
  paginationMode: 'client' as TablePaginationMode,
  currentPage: 1,
  pageSize: 4,
  panelBackgroundColor: '#f8fafc',
  topBackgroundColor: '#f0f9ff',
  bottomBackgroundColor: '#f8fafc',
  headerBackgroundColor: '#e0f2fe',
  headerTextColor: '#0f172a',
  bodyBackgroundColor: '#ffffff',
  bodyStripeBackgroundColor: 'transparent',
  bodyTextColor: '#1f2937',
  selectedCellBackgroundColor: 'rgb(59 130 246 / 12%)',
  selectedCellTextColor: '#1f2937',
  selectedCellBorderColor: '#1264f4',
  selectedCellInnerBorderColor: 'rgba(18, 100, 244, 0.45)',
  borderColor: '#bfdbfe',
  viewportBorderColor: '',
  headerDividerColor: '',
  rowBorderColor: '',
  columnBorderColor: '',
  horizontalBorderColor: '#bfdbfe',
  horizontalBorderWidth: 1,
  verticalBorderColor: '#cbd5e1',
  verticalBorderWidth: 1
})
const selectedRowKeys = ref<string[]>([])
const selectedCellKeys = ref<string[]>([])
const rowEventText = ref('尚未触发行事件')

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

function handleRowClick(payload: TableRowClickPayload) {
  rowEventText.value = `单击第 ${payload.rowIndex + 1} 行：${payload.row.component}`
}

function handleRowDoubleClick(payload: TableRowClickPayload) {
  rowEventText.value = `双击第 ${payload.rowIndex + 1} 行：${payload.row.component}`
}

function handleColumnResize(payload: TableColumnResizePayload) {
  rowEventText.value = `调整列宽：${payload.column.label} ${Math.round(payload.width)}px`
}

function handlePaginationChange(payload: TablePaginationChangePayload) {
  parentState.currentPage = payload.currentPage
  parentState.pageSize = payload.pageSize
  rowEventText.value = `${payload.mode === 'server' ? '服务器' : '客户端'}分页：第 ${payload.currentPage} 页，每页 ${payload.pageSize} 条`
}

function handleExcelExport(payload: { mode: 'raw' | 'formatted' }) {
  rowEventText.value = payload.mode === 'formatted' ? '已导出格式化文字 Excel' : '已导出默认表格数据 Excel'
}

function handleExcelImport(payload: { rows: Record<string, unknown>[] }) {
  rows.value = payload.rows as DemoRow[]
  rowEventText.value = `已导入 Excel：${payload.rows.length} 条`
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

function updatePaginationMode(value: string | number | boolean) {
  parentState.paginationMode = value as TablePaginationMode
}

function updateColumnSettingsDialogMode(value: string | number | boolean) {
  parentState.columnSettingsDialog = value as TableColumnSettingsDialogMode
}

</script>

<template>
  <Story title="展示组件/表格 Table" group="components">
    <Variant title="外观接口">
      <div class="table-story__playground">
        <div class="table-story__controls">
          <label>
            <span>父元素宽度</span>
            <input
              v-model.number="parentState.width"
              type="number"
              min="320"
              max="960"
              step="20"
              :disabled="parentState.autoWidth"
            />
          </label>
          <label>
            <span>父元素高度</span>
            <input
              v-model.number="parentState.height"
              type="number"
              min="180"
              max="520"
              step="20"
              :disabled="parentState.autoHeight"
            />
          </label>
          <label>
            <input v-model="parentState.autoHeight" type="checkbox" />
            <span>父元素高度自适应</span>
          </label>
          <label>
            <input v-model="parentState.autoWidth" type="checkbox" />
            <span>父元素宽度自适应</span>
          </label>
          <label>
            <input v-model="parentState.fillHeight" type="checkbox" />
            <span>撑满父元素高度</span>
          </label>
          <div class="table-story__control-item">
            <span>表格可选</span>
            <XSwitch v-model="parentState.selectable" size="sm" />
          </div>
          <div class="table-story__control-item">
            <span>操作列</span>
            <XSwitch v-model="parentState.showActions" size="sm" />
          </div>
          <div class="table-story__control-item" :class="{ 'is-disabled': !parentState.showActions }">
            <span>操作列冻结</span>
            <XSwitch v-model="parentState.actionsFixed" size="sm" :disabled="!parentState.showActions" />
          </div>
          <label>
            <span>操作列宽度</span>
            <input
              v-model.number="parentState.actionsWidth"
              type="number"
              min="96"
              max="260"
              step="8"
              :disabled="!parentState.showActions"
            />
          </label>
          <div class="table-story__control-item" :class="{ 'is-disabled': !parentState.selectable }">
            <span>选择模式</span>
            <XRadio
              :model-value="parentState.selectionMode"
              value="row"
              label="行选"
              name="table-selection-mode"
              size="sm"
              :disabled="!parentState.selectable"
              @update:model-value="updateSelectionMode"
            />
            <XRadio
              :model-value="parentState.selectionMode"
              value="cell"
              label="单元格选择"
              name="table-selection-mode"
              size="sm"
              :disabled="!parentState.selectable"
              @update:model-value="updateSelectionMode"
            />
          </div>
          <div
            class="table-story__control-item"
            :class="{ 'is-disabled': !parentState.selectable }"
          >
            <span>选择行列</span>
            <XSwitch
              v-model="parentState.showSelectionColumn"
              size="sm"
              :disabled="!parentState.selectable"
            />
          </div>
          <div class="table-story__control-item">
            <span>可编辑</span>
            <XSwitch v-model="parentState.editable" size="sm" />
          </div>
          <div class="table-story__control-item">
            <span>列宽拖拽</span>
            <XSwitch v-model="parentState.columnResizable" size="sm" />
          </div>
          <div class="table-story__control-item">
            <span>列设置弹窗</span>
            <XRadio
              :model-value="parentState.columnSettingsDialog"
              value="auto"
              label="自动"
              name="table-column-settings-dialog"
              size="sm"
              @update:model-value="updateColumnSettingsDialogMode"
            />
            <XRadio
              :model-value="parentState.columnSettingsDialog"
              :value="true"
              label="强制"
              name="table-column-settings-dialog"
              size="sm"
              @update:model-value="updateColumnSettingsDialogMode"
            />
            <XRadio
              :model-value="parentState.columnSettingsDialog"
              :value="false"
              label="关闭"
              name="table-column-settings-dialog"
              size="sm"
              @update:model-value="updateColumnSettingsDialogMode"
            />
          </div>
          <label class="table-story__style-control">
            <span>弹窗标题</span>
            <input v-model="parentState.columnSettingsDialogTitle" type="text" />
          </label>
          <label>
            <span>弹窗宽度</span>
            <input v-model.number="parentState.columnSettingsDialogWidth" type="number" min="640" max="1200" step="20" />
          </label>
          <label>
            <span>弹窗高度</span>
            <input v-model.number="parentState.columnSettingsDialogHeight" type="number" min="460" max="900" step="20" />
          </label>
          <label>
            <input v-model="parentState.rowDraggable" type="checkbox" />
            <span>行拖拽排序</span>
          </label>
          <div class="table-story__control-item">
            <span>分页</span>
            <XSwitch v-model="parentState.showPagination" size="sm" />
          </div>
          <div class="table-story__control-item" :class="{ 'is-disabled': !parentState.showPagination }">
            <span>分页模式</span>
            <XRadio
              :model-value="parentState.paginationMode"
              value="client"
              label="客户端"
              name="table-pagination-mode"
              size="sm"
              :disabled="!parentState.showPagination"
              @update:model-value="updatePaginationMode"
            />
            <XRadio
              :model-value="parentState.paginationMode"
              value="server"
              label="服务器"
              name="table-pagination-mode"
              size="sm"
              :disabled="!parentState.showPagination"
              @update:model-value="updatePaginationMode"
            />
          </div>
          <label class="table-story__style-control">
            <span>面板背景</span>
            <input v-model="parentState.panelBackgroundColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>表顶背景</span>
            <input v-model="parentState.topBackgroundColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>表底背景</span>
            <input v-model="parentState.bottomBackgroundColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>表头背景</span>
            <input v-model="parentState.headerBackgroundColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>表头文字</span>
            <input v-model="parentState.headerTextColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>内容背景</span>
            <input v-model="parentState.bodyBackgroundColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>斑马纹背景</span>
            <input v-model="parentState.bodyStripeBackgroundColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>内容文字</span>
            <input v-model="parentState.bodyTextColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>选区背景</span>
            <input v-model="parentState.selectedCellBackgroundColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>选区文字</span>
            <input v-model="parentState.selectedCellTextColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>选区边框</span>
            <input v-model="parentState.selectedCellBorderColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>选区内线</span>
            <input v-model="parentState.selectedCellInnerBorderColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>统一边框色</span>
            <input v-model="parentState.borderColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>外框色</span>
            <input v-model="parentState.viewportBorderColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>表头底线色</span>
            <input v-model="parentState.headerDividerColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>行线色</span>
            <input v-model="parentState.rowBorderColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>列线色</span>
            <input v-model="parentState.columnBorderColor" type="text" />
          </label>
          <label class="table-story__style-control">
            <span>横线颜色</span>
            <input v-model="parentState.horizontalBorderColor" type="text" />
          </label>
          <label>
            <span>横线宽度</span>
            <input v-model.number="parentState.horizontalBorderWidth" type="number" min="0" max="8" step="1" />
          </label>
          <label class="table-story__style-control">
            <span>竖线颜色</span>
            <input v-model="parentState.verticalBorderColor" type="text" />
          </label>
          <label>
            <span>竖线宽度</span>
            <input v-model.number="parentState.verticalBorderWidth" type="number" min="0" max="8" step="1" />
          </label>
        </div>

        <div class="table-story__parent" :style="parentStyle">
          <XTable
            v-model:data="rows"
            v-model:selected-row-keys="selectedRowKeys"
            v-model:selected-cell-keys="selectedCellKeys"
            :columns="columns"
            row-key="id"
            :fill-height="parentState.fillHeight"
            :show-actions="parentState.showActions"
            :actions-fixed="parentState.actionsFixed"
            :actions-width="parentState.actionsWidth"
            :show-selection="parentState.selectable"
            :show-selection-column="parentState.showSelectionColumn"
            :editable="parentState.editable"
            :column-resizable="parentState.columnResizable"
            show-column-settings
            :column-settings-dialog="parentState.columnSettingsDialog"
            :column-settings-dialog-title="parentState.columnSettingsDialogTitle"
            :column-settings-dialog-width="parentState.columnSettingsDialogWidth"
            :column-settings-dialog-height="parentState.columnSettingsDialogHeight"
            :selection-mode="parentState.selectionMode"
            :row-draggable="parentState.rowDraggable"
            :show-pagination="parentState.showPagination"
            :pagination-mode="parentState.paginationMode"
            :current-page="parentState.currentPage"
            :page-size="parentState.pageSize"
            :total="parentState.paginationMode === 'server' ? 23 : rows.length"
            :page-sizes="[4, 8, 12]"
            :panel-background-color="parentState.panelBackgroundColor"
            :top-background-color="parentState.topBackgroundColor"
            :bottom-background-color="parentState.bottomBackgroundColor"
            :header-background-color="parentState.headerBackgroundColor"
            :header-text-color="parentState.headerTextColor"
            :body-background-color="parentState.bodyBackgroundColor"
            :body-stripe-background-color="parentState.bodyStripeBackgroundColor"
            :body-text-color="parentState.bodyTextColor"
            :selected-cell-background-color="parentState.selectedCellBackgroundColor"
            :selected-cell-text-color="parentState.selectedCellTextColor"
            :selected-cell-border-color="parentState.selectedCellBorderColor"
            :selected-cell-inner-border-color="parentState.selectedCellInnerBorderColor"
            :border-color="parentState.borderColor"
            :viewport-border-color="parentState.viewportBorderColor || undefined"
            :header-divider-color="parentState.headerDividerColor || undefined"
            :row-border-color="parentState.rowBorderColor || undefined"
            :column-border-color="parentState.columnBorderColor || undefined"
            :horizontal-border-color="parentState.horizontalBorderColor"
            :horizontal-border-width="parentState.horizontalBorderWidth"
            :vertical-border-color="parentState.verticalBorderColor"
            :vertical-border-width="parentState.verticalBorderWidth"
            @row-click="handleRowClick"
            @row-dblclick="handleRowDoubleClick"
            @column-resize="handleColumnResize"
            @row-reorder="handleRowReorder"
            @pagination-change="handlePaginationChange"
            @excel-export="handleExcelExport"
            @excel-import="handleExcelImport"
          >
            <template #editor-category="{ modelValue, updateModelValue, commitValue }">
              <XSelect
                class="table-story__category-editor"
                :model-value="modelValue"
                :options="categoryOptions"
                size="sm"
                auto-height
                :show-active-border="false"
                @update:model-value="updateCategoryValue($event, updateModelValue)"
                @change="commitCategoryValue($event, commitValue)"
              />
            </template>

            <template #editor-count="{ modelValue, updateModelValue, commitValue }">
              <XInputNumber
                class="table-story__count-editor"
                :model-value="getEditorNumberValue(modelValue)"
                :min="0"
                :border-radius="0"
               
                :show-active-border="false"
                @update:model-value="updateModelValue"
                @change="commitValue"
              />
            </template>

            <template #row-actions="{ row }">
              <div class="table-story__actions">
                <button type="button" @click.stop="rowEventText = `查看 ${row.component}`">查看</button>
                <button type="button" @click.stop="rowEventText = `编辑 ${row.component}`">编辑</button>
              </div>
            </template>

            <template #bottom="{ data, visibleData, pagination }">
              <div class="table-story__footer">
                <span class="table-story__total">共 {{ data.length }} 条记录 / 当前 {{ visibleData.length }} 条</span>
                <span class="table-story__selected">第 {{ pagination.currentPage }} / {{ pagination.pageCount }} 页</span>
                <span class="table-story__selected">{{ selectedText }}</span>
                <span class="table-story__event">{{ rowEventText }}</span>
              </div>
            </template>
          </XTable>
        </div>

        <div class="table-story__dark-demo">
          <XTable
            :columns="columns"
            :data="rows.slice(0, 4)"
            row-key="id"
            show-column-settings
            show-selection
            selection-mode="cell"
            :selected-cell-keys="['1::component', '1::category', '2::component', '2::category']"
            panel-background-color="#111827"
            top-background-color="#111827"
            bottom-background-color="#111827"
            header-background-color="#172033"
            header-text-color="#dbeafe"
            body-background-color="#0b1220"
            body-stripe-background-color="#10192c"
            body-text-color="#e5e7eb"
            border-color="#334155"
            viewport-border-color="#64748b"
            header-divider-color="#38bdf8"
            row-border-color="#1d4ed8"
            column-border-color="#7c3aed"
            horizontal-border-color="#334155"
            vertical-border-color="#334155"
            selected-cell-background-color="rgba(59, 130, 246, 0.22)"
            selected-cell-text-color="#f8fafc"
            selected-cell-border-color="#60a5fa"
            selected-cell-inner-border-color="rgba(96, 165, 250, 0.56)"
          >
            <template #top>
              <strong class="table-story__dark-title">暗色主题边框与选区验收</strong>
            </template>
            <template #bottom>
              <span class="table-story__dark-note">外框、表头底线、行线、列线和单元格选区均使用可配置颜色。</span>
            </template>
          </XTable>
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

.table-story__controls {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.table-story__controls label {
  align-items: center;
  color: #334155;
  display: inline-flex;
  font-size: 13px;
  gap: 8px;
}

.table-story__control-item {
  align-items: center;
  color: #334155;
  display: inline-flex;
  font-size: 13px;
  gap: 8px;
}

.table-story__control-item.is-disabled {
  color: #94a3b8;
}

.table-story__controls input[type='number'] {
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

.table-story__controls input[type='number']:disabled {
  background: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
}

.table-story__controls input[type='checkbox'] {
  margin: 0;
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

.table-story__dark-demo {
  background: #020617;
  box-sizing: border-box;
  display: grid;
  max-width: 860px;
  min-height: 280px;
  padding: 12px;
}

.table-story__dark-title {
  color: #e5e7eb;
  font-size: 13px;
}

.table-story__dark-note {
  color: #cbd5e1;
  font-size: 13px;
}

.table-story__footer {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: flex-start;
}

.table-story__total {
  color: #475569;
  font-size: 13px;
  font-weight: 600;
}

.table-story__selected,
.table-story__event {
  color: #64748b;
  font-size: 13px;
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

.table-story__count-editor {
  height: 100%;
  width: 100%;
}

.table-story__category-editor {
  height: 100%;
  width: 100%;
}
</style>
