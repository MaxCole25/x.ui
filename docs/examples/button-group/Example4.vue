<script setup lang="ts">
import { XBrick, XButtonGroup, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XButtonGroup width="360px">
      <XButton>保存</XButton>
      <XButton variant="outline">预览</XButton>
      <XButton variant="outline" disabled>发布</XButton>
    </XButtonGroup>
  </XBrick>
</template>
