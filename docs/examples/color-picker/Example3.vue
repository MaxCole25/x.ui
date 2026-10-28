<script setup lang="ts">
import { ref } from 'vue'
const compactColor = ref('#10b981')
import { XBrick, XColorPicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick width="180px" height="auto" padding="0">
    <XColorPicker v-model="compactColor" width="100%" padding="0 10px" />
  </XBrick>
</template>
