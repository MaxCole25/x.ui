<script setup lang="ts">
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { reactive } from 'vue'
import { XColorPicker } from './index'
import '../../../styles/index.css'

const appearance = reactive({
  disabled: false
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
  <Story title="Form 组件/ColorPicker 颜色选择器" group="components">
    

    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XColorPicker v-bind="styleProps" v-model="sample.color" :disabled="appearance.disabled" />
        </template>
        <template #column-3>
          <label>
            <span>绑定值</span>
            <input v-model="sample.color" type="color" />
          </label>
        </template>
        <template #column-4>
          <label>
            <input v-model="appearance.disabled" type="checkbox" />
            <span>禁用</span>
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 16px;
  padding: 16px;
}
</style>
