<script setup lang="ts">
const icons = ['check', 'time', 'close'].map((name, id) => ({ id, name, label: ['完成', '等待', '关闭'][id] }))
import { XText, XGrid, XFlow, XIcon } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XFlow
    :items="icons.slice(0, 12)"
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
        <XIcon :name="item.name" :font-size="22" />
        <XText variant="muted" :font-size="12" truncated width="100%">{{ item.label }}</XText>
      </XGrid>
    </template>
  </XFlow>
</template>
