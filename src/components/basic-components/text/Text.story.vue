<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XText } from './index'
import type { TextAlign, TextType, TextVerticalAlign } from './src/types'
import '../../../styles/index.css'
const sample = reactive({
  modelValue: '12.5',
  variant: 'default' as TextType,
  disabled: false,
  borderWidth: '3px',
  borderColor: '#ff0000',
  radius: '8px',
  backgroundColor: '#f0fdf4',
  textColor: '#000000',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '1.55',
  previewWidth: 420,
  previewHeight: 92,
  width: '100%',
  height: 40,
  autoHeight: false,
  padding: '5px 10px',
  textAlign: 'left' as TextAlign,
  verticalAlign: 'middle' as TextVerticalAlign,
  name: 'businessName',
  id: 'x-text-story',
  maxlength: 40
})
</script>

<template>
  <Story title="基础组件/Text 文本" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XText">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XText
              v-model="sample.modelValue"
              tag="span"

              :name="sample.name"
              :id="sample.id"
              :maxlength="sample.maxlength"
             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 10px;
  padding: 16px;
}

.story-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}

.text-story {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.text-story__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  min-height: 140px;
  padding: 28px;
}

.text-story__sandbox {
  align-items: center;
  background: #dcfce7;
  box-sizing: border-box;
  display: flex;
  overflow: auto;
  padding: 10px;
}

.text-story__controls {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(4, 180px);
  padding: 16px;
}

.text-story__group {
  display: grid;
  align-content: start;
  gap: 10px;
  min-width: 0;
}

.text-story__group h3 {
  color: #334155;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 2px;
}

.text-story__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 6px;
  justify-content: space-between;
  min-width: 0;
}

.text-story__controls span {
  flex: 0 1 92px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-story__controls input,
.text-story__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  flex: 0 0 72px;
  min-height: 32px;
  min-width: 0;
  padding: 0 6px;
  width: 72px;
}

.text-story__controls input[type='checkbox'] {
  min-height: auto;
  width: auto;
}

.text-story__controls input[type='color'] {
  flex-basis: 48px;
  padding: 2px;
  width: 48px;
}

.text-story__color-field input[type='color'] {
  cursor: pointer;
  flex: 0 0 48px;
  height: 32px;
  min-height: 32px;
  padding: 2px;
  width: 48px;
}

.text-story__check {
  justify-content: flex-start;
}

@media (max-width: 1100px) {
  .text-story__controls {
    grid-template-columns: repeat(2, 180px);
  }
}

@media (max-width: 640px) {
  .text-story__controls {
    grid-template-columns: 1fr;
  }
}
</style>
