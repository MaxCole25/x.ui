<script setup lang="ts">
import { XBrick, XPopconfirm, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XPopconfirm content="删除后不可恢复" :teleported="false">
      <XButton>删除</XButton>
    </XPopconfirm>
  </XBrick>
</template>
