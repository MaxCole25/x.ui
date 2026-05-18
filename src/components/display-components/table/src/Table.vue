<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue'
import type { CSSProperties, StyleValue } from 'vue'
import { XBaseInput } from '../../../basic-components/base-input'
import { componentSizePreset } from '../../../_utils/size'
import 'remixicon/fonts/remixicon.css'
import type {
  TableAlign,
  TableCellChangePayload,
  TableColumn,
  TableColumnResizePayload,
  TableColumnSetting,
  TableFixed,
  TablePaginationChangePayload,
  TablePaginationMode,
  TablePaginationState,
  TableProps,
  TableRowClickPayload,
  TableReorderPosition,
  TableRowReorderPayload,
  TableSelectionMode,
  TableTopSlotScope
} from './types'

defineOptions({ name: 'XTable', inheritAttrs: false })

const props = withDefaults(defineProps<TableProps>(), {
  rowKey: 'id',
  emptyText: '暂无数据',
  showHeader: true,
  showActions: false,
  showSelection: false,
  showSelectionColumn: true,
  editable: false,
  rowDraggable: false,
  columnResizable: true,
  showColumnSettings: false,
  bodyStripeBackgroundColor: 'transparent',
  showPagination: false,
  paginationMode: 'client',
  currentPage: 1,
  pageSize: 10,
  size: undefined,
  selectionMode: 'row',
  actionsWidth: 160,
  fillHeight: false
})

const emit = defineEmits<{
  (e: 'update:data', value: Record<string, unknown>[]): void
  (e: 'update:columnSettings', value: TableColumnSetting[]): void
  (e: 'column-settings-change', value: TableColumnSetting[]): void
  (e: 'column-settings-click', value: TableColumnSetting[]): void
  (e: 'update:selectedRowKeys', value: string[]): void
  (e: 'selection-change', value: { keys: string[]; rows: Record<string, unknown>[] }): void
  (
    e: 'update:selectedCellKeys',
    value: string[]
  ): void
  (
    e: 'cell-selection-change',
    value: { keys: string[]; cells: Array<{ row: Record<string, unknown>; value: unknown; column: TableColumn; rowIndex: number }> }
  ): void
  (e: 'cell-change', value: TableCellChangePayload): void
  (e: 'row-reorder', value: TableRowReorderPayload): void
  (e: 'row-click', value: TableRowClickPayload): void
  (e: 'row-dblclick', value: TableRowClickPayload): void
  (e: 'column-resize', value: TableColumnResizePayload): void
  (e: 'update:currentPage', value: number): void
  (e: 'update:pageSize', value: number): void
  (e: 'page-change', value: TablePaginationChangePayload): void
  (e: 'page-size-change', value: TablePaginationChangePayload): void
  (e: 'pagination-change', value: TablePaginationChangePayload): void
}>()

interface ResolvedColumn {
  column: TableColumn
  setting: TableColumnSetting
  track: string
  align: TableAlign
  fixed: TableFixed
  left: string
  right: string
}

interface TableContextMenuState {
  x: number
  y: number
}

const defaultColumnMinWidth = 40
const autoFitColumnWidthBuffer = 12
const internalColumnSettings = ref<TableColumnSetting[]>([])
const tableWidth = ref(0)
const internalCurrentPage = ref(1)
const internalPageSize = ref(10)
const attrs = useAttrs()

const normalizedPaginationMode = computed<TablePaginationMode>(() => props.paginationMode ?? 'client')
const normalizedPageSizes = computed(() => normalizePageSizes(props.pageSizes))
const normalizedPageSize = computed(() => Math.max(1, normalizeInteger(internalPageSize.value, 10)))
const paginationTotal = computed(() => {
  const total = props.total === undefined ? props.data.length : normalizeInteger(props.total, 0)
  return Math.max(0, total)
})
const paginationPageCount = computed(() => Math.max(1, Math.ceil(paginationTotal.value / normalizedPageSize.value)))
const normalizedCurrentPage = computed(() => clampPage(internalCurrentPage.value))
const clientPageStartIndex = computed(() => (normalizedCurrentPage.value - 1) * normalizedPageSize.value)
const visibleData = computed(() => {
  if (!props.showPagination || normalizedPaginationMode.value === 'server') {
    return props.data
  }

  return props.data.slice(clientPageStartIndex.value, clientPageStartIndex.value + normalizedPageSize.value)
})
const visibleRows = computed(() =>
  visibleData.value.map((row, index) => ({
    row,
    rowIndex: props.showPagination && normalizedPaginationMode.value === 'client' ? clientPageStartIndex.value + index : index
  }))
)
const paginationState = computed<TablePaginationState>(() => ({
  currentPage: normalizedCurrentPage.value,
  pageSize: normalizedPageSize.value,
  total: paginationTotal.value,
  pageCount: paginationPageCount.value,
  mode: normalizedPaginationMode.value
}))
const isPaginationVisible = computed(() => props.showPagination)
const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const tableStyle = computed<CSSProperties>(() => {
  const style: Record<string, string> = {}
  setCssVariable(style, '--x-table-panel-background', props.panelBackgroundColor)
  setCssVariable(style, '--x-table-top-background', props.topBackgroundColor)
  setCssVariable(style, '--x-table-bottom-background', props.bottomBackgroundColor)
  setCssVariable(style, '--x-table-header-background', props.headerBackgroundColor)
  setCssVariable(style, '--x-table-header-text-color', props.headerTextColor)
  setCssVariable(style, '--x-table-body-background', props.bodyBackgroundColor)
  setCssVariable(style, '--x-table-body-stripe-background', props.bodyStripeBackgroundColor)
  setCssVariable(style, '--x-table-body-text-color', props.bodyTextColor)
  setCssVariable(style, '--x-table-cell-selected-background', props.selectedCellBackgroundColor)
  setCssVariable(style, '--x-table-cell-selected-text-color', props.selectedCellTextColor)
  setCssVariable(style, '--x-table-cell-selected-border-color', props.selectedCellBorderColor)
  setCssVariable(style, '--x-table-cell-selected-inner-border-color', props.selectedCellInnerBorderColor)
  setCssVariable(style, '--x-table-border-color', props.borderColor)
  setCssVariable(style, '--x-table-viewport-border-color', props.viewportBorderColor)
  setCssVariable(style, '--x-table-header-divider-color', props.headerDividerColor)
  setCssVariable(style, '--x-table-row-border-color', props.rowBorderColor)
  setCssVariable(style, '--x-table-column-border-color', props.columnBorderColor)
  setCssVariable(style, '--x-table-horizontal-border-color', props.horizontalBorderColor)
  setCssVariable(style, '--x-table-horizontal-border-width', props.horizontalBorderWidth === undefined ? undefined : formatCssSize(props.horizontalBorderWidth))
  setCssVariable(style, '--x-table-vertical-border-color', props.verticalBorderColor)
  setCssVariable(style, '--x-table-vertical-border-width', props.verticalBorderWidth === undefined ? undefined : formatCssSize(props.verticalBorderWidth))
  setCssVariable(style, '--x-table-font-size', `${sizePreset.value.fontSize}px`)
  setCssVariable(style, '--x-table-row-height', `${sizePreset.value.height}px`)
  setCssVariable(style, '--x-table-cell-padding', sizePreset.value.padding)
  setCssVariable(style, '--x-table-radius', sizePreset.value.radius)
  return style as CSSProperties
})
const mergedTableStyle = computed<StyleValue>(() => {
  const externalStyle = attrs.style as StyleValue | undefined
  return externalStyle === undefined ? tableStyle.value : [externalStyle, tableStyle.value]
})
const rootAttrs = computed(() => {
  const { style, ...restAttrs } = attrs
  void style
  return restAttrs
})

const resolvedColumns = computed<ResolvedColumn[]>(() => {
  const columns = getOrderedSettings()
    .filter((setting) => !setting.hidden)
    .map((setting) => {
      const column = props.columns.find((item) => item.key === setting.key)
      return column ? createResolvedColumn(column, setting) : null
    })
    .filter((item): item is ResolvedColumn => item !== null)

  resolveColumnTracks(columns)
  applyFixedOffsets(columns)
  return columns
})

const gridTemplateColumns = computed(() => {
  const tracks = resolvedColumns.value.map((column) => column.track)
  if (isRowSelectionColumnVisible.value) {
    tracks.unshift('44px')
  }

  if (props.rowDraggable) {
    tracks.unshift('44px')
  }

  if (props.showActions) {
    tracks.push(formatCssSize(props.actionsWidth))
  }

  return tracks.join(' ')
})

const slotScope = computed<TableTopSlotScope>(() => ({
  columns: props.columns,
  data: props.data,
  visibleData: visibleData.value,
  columnSettings: getOrderedSettings().map((setting) => ({ ...setting })),
  selectedRowKeys: normalizedSelectedRowKeys.value,
  selectedCellKeys: normalizedSelectedCellKeys.value,
  pagination: paginationState.value,
  updateColumnSetting,
  moveColumnSetting,
  reorderColumnSetting,
  resetColumnSettings,
  setPage,
  setPageSize
}))

const tableRootRef = ref<HTMLElement | null>(null)
const headerViewportRef = ref<HTMLElement | null>(null)
const bodyViewportRef = ref<HTMLElement | null>(null)
const scrollState = ref({
  scrollLeft: 0,
  scrollTop: 0,
  clientWidth: 0,
  clientHeight: 0,
  scrollWidth: 0,
  scrollHeight: 0
})

