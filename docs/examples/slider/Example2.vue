<script setup lang="ts">
import { ref } from 'vue'
const verticalValue = ref(40)
import { XBrick, XSlider } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" height="200px">
    <XSlider v-model="verticalValue" vertical show-value />
  </XBrick>
</template>
