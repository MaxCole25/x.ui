<script setup lang="ts">
import { ref } from 'vue'
const customerId = ref('u-001')
const customerKeyword = ref('')
const customerOptions = [
  { label: '张三', value: 'u-001' },
  { label: '李四', value: 'u-002' }
]
import { XBrick, XGrid, XText, XAutocomplete } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="280px">
      <XAutocomplete
        v-model="customerId"
        v-model:input-value="customerKeyword"
        :options="customerOptions"
        :value-on-input="false"
        placeholder="请输入ID或名称"
      />
    </XGrid>
    <XText tag="p" variant="muted">当前值：{{ customerId || '暂无' }}，输入文本：{{ customerKeyword || '暂无' }}</XText>
  </XBrick>
</template>
