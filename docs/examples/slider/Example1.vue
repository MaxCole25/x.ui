<script setup lang="ts">
import { XBrick, XSlider } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const value = ref(30)
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="320px">
    <XSlider v-model="value" show-value />
  </XBrick>
</template>
