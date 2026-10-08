<script setup lang="ts">
import { ref } from 'vue'
const treeData = [
  { id: 'docs', label: '文档', children: [{ id: 'guide', label: '指南' }] },
  { id: 'components', label: '组件' }
]
const currentKey = ref('docs')
import { XGrid, XTree } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="320px">
    <XTree
      :tree-data="treeData"
      :current-tree-key="currentKey"
      @nodeClick="(node) => { currentKey = String(node.id) }"
    />
  </XGrid>
</template>
