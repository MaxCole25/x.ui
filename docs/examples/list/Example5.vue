<script setup lang="ts">
import { ref } from 'vue'
const current = ref('audit')
const items = ref<ListItem[]>([
  { value: 'audit', title: '审核中心', description: '12 条待处理审批。', icon: '审', extra: '待办 12' },
  { value: 'order', title: '订单同步', description: '队列运行正常。', icon: '单', extra: '正常' },
  { value: 'risk', title: '风险提醒', description: '命中 3 条高优先级策略。', icon: '险', extra: '高' }
])
function handleItemReorder(payload: ListItemReorderPayload) {
  items.value = payload.items
}
import { XList } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import type { ListItem, ListItemReorderPayload } from '@x-soft88/x-ui'
</script>

<template>
  <XList v-model="current" draggable :items="items" @item-reorder="handleItemReorder" />
</template>
