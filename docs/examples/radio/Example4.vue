<script setup lang="ts">
import { ref } from 'vue'
const level = ref('middle')
import { XBrick, XRadio } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XRadio v-model="level" name="level" value="p0">P0</XRadio>
    <XRadio v-model="level" name="level" value="p1">P1</XRadio>
    <XRadio v-model="level" name="level" value="p2" disabled>P2 禁用</XRadio>
  </XBrick>
</template>
