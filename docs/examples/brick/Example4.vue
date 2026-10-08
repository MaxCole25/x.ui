<script setup lang="ts">
import { XBrick, XBrickItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick height="220px" right-align vertical-center horizontal-center padding="16px">
    <XBrickItem width="180px" background-color="#e0ecff">区块整体靠右，内容继承居中</XBrickItem>
    <XBrickItem :vertical-center="false" padding="8px" background-color="#f8fafc">覆盖父级配置</XBrickItem>
    <XBrickItem width="30%" bottom-align right-align background-color="#f0fdf4">内容右下对齐</XBrickItem>
  </XBrick>
</template>
