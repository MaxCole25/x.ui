<script setup lang="ts">
import 'element-plus/dist/index.css'
import 'remixicon/fonts/remixicon.css'
import '../../src/styles/index.css'
import { Search } from '@element-plus/icons-vue'
import {
  ElButton,
  ElCheckbox,
  ElDatePicker,
  ElIcon,
  ElInput,
  ElPagination,
  ElRadio,
  ElRadioGroup,
  ElSwitch,
  ElTag,
  vLoading
} from 'element-plus'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { XOption, XSelect } from '../../src/components/select'
import { XDialog } from '../../dialog'
import type { TableCellChange, TableColumn, TableColumnSetting, TableDirtySubmitPayload, TableFixed, TableProps, TableQueryChangePayload, TableRowDblclickPayload, TableRowKey, TableSize, TableStoredState } from './old-types'

defineOptions({ name: 'XTable' })

const props = withDefaults(defineProps<TableProps>(), {
  title: '',
  rowKey: 'id',
  loading: false,
  searchable: true,
  selectable: true,
  showIndex: true,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  showToolbar: true,
  showMetrics: true,
  showPagination: true,
  showActions: false,
  actionsMinWidth: 180,
  emptyText: '暂无数据',
  emptyImage: '',
  editable: false,
  showDirtyActions: true,
  storageKey: '',
  draggableRows: true,
  draggableColumns: true,
  fillHeight: false,
  zebraStripeColor: '#f8fbff',
  borderColor: 'var(--el-border-color-lighter)',
  headerHeight: 48,
  headerBackgroundColor: 'var(--el-fill-color-light)',
  headerTextColor: 'var(--el-text-color-primary)',
  bodyBackgroundColor: '#fff',
  bodyTextColor: 'var(--el-text-color-primary)',
  rowHoverBackgroundColor: 'var(--el-fill-color-lighter)',
  fixedShadowColor: 'rgb(15 23 42 / 10%)',
  dirtyMarkColor: 'var(--el-color-warning)',
  showHeaderVerticalDivider: true,
  showBodyVerticalDivider: true,
  density: 'default',
  rowHeight: 48,
  activeCellBorderColor: 'var(--x-color-primary, #0e7490)',
  activeCellBorderWidth: 2,
  selectedCellBackgroundColor: 'rgb(191 219 254 / 72%)',
  selectedCellBorderColor: '#2680eb',
  selectedCellInnerBorderColor: 'rgb(96 165 250 / 42%)',
  contextMenuBackgroundColor: '#fff',
  contextMenuTextColor: 'var(--el-text-color-primary)',
  cellSelectable: true,
  selectionMode: 'cell',
  headerAlign: 'left',
  remote: false,
  total: 0
})

const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'selection-change', rows: Array<Record<string, unknown>>): void
  (e: 'selectionChange', rows: Array<Record<string, unknown>>): void
  (e: 'row-order-change', rowKeys: TableRowKey[]): void
  (e: 'rowOrderChange', rowKeys: TableRowKey[]): void
  (e: 'column-order-change', columnKeys: string[]): void
  (e: 'columnOrderChange', columnKeys: string[]): void
  (e: 'cell-change', change: TableCellChange): void
  (e: 'dirty-change', changes: TableCellChange[]): void
  (e: 'submit-changes', payload: TableDirtySubmitPayload): void
  (e: 'update:data', rows: Array<Record<string, unknown>>): void
  (e: 'update:density', value: TableSize): void
  (e: 'query-change', payload: TableQueryChangePayload): void
  (e: 'import-success', rows: Array<Record<string, unknown>>): void
  (e: 'row-dblclick', payload: TableRowDblclickPayload): void
  (e: 'rowDblclick', payload: TableRowDblclickPayload): void
}>()
const draftRows = ref<Array<Record<string, unknown>>>(cloneRows(props.data))
const keyword = ref('')
const currentPage = ref(1)
const innerPageSize = ref(props.pageSize)
const density = ref<TableSize>(props.density)
const selectedRows = ref<Array<Record<string, unknown>>>([])
const visibleColumnKeys = ref(props.columns.map((column) => column.key))
const columnOrderKeys = ref(props.columns.map((column) => column.key))
const columnSettingsVisible = ref(false)
const columnFixedMap = ref<Record<string, TableFixed | null | undefined>>({})
const columnWidthRatioMap = ref<Record<string, number | undefined>>({})
const columnWidthMap = ref<Record<string, number | undefined>>({})
const rowOrderKeys = ref<TableRowKey[]>([])
const draggingRowKey = ref<TableRowKey | null>(null)
const draggingColumnKey = ref<string | null>(null)
const resizingColumn = ref<{
  key: string
  startX: number
  startWidth: number
} | null>(null)
const rowDropIndicator = ref<{ targetKey: TableRowKey | null; position: 'before' | 'after' | null }>({
  targetKey: null,
  position: null
})
const columnDropIndicator = ref<{ targetKey: string | null; position: 'before' | 'after' | null }>({
  targetKey: null,
  position: null
})
const applyingStoredState = ref(false)
const dirtyCellMap = ref<Record<string, TableCellChange>>({})
const tableRoot = ref<HTMLElement | null>(null)
const shellRoot = ref<HTMLElement | null>(null)
const headerScrollRoot = ref<HTMLElement | null>(null)
const bodyScrollRoot = ref<HTMLElement | null>(null)
const shellWidth = ref(0)
const tableRootHeight = ref(0)
let tableResizeObserver: ResizeObserver | null = null
let widthMeasureContext: CanvasRenderingContext2D | null | undefined
const activeCell = ref<{ rowKey: TableRowKey; columnKey: string } | null>(null)
const editingCell = ref<{ rowKey: TableRowKey; columnKey: string } | null>(null)
const activeSort = ref<{ key: string; order: 'ascending' | 'descending' | null } | null>(null)
const selectedCellKeys = ref<string[]>([])
const selectionAnchorCell = ref<{ rowKey: TableRowKey; columnKey: string } | null>(null)
const selectingCell = ref<{ rowKey: TableRowKey; columnKey: string } | null>(null)
const isCellSelecting = ref(false)
const selectionHandle = ref({
  visible: false,
  position: { top: 0, left: 0 }
})
const contextMenu = ref<{
  visible: boolean
  rowKey: TableRowKey | null
  columnKey: string
  position: { top: number; left: number }
}>({
  visible: false,
  rowKey: null,
  columnKey: '',
  position: { top: 0, left: 0 }
})
const dropdownPicker = ref<{
  visible: boolean
  rowKey: TableRowKey | null
  column: TableColumn | null
  keyword: string
  position: { top: number; left: number; width: number }
}>({
  visible: false,
  rowKey: null,
  column: null,
  keyword: '',
  position: { top: 0, left: 0, width: 240 }
})

const canUseLocalStorage = computed(() => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined')

const resolvedStorageKey = computed(() => {
  if (!props.storageKey) {
    return ''
  }

  return `x-table:${props.storageKey}`
})

const searchableColumns = computed(() => props.columns.filter((column) => column.searchable !== false))

const orderedColumns = computed(() => {
  const orderMap = new Map(columnOrderKeys.value.map((key, index) => [key, index]))
  return [...props.columns].sort(
    (left, right) =>
      (orderMap.get(left.key) ?? Number.MAX_SAFE_INTEGER) -
      (orderMap.get(right.key) ?? Number.MAX_SAFE_INTEGER)
  )
})

const activeColumns = computed(() =>
  orderedColumns.value.filter((column) => visibleColumnKeys.value.includes(column.key))
)

const hasConfiguredColumnRatio = computed(() =>
  activeColumns.value.some((column) => normalizePositiveNumber(columnWidthRatioMap.value[column.key]))
)

const configuredColumnWidthTotal = computed(() =>
  activeColumns.value.reduce((total, column) => total + (normalizePositiveNumber(columnWidthMap.value[column.key]) ?? 0), 0)
)

const fluidColumnShareTotal = computed(() =>
  activeColumns.value.reduce((total, column) => {
    if (normalizePositiveNumber(columnWidthMap.value[column.key])) {
      return total
    }

    return total + (normalizePositiveNumber(columnWidthRatioMap.value[column.key]) ?? (hasConfiguredColumnRatio.value ? 1 : 0))
  }, 0)
)

const fluidAvailableWidth = computed(() => {
  const fixedUtilityWidth = (props.draggableRows ? 56 : 0) + (props.selectable ? 52 : 0) + (props.showIndex ? 62 : 0)
  const actionWidth = props.showActions ? Number.parseFloat(String(props.actionsMinWidth)) || 180 : 0
  return Math.max(shellWidth.value - fixedUtilityWidth - actionWidth - configuredColumnWidthTotal.value - 2, 0)
})

const orderedRows = computed(() => {
  const orderMap = new Map(rowOrderKeys.value.map((key, index) => [String(key), index]))
  return [...draftRows.value].sort((left, right) => {
    const leftKey = String(left[props.rowKey] ?? '')
    const rightKey = String(right[props.rowKey] ?? '')

    return (orderMap.get(leftKey) ?? Number.MAX_SAFE_INTEGER) - (orderMap.get(rightKey) ?? Number.MAX_SAFE_INTEGER)
  })
})

const filteredRows = computed(() => {
  const text = keyword.value.trim().toLowerCase()
  if (!text) {
    return orderedRows.value
  }

  return orderedRows.value.filter((row) =>
    searchableColumns.value.some((column) => {
      const value = row[column.key]
      const normalized = column.formatter
        ? column.formatter(value, row).toLowerCase()
        : String(value ?? '').toLowerCase()
      return normalized.includes(text)
    })
  )
})

const sortedRows = computed(() => {
  if (props.remote || !activeSort.value?.key || !activeSort.value.order) {
    return filteredRows.value
  }
  const { key, order } = activeSort.value
  const factor = order === 'ascending' ? 1 : -1
  return [...filteredRows.value].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (av === bv) return 0
    if (av === null || av === undefined) return -1 * factor
    if (bv === null || bv === undefined) return 1 * factor
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * factor
    return String(av).localeCompare(String(bv)) * factor
  })
})

const pagedRows = computed(() => {
  if (!props.showPagination || props.remote) {
    return sortedRows.value
  }

  const start = (currentPage.value - 1) * innerPageSize.value
  return sortedRows.value.slice(start, start + innerPageSize.value)
})

const totalCount = computed(() => (props.remote ? props.total : filteredRows.value.length))
const tableHeight = computed(() => (props.fillHeight ? '100%' : undefined))
const rowHeightPx = computed(() => `${props.rowHeight}px`)
const headerHeightPx = computed(() => `${props.headerHeight}px`)
const activeCellBorderWidthPx = computed(() =>
  typeof props.activeCellBorderWidth === 'number' ? `${props.activeCellBorderWidth}px` : props.activeCellBorderWidth
)
const activeCellBorderInsetPx = computed(() =>
  typeof props.activeCellBorderWidth === 'number' ? `${props.activeCellBorderWidth / -2}px` : `calc(${props.activeCellBorderWidth} / -2)`
)
const headerDividerStyle = computed(() => (props.showHeaderVerticalDivider ? `1px solid ${props.borderColor}` : 'none'))
const bodyDividerStyle = computed(() => (props.showBodyVerticalDivider ? `1px solid ${props.borderColor}` : 'none'))
const contextMenuStyle = computed<CSSProperties>(() => ({
  top: `${contextMenu.value.position.top}px`,
  left: `${contextMenu.value.position.left}px`,
  '--x-table-context-menu-bg': props.contextMenuBackgroundColor,
  '--x-table-context-menu-text': props.contextMenuTextColor
}))
const dirtyChanges = computed(() => Object.values(dirtyCellMap.value))
const editableColumns = computed(() =>
  activeColumns.value.filter((column) => isEditableColumn(column))
)
const dropdownColumns = computed(() => dropdownPicker.value.column?.dialogColumns ?? [])
const dropdownData = computed(() => {
  const source = dropdownPicker.value.column?.dialogData ?? []
  const text = dropdownPicker.value.keyword.trim().toLowerCase()
  if (!text) {
    return source
  }
  return source.filter((row) =>
    dropdownColumns.value.some((column) => String(row[column.key] ?? '').toLowerCase().includes(text))
  )
})

function cloneRows(rows: Array<Record<string, unknown>>) {
  return rows.map((row) => ({ ...row }))
}

function getRowIdentity(row: Record<string, unknown>) {
  return row[props.rowKey] as TableRowKey
}

function normalizePositiveNumber(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return undefined
  }

  const numberValue = Number(value)
  return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : undefined
}

function normalizeColumnFixed(value: unknown): TableFixed | undefined {
  return value === true || value === 'left' || value === 'right' ? value : undefined
}

function buildColumnSetting(column: TableColumn, order: number): TableColumnSetting {
  return {
    key: column.key,
    visible: visibleColumnKeys.value.includes(column.key),
    order,
    fixed: normalizeColumnFixed(
      Object.prototype.hasOwnProperty.call(columnFixedMap.value, column.key)
        ? columnFixedMap.value[column.key]
        : column.fixed
    ),
    widthRatio: normalizePositiveNumber(columnWidthRatioMap.value[column.key]),
    width: normalizePositiveNumber(columnWidthMap.value[column.key])
  }
}

function getColumnSettings(): TableColumnSetting[] {
  return columnOrderKeys.value
    .map((key, order) => {
      const column = props.columns.find((item) => item.key === key)
      return column ? buildColumnSetting(column, order) : null
    })
    .filter((item): item is TableColumnSetting => Boolean(item))
}

function getStoredState(): TableStoredState {
  return {
    keyword: keyword.value,
    density: density.value,
    pageSize: innerPageSize.value,
    currentPage: currentPage.value,
    visibleColumnKeys: [...visibleColumnKeys.value],
    columnOrderKeys: [...columnOrderKeys.value],
    columnSettings: getColumnSettings(),
    rowOrderKeys: [...rowOrderKeys.value]
  }
}

