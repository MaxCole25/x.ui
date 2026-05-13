<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import XCheckbox from './src/Checkbox.vue'

const agreed = ref(true)
const values = ref(['read'])

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
  <Story title="元素/Checkbox 多选框" group="components">
    <Variant title="基础用法">
      <div style="display: grid; gap: 12px">
        <XCheckbox v-model="agreed" label="启用通知" />
        <div style="display: flex; gap: 16px">
          <XCheckbox v-model="values" value="read">读取</XCheckbox>
          <XCheckbox v-model="values" value="write">写入</XCheckbox>
          <XCheckbox v-model="values" value="admin" disabled>管理</XCheckbox>
        </div>
        <XCheckbox v-model="agreed" color="#7c3aed" border-color="#c4b5fd" radius="6px">业务主题</XCheckbox>
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div style="display: grid; gap: 12px; max-width: 360px">
        <XCheckbox v-model="agreed" indeterminate>半选状态</XCheckbox>
        <XCheckbox :model-value="true" disabled>禁用已选</XCheckbox>
        <XCheckbox :model-value="false" disabled>禁用未选</XCheckbox>
        <XCheckbox v-model="agreed">很长很长很长很长的复选框文案用于检查换行和对齐</XCheckbox>
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XCheckbox v-bind="styleProps" v-model="sample.checked">多选项</XCheckbox>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
