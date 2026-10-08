<script setup lang="ts">
import { ref } from 'vue'
const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'settings', label: '设置' }
]
const activeKey = ref('dashboard')
import { XGrid, XNavMenu } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="240px">
    <XNavMenu
      :items="menuItems"
      :active-key="activeKey"
      mode="vertical"
      @select="(key) => { activeKey = key }"
    />
  </XGrid>
</template>
