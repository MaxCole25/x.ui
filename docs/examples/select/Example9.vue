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
  <XBrick direction="vertical" :gap="12" width="280px">
    <XSelect
      accent-color="#7c3aed"
      border-color="#c4b5fd"
      radius="12px"
      input-background-color="#faf5ff"
      :options="statusOptions"
      placeholder="单组件主题覆盖"
    />
  </XBrick>
</template>
