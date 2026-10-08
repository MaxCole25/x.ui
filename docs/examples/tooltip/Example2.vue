<script setup lang="ts">
import { XTooltip, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTooltip
    content="自定义提示"
    trigger="click"
    background-color="#12243a"
    text-color="#eef4fb"
    border-color="#203247"
    border-width="1px"
  >
    <XButton>查看提示</XButton>
  </XTooltip>
</template>