const hasVerticalScrollbar = computed(() => scrollState.value.scrollHeight > scrollState.value.clientHeight + 1)
const hasHorizontalScrollbar = computed(() => scrollState.value.scrollWidth > scrollState.value.clientWidth + 1)
const scrollbarTrackInset = 8
const scrollbarThumbMinSize = 28
const normalizedSelectionMode = computed<TableSelectionMode>(() => props.selectionMode ?? 'row')
const isRowSelectionEnabled = computed(() => props.showSelection && normalizedSelectionMode.value === 'row' && !props.editable)
const isRowSelectionColumnVisible = computed(() => props.showSelection && props.showSelectionColumn)
const isCellSelectionEnabled = computed(() => props.showSelection && normalizedSelectionMode.value === 'cell')
const normalizedSelectedRowKeys = computed(() => (props.selectedRowKeys ?? []).map((key) => String(key)))
const normalizedSelectedCellKeys = computed(() => props.selectedCellKeys ?? [])
const internalSelectedCellKeys = ref<string[]>([])
const previewSelectedCellKeys = ref<string[] | null>(null)
const activeSelectedCellKeys = computed(() => previewSelectedCellKeys.value ?? internalSelectedCellKeys.value)
let latestLocalSelectedCellSignature = ''
const pendingLocalSelectedCellSignatures = new Set<string>()
let isIgnoringStaleExternalCellSelection = false
let staleExternalCellSelectionTimer: number | null = null
const selectableRowKeys = computed(() => visibleRows.value.map(({ row, rowIndex }) => getRowKey(row, rowIndex)))
const selectedRowKeySet = computed(() => new Set(normalizedSelectedRowKeys.value))
const selectedCellKeySet = computed(() => new Set(activeSelectedCellKeys.value))
const rowIndexByKey = computed(() => new Map(props.data.map((row, index) => [getRowKey(row, index), index])))
const columnIndexByKey = computed(() => new Map(resolvedColumns.value.map((column, index) => [column.column.key, index])))
const editingCellKey = ref<string | null>(null)
const editingCellValue = ref<string | number | undefined>('')
const isAllSelected = computed(() => selectableRowKeys.value.length > 0 && selectableRowKeys.value.every((key) => selectedRowKeySet.value.has(key)))
const isSelectionIndeterminate = computed(() => {
  const selectedCount = selectableRowKeys.value.filter((key) => selectedRowKeySet.value.has(key)).length
  return selectedCount > 0 && selectedCount < selectableRowKeys.value.length
})
const lastLeftFixedColumnKey = computed(() => {
  const leftFixedColumns = resolvedColumns.value.filter((column) => column.fixed === 'left')
  return leftFixedColumns[leftFixedColumns.length - 1]?.column.key ?? null
})
const firstRightFixedColumnKey = computed(() => {
  const rightFixedColumns = resolvedColumns.value.filter((column) => column.fixed === 'right')
  return rightFixedColumns[0]?.column.key ?? null
})
const hasLeftFixedColumns = computed(() => resolvedColumns.value.some((column) => column.fixed === 'left'))
const leftFrozenBoundaryShadow = 'inset -1px 0 0 var(--x-table-column-border-color, var(--x-table-vertical-border-color, var(--x-table-border-color))), 6px 0 12px -8px rgb(15 23 42 / 38%)'
const rightFrozenBoundaryShadow = 'inset 1px 0 0 var(--x-table-column-border-color, var(--x-table-vertical-border-color, var(--x-table-border-color))), -6px 0 12px -8px rgb(15 23 42 / 38%)'
const selectedCellRange = computed(() => {
  const coordinates: Array<{ rowIndex: number; columnIndex: number }> = []
  activeSelectedCellKeys.value.forEach((key) => {
    const separatorIndex = key.indexOf('::')
    if (separatorIndex < 0) {
      return
    }

    const rowKey = key.slice(0, separatorIndex)
    const columnKey = key.slice(separatorIndex + 2)
    const rowIndex = rowIndexByKey.value.get(rowKey)
    const columnIndex = columnIndexByKey.value.get(columnKey)
    if (rowIndex !== undefined && columnIndex !== undefined) {
      coordinates.push({ rowIndex, columnIndex })
    }
  })

  if (coordinates.length === 0) {
    return null
  }

  return {
    minRowIndex: Math.min(...coordinates.map((item) => item.rowIndex)),
    maxRowIndex: Math.max(...coordinates.map((item) => item.rowIndex)),
    minColumnIndex: Math.min(...coordinates.map((item) => item.columnIndex)),
    maxColumnIndex: Math.max(...coordinates.map((item) => item.columnIndex))
  }
})
const draggingRowKey = ref<string | null>(null)
const dragOverRowKey = ref<string | null>(null)
const dragOverPosition = ref<TableReorderPosition>('after')
const cellSelectionDrag = ref<{
  mode: 'select' | 'resize'
  anchorRowIndex: number
  anchorColumnIndex: number
} | null>(null)
const cellSelectionHandleCorner = ref<'bottom-left' | 'bottom-right'>('bottom-right')
let cellSelectionFrame = 0
let pendingCellSelectionRange:
  | {
      startRowIndex: number
      startColumnIndex: number
      endRowIndex: number
      endColumnIndex: number
    }
  | null = null
let pendingCellSelection:
  | {
      keys: string[]
      cells: Array<{ row: Record<string, unknown>; value: unknown; column: TableColumn; rowIndex: number }>
    }
  | null = null
let cellSelectionAutoScrollFrame = 0
let latestCellSelectionPointer: { clientX: number; clientY: number } | null = null
const shouldSuppressCellClick = ref(false)
const shouldSuppressCellSelectionStart = ref(false)
const contextMenuState = ref<TableContextMenuState | null>(null)
const contextMenuStyle = computed<CSSProperties>(() => ({
  left: `${contextMenuState.value?.x ?? 0}px`,
  top: `${contextMenuState.value?.y ?? 0}px`
}))

const verticalThumbStyle = computed<CSSProperties>(() => {
  const state = scrollState.value
  const trackHeight = getVerticalTrackSize()
  const ratio = state.clientHeight / Math.max(state.scrollHeight, 1)
  const size = Math.min(trackHeight, Math.max(scrollbarThumbMinSize, trackHeight * ratio))
  const maxTop = Math.max(0, trackHeight - size)
  const top = maxTop * (state.scrollTop / Math.max(state.scrollHeight - state.clientHeight, 1))

  return {
    height: `${size}px`,
    transform: `translateY(${top}px)`
  }
})

const horizontalThumbStyle = computed<CSSProperties>(() => {
  const state = scrollState.value
  const trackWidth = getHorizontalTrackSize()
  const ratio = state.clientWidth / Math.max(state.scrollWidth, 1)
  const size = Math.min(trackWidth, Math.max(scrollbarThumbMinSize, trackWidth * ratio))
  const maxLeft = Math.max(0, trackWidth - size)
  const left = maxLeft * (state.scrollLeft / Math.max(state.scrollWidth - state.clientWidth, 1))

  return {
    transform: `translateX(${left}px)`,
    width: `${size}px`
  }
})

let bodyResizeObserver: ResizeObserver | null = null
let activeScrollbarDrag:
  | {
      axis: 'x' | 'y'
      startClientPosition: number
      startScrollPosition: number
    }
  | null = null
let activeColumnResize:
  | {
      key: string
      startClientX: number
      startWidth: number
      oldWidth: number
    }
  | null = null

function handleBodyScroll(event: Event) {
  const target = event.currentTarget as HTMLElement | null
  if (headerViewportRef.value && target) {
    headerViewportRef.value.scrollLeft = target.scrollLeft
  }
  closeContextMenu()
  syncScrollState()
}

function syncScrollState() {
  const target = bodyViewportRef.value
  if (!target) {
    return
  }

  tableWidth.value = target.clientWidth
  scrollState.value = {
    scrollLeft: target.scrollLeft,
    scrollTop: target.scrollTop,
    clientWidth: target.clientWidth,
    clientHeight: target.clientHeight,
    scrollWidth: target.scrollWidth,
    scrollHeight: target.scrollHeight
  }
}

function startScrollbarDrag(axis: 'x' | 'y', event: PointerEvent) {
  const target = bodyViewportRef.value
  if (!target) {
    return
  }

  event.preventDefault()
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  activeScrollbarDrag = {
    axis,
    startClientPosition: axis === 'x' ? event.clientX : event.clientY,
    startScrollPosition: axis === 'x' ? target.scrollLeft : target.scrollTop
  }
}

function handleScrollbarDrag(event: PointerEvent) {
  if (!activeScrollbarDrag || !bodyViewportRef.value) {
    return
  }

  const target = bodyViewportRef.value
  const state = scrollState.value
  if (activeScrollbarDrag.axis === 'x') {
    const thumbWidth = parseFloat(String(horizontalThumbStyle.value.width)) || 1
    const trackWidth = Math.max(getHorizontalTrackSize() - thumbWidth, 1)
    const scrollRange = Math.max(state.scrollWidth - state.clientWidth, 1)
    const delta = event.clientX - activeScrollbarDrag.startClientPosition
    target.scrollLeft = activeScrollbarDrag.startScrollPosition + (delta / trackWidth) * scrollRange
    return
  }

  const thumbHeight = parseFloat(String(verticalThumbStyle.value.height)) || 1
  const trackHeight = Math.max(getVerticalTrackSize() - thumbHeight, 1)
  const scrollRange = Math.max(state.scrollHeight - state.clientHeight, 1)
  const delta = event.clientY - activeScrollbarDrag.startClientPosition
  target.scrollTop = activeScrollbarDrag.startScrollPosition + (delta / trackHeight) * scrollRange
}

function isRowSelected(row: Record<string, unknown>, rowIndex: number) {
  return selectedRowKeySet.value.has(getRowKey(row, rowIndex))
}

function getCellSelectionKey(row: Record<string, unknown>, rowIndex: number, column: TableColumn) {
  return `${getRowKey(row, rowIndex)}::${column.key}`
}

function isCellSelected(row: Record<string, unknown>, rowIndex: number, column: TableColumn) {
  return selectedCellKeySet.value.has(getCellSelectionKey(row, rowIndex, column))
}

function isCellSelectionHandleVisible(rowIndex: number, columnIndex: number) {
  const range = selectedCellRange.value
  const handleColumnIndex = cellSelectionHandleCorner.value === 'bottom-left' ? range?.minColumnIndex : range?.maxColumnIndex
  return Boolean(
    range &&
      !editingCellKey.value &&
      rowIndex === range.maxRowIndex &&
      columnIndex === handleColumnIndex &&
      isCellSelectionEnabled.value
  )
}

function getCellSelectionClasses(row: Record<string, unknown>, rowIndex: number, column: TableColumn, columnIndex: number) {
  const editing = isCellEditing(row, rowIndex, column)
  if (editing) {
    return {
      'is-cell-selectable': isCellSelectionEnabled.value,
      'is-editing': true
    }
  }

  const selected = isCellSelected(row, rowIndex, column)
  if (!selected) {
    return {
      'is-cell-selectable': isCellSelectionEnabled.value,
      'is-editing': false
    }
  }

  const previousRow = props.data[rowIndex - 1]
  const nextRow = props.data[rowIndex + 1]
  const previousColumn = resolvedColumns.value[columnIndex - 1]?.column
  const nextColumn = resolvedColumns.value[columnIndex + 1]?.column

  return {
    'is-cell-selectable': isCellSelectionEnabled.value,
    'is-editing': false,
    'is-selected-cell': true,
    'is-selected-cell-adjacent-top': previousRow ? isCellSelected(previousRow, rowIndex - 1, column) : false,
    'is-selected-cell-adjacent-right': nextColumn ? isCellSelected(row, rowIndex, nextColumn) : false,
    'is-selected-cell-adjacent-bottom': nextRow ? isCellSelected(nextRow, rowIndex + 1, column) : false,
    'is-selected-cell-adjacent-left': previousColumn ? isCellSelected(row, rowIndex, previousColumn) : false
  }
}

function getRangeCellSelection(startRowIndex: number, startColumnIndex: number, endRowIndex: number, endColumnIndex: number) {
  const minRowIndex = Math.min(startRowIndex, endRowIndex)
  const maxRowIndex = Math.max(startRowIndex, endRowIndex)
  const minColumnIndex = Math.min(startColumnIndex, endColumnIndex)
  const maxColumnIndex = Math.max(startColumnIndex, endColumnIndex)
  const keys: string[] = []
  const cells: Array<{ row: Record<string, unknown>; value: unknown; column: TableColumn; rowIndex: number }> = []

  for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
    const row = props.data[rowIndex]
    if (!row) {
      continue
    }

    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
      const column = resolvedColumns.value[columnIndex]?.column
      if (column) {
        keys.push(getCellSelectionKey(row, rowIndex, column))
        cells.push({ row, value: getCellValue(row, column), column, rowIndex })
      }
    }
  }

  return { keys, cells }
}

