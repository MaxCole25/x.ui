<script setup lang="ts">
import { XBrick, XAvatar } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XAvatar name="UX" />
    <XAvatar name="王小明" :font-size="14" />
  </XBrick>
</template>
