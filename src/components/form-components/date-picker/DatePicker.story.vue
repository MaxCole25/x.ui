<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive } from 'vue'
import { XDatePicker } from './index'
import type { InputStatus, InputTextAlign } from '../input'
import '../../../styles/index.css'
const sample = reactive({
  modelValue: '2026-05-12',
  placeholder: '请选择日期',
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  status: 'default' as InputStatus,
  prefix: '日期',
  suffix: '',
  activeBorderColor: '#1264f4',
  clearIconColor: '#64748b',
  clearIconSize: 16,
  disabledBackgroundColor: '#f5f7fa',
  disabledTextColor: '#94a3b8',
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: 14,
  height: 32,
  autoHeight: false,
  padding: '0 8px',
  radius: '6px',
  textAlign: 'center' as InputTextAlign,
  inputBackgroundColor: '#ffffff',
  name: 'deliveryDate',
  id: 'date-picker-delivery-date',
  maxlength: 20,
  borderWidth: 1,
  borderColor: '#cbd5e1',
  backgroundColor: '#ffffff',
  textColor: '#0f172a',
  showChinaFestivals: true,
  showActiveBorder: true,
  parentWidth: 300,
  parentHeight: 96,
  parentFullWidth: false,
  parentFullHeight: false
})
const componentSample = computed(() => {
  const props = { ...sample } as Record<string, unknown>
  delete props.parentWidth
  delete props.parentHeight
  delete props.parentFullWidth
  delete props.parentFullHeight

  return props
})
</script>

<template>
  <Story title="Form 组件/DatePicker 日期选择器" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XDatePicker">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XDatePicker v-bind="{ ...(componentSample), ...(apiProps) }" v-model="sample.modelValue"   v-on="apiEvents" @vue:mounted="captureInstance" />
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

.date-picker-appearance {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.date-picker-appearance__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  min-height: 132px;
  padding: 24px;
}

.date-picker-appearance__preview-parent {
  background: #ecfdf5;
  box-sizing: border-box;
  display: grid;
  padding: 10px;
  place-items: center;
}

.date-picker-appearance__preview-parent.is-dark {
  background: #020617;
}

.date-picker-appearance__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 180px);
  overflow-x: auto;
  padding: 16px;
}

.date-picker-appearance__column {
  display: grid;
  gap: 10px;
  width: 180px;
}

.date-picker-appearance__column label {
  align-items: center;
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-template-columns: 84px 1fr;
  min-width: 0;
}

.date-picker-appearance__column input,
.date-picker-appearance__column select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 0;
  padding: 0 8px;
  width: 100%;
}

.date-picker-appearance__column input[type='checkbox'] {
  min-height: auto;
  padding: 0;
  width: auto;
}
</style>
