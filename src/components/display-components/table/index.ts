import type { App } from 'vue'
import XTable from './src/Table.vue'

export { XTable }
export { XTable as XlTable }
export default XTable
export type {
  TableAlign,
  TableCellChangePayload,
  TableColumn,
  TableColumnResizePayload,
  TableColumnSetting,
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
  TableProps,
  XlTableColumn,
  XlTableColumnResizePayload,
  XlTableExcelExportMode,
  XlTableExcelExportPayload,
  XlTableExcelImportPayload,
  XlTablePaginationChangePayload,
  XlTablePaginationMode,
  XlTableRowClickPayload,
  XlTableProps
} from './src/types'

export function install(app: App) {
  app.component(XTable.name!, XTable)
}
