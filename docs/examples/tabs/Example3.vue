<script setup lang="ts">
import { ref } from 'vue'
const active = ref('overview')
const items = ref([
  { name: 'overview', label: '总览', locked: true },
  { name: 'members', label: '成员', closable: true },
  { name: 'settings', label: '设置', disabled: true }
])
function createTab() {
  const nextIndex = items.value.length + 1
  const name = 'tab-' + nextIndex
  items.value.push({ name, label: '页签 ' + nextIndex, closable: true })
  active.value = name
}
function removeTab(name: string | number) {
  const index = items.value.findIndex((item) => item.name === name)
  if (index === -1) return
  items.value.splice(index, 1)
  if (active.value === name) {
    active.value = items.value[index - 1]?.name ?? items.value[0]?.name ?? ''
  }
}
import { XTabs } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTabs v-model="active" :items="items" addable closable @tab-add="createTab" @tab-remove="removeTab" />
</template>
