<script setup lang="ts">
import { ref } from 'vue'
const basicValue = ref('这是一段多行文本')
import { XTextarea } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTextarea v-model="basicValue" placeholder="请输入内容" clearable />
</template>
