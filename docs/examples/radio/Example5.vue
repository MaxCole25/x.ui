<script setup lang="ts">
import { XBrick, XRadio } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XRadio :font-size="10" model-value="sm" value="sm">小尺寸</XRadio>
    <XRadio model-value="md" value="md">默认尺寸</XRadio>
    <XRadio :font-size="14" model-value="lg" value="lg">大尺寸</XRadio>
  </XBrick>
</template>
