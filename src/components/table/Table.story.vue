<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { XDialog } from '../dialog'
import { XRadio } from '../radio'
import { XSwitch } from '../switch'
import { XTable } from './index'
import type { TableColumn, TableColumnSetting, TableReorderPosition, TableRowReorderPayload, TableSelectionMode } from './src/types'
import '../../styles/index.css'

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
  { id: 6, component: 'XSwitch', category: 'Input', owner: 'Platform Team', count: 11, updatedAt: '2026-04-01' }
])

const columns: TableColumn[] = [
  { key: 'component', label: '组件', minWidth: 180 },
  { key: 'category', label: '分类', width: 140 },
  { key: 'owner', label: '负责人', minWidth: 160 },
  { key: 'count', label: '使用数', width: 110, align: 'right', formatter: (value) => `${value} 次` },
  { key: 'updatedAt', label: '更新时间', width: 140 }
]

const parentState = reactive({
  width: 800,
  height: 320,
  autoWidth: false,
  autoHeight: false,
  fillHeight: true,
  selectable: true,
  showSelectionColumn: true,
  editable: false,
  selectionMode: 'row' as TableSelectionMode,
  rowDraggable: true
})
const settingsDialogVisible = ref(false)
const selectedRowKeys = ref<string[]>([])
const selectedCellKeys = ref<string[]>([])
const draggingColumnSettingKey = ref<string | null>(null)
const dragOverColumnSettingKey = ref<string | null>(null)
const columnSettingDragOverPosition = ref<TableReorderPosition>('after')

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

function getColumnLabel(key: string) {
  return columns.find((column) => column.key === key)?.label ?? key
}

function updateSettingNumber(
  updateColumnSetting: (key: string, setting: Partial<TableColumnSetting>) => void,
  key: string,
  field: 'width' | 'widthRatio',
  event: Event
) {
  const value = (event.target as HTMLInputElement).value
  updateColumnSetting(key, { [field]: value === '' ? undefined : Number(value) })
}

function updateSettingAlign(
  updateColumnSetting: (key: string, setting: Partial<TableColumnSetting>) => void,
  key: string,
  value: string | number | boolean
) {
  updateColumnSetting(key, { align: value as TableColumnSetting['align'] })
}

function updateSettingFixed(
  updateColumnSetting: (key: string, setting: Partial<TableColumnSetting>) => void,
  key: string,
  value: string | number | boolean
) {
  updateColumnSetting(key, { fixed: value as TableColumnSetting['fixed'] })
}

