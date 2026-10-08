<script setup lang="ts">
import { XBrick, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XButton loading>加载中</XButton>
    <XButton disabled>禁用状态</XButton>
  </XBrick>
</template>
