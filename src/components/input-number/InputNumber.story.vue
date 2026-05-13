<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import { XInputNumber } from './index'
import '../../styles/index.css'

const value = ref(12)
const empty = ref()

const inputNumberAppearance = reactive({
  min: 0,
  max: 100,
  step: 1,
  fullWidth: false,
  fullHeight: false,
  color: '#1264f4',
  activeBorderColor: '#1264f4',
  borderRadius: 8,
  fontFamily: 'Arial',
  fontSize: 16,
  decreaseButtonBackgroundColor: '#e2e8f0',
  increaseButtonBackgroundColor: '#1264f4'
})

const parentBox = reactive({
  width: 260,
  height: 72
})

const fontOptions = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Courier New', value: 'Courier New' },
  { label: '系统字体', value: 'var(--x-font-family)' }
]

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

const selectOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' }
]

const autocompleteOptions = [
  { label: '上海', value: '上海' },
  { label: '深圳', value: '深圳' },
  { label: '杭州', value: '杭州' }
]
</script>

<template>
  <Story title="元素/InputNumber 数字输入框" group="components">
    <Variant title="基础用法">
      <div class="story-stack">
        <XInputNumber v-model="value" :min="0" :max="99" />
        <span>当前值：{{ value }}</span>
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div class="story-stack">
        <XInputNumber v-model="empty" placeholder="空值" />
        <XInputNumber :model-value="0" :min="0" :max="10" disabled />
        <XInputNumber :model-value="8" :min="0" :max="10" readonly />
        <XInputNumber :model-value="99" size="lg" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <div
            class="input-number-parent-box"
            :style="{ width: `${parentBox.width}px`, height: `${parentBox.height}px` }"
          >
            <XInputNumber v-bind="{ ...styleProps, ...inputNumberAppearance }" v-model="sample.number" />
          </div>
        </template>
        <template #controls="{ state }">
          <div class="input-number-appearance-controls">
            <div class="input-number-appearance-controls__column">
              <label>
                <span>父元素宽</span>
                <input v-model.number="parentBox.width" type="number" min="160" max="640" step="10" />
              </label>
              <label>
                <span>父元素高</span>
                <input v-model.number="parentBox.height" type="number" min="48" max="240" step="10" />
              </label>
              <label>
                <span>最小值</span>
                <input
                  v-model.number="inputNumberAppearance.min"
                  type="number"
                  :max="inputNumberAppearance.max"
                  :step="inputNumberAppearance.step"
                />
              </label>
              <label>
                <span>最大值</span>
                <input
                  v-model.number="inputNumberAppearance.max"
                  type="number"
                  :min="inputNumberAppearance.min"
                  :step="inputNumberAppearance.step"
                />
              </label>
              <label>
                <span>步进</span>
                <input v-model.number="inputNumberAppearance.step" type="number" min="0.1" max="20" step="0.1" />
              </label>
              <label>
                <span>边框粗细</span>
                <input v-model.number="state.borderWidth" type="number" min="0" max="12" step="1" />
              </label>
              <label>
                <span>圆角</span>
                <input v-model.number="inputNumberAppearance.borderRadius" type="number" min="0" max="40" step="1" />
              </label>
              <label>
                <span>字体</span>
                <select v-model="inputNumberAppearance.fontFamily">
                  <option v-for="option in fontOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </label>
              <label>
                <span>字体大小</span>
                <input v-model.number="inputNumberAppearance.fontSize" type="number" min="12" max="32" step="1" />
              </label>
              <label class="input-number-appearance-controls__check">
                <input v-model="inputNumberAppearance.fullWidth" type="checkbox" />
                <span>撑满父元素宽度</span>
              </label>
              <label class="input-number-appearance-controls__check">
                <input v-model="inputNumberAppearance.fullHeight" type="checkbox" />
                <span>撑满父元素高度</span>
              </label>
              <label class="input-number-appearance-controls__check">
                <input v-model="state.showActiveBorder" type="checkbox" />
                <span>显示激活边框</span>
              </label>
            </div>

            <div class="input-number-appearance-controls__column">
              <label>
                <span>减号背景色</span>
                <input v-model="inputNumberAppearance.decreaseButtonBackgroundColor" type="color" />
              </label>
              <label>
                <span>加号背景色</span>
                <input v-model="inputNumberAppearance.increaseButtonBackgroundColor" type="color" />
              </label>
              <label>
                <span>边框颜色</span>
                <input v-model="state.borderColor" type="color" />
              </label>
              <label>
                <span>主题色</span>
                <input v-model="inputNumberAppearance.color" type="color" />
              </label>
              <label>
                <span>激活边框色</span>
                <input v-model="inputNumberAppearance.activeBorderColor" type="color" />
              </label>
              <label>
                <span>背景色</span>
                <input v-model="state.backgroundColor" type="color" />
              </label>
              <label>
                <span>文字颜色</span>
                <input v-model="state.textColor" type="color" />
              </label>
            </div>
          </div>
        </template>
      </ElementStylePlayground>
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
