<script setup lang="ts">
import { ref } from 'vue'
const jsonText = ref(JSON.stringify({ name: '@x-soft88/x-ui' }, null, 2))
import { XGrid, XJsonEditor } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="min(100%, 720px)">
    <XJsonEditor v-model="jsonText" />
  </XGrid>
</template>
