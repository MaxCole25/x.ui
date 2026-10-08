<script setup lang="ts">
import { ref } from 'vue'
const date = ref('2026-06-18')
import { XBrick, XGrid, XText, XDatePicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="240px">
      <XDatePicker v-model="date" />
    </XGrid>
    <XText tag="p" variant="muted">当前日期：{{ date || '暂无' }}</XText>
  </XBrick>
</template>
