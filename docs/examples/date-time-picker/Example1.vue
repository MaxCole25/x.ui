<script setup lang="ts">
import { ref } from 'vue'
const dateTime = ref('2026-06-18 09:30')
import { XBrick, XGrid, XText, XDateTimePicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="260px">
      <XDateTimePicker v-model="dateTime" />
    </XGrid>
    <XText tag="p" variant="muted">当前日期时间：{{ dateTime || '暂无' }}</XText>
  </XBrick>
</template>
