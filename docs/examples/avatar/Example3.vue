<script setup lang="ts">
import { XBrick, XAvatar } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XAvatar name="边框" border-width="2px" border-color="#0f172a" />
    <XAvatar name="方形" shape="square" avatar-background-color="#1264f4" />
  </XBrick>
</template>
