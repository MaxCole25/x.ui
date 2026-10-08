<script setup lang="ts">
import { ref } from 'vue'
const selectClear = ref('todo')
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
    <XSelect v-model="selectClear" :options="statusOptions" clearable />
    <XSelect v-model="selectClear" :options="statusOptions" readonly clearable />
    <XSelect :options="statusOptions" disabled placeholder="禁用状态" />
  </XBrick>
</template>
