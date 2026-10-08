<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]
const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
import { XTable } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTable :columns="columns" :data="rows" row-key="id" />
</template>
