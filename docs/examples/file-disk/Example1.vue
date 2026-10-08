<script setup lang="ts">
import { ref } from 'vue'
const path = ref('/')
const entries = [
  { id: '1', name: '设计稿', type: 'folder' as const },
  { id: '2', name: '需求说明.md', type: 'file' as const, size: 2048 }
]
import { XGrid, XFileDisk } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" height="420px">
    <XFileDisk
      v-model="path"
      title="销售单附件"
      :entries="entries"
      :permissions="{ read: true, write: true, delete: true, view: true }"
    />
  </XGrid>
</template>
