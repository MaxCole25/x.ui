<script setup lang="ts">
import { ref } from 'vue'
const active = ref('overview')
const items = ref([
  { name: 'overview', label: '总览', locked: true },
  { name: 'members', label: '成员', closable: true },
  { name: 'settings', label: '设置', disabled: true }
])
function moveTab(payload: { source: string | number; target: string | number; position: 'before' | 'after' }) {
  const sourceIndex = items.value.findIndex((item) => item.name === payload.source)
  const targetIndex = items.value.findIndex((item) => item.name === payload.target)
  if (sourceIndex === -1 || targetIndex === -1) return
  const [source] = items.value.splice(sourceIndex, 1)
  const insertIndex = payload.position === 'before' ? targetIndex : targetIndex + 1
  items.value.splice(insertIndex > sourceIndex ? insertIndex - 1 : insertIndex, 0, source)
}
import { XTabs } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTabs v-model="active" :items="items" draggable @reorder="moveTab" />
</template>
