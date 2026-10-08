<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import '../../../styles/index.css'
import { reactive } from 'vue'
import XBaseInput from './src/BaseInput.vue'
import type { BaseInputTextAlign } from './src/types'
const state = reactive({
  modelValue: '外层 div 承载边框',
  amountValue: 9200,
  placeholder: '请输入内容',
  disabled: false,
  readonly: false,
  clearable: true,
  prefix: '',
  suffix: '',
  accentColor: '#1264f4',
  activeBorderColor: '#0000ff',
  borderWidth: '1px',
  borderColor: '#ff0000',
  clearIconColor: '#67c23a',
  clearIconSize: 18,
  disabledBackgroundColor: '#f5f7fa',
  disabledTextColor: '#a8abb2',
  radius: '8px',
  backgroundColor: '#f0fdf4',
  textColor: '#000000',
  fontFamily: 'Arial, sans-serif',
  fontSize: 14,
  width: 320,
  previewWidth: 420,
  previewHeight: 92,
  height: 40,
  autoHeight: false,
  hideClearButton: false,
  padding: '5px 10px',
  textAlign: 'left' as BaseInputTextAlign,
  showActiveBorder: true,
  name: 'businessName',
  id: 'x-base-input-story',
  maxlength: 40
})
</script>

<template>
  <Story title="基础组件/BaseInput 基础输入框" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XBaseInput">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XBaseInput
                v-model="state.modelValue"
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
.input-story {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.input-story__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  min-height: 140px;
  padding: 28px;
}

.input-story__sandbox {
  align-items: center;
  background: #dcfce7;
  box-sizing: border-box;
  display: flex;
  overflow: auto;
  padding: 10px;
}

.input-story__sandbox :deep(.x-base-input) {
  max-width: none;
}

.input-story__stack {
  display: grid;
  gap: 10px;
  justify-items: center;
  width: 100%;
}

.input-story__controls {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 180px);
  padding: 16px;
}

.input-story__group {
  display: grid;
  align-content: start;
  gap: 10px;
  min-width: 0;
}

.input-story__group h3 {
  color: #334155;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 2px;
}

.input-story__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 6px;
  justify-content: space-between;
  min-width: 0;
}

.input-story__controls span {
  flex: 0 1 92px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.input-story__controls input,
.input-story__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  flex: 0 0 72px;
  min-height: 32px;
  min-width: 0;
  padding: 0 6px;
  width: 72px;
}

.input-story__controls input[type='checkbox'] {
  min-height: auto;
  width: auto;
}

.input-story__controls input[type='color'] {
  padding: 2px;
}

.input-story__color-field input[type='color'] {
  cursor: pointer;
  flex: 0 0 48px;
  height: 32px;
  min-height: 32px;
  padding: 2px;
  width: 48px;
}

.input-story__check {
  justify-content: flex-start;
}

@media (max-width: 1100px) {
  .input-story__controls {
    grid-template-columns: repeat(2, 180px);
  }
}

@media (max-width: 640px) {
  .input-story__controls {
    grid-template-columns: 1fr;
  }
}
</style>