function buildDefaultState(): TableStoredState {
  return {
    keyword: '',
    density: props.density,
    pageSize: props.pageSize,
    currentPage: 1,
    visibleColumnKeys: props.columns.map((column) => column.key),
    columnOrderKeys: props.columns.map((column) => column.key),
    columnSettings: props.columns.map((column, order) => ({
      key: column.key,
      visible: true,
      order,
      fixed: normalizeColumnFixed(column.fixed),
      widthRatio: undefined,
      width: undefined
    })),
    rowOrderKeys: draftRows.value.map((row) => getRowIdentity(row))
  }
}

function syncColumnState() {
  const nextKeys = props.columns.map((column) => column.key)
  const currentOrder = columnOrderKeys.value.filter((key) => nextKeys.includes(key))
  columnOrderKeys.value = [...currentOrder, ...nextKeys.filter((key) => !currentOrder.includes(key))]

  const currentVisible = visibleColumnKeys.value.filter((key) => nextKeys.includes(key))
  visibleColumnKeys.value = currentVisible.length > 0 ? currentVisible : [...nextKeys]

  columnFixedMap.value = Object.fromEntries(
    Object.entries(columnFixedMap.value).filter(([key]) => nextKeys.includes(key))
  )
  columnWidthRatioMap.value = Object.fromEntries(
    Object.entries(columnWidthRatioMap.value).filter(([key]) => nextKeys.includes(key))
  )
  columnWidthMap.value = Object.fromEntries(
    Object.entries(columnWidthMap.value).filter(([key]) => nextKeys.includes(key))
  )
}

function syncRowState() {
  const nextKeys = draftRows.value.map((row) => getRowIdentity(row))
  const currentKeys = rowOrderKeys.value.filter((key) => nextKeys.some((value) => String(value) === String(key)))

  rowOrderKeys.value = [
    ...currentKeys,
    ...nextKeys.filter((key) => !currentKeys.some((value) => String(value) === String(key)))
  ]
}

function applyDefaultState(fallback: TableStoredState) {
  keyword.value = fallback.keyword
  density.value = fallback.density
  innerPageSize.value = fallback.pageSize
  currentPage.value = fallback.currentPage
  visibleColumnKeys.value = fallback.visibleColumnKeys
  columnOrderKeys.value = fallback.columnOrderKeys
  setColumnSettings(fallback.columnSettings ?? [])
  rowOrderKeys.value = fallback.rowOrderKeys
}

function setColumnSettings(settings: TableColumnSetting[]) {
  const nextKeys = props.columns.map((column) => column.key)
  const normalizedSettings = settings.filter((setting) => nextKeys.includes(setting.key))
  const sortedSettings = [...normalizedSettings].sort((left, right) => left.order - right.order)
  const orderedKeys = sortedSettings.map((setting) => setting.key)

  if (orderedKeys.length > 0) {
    columnOrderKeys.value = [...orderedKeys, ...nextKeys.filter((key) => !orderedKeys.includes(key))]
  }

  const visibleKeys = normalizedSettings.filter((setting) => setting.visible !== false).map((setting) => setting.key)
  if (visibleKeys.length > 0) {
    visibleColumnKeys.value = columnOrderKeys.value.filter((key) =>
      normalizedSettings.some((setting) => setting.key === key) ? visibleKeys.includes(key) : visibleColumnKeys.value.includes(key)
    )
  }

  const nextFixedMap: Record<string, TableFixed | null | undefined> = {}
  const nextWidthRatioMap: Record<string, number | undefined> = {}
  const nextWidthMap: Record<string, number | undefined> = {}

  normalizedSettings.forEach((setting) => {
    nextFixedMap[setting.key] = normalizeColumnFixed(setting.fixed) ?? null
    nextWidthRatioMap[setting.key] = normalizePositiveNumber(setting.widthRatio)
    nextWidthMap[setting.key] = normalizePositiveNumber(setting.width)
  })

  columnFixedMap.value = { ...columnFixedMap.value, ...nextFixedMap }
  columnWidthRatioMap.value = { ...columnWidthRatioMap.value, ...nextWidthRatioMap }
  columnWidthMap.value = { ...columnWidthMap.value, ...nextWidthMap }
  syncColumnState()
}

function setStoredState(state: Partial<TableStoredState>) {
  applyingStoredState.value = true
  keyword.value = state.keyword ?? keyword.value
  density.value = state.density ?? density.value
  innerPageSize.value = state.pageSize ?? innerPageSize.value
  currentPage.value = state.currentPage ?? currentPage.value
  visibleColumnKeys.value = state.visibleColumnKeys?.length ? state.visibleColumnKeys : visibleColumnKeys.value
  columnOrderKeys.value = state.columnOrderKeys?.length ? state.columnOrderKeys : columnOrderKeys.value
  rowOrderKeys.value = state.rowOrderKeys?.length ? state.rowOrderKeys : rowOrderKeys.value
  if (state.columnSettings?.length) {
    setColumnSettings(state.columnSettings)
  } else {
    syncColumnState()
    syncRowState()
  }
  applyingStoredState.value = false
}

function resetColumnSettings() {
  columnOrderKeys.value = props.columns.map((column) => column.key)
  visibleColumnKeys.value = props.columns.map((column) => column.key)
  columnFixedMap.value = {}
  columnWidthRatioMap.value = {}
  columnWidthMap.value = {}
}

function loadStoredState() {
  if (!resolvedStorageKey.value || !canUseLocalStorage.value) {
    syncColumnState()
    syncRowState()
    return
  }

  const fallback = buildDefaultState()
  const raw = window.localStorage.getItem(resolvedStorageKey.value)

  if (!raw) {
    applyDefaultState(fallback)
    return
  }

  try {
    const parsed = JSON.parse(raw) as Partial<TableStoredState>
    applyingStoredState.value = true
    keyword.value = parsed.keyword ?? fallback.keyword
    density.value = parsed.density ?? fallback.density
    innerPageSize.value = parsed.pageSize ?? fallback.pageSize
    currentPage.value = parsed.currentPage ?? fallback.currentPage
    visibleColumnKeys.value = parsed.visibleColumnKeys?.length ? parsed.visibleColumnKeys : fallback.visibleColumnKeys
    columnOrderKeys.value = parsed.columnOrderKeys?.length ? parsed.columnOrderKeys : fallback.columnOrderKeys
    if (parsed.columnSettings?.length) {
      setColumnSettings(parsed.columnSettings)
    }
    rowOrderKeys.value = parsed.rowOrderKeys?.length ? parsed.rowOrderKeys : fallback.rowOrderKeys
    syncColumnState()
    syncRowState()
  } catch {
    applyDefaultState(fallback)
  } finally {
    applyingStoredState.value = false
  }
}

function persistState() {
  if (!resolvedStorageKey.value || applyingStoredState.value || !canUseLocalStorage.value) {
    return
  }

  const payload = getStoredState()

  window.localStorage.setItem(resolvedStorageKey.value, JSON.stringify(payload))
}

function moveItemByDropPosition<T>(items: T[], sourceIndex: number, targetIndex: number, position: 'before' | 'after') {
  const next = [...items]
  const [moved] = next.splice(sourceIndex, 1)
  let insertIndex = targetIndex

  if (sourceIndex < targetIndex) {
    insertIndex -= 1
  }

  if (position === 'after') {
    insertIndex += 1
  }

  const normalizedIndex = Math.max(0, Math.min(insertIndex, next.length))
  next.splice(normalizedIndex, 0, moved)
  return next
}

function handleSelectionChange(rows: Array<Record<string, unknown>>) {
  selectedRows.value = rows
  emit('selection-change', rows)
  emit('selectionChange', rows)
}

const visibleSelectedRows = computed(() =>
  pagedRows.value.filter((row) =>
    selectedRows.value.some((selectedRow) => String(getRowIdentity(selectedRow)) === String(getRowIdentity(row)))
  )
)

const isAllPagedRowsSelected = computed(() =>
  pagedRows.value.length > 0 && visibleSelectedRows.value.length === pagedRows.value.length
)

const isSomePagedRowsSelected = computed(() =>
  visibleSelectedRows.value.length > 0 && visibleSelectedRows.value.length < pagedRows.value.length
)

function isRowSelected(row: Record<string, unknown>) {
  const rowKey = getRowIdentity(row)
  return selectedRows.value.some((selectedRow) => String(getRowIdentity(selectedRow)) === String(rowKey))
}

function toggleRowSelection(row: Record<string, unknown>, checked: boolean) {
  const rowKey = getRowIdentity(row)
  const nextRows = checked
    ? [...selectedRows.value.filter((selectedRow) => String(getRowIdentity(selectedRow)) !== String(rowKey)), row]
    : selectedRows.value.filter((selectedRow) => String(getRowIdentity(selectedRow)) !== String(rowKey))

  handleSelectionChange(nextRows)
}

function toggleAllPagedRows(checked: boolean) {
  if (checked) {
    const existingRows = selectedRows.value.filter(
      (selectedRow) => !pagedRows.value.some((row) => String(getRowIdentity(row)) === String(getRowIdentity(selectedRow)))
    )
    handleSelectionChange([...existingRows, ...pagedRows.value])
    return
  }

  handleSelectionChange(
    selectedRows.value.filter(
      (selectedRow) => !pagedRows.value.some((row) => String(getRowIdentity(row)) === String(getRowIdentity(selectedRow)))
    )
  )
}

