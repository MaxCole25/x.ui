import type { TableColumn, TableColumnSetting } from '../../../display-components/table'

export interface TableColumnSettingsProps<Row extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn<Row>[]
  modelValue?: TableColumnSetting[]
  title?: string
  width?: number
  height?: number
  disabled?: boolean
}

export interface TableColumnSettingsExpose {
  open: () => void
  close: () => void
  reset: () => void
  getSettings: () => TableColumnSetting[]
}

