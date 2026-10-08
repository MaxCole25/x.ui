<script setup lang="ts">
const savedRows = ref<DataTableSettingsRow[]>([])
const feedback = ref('尚未保存')
const tableSettingsAdapter: DataTableSettingsAdapter = {
  loadTables: () => [{ tableKey: 'tasks', label: '任务表' }],
  loadColumns: () => [{ key: 'name', label: '名称', type: 'text' }, { key: 'status', label: '状态', type: 'text' }],
  loadSettings: () => savedRows.value,
  saveSettings: (_table, rows) => { savedRows.value = rows.map(row => ({ ...row })); feedback.value = '已保存 ' + rows.length + ' 列设置' }
}
import { XGrid, XDataTableSettings } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
import type { DataTableSettingsAdapter, DataTableSettingsRow } from '@x-soft88/x-ui'
</script>

<template>
  <XGrid :columns="1" height="420px">
    <XDataTableSettings :adapter="tableSettingsAdapter" height="100%" />
  </XGrid>
  <p role="status">{{ feedback }}</p>
</template>
