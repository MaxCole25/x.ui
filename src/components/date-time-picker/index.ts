import type { App } from 'vue'
import DateTimePicker from './src/DateTimePicker.vue'

export const XDateTimePicker = DateTimePicker

export type { DateTimePickerProps } from './src/types'

XDateTimePicker.install = (app: App) => {
  app.component(XDateTimePicker.name!, XDateTimePicker)
}

export default XDateTimePicker
