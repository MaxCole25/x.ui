<script setup lang="ts">
import { XBrick, XAvatar } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XAvatar icon="user" />
    <XAvatar icon="user" icon-variant="fill" icon-full icon-color="#fff" />
  </XBrick>
</template>
