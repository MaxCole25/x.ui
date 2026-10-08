<script setup lang="ts">
import { XBrick, XButtonGroup, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XButtonGroup>
      <XButton variant="outline">上一项</XButton>
      <XButton variant="outline">当前项</XButton>
      <XButton variant="outline">下一项</XButton>
    </XButtonGroup>
  </XBrick>
</template>
