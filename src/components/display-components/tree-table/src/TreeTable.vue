<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import type {
  TreeTableColumn,
  TreeTableExpandChangePayload,
  TreeTableProps,
  TreeTableRowClickPayload,
  TreeTableRowData,
  TreeTableRowInfo,
  TreeTableRowKey,
  TreeTableSelectionChangePayload,
  TreeTableSlots
} from './types'

defineOptions({ name: 'XTreeTable' })

const props = withDefaults(defineProps<TreeTableProps>(), {
  rowKey: 'id',
  childrenKey: 'children',
  treeColumnKey: undefined,
  labelKey: 'label',
  size: 'md',
  showHeader: true,
  showSelection: false,
  selectedRowKeys: undefined,
  expandedRowKeys: undefined,
  defaultExpandedRowKeys: undefined,
  defaultExpandAll: false,
  emptyText: '暂无数据'
})

const emit = defineEmits<{
  (e: 'update:selectedRowKeys', value: string[]): void
  (e: 'selection-change', value: TreeTableSelectionChangePayload): void
  (e: 'update:expandedRowKeys', value: string[]): void
  (e: 'expand-change', value: TreeTableExpandChangePayload): void
  (e: 'row-click', value: TreeTableRowClickPayload): void
}>()

defineSlots<TreeTableSlots>()

type TreeTableCellSlotName = `cell-${string}`
type TreeTableRuntimeSlots = ReturnType<typeof useSlots> & Partial<Record<TreeTableCellSlotName, unknown>>

const slots = useSlots() as TreeTableRuntimeSlots
const internalSelectedRowKeys = ref<string[]>([])
const internalExpandedRowKeys = ref<string[]>([])

const treeColumnKey = computed(() => props.treeColumnKey || props.columns[0]?.key || '')
const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const rowKeyMap = computed(() => {
  const map = new Map<string, TreeTableRowData>()
  walkRows(props.data, (row) => map.set(getRowKey(row), row))
  return map
})
const allExpandableRowKeys = computed(() => {
  const keys: string[] = []
  walkRows(props.data, (row) => {
    if (getChildren(row).length > 0) {
      keys.push(getRowKey(row))
    }
  })
  return keys
})
const activeExpandedRowKeys = computed(() => (props.expandedRowKeys ?? internalExpandedRowKeys.value).map(String))
const activeExpandedRowKeySet = computed(() => new Set(activeExpandedRowKeys.value))
const activeSelectedRowKeys = computed(() => (props.selectedRowKeys ?? internalSelectedRowKeys.value).map(String))
const activeSelectedRowKeySet = computed(() => new Set(activeSelectedRowKeys.value))
const visibleRows = computed<TreeTableRowInfo[]>(() => {
  const rows: TreeTableRowInfo[] = []
  const walk = (items: TreeTableRowData[], depth: number) => {
    items.forEach((row) => {
      const rowKey = getRowKey(row)
      const children = getChildren(row)
      const hasChildren = children.length > 0
      const expanded = hasChildren && activeExpandedRowKeySet.value.has(rowKey)
      rows.push({
        row,
        rowKey,
        rowIndex: rows.length,
        depth,
        expanded,
        hasChildren
      })
      if (expanded) {
        walk(children, depth + 1)
      }
    })
  }
  walk(props.data, 0)
  return rows
})
const gridTemplateColumns = computed(() => {
  const tracks = props.columns.map((column) => formatColumnTrack(column))
  if (props.showSelection) {
    tracks.unshift('36px')
  }
  return tracks.join(' ')
})
const tableStyle = computed<CSSProperties>(() => ({
  '--x-tree-table-row-height': `${sizePreset.value.height}px`,
  '--x-tree-table-font-size': `${sizePreset.value.fontSize}px`,
  '--x-tree-table-cell-padding': sizePreset.value.padding,
  '--x-tree-table-radius': sizePreset.value.radius,
  '--x-tree-table-indent-size': `${Math.max(16, sizePreset.value.height - 8)}px`
}))

