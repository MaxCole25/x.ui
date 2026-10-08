<script setup lang="ts">
import { XBrick, XDivider } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <span>文本</span>
    <XDivider direction="vertical" />
    <span>文本</span>
  </XBrick>
</template>
