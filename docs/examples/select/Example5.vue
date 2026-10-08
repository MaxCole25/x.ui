<script setup lang="ts">
import { ref } from 'vue'
const remoteStatus = ref('')
const statusFieldNames = { label: 'name', value: 'id' }
function queryStatus() {
  return [
    { name: '待处理', id: 'todo' },
    { name: '处理中', id: 'doing' },
    { name: '已完成', id: 'done' }
  ]
}
import { XBrick, XText, XSelect } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="280px">
    <XSelect
      v-model="remoteStatus"
      remote
      :field-names="statusFieldNames"
      :remote-method="queryStatus"
      placeholder="展开后请求服务端"
    />
    <XText tag="p" variant="muted">当前值：{{ remoteStatus }}</XText>
  </XBrick>
</template>
