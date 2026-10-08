<script setup lang="ts">
import { XGrid, XGridItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="3" :gap="8">
    <XGridItem>一</XGridItem>
    <XGridItem>二</XGridItem>
    <XGridItem>三</XGridItem>
  </XGrid>
</template>