function startColumnSettingDrag(key: string, event: DragEvent) {
  draggingColumnSettingKey.value = key
  dragOverColumnSettingKey.value = null
  columnSettingDragOverPosition.value = 'after'
  event.dataTransfer?.setData('text/plain', key)
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

function updateColumnSettingDragTarget(key: string, event: DragEvent) {
  if (!draggingColumnSettingKey.value || draggingColumnSettingKey.value === key) {
    return
  }

  event.preventDefault()
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const midpoint = rect.top + rect.height / 2
  dragOverColumnSettingKey.value = key
  columnSettingDragOverPosition.value = event.clientY < midpoint ? 'before' : 'after'
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

function dropColumnSetting(
  reorderColumnSetting: (key: string, targetKey: string, position: TableReorderPosition) => void,
  key: string,
  event: DragEvent
) {
  if (!draggingColumnSettingKey.value) {
    return
  }

  event.preventDefault()
  reorderColumnSetting(draggingColumnSettingKey.value, key, columnSettingDragOverPosition.value)
  resetColumnSettingDrag()
}

function isColumnSettingDragOver(key: string, position: TableReorderPosition) {
  return dragOverColumnSettingKey.value === key && columnSettingDragOverPosition.value === position
}

function resetColumnSettingDrag() {
  draggingColumnSettingKey.value = null
  dragOverColumnSettingKey.value = null
  columnSettingDragOverPosition.value = 'after'
}

function handleRowReorder(payload: TableRowReorderPayload) {
  rows.value = payload.rows as DemoRow[]
}

function updateSelectionMode(value: string | number | boolean) {
  parentState.selectionMode = value as TableSelectionMode
}

</script>

<template>
  <Story title="组件/表格 Table" group="components">
    <Variant title="父元素尺寸交互">
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
          <label>
            <input v-model="parentState.rowDraggable" type="checkbox" />
            <span>行拖拽排序</span>
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
            :show-selection="parentState.selectable"
            :show-selection-column="parentState.showSelectionColumn"
            :editable="parentState.editable"
            :selection-mode="parentState.selectionMode"
            :row-draggable="parentState.rowDraggable"
            @row-reorder="handleRowReorder"
          >
            <template #top="{ columnSettings, updateColumnSetting, reorderColumnSetting, resetColumnSettings }">
              <div class="table-story__topbar">
                <button type="button" @click="settingsDialogVisible = true">列设置</button>
              </div>

              <XDialog
                v-model="settingsDialogVisible"
                title="列设置"
                :width="900"
                :height="560"
                :min-width="680"
                :min-height="420"
              >
                <div class="table-story__settings" @mouseup="resetColumnSettingDrag" @mouseleave="resetColumnSettingDrag">
                  <div class="table-story__setting-header" aria-hidden="true">
                    <span></span>
                    <span>列名</span>
                    <span>冻结</span>
                    <span>对齐</span>
                    <span>比例%</span>
                    <span>宽度px</span>
                  </div>
                  <div
                    v-for="setting in columnSettings"
                    :key="setting.key"
                    class="table-story__setting-row"
                    :class="{
                      'is-dragging': draggingColumnSettingKey === setting.key,
                      'is-drag-over-before': isColumnSettingDragOver(setting.key, 'before'),
                      'is-drag-over-after': isColumnSettingDragOver(setting.key, 'after')
                    }"
                    draggable="true"
                    @dragstart="startColumnSettingDrag(setting.key, $event)"
                    @dragover="updateColumnSettingDragTarget(setting.key, $event)"
                    @drop="dropColumnSetting(reorderColumnSetting, setting.key, $event)"
                    @dragend="resetColumnSettingDrag"
                  >
                    <div class="table-story__setting-drag-cell">
                      <button
                        type="button"
                        class="table-story__drag-button"
                        aria-label="拖拽排序"
                        title="拖拽排序"
                        draggable="true"
                        @dragstart="startColumnSettingDrag(setting.key, $event)"
                      >
                        <svg class="table-story__drag-icon" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M5.5 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                        </svg>
                      </button>
                    </div>
                    <span class="table-story__setting-name" title="拖拽排序">{{ getColumnLabel(setting.key) }}</span>
                    <div class="table-story__radio-group">
                      <XRadio
                        :model-value="setting.fixed"
                        value="left"
                        :name="`table-fixed-${setting.key}`"
                        label="左"
                        size="sm"
                        @update:model-value="updateSettingFixed(updateColumnSetting, setting.key, $event)"
                      />
                      <XRadio
                        :model-value="setting.fixed"
                        value="none"
                        :name="`table-fixed-${setting.key}`"
                        label="无"
                        size="sm"
                        @update:model-value="updateSettingFixed(updateColumnSetting, setting.key, $event)"
                      />
                      <XRadio
                        :model-value="setting.fixed"
                        value="right"
                        :name="`table-fixed-${setting.key}`"
                        label="右"
                        size="sm"
                        @update:model-value="updateSettingFixed(updateColumnSetting, setting.key, $event)"
                      />
                    </div>
                    <div class="table-story__radio-group">
                      <XRadio
                        :model-value="setting.align"
                        value="left"
                        :name="`table-align-${setting.key}`"
                        label="左"
                        size="sm"
                        @update:model-value="updateSettingAlign(updateColumnSetting, setting.key, $event)"
                      />
                      <XRadio
                        :model-value="setting.align"
                        value="center"
                        :name="`table-align-${setting.key}`"
                        label="中"
                        size="sm"
                        @update:model-value="updateSettingAlign(updateColumnSetting, setting.key, $event)"
                      />
                      <XRadio
                        :model-value="setting.align"
                        value="right"
                        :name="`table-align-${setting.key}`"
                        label="右"
                        size="sm"
                        @update:model-value="updateSettingAlign(updateColumnSetting, setting.key, $event)"
                      />
                    </div>
                    <label>
                      <input
                        :value="setting.widthRatio ?? ''"
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        placeholder="-"
                        @input="updateSettingNumber(updateColumnSetting, setting.key, 'widthRatio', $event)"
                      />
                    </label>
                    <label>
                      <input
                        :value="setting.width ?? ''"
                        type="number"
                        min="0"
                        step="10"
                        placeholder="-"
                        @input="updateSettingNumber(updateColumnSetting, setting.key, 'width', $event)"
                      />
                    </label>
                  </div>
                </div>

                <template #footer>
                  <div class="table-story__dialog-footer">
                    <button type="button" @click="resetColumnSettings">重置</button>
                    <button type="button" @click="settingsDialogVisible = false">关闭</button>
                  </div>
                </template>
              </XDialog>
            </template>

            <template #bottom="{ data }">
              <div class="table-story__footer">
                <span class="table-story__total">共 {{ data.length }} 条记录</span>
                <span class="table-story__selected">{{ selectedText }}</span>
              </div>
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

.table-story__topbar {
  align-items: center;
  display: flex;
  justify-content: flex-end;
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

.table-story__selected {
  color: #64748b;
  font-size: 13px;
}

.table-story__topbar button,
.table-story__dialog-footer button {
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #334155;
  cursor: pointer;
  min-height: 28px;
  padding: 0 8px;
}

.table-story__dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.table-story__settings {
  display: grid;
  gap: 0;
  min-width: 680px;
  overflow-x: auto;
}

.table-story__setting-header,
.table-story__setting-row {
  grid-template-columns: 36px minmax(90px, 1fr) 132px 180px 80px 80px;
}

.table-story__setting-header {
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px 6px 0 0;
  color: #475569;
  display: grid;
  font-size: 12px;
  font-weight: 600;
  gap: 8px;
  min-height: 34px;
  padding: 0 10px;
  position: sticky;
  top: 0;
  z-index: 1;
}

.table-story__setting-header span {
  min-width: 0;
  text-align: center;
}

.table-story__setting-header span:first-child {
  text-align: center;
}

.table-story__setting-header span:nth-child(2) {
  text-align: left;
}

.table-story__setting-row {
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  display: grid;
  gap: 8px;
  min-height: 52px;
  padding: 8px 10px;
  position: relative;
  transition:
    background-color 140ms ease,
    box-shadow 140ms ease,
    margin 140ms ease,
    opacity 140ms ease,
    transform 140ms ease;
}

.table-story__setting-row:last-child {
  border-radius: 0 0 6px 6px;
}

.table-story__setting-row.is-dragging {
  opacity: 0.48;
  transform: scale(0.998);
}

.table-story__setting-row.is-drag-over-before,
.table-story__setting-row.is-drag-over-after {
  background: #f0f9ff;
  box-shadow: 0 4px 14px rgb(15 23 42 / 10%);
}

.table-story__setting-row.is-drag-over-before {
  margin-top: 10px;
}

.table-story__setting-row.is-drag-over-after {
  margin-bottom: 10px;
}

.table-story__setting-row.is-drag-over-before::before,
.table-story__setting-row.is-drag-over-after::after {
  background: var(--x-color-primary, #155e75);
  border-radius: 999px;
  content: "";
  height: 2px;
  left: 10px;
  pointer-events: none;
  position: absolute;
  right: 10px;
}

.table-story__setting-row.is-drag-over-before::before {
  top: -6px;
}

.table-story__setting-row.is-drag-over-after::after {
  bottom: -6px;
}

.table-story__setting-drag-cell {
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

.table-story__drag-button {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: #94a3b8;
  cursor: grab;
  display: inline-flex;
  height: 28px;
  justify-content: center;
  padding: 0;
  width: 28px;
}

.table-story__drag-button:active {
  cursor: grabbing;
}

.table-story__setting-row.is-dragging .table-story__drag-button,
.table-story__setting-row.is-dragging .table-story__setting-name {
  cursor: grabbing;
}

.table-story__drag-button:hover {
  background: #eef2f7;
  color: #475569;
}

.table-story__drag-icon {
  fill: currentColor;
  height: 16px;
  width: 16px;
}

.table-story__setting-name {
  color: #0f172a;
  cursor: grab;
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-story__setting-row label {
  align-items: center;
  color: #334155;
  display: inline-flex;
  font-size: 12px;
  gap: 4px;
  justify-content: center;
}

.table-story__radio-group {
  align-items: center;
  color: #334155;
  display: inline-flex;
  font-size: 12px;
  gap: 6px;
  justify-content: center;
  min-width: 0;
}

.table-story__radio-group :deep(.x-radio) {
  font-size: 12px;
}

.table-story__setting-row input {
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  color: #0f172a;
  min-height: 28px;
  padding: 0 6px;
}

.table-story__setting-row input {
  width: 72px;
}

</style>
