<script setup lang="ts">
const iconNames = ['home', 'user', 'search', 'setting', 'edit', 'save', 'copy', 'download', 'upload', 'calendar', 'check', 'refresh']
const icons = Array.from({ length: 240 }, (_, id) => ({
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
    item-width="72px"
    height="260px"
    :style="{ gridAutoRows: '84px' }"
    :gap="8"
    :lazy="true"
    :initial-count="24"
    :load-count="24"
  >
    <template #default="{ item }">
      <XGrid :columns="1" :gap="6" justify-items="center" padding="8px 4px">
        <XIcon :name="item.name" :icon-size="24" />
        <XText variant="muted" :font-size="12" truncated width="100%">{{ item.label }}</XText>
      </XGrid>
    </template>
  </XFlow>
</template>
