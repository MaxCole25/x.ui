<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive } from 'vue'
import type { InputStatus, InputTextAlign } from '../input'
import { XTimePicker } from './index'
import '../../../styles/index.css'
const sample = reactive({
  modelValue: '09:30',
  placeholder: '请选择时间',
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  status: 'default' as InputStatus,
  prefix: '开始时间',
  suffix: '',
  activeBorderColor: '#1264f4',
  accentColor: '#1264f4',
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
  name: 'startTime',
  id: 'time-picker-start-time',
  maxlength: 5,
  borderWidth: 1,
  borderColor: '#cbd5e1',
  backgroundColor: '#ffffff',
  textColor: '#0f172a',
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
  <Story title="Form 组件/TimePicker 时间选择器" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XTimePicker">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XTimePicker v-bind="{ ...(componentSample), ...(apiProps) }" v-model="sample.modelValue"   v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style>
.story-stack {
  display: grid;
  gap: 12px;
  padding: 16px;
}

.time-picker-appearance {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  width: 100%;
}

.time-picker-appearance__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  min-height: 132px;
  padding: 24px;
}

.time-picker-appearance__preview-parent {
  background: #ecfdf5;
  box-sizing: border-box;
  display: grid;
  padding: 10px;
  place-items: center;
}

.time-picker-appearance__preview-parent.is-dark {
  background: #020617;
}

.time-picker-appearance__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 180px);
  justify-content: start;
  overflow-x: auto;
  padding: 16px;
  width: 100%;
}

.time-picker-appearance__column {
  display: grid;
  gap: 10px;
  grid-auto-rows: max-content;
  min-width: 0;
  width: 180px;
}

.time-picker-appearance__column label {
  align-items: center;
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-template-columns: 84px 1fr;
  line-height: 1.4;
  min-width: 0;
  width: 180px;
}

.time-picker-appearance__column label > span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time-picker-appearance__column input,
.time-picker-appearance__column select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 0;
  padding: 0 8px;
  width: 100%;
}

.time-picker-appearance__column input[type='color'] {
  padding: 2px;
}

.time-picker-appearance__column input[type='checkbox'] {
  min-height: auto;
  padding: 0;
  width: auto;
}
</style>
