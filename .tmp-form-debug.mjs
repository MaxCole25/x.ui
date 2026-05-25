import { mount } from '@vue/test-utils'
import { XForm, XFormItem, XInput } from './src/index.ts'
const wrapper = mount({
  components: { XForm, XFormItem, XInput },
  template: `<XForm size="lg" disabled><XFormItem label="名称"><XInput /></XFormItem></XForm>`
})
console.log(wrapper.html())
