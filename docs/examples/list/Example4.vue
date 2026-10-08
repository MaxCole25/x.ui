<script setup lang="ts">
import { XList } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const lazyCurrent = ref('order')
const loading = ref(false)
const finished = ref(false)
const loadCount = ref(0)
const listItems = [
  { value: 'audit', title: '审核中心', description: '12 条待处理审批，包含合同和付款申请。', icon: '审', extra: '待办 12' },
  { value: 'order', title: '订单同步', description: '最近同步于 09:30，队列运行正常。', icon: '单', extra: '正常' },
  { value: 'risk', title: '风险提醒', description: '命中 3 条高优先级策略，建议尽快复核。', icon: '险', extra: '高' },
  { value: 'archive', title: '归档记录', description: '当前账号暂无归档权限。', icon: '档', extra: '禁用', disabled: true }
]
const lazyItems = ref([...listItems])
function loadMore() {
  if (loading.value || finished.value) return
  loading.value = true
  window.setTimeout(() => {
    loadCount.value += 1
    lazyItems.value = [
      ...lazyItems.value,
      { value: `more-${loadCount.value}`, title: `追加信息 ${loadCount.value}`, description: '父组件请求完成后追加到 items。', icon: '新', extra: '新增' }
    ]
    loading.value = false
    finished.value = loadCount.value >= 3
  }, 600)
}
</script>

<template>
  <XList
    v-model="lazyCurrent"
    :items="lazyItems"
    height="220px"
    :loading="loading"
    :finished="finished"
    @load-more="loadMore"
  />
</template>
