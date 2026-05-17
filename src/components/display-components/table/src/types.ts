import type { XSize } from '../../../_utils/size'
export type TableAlign = 'left' | 'center' | 'right'
export type TableFixed = 'left' | 'right' | 'none'
export type TableRowKey = string | number
export type TableReorderPosition = 'before' | 'after'
export type TableSelectionMode = 'row' | 'cell'
export type TablePaginationMode = 'client' | 'server'

export interface TableColumn<Row extends Record<string, unknown> = Record<string, unknown>> {
  key: string
  label: string
  width?: number | string
  minWidth?: number | string
  align?: TableAlign
  formatter?: (value: unknown, row: Row) => string
}

export interface TableColumnSetting {
  key: string
  order?: number
  fixed?: TableFixed
  align?: TableAlign
  widthRatio?: number
  width?: number
}

export interface TableTopSlotScope<Row extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn<Row>[]
  data: Row[]
  visibleData: Row[]
  columnSettings: TableColumnSetting[]
  selectedRowKeys: string[]
  selectedCellKeys: string[]
  pagination: TablePaginationState
  updateColumnSetting: (key: string, setting: Partial<TableColumnSetting>) => void
  moveColumnSetting: (key: string, direction: 'up' | 'down') => void
  reorderColumnSetting: (key: string, targetKey: string, position: TableReorderPosition) => void
  resetColumnSettings: () => void
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export interface TablePaginationState {
  currentPage: number
  pageSize: number
  total: number
  pageCount: number
  mode: TablePaginationMode
}

export interface TablePaginationChangePayload extends TablePaginationState {
  pageSizeChanged?: boolean
}

export interface TableRowReorderPayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  row: Row
  rows: Row[]
  fromIndex: number
  toIndex: number
  targetRow: Row
  position: TableReorderPosition
}

export interface TableRowClickPayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  row: Row
  rowIndex: number
  rowKey: string
  event: MouseEvent
}

export interface TableColumnResizePayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  column: TableColumn<Row>
  key: string
  width: number
  oldWidth: number
  columnSettings: TableColumnSetting[]
}

export interface TableCellChangePayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  row: Row
  rows: Row[]
  rowIndex: number
  column: TableColumn<Row>
  key: string
  value: unknown
  oldValue: unknown
}

export interface TableProps<Row extends Record<string, unknown> = Record<string, unknown>> {
  size?: XSize
  data: Row[]
  columns: TableColumn<Row>[]
  columnSettings?: TableColumnSetting[]
  selectedRowKeys?: TableRowKey[]
  selectedCellKeys?: string[]
  selectionMode?: TableSelectionMode
  rowKey?: string
  emptyText?: string
  showHeader?: boolean
  showActions?: boolean
  showSelection?: boolean
  showSelectionColumn?: boolean
  editable?: boolean
  rowDraggable?: boolean
  columnResizable?: boolean
  showColumnSettings?: boolean
  panelBackgroundColor?: string
  topBackgroundColor?: string
  bottomBackgroundColor?: string
  headerBackgroundColor?: string
  headerTextColor?: string
  bodyBackgroundColor?: string
  bodyStripeBackgroundColor?: string
  bodyTextColor?: string
  selectedCellBackgroundColor?: string
  selectedCellTextColor?: string
  selectedCellBorderColor?: string
  selectedCellInnerBorderColor?: string
  borderColor?: string
  viewportBorderColor?: string
  headerDividerColor?: string
  rowBorderColor?: string
  columnBorderColor?: string
  horizontalBorderColor?: string
  horizontalBorderWidth?: number | string
  verticalBorderColor?: string
  verticalBorderWidth?: number | string
  showPagination?: boolean
  paginationMode?: TablePaginationMode
  currentPage?: number
  pageSize?: number
  total?: number
  pageSizes?: number[]
  actionsWidth?: number | string
  fillHeight?: boolean
}

export type XlTableColumn<Row extends Record<string, unknown> = Record<string, unknown>> = TableColumn<Row>
export type XlTableColumnSetting = TableColumnSetting
export type XlTableColumnResizePayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableColumnResizePayload<Row>
export type XlTablePaginationChangePayload = TablePaginationChangePayload
export type XlTablePaginationMode = TablePaginationMode
export type XlTableRowClickPayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableRowClickPayload<Row>
export type XlTableProps<Row extends Record<string, unknown> = Record<string, unknown>> = TableProps<Row>
