<script setup lang="ts">
import { XBrick, XCheckbox } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XCheckbox :font-size="10" model-value>小尺寸</XCheckbox>
    <XCheckbox model-value>默认尺寸</XCheckbox>
    <XCheckbox :font-size="14" model-value>大尺寸</XCheckbox>
  </XBrick>
</template>
