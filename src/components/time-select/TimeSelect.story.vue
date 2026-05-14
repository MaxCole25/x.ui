<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { InputSize, InputStatus, InputTextAlign } from '../input'
import { XTimeSelect } from './index'
import '../../styles/index.css'

const time = ref('09:30')
const emptyTime = ref('')

const sample = reactive({
  modelValue: '09:30',
  start: '09:00',
  end: '18:00',
  stepMinutes: 30,
  placeholder: '请选择时间',
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  size: 'md' as InputSize,
  status: 'default' as InputStatus,
  prefix: '预约时间',
  suffix: '',
  activeBorderColor: '#1264f4',
  color: '#0f172a',
  clearIconColor: '#64748b',
  clearIconSize: 16,
  disabledBackgroundColor: '#f5f7fa',
  disabledTextColor: '#94a3b8',
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: 14,
  height: 36,
  autoHeight: false,
  padding: '0 12px',
  radius: '8px',
  textAlign: 'center' as InputTextAlign,
  background: '#ffffff',
  name: 'bookingTime',
  id: 'time-select-booking-time',
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
  <Story title="元素/TimeSelect 时间选择" group="components">
    <Variant title="基础用法">
      <div class="story-stack">
        <XTimeSelect v-model="time" start="09:00" end="18:00" :step-minutes="30" />
        <span>当前时间：{{ time }}</span>
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div class="story-stack">
        <XTimeSelect v-model="emptyTime" start="09:00" end="10:00" :step-minutes="15" placeholder="请选择短时段" clearable />
        <XTimeSelect model-value="09:30" start="09:00" end="10:00" disabled />
        <XTimeSelect model-value="10:00" start="09:00" end="12:00" readonly prefix="只读" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <div class="time-select-appearance">
        <div class="time-select-appearance__preview">
          <div
            class="time-select-appearance__preview-parent"
            :style="{
              width: sample.parentFullWidth ? '100%' : `${sample.parentWidth}px`,
              height: sample.parentFullHeight ? '100%' : `${sample.parentHeight}px`
            }"
          >
            <XTimeSelect v-bind="componentSample" v-model="sample.modelValue" />
          </div>
        </div>

        <div class="time-select-appearance__controls">
          <div class="time-select-appearance__column">
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
              <span>开始时间</span>
              <input v-model="sample.start" />
            </label>
            <label>
              <span>结束时间</span>
              <input v-model="sample.end" />
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

          <div class="time-select-appearance__column">
            <label>
              <span>步进分钟</span>
              <input v-model.number="sample.stepMinutes" type="number" min="1" />
            </label>
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

          <div class="time-select-appearance__column">
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
              <span>输入文字色</span>
              <input v-model="sample.color" type="color" />
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

          <div class="time-select-appearance__column">
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

<style>
.story-stack {
  display: grid;
  gap: 12px;
  padding: 16px;
}

.time-select-appearance {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  width: 100%;
}

.time-select-appearance__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  min-height: 132px;
  padding: 24px;
}

.time-select-appearance__preview-parent {
  background: #ecfdf5;
  box-sizing: border-box;
  display: grid;
  padding: 10px;
  place-items: center;
}

.time-select-appearance__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 200px);
  justify-content: start;
  overflow-x: auto;
  padding: 16px;
  width: 100%;
}

.time-select-appearance__column {
  display: grid;
  gap: 10px;
  grid-auto-rows: max-content;
  min-width: 0;
  width: 200px;
}

.time-select-appearance__column label {
  align-items: center;
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-template-columns: 72px 1fr;
  line-height: 1.4;
  min-width: 0;
  width: 200px;
}

.time-select-appearance__column label > span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time-select-appearance__column input,
.time-select-appearance__column select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 0;
  padding: 0 8px;
  width: 100%;
}

.time-select-appearance__column input[type='color'] {
  padding: 2px;
}

.time-select-appearance__column input[type='checkbox'] {
  min-height: auto;
  padding: 0;
  width: auto;
}
</style>
