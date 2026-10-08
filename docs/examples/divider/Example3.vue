<script setup lang="ts">
import { XDivider } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XDivider content-position="left" border-style="dashed" border-color="#0e7490">左侧标题</XDivider>
  <XDivider content-position="right" border-style="dotted" :thickness="2" text-color="#7c3aed">右侧标题</XDivider>
</template>
