import type { App } from 'vue'
import Select from './src/Select.vue'
import Option from './src/Option.vue'

export const XSelect = Select
export const XOption = Option

export type {
  OptionProps,
  SelectDisplayField,
  SelectOption,
  SelectOptionValue,
  SelectProps,
  SelectSize,
  SelectStatus,
  SelectTextAlign
} from './src/types'

XSelect.install = (app: App) => {
  app.component(XSelect.name!, XSelect)
  app.component(XOption.name!, XOption)
}

XOption.install = (app: App) => {
  app.component(XOption.name!, XOption)
}

export default XSelect
