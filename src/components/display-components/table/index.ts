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
  TableExcelExportMode,
  TableExcelExportPayload,
  TableExcelImportPayload,
  TablePaginationChangePayload,
  TablePaginationMode,
  TablePaginationState,
  TableReorderPosition,
  TableRowKey,
  TableRowClickPayload,
  TableRowReorderPayload,
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
  XlTableExcelExportMode,
  XlTableExcelExportPayload,
  XlTableExcelImportPayload,
  XlTablePaginationChangePayload,
  XlTablePaginationMode,
  XlTableRowClickPayload,
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
