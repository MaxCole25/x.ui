<script setup lang="ts">
import { ref } from 'vue'
const mode = ref('default')
import { XBrick, XText, XRadio } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XRadio v-model="mode" name="mode" value="day">日视图</XRadio>
    <XRadio v-model="mode" name="mode" value="week">周视图</XRadio>
    <XRadio v-model="mode" name="mode" value="month">月视图</XRadio>
  </XBrick>
  <XText tag="p" variant="muted">当前值：{{ mode }}</XText>
</template>
