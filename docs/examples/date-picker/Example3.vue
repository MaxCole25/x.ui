<script setup lang="ts">
import { ref } from 'vue'
const markedDate = ref('2026-06-18')
const customFestivals = { '2026-06-18': { name: '发布日', type: 'custom' as const } }
import { XBrick, XGrid, XText, XDatePicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="260px">
      <XDatePicker v-model="markedDate" :festivals="customFestivals" />
    </XGrid>
    <XText tag="p" variant="muted">当前日期：{{ markedDate || '暂无' }}</XText>
  </XBrick>
</template>