watch(
  () => [props.data, props.defaultExpandAll, props.defaultExpandedRowKeys] as const,
  () => {
    if (props.expandedRowKeys !== undefined) {
      return
    }
    internalExpandedRowKeys.value = props.defaultExpandAll
      ? allExpandableRowKeys.value
      : (props.defaultExpandedRowKeys ?? []).map(String)
  },
  { immediate: true, deep: true }
)

watch(
  () => props.expandedRowKeys,
  (value) => {
    if (value !== undefined) {
      internalExpandedRowKeys.value = value.map(String)
    }
  },
  { immediate: true }
)

watch(
  () => props.selectedRowKeys,
  (value) => {
    if (value !== undefined) {
      internalSelectedRowKeys.value = value.map(String)
    }
  },
  { immediate: true }
)

function getRowKey(row: TreeTableRowData) {
  const keyField = props.rowKey || 'id'
  return String(row[keyField] ?? row.id)
}

function getChildren(row: TreeTableRowData) {
  const childrenField = props.childrenKey || 'children'
  const value = row[childrenField]
  return Array.isArray(value) ? value as TreeTableRowData[] : []
}

function walkRows(rows: TreeTableRowData[], callback: (row: TreeTableRowData) => void) {
  rows.forEach((row) => {
    callback(row)
    walkRows(getChildren(row), callback)
  })
}

function formatCssSize(value: number | string) {
  if (typeof value === 'number') {
    return `${value}px`
  }
  const trimmed = value.trim()
  return /^\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed
}

function formatColumnTrack(column: TreeTableColumn) {
  if (column.width !== undefined) {
    return formatCssSize(column.width)
  }
  if (column.minWidth !== undefined) {
    return `minmax(${formatCssSize(column.minWidth)}, 1fr)`
  }
  return column.key === treeColumnKey.value ? 'minmax(160px, 1.1fr)' : 'minmax(120px, 1fr)'
}

function getCellValue(row: TreeTableRowData, column: TreeTableColumn) {
  const value = row[column.key]
  return column.formatter ? column.formatter(value, row) : value
}

function getTreeCellText(row: TreeTableRowData, column: TreeTableColumn) {
  const value = getCellValue(row, column)
  if (value !== undefined && value !== null && String(value) !== '') {
    return value
  }
  const labelField = props.labelKey || 'label'
  return row[labelField] ?? ''
}

function getCellStyle(column: TreeTableColumn): CSSProperties {
  return {
    justifyContent: column.align === 'right' ? 'flex-end' : column.align === 'center' ? 'center' : 'flex-start',
    textAlign: column.align ?? 'left'
  }
}

function isRowSelected(rowKey: string) {
  return activeSelectedRowKeySet.value.has(rowKey)
}

function commitSelectedRowKeys(keys: string[]) {
  if (props.selectedRowKeys === undefined) {
    internalSelectedRowKeys.value = keys
  }
  emit('update:selectedRowKeys', keys)
  emit('selection-change', {
    keys,
    rows: keys.map((key) => rowKeyMap.value.get(key)).filter((row): row is TreeTableRowData => Boolean(row))
  })
}

function handleSelectRow(rowKey: string, checked: boolean) {
  const next = new Set(activeSelectedRowKeys.value)
  if (checked) {
    next.add(rowKey)
  } else {
    next.delete(rowKey)
  }
  commitSelectedRowKeys([...next])
}

function handleSelectRowChange(rowKey: string, event: Event) {
  handleSelectRow(rowKey, Boolean((event.target as HTMLInputElement | null)?.checked))
}

function commitExpandedRowKeys(keys: string[]) {
  if (props.expandedRowKeys === undefined) {
    internalExpandedRowKeys.value = keys
  }
  emit('update:expandedRowKeys', keys)
}

