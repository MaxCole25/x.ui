<script setup lang="ts">
import { XGrid, XLayout } from '@x-soft88/x-ui'
import { ref } from 'vue'
import '@x-soft88/x-ui/style.css'
const sidebarCollapsed = ref(false)
</script>

<template>
  <XGrid :columns="1" height="300px">
    <XLayout mode="sidebar-top" :full-height="false" :sidebar-width="160" :sidebar-collapsed-width="0" enable-sidebar-edge-toggle v-model:sidebar-collapsed="sidebarCollapsed">
      <template #topbar>顶部区域</template>
      <template #sidebar>贯穿侧栏</template>
      内容区域
      <template #footer>底部区域</template>
    </XLayout>
  </XGrid>
</template>
