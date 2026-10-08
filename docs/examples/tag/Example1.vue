<script setup lang="ts">
import { XBrick, XTag } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XTag>默认标签</XTag>
    <XTag variant="success" closable>成功</XTag>
  </XBrick>
</template>
