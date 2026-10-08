<script setup lang="ts">
import { ref } from 'vue'
const current = ref('audit')
const items = [
  { value: 'audit', title: '审核中心', description: '12 条待处理审批。', icon: '审', extra: '待办 12' },
  { value: 'order', title: '订单同步', description: '队列运行正常。', icon: '单', extra: '正常' }
]
import { XList } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XList v-model="current" :items="items" />
</template>
