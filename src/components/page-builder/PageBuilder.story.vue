<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { createDefaultPageBuilderSchema } from './src/schema'
import type { PageBuilderSchema } from './src/types'
import '../../styles/index.css'

const XPageBuilder = defineAsyncComponent(() => import('./index').then((module) => module.default))
const schema = ref<PageBuilderSchema>(createDefaultPageBuilderSchema())
const exportCount = ref(0)
const lastExport = ref('')

const nodeCount = computed(() => {
  function count(nodes: PageBuilderSchema['nodes']): number {
    return nodes.reduce((total, node) => total + 1 + count(node.children ?? []), 0)
  }

  return count(schema.value.nodes)
})

function handleExport(value: PageBuilderSchema) {
  exportCount.value += 1
  lastExport.value = JSON.stringify(value, null, 2)
}
</script>

<template>
  <Story title="组件/PageBuilder 页面构建器" group="components">
    <Variant title="编辑布局 JSON">
      <div class="page-builder-story">
        <div class="page-builder-story__meta">
          <span>节点数：{{ nodeCount }}</span>
          <span>输出次数：{{ exportCount }}</span>
        </div>
        <XPageBuilder v-model="schema" @export-json="handleExport" />
        <details class="page-builder-story__json">
          <summary>最近一次输出 JSON</summary>
          <pre>{{ lastExport || JSON.stringify(schema, null, 2) }}</pre>
        </details>
      </div>
    </Variant>

    <Variant title="只读预览">
      <XPageBuilder v-model="schema" readonly />
    </Variant>
  </Story>
</template>

<style scoped>
.page-builder-story {
  display: grid;
  gap: 12px;
}

.page-builder-story__meta {
  align-items: center;
  color: #475569;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 12px;
}

.page-builder-story__json {
  background: #0f172a;
  border-radius: 8px;
  color: #e2e8f0;
  padding: 12px;
}

.page-builder-story__json summary {
  cursor: pointer;
  font-weight: 700;
}

.page-builder-story__json pre {
  margin: 12px 0 0;
  max-height: 360px;
  overflow: auto;
}
</style>
