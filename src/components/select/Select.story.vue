<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import XOption from './src/Option.vue'
import XSelect from './src/Select.vue'

const value = ref('todo')
const multiple = ref(['todo'])
const emptyValue = ref('')
const options = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' },
  { label: '已归档（禁用）', value: 'archived', disabled: true }
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
  <Story title="元素/Select 选择器" group="components">
    <Variant title="基础用法">
      <div style="display: grid; gap: 12px; max-width: 360px">
        <XSelect v-model="value" :options="options" clearable />
        <XSelect v-model="multiple" multiple placeholder="多选状态">
          <XOption label="待处理" value="todo" />
          <XOption label="处理中" value="doing" />
          <XOption label="已完成" value="done" />
        </XSelect>
        <XSelect placeholder="业务主题覆盖" color="#7c3aed" border-color="#c4b5fd" radius="12px" :options="options" />
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div style="display: grid; gap: 12px; max-width: 360px">
        <XSelect v-model="emptyValue" placeholder="空选项列表" :options="[]" clearable />
        <XSelect model-value="todo" :options="options" disabled />
        <XSelect v-model="multiple" multiple clearable :options="options" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XSelect v-bind="styleProps" v-model="sample.select" :options="selectOptions" clearable />
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
