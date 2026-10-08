<script setup lang="ts">
const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
import { XGrid, XForm, XFormItem, XInput, XSelect } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="min(100%, 520px)">
    <XForm :font-size="10" disabled>
      <XFormItem label="用户名">
        <XInput model-value="整表禁用" />
      </XFormItem>
      <XFormItem label="状态">
        <XSelect model-value="todo" :options="statusOptions" />
      </XFormItem>
    </XForm>
  </XGrid>
</template>
