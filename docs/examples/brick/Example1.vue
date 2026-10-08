<script setup lang="ts">
import { XBrick, XBrickItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="horizontal" :gap="8" height="220px">
    <XBrickItem width="160px" background-color="#e0ecff">左侧</XBrickItem>
    <XBrickItem background-color="#f8fafc">中间自适应</XBrickItem>
    <XBrickItem width="30%" background-color="#f0fdf4">右侧</XBrickItem>
  </XBrick>
</template>
