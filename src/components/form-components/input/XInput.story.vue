<script setup lang="ts">
import '../../../styles/index.css'
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import XInput from './src/Input.vue'
import type { InputSize, InputStatus, InputTextAlign, InputType } from './src/types'

const state = reactive({
  value: 'XInput 尺寸预设',
  placeholder: '请输入内容',
  size: 'md' as InputSize,
  type: 'text' as InputType,
  status: 'default' as InputStatus,
  prefix: '前缀',
  suffix: '后缀',
  accentColor: '#1264f4',
  activeBorderColor: '#1264f4',
  textColor: '#12323a',
  clearIconColor: '#64748b',
  clearIconSize: 14,
  disabledBackgroundColor: '#f1f5f9',
  disabledTextColor: '#94a3b8',
  fontFamily: '',
  fontSize: 12,
  height: 30,
  autoHeight: false,
  clearable: true,
  hideClearButton: false,
  padding: '0 8px',
  radius: '6px',
  textAlign: 'left' as InputTextAlign,
  inputBackgroundColor: '#ffffff',
  name: 'appearance-input',
  id: 'appearance-input',
  maxlength: 40,
  disabled: false,
  readonly: false
})

const sizes: InputSize[] = ['sm', 'md', 'lg']
const types: InputType[] = ['text', 'password', 'email', 'number', 'tel', 'url', 'search']
const statuses: InputStatus[] = ['default', 'success', 'warning', 'error']
const aligns: InputTextAlign[] = ['left', 'center', 'right']
</script>

<template>
  <Story title="Form 组件/Input 输入框" group="components">
    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XInput
            v-bind="styleProps"
            v-model="state.value"
            :type="state.type"
            :placeholder="state.placeholder"
            :disabled="state.disabled"
            :readonly="state.readonly"
            :clearable="state.clearable"
            :size="state.size"
            :status="state.status"
            :prefix="state.prefix"
            :suffix="state.suffix"
            :accent-color="state.accentColor"
            :active-border-color="state.activeBorderColor"
            :text-color="state.textColor"
            :clear-icon-color="state.clearIconColor"
            :clear-icon-size="state.clearIconSize"
            :disabled-background-color="state.disabledBackgroundColor"
            :disabled-text-color="state.disabledTextColor"
            :font-family="state.fontFamily || undefined"
            :font-size="state.fontSize"
            :height="state.height"
            :auto-height="state.autoHeight"
            :hide-clear-button="state.hideClearButton"
            :padding="state.padding"
            :radius="state.radius"
            :text-align="state.textAlign"
            :input-background-color="state.inputBackgroundColor"
            :name="state.name"
            :id="state.id"
            :maxlength="state.maxlength"
          />
        </template>
        <template #column-1>
          <label>
            <span>绑定值</span>
            <input v-model="state.value" />
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
            <span>id</span>
            <input v-model="state.id" />
          </label>
          <label>
            <span>name</span>
            <input v-model="state.name" />
          </label>
          <label>
            <span>内边距</span>
            <input v-model="state.padding" />
          </label>
          <label>
            <span>字体</span>
            <select v-model="state.fontFamily">
              <option value="">默认字体</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Microsoft YaHei', sans-serif">微软雅黑</option>
              <option value="'SimSun', serif">宋体</option>
            </select>
          </label>
          <label>
            <span>对齐</span>
            <select v-model="state.textAlign">
              <option v-for="align in aligns" :key="align" :value="align">{{ align }}</option>
            </select>
          </label>
          <label>
            <span>尺寸</span>
            <select v-model="state.size">
              <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </label>
          <label>
            <span>类型</span>
            <select v-model="state.type">
              <option v-for="
type in types" :key="type" :value="type">{{ type }}</option>
            </select>
          </label>
          <label>
            <span>状态</span>
            <select v-model="state.status">
              <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
            </select>
          </label>
        </template>
        <template #column-2>
          <label>
            <span>高度</span>
            <input v-model.number="state.height" type="number" min="20" max="160" />
          </label>
          <label>
            <span>字号</span>
            <input v-model.number="state.fontSize" type="number" min="10" max="32" />
          </label>
          <label>
            <span>圆角</span>
            <input v-model="state.radius" />
          </label>
          <label>
            <span>清除按钮长度</span>
            <input v-model.number="state.clearIconSize" type="number" min="8" max="32" />
          </label>
          <label>
            <span>最大长度</span>
            <input v-model.number="state.maxlength" type="number" min="1" max="120" />
          </label>
        </template>
        <template #column-3>
          <label>
            <span>主题色</span>
            <input v-model="state.accentColor" type="color" />
          </label>
          <label>
            <span>激活边框色</span>
            <input v-model="state.activeBorderColor" type="color" />
          </label>
          <label>
            <span>文字色</span>
            <input v-model="state.textColor" type="color" />
          </label>
          <label>
            <span>清除按钮色</span>
            <input v-model="state.clearIconColor" type="color" />
          </label>
          <label>
            <span>禁用背景色</span>
            <input v-model="state.disabledBackgroundColor" type="color" />
          </label>
          <label>
            <span>禁用文字色</span>
            <input v-model="state.disabledTextColor" type="color" />
          </label>
          <label>
            <span>背景色</span>
            <input v-model="state.inputBackgroundColor" type="color" />
          </label>
        </template>
        <template #column-4>
          <label>
            <input v-model="state.autoHeight" type="checkbox" />
            <span>自动高度</span>
          </label>
          <label>
            <input v-model="state.disabled" type="checkbox" />
            <span>禁用</span>
          </label>
          <label>
            <input v-model="state.readonly" type="checkbox" />
            <span>只读</span>
          </label>
          <label>
            <input v-model="state.clearable" type="checkbox" />
            <span>可清空</span>
          </label>
          <label>
            <input v-model="state.hideClearButton" type="checkbox" />
            <span>隐藏清除按钮</span>
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.input-size-story {
  display: grid;
  gap: 18px;
  max-width: 420px;
  padding: 24px;
}

.input-size-story__controls {
  display: grid;
  gap: 12px;
}

.input-size-story__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
  justify-content: space-between;
  min-width: 0;
}

.input-size-story__controls input,
.input-size-story__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 32px;
  min-width: 0;
  padding: 0 8px;
  width: 220px;
}

.input-size-story__controls input[type='checkbox'] {
  min-height: auto;
  width: auto;
}

.input-size-story__check {
  justify-content: flex-start;
}
</style>
