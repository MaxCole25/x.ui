<script setup lang="ts">
import { XFloatButtonGroup } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const directModeItems = [
  { key: 'service', label: '联系客服', icon: 'customer-service-2', backgroundColor: '#f97316' },
  { key: 'help', label: '查看帮助', icon: 'question', backgroundColor: '#16a34a' },
  { key: 'top', label: '返回顶部', icon: 'arrow-up', backgroundColor: '#f97316' }
]
</script>

<template>
  <XFloatButtonGroup
    :items="directModeItems"
    mode="direct"
    direction="horizontal"
    position="absolute"
    :left="32"
    :bottom="32"
  />
</template>