function setRowExpanded(row: TreeTableRowData, expanded: boolean) {
  const rowKey = getRowKey(row)
  const next = new Set(activeExpandedRowKeys.value)
  if (expanded) {
    next.add(rowKey)
  } else {
    next.delete(rowKey)
  }
  const keys = [...next]
  commitExpandedRowKeys(keys)
  emit('expand-change', { row, rowKey, expanded, expandedRowKeys: keys })
}

function toggleRow(rowKey: TreeTableRowKey) {
  const key = String(rowKey)
  const row = rowKeyMap.value.get(key)
  if (!row || getChildren(row).length === 0) {
    return
  }
  setRowExpanded(row, !activeExpandedRowKeySet.value.has(key))
}

function handleToggle(rowInfo: TreeTableRowInfo, event: MouseEvent) {
  event.stopPropagation()
  setRowExpanded(rowInfo.row, !rowInfo.expanded)
}

function handleRowClick(rowInfo: TreeTableRowInfo, event: MouseEvent) {
  emit('row-click', {
    row: rowInfo.row,
    rowKey: rowInfo.rowKey,
    rowIndex: rowInfo.rowIndex,
    event
  })
}

function expandAll() {
  commitExpandedRowKeys(allExpandableRowKeys.value)
}

function collapseAll() {
  commitExpandedRowKeys([])
}

function getExpandedRowKeys() {
  return activeExpandedRowKeys.value
}

function getSlotName(column: TreeTableColumn): TreeTableCellSlotName {
  return `cell-${column.key}`
}

defineExpose({ expandAll, collapseAll, toggleRow, getExpandedRowKeys })
</script>

<template>
  <div class="x-tree-table" :class="`x-tree-table--${mergedSize}`" :style="tableStyle">
    <div v-if="showHeader" class="x-tree-table__row x-tree-table__row--header" :style="{ gridTemplateColumns }" role="row">
      <div v-if="showSelection" class="x-tree-table__cell x-tree-table__cell--selection x-tree-table__cell--header" role="columnheader"></div>
      <div
        v-for="column in columns"
        :key="column.key"
        class="x-tree-table__cell x-tree-table__cell--header"
        :style="getCellStyle(column)"
        role="columnheader"
      >
        <span class="x-tree-table__header-label">{{ column.label }}</span>
      </div>
    </div>

    <div v-if="visibleRows.length" class="x-tree-table__body" role="rowgroup">
      <div
        v-for="rowInfo in visibleRows"
        :key="rowInfo.rowKey"
        class="x-tree-table__row x-tree-table__row--body"
        :class="{ 'is-selected': isRowSelected(rowInfo.rowKey) }"
        :style="{ gridTemplateColumns }"
        role="row"
        @click="handleRowClick(rowInfo, $event)"
      >
        <label v-if="showSelection" class="x-tree-table__cell x-tree-table__cell--selection" @click.stop>
          <input
            class="x-tree-table__checkbox"
            type="checkbox"
            :checked="isRowSelected(rowInfo.rowKey)"
            :aria-label="`选择 ${rowInfo.rowKey}`"
            @change="handleSelectRowChange(rowInfo.rowKey, $event)"
          />
        </label>

        <div
          v-for="column in columns"
          :key="column.key"
          class="x-tree-table__cell"
          :class="{ 'x-tree-table__cell--tree': column.key === treeColumnKey }"
          :style="getCellStyle(column)"
          role="cell"
        >
          <template v-if="column.key === treeColumnKey">
            <span class="x-tree-table__tree-cell" :style="{ paddingLeft: `calc(${rowInfo.depth} * var(--x-tree-table-indent-size, 18px))` }">
              <button
                v-if="rowInfo.hasChildren"
                class="x-tree-table__toggle"
                type="button"
                :aria-expanded="rowInfo.expanded ? 'true' : 'false'"
                @click="handleToggle(rowInfo, $event)"
              >
                <span aria-hidden="true">{{ rowInfo.expanded ? '▾' : '▸' }}</span>
              </button>
              <span v-else class="x-tree-table__toggle-placeholder"></span>
              <span class="x-tree-table__tree-label">
                <slot name="tree-cell" v-bind="rowInfo">{{ getTreeCellText(rowInfo.row, column) }}</slot>
              </span>
            </span>
          </template>
          <template v-else>
            <span class="x-tree-table__cell-text">
              <slot
                v-if="slots[getSlotName(column)]"
                :name="getSlotName(column)"
                :row="rowInfo.row"
                :value="getCellValue(rowInfo.row, column)"
                :column="column"
                :row-index="rowInfo.rowIndex"
              />
              <template v-else>{{ getCellValue(rowInfo.row, column) }}</template>
            </span>
          </template>
        </div>
      </div>
    </div>

    <div v-else class="x-tree-table__empty">{{ emptyText }}</div>
  </div>