function handleExport() {
  if (typeof window === 'undefined') {
    return
  }

  const headers = activeColumns.value.map((column) => column.label)
  const lines = filteredRows.value.map((row) =>
    activeColumns.value
      .map((column) => {
        const raw = column.formatter ? column.formatter(row[column.key], row) : String(row[column.key] ?? '')
        return `"${raw.replace(/"/g, '""')}"`
      })
      .join(',')
  )

  const csv = ['\uFEFF' + headers.join(','), ...lines].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${props.title || 'x-table'}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

async function handleExportExcel() {
  const xlsx = await import('xlsx')
  const rows = filteredRows.value.map((row) => {
    const result: Record<string, unknown> = {}
    activeColumns.value.forEach((column) => {
      result[column.label] = row[column.key]
    })
    return result
  })
  const worksheet = xlsx.utils.json_to_sheet(rows)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  xlsx.writeFile(workbook, `${props.title || 'x-table'}.xlsx`)
}

async function handleImportExcel(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const xlsx = await import('xlsx')
  const buffer = await file.arrayBuffer()
  const workbook = xlsx.read(buffer, { type: 'array' })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const sheetRows = xlsx.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' })
  const mapped = sheetRows.map((item) => {
    const row: Record<string, unknown> = {}
    activeColumns.value.forEach((column) => {
      row[column.key] = item[column.label] ?? item[column.key] ?? ''
    })
    return row
  })
  draftRows.value = mapped
  emit('update:data', cloneRows(draftRows.value))
  emit('import-success', cloneRows(draftRows.value))
  input.value = ''
}

function emitQueryChange() {
  emit('query-change', {
    page: currentPage.value,
    pageSize: innerPageSize.value,
    keyword: keyword.value.trim(),
    sorter: activeSort.value ? { ...activeSort.value } : undefined
  })
}

function formatValue(column: TableColumn, row: Record<string, unknown>) {
  const value = row[column.key]

  if (column.formatter) {
    return column.formatter(value, row)
  }

  if (resolveDisplayType(column) === 'date' && value) {
    return new Date(String(value)).toLocaleString()
  }

  if (resolveDisplayType(column) === 'boolean') {
    return value ? '是' : '否'
  }

  return String(value ?? '-')
}

function resolveTagType(column: TableColumn, row: Record<string, unknown>) {
  const value = row[column.key]
  return column.options?.find((option) => option.value === value)?.type ?? 'info'
}

function getOptionLabel(column: TableColumn, value: unknown) {
  const valueKey = column.valueKey ?? 'value'
  const labelKey = column.labelKey ?? 'label'
  const option = column.options?.find((item) => item.value === value)
  if (option) {
    return option.label
  }

  const dialogOption = column.dialogData?.find((item) => item[valueKey] === value)
  if (dialogOption) {
    return String(dialogOption[labelKey] ?? value ?? '-')
  }

  return String(value ?? '-')
}

function getSelectModelValue(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? value : ''
}

function isEditableColumn(column: TableColumn) {
  return props.editable && column.editable !== false && resolveEditorType(column) !== 'none'
}

function isColumnEditableConfigured(column: TableColumn) {
  return column.editable !== false && resolveEditorType(column) !== 'none'
}

function getCellSlotRow(row: Record<string, unknown>) {
  return props.editable ? row : { ...row }
}

function resolveEditorType(column: TableColumn) {
  if (column.editorType) {
    return column.editorType
  }
  if (column.type === 'dialog-select') {
    return 'dropdown'
  }
  if (['input', 'select', 'radio', 'boolean', 'date', 'datetime', 'dropdown'].includes(String(column.type ?? ''))) {
    return column.type as 'input' | 'select' | 'radio' | 'boolean' | 'date' | 'datetime' | 'dropdown'
  }
  return 'none'
}

function resolveDisplayType(column: TableColumn) {
  if (column.displayType) {
    return column.displayType
  }
  if (['tag', 'boolean', 'date'].includes(String(column.type ?? ''))) {
    return column.type as 'tag' | 'boolean' | 'date'
  }
  return 'text'
}

function getDirtyKey(rowKey: TableRowKey, columnKey: string) {
  return `${String(rowKey)}::${columnKey}`
}

function findDraftRow(rowKey: TableRowKey) {
  return draftRows.value.find((row) => String(getRowIdentity(row)) === String(rowKey))
}

function notifyDirtyChange() {
  emit('dirty-change', dirtyChanges.value)
}

function updateCell(row: Record<string, unknown>, column: TableColumn, value: unknown) {
  const rowKey = getRowIdentity(row)
  const targetRow = findDraftRow(rowKey)
  if (!targetRow) {
    return
  }

  const oldValue = targetRow[column.key]
  if (oldValue === value) {
    return
  }

  targetRow[column.key] = value
  const change: TableCellChange = {
    rowKey,
    columnKey: column.key,
    oldValue,
    value,
    row: { ...targetRow }
  }
  dirtyCellMap.value = {
    ...dirtyCellMap.value,
    [getDirtyKey(rowKey, column.key)]: change
  }
  emit('cell-change', change)
  emit('update:data', cloneRows(draftRows.value))
  notifyDirtyChange()
}

function submitDirtyChanges() {
  emit('submit-changes', {
    changes: dirtyChanges.value,
    rows: cloneRows(draftRows.value)
  })
}

function clearDirtyChanges() {
  dirtyCellMap.value = {}
  notifyDirtyChange()
}

function resetDraftRows() {
  draftRows.value = cloneRows(props.data)
  dirtyCellMap.value = {}
  syncRowState()
  notifyDirtyChange()
}

function isSameCell(
  left: { rowKey: TableRowKey; columnKey: string } | null,
  right: { rowKey: TableRowKey; columnKey: string } | null
) {
  return Boolean(left && right && String(left.rowKey) === String(right.rowKey) && left.columnKey === right.columnKey)
}

function isEditingCell(row: Record<string, unknown>, column: TableColumn) {
  return isSameCell(editingCell.value, {
    rowKey: getRowIdentity(row),
    columnKey: column.key
  })
}

function getSelectionColumnSource() {
  return activeColumns.value
}

function buildRowSelection(rowKey: TableRowKey) {
  return getSelectionColumnSource().map((column) => getDirtyKey(rowKey, column.key))
}

function buildSelectionForCell(cell: { rowKey: TableRowKey; columnKey: string }) {
  if (props.selectionMode === 'row') {
    return buildRowSelection(cell.rowKey)
  }

  return [getDirtyKey(cell.rowKey, cell.columnKey)]
}

function buildCellRange(
  start: { rowKey: TableRowKey; columnKey: string },
  end: { rowKey: TableRowKey; columnKey: string }
) {
  const rowStart = pagedRows.value.findIndex((item) => String(getRowIdentity(item)) === String(start.rowKey))
  const rowEnd = pagedRows.value.findIndex((item) => String(getRowIdentity(item)) === String(end.rowKey))
  const columns = getSelectionColumnSource()
  const colStart = columns.findIndex((item) => item.key === start.columnKey)
  const colEnd = columns.findIndex((item) => item.key === end.columnKey)

  if (rowStart < 0 || rowEnd < 0 || colStart < 0 || colEnd < 0) {
    return []
  }

  const [minRow, maxRow] = [Math.min(rowStart, rowEnd), Math.max(rowStart, rowEnd)]
  const [minCol, maxCol] = props.selectionMode === 'row'
    ? [0, columns.length - 1]
    : [Math.min(colStart, colEnd), Math.max(colStart, colEnd)]
  const keys: string[] = []
  for (let r = minRow; r <= maxRow; r += 1) {
    for (let c = minCol; c <= maxCol; c += 1) {
      const rowValue = pagedRows.value[r]
      const colValue = columns[c]
      if (rowValue && colValue) {
        keys.push(getDirtyKey(getRowIdentity(rowValue), colValue.key))
      }
    }
  }
  return keys
}

function getSelectedCellBounds() {
  if (selectedCellKeys.value.length === 0) {
    return null
  }

  const selectedMap = new Set(selectedCellKeys.value)
  let minRow = Number.POSITIVE_INFINITY
  let maxRow = Number.NEGATIVE_INFINITY
  let minCol = Number.POSITIVE_INFINITY
  let maxCol = Number.NEGATIVE_INFINITY

  pagedRows.value.forEach((rowValue, rowIndex) => {
    const rowKey = getRowIdentity(rowValue)
    activeColumns.value.forEach((column, columnIndex) => {
      if (!selectedMap.has(getDirtyKey(rowKey, column.key))) {
        return
      }
      minRow = Math.min(minRow, rowIndex)
      maxRow = Math.max(maxRow, rowIndex)
      minCol = Math.min(minCol, columnIndex)
      maxCol = Math.max(maxCol, columnIndex)
    })
  })

  if (!Number.isFinite(minRow) || !Number.isFinite(minCol)) {
    return null
  }

  return { minRow, maxRow, minCol, maxCol }
}

function getSelectionStartCell() {
  const bounds = getSelectedCellBounds()
  if (!bounds) {
    return selectionAnchorCell.value
  }

  const row = pagedRows.value[bounds.minRow]
  const column = activeColumns.value[bounds.minCol]
  if (!row || !column) {
    return selectionAnchorCell.value
  }

  return {
    rowKey: getRowIdentity(row),
    columnKey: column.key
  }
}

function isSelectionResizeHandleCell(row: Record<string, unknown>, column: TableColumn) {
  const bounds = getSelectedCellBounds()
  if (!bounds) {
    return false
  }

  const rowIndex = pagedRows.value.findIndex((item) => String(getRowIdentity(item)) === String(getRowIdentity(row)))
  const columnIndex = activeColumns.value.findIndex((item) => item.key === column.key)
  return rowIndex === bounds.maxRow && columnIndex === bounds.maxCol
}

async function updateSelectionHandlePosition() {
  await nextTick()

  if (!tableRoot.value || selectedCellKeys.value.length === 0) {
    selectionHandle.value.visible = false
    return
  }

  const targetCell = tableRoot.value.querySelector(
    'td.x-table__selected-td.x-table__selection-edge-right.x-table__selection-edge-bottom'
  ) as HTMLElement | null
  if (!targetCell) {
    selectionHandle.value.visible = false
    return
  }

  const rect = targetCell.getBoundingClientRect()
  selectionHandle.value = {
    visible: true,
    position: {
      top: rect.bottom - 8,
      left: rect.right - 8
    }
  }
}

function activateCell(row: Record<string, unknown>, column: TableColumn, event?: MouseEvent) {
  if (!props.cellSelectable) {
    return
  }

  const next = {
    rowKey: getRowIdentity(row),
    columnKey: column.key
  }
  if (event?.shiftKey && activeCell.value) {
    selectedCellKeys.value = buildCellRange(activeCell.value, next)
  } else {
    selectedCellKeys.value = buildSelectionForCell(next)
    selectionAnchorCell.value = next
  }
  activeCell.value = next
}

function isFromCellEditor(event: MouseEvent) {
  const target = event.target as Element | null
  return Boolean(
    target?.closest(
      '.x-table__editor-input, .x-select, .x-option, .el-input, .el-select, .el-radio-group, .el-radio, .el-switch, .el-date-editor, input, textarea, select, button'
    )
  )
}

function startCellSelection(row: Record<string, unknown>, column: TableColumn, event: MouseEvent) {
  if (!props.cellSelectable) {
    return
  }
  if (event.button !== 0) {
    return
  }
  if (isEditingCell(row, column) && isFromCellEditor(event)) {
    return
  }
  closeContextMenu()
  editingCell.value = null
  const next = { rowKey: getRowIdentity(row), columnKey: column.key }
  selectingCell.value = next
  selectionAnchorCell.value = next
  isCellSelecting.value = true
  activeCell.value = next
  selectedCellKeys.value = buildSelectionForCell(next)
  if (typeof document !== 'undefined') {
    document.addEventListener('mouseup', stopCellSelection, { once: true })
  }
}

function extendCellSelection(row: Record<string, unknown>, column: TableColumn) {
  if (!props.cellSelectable) {
    return
  }
  if (!isCellSelecting.value || !selectingCell.value) {
    return
  }
  const next = { rowKey: getRowIdentity(row), columnKey: column.key }
  selectedCellKeys.value = buildCellRange(selectingCell.value, next)
  activeCell.value = next
}

function stopCellSelection() {
  isCellSelecting.value = false
  selectingCell.value = null
  void updateSelectionHandlePosition()
}

function startSelectionResize(event: MouseEvent) {
  if (!props.cellSelectable) {
    return
  }
  if (event.button !== 0) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
  const start = getSelectionStartCell()
  if (!start) {
    return
  }

  closeContextMenu()
  editingCell.value = null
  selectingCell.value = start
  selectionAnchorCell.value = start
  isCellSelecting.value = true
  if (typeof document !== 'undefined') {
    document.addEventListener('mouseup', stopCellSelection, { once: true })
  }
}

async function startCellEditing(row: Record<string, unknown>, column: TableColumn, event?: MouseEvent) {
  if (!isEditableColumn(column)) {
    return
  }

  event?.stopPropagation()
  const next = { rowKey: getRowIdentity(row), columnKey: column.key }
  activeCell.value = next
  selectionAnchorCell.value = next
  selectedCellKeys.value = [getDirtyKey(next.rowKey, next.columnKey)]
  editingCell.value = next
  await nextTick()

  if (resolveEditorType(column) === 'dropdown') {
    openDropdownPicker(row, column, event)
  }
}

function handleCellDblclick(row: Record<string, unknown>, column: TableColumn, event: MouseEvent) {
  if (isEditableColumn(column)) {
    void startCellEditing(row, column, event)
    return
  }

  emitRowDblclick(row, event)
}

function isFromInnerTableCell(event: MouseEvent) {
  const target = event.target as Element | null
  return Boolean(target?.closest('.x-table__cell'))
}

function handleNativeCellClick(row: Record<string, unknown>, column: TableColumn, event: MouseEvent) {
  if (isFromInnerTableCell(event)) {
    return
  }

  activateCell(row, column, event)
}

function handleNativeCellDblclick(row: Record<string, unknown>, column: TableColumn, event: MouseEvent) {
  if (isFromInnerTableCell(event)) {
    return
  }

  handleCellDblclick(row, column, event)
}

function emitRowDblclick(row: Record<string, unknown>, event: MouseEvent) {
  const payload: TableRowDblclickPayload = {
    row,
    rowKey: getRowIdentity(row),
    event
  }
  emit('row-dblclick', payload)
  emit('rowDblclick', payload)
}

function openDropdownPicker(row: Record<string, unknown>, column: TableColumn, event?: MouseEvent) {
  if (!isEditableColumn(column)) {
    return
  }

  const trigger = event?.currentTarget as HTMLElement | null
  const triggerCell = trigger?.closest('td.el-table__cell') as HTMLElement | null
  const rect = (triggerCell ?? trigger)?.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const keepPreviousPosition =
    dropdownPicker.value.visible &&
    String(dropdownPicker.value.rowKey) === String(getRowIdentity(row)) &&
    dropdownPicker.value.column?.key === column.key

  let left = rect?.left ?? (keepPreviousPosition ? dropdownPicker.value.position.left : 0)
  let top = rect ? rect.bottom + 4 : keepPreviousPosition ? dropdownPicker.value.position.top : 0
  const width = Math.max(rect?.width ?? dropdownPicker.value.position.width ?? 240, 280)
  if (left + width > viewportWidth - 8) {
    left = Math.max(8, viewportWidth - width - 8)
  }
  if (top + 320 > viewportHeight - 8 && rect) {
    top = Math.max(8, rect.top - 320 - 4)
  }
  dropdownPicker.value = {
    visible: true,
    rowKey: getRowIdentity(row),
    column,
    keyword: String(row[column.key] ?? ''),
    position: { top, left, width }
  }
}

function closeDropdownPicker() {
  dropdownPicker.value.visible = false
}

function selectDropdownRow(optionRow: Record<string, unknown>) {
  const column = dropdownPicker.value.column
  const rowKey = dropdownPicker.value.rowKey
  if (!column || rowKey === null) {
    return
  }

  const valueKey = column.valueKey ?? 'value'
  const targetRow = findDraftRow(rowKey)
  if (targetRow) {
    updateCell(targetRow, column, optionRow[valueKey])
  }
  closeDropdownPicker()
}

function getClipboardText(row: Record<string, unknown>, column: TableColumn) {
  const value = row[column.key]
  if (resolveEditorType(column) === 'select' || resolveEditorType(column) === 'dropdown') {
    return getOptionLabel(column, value)
  }
  return formatValue(column, row)
}

function handleCellCopy(row: Record<string, unknown>, column: TableColumn, event: ClipboardEvent) {
  event.preventDefault()
  if (selectedCellKeys.value.length > 1 && activeCell.value) {
    const selectedMap = new Set(selectedCellKeys.value)
    const lines: string[] = []
    pagedRows.value.forEach((rowValue) => {
      const cells = getSelectionColumnSource()
        .filter((col) => selectedMap.has(getDirtyKey(getRowIdentity(rowValue), col.key)))
        .map((col) => getClipboardText(rowValue, col))
      if (cells.length) {
        lines.push(cells.join('\t'))
      }
    })
    if (lines.length) {
      event.clipboardData?.setData('text/plain', lines.join('\n'))
      return
    }
  }
  event.clipboardData?.setData('text/plain', getClipboardText(row, column))
}

function getEditableColumnsFrom(columnKey: string) {
  const startColumnIndex = activeColumns.value.findIndex((column) => column.key === columnKey)
  if (startColumnIndex < 0) {
    return []
  }
  return activeColumns.value.slice(startColumnIndex).filter((column) => isEditableColumn(column))
}

function pasteTextToActiveCell(text: string) {
  if (!activeCell.value || !props.editable) {
    return
  }

  if (!text) {
    return
  }

  const startRowIndex = pagedRows.value.findIndex((row) => String(getRowIdentity(row)) === String(activeCell.value?.rowKey))
  const targetColumns = getEditableColumnsFrom(activeCell.value.columnKey)
  if (startRowIndex < 0 || targetColumns.length === 0) {
    return
  }

  const lines = text.replace(/\r/g, '').split('\n').filter((line) => line.length > 0)
  if (lines.length === 1) {
    const cells = lines[0].split('\t')
    if (cells.length === 1 && selectedCellKeys.value.length > 1) {
      const selectedMap = new Set(selectedCellKeys.value)
      pagedRows.value.forEach((rowValue) => {
        targetColumns.forEach((targetColumn) => {
          if (selectedMap.has(getDirtyKey(getRowIdentity(rowValue), targetColumn.key))) {
            updateCell(rowValue, targetColumn, normalizePastedValue(targetColumn, cells[0]))
          }
        })
      })
      return
    }
  }

  lines.forEach((line, rowOffset) => {
    const targetRow = pagedRows.value[startRowIndex + rowOffset]
    if (!targetRow) {
      return
    }

    line.split('\t').forEach((cellValue, columnOffset) => {
      const targetColumn = targetColumns[columnOffset]
      if (!targetColumn) {
        return
      }
      updateCell(targetRow, targetColumn, normalizePastedValue(targetColumn, cellValue))
    })
  })
}

function handleTablePaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData('text/plain')
  if (!text) {
    return
  }

  event.preventDefault()
  pasteTextToActiveCell(text)
}

