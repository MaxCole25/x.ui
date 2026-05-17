<script setup lang="ts">
import { computed, reactive } from 'vue'
import { XDatePicker } from './index'
import type { InputSize, InputStatus, InputTextAlign } from '../input'
import '../../../styles/index.css'

const sample = reactive({
  modelValue: '2026-05-12',
  placeholder: '请选择日期',
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  size: 'md' as InputSize,
  status: 'default' as InputStatus,
  prefix: '日期',
  suffix: '',
  activeBorderColor: '#1264f4',
  clearIconColor: '#64748b',
  clearIconSize: 16,
  disabledBackgroundColor: '#f5f7fa',
  disabledTextColor: '#94a3b8',
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: 12,
  height: 30,
  autoHeight: false,
  padding: '0 8px',
  radius: '6px',
  textAlign: 'center' as InputTextAlign,
  background: '#ffffff',
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

const darkDatePickerTheme = {
  modelValue: '2026-05-12',
  placeholder: '暗色弹层',
  prefix: '夜间',
  clearable: true,
  backgroundColor: '#111827',
  textColor: '#e5e7eb',
  borderColor: '#374151',
  activeBorderColor: '#60a5fa',
  panelBackgroundColor: '#0f172a',
  panelTextColor: '#e5e7eb',
  panelMutedTextColor: '#94a3b8',
  panelBorderColor: '#334155',
  panelHeaderTextColor: '#f8fafc',
  panelCloseIconColor: '#94a3b8',
  panelCloseIconHoverColor: '#ffffff',
  panelToolBackgroundColor: '#111827',
  panelToolTextColor: '#cbd5e1',
  panelToolBorderColor: '#334155',
  panelToolHoverBackgroundColor: '#1d4ed8',
  panelToolHoverTextColor: '#ffffff',
  panelToolHoverBorderColor: '#60a5fa',
  panelCurrentTextColor: '#f8fafc',
  panelWeekTextColor: '#93c5fd',
  panelDayTextColor: '#e2e8f0',
  panelDayHoverBackgroundColor: '#1e40af',
  panelDayHoverTextColor: '#ffffff',
  panelDayActiveBackgroundColor: '#2563eb',
  panelDayActiveTextColor: '#ffffff',
  festivalBackgroundColor: '#431407',
  festivalTextColor: '#fed7aa',
  festivalBadgeBackgroundColor: '#fb923c',
  festivalBadgeTextColor: '#111827',
  solarTermBackgroundColor: '#052e2b',
  solarTermTextColor: '#99f6e4',
  solarTermBadgeBackgroundColor: '#2dd4bf',
  solarTermBadgeTextColor: '#042f2e',
  customFestivalBackgroundColor: '#172554',
  customFestivalTextColor: '#bfdbfe',
  customFestivalBadgeBackgroundColor: '#60a5fa',
  customFestivalBadgeTextColor: '#0f172a',
  panelDayMarkedHoverBackgroundColor: '#1d4ed8',
  panelDayMarkedHoverTextColor: '#ffffff',
  panelDayMarkedActiveBackgroundColor: '#3b82f6',
  panelDayMarkedActiveTextColor: '#ffffff',
  panelDayMarkedBadgeHoverBackgroundColor: '#e0f2fe',
  panelDayMarkedBadgeHoverTextColor: '#1d4ed8',
  panelPrimaryButtonBackgroundColor: '#2563eb',
  panelPrimaryButtonTextColor: '#ffffff',
  panelPrimaryButtonHoverBackgroundColor: '#1d4ed8',
  festivals: {
    '2026-05-14': { name: '评审', type: 'custom' as const }
  }
}

const sizeOptions: InputSize[] = ['sm', 'md', 'lg']
const statusOptions: InputStatus[] = ['default', 'success', 'warning', 'error']
const alignOptions: InputTextAlign[] = ['left', 'center', 'right']

const componentSample = computed(() => {
  const props = { ...sample } as Record<string, unknown>
  delete props.parentWidth
  delete props.parentHeight
  delete props.parentFullWidth
  delete props.parentFullHeight

  return props
})

const updateRadius = (event: Event) => {
  sample.radius = `${(event.target as HTMLInputElement).value}px`
}
</script>

<template>
  <Story title="Form 组件/DatePicker 日期选择器" group="components">
    

    

    <Variant title="外观接口">
      <div class="date-picker-appearance">
        <div class="date-picker-appearance__preview">
          <div
            class="date-picker-appearance__preview-parent"
            :style="{
              width: sample.parentFullWidth ? '100%' : `${sample.parentWidth}px`,
              height: sample.parentFullHeight ? '100%' : `${sample.parentHeight}px`
            }"
          >
            <XDatePicker v-bind="componentSample" v-model="sample.modelValue" />
          </div>
          <div class="date-picker-appearance__preview-parent is-dark">
            <XDatePicker v-bind="darkDatePickerTheme" />
          </div>
        </div>

        <div class="date-picker-appearance__controls">
          <div class="date-picker-appearance__column">
            <label>
              <span>绑定值</span>
              <input v-model="sample.modelValue" />
            </label>
            <label>
              <span>占位文本</span>
              <input v-model="sample.placeholder" />
            </label>
            <label>
              <span>前缀</span>
              <input v-model="sample.prefix" />
            </label>
            <label>
              <span>后缀</span>
              <input v-model="sample.suffix" />
            </label>
            <label>
              <span>ID</span>
              <input v-model="sample.id" />
            </label>
            <label>
              <span>name</span>
              <input v-model="sample.name" />
            </label>
            <label>
              <span>内边距</span>
              <input v-model="sample.padding" />
            </label>
            <label>
              <span>字体</span>
              <select v-model="sample.fontFamily">
                <option value="Inter, Arial, sans-serif">Inter</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Microsoft YaHei', sans-serif">微软雅黑</option>
              </select>
            </label>
            <label>
              <span>对齐</span>
              <select v-model="sample.textAlign">
                <option v-for="align in alignOptions" :key="align" :value="align">{{ align }}</option>
              </select>
            </label>
            <label>
              <span>尺寸</span>
              <select v-model="sample.size">
                <option v-for="size in sizeOptions" :key="size" :value="size">{{ size }}</option>
              </select>
            </label>
            <label>
              <span>状态</span>
              <select v-model="sample.status">
                <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
              </select>
            </label>
          </div>

          <div class="date-picker-appearance__column">
            <label>
              <span>最大长度</span>
              <input v-model.number="sample.maxlength" type="number" min="1" />
            </label>
            <label>
              <span>父元素宽度</span>
              <input v-model.number="sample.parentWidth" type="number" min="0" />
            </label>
            <label>
              <span>父元素高度</span>
              <input v-model.number="sample.parentHeight" type="number" min="0" />
            </label>
            <label>
              <span>高度</span>
              <input v-model.number="sample.height" type="number" min="20" />
            </label>
            <label>
              <span>字号</span>
              <input v-model.number="sample.fontSize" type="number" min="10" />
            </label>
            <label>
              <span>圆角</span>
              <input :value="Number.parseFloat(String(sample.radius))" type="number" min="0" @input="updateRadius" />
            </label>
            <label>
              <span>清除尺寸</span>
              <input v-model.number="sample.clearIconSize" type="number" min="10" />
            </label>
            <label>
              <span>边框粗细</span>
              <input v-model.number="sample.borderWidth" type="number" min="0" max="12" />
            </label>
          </div>

          <div class="date-picker-appearance__column">
            <label>
              <span>激活边框色</span>
              <input v-model="sample.activeBorderColor" type="color" />
            </label>
            <label>
              <span>边框色</span>
              <input v-model="sample.borderColor" type="color" />
            </label>
            <label>
              <span>背景色</span>
              <input v-model="sample.backgroundColor" type="color" />
            </label>
            <label>
              <span>输入背景色</span>
              <input v-model="sample.background" type="color" />
            </label>
            <label>
              <span>文字色</span>
              <input v-model="sample.textColor" type="color" />
            </label>
            <label>
              <span>清除色</span>
              <input v-model="sample.clearIconColor" type="color" />
            </label>
            <label>
              <span>禁用背景色</span>
              <input v-model="sample.disabledBackgroundColor" type="color" />
            </label>
            <label>
              <span>禁用文字色</span>
              <input v-model="sample.disabledTextColor" type="color" />
            </label>
          </div>

          <div class="date-picker-appearance__column">
            <label>
              <input v-model="sample.parentFullWidth" type="checkbox" />
              <span>父元素撑满宽度</span>
            </label>
            <label>
              <input v-model="sample.parentFullHeight" type="checkbox" />
              <span>父元素撑满高度</span>
            </label>
            <label>
              <input v-model="sample.autoHeight" type="checkbox" />
              <span>自动高度</span>
            </label>
            <label>
              <input v-model="sample.showActiveBorder" type="checkbox" />
              <span>显示激活边框</span>
            </label>
            <label>
              <input v-model="sample.showChinaFestivals" type="checkbox" />
              <span>中国传统日期</span>
            </label>
            <label>
              <input v-model="sample.disabled" type="checkbox" />
              <span>禁用</span>
            </label>
            <label>
              <input v-model="sample.readonly" type="checkbox" />
              <span>只读</span>
            </label>
            <label>
              <input v-model="sample.clearable" type="checkbox" />
              <span>可清空</span>
            </label>
            <label>
              <input v-model="sample.hideClearButton" type="checkbox" />
              <span>隐藏清除按钮</span>
            </label>
          </div>
        </div>
      </div>
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
