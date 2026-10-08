<script setup lang="ts">
import { ref } from 'vue'
const deliveryTime = ref('18:00')
import { XBrick, XText, XTimeSelect } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="300px">
    <XTimeSelect
      v-model="deliveryTime"
      start="08:00"
      end="20:00"
      :step-minutes="60"
      :font-size="14"
      clearable
      prefix="送达时间"
    />
    <XText tag="p" variant="muted">当前时间：{{ deliveryTime || '暂无' }}</XText>
  </XBrick>
</template>
