<script setup lang="ts">
import { ref } from 'vue'
const deliveryDate = ref('2026-06-18')
import { XBrick, XGrid, XText, XDatePicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="320px">
      <XDatePicker
        v-model="deliveryDate"
        :font-size="14"
        clearable
        prefix="交付日期"
        active-border-color="#1264f4"
      />
    </XGrid>
    <XText tag="p" variant="muted">当前日期：{{ deliveryDate || '暂无' }}</XText>
  </XBrick>
</template>
