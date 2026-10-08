<script setup lang="ts">
import { XBrick, XBadge, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XBadge :model-value="12">
      <XButton>消息</XButton>
    </XBadge>
  </XBrick>
</template>