function emitCellRangeSelection(startRowIndex: number, startColumnIndex: number, endRowIndex: number, endColumnIndex: number) {
  const selection = getRangeCellSelection(startRowIndex, startColumnIndex, endRowIndex, endColumnIndex)
  pendingCellSelection = selection
  previewSelectedCellKeys.value = selection.keys
}

function toggleRowSelection(row: Record<string, unknown>, rowIndex: number, checked: boolean) {
  const key = getRowKey(row, rowIndex)
  const next = new Set(normalizedSelectedRowKeys.value)
  if (checked) {
    next.add(key)
  } else {
    next.delete(key)
  }

  emitSelectionChange([...next])
}

function toggleAllSelection(checked: boolean) {
  emitSelectionChange(checked ? selectableRowKeys.value : [])
}

function emitSelectionChange(keys: string[]) {
  const keySet = new Set(keys)
  const rows = props.data.filter((row, index) => keySet.has(getRowKey(row, index)))
  emit('update:selectedRowKeys', keys)
  emit('selection-change', { keys, rows })
}

function toggleCellSelection(row: Record<string, unknown>, rowIndex: number, column: TableColumn, event: MouseEvent) {
  if (!isCellSelectionEnabled.value) {
    return
  }

  if (cellSelectionDrag.value) {
    return
  }

  if (shouldSuppressCellClick.value) {
    shouldSuppressCellClick.value = false
    return
  }

  const key = getCellSelectionKey(row, rowIndex, column)
  if (!event.ctrlKey && !event.metaKey) {
    emitCellSelectionChange([key])
    focusTableRoot()
    return
  }

  const next = new Set(normalizedSelectedCellKeys.value)
  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }

  emitCellSelectionChange([...next])
  focusTableRoot()
}

function startCellSelection(rowIndex: number, columnIndex: number, event: MouseEvent) {
  if (shouldSuppressCellSelectionStart.value) {
    shouldSuppressCellSelectionStart.value = false
    event.preventDefault()
    return
  }

  if (!isCellSelectionEnabled.value || event.button !== 0 || event.ctrlKey || event.metaKey) {
    return
  }

  event.preventDefault()
  cellSelectionDrag.value = {
    mode: 'select',
    anchorRowIndex: rowIndex,
    anchorColumnIndex: columnIndex
  }
  shouldSuppressCellClick.value = false
  emitCellRangeSelection(rowIndex, columnIndex, rowIndex, columnIndex)
}

function startCellSelectionResize(event: MouseEvent) {
  if (!isCellSelectionEnabled.value || event.button !== 0) {
    return
  }

  const range = selectedCellRange.value
  if (!range) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
  cellSelectionDrag.value = {
    mode: 'resize',
    anchorRowIndex: range.minRowIndex,
    anchorColumnIndex: range.minColumnIndex
  }
  shouldSuppressCellClick.value = true
}

function updateCellSelectionDrag(rowIndex: number, columnIndex: number) {
  const dragState = cellSelectionDrag.value
  if (!dragState) {
    return
  }

  if (dragState.anchorRowIndex !== rowIndex || dragState.anchorColumnIndex !== columnIndex) {
    shouldSuppressCellClick.value = true
  }
  cellSelectionHandleCorner.value = columnIndex < dragState.anchorColumnIndex ? 'bottom-left' : 'bottom-right'
  queueCellRangeSelection(dragState.anchorRowIndex, dragState.anchorColumnIndex, rowIndex, columnIndex)
}

function handleCellSelectionPointerMove(event: MouseEvent) {
  if (!cellSelectionDrag.value) {
    return
  }

  latestCellSelectionPointer = {
    clientX: event.clientX,
    clientY: event.clientY
  }
  updateCellSelectionFromPoint(event.clientX, event.clientY)
  startCellSelectionAutoScroll()
}

function updateCellSelectionFromPoint(clientX: number, clientY: number) {
  const target = document.elementFromPoint(clientX, clientY)
  const cell = target?.closest<HTMLElement>('[data-x-table-cell-row-index][data-x-table-cell-column-index]')
  if (!cell) {
    return
  }

  updateCellSelectionDrag(Number(cell.dataset.xTableCellRowIndex), Number(cell.dataset.xTableCellColumnIndex))
}

function stopCellSelectionDrag() {
  flushQueuedCellRangeSelection()
  if (cellSelectionDrag.value && pendingCellSelection && (cellSelectionDrag.value.mode === 'resize' || shouldSuppressCellClick.value)) {
    emitCellSelectionChange(pendingCellSelection.keys, pendingCellSelection.cells)
  }
  previewSelectedCellKeys.value = null
  pendingCellSelection = null
  latestCellSelectionPointer = null
  stopCellSelectionAutoScroll()
  cellSelectionDrag.value = null
}

function startCellSelectionAutoScroll() {
  if (cellSelectionAutoScrollFrame || !cellSelectionDrag.value) {
    return
  }

  cellSelectionAutoScrollFrame = window.requestAnimationFrame(runCellSelectionAutoScroll)
}

function stopCellSelectionAutoScroll() {
  if (!cellSelectionAutoScrollFrame) {
    return
  }

  window.cancelAnimationFrame(cellSelectionAutoScrollFrame)
  cellSelectionAutoScrollFrame = 0
}

function runCellSelectionAutoScroll() {
  cellSelectionAutoScrollFrame = 0
  if (!cellSelectionDrag.value || !bodyViewportRef.value || !latestCellSelectionPointer) {
    return
  }

  const viewport = bodyViewportRef.value
  const rect = viewport.getBoundingClientRect()
  const threshold = 32
  const maxStep = 18
  const { clientX, clientY } = latestCellSelectionPointer
  const verticalDistance =
    clientY < rect.top + threshold ? clientY - (rect.top + threshold) : clientY > rect.bottom - threshold ? clientY - (rect.bottom - threshold) : 0
  const horizontalDistance =
    clientX < rect.left + threshold ? clientX - (rect.left + threshold) : clientX > rect.right - threshold ? clientX - (rect.right - threshold) : 0
  const deltaY = Math.sign(verticalDistance) * Math.min(maxStep, Math.ceil(Math.abs(verticalDistance) / 3))
  const deltaX = Math.sign(horizontalDistance) * Math.min(maxStep, Math.ceil(Math.abs(horizontalDistance) / 3))

  if (deltaX !== 0 || deltaY !== 0) {
    viewport.scrollLeft += deltaX
    viewport.scrollTop += deltaY
    syncScrollState()
    updateCellSelectionFromPoint(
      Math.min(Math.max(clientX, rect.left + 1), rect.right - 1),
      Math.min(Math.max(clientY, rect.top + 1), rect.bottom - 1)
    )
    cellSelectionAutoScrollFrame = window.requestAnimationFrame(runCellSelectionAutoScroll)
  }
}

function queueCellRangeSelection(startRowIndex: number, startColumnIndex: number, endRowIndex: number, endColumnIndex: number) {
  pendingCellSelectionRange = {
    startRowIndex,
    startColumnIndex,
    endRowIndex,
    endColumnIndex
  }

  if (cellSelectionFrame) {
    return
  }

  cellSelectionFrame = window.requestAnimationFrame(() => {
    cellSelectionFrame = 0
    flushQueuedCellRangeSelection()
  })
}

function flushQueuedCellRangeSelection() {
  if (!pendingCellSelectionRange) {
    return
  }

  const range = pendingCellSelectionRange
  pendingCellSelectionRange = null
  emitCellRangeSelection(range.startRowIndex, range.startColumnIndex, range.endRowIndex, range.endColumnIndex)
}

function emitCellSelectionChange(
  keys: string[],
  cells = getCellsBySelectionKeys(keys)
) {
  const signature = getSelectedCellKeySignature(keys)
  latestLocalSelectedCellSignature = signature
  pendingLocalSelectedCellSignatures.add(signature)
  beginIgnoringStaleExternalCellSelection()
  internalSelectedCellKeys.value = [...keys]
  emit('update:selectedCellKeys', keys)
  emit('cell-selection-change', { keys, cells })
}

function beginIgnoringStaleExternalCellSelection() {
  isIgnoringStaleExternalCellSelection = true
  if (staleExternalCellSelectionTimer) {
    window.clearTimeout(staleExternalCellSelectionTimer)
  }

  staleExternalCellSelectionTimer = window.setTimeout(() => {
    isIgnoringStaleExternalCellSelection = false
    latestLocalSelectedCellSignature = ''
    pendingLocalSelectedCellSignatures.clear()
    staleExternalCellSelectionTimer = null
  }, 300)
}

function getSelectedCellKeySignature(keys: string[]) {
  return keys.join('\u001f')
}

function getCellsBySelectionKeys(keys: string[]) {
  const keySet = new Set(keys)
  const cells: Array<{ row: Record<string, unknown>; value: unknown; column: TableColumn; rowIndex: number }> = []
  props.data.forEach((row, rowIndex) => {
    props.columns.forEach((column) => {
      if (keySet.has(getCellSelectionKey(row, rowIndex, column))) {
        cells.push({ row, value: getCellValue(row, column), column, rowIndex })
      }
    })
  })

  return cells
}

function handleSelectionHeaderChange(event: Event) {
  toggleAllSelection((event.target as HTMLInputElement).checked)
}

function handleRowSelectionChange(row: Record<string, unknown>, rowIndex: number, event: Event) {
  toggleRowSelection(row, rowIndex, (event.target as HTMLInputElement).checked)
}

function handleRowClick(row: Record<string, unknown>, rowIndex: number, event: MouseEvent) {
  emit('row-click', createRowClickPayload(row, rowIndex, event))

  if (!isRowSelectionEnabled.value) {
    return
  }

  toggleRowSelection(row, rowIndex, !isRowSelected(row, rowIndex))
}

function handleRowDoubleClick(row: Record<string, unknown>, rowIndex: number, event: MouseEvent) {
  emit('row-dblclick', createRowClickPayload(row, rowIndex, event))
}

function createRowClickPayload(
  row: Record<string, unknown>,
  rowIndex: number,
  event: MouseEvent
): TableRowClickPayload {
  return {
    row,
    rowIndex,
    rowKey: getRowKey(row, rowIndex),
    event
  }
}

function focusTableRoot() {
  nextTick(() => {
    tableRootRef.value?.focus({ preventScroll: true })
  })
}

function beginCellEdit(
  row: Record<string, unknown>,
  rowIndex: number,
  column: TableColumn,
  initialValue?: string,
  cell?: HTMLElement | null
) {
  if (!props.editable) {
    return
  }

  editingCellKey.value = getCellSelectionKey(row, rowIndex, column)
  editingCellValue.value = initialValue ?? normalizeInputValue(getCellValue(row, column))

  nextTick(() => {
    const input =
      cell?.querySelector<HTMLInputElement>('.x-base-input__inner') ??
      tableRootRef.value?.querySelector<HTMLInputElement>(
        `[data-x-table-cell-row-index="${rowIndex}"][data-x-table-cell-column-index="${columnIndexByKey.value.get(column.key)}"] .x-base-input__inner`
      )
    input?.focus()
    if (initialValue === undefined) {
      input?.select()
    } else {
      input?.setSelectionRange(initialValue.length, initialValue.length)
    }
  })
}

