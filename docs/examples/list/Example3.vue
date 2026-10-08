<script setup lang="ts">
import { XList } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const current = ref('notice-1')
const items = [
  { value: 'notice-1', title: '系统通知', description: '你的申请已经进入复核流程，请留意后续状态变化。', icon: '通', extra: '09:12' },
  { value: 'notice-2', title: '处理记录', description: '已提交补充材料，等待业务方确认。', icon: '记', extra: '09:18' },
  { value: 'notice-3', title: '风险提醒', description: '当前对象命中高优先级策略，需要补充说明后继续流转。', icon: '险', extra: '09:24' },
  { value: 'notice-4', title: '操作完成', description: '复核结果已同步到当前列表。', icon: '完', extra: '09:30' }
]
</script>

<template>
  <XList v-model="current" :items="items" :bordered="false" />
</template>
