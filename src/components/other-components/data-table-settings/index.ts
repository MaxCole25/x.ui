import type { App } from 'vue'
import DataTableSettings from './src/DataTableSettings.vue'

export const XDataTableSettings = DataTableSettings

export type {
  DataTableSettingsAdapter,
  DataTableSettingsColumnMeta,
  DataTableSettingsDataSourceOption,
  DataTableSettingsDisplayType,
  DataTableSettingsEditorType,
  DataTableSettingsErrorPayload,
  DataTableSettingsKeyType,
  DataTableSettingsLoadedPayload,
  DataTableSettingsOption,
  DataTableSettingsProps,
  DataTableSettingsRow,
  DataTableSettingsSavePayload,
  DataTableSettingsTable
} from './src/types'

XDataTableSettings.install = (app: App) => {
  app.component(XDataTableSettings.name!, XDataTableSettings)
}

export default XDataTableSettings
