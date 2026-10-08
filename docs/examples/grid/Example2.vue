<script setup lang="ts">
import { XBrick, XGrid } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="3" :count="9" :gap="8" height="220px" />
    <XGrid :columns="4" :count="16" :gap="8" height="220px" />
  </XBrick>
</template>
