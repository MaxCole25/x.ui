<script setup lang="ts">
import { XBrick, XNotification } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XNotification title="导出完成" message="报表已生成，可以下载。" status="success" :duration="0" />
  </XBrick>
</template>
