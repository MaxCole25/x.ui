<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XInputNumber } from './index'
import '../../../styles/index.css'
const inputNumberAppearance = reactive({ height: 32,
  min: 0,
  max: 100,
  step: 1,
  fullWidth: false,
  fullHeight: false,
  accentColor: '#1264f4',
  borderColor: '#cbd5e1',
  activeBorderColor: '#1264f4',
  radius: 8,
  fontFamily: 'Arial',
  fontSize: 16,
  decreaseButtonBackgroundColor: '#e2e8f0',
  increaseButtonBackgroundColor: '#1264f4'
})
const sample = reactive({
  input: '外观接口预览',
  autocomplete: '上海',
  cascader: [],
  checked: true,
  radio: 'A',
  select: 'vue',
  color: '#1264f4',
  date: '2026-05-12',
  dateTime: '2026-05-12T09:30',
  time: '09:30',
  number: 36
})
</script>

<template>
  <Story title="Form 组件/InputNumber 数字输入框" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XInputNumber">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XInputNumber v-bind="{ ...({ ...styleProps, ...inputNumberAppearance }), ...(apiProps) }" v-model="sample.number" :placeholder="sample.input"   v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 12px;
  padding: 16px;
}

.input-number-appearance-controls {
  display: grid;
  gap: 16px;
  grid-column: 1 / -1;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
}

.input-number-parent-box {
  align-items: center;
  background: #e8f7ec;
  box-sizing: border-box;
  display: flex;
  padding: 10px;
}

.input-number-appearance-controls__column {
  align-content: start;
  display: grid;
  gap: 12px;
}

.input-number-appearance-controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
  justify-content: space-between;
}

.input-number-appearance-controls input,
.input-number-appearance-controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-height: 32px;
  min-width: 0;
  padding: 0 8px;
}

.input-number-appearance-controls input[type='color'] {
  padding: 2px;
  width: 48px;
}

.input-number-appearance-controls__check {
  justify-content: flex-start;
}

@media (max-width: 640px) {
  .input-number-appearance-controls {
    grid-template-columns: 1fr;
  }
}
</style>
