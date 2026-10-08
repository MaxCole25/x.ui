<script setup lang="ts">
import { XBrick, XAlert } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XAlert title="保存成功" description="数据已写入草稿。" status="success" show-icon />
  </XBrick>
</template>
