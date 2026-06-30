import type { App } from 'vue'
import XTable from './src/Table.vue'

export { XTable }
export { XTable as XlTable }
export default XTable
export type {
  TableAlign,
  TableAppendRowPayload,
  TableCellChangePayload,
  TableColumn,
  TableColumnResizePayload,
  TableColumnSetting,
  TableDeleteSelectedRowsPayload,
  TableDirtyCellChange,
  TableDirtyChangePayload,
  TableEditableDataStrategy,
  TableExcelExportMode,
  TableExcelExportPayload,
  TableExcelImportPayload,
  TableFixed,
  TableReorderPosition,
  TableRowPatchPayload,
  TableRowKey,
  TableRowClickPayload,
  TableRowReorderPayload,
  TableSavePayload,
  TableSelectionMode,
  TableSorter,
  TableSortOrder,
  TableSummaryAggregator,
  TableSummaryCell,
  TableSummaryContext,
  TableSummaryRow,
  TableSummaryScope,
  TableProps,
  XlTableAppendRowPayload,
  XlTableColumn,
  XlTableColumnResizePayload,
  XlTableDeleteSelectedRowsPayload,
  XlTableDirtyCellChange,
  XlTableDirtyChangePayload,
  XlTableEditableDataStrategy,
  XlTableExcelExportMode,
  XlTableExcelExportPayload,
  XlTableExcelImportPayload,
  XlTableRowPatchPayload,
  XlTableRowClickPayload,
  XlTableSavePayload,
  XlTableSorter,
  XlTableSortOrder,
  XlTableProps,
  XlTableSummaryAggregator,
  XlTableSummaryCell,
  XlTableSummaryContext,
  XlTableSummaryRow,
  XlTableSummaryScope
} from './src/types'

export function install(app: App) {
  app.component(XTable.name!, XTable)
}
