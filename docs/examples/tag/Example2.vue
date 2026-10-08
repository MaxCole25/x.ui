<script setup lang="ts">
import { XBrick, XTag } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XTag effect="light">浅色</XTag>
    <XTag effect="dark" variant="warning">深色</XTag>
    <XTag effect="plain" variant="danger">朴素</XTag>
  </XBrick>
</template>
