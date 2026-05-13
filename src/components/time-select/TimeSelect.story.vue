<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import { XTimeSelect } from './index'
import '../../styles/index.css'

const time = ref('09:30')
const emptyTime = ref('')

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
  <Story title="元素/TimeSelect 时间选择" group="components">
    <Variant title="基础用法">
      <div class="story-stack">
        <XTimeSelect v-model="time" start="09:00" end="18:00" :step-minutes="30" />
        <span>当前时间：{{ time }}</span>
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div class="story-stack">
        <XTimeSelect v-model="emptyTime" start="09:00" end="10:00" :step-minutes="15" placeholder="请选择短时段" />
        <XTimeSelect model-value="09:30" start="09:00" end="10:00" disabled />
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XTimeSelect v-bind="styleProps" v-model="sample.time" />
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 12px;
  padding: 16px;
}
</style>
