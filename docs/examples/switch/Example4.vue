<script setup lang="ts">
import { XBrick, XSwitch } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XSwitch :font-size="10" model-value />
    <XSwitch model-value />
    <XSwitch :font-size="14" model-value />
  </XBrick>
</template>
