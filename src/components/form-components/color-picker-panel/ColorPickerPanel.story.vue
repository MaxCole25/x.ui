<script setup lang="ts">
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { reactive } from 'vue'
import { XColorPickerPanel } from './index'
import '../../../styles/index.css'

const appearance = reactive({
  colorsText: '#1264f4,#10b981,#f59e0b,#ef4444,#7c3aed,#0891b2'
})

const sample = reactive({
  input: '外观接口预览',
  autocomplete: '上海',
  cascader: [],
  checked: true,
  radio: 'A',
  select: 'vue',
  color: '#1264f4',
  date: '2026-05-12',
  dateTime: '2026-05-12T09:30',
  time: '09:30',
  number: 36
})
</script>

<template>
  <Story title="Form 组件/ColorPickerPanel 颜色选择器面板" group="components">
    

    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XColorPickerPanel v-bind="styleProps" v-model="sample.color" :colors="appearance.colorsText.split(',').map((item) => item.trim()).filter(Boolean)" />
        </template>
        <template #column-1>
          <label>
            <span>颜色列表</span>
            <input v-model="appearance.colorsText" />
          </label>
        </template>
        <template #column-2>
          <label>
            <span>绑定值</span>
            <input v-model="sample.color" />
          </label>
        </template>
        <template #column-3>
          <label>
            <span>颜色输入</span>
            <input v-model="sample.color" type="color" />
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
