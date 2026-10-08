<script setup lang="ts">
const icons = ['check', 'time', 'close'].map((name, id) => ({ id, name, label: ['完成', '等待', '关闭'][id] }))
import { XText, XGrid, XFlow, XIcon } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XFlow
    :items="icons"
    item-key="id"
    item-width="72px"
    height="260px"
    :gap="8"
    :lazy="true"
    :initial-count="80"
    :load-count="40"
  >
    <template #default="{ item }">
      <XGrid :columns="1" :gap="6" justify-items="center" padding="8px 4px">
        <XIcon :name="item.name" :font-size="22" />
        <XText variant="muted" :font-size="12" truncated width="100%">{{ item.label }}</XText>
      </XGrid>
    </template>
  </XFlow>
</template>
