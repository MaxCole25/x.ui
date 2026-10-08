<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref('')
import { XGrid, XAutocomplete } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="240px">
    <XAutocomplete v-model="keyword" placeholder="请输入关键词" clearable />
  </XGrid>
</template>
