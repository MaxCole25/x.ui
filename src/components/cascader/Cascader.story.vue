<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import { XCascader } from './index'
import '../../styles/index.css'

const value = ref(['zhejiang', 'hangzhou'])
const emptyValue = ref([])
const options = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      { label: '杭州', value: 'hangzhou' },
      { label: '宁波', value: 'ningbo' },
      { label: '绍兴（禁用）', value: 'shaoxing', disabled: true }
    ]
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [{ label: '南京', value: 'nanjing' }]
  }
]

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
  <Story title="元素/Cascader 级联选择器" group="components">
    <Variant title="基础用法">
      <div class="story-stack">
        <XCascader v-model="value" :options="options" />
        <span>当前值：{{ value.join(' / ') }}</span>
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div class="story-stack">
        <XCascader v-model="emptyValue" :options="options" placeholder="请选择省市" />
        <XCascader :model-value="['zhejiang', 'hangzhou']" :options="options" disabled />
        <XCascader :model-value="[]" :options="[]" placeholder="空数据" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XCascader v-bind="styleProps" v-model="sample.cascader" :options="options" />
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 12px;
  min-height: 220px;
  padding: 16px;
}
</style>
