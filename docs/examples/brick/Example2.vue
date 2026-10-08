<script setup lang="ts">
import { XBrick, XBrickItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" height="260px" :gap="8">
    <XBrickItem height="64px" background-color="#e0ecff">顶部</XBrickItem>
    <XBrickItem background-color="#f8fafc">内容一</XBrickItem>
    <XBrickItem background-color="#f0fdf4">内容二</XBrickItem>
  </XBrick>
</template>
