import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import DatePicker from './src/DatePicker.vue'

export const XDatePicker = DatePicker as ComponentWithInstall<typeof DatePicker>

export type { DatePickerProps } from './src/types'

XDatePicker.install = (app: App) => {
  app.component(XDatePicker.name!, XDatePicker)
}

export default XDatePicker
