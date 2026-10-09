import type { App } from 'vue'
import XTable from './src/Table.vue'

export { XTable }
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
} from './src/types'

export function install(app: App) {
  app.component(XTable.name!, XTable)
}
