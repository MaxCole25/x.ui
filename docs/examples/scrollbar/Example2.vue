<script setup lang="ts">
import { XGrid, XScrollbar } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="320px">
    <XScrollbar height="140px" background-color="#f8fafc" border-color="#d8e2e8" :border-width="1">
      <p v-for="index in 8" :key="index">固定高度内容 {{ index }}</p>
    </XScrollbar>
  </XGrid>
</template>
