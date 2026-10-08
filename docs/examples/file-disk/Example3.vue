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
    <XFileDisk
      :entries="entries"
      background-color="#0f172a"
      text-color="#e2e8f0"
      muted-text-color="#94a3b8"
      border-color="#334155"
      header-background-color="#111827"
      toolbar-background-color="#1e293b"
      item-background-color="#111827"
      item-hover-background-color="#1e3a5f"
      item-active-background-color="#155e75"
      item-active-text-color="#f8fafc"
      icon-color="#cbd5e1"
      active-icon-color="#67e8f9"
      empty-background-color="#111827"
      drag-over-background-color="rgba(103, 232, 249, 0.14)"
    />
  </XGrid>
</template>