async function copySelectedCellsToClipboard() {
  if (!activeCell.value) {
    return
  }

  const selectedMap = new Set(selectedCellKeys.value)
  const lines: string[] = []
  pagedRows.value.forEach((rowValue) => {
    const cells = getSelectionColumnSource()
      .filter((col) => selectedMap.has(getDirtyKey(getRowIdentity(rowValue), col.key)))
      .map((col) => getClipboardText(rowValue, col))
    if (cells.length) {
      lines.push(cells.join('\t'))
    }
  })

  const text = lines.length
    ? lines.join('\n')
    : (() => {
        const row = findDraftRow(activeCell.value!.rowKey)
        const column = activeColumns.value.find((item) => item.key === activeCell.value!.columnKey)
        return row && column ? getClipboardText(row, column) : ''
      })()

  if (text && typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
  }
  closeContextMenu()
}

async function pasteFromClipboard() {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.readText) {
    closeContextMenu()
    return
  }

  const text = await navigator.clipboard.readText()
  pasteTextToActiveCell(text)
  closeContextMenu()
}

function normalizePastedValue(column: TableColumn, value: string) {
  if (resolveEditorType(column) === 'boolean') {
    return ['true', '是', '1', '启用'].includes(value.trim().toLowerCase())
  }

  if (resolveEditorType(column) === 'select' || resolveEditorType(column) === 'radio') {
    const option = column.options?.find((item) => String(item.label) === value || String(item.value) === value)
    return option?.value ?? value
  }

  if (resolveEditorType(column) === 'dropdown') {
    const valueKey = column.valueKey ?? 'value'
    const labelKey = column.labelKey ?? 'label'
    const option = column.dialogData?.find((item) => String(item[labelKey]) === value || String(item[valueKey]) === value)
    return option?.[valueKey] ?? value
  }

  return value
}

function closeContextMenu() {
  contextMenu.value.visible = false
}

function openCellContextMenu(row: Record<string, unknown>, column: TableColumn, event: MouseEvent) {
  if (!props.cellSelectable) {
    return
  }

  event.preventDefault()
  const next = { rowKey: getRowIdentity(row), columnKey: column.key }
  activeCell.value = next
  const currentCellKey = getDirtyKey(next.rowKey, next.columnKey)
  if (!selectedCellKeys.value.includes(currentCellKey)) {
    selectedCellKeys.value = buildSelectionForCell(next)
    selectionAnchorCell.value = next
  }
  contextMenu.value = {
    visible: true,
    rowKey: next.rowKey,
    columnKey: next.columnKey,
    position: {
      top: event.clientY,
      left: event.clientX
    }
  }
}

function createInsertedRow(referenceRow: Record<string, unknown>) {
  const row: Record<string, unknown> = {}
  props.columns.forEach((column) => {
    row[column.key] = ''
  })

  const referenceKey = referenceRow[props.rowKey]
  const numericKeys = draftRows.value
    .map((item) => item[props.rowKey])
    .filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
  row[props.rowKey] = typeof referenceKey === 'number'
    ? Math.max(referenceKey, ...numericKeys) + 1
    : `inserted-${Date.now()}-${draftRows.value.length + 1}`

  return row
}

function insertRowByActiveCell(position: 'above' | 'below') {
  if (!props.editable) {
    return
  }

  if (contextMenu.value.rowKey === null) {
    return
  }

  const targetIndex = draftRows.value.findIndex((row) => String(getRowIdentity(row)) === String(contextMenu.value.rowKey))
  if (targetIndex < 0) {
    return
  }

  const referenceRow = draftRows.value[targetIndex]
  const insertedRow = createInsertedRow(referenceRow)
  const insertIndex = position === 'above' ? targetIndex : targetIndex + 1
  draftRows.value.splice(insertIndex, 0, insertedRow)
  syncRowState()
  emit('update:data', cloneRows(draftRows.value))
  closeContextMenu()
}

function handleSizeChange(size: number) {
  innerPageSize.value = size
  currentPage.value = 1
  if (props.remote) {
    emitQueryChange()
  }
}

function handleSortChange(payload: { prop: string; order: 'ascending' | 'descending' | null }) {
  activeSort.value = { key: payload.prop, order: payload.order }
  if (props.remote) {
    emitQueryChange()
  }
}

function handleNativeSort(column: TableColumn) {
  if (!column.sortable) {
    return
  }

  const currentOrder = activeSort.value?.key === column.key ? activeSort.value.order : null
  const nextOrder = currentOrder === 'ascending' ? 'descending' : currentOrder === 'descending' ? null : 'ascending'
  handleSortChange({ prop: column.key, order: nextOrder })
}

function handleShellFocusOut(event: FocusEvent) {
  if (!dropdownPicker.value.visible) {
    return
  }
  const nextTarget = event.relatedTarget as HTMLElement | null
  if (!nextTarget) {
    closeDropdownPicker()
    return
  }
  const inCurrentCell = Boolean(nextTarget.closest('td.x-table__active-td'))
  const inDropdownPanel = Boolean(nextTarget.closest('.x-table__dropdown-panel'))
  if (!inCurrentCell && !inDropdownPanel) {
    closeDropdownPicker()
  }
}

function updateShellWidth() {
  shellWidth.value = shellRoot.value?.clientWidth || tableRoot.value?.clientWidth || 0
  tableRootHeight.value = tableRoot.value?.clientHeight ?? 0
}

function handleTableBodyScroll() {
  if (headerScrollRoot.value && bodyScrollRoot.value) {
    headerScrollRoot.value.scrollLeft = bodyScrollRoot.value.scrollLeft
  }
  void updateSelectionHandlePosition()
}

function toggleColumnVisibility(key: string) {
  if (visibleColumnKeys.value.includes(key)) {
    if (visibleColumnKeys.value.length === 1) {
      return
    }

    visibleColumnKeys.value = visibleColumnKeys.value.filter((item) => item !== key)
    return
  }

  visibleColumnKeys.value = columnOrderKeys.value.filter((item) => item === key || visibleColumnKeys.value.includes(item))
}

function updateColumnFixed(key: string, value: '' | 'left' | 'right') {
  columnFixedMap.value = {
    ...columnFixedMap.value,
    [key]: value === '' ? null : value
  }
}

function updateColumnWidthRatio(key: string, value: unknown) {
  columnWidthRatioMap.value = {
    ...columnWidthRatioMap.value,
    [key]: normalizePositiveNumber(value)
  }
}

function updateColumnWidth(key: string, value: unknown) {
  columnWidthMap.value = {
    ...columnWidthMap.value,
    [key]: normalizePositiveNumber(value)
  }
}

function resetColumnFixedValues() {
  columnFixedMap.value = {}
}

function resetColumnRatioValues() {
  columnWidthRatioMap.value = {}
}

function resetColumnWidthValues() {
  columnWidthMap.value = {}
}

function formatColumnValueForWidth(column: TableColumn, row: Record<string, unknown>) {
  if (resolveEditorType(column) === 'select' || resolveEditorType(column) === 'radio' || resolveEditorType(column) === 'dropdown') {
    return getOptionLabel(column, row[column.key])
  }

  return formatValue(column, row)
}

function getWidthMeasureContext() {
  if (widthMeasureContext !== undefined) {
    return widthMeasureContext
  }

  if (typeof document === 'undefined') {
    widthMeasureContext = null
    return widthMeasureContext
  }

  if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) {
    widthMeasureContext = null
    return widthMeasureContext
  }

  try {
    widthMeasureContext = document.createElement('canvas').getContext('2d')
    if (widthMeasureContext) {
      widthMeasureContext.font = '13px Arial, "Microsoft YaHei", "PingFang SC", sans-serif'
    }
  } catch {
    widthMeasureContext = null
  }
  return widthMeasureContext
}

function estimateTextWidth(text: string) {
  const normalized = String(text ?? '').replace(/\s+/g, ' ').trim()
  const context = getWidthMeasureContext()
  if (context) {
    return Math.ceil(context.measureText(normalized).width)
  }

  let width = 0
  Array.from(normalized).forEach((char) => {
    if (/[\u3400-\u9fff]/.test(char)) {
      width += 15
    } else if (/\s/.test(char)) {
      width += 4
    } else if (/[A-Z0-9]/.test(char)) {
      width += 8
    } else {
      width += 7
    }
  })
  return width
}

function estimateColumnContentWidth(column: TableColumn) {
  const values = filteredRows.value.map((row) => formatColumnValueForWidth(column, row))
  const maxContentWidth = [column.label, ...values].reduce((max, text) => Math.max(max, estimateTextWidth(text)), 0)
  const minWidth = Number.parseFloat(String(column.minWidth ?? 80)) || 80
  return Math.ceil(Math.max(minWidth, Math.min(maxContentWidth + 56, 960)))
}

function getColumnWidthForRatio(column: TableColumn) {
  return (
    normalizePositiveNumber(resolveColumnWidth(column)) ??
    normalizePositiveNumber(column.minWidth) ??
    estimateColumnContentWidth(column)
  )
}

function fitVisibleColumnsToContentWidth() {
  if (!activeColumns.value.length) {
    closeContextMenu()
    return
  }

  updateShellWidth()
  const nextWidthMap = { ...columnWidthMap.value }
  const nextRatioMap = { ...columnWidthRatioMap.value }
  activeColumns.value.forEach((column) => {
    nextWidthMap[column.key] = estimateColumnContentWidth(column)
    nextRatioMap[column.key] = undefined
  })
  columnWidthMap.value = nextWidthMap
  columnWidthRatioMap.value = nextRatioMap
  closeContextMenu()
}

function fitVisibleColumnsToTableRatio() {
  if (!activeColumns.value.length) {
    closeContextMenu()
    return
  }

  updateShellWidth()
  const nextWidthMap = { ...columnWidthMap.value }
  const nextRatioMap = { ...columnWidthRatioMap.value }
  activeColumns.value.forEach((column) => {
    nextWidthMap[column.key] = undefined
    nextRatioMap[column.key] = getColumnWidthForRatio(column)
  })
  columnWidthMap.value = nextWidthMap
  columnWidthRatioMap.value = nextRatioMap
  closeContextMenu()
}

function resolveColumnFixed(column: TableColumn) {
  return Object.prototype.hasOwnProperty.call(columnFixedMap.value, column.key)
    ? columnFixedMap.value[column.key] ?? undefined
    : column.fixed
}

function resolveColumnFixedInputValue(column: TableColumn) {
  const fixed = resolveColumnFixed(column)
  return fixed === true ? 'left' : fixed ?? ''
}

function resolveColumnWidth(column: TableColumn) {
  const configuredWidth = normalizePositiveNumber(columnWidthMap.value[column.key])
  if (configuredWidth) {
    return configuredWidth
  }

  const fluidShare = normalizePositiveNumber(columnWidthRatioMap.value[column.key]) ?? (hasConfiguredColumnRatio.value ? 1 : undefined)
  if (fluidShare && fluidColumnShareTotal.value > 0 && fluidAvailableWidth.value > 0) {
    return Math.max(1, Math.floor((fluidAvailableWidth.value * fluidShare) / fluidColumnShareTotal.value))
  }

  return column.width
}

function resolveColumnMinWidth(column: TableColumn) {
  return resolveColumnWidth(column) ? undefined : column.minWidth ?? 80
}

function formatCssSize(value: number | string | undefined, fallback?: number) {
  if (value === undefined || value === null || value === '') {
    return fallback === undefined ? undefined : `${fallback}px`
  }

  return typeof value === 'number' ? `${value}px` : value
}

function parseCssSize(value: number | string | undefined, fallback: number) {
  const normalizedValue = typeof value === 'number' ? value : Number.parseFloat(String(value ?? ''))
  return Number.isFinite(normalizedValue) && normalizedValue > 0 ? normalizedValue : fallback
}

function getColumnEstimatedWidth(column: TableColumn) {
  return parseCssSize(resolveColumnWidth(column) ?? resolveColumnMinWidth(column), 140)
}

function isColumnFixedLeft(column: TableColumn) {
  const fixed = resolveColumnFixed(column)
  return fixed === true || fixed === 'left'
}

function isColumnFixedRight(column: TableColumn) {
  return resolveColumnFixed(column) === 'right'
}

function getNativeColumnStyle(column: TableColumn, side: 'header' | 'body' = 'body'): CSSProperties {
  const width = resolveColumnWidth(column)
  const minWidth = resolveColumnMinWidth(column)
  const styles: CSSProperties = {
    textAlign: side === 'header' ? column.headerAlign ?? props.headerAlign : column.align ?? 'left'
  }
  const resolvedWidth = formatCssSize(width)
  const resolvedMinWidth = formatCssSize(minWidth, 80)
  if (resolvedWidth) {
    styles.width = resolvedWidth
  }
  if (resolvedMinWidth) {
    styles.minWidth = resolvedMinWidth
  }

  if (side === 'header') {
    styles.position = 'sticky'
    styles.top = '0'
    styles.zIndex = 8
  }

  if (isColumnFixedLeft(column)) {
    styles.position = 'sticky'
    styles.left = `${getLeftFixedOffset(column)}px`
    styles.zIndex = side === 'header' ? 9 : 3
  }

  if (isColumnFixedRight(column)) {
    styles.position = 'sticky'
    styles.right = `${getRightFixedOffset(column)}px`
    styles.zIndex = side === 'header' ? 9 : 3
  }

  return styles
}

function getNativeUtilityStyle(
  width: number,
  fixedSide: 'left' | 'right' = 'left',
  offset = 0,
  side: 'header' | 'body' = 'body'
): CSSProperties {
  const styles: CSSProperties = {
    width: `${width}px`,
    minWidth: `${width}px`,
    position: 'sticky',
    [fixedSide]: `${offset}px`,
    zIndex: side === 'header' ? 10 : 4
  }
  if (side === 'header') {
    styles.top = '0'
  }
  return styles
}

