<script setup lang="ts">
import { XBrick, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XButton>默认宽度</XButton>
    <XButton width="100%">撑满父元素</XButton>
    <XButton width="160px" height="40px" radius="12px">固定宽高</XButton>
    <XButton variant="outline" width="160px" :border-width="2" border-color="#16a34a">自定义边框</XButton>
    <XButton variant="outline" width="32px" height="32px" padding="0" radius="999px" :lift-on-hover="false">+</XButton>
  </XBrick>
</template>
