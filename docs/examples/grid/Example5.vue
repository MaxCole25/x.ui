<script setup lang="ts">
import { XGrid, XGridItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid
    :columns="3"
    :gap="12"
    background-color="#f8fafc"
    border-color="#94a3b8"
    :border-width="1"
    radius="8px"
    padding="12px"
  >
    <XGridItem
      v-for="index in 9"
      :key="index"
      background-color="#ffffff"
      border-color="#d8e2e8"
      :border-width="1"
      radius="6px"
      padding="12px"
    >{{ index }}</XGridItem>
  </XGrid>
</template>
