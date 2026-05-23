<script setup lang="ts">
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { reactive } from 'vue'
import { XButton } from './index'
import type { ButtonVariant } from './src/types'
import '../../../styles/index.css'

const state = reactive({
  clickCount: 0
})

const appearance = reactive({
  label: '外观按钮',
  prefix: '前',
  suffix: '后',
  variant: 'solid' as ButtonVariant,
  width: 180,
  height: 40,
  radius: 10,
  activeBackgroundColor: '#0f54d6',
  activeBorderColor: '#0b3d91',
  activeTextColor: '#ffffff',
  loading: false,
  disabled: false
})

function handleClick() {
  state.clickCount += 1
}
</script>

<template>
  <Story title="基础组件/Button 按钮" group="components">
    

    

    

    

    

    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XButton
            v-bind="styleProps"
            :variant="appearance.variant"
            :width="appearance.width"
            :height="appearance.height"
            :radius="appearance.radius"
            :active-background-color="appearance.activeBackgroundColor"
            :active-border-color="appearance.activeBorderColor"
            :active-text-color="appearance.activeTextColor"
            :loading="appearance.loading"
            :disabled="appearance.disabled"
            @click="handleClick"
          >
            <template v-if="appearance.prefix" #prefix>{{ appearance.prefix }}</template>
            {{ appearance.label }}
            <template v-if="appearance.suffix" #suffix>{{ appearance.suffix }}</template>
          </XButton>
        </template>
        <template #column-1>
        </template>
        <template #column-2>
          <label>
            <span>宽度</span>
            <input v-model.number="appearance.width" type="number" min="0" />
          </label>
          <label>
            <span>高度</span>
            <input v-model.number="appearance.height" type="number" min="0" />
          </label>
          <label>
            <span>圆角</span>
            <input v-model.number="appearance.radius" type="number" min="0" />
          </label>
        </template>
        <template #column-3>
          <label>
            <span>激活背景色</span>
            <input v-model="appearance.activeBackgroundColor" type="color" />
          </label>
          <label>
            <span>激活边框色</span>
            <input v-model="appearance.activeBorderColor" type="color" />
          </label>
          <label>
            <span>激活文字色</span>
            <input v-model="appearance.activeTextColor" type="color" />
          </label>
        </template>
        <template #column-4>
          <label class="story-check">
            <input v-model="appearance.loading" type="checkbox" />
            <span>加载中</span>
          </label>
          <label class="story-check">
            <input v-model="appearance.disabled" type="checkbox" />
            <span>禁用</span>
          </label>
        </template>
        <template #interfaces>
          <label>
            <span>默认插槽</span>
            <input v-model="appearance.label" type="text" />
          </label>
          <label>
            <span>prefix 插槽</span>
            <input v-model="appearance.prefix" type="text" />
          </label>
          <label>
            <span>suffix 插槽</span>
            <input v-model="appearance.suffix" type="text" />
          </label>
        </template>
        <template #types>
          <label>
            <span>ButtonVariant</span>
            <select v-model="appearance.variant">
              <option value="solid">solid</option>
              <option value="outline">outline</option>
              <option value="ghost">ghost</option>
            </select>
          </label>
        </template>
        <template #events>
          <label>
            <span>click 事件</span>
            <input :value="state.clickCount" type="number" readonly />
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
