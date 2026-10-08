<script setup lang="ts">
import { XTools } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const toolsHorizontalItems = [
  { key: 'add', name: '添加行', icon: 'add-line' },
  { key: 'remove', name: '删除行', icon: 'delete-bin-line' },
  { key: 'import', name: '导入', icon: 'upload-2-line' },
  { key: 'export', name: '导出', icon: 'download-2-line' },
  { key: 'refresh', name: '刷新', icon: 'refresh-line' }
]
</script>

<template>
  <XTools :items="toolsHorizontalItems" :font-size="10" item-layout="horizontal" />
</template>