function getLeftFixedOffset(column: TableColumn) {
  let offset = 0
  if (props.draggableRows) offset += 56
  if (props.selectable) offset += 52
  if (props.showIndex) offset += 62

  for (const item of activeColumns.value) {
    if (item.key === column.key) {
      break
    }
    if (isColumnFixedLeft(item)) {
      offset += getColumnEstimatedWidth(item)
    }
  }

  return offset
}

function getRightFixedOffset(column: TableColumn) {
  let offset = props.showActions ? parseCssSize(props.actionsMinWidth, 180) : 0
  const reversedColumns = [...activeColumns.value].reverse()
  for (const item of reversedColumns) {
    if (item.key === column.key) {
      break
    }
    if (isColumnFixedRight(item)) {
      offset += getColumnEstimatedWidth(item)
    }
  }

  return offset
}

function getActionColumnStyle(side: 'header' | 'body' = 'body') {
  const width = parseCssSize(props.actionsMinWidth, 180)
  return getNativeUtilityStyle(width, 'right', 0, side)
}

function getNativeColumnSizeStyle(column: TableColumn): CSSProperties {
  const width = resolveColumnWidth(column) ?? resolveColumnMinWidth(column)
  return {
    width: formatCssSize(width, 80)
  }
}

function getNativeUtilitySizeStyle(width: number): CSSProperties {
  return {
    width: `${width}px`
  }
}

function getActionColumnSizeStyle(): CSSProperties {
  return {
    width: `${parseCssSize(props.actionsMinWidth, 180)}px`
  }
}

function getUtilityColumnKeys() {
  const keys: string[] = []
  if (props.draggableRows) keys.push('__x_table_drag__')
  if (props.selectable) keys.push('__x_table_selection__')
  if (props.showIndex) keys.push('__x_table_index__')
  return keys
}

function getUtilityCellClass(row: Record<string, unknown>, utilityKey: string) {
  if (props.selectionMode !== 'row') {
    return ''
  }

  const rowKey = getRowIdentity(row)
  const selectedMap = new Set(selectedCellKeys.value)
  const isSelected = activeColumns.value.some((column) => selectedMap.has(getDirtyKey(rowKey, column.key)))
  if (!isSelected) {
    return ''
  }

  const classes = ['x-table__selected-td']
  const rowIndex = pagedRows.value.findIndex((item) => String(getRowIdentity(item)) === String(rowKey))
  const topRow = pagedRows.value[rowIndex - 1]
  const bottomRow = pagedRows.value[rowIndex + 1]
  const hasTop = topRow && activeColumns.value.some((column) => selectedMap.has(getDirtyKey(getRowIdentity(topRow), column.key)))
  const hasBottom = bottomRow && activeColumns.value.some((column) => selectedMap.has(getDirtyKey(getRowIdentity(bottomRow), column.key)))
  const utilityKeys = getUtilityColumnKeys()
  const utilityIndex = utilityKeys.indexOf(utilityKey)

  if (!hasTop) classes.push('x-table__selection-edge-top')
  if (!hasBottom) classes.push('x-table__selection-edge-bottom')
  if (utilityIndex === 0) classes.push('x-table__selection-edge-left')
  if (utilityIndex === utilityKeys.length - 1 && activeColumns.value.length === 0) {
    classes.push('x-table__selection-edge-right')
  }
  return classes.join(' ')
}

function getNativeRowClass(row: Record<string, unknown>, rowIndex: number) {
  return resolveRowClassName({ row, rowIndex })
}

function getNativeCellClass(row: Record<string, unknown>, column: TableColumn) {
  return resolveCellClassName({ row, column: { property: column.key } })
}

function handleRowDragStart(row: Record<string, unknown>, event?: DragEvent) {
  if (event?.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
  draggingRowKey.value = getRowIdentity(row)
  rowDropIndicator.value = { targetKey: null, position: null }
}

function handleRowDragOver(targetRow: Record<string, unknown>, event: DragEvent) {
  if (draggingRowKey.value === null) {
    return
  }

  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }

  const current = event.currentTarget as HTMLElement | null
  if (!current) {
    return
  }

  const targetKey = getRowIdentity(targetRow)
  if (String(draggingRowKey.value) === String(targetKey)) {
    rowDropIndicator.value = { targetKey: null, position: null }
    return
  }

  const rect = current.getBoundingClientRect()
  const position = event.clientY - rect.top > rect.height / 2 ? 'after' : 'before'
  rowDropIndicator.value = { targetKey, position }
}

function handleRowDrop(targetRow: Record<string, unknown>, event?: DragEvent) {
  if (draggingRowKey.value === null) {
    return
  }

  event?.preventDefault()
  const sourceIndex = rowOrderKeys.value.findIndex((key) => String(key) === String(draggingRowKey.value))
  const targetIndex = rowOrderKeys.value.findIndex((key) => String(key) === String(getRowIdentity(targetRow)))
  const dropPosition = rowDropIndicator.value.position ?? 'before'
  if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
    draggingRowKey.value = null
    rowDropIndicator.value = { targetKey: null, position: null }
    return
  }

  rowOrderKeys.value = moveItemByDropPosition(rowOrderKeys.value, sourceIndex, targetIndex, dropPosition)
  draggingRowKey.value = null
  rowDropIndicator.value = { targetKey: null, position: null }
  emit('row-order-change', rowOrderKeys.value)
  emit('rowOrderChange', rowOrderKeys.value)
}

function handleColumnDragStart(columnKey: string) {
  draggingColumnKey.value = columnKey
  columnDropIndicator.value = { targetKey: null, position: null }
}

function handleColumnDragOver(targetColumnKey: string, event: DragEvent) {
  if (!draggingColumnKey.value) {
    return
  }

  const current = event.currentTarget as HTMLElement | null
  if (!current) {
    return
  }

  if (draggingColumnKey.value === targetColumnKey) {
    columnDropIndicator.value = { targetKey: null, position: null }
    return
  }

  const rect = current.getBoundingClientRect()
  const position = event.clientY - rect.top > rect.height / 2 ? 'after' : 'before'
  columnDropIndicator.value = { targetKey: targetColumnKey, position }
}

function handleColumnDrop(targetColumnKey: string) {
  if (!draggingColumnKey.value || draggingColumnKey.value === targetColumnKey) {
    draggingColumnKey.value = null
    columnDropIndicator.value = { targetKey: null, position: null }
    return
  }

  const sourceIndex = columnOrderKeys.value.findIndex((key) => key === draggingColumnKey.value)
  const targetIndex = columnOrderKeys.value.findIndex((key) => key === targetColumnKey)
  const dropPosition = columnDropIndicator.value.position ?? 'before'
  if (sourceIndex < 0 || targetIndex < 0) {
    draggingColumnKey.value = null
    columnDropIndicator.value = { targetKey: null, position: null }
    return
  }

  columnOrderKeys.value = moveItemByDropPosition(columnOrderKeys.value, sourceIndex, targetIndex, dropPosition)
  draggingColumnKey.value = null
  columnDropIndicator.value = { targetKey: null, position: null }
  emit('column-order-change', columnOrderKeys.value)
  emit('columnOrderChange', columnOrderKeys.value)
}

function handleRowDragEnd() {
  draggingRowKey.value = null
  rowDropIndicator.value = { targetKey: null, position: null }
}

function handleColumnDragEnd() {
  draggingColumnKey.value = null
  columnDropIndicator.value = { targetKey: null, position: null }
}

function startColumnResize(column: TableColumn, event: MouseEvent) {
  if (event.button !== 0) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
  const startWidth = parseCssSize(resolveColumnWidth(column) ?? resolveColumnMinWidth(column), 140)
  resizingColumn.value = {
    key: column.key,
    startX: event.clientX,
    startWidth
  }
  document.addEventListener('mousemove', handleColumnResizeMove)
  document.addEventListener('mouseup', stopColumnResize, { once: true })
}

function handleColumnResizeMove(event: MouseEvent) {
  const current = resizingColumn.value
  if (!current) {
    return
  }

  const column = activeColumns.value.find((item) => item.key === current.key)
  const minWidth = column ? parseCssSize(column.minWidth, 80) : 80
  const nextWidth = Math.max(minWidth, Math.round(current.startWidth + event.clientX - current.startX))
  columnWidthMap.value = {
    ...columnWidthMap.value,
    [current.key]: nextWidth
  }
  columnWidthRatioMap.value = {
    ...columnWidthRatioMap.value,
    [current.key]: undefined
  }
}

function stopColumnResize() {
  resizingColumn.value = null
  document.removeEventListener('mousemove', handleColumnResizeMove)
}

function isResizingColumn(column: TableColumn) {
  return resizingColumn.value?.key === column.key
}

function resolveRowClassName({ row, rowIndex }: { row: Record<string, unknown>; rowIndex: number }) {
  const classes: string[] = []
  if (rowIndex % 2 === 1) {
    classes.push('x-table__zebra-row')
  }
  const targetKey = rowDropIndicator.value.targetKey
  const position = rowDropIndicator.value.position
  if (targetKey === null || position === null) {
    return classes.join(' ')
  }

  if (String(getRowIdentity(row)) !== String(targetKey)) {
    return classes.join(' ')
  }

  classes.push(position === 'before' ? 'x-table__row-drop-before' : 'x-table__row-drop-after')
  return classes.join(' ')
}

function resolveCellClassName({ row, column }: { row: Record<string, unknown>; column: { property?: string } }) {
  if (!column.property) {
    return ''
  }
  const classes: string[] = []
  const rowKey = getRowIdentity(row)
  const cellKey = getDirtyKey(rowKey, column.property)
  const selectedMap = new Set(selectedCellKeys.value)
  if (selectedMap.has(cellKey)) {
    classes.push('x-table__selected-td')
    const rowIndex = pagedRows.value.findIndex((item) => String(getRowIdentity(item)) === String(rowKey))
    const columnIndex = activeColumns.value.findIndex((item) => item.key === column.property)
    const topRow = pagedRows.value[rowIndex - 1]
    const bottomRow = pagedRows.value[rowIndex + 1]
    const leftColumn = activeColumns.value[columnIndex - 1]
    const rightColumn = activeColumns.value[columnIndex + 1]
    const hasTop = topRow && selectedMap.has(getDirtyKey(getRowIdentity(topRow), column.property))
    const hasBottom = bottomRow && selectedMap.has(getDirtyKey(getRowIdentity(bottomRow), column.property))
    const hasLeft =
      (props.selectionMode === 'row' && columnIndex === 0 && getUtilityColumnKeys().length > 0) ||
      (leftColumn && selectedMap.has(getDirtyKey(rowKey, leftColumn.key)))
    const hasRight = rightColumn && selectedMap.has(getDirtyKey(rowKey, rightColumn.key))

    if (!hasTop) classes.push('x-table__selection-edge-top')
    if (!hasRight) classes.push('x-table__selection-edge-right')
    if (!hasBottom) classes.push('x-table__selection-edge-bottom')
    if (!hasLeft) classes.push('x-table__selection-edge-left')
  }

  const isActive =
    activeCell.value &&
    String(getRowIdentity(row)) === String(activeCell.value.rowKey) &&
    column.property === activeCell.value.columnKey
  if (isActive) {
    classes.push('x-table__active-td')
  }
  return classes.join(' ')
}

watch(
  () => props.columns,
  () => {
    syncColumnState()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.data,
  () => {
    draftRows.value = cloneRows(props.data)
    dirtyCellMap.value = {}
    syncRowState()
    notifyDirtyChange()
  },
  { deep: true, immediate: true }
)

watch(keyword, () => {
  currentPage.value = 1
  if (props.remote) {
    emitQueryChange()
  }
})

watch(
  () => props.density,
  (value) => {
    if (density.value !== value) {
      density.value = value
    }
  }
)

watch(density, (value) => {
  emit('update:density', value)
})

watch(currentPage, () => {
  if (props.remote) {
    emitQueryChange()
  }
})

watch(
  [keyword, density, innerPageSize, currentPage, visibleColumnKeys, columnOrderKeys, columnFixedMap, columnWidthRatioMap, columnWidthMap, rowOrderKeys],
  () => {
    persistState()
  },
  { deep: true }
)

watch(
  [selectedCellKeys, pagedRows, activeColumns],
  () => {
    void updateSelectionHandlePosition()
  },
  { deep: true, flush: 'post' }
)

watch(
  resolvedStorageKey,
  () => {
    loadStoredState()
  },
  { immediate: true }
)

onMounted(() => {
  updateShellWidth()
  if (typeof ResizeObserver !== 'undefined') {
    tableResizeObserver = new ResizeObserver(updateShellWidth)
    if (shellRoot.value) {
      tableResizeObserver.observe(shellRoot.value)
    }
    if (tableRoot.value) {
      tableResizeObserver.observe(tableRoot.value)
    }
  }
  window.addEventListener('resize', updateSelectionHandlePosition)
  window.addEventListener('resize', updateShellWidth)
  window.addEventListener('scroll', updateSelectionHandlePosition, true)
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('mouseup', stopCellSelection)
    document.removeEventListener('mousemove', handleColumnResizeMove)
  }
  tableResizeObserver?.disconnect()
  window.removeEventListener('resize', updateSelectionHandlePosition)
  window.removeEventListener('resize', updateShellWidth)
  window.removeEventListener('scroll', updateSelectionHandlePosition, true)
})

defineExpose({
  getColumnSettings,
  setColumnSettings,
  resetColumnSettings,
  getStoredState,
  setStoredState
})
</script>

