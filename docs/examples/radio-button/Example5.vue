<script setup lang="ts">
import { XBrick, XRadioButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap>
    <XRadioButton
      model-value="custom"
      value="custom"
      button-color="#7c3aed"
      button-size="36px"
      :font-size="14"
      font-family="Microsoft YaHei, 微软雅黑, sans-serif"
    >自定义按钮</XRadioButton>
    <XRadioButton model-value="silent" value="silent" button-color="#0f766e">另一主题</XRadioButton>
  </XBrick>
</template>