function startCellEdit(row: Record<string, unknown>, rowIndex: number, column: TableColumn, event: MouseEvent) {
  if (!props.editable) {
    return
  }

  emit('row-dblclick', createRowClickPayload(row, rowIndex, event))
  event.preventDefault()
  event.stopPropagation()
  beginCellEdit(row, rowIndex, column, undefined, event.currentTarget as HTMLElement | null)
}

function updateEditingCellValue(value: string | number | undefined) {
  editingCellValue.value = value
}

function commitCellEditValue(value: string | number | undefined) {
  editingCellValue.value = value
  commitCellEdit()
}

function commitCellEdit() {
  if (!editingCellKey.value) {
    return
  }

  const [rowKey, columnKey] = editingCellKey.value.split('::')
  const rowIndex = rowIndexByKey.value.get(rowKey)
  const column = props.columns.find((item) => item.key === columnKey)
  if (rowIndex === undefined || !column) {
    editingCellKey.value = null
    return
  }

  const row = props.data[rowIndex]
  const oldValue = getCellValue(row, column)
  const value = normalizeEditedCellValue(editingCellValue.value, oldValue)
  editingCellKey.value = null

  if (Object.is(value, oldValue)) {
    return
  }

  const rows = props.data.map((item, index) => (index === rowIndex ? { ...item, [column.key]: value } : item))
  const nextRow = rows[rowIndex]
  emit('update:data', rows)
  emit('cell-change', {
    row: nextRow,
    rows,
    rowIndex,
    column,
    key: getRowKey(nextRow, rowIndex),
    value,
    oldValue
  })
}

function commitCellEditAndFocusTable() {
  commitCellEdit()
  focusTableRoot()
}

function cancelCellEdit() {
  editingCellKey.value = null
}

function cancelCellEditAndFocusTable() {
  cancelCellEdit()
  focusTableRoot()
}

function isCellEditing(row: Record<string, unknown>, rowIndex: number, column: TableColumn) {
  return editingCellKey.value === getCellSelectionKey(row, rowIndex, column)
}

function handleCellEditOutsidePointerDown(event: PointerEvent) {
  if (!editingCellKey.value) {
    return
  }

  const target = event.target as HTMLElement | null
  if (target?.closest('.x-table__cell-editor')) {
    return
  }

  if (target?.closest('[data-x-table-cell-row-index][data-x-table-cell-column-index]')) {
    shouldSuppressCellSelectionStart.value = true
    shouldSuppressCellClick.value = true
  }

  commitCellEdit()
}

function handleTableKeydown(event: KeyboardEvent) {
  if (event.key === 'Tab' && editingCellKey.value) {
    event.preventDefault()
    event.stopPropagation()
    const currentEditingCellKey = editingCellKey.value
    commitCellEdit()
    if (isCellSelectionEnabled.value) {
      moveActiveCellSelectionByColumn(event.shiftKey ? -1 : 1, currentEditingCellKey)
    } else {
      focusTableRoot()
    }
    return
  }

  if (event.key === 'Tab' && isCellSelectionEnabled.value && !editingCellKey.value) {
    event.preventDefault()
    event.stopPropagation()
    moveActiveCellSelectionByColumn(event.shiftKey ? -1 : 1)
    return
  }

  if (event.key === 'Enter' && isCellSelectionEnabled.value && !editingCellKey.value) {
    event.preventDefault()
    event.stopPropagation()
    moveActiveCellSelectionByRow()
    return
  }

  if (
    !props.editable ||
    !isCellSelectionEnabled.value ||
    editingCellKey.value ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.key.length !== 1
  ) {
    return
  }

  const key = activeSelectedCellKeys.value[activeSelectedCellKeys.value.length - 1]
  if (!key) {
    return
  }

  const separatorIndex = key.indexOf('::')
  if (separatorIndex < 0) {
    return
  }

  const rowKey = key.slice(0, separatorIndex)
  const columnKey = key.slice(separatorIndex + 2)
  const rowIndex = rowIndexByKey.value.get(rowKey)
  const row = rowIndex === undefined ? undefined : props.data[rowIndex]
  const column = props.columns.find((item) => item.key === columnKey)
  if (rowIndex === undefined || !row || !column) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
  beginCellEdit(row, rowIndex, column, event.key)
}

function moveActiveCellSelectionByColumn(delta: -1 | 1, fromKey = activeSelectedCellKeys.value[activeSelectedCellKeys.value.length - 1]) {
  const key = fromKey
  if (!key) {
    return
  }

  const separatorIndex = key.indexOf('::')
  if (separatorIndex < 0) {
    return
  }

  const rowKey = key.slice(0, separatorIndex)
  const columnKey = key.slice(separatorIndex + 2)
  const rowIndex = rowIndexByKey.value.get(rowKey)
  const columnIndex = columnIndexByKey.value.get(columnKey)
  if (rowIndex === undefined || columnIndex === undefined) {
    return
  }

  let nextRowIndex = rowIndex
  let nextColumnIndex = columnIndex + delta

  if (nextColumnIndex >= resolvedColumns.value.length) {
    nextRowIndex += 1
    nextColumnIndex = 0
  } else if (nextColumnIndex < 0) {
    nextRowIndex -= 1
    nextColumnIndex = resolvedColumns.value.length - 1
  }

  const row = props.data[nextRowIndex]
  const nextColumn = resolvedColumns.value[nextColumnIndex]?.column
  if (!row || !nextColumn) {
    return
  }

  emitCellSelectionChange([getCellSelectionKey(row, nextRowIndex, nextColumn)])
  focusTableRoot()
}

function moveActiveCellSelectionByRow(fromKey = activeSelectedCellKeys.value[activeSelectedCellKeys.value.length - 1]) {
  const key = fromKey
  if (!key) {
    return
  }

  const separatorIndex = key.indexOf('::')
  if (separatorIndex < 0) {
    return
  }

  const rowKey = key.slice(0, separatorIndex)
  const columnKey = key.slice(separatorIndex + 2)
  const rowIndex = rowIndexByKey.value.get(rowKey)
  const columnIndex = columnIndexByKey.value.get(columnKey)
  if (rowIndex === undefined || columnIndex === undefined) {
    return
  }

  let nextRowIndex = rowIndex + 1
  let nextColumnIndex = columnIndex

  if (nextRowIndex >= props.data.length) {
    nextRowIndex = 0
    nextColumnIndex += 1
  }

  const row = props.data[nextRowIndex]
  const nextColumn = resolvedColumns.value[nextColumnIndex]?.column
  if (!row || !nextColumn) {
    return
  }

  emitCellSelectionChange([getCellSelectionKey(row, nextRowIndex, nextColumn)])
  focusTableRoot()
}

function handleRowDragStart(row: Record<string, unknown>, rowIndex: number, event: DragEvent) {
  if (!props.rowDraggable) {
    return
  }

  const key = getRowKey(row, rowIndex)
  draggingRowKey.value = key
  dragOverRowKey.value = null
  event.dataTransfer?.setData('text/plain', key)
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

function handleRowDragOver(row: Record<string, unknown>, rowIndex: number, event: DragEvent) {
  if (!props.rowDraggable || draggingRowKey.value === null) {
    return
  }

  event.preventDefault()
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const midpoint = rect.top + rect.height / 2
  dragOverRowKey.value = getRowKey(row, rowIndex)
  dragOverPosition.value = event.clientY < midpoint ? 'before' : 'after'
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

function handleRowDrop(row: Record<string, unknown>, rowIndex: number, event: DragEvent) {
  if (!props.rowDraggable || draggingRowKey.value === null) {
    return
  }

  event.preventDefault()
  const fromIndex = props.data.findIndex((item, index) => getRowKey(item, index) === draggingRowKey.value)
  if (fromIndex < 0) {
    resetDragState()
    return
  }

  let toIndex = rowIndex + (dragOverPosition.value === 'after' ? 1 : 0)
  if (fromIndex < toIndex) {
    toIndex -= 1
  }

  if (fromIndex === toIndex) {
    resetDragState()
    return
  }

  const rows = [...props.data]
  const [movedRow] = rows.splice(fromIndex, 1)
  rows.splice(toIndex, 0, movedRow)
  emit('row-reorder', {
    row: movedRow,
    rows,
    fromIndex,
    toIndex,
    targetRow: row,
    position: dragOverPosition.value
  })
  resetDragState()
}

function resetDragState() {
  draggingRowKey.value = null
  dragOverRowKey.value = null
  dragOverPosition.value = 'after'
}

function getRowClasses(row: Record<string, unknown>, rowIndex: number) {
  const key = getRowKey(row, rowIndex)
  return {
    'is-selected': selectedRowKeySet.value.has(key),
    'is-dragging': draggingRowKey.value === key,
    'is-drag-over-before': dragOverRowKey.value === key && dragOverPosition.value === 'before',
    'is-drag-over-after': dragOverRowKey.value === key && dragOverPosition.value === 'after'
  }
}

function stopScrollbarDrag() {
  activeScrollbarDrag = null
}

function startColumnResize(column: ResolvedColumn, event: PointerEvent) {
  if (!props.columnResizable) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
  activeColumnResize = {
    key: column.column.key,
    startClientX: event.clientX,
    startWidth: getResolvedColumnWidth(column),
    oldWidth: getResolvedColumnWidth(column)
  }
}

function handleColumnResize(event: PointerEvent) {
  if (!activeColumnResize) {
    return
  }

  const column = resolvedColumns.value.find((item) => item.column.key === activeColumnResize?.key)
  if (!column) {
    return
  }

  const nextWidth = Math.max(getColumnMinWidth(column.column), activeColumnResize.startWidth + event.clientX - activeColumnResize.startClientX)
  updateColumnSetting(column.column.key, { width: nextWidth })
  emit('column-resize', {
    column: column.column,
    key: column.column.key,
    width: nextWidth,
    oldWidth: activeColumnResize.oldWidth,
    columnSettings: internalColumnSettings.value.map((setting) => ({ ...setting }))
  })
}

function stopColumnResize() {
  activeColumnResize = null
}

function autoFitColumnWidth(column: ResolvedColumn, event: MouseEvent) {
  if (!props.columnResizable) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
  applyAutoFitColumnWidth(column)
}

function applyAutoFitColumnWidth(column: ResolvedColumn) {
  stopColumnResize()

  const oldWidth = getResolvedColumnWidth(column)
  const nextWidth = getAutoFitColumnWidth(column)
  updateColumnSetting(column.column.key, { width: nextWidth, widthRatio: undefined })
  emit('column-resize', {
    column: column.column,
    key: column.column.key,
    width: nextWidth,
    oldWidth,
    columnSettings: internalColumnSettings.value.map((setting) => ({ ...setting }))
  })
}

function openCellContextMenu(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  contextMenuState.value = {
    x: event.clientX,
    y: event.clientY
  }
}

function closeContextMenu() {
  contextMenuState.value = null
}

function handleContextMenuAutoFit() {
  applyAutoFitAllVisibleColumns()
  closeContextMenu()
}

function applyAutoFitAllVisibleColumns() {
  stopColumnResize()
  const widthByKey = new Map(resolvedColumns.value.map((column) => [column.column.key, getAutoFitColumnWidth(column)]))
  const next = normalizeColumnSettings(internalColumnSettings.value).map((setting) => {
    const width = widthByKey.get(setting.key)
    return width === undefined
      ? setting
      : {
          ...setting,
          width,
          widthRatio: undefined
        }
  })

  setColumnSettings(next)
}

function handleWindowPointerDown(event: PointerEvent) {
  const target = event.target as HTMLElement | null
  if (target?.closest('.x-table__context-menu')) {
    return
  }

  closeContextMenu()
}

function getAutoFitColumnWidth(column: ResolvedColumn) {
  const columnIndex = resolvedColumns.value.findIndex((item) => item.column.key === column.column.key)
  if (columnIndex < 0 || !tableRootRef.value) {
    return getResolvedColumnWidth(column)
  }

  const utilityColumnCount = (props.rowDraggable ? 1 : 0) + (isRowSelectionColumnVisible.value ? 1 : 0)
  const cellIndex = utilityColumnCount + columnIndex
  const bodyCells = Array.from(
    tableRootRef.value.querySelectorAll<HTMLElement>(`.x-table__row--body .x-table__cell:nth-child(${cellIndex + 1})`)
  )
  const measuredWidth = bodyCells.reduce((maxWidth, cell) => {
    const text = cell.textContent?.trim()
    if (!text) {
      return maxWidth
    }

    const style = window.getComputedStyle(cell)
    const horizontalPadding =
      (parseCssPixelSize(style.paddingLeft) ?? 0) +
      (parseCssPixelSize(style.paddingRight) ?? 0) +
      (parseCssPixelSize(style.borderLeftWidth) ?? 0) +
      (parseCssPixelSize(style.borderRightWidth) ?? 0)
    return Math.max(maxWidth, measureTextWidth(text, getCanvasFont(style)) + horizontalPadding + autoFitColumnWidthBuffer)
  }, 0)

  return Math.max(getColumnMinWidth(column.column), Math.ceil(measuredWidth))
}

function getCanvasFont(style: CSSStyleDeclaration) {
  if (style.font) {
    return style.font
  }

  return `${style.fontStyle || 'normal'} ${style.fontVariant || 'normal'} ${style.fontWeight || '400'} ${style.fontSize || '14px'} ${style.fontFamily || 'sans-serif'}`
}

function measureTextWidth(text: string, font: string) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) {
    return 0
  }

  context.font = font
  return context.measureText(text).width
}

