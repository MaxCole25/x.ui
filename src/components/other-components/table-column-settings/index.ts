import type { App } from 'vue'
import XTableColumnSettings from './src/TableColumnSettings.vue'

export { XTableColumnSettings }
export default XTableColumnSettings
export type { TableColumnSettingsExpose, TableColumnSettingsProps } from './src/types'

export function install(app: App) {
  app.component(XTableColumnSettings.name!, XTableColumnSettings)
}

