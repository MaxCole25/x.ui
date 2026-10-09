<script setup lang="ts">
const iconNames = ['home', 'user', 'search', 'setting', 'edit', 'save', 'copy', 'download', 'upload', 'calendar', 'check', 'refresh']
const icons = Array.from({ length: 24 }, (_, id) => ({
  id,
  name: iconNames[id % iconNames.length],
  label: `入口 ${id + 1}`
}))
import { XText, XGrid, XFlow, XIcon } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XFlow
    :items="icons"
    item-key="id"
    item-width="88px"
    :gap="10"
    padding="12px"
    background-color="#f8fafc"
    border-color="#d8e2e8"
    :border-width="1"
    radius="8px"
    item-background-color="#ffffff"
    item-border-color="#cbd5e1"
    :item-border-width="1"
    item-radius="6px"
    item-padding="10px"
  >
    <template #default="{ item }">
      <XGrid :columns="1" :gap="6" justify-items="center" padding="8px 4px">
        <XIcon :name="item.name" :icon-size="24" />
        <XText variant="muted" :font-size="12" truncated width="100%">{{ item.label }}</XText>
      </XGrid>
    </template>
  </XFlow>
</template>
