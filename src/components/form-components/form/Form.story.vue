<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import XForm from './src/Form.vue'
import XFormItem from './src/FormItem.vue'
import XInput from '../input/src/Input.vue'
import XSelect from '../select/src/Select.vue'
import type { FormProps } from './src/types'
import type { InputProps } from '../input/src/types'
import type { SelectProps } from '../select/src/types'
type SceneModel = { input: InputProps['modelValue']; select: SelectProps['modelValue'] }
import '../../../styles/index.css'
const initialProps = {
  model: { input: '外观接口预览', select: 'vue' },
  rules: { input: [{ required: true, message: '请输入姓名' }] },
  fontSize: 14,
  disabled: false
} satisfies FormProps
const selectOptions = [{ label: 'Vue', value: 'vue' }, { label: 'TypeScript', value: 'typescript' }]
</script>

<template>
  <Story title="Form 组件/Form 表单" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XForm" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XForm style="max-width: 520px" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">
            <template v-if="apiProps.model">
              <XFormItem label="姓名" prop="input">
                <XInput v-model="(apiProps.model as SceneModel).input" />
              </XFormItem>
              <XFormItem label="技术栈" prop="select">
                <XSelect v-model="(apiProps.model as SceneModel).select" :options="selectOptions" />
              </XFormItem>
            </template>
          </XForm>
        </template>
      </ApiPlayground>
      <p>调整 fontSize 和 disabled，检查输入框、选择器和标签继承，控件默认高度保持32px。清空姓名后调用 validate、validateField（参数[&quot;input&quot;]），再调用 clearValidate、resetFields、scrollToField，查看提示与日志；恢复默认会重建初始模型。</p>
    </Variant>
  </Story>
</template>
