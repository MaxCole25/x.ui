<script setup lang="ts">
import { reactive } from 'vue'
import { XTextarea } from './index'
import type { TextareaSize, TextareaStatus, TextareaTextAlign } from './src/types'
import '../../../styles/index.css'

const sample = reactive({
  modelValue: '这是一段用于验证 XTextarea 多行输入的内容。打开自动高度时，组件会跟随输入内容增长；设置最大行数后，超出的内容会在文本域内部显示竖向滚动条。',
  placeholder: '请输入备注',
  id: 'x-textarea-story',
  name: 'remark',
  size: 'md' as TextareaSize,
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
  fontSize: 12,
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

const sizeOptions: Array<{ label: string; value: TextareaSize }> = [
  { label: '小尺寸', value: 'sm' },
  { label: '默认尺寸', value: 'md' },
  { label: '大尺寸', value: 'lg' }
]

const statusOptions: Array<{ label: string; value: TextareaStatus }> = [
  { label: 'default', value: 'default' },
  { label: 'success', value: 'success' },
  { label: 'warning', value: 'warning' },
  { label: 'error', value: 'error' }
]

const textAlignOptions: Array<{ label: string; value: TextareaTextAlign }> = [
  { label: '居左', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '居右', value: 'right' }
]

const fontFamilies = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: '系统默认', value: 'var(--x-font-family)' },
  { label: '微软雅黑', value: '"Microsoft YaHei", sans-serif' },
  { label: '宋体', value: 'SimSun, serif' },
  { label: '等宽字体', value: 'Consolas, "Courier New", monospace' }
]

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
      <div class="textarea-story">
        <div class="textarea-story__preview">
          <div
            class="textarea-story__sandbox"
            :style="{
              width: sample.fullParentWidth ? '100%' : `${sample.parentWidth}px`,
              height: sample.fullParentHeight ? '100%' : `${sample.parentHeight}px`
            }"
          >
            <XTextarea
              v-model="sample.modelValue"
              :placeholder="sample.placeholder"
              :id="sample.id"
              :name="sample.name"
              :size="sample.size"
              :status="sample.status"
              :rows="sample.rows"
              :max-rows="sample.maxRows"
              :maxlength="sample.maxlength"
              :width="sample.width"
              :height="sample.height || undefined"
              :font-family="sample.fontFamily"
              :font-size="sample.fontSize"
              :text-align="sample.textAlign"
              :padding="sample.padding"
              :radius="sample.radius"
              :border-width="sample.borderWidth"
              :border-color="sample.borderColor"
              :background-color="sample.backgroundColor"
              :input-background-color="sample.inputBackgroundColor"
              :text-color="sample.textColor"
              :accent-color="sample.accentColor"
              :active-border-color="sample.activeBorderColor"
              :disabled-background-color="sample.disabledBackgroundColor"
              :disabled-text-color="sample.disabledTextColor"
              :clear-icon-color="sample.clearIconColor"
              :clear-icon-size="sample.clearIconSize"
              :auto-height="sample.autoHeight"
              :allow-wrap="sample.allowWrap"
              :disabled="sample.disabled"
              :readonly="sample.readonly"
              :clearable="sample.clearable"
              :hide-clear-button="sample.hideClearButton"
              :show-active-border="sample.showActiveBorder"
              @input="logEvent('input', $event)"
              @change="logEvent('change', $event)"
              @focus="logEvent('focus')"
              @blur="logEvent('blur')"
              @clear="logEvent('clear')"
            />
          </div>
        </div>

        <div class="textarea-story__controls">
          <section class="textarea-story__group">
            <h3>属性</h3>
            <label>
              <span>绑定值</span>
              <input v-model="sample.modelValue" />
            </label>
            <label>
              <span>占位文本</span>
              <input v-model="sample.placeholder" />
            </label>
            <label>
              <span>id</span>
              <input v-model="sample.id" />
            </label>
            <label>
              <span>name</span>
              <input v-model="sample.name" />
            </label>
            <label>
              <span>尺寸</span>
              <select v-model="sample.size">
                <option v-for="item in sizeOptions" :key="item.value" :value="item.value">{{ item.value }}</option>
              </select>
            </label>
            <label>
              <span>状态</span>
              <select v-model="sample.status">
                <option v-for="item in statusOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
              </select>
            </label>
            <label class="textarea-story__color-field">
              <span>背景色</span>
              <input v-model="sample.backgroundColor" type="color" />
            </label>
            <label class="textarea-story__color-field">
              <span>文字颜色</span>
              <input v-model="sample.textColor" type="color" />
            </label>
          </section>

          <section class="textarea-story__group">
            <h3>接口</h3>
            <label>
              <span>rows</span>
              <input v-model.number="sample.rows" type="number" min="1" max="12" />
            </label>
            <label>
              <span>maxRows</span>
              <input v-model.number="sample.maxRows" type="number" min="0" max="20" />
            </label>
            <label>
              <span>maxlength</span>
              <input v-model.number="sample.maxlength" type="number" min="0" max="1000" />
            </label>
            <label>
              <span>父元素宽度</span>
              <input v-model.number="sample.parentWidth" type="number" min="160" max="960" />
            </label>
            <label>
              <span>父元素高度</span>
              <input v-model.number="sample.parentHeight" type="number" min="100" max="520" />
            </label>
            <label>
              <span>组件宽度</span>
              <input v-model="sample.width" />
            </label>
            <label>
              <span>组件高度</span>
              <input v-model="sample.height" />
            </label>
            <label>
              <span>字体</span>
              <select v-model="sample.fontFamily">
                <option v-for="font in fontFamilies" :key="font.value" :value="font.value">{{ font.label }}</option>
              </select>
            </label>
            <label>
              <span>字体大小</span>
              <input v-model.number="sample.fontSize" type="number" min="10" max="32" />
            </label>
            <label>
              <span>对齐</span>
              <select v-model="sample.textAlign">
                <option v-for="item in textAlignOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
              </select>
            </label>
            <label>
              <span>内边距</span>
              <input v-model="sample.padding" />
            </label>
            <label>
              <span>圆角</span>
              <input v-model="sample.radius" />
            </label>
          </section>

          <section class="textarea-story__group">
            <h3>类型</h3>
            <label>
              <span>TextareaProps</span>
              <input value="公开属性对象" readonly />
            </label>
            <label>
              <span>TextareaSize</span>
              <input value="sm | md | lg" readonly />
            </label>
            <label>
              <span>TextareaStatus</span>
              <input value="default | success | warning | error" readonly />
            </label>
            <label>
              <span>TextareaTextAlign</span>
              <input value="left | center | right" readonly />
            </label>
            <label class="textarea-story__color-field">
              <span>边框颜色</span>
              <input v-model="sample.borderColor" type="color" />
            </label>
            <label class="textarea-story__color-field">
              <span>激活边框色</span>
              <input v-model="sample.activeBorderColor" type="color" />
            </label>
            <label class="textarea-story__color-field">
              <span>清空图标色</span>
              <input v-model="sample.clearIconColor" type="color" />
            </label>
            <label>
              <span>边框粗细</span>
              <input v-model="sample.borderWidth" />
            </label>
            <label>
              <span>清空图标大小</span>
              <input v-model.number="sample.clearIconSize" type="number" min="12" max="32" />
            </label>
          </section>

          <section class="textarea-story__group">
            <h3>事件</h3>
            <label>
              <span>事件记录</span>
              <input v-model="sample.eventLog" readonly />
            </label>
            <label class="textarea-story__check">
              <input v-model="sample.autoHeight" type="checkbox" />
              <span>自动高度</span>
            </label>
            <label class="textarea-story__check">
              <input v-model="sample.allowWrap" type="checkbox" />
              <span>允许换行</span>
            </label>
            <label class="textarea-story__check">
              <input v-model="sample.disabled" type="checkbox" />
              <span>禁用</span>
            </label>
            <label class="textarea-story__check">
              <input v-model="sample.readonly" type="checkbox" />
              <span>只读</span>
            </label>
            <label class="textarea-story__check">
              <input v-model="sample.clearable" type="checkbox" />
              <span>可清空</span>
            </label>
            <label class="textarea-story__check">
              <input v-model="sample.hideClearButton" type="checkbox" />
              <span>隐藏清除按钮</span>
            </label>
            <label class="textarea-story__check">
              <input v-model="sample.showActiveBorder" type="checkbox" />
              <span>显示激活边框</span>
            </label>
            <label class="textarea-story__check">
              <input v-model="sample.fullParentWidth" type="checkbox" />
              <span>父元素撑满宽度</span>
            </label>
            <label class="textarea-story__check">
              <input v-model="sample.fullParentHeight" type="checkbox" />
              <span>父元素撑满高度</span>
            </label>
          </section>
        </div>
      </div>
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
