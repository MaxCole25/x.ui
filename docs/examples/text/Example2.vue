<script setup lang="ts">
import { XText } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XText
    model-value="外层 div 承载边框"
    border-width="3px"
    border-color="#ff0000"
    background-color="#f0fdf4"
    text-color="#000000"
    font-family="Arial, sans-serif"
    :font-weight="400"
    :font-size="12"
    line-height="1.55"
    width="100%"
    :height="40"
    radius="8px"
    padding="5px 10px"
    text-align="left"
    vertical-align="middle"
  />
</template>
