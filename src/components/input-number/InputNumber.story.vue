<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import { XInputNumber } from './index'
import '../../styles/index.css'

const value = ref(12)
const empty = ref()

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
  <Story title="元素/InputNumber 数字输入框" group="components">
    <Variant title="基础用法">
      <div class="story-stack">
        <XInputNumber v-model="value" :min="0" :max="99" />
        <span>当前值：{{ value }}</span>
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div class="story-stack">
        <XInputNumber v-model="empty" placeholder="空值" />
        <XInputNumber :model-value="0" :min="0" :max="10" disabled />
        <XInputNumber :model-value="8" :min="0" :max="10" readonly />
        <XInputNumber :model-value="99" size="lg" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XInputNumber v-bind="styleProps" v-model="sample.number" />
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
