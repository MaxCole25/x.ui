<script setup lang="ts">
import { ref } from 'vue'
const level = ref('middle')
import { XBrick, XRadioButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap>
    <XRadioButton v-model="level" name="level-button" value="p0">P0</XRadioButton>
    <XRadioButton v-model="level" name="level-button" value="p1">P1</XRadioButton>
    <XRadioButton v-model="level" name="level-button" value="p2" disabled>P2 禁用</XRadioButton>
  </XBrick>
</template>
