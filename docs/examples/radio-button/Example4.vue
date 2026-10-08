<script setup lang="ts">
import { XBrick, XRadioButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap>
    <XRadioButton :font-size="10" model-value="sm" value="sm">小尺寸</XRadioButton>
    <XRadioButton model-value="md" value="md">默认尺寸</XRadioButton>
    <XRadioButton :font-size="14" model-value="lg" value="lg">大尺寸</XRadioButton>
  </XBrick>
</template>
