<script setup lang="ts">
import { XBrick, XSkeleton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XSkeleton avatar :rows="3" />
  </XBrick>
</template>
