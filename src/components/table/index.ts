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
  TableReorderPosition,
  TableRowKey,
  TableRowClickPayload,
  TableRowReorderPayload,
  TableSelectionMode,
  TableProps,
  XlTableColumn,
  XlTableColumnResizePayload,
  XlTableRowClickPayload,
  XlTableProps
} from './src/types'

export function install(app: App) {
  app.component(XTable.name!, XTable)
}
