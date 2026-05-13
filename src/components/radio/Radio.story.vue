<script setup lang="ts">
import { ref, reactive } from 'vue'
import XRadio from './src/Radio.vue'

const value = ref('day')
const priority = ref('normal')
const appearanceValue = ref('A')

const appearance = reactive({
  labelColor: '#4c1d95',
  buttonColor: '#7c3aed',
  buttonSize: 14,
  fontSize: 15,
  fontFamily: '',
  disabled: false
})
</script>

<template>
  <Story title="元素/Radio 单选框" group="components">
    <Variant title="基础用法">
      <div style="display: grid; gap: 16px">
        <div style="display: grid; gap: 8px">
          <div style="font-size: 13px; color: #606266">同组 Radio 绑定同一个 v-model，并使用相同 name</div>
          <div style="display: flex; gap: 16px; flex-wrap: wrap">
            <XRadio v-model="value" name="mode" value="day">日视图</XRadio>
            <XRadio v-model="value" name="mode" value="week">周视图</XRadio>
            <XRadio v-model="value" name="mode" value="month" disabled>月视图</XRadio>
          </div>
        </div>

        <div style="display: grid; gap: 8px">
          <div style="font-size: 13px; color: #606266">另一个分组使用独立 v-model 和独立 name</div>
          <div style="display: flex; gap: 16px; flex-wrap: wrap">
            <XRadio v-model="priority" name="priority" value="normal">普通</XRadio>
            <XRadio v-model="priority" name="priority" value="urgent">紧急</XRadio>
            <XRadio v-model="priority" name="priority" value="blocked">阻塞</XRadio>
          </div>
        </div>

        <div style="display: flex; gap: 16px; flex-wrap: wrap">
          <XRadio
            v-model="priority"
            name="priority"
            value="custom"
            button-color="#7c3aed"
            button-size="16px"
            label-color="#4c1d95"
            font-size="15px"
            font-family="SimSun, 宋体, serif"
          >
            自定义外观
          </XRadio>
          <XRadio
            v-model="priority"
            name="priority"
            value="silent"
            button-color="#0f766e"
            label-color="#115e59"
          >
            另一主题
          </XRadio>
        </div>
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div style="display: grid; gap: 12px; max-width: 360px">
        <XRadio v-model="value" name="state" value="day">已选状态</XRadio>
        <XRadio v-model="value" name="state" value="disabled" disabled>禁用未选</XRadio>
        <XRadio model-value="locked" name="locked" value="locked" disabled>禁用已选</XRadio>
        <XRadio v-model="value" name="long" value="long">很长很长很长很长的单选项文案用于检查换行和对齐</XRadio>
      </div>
    </Variant>

    <Variant title="外观接口">
      <div class="radio-appearance-playground">
        <div class="radio-appearance-playground__preview">
          <XRadio
            v-model="appearanceValue"
            name="appearance"
            value="A"
            :label-color="appearance.labelColor"
            :button-color="appearance.buttonColor"
            :button-size="appearance.buttonSize"
            :font-size="appearance.fontSize"
            :font-family="appearance.fontFamily"
            :disabled="appearance.disabled"
          >
            单选项
          </XRadio>
          <XRadio
            v-model="appearanceValue"
            name="appearance"
            value="B"
            :label-color="appearance.labelColor"
            :button-color="appearance.buttonColor"
            :button-size="appearance.buttonSize"
            :font-size="appearance.fontSize"
            :font-family="appearance.fontFamily"
            :disabled="appearance.disabled"
          >
            对照项
          </XRadio>
        </div>

        <div class="radio-appearance-playground__controls">
          <label>
            <span>标签文字颜色</span>
            <input v-model="appearance.labelColor" type="color" />
          </label>
          <label>
            <span>按钮颜色</span>
            <input v-model="appearance.buttonColor" type="color" />
          </label>
          <label>
            <span>按钮大小</span>
            <input v-model.number="appearance.buttonSize" type="number" min="10" max="32" step="1" />
          </label>
          <label>
            <span>字体大小</span>
            <input v-model.number="appearance.fontSize" type="number" min="10" max="32" step="1" />
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
          <label class="radio-appearance-playground__check">
            <input v-model="appearance.disabled" type="checkbox" />
            <span>禁用状态</span>
          </label>
        </div>
      </div>
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
