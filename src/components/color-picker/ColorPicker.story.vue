<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import { XColorPicker } from './index'
import '../../styles/index.css'

const color = ref('#1264f4')
const disabledColor = ref('#94a3b8')

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

const selectOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' }
]

const autocompleteOptions = [
  { label: '上海', value: '上海' },
  { label: '深圳', value: '深圳' },
  { label: '杭州', value: '杭州' }
]
</script>

<template>
  <Story title="元素/ColorPicker 颜色选择器" group="components">
    <Variant title="基础用法">
      <div class="story-stack">
        <XColorPicker v-model="color" />
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div class="story-stack">
        <XColorPicker v-model="disabledColor" disabled />
        <XColorPicker model-value="#ffffff" />
        <XColorPicker model-value="#000000" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XColorPicker v-bind="styleProps" v-model="sample.color" />
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
