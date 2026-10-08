<script setup lang="ts">
import { XGroupContainer, XTag } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGroupContainer title-position="top-left">
    <template #title>
      <span>高级设置</span>
      <XTag :font-size="10">可选</XTag>
    </template>
    分组内容
  </XGroupContainer>
</template>
