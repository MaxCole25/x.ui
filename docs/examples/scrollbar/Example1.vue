<script setup lang="ts">
import { XGrid, XScrollbar } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="320px">
    <XScrollbar max-height="120px">
      <p>列表项 A</p>
      <p>列表项 B</p>
      <p>列表项 C</p>
      <p>列表项 D</p>
      <p>列表项 E</p>
    </XScrollbar>
  </XGrid>
</template>
