<script setup lang="ts">
import { ref } from 'vue'
const customColor = ref('#7c3aed')
const customColors = ['#1677ff', '#16a34a', '#f97316', '#dc2626', 'transparent']
import { XBrick, XText, XColorPickerPanel } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const color = ref('#1677ff')
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XColorPickerPanel
      v-model="customColor"
      :colors="customColors"
      border-color="#c4b5fd"
      background-color="#faf5ff"
    />
    <XText tag="p" variant="muted">当前颜色：{{ customColor }}</XText>
  </XBrick>
</template>
