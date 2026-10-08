<script setup lang="ts">
import { computed, ref } from 'vue'
import { XGrid, XFileDisk } from '@x-soft88/x-ui'
import type { FileDiskItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

const path = ref('/设计稿')
const viewMode = ref<'list' | 'grid'>('list')
const directories: Record<string, FileDiskItem[]> = {
  '/': [
    { id: 'design', name: '设计稿', type: 'folder' }
  ],
  '/设计稿': [
    { id: 'requirements', name: '需求说明.md', type: 'file', size: 2048 },
    { id: 'draft', name: '页面草稿.pdf', type: 'file', size: 128000 }
  ]
}
const entries = computed(() => directories[path.value] ?? [])
</script>

<template>
  <XGrid :columns="1" height="300px">
    <XFileDisk
      v-model="path"
      v-model:view-mode="viewMode"
      :entries="entries"
      :enable-minimize="true"
      :permissions="{ read: true, write: false, delete: false, view: true }"
    />
  </XGrid>
</template>
