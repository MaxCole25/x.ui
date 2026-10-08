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
    <p>服务调用会把加载层挂载到指定目标或全屏区域。</p>
    <XLoading model-value text="提交中" background-color="rgba(255, 255, 255, 0.68)" />
  </XGroupContainer>
</template>
