<script setup lang="ts">
import { ref } from 'vue'
const enabled = ref(true)
import { XBrick, XText, XSwitch } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XSwitch v-model="enabled" />
    <XText tag="span" variant="muted">当前值：{{ enabled }}</XText>
  </XBrick>
</template>
