<script setup lang="ts">
import { ref } from 'vue'
const nowrapValue = ref('这是一段很长很长的单行内容，用于验证禁止自动换行。')
import { XTextarea } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTextarea v-model="nowrapValue" :allow-wrap="false" :rows="3" />
</template>
