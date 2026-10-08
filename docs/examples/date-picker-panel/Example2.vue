<script setup lang="ts">
import { ref } from 'vue'
const festivalDate = ref('2026-06-18')
import { XBrick, XText, XDatePickerPanel } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XDatePickerPanel v-model="festivalDate" :year="2026" :month="10" />
    <XText tag="p" variant="muted">当前日期：{{ festivalDate || '暂无' }}</XText>
  </XBrick>
</template>
