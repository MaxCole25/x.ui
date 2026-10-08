<script setup lang="ts">
const treeData = [
  { id: 'docs', label: '文档', children: [{ id: 'guide', label: '指南' }] },
  { id: 'components', label: '组件' }
]
import { XGrid, XTree } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="320px">
    <XTree
      :tree-data="treeData"
      :context-menu-items="({ node }) => [
 { action: 'new-root', label: '增加根节点' },
 { action: 'new-child', label: '新建节点', disabled: !node },
 { action: 'delete-node', label: '删除节点', disabled: !node, tone: 'danger' }
 ]"
    />
  </XGrid>
</template>
