<script setup lang="ts">
import { ref } from 'vue'
const deliveryDateTime = ref('2026-06-18 18:00')
import { XBrick, XGrid, XText, XDateTimePicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="320px">
      <XDateTimePicker v-model="deliveryDateTime" :font-size="14" clearable prefix="交付时间" />
    </XGrid>
    <XText tag="p" variant="muted">当前日期时间：{{ deliveryDateTime || '暂无' }}</XText>
  </XBrick>
</template>
