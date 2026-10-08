<script setup lang="ts">
import { XGroupContainer, XLoading } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGroupContainer
    border-style="dashed"
    height="120px"
    radius="6px"
    padding="16px"
    border-width="1px"
    border-color="var(--x-color-border)"
  >
    <p>正在加载的数据区域</p>
    <XLoading model-value text="加载中" />
  </XGroupContainer>
</template>
