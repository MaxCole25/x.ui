<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive, ref } from 'vue'
import '../../../styles/index.css'
import XRadioButton from './src/RadioButton.vue'
import type { ButtonVariant } from '../../basic-components/button/src/types'
import type { ButtonGroupDirection } from '../../basic-components/button-group/src/types'
const appearanceValue = ref('washington')
const lastEvent = ref('change: washington')
const appearance = reactive({
  label: 'New York',
  value: 'new-york',
  name: 'appearance-radio-button',
  variant: 'outline' as ButtonVariant,
  direction: 'horizontal' as ButtonGroupDirection,
  width: '',
  height: '',
  radius: 6,
  buttonColor: '#409eff',
  activeBackgroundColor: '#409eff',
  activeBorderColor: '#409eff',
  activeTextColor: '#ffffff',
  buttonSize: 30,
  fontSize: 14,
  fontFamily: '',
  disabled: false
})
const handleChange = (value: string | number | boolean) => {
  lastEvent.value = `change: ${String(value)}`
}
</script>

<template>
  <Story title="Form 组件/RadioButton 单选按钮" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XRadioButton">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XRadioButton
              v-model="appearanceValue"
              :name="appearance.name"
              :value="appearance.value"

              @change="handleChange"
             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
              {{ appearance.label }}
            </XRadioButton>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
