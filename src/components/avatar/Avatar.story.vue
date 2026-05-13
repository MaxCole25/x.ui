<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { XAvatar } from './index'
import '../../styles/index.css'

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
  <Story title="元素/Avatar 头像" group="components">
    <Variant title="尺寸">
      <div class="story-row">
        <XAvatar name="UX" size="sm" />
        <XAvatar name="UX" />
        <XAvatar name="UX" size="lg" />
      </div>
    </Variant>

    <Variant title="形状">
      <div class="story-row">
        <XAvatar name="王小明" />
        <XAvatar name="王小明" shape="square" color="#10b981" />
      </div>
    </Variant>

    <Variant title="边框">
      <div class="story-row">
        <XAvatar name="UX" border-width="2px" />
        <XAvatar name="产品" size="lg" color="#10b981" :border-width="3" border-color="#0f172a" />
        <XAvatar name="设计" shape="square" color="#7c3aed" border-width="4px" border-color="#f59e0b" />
      </div>
    </Variant>

    <Variant title="图片与兜底">
      <div class="story-row">
        <XAvatar src="https://example.com/avatar-not-found.png" name="加载失败" />
        <XAvatar name="" color="#64748b" />
        <XAvatar name="很长的中文姓名" shape="square" color="#7c3aed" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XAvatar v-bind="styleProps" name="演示" />
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-row {
  align-items: center;
  display: flex;
  gap: 14px;
  padding: 16px;
}
</style>
