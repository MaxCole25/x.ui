<script setup lang="ts">
import { ref } from 'vue'
const active = ref('overview')
const items = ref([
  { name: 'overview', label: '总览', locked: true },
  { name: 'members', label: '成员', closable: true },
  { name: 'settings', label: '设置', disabled: true }
])
import { XTabs } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTabs v-model="active" :items="items" closable>
    <template #pane="{ item }">当前页签：{{ item.label }}</template>
  </XTabs>
</template>
