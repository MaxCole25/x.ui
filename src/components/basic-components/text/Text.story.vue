<script setup lang="ts">
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
  fontSize: 12,
  lineHeight: '1.55',
  previewWidth: 420,
  previewHeight: 92,
  height: 40,
  autoHeight: false,
  padding: '5px 10px',
  textAlign: 'left' as TextAlign,
  verticalAlign: 'middle' as TextVerticalAlign,
  name: 'businessName',
  id: 'x-text-story',
  maxlength: 40
})

const fontFamilies = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: '系统默认', value: 'var(--x-font-family)' },
  { label: '微软雅黑', value: '"Microsoft YaHei", sans-serif' },
  { label: '宋体', value: 'SimSun, serif' },
  { label: '等宽字体', value: 'Consolas, "Courier New", monospace' }
]

const textAlignOptions: Array<{ label: string; value: TextAlign }> = [
  { label: '居左', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '居右', value: 'right' }
]

const verticalAlignOptions: Array<{ label: string; value: TextVerticalAlign }> = [
  { label: '顶部', value: 'top' },
  { label: '居中', value: 'middle' },
  { label: '底部', value: 'bottom' }
]

</script>

<template>
  <Story title="基础组件/Text 文本" group="components">
    

    

    

    <Variant title="外观接口">
      <div class="text-story">
        <div class="text-story__preview">
          <div
            class="text-story__sandbox"
            :style="{
              width: `${sample.previewWidth}px`,
              height: `${sample.previewHeight}px`
            }"
          >
              <XText
              v-model="sample.modelValue"
              tag="span"
              :variant="sample.variant"
              :disabled="sample.disabled"
              :border-width="sample.borderWidth"
              :border-color="sample.borderColor"
              :radius="sample.radius"
              :background-color="sample.backgroundColor"
              :text-color="sample.textColor"
              :font-family="sample.fontFamily"
              :font-size="sample.fontSize"
              :line-height="sample.lineHeight"
              :height="sample.height"
              :auto-height="sample.autoHeight"
              :padding="sample.padding"
              :text-align="sample.textAlign"
              :vertical-align="sample.verticalAlign"
              :name="sample.name"
              :id="sample.id"
              :maxlength="sample.maxlength"
            />
          </div>
        </div>

        <div class="text-story__controls">
          <section class="text-story__group">
            <h3>输入框</h3>
            <label>
              <span>绑定值</span>
              <input v-model="sample.modelValue" />
            </label>
            <label>
              <span>name</span>
              <input v-model="sample.name" />
            </label>
            <label>
              <span>id</span>
              <input v-model="sample.id" />
            </label>
            <label>
              <span>视觉形态</span>
              <select v-model="sample.variant">
                <option value="default">default</option>
                <option value="muted">muted</option>
                <option value="primary">primary</option>
                <option value="success">success</option>
                <option value="warning">warning</option>
                <option value="danger">danger</option>
              </select>
            </label>
            <label>
              <span>字体样式</span>
              <select v-model="sample.fontFamily">
                <option v-for="font in fontFamilies" :key="font.value" :value="font.value">{{ font.label }}</option>
              </select>
            </label>
          </section>

          <section class="text-story__group">
            <h3>数字输入框</h3>
            <label>
              <span>最大长度</span>
              <input v-model.number="sample.maxlength" type="number" min="0" max="200" />
            </label>
            <label>
              <span>边框粗细</span>
              <input v-model="sample.borderWidth" />
            </label>
            <label>
              <span>字体大小</span>
              <input v-model.number="sample.fontSize" type="number" min="10" max="32" />
            </label>
            <label>
              <span>行高</span>
              <input v-model="sample.lineHeight" />
            </label>
            <label>
              <span>容器宽度</span>
              <input v-model.number="sample.previewWidth" type="number" min="120" max="960" />
            </label>
            <label>
              <span>容器高度</span>
              <input v-model.number="sample.previewHeight" type="number" min="40" max="320" />
            </label>
            <label>
              <span>组件高度</span>
              <input v-model.number="sample.height" type="number" min="24" max="80" :disabled="sample.autoHeight" />
            </label>
            <label>
              <span>圆角</span>
              <input v-model="sample.radius" />
            </label>
            <label>
              <span>div padding</span>
              <input v-model="sample.padding" />
            </label>
          </section>

          <section class="text-story__group">
            <h3>颜色拾取器</h3>
            <label class="text-story__color-field">
              <span>背景色</span>
              <input v-model="sample.backgroundColor" type="color" aria-label="背景色" />
            </label>
            <label class="text-story__color-field">
              <span>文字颜色</span>
              <input v-model="sample.textColor" type="color" aria-label="文字颜色" />
            </label>
            <label class="text-story__color-field">
              <span>边框颜色</span>
              <input v-model="sample.borderColor" type="color" aria-label="边框颜色" />
            </label>
          </section>

          <section class="text-story__group">
            <h3>复选框</h3>
            <label class="text-story__check">
              <input v-model="sample.disabled" type="checkbox" />
              <span>禁用</span>
            </label>
            <label class="text-story__check">
              <input v-model="sample.autoHeight" type="checkbox" />
              <span>自动高度（比组件高度优先级高）</span>
            </label>
            <label>
              <span>文字对齐</span>
              <select v-model="sample.textAlign">
                <option v-for="align in textAlignOptions" :key="align.value" :value="align.value">{{ align.label }}</option>
              </select>
            </label>
            <label>
              <span>垂直对齐</span>
              <select v-model="sample.verticalAlign">
                <option v-for="align in verticalAlignOptions" :key="align.value" :value="align.value">{{ align.label }}</option>
              </select>
            </label>
          </section>
        </div>
      </div>
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

.text-story__sandbox :deep(.x-text) {
  width: 100%;
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
