<script setup lang="ts">
import { reactive, ref } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import XRadio from './src/Radio.vue'
import type { RadioSize } from './src/types'
const appearanceValue = ref('A')

const appearance = reactive({
  label: '单选项',
  value: 'A',
  name: 'appearance-radio',
  size: 'md' as RadioSize,
  labelColor: '#4c1d95',
  buttonColor: '#7c3aed',
  buttonSize: 14,
  fontSize: 15,
  fontFamily: '',
  disabled: false
})
</script>

<template>
  <Story title="Form 组件/Radio 单选框" group="components">
    

    

    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XRadio
            v-bind="styleProps"
            v-model="appearanceValue"
            :name="appearance.name"
            :value="appearance.value"
            :size="appearance.size"
            :label-color="appearance.labelColor"
            :button-color="appearance.buttonColor"
            :button-size="appearance.buttonSize"
            :font-size="appearance.fontSize"
            :font-family="appearance.fontFamily"
            :disabled="appearance.disabled"
          >
            {{ appearance.label }}
          </XRadio>
        </template>
        <template #column-1>
          <label>
            <span>绑定值</span>
            <input v-model="appearanceValue" />
          </label>
          <label>
            <span>标签</span>
            <input v-model="appearance.label" />
          </label>
          <label>
            <span>值</span>
            <input v-model="appearance.value" />
          </label>
          <label>
            <span>name</span>
            <input v-model="appearance.name" />
          </label>
          <label>
            <span>尺寸</span>
            <select v-model="appearance.size">
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>
          <label>
            <span>字体</span>
            <select v-model="appearance.fontFamily">
              <option value="">默认字体</option>
              <option value="SimSun, 宋体, serif">宋体</option>
              <option value="Microsoft YaHei, 微软雅黑, sans-serif">微软雅黑</option>
              <option value="KaiTi, 楷体, serif">楷体</option>
              <option value="SimHei, 黑体, sans-serif">黑体</option>
            </select>
          </label>
        </template>
        <template #column-2>
          <label>
            <span>按钮大小</span>
            <input v-model.number="appearance.buttonSize" type="number" min="10" max="32" step="1" />
          </label>
          <label>
            <span>字体大小</span>
            <input v-model.number="appearance.fontSize" type="number" min="10" max="32" step="1" />
          </label>
        </template>
        <template #column-3>
          <label>
            <span>标签文字颜色</span>
            <input v-model="appearance.labelColor" type="color" />
          </label>
          <label>
            <span>按钮颜色</span>
            <input v-model="appearance.buttonColor" type="color" />
          </label>
        </template>
        <template #column-4>
          <label>
            <input v-model="appearance.disabled" type="checkbox" />
            <span>禁用状态</span>
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>

    
  </Story>
</template>

<style scoped>
.radio-appearance-playground {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.radio-appearance-playground__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  min-height: 132px;
  padding: 24px;
}

.radio-appearance-playground__controls {
  display: grid;
  gap: 10px;
  grid-template-columns: minmax(0, 320px);
  padding: 16px;
}

.radio-appearance-playground__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
  justify-content: space-between;
  min-width: 0;
}

.radio-appearance-playground__controls span {
  overflow-wrap: anywhere;
}

.radio-appearance-playground__check {
  justify-content: flex-start;
}

.radio-appearance-playground__controls input,
.radio-appearance-playground__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 32px;
  min-width: 0;
  padding: 0 8px;
}

.radio-appearance-playground__controls input[type="color"] {
  padding: 2px;
  width: 48px;
}

.radio-appearance-playground__controls input[type="checkbox"] {
  min-height: auto;
}
</style>