function getHorizontalTrackSize() {
  return Math.max(scrollbarThumbMinSize, scrollState.value.clientWidth - scrollbarTrackInset * 2)
}

function getVerticalTrackSize() {
  return Math.max(scrollbarThumbMinSize, scrollState.value.clientHeight - scrollbarTrackInset * 2)
}

function normalizeInteger(value: number | undefined, fallback: number) {
  const next = Number(value)
  return Number.isFinite(next) ? Math.floor(next) : fallback
}

function normalizePageSizes(pageSizes: number[] | undefined) {
  const sizes = (pageSizes && pageSizes.length > 0 ? pageSizes : [10, 20, 50, 100])
    .map((size) => normalizeInteger(size, 0))
    .filter((size) => size > 0)
  return sizes.length > 0 ? [...new Set(sizes)] : [10]
}

function clampPage(page: number) {
  const next = Math.max(1, normalizeInteger(page, 1))
  return Math.min(next, paginationPageCount.value)
}

function emitPaginationChange(page: number, pageSize: number, pageSizeChanged = false) {
  const payload: TablePaginationChangePayload = {
    currentPage: page,
    pageSize,
    total: paginationTotal.value,
    pageCount: paginationPageCount.value,
    mode: normalizedPaginationMode.value,
    pageSizeChanged
  }

  emit('pagination-change', payload)
  emit('page-change', payload)
  if (pageSizeChanged) {
    emit('page-size-change', payload)
  }
}

function setPage(page: number) {
  const nextPage = clampPage(page)
  internalCurrentPage.value = nextPage
  emit('update:currentPage', nextPage)
  emitPaginationChange(nextPage, normalizedPageSize.value)
  nextTick(syncScrollState)
}

function setPageSize(pageSize: number) {
  const nextPageSize = Math.max(1, normalizeInteger(pageSize, normalizedPageSize.value))
  internalPageSize.value = nextPageSize
  internalCurrentPage.value = 1
  emit('update:pageSize', nextPageSize)
  emit('update:currentPage', 1)
  emitPaginationChange(1, nextPageSize, true)
  nextTick(syncScrollState)
}

function handlePageSizeChange(event: Event) {
  setPageSize(Number((event.target as HTMLSelectElement).value))
}

function createDefaultColumnSettings() {
  return props.columns.map((column, index) => ({
    key: column.key,
    order: index,
    hidden: false,
    fixed: 'none' as TableFixed,
    align: column.align ?? 'left',
    width: typeof column.width === 'number' ? column.width : undefined,
    widthRatio: undefined
  }))
}

function normalizeColumnSettings(settings: TableColumnSetting[] = []) {
  const settingMap = new Map(settings.map((setting) => [setting.key, setting]))
  return props.columns.map((column, index) => {
    const current = settingMap.get(column.key)
    return {
      key: column.key,
      order: current?.order ?? index,
      hidden: current?.hidden ?? false,
      fixed: current?.fixed ?? 'none',
      align: current?.align ?? column.align ?? 'left',
      width: normalizeNumber(current?.width),
      widthRatio: normalizeNumber(current?.widthRatio)
    }
  })
}

function getOrderedSettings() {
  const orderMap = new Map(props.columns.map((column, index) => [column.key, index]))
  return [...internalColumnSettings.value].sort((a, b) => {
    const fixedWeight = getFixedWeight(a.fixed) - getFixedWeight(b.fixed)
    if (fixedWeight !== 0) {
      return fixedWeight
    }

    return (a.order ?? orderMap.get(a.key) ?? 0) - (b.order ?? orderMap.get(b.key) ?? 0)
  })
}

function createResolvedColumn(column: TableColumn, setting: TableColumnSetting): ResolvedColumn {
  return {
    column,
    setting,
    track: '',
    align: setting.align ?? column.align ?? 'left',
    fixed: setting.fixed ?? 'none',
    left: 'auto',
    right: 'auto'
  }
}

function resolveColumnTracks(columns: ResolvedColumn[]) {
  const columnTrackSizes = columns.map((column) => getColumnTrackSize(column.column, column.setting))
  const fixedTotal = columnTrackSizes.reduce(
    (sum, track) => (track.kind === 'flexible' ? sum : sum + (track.pixelSize ?? 0)),
    0
  )
  const flexibleColumns = columnTrackSizes.filter((track) => track.kind === 'flexible')
  const flexibleMinTotal = flexibleColumns.reduce((sum, track) => sum + track.minWidth, 0)
  const remaining = Math.max(tableWidth.value - getUtilityColumnsWidth() - fixedTotal - flexibleMinTotal, 0)
  const extraPerFlexibleColumn = flexibleColumns.length > 0 ? remaining / flexibleColumns.length : 0

  columns.forEach((column, index) => {
    const track = columnTrackSizes[index]
    column.track =
      track.kind === 'flexible' ? formatResolvedPixelSize(track.minWidth + extraPerFlexibleColumn) : track.track
  })
}

function applyFixedOffsets(columns: ResolvedColumn[]) {
  let leftTracks: string[] = []
  if (props.rowDraggable) {
    leftTracks.push('44px')
  }
  if (isRowSelectionColumnVisible.value) {
    leftTracks.push('44px')
  }

  for (const column of columns) {
    if (column.fixed !== 'left') {
      continue
    }

    column.left = sumCssSizes(leftTracks)
    leftTracks = [...leftTracks, column.track]
  }

  let rightTracks: string[] = []
  if (props.showActions) {
    rightTracks.push(formatCssSize(props.actionsWidth))
  }

  for (const column of [...columns].reverse()) {
    if (column.fixed !== 'right') {
      continue
    }

    column.right = sumCssSizes(rightTracks)
    rightTracks = [column.track, ...rightTracks]
  }
}

function getColumnTrackSize(column: TableColumn, setting: TableColumnSetting) {
  if (setting.width !== undefined) {
    const pixelSize = Math.max(getColumnMinWidth(column), setting.width)

    return {
      kind: 'fixed' as const,
      pixelSize,
      track: formatResolvedPixelSize(pixelSize)
    }
  }

  if (setting.widthRatio !== undefined) {
    const minWidth = getColumnMinWidth(column)
    const ratioWidth = tableWidth.value > 0 ? (tableWidth.value * setting.widthRatio) / 100 : 0
    const pixelSize = Math.max(minWidth, ratioWidth)

    return {
      kind: 'ratio' as const,
      pixelSize,
      track: formatResolvedPixelSize(pixelSize)
    }
  }

  if (column.width !== undefined) {
    const rawTrack = formatCssSize(column.width)
    const pixelSize = parseCssPixelSize(rawTrack)
    const track = pixelSize === undefined ? rawTrack : formatResolvedPixelSize(Math.max(getColumnMinWidth(column), pixelSize))

    return {
      kind: 'fixed' as const,
      pixelSize: parseCssPixelSize(track),
      track
    }
  }

  return {
    kind: 'flexible' as const,
    minWidth: getColumnMinWidth(column)
  }
}

function getUtilityColumnsWidth() {
  let width = 0
  if (props.rowDraggable) {
    width += 44
  }
  if (isRowSelectionColumnVisible.value) {
    width += 44
  }
  if (props.showActions) {
    width += parseCssPixelSize(formatCssSize(props.actionsWidth)) ?? 0
  }

  return width
}

function getColumnMinWidth(column: TableColumn) {
  if (column.minWidth === undefined) {
    return defaultColumnMinWidth
  }

  return parseCssPixelSize(formatCssSize(column.minWidth)) ?? defaultColumnMinWidth
}

function getResolvedColumnWidth(column: ResolvedColumn) {
  return parseCssPixelSize(column.track) ?? getColumnMinWidth(column.column)
}

function parseCssPixelSize(value: string) {
  const trimmed = value.trim()
  if (!trimmed.endsWith('px')) {
    return undefined
  }

  const size = Number(trimmed.slice(0, -2))
  return Number.isFinite(size) ? size : undefined
}

function formatResolvedPixelSize(value: number) {
  return `${Number(value.toFixed(3))}px`
}

function sumCssSizes(values: string[]) {
  if (values.length === 0) {
    return '0px'
  }

  return values.length === 1 ? values[0] : `calc(${values.join(' + ')})`
}

function getFixedWeight(fixed: TableColumnSetting['fixed']) {
  if (fixed === 'left') {
    return 0
  }

  if (fixed === 'right') {
    return 2
  }

  return 1
}

function normalizeNumber(value: number | undefined) {
  if (value === undefined || Number.isNaN(Number(value))) {
    return undefined
  }

  return Math.max(0, Number(value))
}

