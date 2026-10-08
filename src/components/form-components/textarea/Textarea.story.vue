<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XTextarea } from './index'
import type { TextareaStatus, TextareaTextAlign } from './src/types'
import '../../../styles/index.css'
const sample = reactive({
  modelValue: '这是一段用于验证 XTextarea 多行输入的内容。打开自动高度时，组件会跟随输入内容增长；设置最大行数后，超出的内容会在文本域内部显示竖向滚动条。',
  placeholder: '请输入备注',
  id: 'x-textarea-story',
  name: 'remark',
  status: 'default' as TextareaStatus,
  rows: 3,
  maxRows: 5,
  maxlength: 300,
  parentWidth: 520,
  parentHeight: 220,
  fullParentWidth: false,
  fullParentHeight: false,
  width: '100%',
  height: '',
  fontFamily: 'Arial, sans-serif',
  fontSize: 14,
  textAlign: 'left' as TextareaTextAlign,
  padding: '8px 10px',
  radius: '6px',
  borderWidth: '1px',
  borderColor: '#dcdfe6',
  backgroundColor: '#ffffff',
  inputBackgroundColor: '#ffffff',
  textColor: '#121826',
  accentColor: '#1264f4',
  activeBorderColor: '#1264f4',
  disabledBackgroundColor: '#f1f5f9',
  disabledTextColor: '#94a3b8',
  clearIconColor: '#a8abb2',
  clearIconSize: 18,
  autoHeight: true,
  allowWrap: true,
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  showActiveBorder: true,
  eventLog: '暂无事件'
})
const logEvent = (name: string, value?: string | FocusEvent | KeyboardEvent) => {
  if (typeof value === 'string') {
    sample.eventLog = `${name}: ${value || '空'}`
    return
  }
  sample.eventLog = name
}
</script>

<template>
  <Story title="Form 组件/Textarea 多行输入框" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XTextarea">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XTextarea
              v-model="sample.modelValue"
              :placeholder="sample.placeholder"
              :id="sample.id"
              :name="sample.name"

              :rows="sample.rows"
              :max-rows="sample.maxRows"
              :maxlength="sample.maxlength"

              :allow-wrap="sample.allowWrap"

              @input="logEvent('input', $event)"
              @change="logEvent('change', $event)"
              @focus="logEvent('focus')"
              @blur="logEvent('blur')"
              @clear="logEvent('clear')"
             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.textarea-story {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.textarea-story__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  min-height: 260px;
  padding: 28px;
}

.textarea-story__sandbox {
  align-items: center;
  background: #eef6ff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  overflow: auto;
  padding: 10px;
}

.textarea-story__controls {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(4, 180px);
  padding: 16px;
}

.textarea-story__group {
  align-content: start;
  display: grid;
  gap: 10px;
  min-width: 0;
}

.textarea-story__group h3 {
  color: #334155;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 2px;
}

.textarea-story__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 6px;
  justify-content: space-between;
  min-width: 0;
}

.textarea-story__controls span {
  flex: 0 1 92px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.textarea-story__controls input,
.textarea-story__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  flex: 0 0 72px;
  min-height: 32px;
  min-width: 0;
  padding: 0 6px;
  width: 72px;
}

.textarea-story__controls input[type='checkbox'] {
  min-height: auto;
  width: auto;
}

.textarea-story__color-field input[type='color'] {
  cursor: pointer;
  flex: 0 0 48px;
  height: 32px;
  min-height: 32px;
  padding: 2px;
  width: 48px;
}

.textarea-story__check {
  justify-content: flex-start;
}

@media (max-width: 1100px) {
  .textarea-story__controls {
    grid-template-columns: repeat(2, 180px);
  }
}

@media (max-width: 640px) {
  .textarea-story__controls {
    grid-template-columns: 1fr;
  }
}
</style>
