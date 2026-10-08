<script setup lang="ts">
import { XBrick, XSwitch } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XSwitch disabled />
    <XSwitch model-value disabled />
  </XBrick>
</template>
