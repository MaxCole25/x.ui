<script setup lang="ts">
import { XBrick, XRadio, XRadioButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XRadio model-value="custom" value="custom" button-color="#7c3aed">主题覆盖</XRadio>
    <XRadioButton model-value="button" value="button" button-color="#7c3aed">按钮主题</XRadioButton>
  </XBrick>
</template>
