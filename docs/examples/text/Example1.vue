<script setup lang="ts">
import { XBrick, XText } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XText>正文文本</XText>
    <XText variant="title">标题文本</XText>
    <XText variant="muted">辅助文本</XText>
  </XBrick>
</template>
