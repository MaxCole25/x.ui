<script setup lang="ts">
import { XBrick, XSwitch } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XSwitch
      model-value
      checked-color="#1264f4"
      inactive-color="#dcdfe6"
      thumb-color="#ffffff"
      button-size="20"
      :font-size="15"
      font-family="Arial, sans-serif"
    />
  </XBrick>
</template>