</template>

<style scoped>
.x-tree-table {
  background: var(--x-tree-table-background, var(--x-color-surface, #fff));
  border: 1px solid var(--x-tree-table-border-color, var(--x-color-border, #e2e8f0));
  border-radius: var(--x-tree-table-radius, 6px);
  box-sizing: border-box;
  color: var(--x-tree-table-text-color, var(--x-color-text, #1f2937));
  font-size: var(--x-tree-table-font-size, 12px);
  min-width: 0;
  overflow: hidden;
  width: 100%;
}

.x-tree-table__row {
  display: grid;
  min-width: 0;
}

.x-tree-table__row--header {
  background: var(--x-tree-table-header-background, var(--x-color-surface-soft, #f8fafc));
  border-bottom: 1px solid var(--x-tree-table-border-color, var(--x-color-border, #e2e8f0));
  color: var(--x-tree-table-header-text-color, var(--x-color-text, #334155));
  font-weight: 600;
}

.x-tree-table__row--body {
  background: var(--x-tree-table-background, var(--x-color-surface, #fff));
  cursor: default;
}

.x-tree-table__row--body + .x-tree-table__row--body {
  border-top: 1px solid var(--x-tree-table-row-border-color, var(--x-tree-table-border-color, var(--x-color-border, #e2e8f0)));
}

.x-tree-table__row--body:hover {
  background: var(--x-tree-table-row-hover-background, var(--x-color-primary-soft, #f5f8fb));
}

.x-tree-table__row--body.is-selected {
  background: var(--x-tree-table-row-selected-background, #eef6ff);
}

.x-tree-table__cell {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  min-height: var(--x-tree-table-row-height, 30px);
  min-width: 0;
  overflow: hidden;
  padding: var(--x-tree-table-cell-padding, 0 8px);
  white-space: nowrap;
}

.x-tree-table__cell--header {
  min-height: var(--x-tree-table-row-height, 30px);
}

.x-tree-table__header-label,
.x-tree-table__cell-text,
.x-tree-table__tree-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-tree-table__cell--selection {
  justify-content: center;
  padding-left: 6px;
  padding-right: 6px;
}

.x-tree-table__checkbox {
  accent-color: var(--x-color-primary, #1264f4);
  cursor: pointer;
  height: 14px;
  margin: 0;
  width: 14px;
}

.x-tree-table__tree-cell {
  align-items: center;
  box-sizing: border-box;
  display: inline-flex;
  gap: 4px;
  min-width: 0;
  width: 100%;
}

.x-tree-table__toggle,
.x-tree-table__toggle-placeholder {
  align-items: center;
  display: inline-flex;
  flex: 0 0 18px;
  height: 18px;
  justify-content: center;
  width: 18px;
}

.x-tree-table__toggle {
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--x-tree-table-muted-color, var(--x-color-muted, #64748b));
  cursor: pointer;
  font: inherit;
  line-height: 1;
  padding: 0;
}

.x-tree-table__toggle:hover,
.x-tree-table__toggle:focus-visible {
  color: var(--x-color-primary, #1264f4);
  outline: none;
}

.x-tree-table__empty {
  align-items: center;
  color: var(--x-color-muted, #64748b);
  display: flex;
  justify-content: center;
  min-height: 120px;
  padding: 24px;
}
</style>
