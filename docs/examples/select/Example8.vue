<script setup lang="ts">
const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
import { XBrick, XSelect } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="260px">
    <XSelect :font-size="10" :options="statusOptions" placeholder="小尺寸" />
    <XSelect :options="statusOptions" placeholder="默认尺寸" />
    <XSelect :font-size="14" :options="statusOptions" placeholder="大尺寸" />
  </XBrick>
</template>
