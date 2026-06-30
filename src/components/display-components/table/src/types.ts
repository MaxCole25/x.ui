import type { XSize } from '../../../_utils/size'
export type TableAlign = 'left' | 'center' | 'right'
export type TableFixed = 'left' | 'right' | 'none'
export type TableRowKey = string | number
export type TableReorderPosition = 'before' | 'after'
export type TableSelectionMode = 'row' | 'cell'
export type TableEditableDataStrategy = 'auto' | 'emit' | 'mutate'
export type TableExcelExportMode = 'raw' | 'formatted'
export type TableSummaryAggregator = 'sum' | 'avg'
export type TableSummaryScope = 'visible' | 'all'
export type TableSortOrder = 'ascending' | 'descending' | null

export interface TableSorter {
  key: string
  order: TableSortOrder
}

export interface TableColumn<Row extends Record<string, unknown> = Record<string, unknown>> {
  key: string
  label: string
  width?: number | string
  minWidth?: number | string
  align?: TableAlign
  sortable?: boolean
  valueGetter?: (row: Row, column: TableColumn<Row>) => unknown
  formatter?: (value: unknown, row: Row) => string
  editable?: boolean
  readonly?: boolean
}

export interface TableSummaryContext<Row extends Record<string, unknown> = Record<string, unknown>> {
  data: Row[]
  visibleData: Row[]
  columns: TableColumn<Row>[]
  scope: TableSummaryScope
}

export type TableSummaryValueGetter<Row extends Record<string, unknown> = Record<string, unknown>> = (
  rows: Row[],
  column: TableColumn<Row>,
  context: TableSummaryContext<Row>
) => unknown

export type TableSummaryCell<Row extends Record<string, unknown> = Record<string, unknown>> =
  | TableSummaryAggregator
  | TableSummaryValueGetter<Row>

export interface TableSummaryRow<Row extends Record<string, unknown> = Record<string, unknown>> {
  label?: string
  labelColumnKey?: string
  cells?: Record<string, TableSummaryCell<Row>>
}

export interface TableColumnSetting {
  key: string
  order?: number
  hidden?: boolean
  fixed?: TableFixed
  align?: TableAlign
  widthRatio?: number
  width?: number
}

export interface TableRowReorderPayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  row: Row
  rows: Row[]
  fromIndex: number
  toIndex: number
  targetRow: Row
  position: TableReorderPosition
}

export interface TableAppendRowPayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  row: Row
  rows: Row[]
}

export interface TableDeleteSelectedRowsPayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  keys: string[]
  rows: Row[]
  deletedRows: Row[]
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

export interface TableRowPatchPayload {
  rowKey?: string | number
  rowIndex?: number
  patch: Record<string, unknown>
}

export interface TableDirtyCellChange<Row extends Record<string, unknown> = Record<string, unknown>> extends TableCellChangePayload<Row> {
  rowKey: string
  columnKey: string
}

export interface TableDirtyChangePayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  changes: TableDirtyCellChange<Row>[]
  rows: Row[]
  dirtyRows: Row[]
}

export interface TableSavePayload<Row extends Record<string, unknown> = Record<string, unknown>> extends TableDirtyChangePayload<Row> {}

export interface TableExcelExportPayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  mode: TableExcelExportMode
  fileName: string
  rows: Row[]
  columns: TableColumn<Row>[]
}

export interface TableExcelImportPayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  file: File
  rows: Row[]
  columns: TableColumn<Row>[]
}

export interface TableProps<Row extends Record<string, unknown> = Record<string, unknown>> {
  size?: XSize
  rowHeight?: number | string
  data: Row[]
  columns: TableColumn<Row>[]
  columnSettings?: TableColumnSetting[]
  sorter?: TableSorter | null
  defaultSorter?: TableSorter | null
  selectedRowKeys?: TableRowKey[]
  selectedCellKeys?: string[]
  selectionMode?: TableSelectionMode
  rowKey?: string
  emptyText?: string
  showHeader?: boolean
  summaryRow?: TableSummaryRow<Row> | false
  summaryScope?: TableSummaryScope
  showActions?: boolean
  actionsFixed?: boolean
  showSelection?: boolean
  showSelectionColumn?: boolean
  editable?: boolean
  editableDataStrategy?: TableEditableDataStrategy
  showDirtyActions?: boolean
  showAppendRowButton?: boolean
  showDeleteSelectedRowsButton?: boolean
  saveDirtyButtonLabel?: string
  clearDirtyButtonLabel?: string
  resetDirtyButtonLabel?: string
  appendRowButtonLabel?: string
  deleteSelectedRowsButtonLabel?: string
  rowDraggable?: boolean
  columnResizable?: boolean
  panelBackgroundColor?: string
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
  actionsWidth?: number | string
  fullHeight?: boolean
}

export type XlTableColumn<Row extends Record<string, unknown> = Record<string, unknown>> = TableColumn<Row>
export type XlTableColumnSetting = TableColumnSetting
export type XlTableAppendRowPayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableAppendRowPayload<Row>
export type XlTableColumnResizePayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableColumnResizePayload<Row>
export type XlTableDeleteSelectedRowsPayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableDeleteSelectedRowsPayload<Row>
export type XlTableDirtyCellChange<Row extends Record<string, unknown> = Record<string, unknown>> = TableDirtyCellChange<Row>
export type XlTableDirtyChangePayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableDirtyChangePayload<Row>
export type XlTableEditableDataStrategy = TableEditableDataStrategy
export type XlTableExcelExportMode = TableExcelExportMode
export type XlTableExcelExportPayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableExcelExportPayload<Row>
export type XlTableExcelImportPayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableExcelImportPayload<Row>
export type XlTableRowPatchPayload = TableRowPatchPayload
export type XlTableRowClickPayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableRowClickPayload<Row>
export type XlTableProps<Row extends Record<string, unknown> = Record<string, unknown>> = TableProps<Row>
export type XlTableSavePayload<Row extends Record<string, unknown> = Record<string, unknown>> = TableSavePayload<Row>
export type XlTableSorter = TableSorter
export type XlTableSortOrder = TableSortOrder
export type XlTableSummaryAggregator = TableSummaryAggregator
export type XlTableSummaryCell<Row extends Record<string, unknown> = Record<string, unknown>> = TableSummaryCell<Row>
export type XlTableSummaryContext<Row extends Record<string, unknown> = Record<string, unknown>> = TableSummaryContext<Row>
export type XlTableSummaryRow<Row extends Record<string, unknown> = Record<string, unknown>> = TableSummaryRow<Row>
export type XlTableSummaryScope = TableSummaryScope
