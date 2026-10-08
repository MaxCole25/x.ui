<script setup lang="ts">
import { XBrick, XUpload } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XUpload button-text="选择附件" tip="支持拖拽或点击选择" />
  </XBrick>
</template>
