<script setup lang="ts">
import { ref } from 'vue'
const selectStatus = ref('todo')
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
    <XSelect v-model="selectStatus" prefix="状态" suffix="必选" status="success" :options="statusOptions" />
    <XSelect v-model="selectStatus" prefix="负责人" suffix="只读" readonly :options="statusOptions" />
  </XBrick>
</template>
