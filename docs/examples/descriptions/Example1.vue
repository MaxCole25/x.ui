<script setup lang="ts">
const descriptionItems = [
  { label: '产品', value: '@x-soft88/x-ui' },
  { label: '版本', value: '1.0.0' },
  { label: '状态', value: '维护中' }
]
import { XBrick, XDescriptions } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XDescriptions title="订单信息" bordered :items="descriptionItems" />
  </XBrick>
</template>
