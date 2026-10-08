<script setup lang="ts">
import { XBrick, XProgress } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XProgress :percentage="64" status="success" />
  </XBrick>
</template>
