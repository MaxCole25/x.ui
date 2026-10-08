<script setup lang="ts">
import { XBrick, XBaseInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XBaseInput
      active-border-color="#2563eb"
      border-color="#dc2626"
      background-color="#f0fdf4"
      text-color="#000000"
      clear-icon-color="#67c23a"
      clear-icon-size="18px"
      :font-size="12"
      width="320px"
      height="40px"
      auto-height
      radius="8px"
      padding="5px 10px"
      text-align="center"
      clearable
      model-value="外层 div 承载边框"
    />
  </XBrick>
</template>
