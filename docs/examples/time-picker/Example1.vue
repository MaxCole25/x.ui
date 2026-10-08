<script setup lang="ts">
import { ref } from 'vue'
const time = ref('09:30')
import { XBrick, XText, XTimePicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="260px">
    <XTimePicker v-model="time" />
    <XText tag="p" variant="muted">当前时间：{{ time || '暂无' }}</XText>
  </XBrick>
</template>
