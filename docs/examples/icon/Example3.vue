<script setup lang="ts">
import { XIcon } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <div class="x-icon-preview-row">
    <XIcon name="search" :font-size="10"></XIcon>
    <XIcon name="search" :font-size="12"></XIcon>
    <XIcon name="search" :font-size="14"></XIcon>
    <XIcon name="loading" :icon-size="24" color="#1264f4" spin title="加载中"></XIcon>
  </div>
</template>
