<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { CSSProperties } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import XRadioButton from './src/RadioButton.vue'
import type { ButtonVariant } from '../../basic-components/button/src/types'
import type { ButtonGroupDirection } from '../../basic-components/button-group/src/types'
import type { RadioSize } from './src/types'
const appearanceValue = ref('B')

const appearance = reactive({
  label: '按钮单选',
  value: 'A',
  name: 'appearance-radio-button',
  size: 'md' as RadioSize,
  variant: 'outline' as ButtonVariant,
  direction: 'horizontal' as ButtonGroupDirection,
  width: '',
  height: '',
  radius: 6,
  buttonColor: '#2563eb',
  activeBackgroundColor: '#2563eb',
  activeBorderColor: '#2563eb',
  activeTextColor: '#ffffff',
  buttonSize: 32,
  fontSize: 13,
  fontFamily: '',
  disabled: false
})

const appearanceGroupStyle = computed<CSSProperties>(() => ({
  display: 'inline-flex',
  flexDirection: appearance.direction === 'vertical' ? 'column' : 'row',
  flexWrap: 'wrap'
}))
</script>

<template>
  <Story title="Form 组件/RadioButton 单选按钮" group="components">
    

    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <div :style="appearanceGroupStyle">
            <XRadioButton
              v-bind="styleProps"
              v-model="appearanceValue"
              :name="appearance.name"
              :value="appearance.value"
              :size="appearance.size"
              :variant="appearance.variant"
              :direction="appearance.direction"
              :width="appearance.width || undefined"
              :height="appearance.height || undefined"
              :radius="appearance.radius"
              :button-color="appearance.buttonColor"
              :active-background-color="appearance.activeBackgroundColor"
              :active-border-color="appearance.activeBorderColor"
              :active-text-color="appearance.activeTextColor"
              :button-size="appearance.buttonSize"
              :font-size="appearance.fontSize"
              :font-family="appearance.fontFamily"
              :disabled="appearance.disabled"
            >
              {{ appearance.label }}
            </XRadioButton>
            <XRadioButton
              v-bind="styleProps"
              v-model="appearanceValue"
              :name="appearance.name"
              value="B"
              :size="appearance.size"
              :variant="appearance.variant"
              :direction="appearance.direction"
              :width="appearance.width || undefined"
              :height="appearance.height || undefined"
              :radius="appearance.radius"
              :button-color="appearance.buttonColor"
              :active-background-color="appearance.activeBackgroundColor"
              :active-border-color="appearance.activeBorderColor"
              :active-text-color="appearance.activeTextColor"
              :button-size="appearance.buttonSize"
              :font-size="appearance.fontSize"
              :font-family="appearance.fontFamily"
              :disabled="appearance.disabled"
            >
              对照项
            </XRadioButton>
            <XRadioButton
              v-bind="styleProps"
              v-model="appearanceValue"
              :name="appearance.name"
              value="C"
              :size="appearance.size"
              :variant="appearance.variant"
              :direction="appearance.direction"
              :width="appearance.width || undefined"
              :height="appearance.height || undefined"
              :radius="appearance.radius"
              :button-color="appearance.buttonColor"
              :active-background-color="appearance.activeBackgroundColor"
              :active-border-color="appearance.activeBorderColor"
              :active-text-color="appearance.activeTextColor"
              :button-size="appearance.buttonSize"
              :font-size="appearance.fontSize"
              :font-family="appearance.fontFamily"
              disabled
            >
              禁用项
            </XRadioButton>
          </div>
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
            <span>类型</span>
            <select v-model="appearance.variant">
              <option value="solid">solid</option>
              <option value="outline">outline</option>
              <option value="ghost">ghost</option>
            </select>
          </label>
          <label>
            <span>排列方向</span>
            <select v-model="appearance.direction">
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
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
            <span>按钮高度</span>
            <input v-model.number="appearance.buttonSize" type="number" min="22" max="64" step="1" />
          </label>
          <label>
            <span>宽度</span>
            <input v-model="appearance.width" type="text" />
          </label>
          <label>
            <span>高度</span>
            <input v-model="appearance.height" type="text" />
          </label>
          <label>
            <span>圆角</span>
            <input v-model.number="appearance.radius" type="number" min="0" max="32" step="1" />
          </label>
          <label>
            <span>字体大小</span>
            <input v-model.number="appearance.fontSize" type="number" min="10" max="32" step="1" />
          </label>
        </template>
        <template #column-3>
          <label>
            <span>按钮颜色</span>
            <input v-model="appearance.buttonColor" type="color" />
          </label>
          <label>
            <span>选中背景色</span>
            <input v-model="appearance.activeBackgroundColor" type="color" />
          </label>
          <label>
            <span>选中边框色</span>
            <input v-model="appearance.activeBorderColor" type="color" />
          </label>
          <label>
            <span>选中文字色</span>
            <input v-model="appearance.activeTextColor" type="color" />
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
