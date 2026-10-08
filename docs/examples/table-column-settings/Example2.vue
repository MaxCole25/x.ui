<script setup lang="ts">
import { XIcon, XButton, XTableColumnSettings } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
import type { TableColumnSetting } from '@x-soft88/x-ui'
const columns = [{ key: 'name', label: '名称' }, { key: 'status', label: '状态' }]
const columnSettings = ref<TableColumnSetting[]>([])
</script>

<template>
  <XTableColumnSettings v-model="columnSettings" :columns="columns">
    <template #trigger="{ open, disabled }">
      <XButton
        type="button"
        :disabled="disabled"
        aria-label="列设置"
        title="列设置"
        @click="open"
        :width="32"
        :height="32"
        :padding="0"
      >
        <XIcon name="settings-3-line" :font-size="18" />
      </XButton>
    </template>
  </XTableColumnSettings>
</template>
