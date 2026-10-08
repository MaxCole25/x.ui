<script setup lang="ts">
import { ref } from 'vue'
const color = ref('#1677ff')
import { XBrick, XText, XColorPickerPanel } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XColorPickerPanel v-model="color" />
    <XText tag="p" variant="muted">当前颜色：{{ color }}</XText>
  </XBrick>
</template>
