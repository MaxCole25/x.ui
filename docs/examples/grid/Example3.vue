<script setup lang="ts">
import { XGrid, XGridItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="4" :gap="10">
    <XGridItem :col-span="2" background-color="#e0ecff">跨两列</XGridItem>
    <XGridItem :row-span="2" background-color="#f0fdf4">跨两行</XGridItem>
    <XGridItem>普通格子</XGridItem>
    <XGridItem column="1 / 3">指定列线</XGridItem>
  </XGrid>
</template>
