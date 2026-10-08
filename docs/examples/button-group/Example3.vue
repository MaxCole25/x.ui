<script setup lang="ts">
import { XBrick, XButtonGroup, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XButtonGroup :radius="12" width="360px">
      <XButton variant="outline">日</XButton>
      <XButton variant="outline">周</XButton>
      <XButton variant="outline">月</XButton>
    </XButtonGroup>
  </XBrick>
</template>
