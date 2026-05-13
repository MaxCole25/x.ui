<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { XScrollbar } from './index'
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
  <Story title="元素/Scrollbar 滚动条" group="components">
    <Variant title="基础用法">
      <XScrollbar max-height="120px" class="story-scroll">
        <p v-for="item in 12" :key="item">列表项 {{ item }}</p>
      </XScrollbar>
    </Variant>

    <Variant title="横向与空态">
      <div class="story-stack">
        <XScrollbar class="story-scroll story-scroll--wide">
          <p>这是一段很长很长很长很长很长很长很长很长很长的横向内容，用于检查横向滚动条。</p>
        </XScrollbar>
        <XScrollbar max-height="80px" class="story-scroll">
          <p class="story-empty">暂无数据</p>
        </XScrollbar>
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XScrollbar v-bind="styleProps" height="120px" style="width: 280px"><div style="height: 220px; padding: 12px">可滚动内容<br />外观接口预览<br />继续滚动查看内容</div></XScrollbar>
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

.story-scroll {
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  padding: 12px;
  width: 260px;
}

.story-scroll--wide {
  white-space: nowrap;
}

.story-scroll p {
  margin: 0 0 10px;
}

.story-empty {
  color: #606b7d;
}
</style>
