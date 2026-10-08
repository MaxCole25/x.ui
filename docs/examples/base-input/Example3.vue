<script setup lang="ts">
import { ref } from 'vue'
const inputFormattedAmount = ref('12345')
function formatCurrency(value: string | number) {
  return value ? '?' + String(value).replace(/B(?=(d{3})+(?!d))/g, ',') : ''
}
function parseCurrency(value: string) {
  return String(value).replace(/[^d.]/g, '')
}
import { XBrick, XGrid, XText, XBaseInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="240px">
      <XBaseInput
        v-model="inputFormattedAmount"
        text-align="right"
        type="number"
        :formatter="formatCurrency"
        :parser="parseCurrency"
      />
    </XGrid>
    <XText tag="p" variant="muted">真实值：{{ inputFormattedAmount }}</XText>
  </XBrick>
</template>
