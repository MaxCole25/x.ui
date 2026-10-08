<script setup lang="ts">
import { XBrick, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XButton>主要按钮</XButton>
    <XButton variant="outline">描边按钮</XButton>
    <XButton variant="ghost">文本按钮</XButton>
  </XBrick>
</template>
