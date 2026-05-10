export type TableRowKey = string | number
export type TableSize = 'large' | 'default' | 'small'
export type TableAlign = 'left' | 'center' | 'right'
export type TableFixed = true | 'left' | 'right'
export type TableSelectionMode = 'cell' | 'row'
export type TableColumnDisplayType = 'text' | 'tag' | 'boolean' | 'date'
export type TableColumnEditorType = 'none' | 'input' | 'select' | 'dropdown' | 'boolean' | 'date' | 'datetime'
export type TableColumnType = TableColumnDisplayType | Exclude<TableColumnEditorType, 'none'> | 'dialog-select'
export type TableTagType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface TableColumnOption {
  label: string
  value: string | number | boolean
  type?: TableTagType
}

export interface TableColumn<Row extends Record<string, unknown> = Record<string, unknown>> {
  key: string
  label: string
  width?: number | string
  minWidth?: number | string
  align?: TableAlign
  fixed?: TableFixed
  sortable?: boolean | 'custom'
  searchable?: boolean
  type?: TableColumnType
  displayType?: TableColumnDisplayType
  editorType?: TableColumnEditorType
  headerAlign?: TableAlign
  editable?: boolean
  placeholder?: string
  formatter?: (value: unknown, row: Row) => string
  options?: TableColumnOption[]
  filterable?: boolean
  valueKey?: string
  labelKey?: string
  dialogTitle?: string
  dialogColumns?: TableColumn[]
  dialogData?: Record<string, unknown>[]
}

export interface TableColumnSetting {
  key: string
  visible: boolean
  order: number
  fixed?: TableFixed
  widthRatio?: number
  width?: number
}

export interface TableProps<Row extends Record<string, unknown> = Record<string, unknown>> {
  title?: string
  data: Row[]
  columns: TableColumn<Row>[]
  rowKey?: string
  loading?: boolean
  searchable?: boolean
  selectable?: boolean
  showIndex?: boolean
  pageSize?: number
  pageSizes?: number[]
  showToolbar?: boolean
  showMetrics?: boolean
  showPagination?: boolean
  showActions?: boolean
  actionsMinWidth?: number | string
  emptyText?: string
  emptyImage?: string
  editable?: boolean
  showDirtyActions?: boolean
  storageKey?: string
  draggableRows?: boolean
  draggableColumns?: boolean
  fillHeight?: boolean
  zebraStripeColor?: string
  showHeaderVerticalDivider?: boolean
  showBodyVerticalDivider?: boolean
  density?: TableSize
  rowHeight?: number
  activeCellBorderColor?: string
  activeCellBorderWidth?: number | string
  selectedCellBackgroundColor?: string
  selectedCellBorderColor?: string
  selectedCellInnerBorderColor?: string
  selectionMode?: TableSelectionMode
  headerAlign?: TableAlign
  remote?: boolean
  total?: number
}

export interface TableCellChange {
  rowKey: TableRowKey
  columnKey: string
  oldValue: unknown
  value: unknown
  row: Record<string, unknown>
}

export interface TableDirtySubmitPayload {
  changes: TableCellChange[]
  rows: Record<string, unknown>[]
}

export interface TableStoredState {
  keyword: string
  density: TableSize
  pageSize: number
  currentPage: number
  visibleColumnKeys: string[]
  columnOrderKeys: string[]
  columnSettings?: TableColumnSetting[]
  rowOrderKeys: TableRowKey[]
}

export interface TableExpose {
  getColumnSettings: () => TableColumnSetting[]
  setColumnSettings: (settings: TableColumnSetting[]) => void
  resetColumnSettings: () => void
  getStoredState: () => TableStoredState
  setStoredState: (state: Partial<TableStoredState>) => void
}

export interface TableRowOrderChangePayload {
  rowKeys: TableRowKey[]
}

export interface TableColumnOrderChangePayload {
  columnKeys: string[]
}

export interface TableQueryChangePayload {
  page: number
  pageSize: number
  keyword: string
  sorter?: {
    key: string
    order: 'ascending' | 'descending' | null
  }
}

export interface TableRowDblclickPayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  row: Row
  rowKey: TableRowKey
  event: MouseEvent
}

export type XlTableColumnOption = TableColumnOption
export type XlTableColumn<Row extends Record<string, unknown> = Record<string, unknown>> = TableColumn<Row>
export type XlTableProps<Row extends Record<string, unknown> = Record<string, unknown>> = TableProps<Row>
