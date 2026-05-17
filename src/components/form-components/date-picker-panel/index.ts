import type { App } from 'vue'
import DatePickerPanel from './src/DatePickerPanel.vue'

export const XDatePickerPanel = DatePickerPanel

export type { DatePickerFestivalItem, DatePickerFestivalType, DatePickerPanelProps } from './src/types'

XDatePickerPanel.install = (app: App) => {
  app.component(XDatePickerPanel.name!, XDatePickerPanel)
}

export default XDatePickerPanel
