import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Select from './src/Select.vue'
import Option from './src/Option.vue'

export const XSelect = Select as ComponentWithInstall<typeof Select>
export const XOption = Option as ComponentWithInstall<typeof Option>

export type {
  OptionProps,
  SelectDisplayField,
  SelectOption,
  SelectOptionValue,
  SelectProps,
  SelectFontSize,
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
