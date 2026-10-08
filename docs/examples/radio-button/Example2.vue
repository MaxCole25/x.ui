<script setup lang="ts">
import { ref } from 'vue'
const priority = ref('normal')
import { XBrick, XText, XRadioButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap>
    <XRadioButton v-model="priority" name="priority-button" value="normal">普通</XRadioButton>
    <XRadioButton v-model="priority" name="priority-button" value="urgent">紧急</XRadioButton>
    <XRadioButton v-model="priority" name="priority-button" value="blocked">阻塞</XRadioButton>
  </XBrick>
  <XText tag="p" variant="muted">当前优先级：{{ priority }}</XText>
</template>
