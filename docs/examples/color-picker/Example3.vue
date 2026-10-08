<script setup lang="ts">
import { ref } from 'vue'
const compactColor = ref('#10b981')
import { XColorPicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XColorPicker v-model="compactColor" width="180px" padding="0 10px" />
</template>
