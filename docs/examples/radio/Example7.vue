<script setup lang="ts">
import { XBrick, XRadio } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XRadio
      model-value="custom"
      value="custom"
      button-color="#7c3aed"
      button-size="16px"
      label-color="#4c1d95"
      :font-size="15"
      font-family="SimSun, 宋体, serif"
    >自定义外观</XRadio>
    <XRadio model-value="silent" value="silent" button-color="#0f766e" label-color="#115e59">另一主题</XRadio>
  </XBrick>
</template>
