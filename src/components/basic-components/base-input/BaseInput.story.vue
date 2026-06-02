<script setup lang="ts">
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
  fontSize: 12,
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

const fontFamilies = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: '系统默认', value: 'var(--x-font-family)' },
  { label: '微软雅黑', value: '"Microsoft YaHei", sans-serif' },
  { label: '宋体', value: 'SimSun, serif' },
  { label: '等宽字体', value: 'Consolas, "Courier New", monospace' }
]

const textAlignOptions: Array<{ label: string; value: BaseInputTextAlign }> = [
  { label: '居左', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '居右', value: 'right' }
]

const formatCurrency = (value: string | number) => {
  const n = Number(value ?? 0)
  return Number.isFinite(n)
    ? `￥${n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '￥0.00'
}

const parseCurrency = (value: string) => {
  const n = Number(String(value ?? '').replace(/[¥￥,\s]/g, ''))
  return Number.isFinite(n) ? n : 0
}
</script>

<template>
  <Story title="基础组件/BaseInput 基础输入框" group="components">
    <Variant title="外观接口">
      <div class="input-story">
        <div class="input-story__preview">
          <div
            class="input-story__sandbox"
            :style="{
              width: `${state.previewWidth}px`,
              height: `${state.previewHeight}px`
            }"
          >
            <div class="input-story__stack">
              <XBaseInput
                v-model="state.modelValue"
                :placeholder="state.placeholder"
                :disabled="state.disabled"
                :readonly="state.readonly"
                :clearable="state.clearable"
                :prefix="state.prefix"
                :suffix="state.suffix"
                :accent-color="state.accentColor"
                :active-border-color="state.activeBorderColor"
                :border-width="state.borderWidth"
                :border-color="state.borderColor"
                :clear-icon-color="state.clearIconColor"
                :clear-icon-size="state.clearIconSize"
                :disabled-background-color="state.disabledBackgroundColor"
                :disabled-text-color="state.disabledTextColor"
                :radius="state.radius"
                :background-color="state.backgroundColor"
                :text-color="state.textColor"
                :font-family="state.fontFamily"
                :font-size="state.fontSize"
                :width="state.width"
                :height="state.height"
                :auto-height="state.autoHeight"
                :hide-clear-button="state.hideClearButton"
                :padding="state.padding"
                :text-align="state.textAlign"
                :show-active-border="state.showActiveBorder"
                :name="state.name"
                :id="state.id"
                :maxlength="state.maxlength"
              />
              <XBaseInput
                v-model="state.amountValue"
                clearable
                text-align="right"
                type="number"
                :formatter="formatCurrency"
                :parser="parseCurrency"
              />
            </div>
          </div>
        </div>

        <div class="input-story__controls">
          <section class="input-story__group">
            <h3>输入框</h3>
            <label>
              <span>绑定值</span>
              <input v-model="state.modelValue" />
            </label>
            <label>
              <span>格式化金额</span>
              <input v-model.number="state.amountValue" type="number" />
            </label>
            <label>
              <span>占位文本</span>
              <input v-model="state.placeholder" />
            </label>
            <label>
              <span>前缀</span>
              <input v-model="state.prefix" />
            </label>
            <label>
              <span>后缀</span>
              <input v-model="state.suffix" />
            </label>
            <label>
              <span>name</span>
              <input v-model="state.name" />
            </label>
            <label>
              <span>id</span>
              <input v-model="state.id" />
            </label>
            <label>
              <span>字体样式</span>
              <select v-model="state.fontFamily">
                <option v-for="font in fontFamilies" :key="font.value" :value="font.value">{{ font.label }}</option>
              </select>
            </label>
          </section>

          <section class="input-story__group">
            <h3>数字输入框</h3>
            <label>
              <span>最大长度</span>
              <input v-model.number="state.maxlength" type="number" min="0" max="200" />
            </label>
            <label>
              <span>边框粗细</span>
              <input v-model="state.borderWidth" />
            </label>
            <label>
              <span>清除图标大小</span>
              <input v-model.number="state.clearIconSize" type="number" min="10" max="40" />
            </label>
            <label>
              <span>字体大小</span>
              <input v-model.number="state.fontSize" type="number" min="10" max="32" />
            </label>
            <label>
              <span>组件宽度</span>
              <input v-model.number="state.width" type="number" min="120" max="960" />
            </label>
            <label>
              <span>容器宽度</span>
              <input v-model.number="state.previewWidth" type="number" min="120" max="960" />
            </label>
            <label>
              <span>容器高度</span>
              <input v-model.number="state.previewHeight" type="number" min="40" max="320" />
            </label>
            <label>
              <span>组件高度</span>
              <input v-model.number="state.height" type="number" min="24" max="80" :disabled="state.autoHeight" />
            </label>
            <label>
              <span>圆角</span>
              <input v-model="state.radius" />
            </label>
            <label>
              <span>div padding</span>
              <input v-model="state.padding" />
            </label>
          </section>

          <section class="input-story__group">
            <h3>颜色拾取器</h3>
            <label class="input-story__color-field">
              <span>背景色</span>
              <input v-model="state.backgroundColor" type="color" aria-label="背景色" />
            </label>
            <label class="input-story__color-field">
              <span>文字颜色</span>
              <input v-model="state.textColor" type="color" aria-label="文字颜色" />
            </label>
            <label class="input-story__color-field">
              <span>边框颜色</span>
              <input v-model="state.borderColor" type="color" aria-label="边框颜色" />
            </label>
            <label class="input-story__color-field">
              <span>主题色</span>
              <input v-model="state.accentColor" type="color" aria-label="主题色" />
            </label>
            <label class="input-story__color-field">
              <span>激活边框色</span>
              <input v-model="state.activeBorderColor" type="color" aria-label="激活边框色" />
            </label>
            <label class="input-story__color-field">
              <span>清除图标色</span>
              <input v-model="state.clearIconColor" type="color" aria-label="清除图标色" />
            </label>
            <label class="input-story__color-field">
              <span>禁用背景色</span>
              <input v-model="state.disabledBackgroundColor" type="color" aria-label="禁用背景色" />
            </label>
            <label class="input-story__color-field">
              <span>禁用文字色</span>
              <input v-model="state.disabledTextColor" type="color" aria-label="禁用文字色" />
            </label>
          </section>

          <section class="input-story__group">
            <h3>复选框</h3>
            <label class="input-story__check">
              <input v-model="state.disabled" type="checkbox" />
              <span>禁用</span>
            </label>
            <label class="input-story__check">
              <input v-model="state.readonly" type="checkbox" />
              <span>只读</span>
            </label>
            <label class="input-story__check">
              <input v-model="state.clearable" type="checkbox" />
              <span>可清空</span>
            </label>
            <label class="input-story__check">
              <input v-model="state.hideClearButton" type="checkbox" />
              <span>隐藏清除按钮</span>
            </label>
            <label class="input-story__check">
              <input v-model="state.autoHeight" type="checkbox" />
              <span>自动高度（比组件高度优先级高）</span>
            </label>
            <label class="input-story__check">
              <input v-model="state.showActiveBorder" type="checkbox" />
              <span>显示激活边框</span>
            </label>
            <label>
              <span>文字对齐</span>
              <select v-model="state.textAlign">
                <option v-for="align in textAlignOptions" :key="align.value" :value="align.value">{{ align.label }}</option>
              </select>
            </label>
          </section>
        </div>
      </div>
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
