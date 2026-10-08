<script setup lang="ts">
import { XBrick, XButtonGroup, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XButtonGroup direction="vertical" width="160px">
      <XButton variant="outline">创建</XButton>
      <XButton variant="outline">复制</XButton>
      <XButton variant="outline">删除</XButton>
    </XButtonGroup>
  </XBrick>
</template>
