<script setup lang="ts">
import '../../../styles/index.css'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { reactive } from 'vue'
import XInputNumber from '../input-number/src/InputNumber.vue'
import XSwitch from './src/Switch.vue'
import type { SwitchLabelPosition, SwitchSize } from './src/types'
const sample = reactive({
  checked: true
})

const switchAppearance = reactive({
  name: 'appearance-switch',
  size: 'md' as SwitchSize,
  activeText: '开',
  inactiveText: '关',
  labelPosition: 'outside' as SwitchLabelPosition,
  color: '#409eff',
  inactiveColor: '#dcdfe6',
  thumbColor: '#ffffff',
  buttonSize: 20,
  fontSize: 15,
  fontFamily: '',
  radius: '999px',
  disabled: false
})

</script>

<template>
  <Story title="Form 组件/Switch 开关" group="components">
    

    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XSwitch
            v-bind="styleProps"
            v-model="sample.checked"
            :name="switchAppearance.name"
            :size="switchAppearance.size"
            :active-text="switchAppearance.activeText"
            :inactive-text="switchAppearance.inactiveText"
            :label-position="switchAppearance.labelPosition"
            :color="switchAppearance.color"
            :inactive-color="switchAppearance.inactiveColor"
            :thumb-color="switchAppearance.thumbColor"
            :button-size="switchAppearance.buttonSize"
            :font-size="switchAppearance.fontSize"
            :font-family="switchAppearance.fontFamily || undefined"
            :radius="switchAppearance.radius"
            :disabled="switchAppearance.disabled"
          />
        </template>
        <template #column-1>
          <label>
            <span>name</span>
            <input v-model="switchAppearance.name" type="text" />
          </label>
          <label>
            <span>尺寸</span>
            <select v-model="switchAppearance.size">
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>
          <label>
            <span>开启文案</span>
            <input v-model="switchAppearance.activeText" type="text" />
          </label>
          <label>
            <span>关闭文案</span>
            <input v-model="switchAppearance.inactiveText" type="text" />
          </label>
          <label>
            <span>文案位置</span>
            <select v-model="switchAppearance.labelPosition">
              <option value="outside">左右标签</option>
              <option value="inside">轨道内部</option>
            </select>
          </label>
          <label>
            <span>字体</span>
            <select v-model="switchAppearance.fontFamily">
              <option value="">默认字体</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Microsoft YaHei', sans-serif">微软雅黑</option>
              <option value="'SimSun', serif">宋体</option>
            </select>
          </label>
        </template>
        <template #column-2>
          <label>
            <span>按钮大小</span>
            <XInputNumber v-model="switchAppearance.buttonSize" class="switch-appearance-demo__number" :min="12" :max="40" :step="1" size="sm" />
          </label>
          <label>
            <span>字体大小</span>
            <XInputNumber v-model="switchAppearance.fontSize" class="switch-appearance-demo__number" :min="10" :max="24" :step="1" size="sm" />
          </label>
          <label>
            <span>圆角</span>
            <input v-model="switchAppearance.radius" type="text" />
          </label>
        </template>
        <template #column-3>
          <label>
            <span>开启背景色</span>
            <input v-model="switchAppearance.color" type="color" />
          </label>
          <label>
            <span>关闭背景色</span>
            <input v-model="switchAppearance.inactiveColor" type="color" />
          </label>
          <label>
            <span>圆形按钮色</span>
            <input v-model="switchAppearance.thumbColor" type="color" />
          </label>
        </template>
        <template #column-4>
          <label>
            <input v-model="sample.checked" type="checkbox" />
            <span>当前开启</span>
          </label>
          <label>
            <input v-model="switchAppearance.disabled" type="checkbox" />
            <span>禁用状态</span>
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.switch-appearance-demo {
  align-items: flex-start;
  background: #f8fafc;
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  display: grid;
  gap: 16px;
  padding: 24px;
  width: min(320px, 100%);
}

.switch-appearance-demo__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: minmax(0, 1fr);
  width: 100%;
}

.switch-appearance-demo__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 13px;
  gap: 10px;
  justify-content: space-between;
  min-width: 0;
  width: 100%;
}

.switch-appearance-demo__controls span {
  flex: 0 0 auto;
  white-space: nowrap;
}

.switch-appearance-demo__controls input[type='text'] {
  box-sizing: border-box;
  flex: 0 0 120px;
  width: 120px;
}

.switch-appearance-demo__controls input,
.switch-appearance-demo__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 30px;
  padding: 0 8px;
}

.switch-appearance-demo__controls input[type='number'],
.switch-appearance-demo__controls select {
  flex: 0 0 120px;
  width: 120px;
}

.switch-appearance-demo__number {
  flex: 0 0 120px;
  min-width: 120px;
  width: 120px;
}

.switch-appearance-demo__check {
  flex-direction: row-reverse;
  justify-content: flex-start;
}
</style>
