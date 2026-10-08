import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'

export const XForm = Form as ComponentWithInstall<typeof Form>
export const XFormItem = FormItem as ComponentWithInstall<typeof FormItem>

export type {
  FormControlFontSize,
  FormExpose,
  FormItemAlign,
  FormItemClass,
  FormItemContentJustify,
  FormItemHorizontalAlign,
  FormItemProps,
  FormItemRule,
  FormItemStyle,
  FormLabelPosition,
  FormProps,
  FormPublicFontSize,
  FormRules,
  FormFontSize,
  FormValidateCallback,
  FormValidateFieldMethod,
  FormValidateMethod,
  FormValidateResult
} from './src/types'

XForm.install = (app: App) => {
  app.component(XForm.name!, XForm)
  app.component(XFormItem.name!, XFormItem)
}

XFormItem.install = (app: App) => {
  app.component(XFormItem.name!, XFormItem)
}

export default XForm
