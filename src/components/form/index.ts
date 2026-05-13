import type { App } from 'vue'
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'

export const XForm = Form
export const XFormItem = FormItem

export type { FormItemProps, FormProps, FormSize } from './src/types'

XForm.install = (app: App) => {
  app.component(XForm.name!, XForm)
  app.component(XFormItem.name!, XFormItem)
}

XFormItem.install = (app: App) => {
  app.component(XFormItem.name!, XFormItem)
}

export default XForm
