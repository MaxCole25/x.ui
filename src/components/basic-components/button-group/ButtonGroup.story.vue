<script setup lang="ts">
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { reactive } from 'vue'
import { XButton } from '../button'
import { XButtonGroup } from './index'
import type { ButtonGroupDirection } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  direction: 'horizontal' as ButtonGroupDirection,
  width: 360,
  height: '',
  radius: 10,
  borderColor: '#1264f4',
  backgroundColor: '#ffffff',
  textColor: '#1264f4'
})
</script>

<template>
  <Story title="基础组件/ButtonGroup 按钮组" group="components">
    

    

    

    

    <Variant title="外观接口">
      <ElementStylePlayground :sample-count="3">
        <template #default="styleProps">
          <XButtonGroup
            v-bind="styleProps"
            :direction="appearance.direction"
            :width="appearance.width"
            :height="appearance.height || undefined"
            :radius="appearance.radius"
            :border-color="appearance.borderColor"
            :background-color="appearance.backgroundColor"
            :text-color="appearance.textColor"
          >
            <XButton variant="outline">左侧</XButton>
            <XButton variant="outline">中间</XButton>
            <XButton variant="outline">右侧</XButton>
          </XButtonGroup>
        </template>
        <template #column-1>
          <label>
            <span>排列方向</span>
            <select v-model="appearance.direction">
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </label>
        </template>
        <template #column-2>
          <label>
            <span>宽度</span>
            <input v-model.number="appearance.width" type="number" min="0" />
          </label>
          <label>
            <span>高度</span>
            <input v-model="appearance.height" type="text" />
          </label>
          <label>
            <span>圆角</span>
            <input v-model.number="appearance.radius" type="number" min="0" />
          </label>
        </template>
        <template #column-3>
          <label>
            <span>边框色</span>
            <input v-model="appearance.borderColor" type="color" />
          </label>
          <label>
            <span>背景色</span>
            <input v-model="appearance.backgroundColor" type="color" />
          </label>
          <label>
            <span>文字色</span>
            <input v-model="appearance.textColor" type="color" />
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
