<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import { XSlider } from './index'
import '../../styles/index.css'

const value = ref(56)
const small = ref(5)

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
  <Story title="元素/Slider 滑块" group="components">
    <Variant title="基础用法">
      <div class="story-stack">
        <XSlider v-model="value" show-value />
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div class="story-stack">
        <XSlider v-model="small" :min="0" :max="10" show-value />
        <XSlider :model-value="0" show-value disabled />
        <XSlider :model-value="100" show-value />
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XSlider v-bind="styleProps" v-model="sample.number" show-value />
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 16px;
  padding: 16px;
  width: 320px;
}
</style>
