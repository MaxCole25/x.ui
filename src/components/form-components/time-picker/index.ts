import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import TimePicker from './src/TimePicker.vue'

export const XTimePicker = TimePicker as ComponentWithInstall<typeof TimePicker>

export type { TimePickerProps } from './src/types'

XTimePicker.install = (app: App) => {
  app.component(XTimePicker.name!, XTimePicker)
}

export default XTimePicker
