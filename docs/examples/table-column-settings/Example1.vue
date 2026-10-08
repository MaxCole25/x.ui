<script setup lang="ts">
import { XBrick, XTableColumnSettings, XTable } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
import type { TableColumnSetting } from '@x-soft88/x-ui'
const columns = [{ key: 'name', label: '名称' }, { key: 'status', label: '状态' }]
const rows = [{ id: 1, name: '需求评审', status: '进行中' }]
const columnSettings = ref<TableColumnSetting[]>([])
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XTableColumnSettings v-model="columnSettings" :columns="columns" />
    <XTable :columns="columns" :data="rows" :column-settings="columnSettings" row-key="id" />
  </XBrick>
</template>
