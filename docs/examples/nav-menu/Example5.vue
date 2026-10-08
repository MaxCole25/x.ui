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
    min-height="48px"
    padding="10px"
    border-width="1px"
    border-style="dashed"
    border-color="var(--x-color-border)"
  >
    <XNavMenu :items="menuItems" :active-key="activeKey" mode="vertical" hidden />
    <XText tag="span" variant="muted">菜单已隐藏，但组件状态仍保留。</XText>
  </XGrid>
</template>
