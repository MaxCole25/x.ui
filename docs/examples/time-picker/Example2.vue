<script setup lang="ts">
import { ref } from 'vue'
const meetingTime = ref('09:30')
import { XBrick, XText, XTimePicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="300px">
    <XTimePicker v-model="meetingTime" :font-size="14" clearable prefix="会议时间" />
    <XText tag="p" variant="muted">当前时间：{{ meetingTime || '暂无' }}</XText>
  </XBrick>
</template>