function updateColumnSetting(key: string, setting: Partial<TableColumnSetting>) {
  const next = normalizeColumnSettings(internalColumnSettings.value).map((item) => {
    if (item.key !== key) {
      return item
    }

    const hasWidth = Object.prototype.hasOwnProperty.call(setting, 'width')
    const hasWidthRatio = Object.prototype.hasOwnProperty.call(setting, 'widthRatio')
    return {
      ...item,
      ...setting,
      fixed: setting.fixed ?? item.fixed,
      align: setting.align ?? item.align,
      width: hasWidth ? normalizeNumber(setting.width) : item.width,
      widthRatio: hasWidthRatio ? normalizeNumber(setting.widthRatio) : item.widthRatio
    }
  })
  setColumnSettings(next)
}

function moveColumnSetting(key: string, direction: 'up' | 'down') {
  const sorted = [...internalColumnSettings.value].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const index = sorted.findIndex((setting) => setting.key === key)
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (index < 0 || targetIndex < 0 || targetIndex >= sorted.length) {
    return
  }

  const current = sorted[index]
  sorted[index] = sorted[targetIndex]
  sorted[targetIndex] = current
  setColumnSettings(sorted.map((setting, order) => ({ ...setting, order })))
}

function reorderColumnSetting(key: string, targetKey: string, position: TableReorderPosition) {
  if (key === targetKey) {
    return
  }

  const sorted = getOrderedSettings()
  const fromIndex = sorted.findIndex((setting) => setting.key === key)
  const targetIndex = sorted.findIndex((setting) => setting.key === targetKey)
  if (fromIndex < 0 || targetIndex < 0) {
    return
  }

  const [movedSetting] = sorted.splice(fromIndex, 1)
  let toIndex = targetIndex + (position === 'after' ? 1 : 0)
  if (fromIndex < toIndex) {
    toIndex -= 1
  }

  if (fromIndex === toIndex) {
    return
  }

  sorted.splice(toIndex, 0, movedSetting)
  setColumnSettings(sorted.map((setting, order) => ({ ...setting, order })))
}

function resetColumnSettings() {
  setColumnSettings(createDefaultColumnSettings())
}

function handleColumnSettingsClick() {
  emit('column-settings-click', getOrderedSettings().map((setting) => ({ ...setting })))
}

function setColumnSettings(settings: TableColumnSetting[]) {
  const next = normalizeColumnSettings(settings)
  internalColumnSettings.value = next
  emit('update:columnSettings', next.map((setting) => ({ ...setting })))
  emit('column-settings-change', next.map((setting) => ({ ...setting })))
  nextTick(syncScrollState)
}

function getRowKey(row: Record<string, unknown>, rowIndex: number) {
  const value = row[props.rowKey]
  return value === undefined || value === null ? String(rowIndex) : String(value)
}

function getCellValue(row: Record<string, unknown>, column: TableColumn) {
  return row[column.key]
}

function normalizeInputValue(value: unknown) {
  return typeof value === 'number' ? value : String(value ?? '')
}

function normalizeEditedCellValue(value: string | number | undefined, oldValue: unknown) {
  if (typeof oldValue === 'number') {
    const next = Number(value)
    return Number.isNaN(next) ? value : next
  }

  return value
}

function formatCellValue(row: Record<string, unknown>, column: TableColumn) {
  const value = getCellValue(row, column)
  return column.formatter ? column.formatter(value, row) : String(value ?? '')
}

