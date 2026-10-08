<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import '../../../styles/index.css'
import { reactive } from 'vue'
import XInput from './src/Input.vue'
import type { InputStatus, InputTextAlign, InputType } from './src/types'
const state = reactive({
  value: 'XInput 尺寸预设',
  placeholder: '请输入内容',
  type: 'text' as InputType,
  status: 'default' as InputStatus,
  prefix: '前缀',
  suffix: '后缀',
  accentColor: '#1264f4',
  activeBorderColor: '#1264f4',
  textColor: '#12323a',
  clearIconColor: '#64748b',
  clearIconSize: 14,
  disabledBackgroundColor: '#f1f5f9',
  disabledTextColor: '#94a3b8',
  fontFamily: '',
  fontSize: 14,
  height: 32,
  autoHeight: false,
  clearable: true,
  hideClearButton: false,
  padding: '0 8px',
  radius: '6px',
  textAlign: 'left' as InputTextAlign,
  inputBackgroundColor: '#ffffff',
  name: 'appearance-input',
  id: 'appearance-input',
  maxlength: 40,
  disabled: false,
  readonly: false
})
</script>

<template>
  <Story title="Form 组件/Input 输入框" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XInput">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XInput

            v-model="state.value"
            :type="state.type"
            :placeholder="state.placeholder"

            :prefix="state.prefix"
            :suffix="state.suffix"

            :name="state.name"
            :id="state.id"
            :maxlength="state.maxlength"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.input-size-story {
  display: grid;
  gap: 18px;
  max-width: 420px;
  padding: 24px;
}

.input-size-story__controls {
  display: grid;
  gap: 12px;
}

.input-size-story__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
  justify-content: space-between;
  min-width: 0;
}

.input-size-story__controls input,
.input-size-story__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 32px;
  min-width: 0;
  padding: 0 8px;
  width: 220px;
}

.input-size-story__controls input[type='checkbox'] {
  min-height: auto;
  width: auto;
}

.input-size-story__check {
  justify-content: flex-start;
}
</style>
