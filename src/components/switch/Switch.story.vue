<script setup lang="ts">
import '../../styles/index.css'
import { ref, reactive } from 'vue'
import XInputNumber from '../input-number/src/InputNumber.vue'
import XSwitch from './src/Switch.vue'

const enabled = ref(true)
const off = ref(false)

const sample = reactive({
  checked: true
})

const switchAppearance = reactive({
  activeText: '开',
  inactiveText: '关',
  color: '#409eff',
  inactiveColor: '#dcdfe6',
  thumbColor: '#ffffff',
  buttonSize: 20,
  fontSize: 15,
  fontFamily: '',
  disabled: false
})

</script>

<template>
  <Story title="元素/Switch 开关" group="components">
    <Variant title="基础用法">
      <div style="display: grid; gap: 12px">
        <XSwitch v-model="enabled" active-text="开启" inactive-text="关闭" />
        <XSwitch v-model="enabled" size="lg" color="#7c3aed" inactive-color="#cbd5e1" thumb-color="#ffffff" />
        <XSwitch v-model="enabled" disabled />
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div style="display: grid; gap: 12px; max-width: 360px">
        <XSwitch v-model="enabled" active-text="开启" inactive-text="关闭" />
        <XSwitch v-model="off" active-text="启用" inactive-text="停用" />
        <XSwitch :model-value="true" disabled active-text="禁用开" inactive-text="禁用关" />
        <XSwitch :model-value="false" disabled active-text="禁用开" inactive-text="禁用关" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <div class="switch-appearance-demo">
        <XSwitch
          v-model="sample.checked"
          :active-text="switchAppearance.activeText"
          :inactive-text="switchAppearance.inactiveText"
          :color="switchAppearance.color"
          :inactive-color="switchAppearance.inactiveColor"
          :thumb-color="switchAppearance.thumbColor"
          :button-size="switchAppearance.buttonSize"
          :font-size="switchAppearance.fontSize"
          :font-family="switchAppearance.fontFamily || undefined"
          :disabled="switchAppearance.disabled"
        />

        <div class="switch-appearance-demo__controls">
          <label>
            <span>开启文案</span>
            <input v-model="switchAppearance.activeText" type="text" />
          </label>
          <label>
            <span>关闭文案</span>
            <input v-model="switchAppearance.inactiveText" type="text" />
          </label>
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
          <label>
            <span>按钮大小</span>
            <XInputNumber v-model="switchAppearance.buttonSize" class="switch-appearance-demo__number" :min="12" :max="40" :step="1" size="sm" />
          </label>
          <label>
            <span>字体大小</span>
            <XInputNumber v-model="switchAppearance.fontSize" class="switch-appearance-demo__number" :min="10" :max="24" :step="1" size="sm" />
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
          <label class="switch-appearance-demo__check">
            <input v-model="sample.checked" type="checkbox" />
            <span>当前开启</span>
          </label>
          <label class="switch-appearance-demo__check">
            <input v-model="switchAppearance.disabled" type="checkbox" />
            <span>禁用状态</span>
          </label>
        </div>
      </div>
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
