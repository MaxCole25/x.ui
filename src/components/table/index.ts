import type { App } from 'vue'
import XTable from './src/Table.vue'

export { XTable }
export { XTable as XlTable }
export default XTable
export type {
  TableAlign,
  TableCellChange,
  TableColumn,
  TableColumnDisplayType,
  TableColumnEditorType,
  TableColumnOption,
  TableColumnOrderChangePayload,
  TableColumnSetting,
  TableQueryChangePayload,
  TableColumnType,
  TableDirtySubmitPayload,
  TableExpose,
  TableFixed,
  TableProps,
  TableRowKey,
  TableRowDblclickPayload,
  TableRowOrderChangePayload,
  TableSelectionMode,
  TableSize,
  TableStoredState,
  TableTagType,
  XlTableColumn,
  XlTableColumnOption,
  XlTableProps
} from './src/types'

export function install(app: App) {
  app.component(XTable.name!, XTable)
}