function formatCssSize(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

function setCssVariable(style: Record<string, string>, key: string, value: string | undefined) {
  if (value) {
    style[key] = value
  }
}

function getCellStyle(column: ResolvedColumn, type: 'header' | 'body' = 'body', rowIndex = 0): CSSProperties {
  const style: CSSProperties = {
    justifyContent: alignToJustify(column.align),
    textAlign: column.align
  }

  if (column.fixed !== 'none') {
    style.position = 'sticky'
    style[column.fixed] = column.fixed === 'left' ? column.left : column.right
    style.zIndex = type === 'header' ? 3 : 2
    style.background = type === 'header' ? 'var(--x-table-header-background, #f3f6fa)' : getBodyRowLayeredBackground(rowIndex)
    if (column.fixed === 'left' && column.column.key === lastLeftFixedColumnKey.value) {
      style.boxShadow = leftFrozenBoundaryShadow
    }
    if (column.fixed === 'right' && column.column.key === firstRightFixedColumnKey.value) {
      style.boxShadow = rightFrozenBoundaryShadow
    }
  }

  return style
}

function getUtilityCellStyle(kind: 'drag' | 'selection', type: 'header' | 'body' = 'body', rowIndex = 0): CSSProperties {
  if (!hasLeftFixedColumns.value) {
    return {}
  }

  const style: CSSProperties = {
    position: 'sticky',
    left: kind === 'selection' && props.rowDraggable ? '44px' : '0px',
    zIndex: type === 'header' ? 3 : 2,
    background: type === 'header' ? 'var(--x-table-header-background, #f3f6fa)' : getBodyRowLayeredBackground(rowIndex)
  }

  return style
}

function getBodyRowBackground(rowIndex: number) {
  return rowIndex % 2 === 1
    ? 'var(--x-table-body-stripe-background, transparent)'
    : 'var(--x-table-body-background, #fff)'
}

function getBodyRowLayeredBackground(rowIndex: number) {
  return `linear-gradient(var(--x-table-row-hover-overlay-current, transparent), var(--x-table-row-hover-overlay-current, transparent)), ${getBodyRowBackground(rowIndex)}`
}

function alignToJustify(align: TableColumn['align']) {
  if (align === 'center') {
    return 'center'
  }

  if (align === 'right') {
    return 'flex-end'
  }

  return 'flex-start'
}

onMounted(() => {
  nextTick(syncScrollState)

  if (bodyViewportRef.value && typeof ResizeObserver !== 'undefined') {
    bodyResizeObserver = new ResizeObserver(syncScrollState)
    bodyResizeObserver.observe(bodyViewportRef.value)
  }

  window.addEventListener('resize', syncScrollState, { passive: true })
  window.addEventListener('pointermove', handleScrollbarDrag)
  window.addEventListener('pointermove', handleColumnResize)
  window.addEventListener('pointerup', stopScrollbarDrag)
  window.addEventListener('pointerup', stopColumnResize)
  window.addEventListener('pointercancel', stopScrollbarDrag)
  window.addEventListener('pointercancel', stopColumnResize)
  window.addEventListener('pointerdown', handleWindowPointerDown)
  window.addEventListener('mousemove', handleCellSelectionPointerMove)
  window.addEventListener('mouseup', stopCellSelectionDrag)
  document.addEventListener('pointerdown', handleCellEditOutsidePointerDown, true)
})

onBeforeUnmount(() => {
  if (cellSelectionFrame) {
    window.cancelAnimationFrame(cellSelectionFrame)
    cellSelectionFrame = 0
  }
  stopCellSelectionAutoScroll()
  pendingCellSelectionRange = null
  pendingCellSelection = null
  previewSelectedCellKeys.value = null
  latestCellSelectionPointer = null
  if (staleExternalCellSelectionTimer) {
    window.clearTimeout(staleExternalCellSelectionTimer)
    staleExternalCellSelectionTimer = null
  }
  bodyResizeObserver?.disconnect()
  bodyResizeObserver = null
  activeColumnResize = null
  window.removeEventListener('resize', syncScrollState)
  window.removeEventListener('pointermove', handleScrollbarDrag)
  window.removeEventListener('pointermove', handleColumnResize)
  window.removeEventListener('pointerup', stopScrollbarDrag)
  window.removeEventListener('pointerup', stopColumnResize)
  window.removeEventListener('pointercancel', stopScrollbarDrag)
  window.removeEventListener('pointercancel', stopColumnResize)
  window.removeEventListener('pointerdown', handleWindowPointerDown)
  window.removeEventListener('mousemove', handleCellSelectionPointerMove)
  window.removeEventListener('mouseup', stopCellSelectionDrag)
  document.removeEventListener('pointerdown', handleCellEditOutsidePointerDown, true)
})

watch(
  () => [props.columns, props.columnSettings],
  () => {
    internalColumnSettings.value = normalizeColumnSettings(props.columnSettings ?? internalColumnSettings.value)
    nextTick(syncScrollState)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.currentPage,
  (page) => {
    internalCurrentPage.value = Math.max(1, normalizeInteger(page, 1))
  },
  { immediate: true }
)

watch(
  () => props.pageSize,
  (pageSize) => {
    internalPageSize.value = Math.max(1, normalizeInteger(pageSize, 10))
  },
  { immediate: true }
)

watch(
  () => [paginationTotal.value, normalizedPageSize.value],
  () => {
    const nextPage = clampPage(internalCurrentPage.value)
    if (nextPage !== internalCurrentPage.value) {
      internalCurrentPage.value = nextPage
      emit('update:currentPage', nextPage)
    }
    nextTick(syncScrollState)
  },
  { immediate: true }
)

watch(
  normalizedSelectedCellKeys,
  (keys) => {
    const signature = getSelectedCellKeySignature(keys)
    if (
      isIgnoringStaleExternalCellSelection &&
      latestLocalSelectedCellSignature &&
      signature !== latestLocalSelectedCellSignature
    ) {
      pendingLocalSelectedCellSignatures.delete(signature)
      return
    }

    if (
      latestLocalSelectedCellSignature &&
      signature !== latestLocalSelectedCellSignature &&
      pendingLocalSelectedCellSignatures.has(signature)
    ) {
      pendingLocalSelectedCellSignatures.delete(signature)
      return
    }

    internalSelectedCellKeys.value = [...keys]
    if (signature === latestLocalSelectedCellSignature) {
      pendingLocalSelectedCellSignatures.clear()
    }
  },
  { immediate: true }
)

watch(
  () => [props.data, props.columns, props.showActions, props.actionsWidth, props.showPagination, normalizedCurrentPage.value, normalizedPageSize.value, internalColumnSettings.value],
  () => {
    nextTick(syncScrollState)
  },
  { deep: true }
)

defineExpose({
  getColumnSettings: () => internalColumnSettings.value.map((setting) => ({ ...setting })),
  setColumnSettings,
  resetColumnSettings,
  getPagination: () => ({ ...paginationState.value }),
  setPage,
  setPageSize
})
</script>

<template>
  <div
    v-bind="rootAttrs"
    ref="tableRootRef"
    class="x-table"
    :class="[`x-table--${mergedSize}`, { 'is-fill-height': fillHeight }]"
    :style="mergedTableStyle"
    tabindex="0"
    @keydown.capture="handleTableKeydown"
  >
    <div v-if="$slots.top || showColumnSettings" class="x-table__top">
      <slot name="top" v-bind="slotScope" />
      <button
        v-if="showColumnSettings"
        class="x-table__column-settings-button"
        type="button"
        aria-label="列设置"
        title="列设置"
        @click="handleColumnSettingsClick"
      >
        <i class="ri-settings-3-line" aria-hidden="true"></i>
      </button>
    </div>

    <div class="x-table__viewport">
      <div v-if="showHeader" ref="headerViewportRef" class="x-table__header-viewport">
        <div
          class="x-table__row x-table__row--header"
          role="row"
          :style="{ gridTemplateColumns }"
        >
          <div
            v-if="rowDraggable"
            class="x-table__cell x-table__cell--header x-table__cell--drag"
            role="columnheader"
            aria-label="拖拽排序"
            :style="getUtilityCellStyle('drag', 'header')"
          />
          <div
            v-if="isRowSelectionColumnVisible"
            class="x-table__cell x-table__cell--header x-table__cell--selection"
            role="columnheader"
            :style="getUtilityCellStyle('selection', 'header')"
          >
            <input
              class="x-table__checkbox"
              type="checkbox"
              aria-label="选择全部行"
              :checked="isAllSelected"
              :indeterminate.prop="isSelectionIndeterminate"
              @change="handleSelectionHeaderChange"
            />
          </div>
          <div
            v-for="column in resolvedColumns"
            :key="column.column.key"
            class="x-table__cell x-table__cell--header"
            role="columnheader"
            :style="getCellStyle(column, 'header')"
          >
            <span class="x-table__header-label">{{ column.column.label }}</span>
            <span
              v-if="columnResizable"
              class="x-table__column-resize-handle"
              role="separator"
              aria-orientation="vertical"
              :aria-label="`调整 ${column.column.label} 列宽`"
              @pointerdown="startColumnResize(column, $event)"
              @dblclick="autoFitColumnWidth(column, $event)"
            />
          </div>
          <div
            v-if="showActions"
            class="x-table__cell x-table__cell--header x-table__cell--actions"
            role="columnheader"
          >
            操作
          </div>
        </div>
      </div>

      <div class="x-table__body-shell">
        <div ref="bodyViewportRef" class="x-table__body-viewport" @scroll="handleBodyScroll">
          <div v-if="visibleRows.length > 0" class="x-table__body" role="rowgroup">
            <div
              v-for="{ row, rowIndex } in visibleRows"
              :key="getRowKey(row, rowIndex)"
              class="x-table__row x-table__row--body"
              :class="getRowClasses(row, rowIndex)"
              role="row"
              :style="{ gridTemplateColumns }"
              @dragover="handleRowDragOver(row, rowIndex, $event)"
              @drop="handleRowDrop(row, rowIndex, $event)"
              @dragend="resetDragState"
              @click="handleRowClick(row, rowIndex, $event)"
              @dblclick="handleRowDoubleClick(row, rowIndex, $event)"
            >
              <div
                v-if="rowDraggable"
                class="x-table__cell x-table__cell--drag"
                role="cell"
                aria-hidden="true"
                :draggable="rowDraggable"
                :style="getUtilityCellStyle('drag', 'body', rowIndex)"
                @dragstart="handleRowDragStart(row, rowIndex, $event)"
                @dragend="resetDragState"
              >
                <span class="x-table__drag-handle">⋮⋮</span>
              </div>
              <div
                v-if="isRowSelectionColumnVisible"
                class="x-table__cell x-table__cell--selection"
                role="cell"
                :style="getUtilityCellStyle('selection', 'body', rowIndex)"
              >
                <input
                  class="x-table__checkbox"
                  type="checkbox"
                  :aria-label="`选择第 ${rowIndex + 1} 行`"
                  :checked="isRowSelected(row, rowIndex)"
                  @change="handleRowSelectionChange(row, rowIndex, $event)"
                  @click.stop
                  @dragstart.stop
                />
              </div>
              <div
                v-for="(column, columnIndex) in resolvedColumns"
                :key="column.column.key"
                class="x-table__cell"
                :class="getCellSelectionClasses(row, rowIndex, column.column, columnIndex)"
                :data-x-table-cell-row-index="rowIndex"
                :data-x-table-cell-column-index="columnIndex"
                role="cell"
                :style="getCellStyle(column, 'body', rowIndex)"
                @mousedown="startCellSelection(rowIndex, columnIndex, $event)"
                @click="toggleCellSelection(row, rowIndex, column.column, $event)"
                @dblclick="startCellEdit(row, rowIndex, column.column, $event)"
                @contextmenu="openCellContextMenu($event)"
              >
                <div
                  v-if="isCellEditing(row, rowIndex, column.column)"
                  class="x-table__cell-editor"
                  @click.stop
                  @mousedown.stop
                >
                  <slot
                    :name="`editor-${column.column.key}`"
                    :row="row"
                    :value="getCellValue(row, column.column)"
                    :model-value="editingCellValue"
                    :column="column.column"
                    :row-index="rowIndex"
                    :update-model-value="updateEditingCellValue"
                    :commit="commitCellEdit"
                    :commit-value="commitCellEditValue"
                    :cancel="cancelCellEditAndFocusTable"
                  >
                    <XBaseInput
                      :model-value="editingCellValue"
                      :text-align="column.align"
                      auto-height
                      padding="0 12px"
                      radius="0"
                      :size="mergedSize"
                      @update:model-value="updateEditingCellValue"
                      @change="commitCellEdit"
                      @blur="commitCellEdit"
                      @keydown.enter.prevent.stop="commitCellEditAndFocusTable"
                      @keydown.esc.prevent.stop="cancelCellEditAndFocusTable"
                    />
                  </slot>
                </div>
                <template v-else>
                  <slot
                    :name="`cell-${column.column.key}`"
                    :row="row"
                    :value="getCellValue(row, column.column)"
                    :column="column.column"
                    :row-index="rowIndex"
                  >
                    {{ formatCellValue(row, column.column) }}
                  </slot>
                </template>
                <span
                  v-if="isCellSelectionHandleVisible(rowIndex, columnIndex)"
                  class="x-table__cell-selection-handle"
                  :class="`is-${cellSelectionHandleCorner}`"
                  aria-hidden="true"
                  @mousedown="startCellSelectionResize"
                />
              </div>
              <div v-if="showActions" class="x-table__cell x-table__cell--actions" role="cell">
                <slot name="row-actions" :row="row" :row-index="rowIndex" />
              </div>
            </div>
          </div>

          <div v-else class="x-table__empty">
            {{ emptyText }}
          </div>
        </div>

        <div
          v-if="hasVerticalScrollbar"
          class="x-table__scrollbar x-table__scrollbar--vertical"
          aria-hidden="true"
        >
          <div
            class="x-table__scrollbar-thumb"
            :style="verticalThumbStyle"
            @pointerdown="startScrollbarDrag('y', $event)"
          />
        </div>
        <div
          v-if="hasHorizontalScrollbar"
          class="x-table__scrollbar x-table__scrollbar--horizontal"
          aria-hidden="true"
        >
          <div
            class="x-table__scrollbar-thumb"
            :style="horizontalThumbStyle"
            @pointerdown="startScrollbarDrag('x', $event)"
          />
        </div>
      </div>
    </div>

    <div v-if="$slots.bottom || isPaginationVisible" class="x-table__bottom">
      <slot name="bottom" v-bind="slotScope" />
      <div v-if="isPaginationVisible" class="x-table__pagination" role="navigation" aria-label="表格分页">
        <span class="x-table__pagination-total">共 {{ paginationState.total }} 条</span>
        <label class="x-table__page-size">
          <span>每页</span>
          <select
            class="x-table__page-size-select"
            :value="paginationState.pageSize"
            aria-label="每页条数"
            @change="handlePageSizeChange"
          >
            <option v-for="size in normalizedPageSizes" :key="size" :value="size">
              {{ size }} 条
            </option>
          </select>
        </label>
        <button
          class="x-table__page-button"
          type="button"
          aria-label="上一页"
          :disabled="paginationState.currentPage <= 1"
          @click="setPage(paginationState.currentPage - 1)"
        >
          上一页
        </button>
        <span class="x-table__page-current">
          {{ paginationState.currentPage }} / {{ paginationState.pageCount }}
        </span>
        <button
          class="x-table__page-button"
          type="button"
          aria-label="下一页"
          :disabled="paginationState.currentPage >= paginationState.pageCount"
          @click="setPage(paginationState.currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>

    <div
      v-if="contextMenuState"
      class="x-table__context-menu"
      :style="contextMenuStyle"
      role="menu"
      @contextmenu.prevent
    >
      <button class="x-table__context-menu-item" type="button" role="menuitem" @click="handleContextMenuAutoFit">
        适合内容宽度
      </button>
    </div>
  </div>
</template>

<style scoped>
.x-table {
  align-content: start;
  align-self: stretch;
  background: var(--x-table-panel-background, transparent);
  --x-table-border-color: var(--x-border-color, rgb(216 224 234));
  --x-table-section-gap: 8px;
  --x-table-section-padding-y: 8px;
  box-sizing: border-box;
  color: var(--x-table-text-color, #1f2937);
  display: grid;
  font-size: var(--x-table-font-size, 12px);
  row-gap: var(--x-table-section-gap);
  min-width: 0;
  overflow: hidden;
  width: 100%;
}

.x-table.is-fill-height {
  align-content: stretch;
  grid-template-rows: auto minmax(0, 1fr) auto;
  height: 100%;
}

.x-table.is-fill-height > .x-table__top {
  grid-row: 1;
}

.x-table.is-fill-height > .x-table__viewport {
  grid-row: 2;
}

.x-table.is-fill-height > .x-table__bottom {
  grid-row: 3;
}

.x-table__top,
.x-table__bottom {
  min-width: 0;
  padding: var(--x-table-cell-padding, 0 8px);
  padding-block: var(--x-table-section-padding-y);
  position: relative;
  z-index: 3;
}

.x-table__top {
  align-items: center;
  background: var(--x-table-top-background, var(--x-table-panel-background, #f8fafc));
  display: flex;
  gap: 8px;
  justify-content: space-between;
}

.x-table__column-settings-button {
  align-items: center;
  background: var(--x-table-control-bg, #fff);
  border: 1px solid var(--x-table-control-border-color, #cbd5e1);
  border-radius: var(--x-table-radius, 6px);
  color: var(--x-table-control-text-color, #334155);
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: calc(var(--x-table-font-size, 12px) + 6px);
  height: var(--x-table-row-height, 30px);
  justify-content: center;
  line-height: 1;
  margin-left: auto;
  padding: 0;
  width: var(--x-table-row-height, 30px);
}

.x-table__column-settings-button:hover {
  background: var(--x-table-control-hover-bg, #f8fafc);
  border-color: var(--x-table-control-hover-border-color, #94a3b8);
  color: var(--x-table-control-hover-text-color, var(--x-color-primary, #155e75));
}

.x-table__column-settings-button:focus-visible {
  box-shadow: var(--x-shadow-focus, 0 0 0 3px rgb(14 116 144 / 20%));
  outline: none;
}

.x-table__bottom {
  align-items: center;
  background: var(--x-table-bottom-background, var(--x-table-panel-background, #f8fafc));
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
}

.x-table__pagination {
  align-items: center;
  color: var(--x-table-pagination-text-color, #475569);
  display: inline-flex;
  flex-wrap: wrap;
  font-size: var(--x-table-font-size, 12px);
  gap: 8px;
  margin-left: auto;
}

.x-table__pagination-total {
  font-weight: 600;
}

.x-table__page-size {
  align-items: center;
  display: inline-flex;
  gap: 6px;
}

.x-table__page-size-select,
.x-table__page-button {
  background: var(--x-table-control-bg, #fff);
  border: 1px solid var(--x-table-control-border-color, #cbd5e1);
  border-radius: var(--x-table-radius, 6px);
  box-sizing: border-box;
  color: var(--x-table-control-text-color, #334155);
  min-height: var(--x-table-row-height, 30px);
}

.x-table__page-size-select {
  padding: var(--x-table-cell-padding, 0 8px);
}

.x-table__page-size-select option {
  background: var(--x-table-control-bg, #fff);
  color: var(--x-table-control-text-color, #334155);
}

.x-table__page-button {
  cursor: pointer;
  padding: var(--x-table-cell-padding, 0 8px);
}

.x-table__page-size-select:hover,
.x-table__page-button:hover:not(:disabled) {
  background: var(--x-table-control-hover-bg, #f8fafc);
  border-color: var(--x-table-control-hover-border-color, #94a3b8);
  color: var(--x-table-control-hover-text-color, var(--x-color-primary, #155e75));
}

.x-table__page-button:disabled {
  background: var(--x-table-control-disabled-bg, #f1f5f9);
  color: var(--x-table-control-disabled-text-color, #94a3b8);
  cursor: not-allowed;
}

.x-table__page-current {
  color: var(--x-table-pagination-current-text-color, #334155);
  min-width: 52px;
  text-align: center;
}

.x-table__viewport {
  border-bottom-color: var(--x-table-viewport-border-color, var(--x-table-horizontal-border-color, var(--x-table-border-color)));
  border-bottom-style: solid;
  border-bottom-width: var(--x-table-horizontal-border-width, 1px);
  border-left-color: var(--x-table-viewport-border-color, var(--x-table-vertical-border-color, var(--x-table-border-color)));
  border-left-style: solid;
  border-left-width: var(--x-table-vertical-border-width, 1px);
  border-right-color: var(--x-table-viewport-border-color, var(--x-table-vertical-border-color, var(--x-table-border-color)));
  border-right-style: solid;
  border-right-width: var(--x-table-vertical-border-width, 1px);
  border-top-color: var(--x-table-viewport-border-color, var(--x-table-horizontal-border-color, var(--x-table-border-color)));
  border-top-style: solid;
  border-top-width: var(--x-table-horizontal-border-width, 1px);
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 0;
  min-width: 0;
}

.x-table__header-viewport {
  border-bottom-color: var(--x-table-header-divider-color, var(--x-table-horizontal-border-color, var(--x-table-border-color)));
  border-bottom-style: solid;
  border-bottom-width: var(--x-table-horizontal-border-width, 1px);
  min-width: 0;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.x-table__body-shell {
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.x-table__body-viewport {
  background: var(--x-table-body-background, #fff);
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow: auto;
  scrollbar-width: none;
}

.x-table__body-viewport::-webkit-scrollbar {
  display: none;
}

.x-table__scrollbar {
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.x-table__scrollbar--vertical {
  bottom: 8px;
  right: 3px;
  top: 8px;
  width: 6px;
}

.x-table__scrollbar--horizontal {
  bottom: 3px;
  height: 6px;
  left: 8px;
  right: 8px;
}

.x-table__scrollbar-thumb {
  background: rgb(100 116 139 / 36%);
  border-radius: 999px;
  pointer-events: auto;
}

.x-table__scrollbar--vertical .x-table__scrollbar-thumb {
  width: 100%;
}

.x-table__scrollbar--horizontal .x-table__scrollbar-thumb {
  height: 100%;
}

.x-table__scrollbar-thumb:hover {
  background: rgb(71 85 105 / 54%);
}

.x-table__row {
  display: grid;
  min-width: max-content;
}

.x-table__row--header {
  background: var(--x-table-header-background, #f3f6fa);
  color: var(--x-table-header-text-color, #334155);
  font-weight: 600;
}

.x-table__row--body {
  background:
    linear-gradient(var(--x-table-row-hover-overlay-current, transparent), var(--x-table-row-hover-overlay-current, transparent)),
    var(--x-table-body-background, #fff);
  color: var(--x-table-body-text-color, var(--x-table-text-color, #1f2937));
  position: relative;
  transition:
    background-color 140ms ease,
    box-shadow 140ms ease,
    margin 140ms ease,
    opacity 140ms ease,
    transform 140ms ease;
}

.x-table__row--body:nth-child(even) {
  background:
    linear-gradient(var(--x-table-row-hover-overlay-current, transparent), var(--x-table-row-hover-overlay-current, transparent)),
    var(--x-table-body-stripe-background, transparent);
}

.x-table__row--body + .x-table__row--body {
  border-top: var(--x-table-horizontal-border-width, 1px) solid var(--x-table-row-border-color, var(--x-table-horizontal-border-color, var(--x-table-border-color)));
}

.x-table__row--body:last-child {
  border-bottom: var(--x-table-horizontal-border-width, 1px) solid var(--x-table-row-border-color, var(--x-table-horizontal-border-color, var(--x-table-border-color)));
}

.x-table__row--body:hover {
  --x-table-row-hover-overlay-current: var(--x-table-row-hover-overlay, rgb(14 116 144 / 6%));
}

.x-table__row--body.is-selected {
  background: var(--x-table-row-selected-background, #eef6ff);
}

.x-table__row--body.is-dragging {
  opacity: 0.46;
  transform: scale(0.998);
}

.x-table__row--body.is-drag-over-before,
.x-table__row--body.is-drag-over-after {
  background: var(--x-table-row-drag-background, #f0f9ff);
  box-shadow: 0 4px 14px rgb(15 23 42 / 10%);
}

.x-table__row--body.is-drag-over-before {
  margin-top: 10px;
}

.x-table__row--body.is-drag-over-after {
  margin-bottom: 10px;
}

.x-table__row--body.is-drag-over-before::before,
.x-table__row--body.is-drag-over-after::after {
  background: var(--x-table-drag-indicator-color, var(--x-color-primary, #155e75));
  border-radius: 999px;
  content: "";
  height: 2px;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 4;
}

.x-table__row--body.is-drag-over-before::before {
  top: -6px;
}

.x-table__row--body.is-drag-over-after::after {
  bottom: -6px;
}

.x-table__cell {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  min-height: var(--x-table-row-height, 30px);
  min-width: 0;
  overflow: hidden;
  padding: var(--x-table-cell-padding, 0 8px);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-table__cell + .x-table__cell {
  border-left: var(--x-table-vertical-border-width, 1px) solid var(--x-table-column-border-color, var(--x-table-vertical-border-color, var(--x-table-border-color)));
}

.x-table__context-menu {
  background: var(--x-table-control-bg, #fff);
  border: 1px solid var(--x-table-control-border-color, #cbd5e1);
  border-radius: 6px;
  box-shadow: 0 10px 24px rgb(15 23 42 / 16%);
  box-sizing: border-box;
  min-width: 132px;
  padding: 4px;
  position: fixed;
  z-index: 1000;
}

.x-table__context-menu-item {
  background: transparent;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  color: var(--x-table-control-text-color, #334155);
  cursor: pointer;
  display: block;
  font: inherit;
  line-height: 1.4;
  padding: 6px 10px;
  text-align: left;
  width: 100%;
}

.x-table__context-menu-item:hover,
.x-table__context-menu-item:focus-visible {
  background: var(--x-table-control-hover-bg, #f8fafc);
  color: var(--x-table-control-hover-text-color, var(--x-color-primary, #155e75));
  outline: none;
}

.x-table__cell.is-cell-selectable {
  cursor: cell;
}

.x-table__cell.is-editing {
  align-items: stretch;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-content: stretch !important;
  overflow: hidden;
  padding: 0;
  position: relative;
  z-index: 7;
}

.x-table__cell-editor {
  align-self: stretch;
  box-sizing: border-box;
  display: grid;
  height: 100%;
  min-width: 0;
  min-height: 0;
  width: 100%;
}

.x-table__cell-editor :deep(.x-base-input) {
  box-sizing: border-box;
  height: 100%;
  max-width: 100%;
  min-height: 0;
  width: 100%;
}

.x-table__cell-editor :deep(input.x-base-input__inner) {
  flex: 1 1 0;
  width: 100%;
}

.x-table__cell.is-selected-cell {
  background: var(--x-table-cell-selected-background, rgb(59 130 246 / 12%));
  color: var(--x-table-cell-selected-text-color, var(--x-table-body-text-color, var(--x-table-text-color, #1f2937)));
  overflow: visible;
  position: relative;
  z-index: 5;
}

.x-table__cell.is-selected-cell::after {
  border: 2px solid var(--x-table-cell-selected-border-color, var(--x-color-primary, #155e75));
  box-sizing: border-box;
  content: "";
  inset: -1px;
  pointer-events: none;
  position: absolute;
}

.x-table__row--body:first-child .x-table__cell.is-selected-cell::after {
  top: 0;
}

.x-table__cell.is-selected-cell.is-selected-cell-adjacent-top::after {
  border-top-color: var(--x-table-cell-selected-inner-border-color, var(--x-table-cell-selected-border-color, var(--x-color-primary, #155e75)));
  border-top-width: 1px;
}

.x-table__cell.is-selected-cell.is-selected-cell-adjacent-right::after {
  border-right-width: 0;
}

.x-table__cell.is-selected-cell.is-selected-cell-adjacent-bottom::after {
  border-bottom-width: 0;
}

.x-table__cell.is-selected-cell.is-selected-cell-adjacent-left::after {
  border-left-color: var(--x-table-cell-selected-inner-border-color, var(--x-table-cell-selected-border-color, var(--x-color-primary, #155e75)));
  border-left-width: 1px;
}

.x-table__cell-selection-handle {
  background: var(--x-table-cell-selected-border-color, var(--x-color-primary, #155e75));
  bottom: 0;
  box-sizing: border-box;
  cursor: nwse-resize;
  height: 8px;
  position: absolute;
  right: 0;
  width: 8px;
  z-index: 6;
}

.x-table__cell-selection-handle.is-bottom-left {
  left: 0;
  right: auto;
}

.x-table__cell--header {
  min-height: var(--x-table-row-height, 30px);
  position: relative;
}

.x-table__header-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.x-table__column-resize-handle {
  bottom: 0;
  cursor: col-resize;
  position: absolute;
  right: -4px;
  top: 0;
  width: 8px;
  z-index: 5;
}

.x-table__column-resize-handle::after {
  background: transparent;
  bottom: 8px;
  content: "";
  left: 2px;
  position: absolute;
  top: 8px;
  width: 4px;
}

.x-table__column-resize-handle:hover::after {
  background: var(--x-color-primary, #155e75);
}

.x-table__cell--selection,
.x-table__cell--drag {
  justify-content: center;
  padding-left: 8px;
  padding-right: 8px;
}

.x-table__checkbox {
  accent-color: var(--x-color-primary, #155e75);
  cursor: pointer;
  height: 16px;
  margin: 0;
  width: 16px;
}

.x-table__drag-handle {
  color: #94a3b8;
  cursor: grab;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 1;
  user-select: none;
}

.x-table__row--body.is-dragging .x-table__drag-handle {
  cursor: grabbing;
}

.x-table__cell--actions {
  justify-content: flex-start;
}

.x-table__empty {
  align-items: center;
  background: var(--x-table-body-background, #fff);
  color: var(--x-table-body-text-color, #64748b);
  display: flex;
  justify-content: center;
  min-height: 160px;
  padding: 24px;
}
</style>