<template>
  <div
    ref="tableRoot"
    class="x-table"
    :class="{ 'is-fill-height': fillHeight, 'is-column-resizing': resizingColumn }"
    @click="closeContextMenu"
  >
    <header v-if="showToolbar" class="x-table__toolbar">
      <div class="x-table__toolbar-left">
        <div v-if="title" class="x-table__title">{{ title }}</div>
        <div v-if="showMetrics" class="x-table__metrics">
          <span>共 {{ totalCount }} 条</span>
          <span v-if="selectable">已选 {{ selectedRows.length }} 条</span>
          <span v-if="draggableRows">支持行拖拽排序</span>
          <span v-if="draggableColumns">支持列拖拽排序</span>
        </div>
        <slot name="toolbar-left-extra" />
      </div>

      <div class="x-table__toolbar-right">
        <slot name="toolbar-right-prefix" />
        <slot name="toolbar-extra" />

        <div v-if="searchable" class="x-table__search">
          <ElIcon><Search /></ElIcon>
          <ElInput v-model="keyword" placeholder="搜索当前表格" clearable />
        </div>

        <XSelect v-model="density" class="x-table__density" aria-label="表格密度">
          <XOption label="宽松" value="large" />
          <XOption label="标准" value="default" />
          <XOption label="紧凑" value="small" />
        </XSelect>

        <div class="x-table__tool-groups">
          <div class="x-table__tool-group">
            <span class="x-table__tooltip-anchor" title="列设置">
              <ElButton class="x-table__icon-button" aria-label="列设置" @click="columnSettingsVisible = true">
                <i class="ri-list-settings-line" aria-hidden="true" />
              </ElButton>
            </span>

            <span class="x-table__tooltip-anchor" title="刷新">
              <ElButton class="x-table__icon-button" aria-label="刷新" @click="emit('refresh')">
                <i class="ri-refresh-line" aria-hidden="true" />
              </ElButton>
            </span>
          </div>

          <div class="x-table__tool-group">
            <span class="x-table__tooltip-anchor" title="导出CSV">
              <ElButton class="x-table__icon-button" aria-label="导出CSV" @click="handleExport">
                <i class="ri-file-text-line" aria-hidden="true" />
              </ElButton>
            </span>
            <span class="x-table__tooltip-anchor" title="导出Excel">
              <ElButton class="x-table__icon-button" aria-label="导出Excel" @click="handleExportExcel">
                <i class="ri-file-excel-2-line" aria-hidden="true" />
              </ElButton>
            </span>
            <span class="x-table__tooltip-anchor" title="导入Excel">
              <label class="x-table__icon-button x-table__import-btn" aria-label="导入Excel">
                <i class="ri-upload-2-line" aria-hidden="true" />
                <input type="file" accept=".xlsx,.xls" @change="handleImportExcel" />
              </label>
            </span>
          </div>
        </div>
        <ElButton v-if="editable && showDirtyActions" type="primary" :disabled="dirtyChanges.length === 0" @click="submitDirtyChanges">
          提交修改 {{ dirtyChanges.length }}
        </ElButton>
        <ElButton v-if="editable && showDirtyActions" :disabled="dirtyChanges.length === 0" @click="clearDirtyChanges">
          标记已保存
        </ElButton>
        <ElButton v-if="editable && showDirtyActions" :disabled="dirtyChanges.length === 0" @click="resetDraftRows">
          撤销修改
        </ElButton>
      </div>
    </header>

    <div
      ref="shellRoot"
      v-loading="loading"
      class="x-table__shell"
      tabindex="0"
      @paste="handleTablePaste"
      @focusout="handleShellFocusOut"
      @scroll.capture="updateSelectionHandlePosition"
    >
      <div class="x-table__body" :class="[`el-table--${density}`]" :style="{ height: tableHeight }">
        <div ref="headerScrollRoot" class="x-table__header-scroll" aria-hidden="false">
          <table class="x-table__native-table x-table__native-table--header el-table">
            <colgroup>
              <col v-if="draggableRows" :style="getNativeUtilitySizeStyle(56)" />
              <col v-if="selectable" :style="getNativeUtilitySizeStyle(52)" />
              <col v-if="showIndex" :style="getNativeUtilitySizeStyle(62)" />
              <col v-for="column in activeColumns" :key="column.key" :style="getNativeColumnSizeStyle(column)" />
              <col v-if="showActions" :style="getActionColumnSizeStyle()" />
            </colgroup>
            <thead class="el-table__header-wrapper">
              <tr>
                <th
                  v-if="draggableRows"
                  class="el-table__cell x-table__utility-cell x-table__utility-cell--drag"
                  :style="getNativeUtilityStyle(56, 'left', 0, 'header')"
                  aria-label="行拖拽"
                />
                <th
                  v-if="selectable"
                  class="el-table__cell x-table__utility-cell x-table__utility-cell--selection"
                  :style="getNativeUtilityStyle(52, 'left', draggableRows ? 56 : 0, 'header')"
                >
                  <input
                    type="checkbox"
                    :checked="isAllPagedRowsSelected"
                    :indeterminate.prop="isSomePagedRowsSelected"
                    aria-label="选择当前页全部行"
                    @change="toggleAllPagedRows(($event.target as HTMLInputElement).checked)"
                  />
                </th>
                <th
                  v-if="showIndex"
                  class="el-table__cell x-table__utility-cell x-table__utility-cell--index"
                  :style="getNativeUtilityStyle(62, 'left', (draggableRows ? 56 : 0) + (selectable ? 52 : 0), 'header')"
                >
                  #
                </th>
                <th
                  v-for="column in activeColumns"
                  :key="column.key"
                  class="el-table__cell x-table__header-cell"
                  :class="{
                    'is-sortable': column.sortable,
                    'is-sorted-ascending': activeSort?.key === column.key && activeSort.order === 'ascending',
                    'is-sorted-descending': activeSort?.key === column.key && activeSort.order === 'descending',
                    'is-resizing': isResizingColumn(column),
                    'is-fixed-left': isColumnFixedLeft(column),
                    'is-fixed-right': isColumnFixedRight(column)
                  }"
                  :style="getNativeColumnStyle(column, 'header')"
                  @click="handleNativeSort(column)"
                >
                  <span class="x-table__header-content">
                    <span>{{ column.label }}</span>
                    <span v-if="column.sortable" class="x-table__sort-icons" aria-hidden="true">
                      <i class="x-table__sort-icon x-table__sort-icon--asc" />
                      <i class="x-table__sort-icon x-table__sort-icon--desc" />
                    </span>
                  </span>
                  <span
                    class="x-table__column-resizer"
                    :class="{ 'is-divider-hidden': !showHeaderVerticalDivider }"
                    role="separator"
                    aria-orientation="vertical"
                    :aria-label="`调整${column.label}列宽`"
                    @mousedown="startColumnResize(column, $event)"
                    @click.stop
                  />
                </th>
                <th
                  v-if="showActions"
                  class="el-table__cell x-table__header-cell x-table__actions-cell is-fixed-right"
                  :style="getActionColumnStyle('header')"
                >
                  操作
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div ref="bodyScrollRoot" class="x-table__body-scroll" @scroll="handleTableBodyScroll">
          <table class="x-table__native-table x-table__native-table--body el-table">
            <colgroup>
              <col v-if="draggableRows" :style="getNativeUtilitySizeStyle(56)" />
              <col v-if="selectable" :style="getNativeUtilitySizeStyle(52)" />
              <col v-if="showIndex" :style="getNativeUtilitySizeStyle(62)" />
              <col v-for="column in activeColumns" :key="column.key" :style="getNativeColumnSizeStyle(column)" />
              <col v-if="showActions" :style="getActionColumnSizeStyle()" />
            </colgroup>
            <tbody v-if="pagedRows.length > 0" class="el-table__body">
            <tr
              v-for="(row, rowIndex) in pagedRows"
              :key="String(getRowIdentity(row))"
              :class="getNativeRowClass(row, rowIndex)"
              @dragover="handleRowDragOver(row, $event)"
              @drop="handleRowDrop(row, $event)"
            >
              <td
                v-if="draggableRows"
                class="el-table__cell x-table__utility-cell x-table__utility-cell--drag"
                :class="getUtilityCellClass(row, '__x_table_drag__')"
                :style="getNativeUtilityStyle(56, 'left', 0)"
                draggable="true"
                @dragstart="handleRowDragStart(row, $event)"
                @dragover="handleRowDragOver(row, $event)"
                @drop="handleRowDrop(row, $event)"
                @dragend="handleRowDragEnd"
              >
                <div
                  class="x-table__row-dragger"
                >
                  ::
                </div>
              </td>
              <td
                v-if="selectable"
                class="el-table__cell x-table__utility-cell x-table__utility-cell--selection"
                :class="getUtilityCellClass(row, '__x_table_selection__')"
                :style="getNativeUtilityStyle(52, 'left', draggableRows ? 56 : 0)"
              >
                <input
                  type="checkbox"
                  :checked="isRowSelected(row)"
                  :aria-label="`选择第 ${rowIndex + 1} 行`"
                  @change="toggleRowSelection(row, ($event.target as HTMLInputElement).checked)"
                />
              </td>
              <td
                v-if="showIndex"
                class="el-table__cell x-table__utility-cell x-table__utility-cell--index"
                :class="getUtilityCellClass(row, '__x_table_index__')"
                :style="getNativeUtilityStyle(62, 'left', (draggableRows ? 56 : 0) + (selectable ? 52 : 0))"
              >
                {{ rowIndex + 1 }}
              </td>

              <td
                v-for="column in activeColumns"
                :key="column.key"
                class="el-table__cell"
                :class="[
                  getNativeCellClass(row, column),
                  {
                    'is-fixed-left': isColumnFixedLeft(column),
                    'is-fixed-right': isColumnFixedRight(column)
                  }
                ]"
                :style="getNativeColumnStyle(column)"
                @click="handleNativeCellClick(row, column, $event)"
                @dblclick="handleNativeCellDblclick(row, column, $event)"
              >
                <div
                  class="x-table__cell"
                  :class="{
                    'is-dirty': dirtyCellMap[getDirtyKey(getRowIdentity(row), column.key)],
                    'is-editing': isEditingCell(row, column),
                    'x-table__cell--center': (column.align ?? 'left') === 'center',
                    'x-table__cell--right': (column.align ?? 'left') === 'right'
                  }"
                  tabindex="0"
                  @click="activateCell(row, column, $event)"
                  @mousedown="startCellSelection(row, column, $event)"
                  @mouseenter="extendCellSelection(row, column)"
                  @dblclick="handleCellDblclick(row, column, $event)"
                  @contextmenu="openCellContextMenu(row, column, $event)"
                  @copy="handleCellCopy(row, column, $event)"
                >
                  <slot :name="`cell-${column.key}`" :row="getCellSlotRow(row)" :value="row[column.key]" :editable="isEditableColumn(column)">
                    <ElInput
                      v-if="isEditingCell(row, column) && resolveEditorType(column) === 'input'"
                      :model-value="String(row[column.key] ?? '')"
                      :placeholder="column.placeholder"
                      class="x-table__editor-input"
                      size="small"
                      @update:model-value="updateCell(row, column, $event)"
                    />
                    <XSelect
                      v-else-if="isEditingCell(row, column) && resolveEditorType(column) === 'select'"
                      :model-value="getSelectModelValue(row[column.key])"
                      :placeholder="column.placeholder"
                      class="x-table__editor-input"
                      size="sm"
                      @update:model-value="updateCell(row, column, $event)"
                    >
                      <XOption
                        v-for="option in column.options ?? []"
                        :key="String(option.value)"
                        :label="option.label"
                        :value="option.value"
                      />
                    </XSelect>
                    <ElRadioGroup
                      v-else-if="isEditingCell(row, column) && resolveEditorType(column) === 'radio'"
                      :model-value="getSelectModelValue(row[column.key])"
                      class="x-table__editor-input x-table__editor-radio"
                      size="small"
                      @update:model-value="updateCell(row, column, $event)"
                    >
                      <ElRadio
                        v-for="option in column.options ?? []"
                        :key="String(option.value)"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </ElRadio>
                    </ElRadioGroup>
                    <ElSwitch
                      v-else-if="isEditingCell(row, column) && resolveEditorType(column) === 'boolean'"
                      :model-value="Boolean(row[column.key])"
                      @update:model-value="updateCell(row, column, $event)"
                    />
                    <ElDatePicker
                      v-else-if="isEditingCell(row, column) && resolveEditorType(column) === 'date'"
                      :model-value="row[column.key] as string"
                      type="date"
                      class="x-table__editor-input"
                      value-format="YYYY-MM-DD"
                      @update:model-value="updateCell(row, column, $event)"
                    />
                    <ElDatePicker
                      v-else-if="isEditingCell(row, column) && resolveEditorType(column) === 'datetime'"
                      :model-value="row[column.key] as string"
                      type="datetime"
                      class="x-table__editor-input"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      @update:model-value="updateCell(row, column, $event)"
                    />
                    <ElInput
                      v-else-if="isEditingCell(row, column) && resolveEditorType(column) === 'dropdown'"
                      class="x-table__editor-input"
                      :model-value="String(row[column.key] ?? '')"
                      :placeholder="column.placeholder"
                      size="small"
                      @focus="openDropdownPicker(row, column, $event as unknown as MouseEvent)"
                      @update:model-value="
                        updateCell(row, column, $event);
                        dropdownPicker.keyword = String($event ?? '');
                        if (!dropdownPicker.visible) {
                          openDropdownPicker(row, column)
                        }
                      "
                    />
                    <ElTag v-else-if="resolveDisplayType(column) === 'tag'" :type="resolveTagType(column, row)" effect="plain">
                      {{ formatValue(column, row) }}
                    </ElTag>
                    <span v-else-if="resolveEditorType(column) === 'select' || resolveEditorType(column) === 'radio' || resolveEditorType(column) === 'dropdown'">
                      {{ getOptionLabel(column, row[column.key]) }}
                    </span>
                    <span v-else>{{ formatValue(column, row) }}</span>
                  </slot>
                </div>
              </td>

              <td
                v-if="showActions"
                class="el-table__cell x-table__actions-cell is-fixed-right"
                :style="getActionColumnStyle()"
              >
                <slot name="row-actions" :row="row" />
              </td>
            </tr>
            </tbody>
          </table>

          <div v-if="pagedRows.length === 0" class="x-table__empty">
            <img v-if="emptyImage" class="x-table__empty-image" :src="emptyImage" alt="" />
            <svg
              v-else
              class="x-table__empty-image x-table__empty-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="240"
              height="120"
              viewBox="0 0 240 120"
              aria-hidden="true"
            >
              <rect width="240" height="120" rx="14" :fill="bodyBackgroundColor" />
              <g transform="translate(68 38)">
                <rect width="34" height="34" rx="8" fill="currentColor" />
                <path d="M10 10l14 14M24 10L10 24" :stroke="bodyBackgroundColor" stroke-width="3.2" stroke-linecap="round" />
                <text x="42" y="23" font-size="18" fill="currentColor" font-family="Arial, sans-serif">x.ui</text>
              </g>
            </svg>
            <span class="x-table__empty-text">{{ emptyText }}</span>
          </div>
        </div>
      </div>
    </div>
    <footer v-if="showPagination" class="x-table__footer">
      <div class="x-table__summary">
        <span>当前第 {{ currentPage }} 页</span>
        <span>每页 {{ innerPageSize }} 条</span>
      </div>
      <ElPagination
        v-model:current-page="currentPage"
        v-model:page-size="innerPageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :page-sizes="pageSizes"
        @size-change="handleSizeChange"
      />
    </footer>

    <XDialog
      v-model="columnSettingsVisible"
      title="列设置"
      :width="760"
      :height="620"
      :min-width="640"
      :min-height="420"
      :max-width="960"
      :max-height="760"
      :draggable="false"
      :resizable="false"
      close-on-mask-click
    >
      <div class="x-table__column-panel x-table__column-panel--dialog">
        <div class="x-table__column-tip">拖拽列项可调整列顺序；显隐、固定列、比例宽度和 px 宽度会按 storageKey 自动保存，也可通过表格方法提取。</div>
        <div class="x-table__column-head">
          <span />
          <span />
          <span />
          <span />
          <span class="x-table__column-head-cell">
            <span>固定列</span>
            <button type="button" @click="resetColumnFixedValues">复位</button>
          </span>
          <span class="x-table__column-head-cell">
            <span>比例</span>
            <button type="button" @click="resetColumnRatioValues">复位</button>
          </span>
          <span class="x-table__column-head-cell">
            <span>宽度px</span>
            <button type="button" @click="resetColumnWidthValues">复位</button>
          </span>
        </div>
        <div
          v-for="column in orderedColumns"
          :key="column.key"
          class="x-table__column-item"
          :class="{
            'is-dragging': draggingColumnKey === column.key,
            'is-drop-before': columnDropIndicator.targetKey === column.key && columnDropIndicator.position === 'before',
            'is-drop-after': columnDropIndicator.targetKey === column.key && columnDropIndicator.position === 'after'
          }"
          draggable="true"
          @dragstart="handleColumnDragStart(column.key)"
          @dragover.prevent="handleColumnDragOver(column.key, $event)"
          @drop.prevent="handleColumnDrop(column.key)"
          @dragend="handleColumnDragEnd"
        >
          <span class="x-table__drag-handle">::</span>
          <ElCheckbox
            class="x-table__column-visible"
            :model-value="visibleColumnKeys.includes(column.key)"
            :aria-label="`显示${column.label}`"
            @change="toggleColumnVisibility(column.key)"
          />
          <i
            class="x-table__column-state"
            :class="isColumnEditableConfigured(column) ? 'ri-edit-line is-editable' : 'ri-lock-line is-readonly'"
            :title="isColumnEditableConfigured(column) ? '可编辑' : '只读'"
            :aria-label="isColumnEditableConfigured(column) ? '可编辑' : '只读'"
            role="img"
          />
          <span class="x-table__column-label">{{ column.label }}</span>
          <span class="x-table__column-fixed">
            <label>
              <input
                type="radio"
                :name="`x-table-column-fixed-${column.key}`"
                value="left"
                :checked="resolveColumnFixedInputValue(column) === 'left'"
                @change="updateColumnFixed(column.key, 'left')"
              />
              <span>左</span>
            </label>
            <label>
              <input
                type="radio"
                :name="`x-table-column-fixed-${column.key}`"
                value=""
                :checked="resolveColumnFixedInputValue(column) === ''"
                @change="updateColumnFixed(column.key, '')"
              />
              <span>无</span>
            </label>
            <label>
              <input
                type="radio"
                :name="`x-table-column-fixed-${column.key}`"
                value="right"
                :checked="resolveColumnFixedInputValue(column) === 'right'"
                @change="updateColumnFixed(column.key, 'right')"
              />
              <span>右</span>
            </label>
          </span>
          <ElInput
            class="x-table__column-ratio"
            :model-value="columnWidthRatioMap[column.key] ?? ''"
            placeholder="比例"
            size="small"
            @update:model-value="updateColumnWidthRatio(column.key, $event)"
          />
          <ElInput
            class="x-table__column-width"
            :model-value="columnWidthMap[column.key] ?? ''"
            placeholder="宽度px"
            size="small"
            @update:model-value="updateColumnWidth(column.key, $event)"
          />
        </div>
      </div>
      <template #footer>
        <ElButton @click="columnSettingsVisible = false">关闭</ElButton>
      </template>
    </XDialog>

    <div
      v-if="dropdownPicker.visible"
      class="x-table__dropdown-panel"
      :style="{ top: `${dropdownPicker.position.top}px`, left: `${dropdownPicker.position.left}px`, width: `${dropdownPicker.position.width}px` }"
    >
      <ElInput v-model="dropdownPicker.keyword" placeholder="输入关键字过滤" clearable />
      <div class="x-table__dropdown-table-wrap">
        <table class="x-table__dropdown-table">
          <thead>
            <tr>
              <th
                v-for="column in dropdownColumns"
                :key="column.key"
                :style="{ width: formatCssSize(column.width), minWidth: formatCssSize(column.minWidth, 120) }"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="optionRow in dropdownData" :key="JSON.stringify(optionRow)" @dblclick="selectDropdownRow(optionRow)">
              <td v-for="column in dropdownColumns" :key="column.key">
                {{ formatValue(column, optionRow) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span class="x-table__dialog-tip">双击一行完成单选。</span>
    </div>

    <div
      v-if="contextMenu.visible"
      class="x-table__context-menu"
      :style="contextMenuStyle"
      @click.stop
    >
      <button type="button" @click="copySelectedCellsToClipboard">复制</button>
      <button type="button" :disabled="!editable" @click="pasteFromClipboard">粘贴</button>
      <button type="button" @click="fitVisibleColumnsToContentWidth">自适应内容宽度</button>
      <button type="button" @click="fitVisibleColumnsToTableRatio">比例适合表格总宽度</button>
      <button type="button" :disabled="!editable" @click="insertRowByActiveCell('above')">向上插入一行</button>
      <button type="button" :disabled="!editable" @click="insertRowByActiveCell('below')">向下插入一行</button>
    </div>

    <span
      v-if="selectionHandle.visible"
      class="x-table__selection-handle"
      :style="{ top: `${selectionHandle.position.top}px`, left: `${selectionHandle.position.left}px` }"
      @mousedown="startSelectionResize"
    />
  </div>
</template>

<style scoped>
.x-table {
  --x-table-zebra-stripe-color: v-bind(zebraStripeColor);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  min-width: 0;
}

.x-table.is-fill-height {
  height: 100%;
}

.x-table.is-fill-height .x-table__toolbar,
.x-table.is-fill-height .x-table__footer {
  flex: 0 0 auto;
}

.x-table.is-fill-height .x-table__shell {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.x-table.is-fill-height .x-table__body {
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.x-table__shell {
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  width: 100%;
}

.x-table__shell:focus {
  outline: none;
}

.x-table__toolbar,
.x-table__footer {
  overflow-x: hidden;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  min-width: 0;
}

.x-table__toolbar-left,
.x-table__toolbar-right,
.x-table__metrics,
.x-table__summary {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  min-width: 0;
}

.x-table__toolbar-left {
  align-items: baseline;
  flex: 1 1 auto;
  flex-wrap: nowrap;
}

.x-table__toolbar-right {
  flex: 0 0 auto;
}

.x-table__metrics {
  flex: 0 0 auto;
  white-space: nowrap;
}

.x-table__title {
  color: var(--el-text-color-primary);
  font-size: 18px;
  font-weight: 700;
}

.x-table__metrics,
.x-table__summary {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.x-table__search {
  align-items: center;
  background: var(--el-fill-color-light);
  border-radius: 999px;
  display: flex;
  gap: 10px;
  min-width: 240px;
  padding: 0 12px;
}

.x-table__search :deep(.el-input__wrapper) {
  background: transparent;
  box-shadow: none;
}

.x-table__toolbar :deep(.el-button),
.x-table__toolbar :deep(.el-input__inner),
.x-table__toolbar :deep(.el-select__placeholder),
.x-table__toolbar :deep(.el-select__selected-item),
.x-table__footer :deep(.el-input__inner),
.x-table__footer :deep(.el-select__placeholder),
.x-table__footer :deep(.el-select__selected-item),
.x-table__footer :deep(.el-pagination),
.x-table__footer :deep(.el-pagination button),
.x-table__footer :deep(.el-pager li),
.x-table__footer :deep(.el-pagination__total),
.x-table__footer :deep(.el-pagination__jump) {
  font-size: 12px;
}

.x-table__icon-button {
  align-items: center;
  display: inline-flex;
  font-size: 16px;
  height: 32px;
  justify-content: center;
  min-width: 32px;
  padding: 0;
  width: 34px;
}

.x-table__icon-button i {
  line-height: 1;
}

.x-table__tool-groups,
.x-table__tool-group {
  align-items: center;
  display: inline-flex;
}

.x-table__tool-groups {
  gap: 18px;
}

.x-table__tool-group {
  gap: 8px;
}

.x-table__tooltip-anchor {
  display: inline-flex;
}

.x-table__density {
  width: 110px;
}

.x-table__column-panel {
  display: grid;
  font-size: 12px;
  gap: 8px;
  overflow-y: auto;
  padding-right: 4px;
}

.x-table__column-panel--dialog {
  padding-right: 6px;
}

.x-table__column-tip {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.45;
}

.x-table__column-head,
.x-table__column-item {
  align-items: center;
  display: grid;
  grid-template-columns: 14px 18px 16px minmax(110px, 1fr) 82px 74px 82px;
  gap: 6px;
}

.x-table__column-head {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  padding: 0 8px;
}

.x-table__column-head-cell {
  align-items: center;
  display: flex;
  gap: 4px;
  justify-content: space-between;
  min-width: 0;
}

.x-table__column-head-cell button {
  background: transparent;
  border: 0;
  color: var(--x-color-primary, #0e7490);
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  line-height: 1;
  padding: 0;
}

.x-table__column-head-cell button:hover {
  text-decoration: underline;
}

.x-table__column-item {
  background: var(--el-fill-color-light);
  border-radius: 8px;
  cursor: grab;
  padding: 6px;
  position: relative;
}

.x-table__column-item :deep(.el-checkbox__label),
.x-table__column-item :deep(.el-select__placeholder),
.x-table__column-item :deep(.el-input__inner) {
  font-size: 12px;
}

.x-table__column-item :deep(.el-input__wrapper),
.x-table__column-item :deep(.el-select__wrapper) {
  min-height: 26px;
}

.x-table__column-visible,
.x-table__column-label {
  min-width: 0;
}

.x-table__column-label {
  color: var(--el-text-color-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-table__column-state {
  color: var(--el-text-color-placeholder);
  font-size: 14px;
  line-height: 1;
}

.x-table__column-state.is-editable {
  color: var(--el-color-primary);
}

.x-table__column-fixed,
.x-table__column-ratio,
.x-table__column-width {
  width: 100%;
}

.x-table__column-ratio :deep(.el-input__wrapper),
.x-table__column-width :deep(.el-input__wrapper) {
  padding: 0 6px;
}

.x-table__column-fixed {
  align-items: center;
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(3, 1fr);
}

.x-table__column-fixed label {
  align-items: center;
  color: var(--el-text-color-secondary);
  cursor: pointer;
  display: inline-flex;
  font-size: 12px;
  gap: 1px;
  line-height: 1;
  min-width: 0;
}

.x-table__column-fixed input {
  height: 11px;
  margin: 0;
  width: 11px;
}

.x-table__column-fixed,
.x-table__column-ratio,
.x-table__column-width,
.x-table__column-visible,
.x-table__column-state {
  cursor: auto;
}

.x-table__column-item.is-dragging {
  opacity: 0.66;
}

.x-table__column-item.is-drop-before::before,
.x-table__column-item.is-drop-after::after {
  background: var(--x-color-primary, #0e7490);
  border-radius: 2px;
  content: '';
  height: 2px;
  left: 8px;
  pointer-events: none;
  position: absolute;
  right: 8px;
}

.x-table__column-item.is-drop-before::before {
  top: -2px;
}

.x-table__column-item.is-drop-after::after {
  bottom: -2px;
}

.x-table__drag-handle,
.x-table__row-dragger {
  color: var(--el-text-color-placeholder);
  font-size: 16px;
  letter-spacing: -2px;
  user-select: none;
}

.x-table__row-dragger {
  cursor: grab;
}

.x-table__body {
  border: 1px solid v-bind(borderColor);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  min-width: 100%;
  width: 100%;
}

.x-table__header-scroll {
  flex: 0 0 auto;
  max-width: 100%;
  overflow: hidden;
}

.x-table__body-scroll {
  flex: 1 1 auto;
  min-height: 0;
  max-width: 100%;
  overflow: auto;
}

.x-table__native-table,
.x-table__dropdown-table {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

.x-table__native-table {
  background: v-bind(bodyBackgroundColor);
  min-width: 100%;
  width: max-content;
}

.x-table__native-table thead {
  position: sticky;
  top: 0;
  z-index: 8;
}

.x-table__native-table th,
.x-table__native-table td {
  background: v-bind(bodyBackgroundColor);
  border-bottom: 1px solid v-bind(borderColor);
  box-sizing: border-box;
  line-height: 1.35;
  padding: 0 12px;
  position: relative;
  vertical-align: middle;
}

.x-table__native-table th {
  background: v-bind(headerBackgroundColor);
  color: v-bind(headerTextColor);
  font-size: 13px;
  font-weight: 600;
  height: v-bind(headerHeightPx);
  position: sticky;
  top: 0;
  user-select: none;
  z-index: 8;
}

.x-table__native-table td {
  color: v-bind(bodyTextColor);
  font-size: 13px;
  height: v-bind(rowHeightPx);
}

.x-table__native-table th:not(:last-child) {
  border-right: v-bind(headerDividerStyle);
}

.x-table__native-table td:not(:last-child) {
  border-right: v-bind(bodyDividerStyle);
}

.x-table__native-table tr.x-table__zebra-row > td {
  background: var(--x-table-zebra-stripe-color);
}

.x-table__native-table tr:hover > td {
  background: v-bind(rowHoverBackgroundColor);
}

.x-table__native-table tr.x-table__zebra-row:hover > td {
  background: color-mix(in srgb, var(--x-table-zebra-stripe-color), #fff 24%);
}

.x-table__native-table .is-fixed-left,
.x-table__native-table .is-fixed-right,
.x-table__utility-cell,
.x-table__actions-cell {
  box-shadow: 0 0 0 1px transparent;
}

.x-table__native-table .is-fixed-left::after {
  background: linear-gradient(90deg, v-bind(fixedShadowColor), transparent);
  bottom: 0;
  content: '';
  pointer-events: none;
  position: absolute;
  right: -8px;
  top: 0;
  width: 8px;
}

.x-table__native-table .is-fixed-right::before {
  background: linear-gradient(270deg, v-bind(fixedShadowColor), transparent);
  bottom: 0;
  content: '';
  left: -8px;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 8px;
}

.x-table__utility-cell {
  text-align: center;
}

.x-table__utility-cell input[type='checkbox'] {
  cursor: pointer;
  height: 14px;
  margin: 0;
  width: 14px;
}

.x-table__header-cell.is-sortable {
  cursor: pointer;
}

.x-table__header-content,
.x-table__sort-icons {
  align-items: center;
  display: inline-flex;
}

.x-table__header-content {
  gap: 6px;
  min-width: 0;
}

.x-table__column-resizer {
  bottom: 0;
  cursor: col-resize;
  position: absolute;
  right: -6px;
  top: 0;
  width: 12px;
  z-index: 9;
}

.x-table__column-resizer::after {
  background: color-mix(in srgb, var(--x-color-primary, #0e7490), transparent 58%);
  border-radius: 999px;
  bottom: 8px;
  content: '';
  opacity: 0;
  position: absolute;
  right: 5px;
  top: 8px;
  transition: background 0.16s ease, opacity 0.16s ease, width 0.16s ease;
  width: 3px;
}

.x-table__column-resizer.is-divider-hidden::after {
  bottom: calc(50% - 8px);
  opacity: 0.42;
  top: calc(50% - 8px);
}

.x-table__column-resizer:hover::after,
.x-table__header-cell.is-resizing .x-table__column-resizer::after {
  background: var(--x-color-primary, #0e7490);
  bottom: 8px;
  opacity: 1;
  top: 8px;
  width: 4px;
}

.x-table.is-column-resizing {
  cursor: col-resize;
  user-select: none;
}

.x-table__sort-icons {
  color: var(--el-text-color-placeholder);
  flex-direction: column;
  gap: 1px;
}

.x-table__sort-icon {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  height: 0;
  width: 0;
}

.x-table__sort-icon--asc {
  border-bottom: 5px solid currentcolor;
}

.x-table__sort-icon--desc {
  border-top: 5px solid currentcolor;
}

.x-table__header-cell.is-sorted-ascending .x-table__sort-icon--asc,
.x-table__header-cell.is-sorted-descending .x-table__sort-icon--desc {
  color: var(--x-color-primary, #0e7490);
}

.x-table__body.el-table--large .x-table__native-table th,
.x-table__body.el-table--large .x-table__native-table td {
  height: calc(v-bind(rowHeightPx) + 8px);
}

.x-table__body.el-table--small .x-table__native-table th,
.x-table__body.el-table--small .x-table__native-table td {
  height: max(30px, calc(v-bind(rowHeightPx) - 6px));
}

.x-table__body.el-table--large .x-table__native-table th,
.x-table__body.el-table--small .x-table__native-table th {
  height: v-bind(headerHeightPx);
}

.x-table__cell {
  align-items: center;
  border-radius: 4px;
  display: flex;
  height: v-bind(rowHeightPx);
  min-height: 28px;
  min-width: 0;
  overflow: hidden;
  position: relative;
  user-select: none;
  white-space: nowrap;
  width: 100%;
}

.x-table__cell:focus {
  outline: none;
}

.x-table__cell > span {
  display: block;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-table__cell :deep(.el-tag) {
  max-width: 100%;
}

.x-table__cell :deep(.el-tag__content) {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-table__cell--center {
  justify-content: center;
  text-align: center;
}

.x-table__cell--right {
  justify-content: flex-end;
  text-align: right;
}

.x-table__cell.is-editing {
  user-select: text;
}

.x-table__cell.is-dirty::after {
  border-right: 7px solid v-bind(dirtyMarkColor);
  border-top: 7px solid v-bind(dirtyMarkColor);
  content: '';
  position: absolute;
  right: -2px;
  top: -2px;
}

.x-table__selection-handle {
  background: v-bind(selectedCellBorderColor);
  border: 0;
  box-sizing: border-box;
  cursor: crosshair;
  height: 8px;
  pointer-events: auto;
  position: fixed;
  width: 8px;
  z-index: 1800;
}

.x-table__dialog-select {
  justify-content: flex-start;
  width: 100%;
}

.x-table__import-btn {
  align-items: center;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  font-size: 12px;
  height: 32px;
  padding: 0;
  position: relative;
  width: 34px;
}

.x-table__import-btn input {
  display: none;
}

.x-table__empty {
  align-items: center;
  color: var(--el-text-color-secondary);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  min-height: 180px;
  padding: 24px;
}

.x-table__empty-image {
  max-height: 140px;
  max-width: 220px;
  object-fit: contain;
}

.x-table__empty-icon {
  color: color-mix(in srgb, v-bind(bodyBackgroundColor), v-bind(bodyTextColor) 42%);
}

.x-table__empty-text,
.x-table__dialog-tip {
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.x-table__body :deep(.el-table__inner-wrapper) {
  min-height: 0;
}

.x-table__body :deep(.el-table__body-wrapper) {
  overflow-x: auto !important;
  overflow-y: auto !important;
  min-height: 0 !important;
}

.x-table__body :deep(.el-scrollbar),
.x-table__body :deep(.el-scrollbar__wrap),
.x-table__body :deep(.el-scrollbar__view) {
  min-height: 0 !important;
}

.x-table__body :deep(.el-table__header-wrapper),
.x-table__body :deep(.el-table__footer-wrapper),
.x-table__body :deep(.el-table__fixed),
.x-table__body :deep(.el-table__fixed-right) {
  overflow: hidden !important;
}

.x-table__body :deep(.el-table__cell) {
  border-bottom-color: var(--el-border-color-lighter);
  height: v-bind(rowHeightPx);
}

.x-table__body :deep(.el-table__header-wrapper th) {
  background: var(--el-fill-color-light);
  color: var(--el-text-color-primary);
}

.x-table__body :deep(.el-table__body tr.x-table__zebra-row > td.el-table__cell) {
  background: var(--x-table-zebra-stripe-color) !important;
}

.x-table__body :deep(.el-table__header-wrapper th.el-table__cell) {
  border-right: v-bind(headerDividerStyle);
}

.x-table__body :deep(.el-table__body td.el-table__cell) {
  border-right: v-bind(bodyDividerStyle);
}

.x-table__body :deep(.el-table__inner-wrapper) {
  width: 100%;
}

.x-table__body :deep(.el-table__body tr.x-table__row-drop-before > td) {
  border-top: 2px solid var(--x-color-primary, #0e7490);
}

.x-table__body :deep(.el-table__body tr.x-table__row-drop-after > td) {
  border-bottom: 2px solid var(--x-color-primary, #0e7490);
}

.x-table__shell :deep(.el-table) {
  min-width: 100%;
}

.x-table__shell,
.x-table__footer {
  margin-top: 16px;
}

.x-table__editor-input :deep(.el-input__wrapper),
.x-table__editor-input :deep(.el-select__wrapper),
.x-table__editor-input.x-select,
.x-table__editor-input :deep(.x-select__control),
.x-table__editor-input :deep(.el-date-editor.el-input),
.x-table__editor-input :deep(.el-date-editor .el-input__wrapper),
.x-table__editor-input :deep(.el-input),
.x-table__editor-input :deep(.el-input__inner),
.x-table__editor-input :deep(.el-textarea__inner) {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
}

.x-table__editor-radio {
  display: inline-flex;
  gap: 10px;
}

.x-table__editor-radio :deep(.el-radio) {
  height: 24px;
  margin-right: 0;
}

.x-table__cell :deep(.el-date-editor),
.x-table__cell :deep(.el-date-editor.el-input),
.x-table__cell :deep(.el-date-editor .el-input__wrapper),
.x-table__cell :deep(.el-date-editor .el-range-input) {
  --el-input-border-color: transparent !important;
  --el-input-hover-border-color: transparent !important;
  --el-input-focus-border-color: transparent !important;
  --el-border-color: transparent !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.x-table__editor-input:deep(.el-date-editor),
.x-table__editor-input:deep(.el-date-editor.el-input),
.x-table__editor-input:deep(.el-date-editor.el-input__wrapper),
.x-table__editor-input:deep(.el-date-editor .el-input__wrapper) {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.x-table__editor-input :deep(.el-input__wrapper.is-focus),
.x-table__editor-input :deep(.el-select__wrapper.is-focused),
.x-table__editor-input.x-select.is-open,
.x-table__editor-input.x-select:hover,
.x-table__editor-input :deep(.el-date-editor .el-input__wrapper.is-focus),
.x-table__editor-input :deep(.el-date-editor .el-input__wrapper.is-focused),
.x-table__editor-input :deep(.el-input__wrapper:hover),
.x-table__editor-input :deep(.el-select__wrapper:hover),
.x-table__editor-input :deep(.el-date-editor .el-input__wrapper:hover) {
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

.x-table__cell :deep(.el-date-editor .el-input__wrapper),
.x-table__cell :deep(.el-date-editor .el-input__wrapper:hover),
.x-table__cell :deep(.el-date-editor .el-input__wrapper.is-focus),
.x-table__cell :deep(.el-date-editor .el-input__wrapper.is-focused) {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.x-table__body :deep(td.x-table__active-td) {
  position: relative;
}

.x-table__body :deep(.el-table__body tr > td.el-table__cell.x-table__selected-td),
.x-table__body :deep(.el-table__body tr:hover > td.el-table__cell.x-table__selected-td),
.x-table__body :deep(.el-table__body tr.hover-row > td.el-table__cell.x-table__selected-td),
.x-table__body :deep(.el-table__body tr.x-table__zebra-row > td.el-table__cell.x-table__selected-td) {
  background: v-bind(selectedCellBackgroundColor) !important;
  border-bottom-color: v-bind(selectedCellInnerBorderColor) !important;
  border-right-color: v-bind(selectedCellInnerBorderColor) !important;
  position: relative;
}

.x-table__body :deep(td.x-table__selected-td::before) {
  border: 0 solid v-bind(selectedCellBorderColor);
  content: '';
  inset: -1px;
  pointer-events: none;
  position: absolute;
  z-index: 1;
}

.x-table__body :deep(td.x-table__selection-edge-top::before) {
  border-top-width: 1px;
}

.x-table__body :deep(td.x-table__selection-edge-right::before) {
  border-right-width: 1px;
}

.x-table__body :deep(td.x-table__selection-edge-bottom::before) {
  border-bottom-width: 1px;
}

.x-table__body :deep(td.x-table__selection-edge-left::before) {
  border-left-width: 1px;
}

.x-table__body :deep(td.x-table__active-td::after) {
  border: v-bind(activeCellBorderWidthPx) solid v-bind(activeCellBorderColor);
  content: '';
  inset: v-bind(activeCellBorderInsetPx);
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.x-table__body :deep(td.x-table__active-td .el-input__wrapper),
.x-table__body :deep(td.x-table__active-td .el-select__wrapper),
.x-table__body :deep(td.x-table__active-td .el-input__inner),
.x-table__body :deep(td.x-table__active-td .el-textarea__inner) {
  background: transparent !important;
}

.x-table__dropdown-panel {
  background: #fff;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 14%);
  display: grid;
  gap: 8px;
  padding: 10px;
  position: fixed;
  z-index: 1700;
}

.x-table__context-menu {
  background: var(--x-table-context-menu-bg, #fff);
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  box-shadow: 0 12px 28px rgb(0 0 0 / 14%);
  display: grid;
  min-width: 150px;
  overflow: hidden;
  padding: 4px;
  position: fixed;
  z-index: 1850;
}

.x-table__context-menu button {
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: var(--x-table-context-menu-text, var(--el-text-color-primary));
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  padding: 9px 10px;
  text-align: left;
}

.x-table__context-menu button:hover:not(:disabled) {
  background: color-mix(in srgb, var(--x-table-context-menu-bg, #fff), var(--x-table-context-menu-text, var(--el-text-color-primary)) 10%);
}

.x-table__context-menu button:disabled {
  color: color-mix(in srgb, var(--x-table-context-menu-bg, #fff), var(--x-table-context-menu-text, var(--el-text-color-disabled)) 45%);
  cursor: not-allowed;
}

.x-table__body :deep(.el-scrollbar__bar.is-vertical > div),
.x-table__body :deep(.el-scrollbar__bar.is-horizontal > div) {
  background: #9eb2c7;
}

.x-table__body :deep(.el-scrollbar__bar.is-vertical) {
  width: 6px;
}

.x-table__body :deep(.el-scrollbar__bar.is-horizontal) {
  height: 6px;
}

@media (max-width: 860px) {
  .x-table__toolbar,
  .x-table__footer {
    align-items: flex-start;
  }

  .x-table__toolbar-right,
  .x-table__search {
    width: 100%;
  }
}
</style>
