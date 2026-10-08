<script setup lang="ts">
import { ref } from 'vue'
const priority = ref('normal')
import { XBrick, XText, XRadio } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XRadio v-model="priority" name="priority" value="normal">普通</XRadio>
    <XRadio v-model="priority" name="priority" value="urgent">紧急</XRadio>
    <XRadio v-model="priority" name="priority" value="blocked">阻塞</XRadio>
  </XBrick>
  <XText tag="p" variant="muted">当前优先级：{{ priority }}</XText>
</template>
