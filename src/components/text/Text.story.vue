<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { XText } from './index'
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
  <Story title="元素/Text 文本" group="components">
    <Variant title="基础用法">
      <div class="story-stack">
        <XText size="title">标题文本 Title</XText>
        <XText>正文文本用于说明内容，支持自然换行。</XText>
        <XText type="muted">辅助文本用于弱提示。</XText>
      </div>
    </Variant>

    <Variant title="语义色">
      <div class="story-row">
        <XText type="primary">主要</XText>
        <XText type="success">成功</XText>
        <XText type="warning">警告</XText>
        <XText type="danger">危险</XText>
      </div>
    </Variant>

    <Variant title="边界文本">
      <div class="story-stack" style="max-width: 260px">
        <XText truncated>这是一段很长很长很长很长很长的单行截断文本</XText>
        <XText tag="p">这是一段较长的段落文本，用于检查正文在窄容器内的自然换行和行高。</XText>
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XText v-bind="styleProps" tag="span">可调整外观的文本</XText>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 10px;
  padding: 16px;
}

.story-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}
</style>
