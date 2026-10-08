<script setup lang="ts">
import { XBrick, XPopover, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XPopover content="这里展示更多字段说明" :teleported="false">
      <XButton>查看说明</XButton>
    </XPopover>
  </XBrick>
</template>
