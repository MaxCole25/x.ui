<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { key: 'label', label: '名称', minWidth: 180 },
  { key: 'path', label: '路径', minWidth: 220 }
]
const rows = [
  {
    id: 'sales',
    label: '销售',
    path: '/销售',
    children: [
      { id: 'sales-quote', label: '报价表', path: '/auto-pages/bao-jia-biao' },
      { id: 'sales-customer', label: '客户表', path: '/auto-pages/ke-hu-biao' }
    ]
  },
  { id: 'workbench', label: '工作台', path: '/workbench' }
]
const expandedRowKeys = ref<Array<string | number>>(['sales'])
const selectedRowKeys = ref<Array<string | number>>([])
import { XTreeTable } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTreeTable
    v-model:expanded-row-keys="expandedRowKeys"
    v-model:selected-row-keys="selectedRowKeys"
    :data="rows"
    :columns="columns"
    show-selection
    :show-header="false"
  />
</template>
