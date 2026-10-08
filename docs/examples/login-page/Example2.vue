<script setup lang="ts">
import { XLoginPage } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XLoginPage
    preset="split"
    :content-left="{
 visible: true,
 width: '48%',
 padding: 72,
 backgroundColor: '#0f766e'
 }"
    :content-center="{
 width: '52%',
 padding: 48,
 backgroundColor: '#f8fafc'
 }"
    :login-width="420"
  />
</template>
