import type { App } from 'vue'
import XTreeTable from './src/TreeTable.vue'

export { XTreeTable }
export default XTreeTable
export type {
  TreeTableAlign,
  TreeTableColumn,
  TreeTableExpandChangePayload,
  TreeTableExpose,
  TreeTableProps,
  TreeTableRowClickPayload,
  TreeTableRowData,
  TreeTableRowInfo,
  TreeTableRowKey,
  TreeTableSelectionChangePayload,
  TreeTableSlots
} from './src/types'

export function install(app: App) {
  app.component(XTreeTable.name!, XTreeTable)
}

