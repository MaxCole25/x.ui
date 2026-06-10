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
  TableColumnSettingsDialogMode,
  TableDeleteSelectedRowsPayload,
  TableDirtyCellChange,
  TableDirtyChangePayload,
  TableExcelExportMode,
  TableExcelExportPayload,
  TableExcelImportPayload,
  TablePaginationChangePayload,
  TablePaginationMode,
  TablePaginationState,
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
  XlTableColumnSettingsDialogMode,
  XlTableColumnResizePayload,
  XlTableDeleteSelectedRowsPayload,
  XlTableDirtyCellChange,
  XlTableDirtyChangePayload,
  XlTableExcelExportMode,
  XlTableExcelExportPayload,
  XlTableExcelImportPayload,
  XlTablePaginationChangePayload,
  XlTablePaginationMode,
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
