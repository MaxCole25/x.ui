<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
import { XBrick, XText, XCheckbox } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XCheckbox v-model="checked">启用通知</XCheckbox>
    <XText tag="span" variant="muted">当前值：{{ checked }}</XText>
  </XBrick>
</template>
