<script setup lang="ts">
import { XGrid, XGridItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="4" :responsive-columns="{ sm: 1, md: 2, lg: 3 }" :gap="10">
    <XGridItem v-for="index in 8" :key="index">响应式格子 {{ index }}</XGridItem>
  </XGrid>
</template>
