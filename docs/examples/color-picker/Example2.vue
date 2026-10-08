<script setup lang="ts">
import { ref } from 'vue'
const disabledColor = ref('#94a3b8')
import { XColorPicker } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XColorPicker v-model="disabledColor" disabled />
</template>
