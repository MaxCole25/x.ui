<script setup lang="ts">
const entries = [
  { id: '1', name: '设计稿', type: 'folder' as const },
  { id: '2', name: '需求说明.md', type: 'file' as const, size: 2048 }
]
import { XGrid, XFileDisk } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" height="360px">
    <XFileDisk :entries="entries" :permissions="{ read: true, write: false, delete: false, view: true }" />
  </XGrid>
</template>
