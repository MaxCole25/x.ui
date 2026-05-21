import type { TableAlign } from '../../../display-components/table'

export type DataTableSettingsDisplayType = '' | 'text' | 'tag' | 'boolean' | 'date' | 'number' | string
export type DataTableSettingsEditorType = '' | 'input' | 'autocomplete' | 'select' | 'radio' | 'boolean' | 'date' | 'datetime' | string
export type DataTableSettingsKeyType = '' | 'primary' | 'normal'

export interface DataTableSettingsOption<Value extends string = string> {
  label: string
  value: Value
}

export interface DataTableSettingsTable {
  tableKey: string
  label: string
  physicalTableName?: string
  modelName?: string
  modelFullName?: string
  group?: string
  businessKeys?: Array<{
    key: string
    label: string
  }>
}

export interface DataTableSettingsColumnMeta {
  key: string
  label?: string
  type?: DataTableSettingsDisplayType | null
  displayType?: DataTableSettingsDisplayType | null
  editType?: DataTableSettingsEditorType | null
  dataSourceKey?: string | null
  isKey?: boolean
  keyType?: DataTableSettingsKeyType | string | null
  isHidden?: boolean
  isSortable?: boolean
  sortable?: boolean
  align?: TableAlign | string | null
  defaultFormatter?: string | null
  sortOrder?: number
}

export interface DataTableSettingsRow {
  columnKey: string
  columnLabel: string
  displayType: DataTableSettingsDisplayType
  editType: DataTableSettingsEditorType
  dataSourceKey: string
  isKey: boolean
  keyType: DataTableSettingsKeyType
  isHidden: boolean
  isSortable: boolean
  align: TableAlign
  defaultFormatter: string
  sortOrder: number | string
}

export interface DataTableSettingsDataSourceOption {
  key: string
  label: string
  name?: string
  sourceTableName?: string | null
  sourceColumnName?: string | null
  valueCount?: number
}

export interface DataTableSettingsAdapter {
  loadTables: () => Promise<DataTableSettingsTable[]> | DataTableSettingsTable[]
  loadColumns: (table: DataTableSettingsTable) => Promise<DataTableSettingsColumnMeta[]> | DataTableSettingsColumnMeta[]
  loadSettings: (table: DataTableSettingsTable) => Promise<DataTableSettingsRow[]> | DataTableSettingsRow[]
  saveSettings: (table: DataTableSettingsTable, rows: DataTableSettingsRow[]) => Promise<unknown> | unknown
  loadDataSources?: () => Promise<DataTableSettingsDataSourceOption[]> | DataTableSettingsDataSourceOption[]
}

export interface DataTableSettingsLoadedPayload {
  table: DataTableSettingsTable | null
  rows: DataTableSettingsRow[]
}

export interface DataTableSettingsErrorPayload {
  stage: 'tables' | 'settings' | 'dataSources' | 'save'
  error: unknown
}

export interface DataTableSettingsSavePayload {
  table: DataTableSettingsTable
  rows: DataTableSettingsRow[]
  result: unknown
}

export interface DataTableSettingsProps {
  adapter: DataTableSettingsAdapter
  initialTableKey?: string
  height?: number | string
  emptyText?: string
  saveButtonText?: string
  showTableMeta?: boolean
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  metaTextColor?: string
  headerBackgroundColor?: string
  headerTextColor?: string
  bodyBackgroundColor?: string
  bodyStripeBackgroundColor?: string
  bodyTextColor?: string
  controlBackgroundColor?: string
  controlTextColor?: string
  controlBorderColor?: string
  dropdownBackgroundColor?: string
  saveButtonBackgroundColor?: string
  saveButtonTextColor?: string
  saveButtonBorderColor?: string
  saveButtonActiveBackgroundColor?: string
  saveButtonActiveBorderColor?: string
  saveButtonActiveTextColor?: string
  displayTypeOptions?: Array<DataTableSettingsOption<DataTableSettingsDisplayType>>
  editorTypeOptions?: Array<DataTableSettingsOption<DataTableSettingsEditorType>>
  alignOptions?: Array<DataTableSettingsOption<TableAlign>>
  keyTypeOptions?: Array<DataTableSettingsOption<DataTableSettingsKeyType>>
}
