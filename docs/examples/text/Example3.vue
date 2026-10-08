<script setup lang="ts">
import { XText } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XText :model-value="12.5" :formatter="(value) => `[${value}]`" />
</template>
