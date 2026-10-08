import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import DatePickerPanel from './src/DatePickerPanel.vue'

export const XDatePickerPanel = DatePickerPanel as ComponentWithInstall<typeof DatePickerPanel>

export type { DatePickerFestivalItem, DatePickerFestivalType, DatePickerPanelProps } from './src/types'

XDatePickerPanel.install = (app: App) => {
  app.component(XDatePickerPanel.name!, XDatePickerPanel)
}

export default XDatePickerPanel
