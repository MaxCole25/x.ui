<script setup lang="ts">
import { XScrollingText } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XScrollingText
    display-direction="horizontal"
    flow-direction="right"
    width="320px"
    :speed="60"
    font-family="Arial, sans-serif"
    :font-size="14"
    text-color="#ffffff"
    background-color="#1264f4"
  >@x-soft88/x-ui 支持滚动速度、字体样式、字体大小、字体颜色和背景色配置。</XScrollingText>
</template>
