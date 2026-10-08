<script setup lang="ts">
import { XGrid, XLayout } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" height="320px">
    <XLayout
      mode="top-sidebar"
      :full-height="false"
      :sidebar-width="180"
      sidebar-padding="8px 12px"
      content-padding="12px"
    >
      <template #topbar>顶部区域</template>
      <template #sidebar>侧栏区域</template>
      主内容区域
      <template #footer>底部区域</template>
    </XLayout>
  </XGrid>
</template>
