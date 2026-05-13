import type { App } from 'vue'
import XTable from './src/Table.vue'

export { XTable }
export { XTable as XlTable }
export default XTable
export type {
  TableAlign,
  TableCellChangePayload,
  TableColumn,
  TableColumnSetting,
  TableReorderPosition,
  TableRowKey,
  TableRowReorderPayload,
  TableSelectionMode,
  TableProps,
  XlTableColumn,
  XlTableProps
} from './src/types'

export function install(app: App) {
  app.component(XTable.name!, XTable)
}
