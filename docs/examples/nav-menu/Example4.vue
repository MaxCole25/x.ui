<script setup lang="ts">
import { ref } from 'vue'
const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'settings', label: '设置' }
]
const activeKey = ref('dashboard')
import { XGrid, XText, XNavMenu } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid
    :columns="1"
    width="240px"
    height="260px"
    rows="48px minmax(0, 1fr)"
    radius="6px"
    border-width="1px"
    border-style="solid"
    border-color="var(--x-color-border)"
  >
    <XText vertical-align="middle" height="48px" padding="0 16px" font-weight="600">@x-soft88/x-ui Admin</XText>
    <XNavMenu
      :items="menuItems"
      :active-key="activeKey"
      mode="vertical"
      scrollable
      max-height="212px"
      accordion
      @select="(key) => { activeKey = key }"
    />
  </XGrid>
</template>
