<script setup lang="ts">
import { ref } from 'vue'
const count = ref(1)
import { XBrick, XText, XInputNumber } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="240px">
    <XInputNumber v-model="count" :min="0" :max="99" :step="3" />
    <XText tag="p" variant="muted">当前值：{{ count }}</XText>
  </XBrick>
</template>
